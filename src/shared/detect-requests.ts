/**
 * Utility for auto-detecting web search and Google Maps requests from AI SDK results
 */

/** Default web search tool names across providers */
export const DEFAULT_WEB_SEARCH_TOOLS = [
  "web_search",
  "webSearch",
  "google_search",
  "googleSearch",
  "grounding",
  "web_search_preview",
  "tavily_search",
  "brave_search",
  "bing_search",
  "duckduckgo_search",
];

/** Default Google Maps tool names */
export const DEFAULT_GOOGLE_MAPS_TOOLS = [
  "google_maps",
  "googleMaps",
  "place_search",
  "placeSearch",
  "geocode",
  "places",
];

/** Default image generation tool names */
export const DEFAULT_IMAGE_GENERATION_TOOLS = [
  "generate_image",
  "generateImage",
  "image_generation",
  "imageGeneration",
  "create_image",
  "createImage",
  "dall_e",
  "dalle",
  "imagen",
  "stable_diffusion",
  "text_to_image",
  "textToImage",
];

/** Default xAI X Search tool names */
export const DEFAULT_X_SEARCH_TOOLS = [
  "x_search",
  "xSearch",
  "twitter_search",
  "twitterSearch",
  "x_posts",
  "xPosts",
];

/** Default xAI Code Execution tool names */
export const DEFAULT_CODE_EXECUTION_TOOLS = [
  "code_execution",
  "codeExecution",
  "execute_code",
  "executeCode",
  "python",
  "run_code",
  "runCode",
];

/** Default xAI Document Search tool names */
export const DEFAULT_DOCUMENT_SEARCH_TOOLS = [
  "document_search",
  "documentSearch",
  "search_documents",
  "searchDocuments",
  "file_search",
  "fileSearch",
];

/** Default xAI Collections Search tool names */
export const DEFAULT_COLLECTIONS_SEARCH_TOOLS = [
  "collections_search",
  "collectionsSearch",
  "search_collections",
  "searchCollections",
  "knowledge_base",
  "knowledgeBase",
];

export interface DetectedRequests {
  webSearchRequests: number;
  googleMapsRequests: number;
  xSearchRequests: number;
  codeExecutionRequests: number;
  documentSearchRequests: number;
  collectionsSearchRequests: number;
  imageGenerations: number;
}

export interface DetectOptions {
  /** Additional tool names to count as web search (added to defaults) */
  webSearchTools?: string[];
  /** Additional tool names to count as Google Maps (added to defaults) */
  googleMapsTools?: string[];
  /** Additional tool names to count as X Search (added to defaults) */
  xSearchTools?: string[];
  /** Additional tool names to count as Code Execution (added to defaults) */
  codeExecutionTools?: string[];
  /** Additional tool names to count as Document Search (added to defaults) */
  documentSearchTools?: string[];
  /** Additional tool names to count as Collections Search (added to defaults) */
  collectionsSearchTools?: string[];
  /** Additional tool names to count as image generation (added to defaults) */
  imageGenerationTools?: string[];
}

interface ToolCall {
  toolName?: string;
  type?: string;
  name?: string;
}

interface Step {
  toolCalls?: ToolCall[];
  toolResults?: unknown[];
}

interface GroundingMetadata {
  webSearchQueries?: unknown[];
  searchEntryPoint?: unknown;
  groundingChunks?: unknown[];
  groundingSupports?: unknown[];
  // Maps grounding signals (best-effort; Google has not stabilized field names)
  googleMapsWidgetContextToken?: unknown;
  mapsGroundingMetadata?: unknown;
  placeAnnotations?: unknown[];
}

interface ProviderMetadata {
  google?: {
    groundingMetadata?: GroundingMetadata;
  };
  [key: string]: unknown;
}

interface GeneratedFileLike {
  mediaType?: string;
  mimeType?: string;
}

export interface ResultWithToolCalls {
  toolCalls?: ToolCall[];
  steps?: Step[];
  files?: GeneratedFileLike[];
  experimental_providerMetadata?: ProviderMetadata;
  providerMetadata?: ProviderMetadata;
}

function getToolName(toolCall: ToolCall): string | undefined {
  return toolCall.toolName ?? toolCall.name ?? toolCall.type;
}

function createToolMatcher(defaultTools: string[], customTools?: string[]): (name: string) => boolean {
  const allTools = [...defaultTools, ...(customTools ?? [])];
  const lowerTools = allTools.map((t) => t.toLowerCase());

  return (name: string) => {
    const lower = name.toLowerCase();
    return lowerTools.some((tool) => lower === tool || lower.includes(tool));
  };
}

type CountField = Exclude<keyof DetectedRequests, never>;

interface MatcherEntry {
  match: (name: string) => boolean;
  field: CountField;
}

function countToolCalls(
  toolCalls: ToolCall[] | undefined,
  matchers: readonly MatcherEntry[],
  counts: DetectedRequests,
): void {
  if (!toolCalls || !Array.isArray(toolCalls)) return;
  for (const toolCall of toolCalls) {
    const name = getToolName(toolCall);
    if (!name) continue;
    for (const { match, field } of matchers) {
      if (match(name)) {
        counts[field]++;
        break;
      }
    }
  }
}

/**
 * Detects web search, Google Maps, and image generation requests from an AI SDK result object.
 *
 * Supports:
 * - Tool calls (toolCalls array)
 * - Multi-step generations (steps array)
 * - Google Gemini grounding metadata (experimental_providerMetadata.google.groundingMetadata)
 *
 * @example
 * ```typescript
 * const result = await generateText({
 *   model: google("gemini-2.0-flash"),
 *   prompt: "What's the weather today?",
 *   tools: { web_search: webSearchTool },
 * });
 *
 * // Use defaults
 * const { webSearchRequests, googleMapsRequests, imageGenerations } = detectRequestsFromResult(result);
 *
 * // Or add custom tool names
 * const detected = detectRequestsFromResult(result, {
 *   webSearchTools: ["my_search_tool", "custom_search"],
 *   googleMapsTools: ["location_finder"],
 *   imageGenerationTools: ["my_image_gen"],
 * });
 * ```
 */
export function detectRequestsFromResult(
  result: ResultWithToolCalls,
  options?: DetectOptions,
): DetectedRequests {
  const counts: DetectedRequests = {
    webSearchRequests: 0,
    googleMapsRequests: 0,
    xSearchRequests: 0,
    codeExecutionRequests: 0,
    documentSearchRequests: 0,
    collectionsSearchRequests: 0,
    imageGenerations: 0,
  };

  const matchers: readonly MatcherEntry[] = [
    { match: createToolMatcher(DEFAULT_WEB_SEARCH_TOOLS, options?.webSearchTools), field: "webSearchRequests" },
    { match: createToolMatcher(DEFAULT_GOOGLE_MAPS_TOOLS, options?.googleMapsTools), field: "googleMapsRequests" },
    { match: createToolMatcher(DEFAULT_X_SEARCH_TOOLS, options?.xSearchTools), field: "xSearchRequests" },
    { match: createToolMatcher(DEFAULT_CODE_EXECUTION_TOOLS, options?.codeExecutionTools), field: "codeExecutionRequests" },
    { match: createToolMatcher(DEFAULT_DOCUMENT_SEARCH_TOOLS, options?.documentSearchTools), field: "documentSearchRequests" },
    { match: createToolMatcher(DEFAULT_COLLECTIONS_SEARCH_TOOLS, options?.collectionsSearchTools), field: "collectionsSearchRequests" },
    { match: createToolMatcher(DEFAULT_IMAGE_GENERATION_TOOLS, options?.imageGenerationTools), field: "imageGenerations" },
  ];

  countToolCalls(result.toolCalls, matchers, counts);
  if (result.steps && Array.isArray(result.steps)) {
    for (const step of result.steps) {
      countToolCalls(step.toolCalls, matchers, counts);
    }
  }

  // Native image generation (e.g., Gemini Image models) returns images via
  // result.files rather than tool calls. Count files with image mediaType.
  if (Array.isArray(result.files)) {
    for (const file of result.files) {
      const mt = file?.mediaType ?? file?.mimeType;
      if (typeof mt === "string" && mt.startsWith("image/")) {
        counts.imageGenerations++;
      }
    }
  }

  // Google Gemini grounding metadata
  const providerMetadata = result.experimental_providerMetadata ?? result.providerMetadata;
  const grounding = providerMetadata?.google?.groundingMetadata;
  if (grounding) {
    // Web search: each query is one billable request
    if (Array.isArray(grounding.webSearchQueries)) {
      counts.webSearchRequests += grounding.webSearchQueries.length;
    }
    if (grounding.searchEntryPoint && counts.webSearchRequests === 0) {
      counts.webSearchRequests = 1;
    }
    // Maps grounding: any of these signals indicates the prompt was grounded
    // with Google Maps. Count one billable request per grounded prompt.
    const hasMapsSignal =
      grounding.googleMapsWidgetContextToken != null ||
      grounding.mapsGroundingMetadata != null ||
      (Array.isArray(grounding.placeAnnotations) && grounding.placeAnnotations.length > 0);
    if (hasMapsSignal && counts.googleMapsRequests === 0) {
      counts.googleMapsRequests = 1;
    }
  }

  return counts;
}

/**
 * Creates options with auto-detected web search, Google Maps, and image generation requests.
 * Merges detected counts with any manually specified counts.
 *
 * @example
 * ```typescript
 * const result = await generateText({
 *   model: google("gemini-2.0-flash"),
 *   prompt: "Find coffee shops near Tokyo Station",
 * });
 *
 * const cost = calculateCost({
 *   model: "gemini-2.0-flash",
 *   usage: result.usage,
 *   ...withDetectedRequests(result),
 * });
 *
 * // With custom tool names
 * const cost2 = calculateCost({
 *   model: "gemini-2.0-flash",
 *   usage: result.usage,
 *   ...withDetectedRequests(result, {
 *     webSearchTools: ["my_search"],
 *     imageGenerationTools: ["my_image_gen"],
 *   }),
 * });
 * ```
 */
export function withDetectedRequests(
  result: ResultWithToolCalls,
  options?: DetectOptions & {
    webSearchRequests?: number;
    googleMapsRequests?: number;
    xSearchRequests?: number;
    codeExecutionRequests?: number;
    documentSearchRequests?: number;
    collectionsSearchRequests?: number;
    imageGenerations?: number;
  },
): DetectedRequests {
  const detected = detectRequestsFromResult(result, options);
  return {
    webSearchRequests: options?.webSearchRequests ?? detected.webSearchRequests,
    googleMapsRequests: options?.googleMapsRequests ?? detected.googleMapsRequests,
    xSearchRequests: options?.xSearchRequests ?? detected.xSearchRequests,
    codeExecutionRequests: options?.codeExecutionRequests ?? detected.codeExecutionRequests,
    documentSearchRequests: options?.documentSearchRequests ?? detected.documentSearchRequests,
    collectionsSearchRequests: options?.collectionsSearchRequests ?? detected.collectionsSearchRequests,
    imageGenerations: options?.imageGenerations ?? detected.imageGenerations,
  };
}
