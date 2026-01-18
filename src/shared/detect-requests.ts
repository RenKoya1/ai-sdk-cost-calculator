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

export interface DetectedRequests {
  webSearchRequests: number;
  googleMapsRequests: number;
  imageGenerations: number;
}

export interface DetectOptions {
  /** Additional tool names to count as web search (added to defaults) */
  webSearchTools?: string[];
  /** Additional tool names to count as Google Maps (added to defaults) */
  googleMapsTools?: string[];
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

interface ProviderMetadata {
  google?: {
    groundingMetadata?: {
      webSearchQueries?: unknown[];
      searchEntryPoint?: unknown;
      groundingChunks?: unknown[];
      groundingSupports?: unknown[];
    };
  };
  [key: string]: unknown;
}

export interface ResultWithToolCalls {
  toolCalls?: ToolCall[];
  steps?: Step[];
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
  let webSearchRequests = 0;
  let googleMapsRequests = 0;
  let imageGenerations = 0;

  const isWebSearchTool = createToolMatcher(DEFAULT_WEB_SEARCH_TOOLS, options?.webSearchTools);
  const isGoogleMapsTool = createToolMatcher(DEFAULT_GOOGLE_MAPS_TOOLS, options?.googleMapsTools);
  const isImageGenerationTool = createToolMatcher(DEFAULT_IMAGE_GENERATION_TOOLS, options?.imageGenerationTools);

  // Check tool calls at the top level
  if (result.toolCalls && Array.isArray(result.toolCalls)) {
    for (const toolCall of result.toolCalls) {
      const name = getToolName(toolCall);
      if (name) {
        if (isWebSearchTool(name)) {
          webSearchRequests++;
        } else if (isGoogleMapsTool(name)) {
          googleMapsRequests++;
        } else if (isImageGenerationTool(name)) {
          imageGenerations++;
        }
      }
    }
  }

  // Check steps for multi-step generations
  if (result.steps && Array.isArray(result.steps)) {
    for (const step of result.steps) {
      if (step.toolCalls && Array.isArray(step.toolCalls)) {
        for (const toolCall of step.toolCalls) {
          const name = getToolName(toolCall);
          if (name) {
            if (isWebSearchTool(name)) {
              webSearchRequests++;
            } else if (isGoogleMapsTool(name)) {
              googleMapsRequests++;
            } else if (isImageGenerationTool(name)) {
              imageGenerations++;
            }
          }
        }
      }
    }
  }

  // Check Google Gemini grounding metadata
  const providerMetadata = result.experimental_providerMetadata ?? result.providerMetadata;
  if (providerMetadata?.google?.groundingMetadata) {
    const grounding = providerMetadata.google.groundingMetadata;
    // Each web search query counts as a request
    if (grounding.webSearchQueries && Array.isArray(grounding.webSearchQueries)) {
      webSearchRequests += grounding.webSearchQueries.length;
    }
    // If there's a search entry point but no queries, count as 1
    if (grounding.searchEntryPoint && webSearchRequests === 0) {
      webSearchRequests = 1;
    }
  }

  return { webSearchRequests, googleMapsRequests, imageGenerations };
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
    imageGenerations?: number;
  },
): DetectedRequests {
  const detected = detectRequestsFromResult(result, options);
  return {
    webSearchRequests: options?.webSearchRequests ?? detected.webSearchRequests,
    googleMapsRequests: options?.googleMapsRequests ?? detected.googleMapsRequests,
    imageGenerations: options?.imageGenerations ?? detected.imageGenerations,
  };
}
