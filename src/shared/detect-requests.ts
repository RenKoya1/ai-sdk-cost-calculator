/**
 * Utility for auto-detecting web search and Google Maps requests from AI SDK results
 */

import type {
  DeepPartial,
  GenerateTextResult,
  LanguageModel,
  ProviderMetadata,
} from "ai";
import { getModelId } from "./model";

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
  /**
   * Model used for the request. Required to bill Google Search grounding
   * correctly: the Gemini 3 family is charged per individual search query,
   * while Gemini 2.5/2.0/1.5 (and the same models on Vertex AI) are charged
   * once per grounded prompt regardless of how many queries the model issued.
   * When omitted, grounding defaults to the conservative per-prompt count.
   */
  model?: LanguageModel | string;
}

/**
 * Google Search grounding billing differs by model family:
 *   - Gemini 3 family: billed per individual search query
 *   - Gemini 2.5 / 2.0 / 1.5 (incl. Vertex AI): billed per grounded prompt
 * See https://ai.google.dev/gemini-api/docs/pricing.
 */
function billsGroundingPerQuery(model: LanguageModel | string | undefined): boolean {
  if (!model) return false;
  return getModelId(model).startsWith("gemini-3");
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

interface GroundingNamespace {
  groundingMetadata?: GroundingMetadata;
}

/**
 * Typed view over AI SDK's loosely-typed `ProviderMetadata`
 * (`Record<string, JSONObject>`) for the grounding namespaces we read:
 * @ai-sdk/google emits grounding under `google`; @ai-sdk/google-vertex emits
 * under both `googleVertex` (current) and `vertex` (legacy) — never `google`.
 */
interface GroundingProviderMetadata {
  google?: GroundingNamespace;
  googleVertex?: GroundingNamespace;
  vertex?: GroundingNamespace;
}

interface GeneratedFileLike {
  mediaType?: string;
  mimeType?: string;
}

/**
 * Inspectable subset of an AI SDK `generateText`/`streamText` result. Inherits
 * the field shapes (`toolCalls`, `steps`, `files`, `providerMetadata`) directly
 * from AI SDK's {@link GenerateTextResult} so they stay in sync with the SDK; a
 * real result is assignable without casting.
 *
 * Wrapped in AI SDK's own {@link DeepPartial} (not a shallow `Partial`) so the
 * nested shapes are optional all the way down: detection only reads
 * `step.toolCalls[].toolName` and `file.mediaType`, and across providers / SDK
 * versions a real result may omit the other (now-required in v7) `StepResult`
 * fields. DeepPartial keeps the SDK as the source of truth while letting a
 * minimal `{ steps: [{ toolCalls: [{ toolName }] }] }` stay assignable.
 */
export type ResultWithToolCalls = DeepPartial<
  Pick<GenerateTextResult<any, any, any>, "toolCalls" | "steps" | "files">
> & {
  /**
   * Provider metadata, typed as AI SDK's `ProviderMetadata`. Declared here
   * (rather than picked from `GenerateTextResult`) so we can read it top-level
   * for cross-provider grounding detection without inheriting the SDK's
   * `@deprecated` tag (the SDK steers single results to `finalStep`).
   */
  providerMetadata?: ProviderMetadata;
  /**
   * AI SDK <5 / experimental provider-metadata namespace. Newer results expose
   * `providerMetadata`; this is read as a fallback for backward compatibility.
   */
  experimental_providerMetadata?: ProviderMetadata;
};

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
  toolCalls: ReadonlyArray<ToolCall | undefined> | undefined,
  matchers: readonly MatcherEntry[],
  counts: DetectedRequests,
): void {
  if (!toolCalls || !Array.isArray(toolCalls)) return;
  for (const toolCall of toolCalls) {
    if (!toolCall) continue;
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
 * - Google Gemini grounding metadata: @ai-sdk/google under `google`, and
 *   @ai-sdk/google-vertex under `googleVertex` / `vertex` (Vertex never uses `google`)
 *
 * Pass `options.model` so Google Search grounding is billed per the model's
 * family: Gemini 3 is charged per search query, while Gemini 2.5/2.0/1.5 (and
 * the same models on Vertex AI) are charged once per grounded prompt.
 *
 * @example
 * ```typescript
 * const result = await generateText({
 *   model: google("gemini-2.0-flash"),
 *   prompt: "What's the weather today?",
 *   tools: { web_search: webSearchTool },
 * });
 *
 * // Pass the model for correct grounding billing
 * const { webSearchRequests, googleMapsRequests, imageGenerations } =
 *   detectRequestsFromResult(result, { model: "gemini-2.0-flash" });
 *
 * // Or add custom tool names
 * const detected = detectRequestsFromResult(result, {
 *   model: "gemini-2.0-flash",
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
      if (!step) continue;
      countToolCalls(step.toolCalls, matchers, counts);
    }
  }

  // Native image generation (e.g., Gemini Image models) returns images via
  // result.files rather than tool calls. Count files with image mediaType.
  if (Array.isArray(result.files)) {
    for (const rawFile of result.files) {
      if (!rawFile) continue;
      const file: GeneratedFileLike = rawFile;
      const mt = file.mediaType ?? file.mimeType;
      if (typeof mt === "string" && mt.startsWith("image/")) {
        counts.imageGenerations++;
      }
    }
  }

  // Google Gemini grounding metadata. The provider metadata namespace differs
  // by AI SDK provider: @ai-sdk/google writes under `google`, while
  // @ai-sdk/google-vertex writes under `googleVertex` (current) and `vertex`
  // (legacy) — never `google`. Check all three so Vertex grounding is detected.
  // AI SDK types providerMetadata loosely as Record<string, JSONObject>; narrow
  // to the grounding namespaces we read.
  const providerMetadata = (result.experimental_providerMetadata ??
    result.providerMetadata) as GroundingProviderMetadata | undefined;
  const grounding =
    providerMetadata?.google?.groundingMetadata ??
    providerMetadata?.googleVertex?.groundingMetadata ??
    providerMetadata?.vertex?.groundingMetadata;
  if (grounding) {
    const queryCount = Array.isArray(grounding.webSearchQueries)
      ? grounding.webSearchQueries.length
      : 0;
    // A prompt counts as grounded if any web-search signal is present.
    const grounded =
      queryCount > 0 ||
      grounding.searchEntryPoint != null ||
      (Array.isArray(grounding.groundingChunks) && grounding.groundingChunks.length > 0) ||
      (Array.isArray(grounding.groundingSupports) && grounding.groundingSupports.length > 0);

    if (billsGroundingPerQuery(options?.model)) {
      // Gemini 3 family: charged for each individual search query. The grounding
      // metadata is authoritative for this grounding activity, so take the
      // larger of the enumerated query count and any tool-call count rather than
      // summing — summing would double-count a single grounded prompt that also
      // surfaced as a `googleSearch`/`grounding` tool call.
      if (queryCount > 0) {
        counts.webSearchRequests = Math.max(counts.webSearchRequests, queryCount);
      } else if (grounded && counts.webSearchRequests === 0) {
        // Grounded but no enumerated queries — still one billable use.
        counts.webSearchRequests = 1;
      }
    } else if (grounded && counts.webSearchRequests === 0) {
      // Gemini 2.5/2.0/1.5 (and Vertex): one billable charge per grounded
      // prompt, regardless of how many queries the model issued internally.
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
 *   ...withDetectedRequests(result, { model: "gemini-2.0-flash" }),
 * });
 *
 * // With custom tool names
 * const cost2 = calculateCost({
 *   model: "gemini-2.0-flash",
 *   usage: result.usage,
 *   ...withDetectedRequests(result, {
 *     model: "gemini-2.0-flash",
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
