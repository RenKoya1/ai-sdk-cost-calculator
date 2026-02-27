export interface ModelPricing {
  // Standard pricing (≤ threshold tokens)
  inputPer1MTokens: number;
  outputPer1MTokens: number;
  cacheReadPer1MTokens?: number;
  cacheWritePer1MTokens?: number;
  reasoningPer1MTokens?: number;

  // Long context pricing (> threshold tokens)
  longContextThreshold?: number; // Default: 200000
  longContextInputPer1MTokens?: number;
  longContextOutputPer1MTokens?: number;
  longContextCacheReadPer1MTokens?: number;
  longContextCacheWritePer1MTokens?: number;
  longContextReasoningPer1MTokens?: number

  // Web search pricing
  webSearchPer1kRequests?: number; // Cost per 1,000 web search requests
  webSearchTokensPerRequest?: number; // Fixed tokens charged per search (e.g., OpenAI charges 8k tokens)

  // Google Maps pricing
  googleMapsPer1kRequests?: number; // Cost per 1,000 Google Maps API requests

  // xAI tool pricing (per 1,000 calls)
  xSearchPer1kRequests?: number; // X (Twitter) search
  codeExecutionPer1kRequests?: number; // Python code execution
  documentSearchPer1kRequests?: number; // Document search
  collectionsSearchPer1kRequests?: number; // xAI Collections search

  // Image generation pricing (per image) - for dedicated image models (Imagen, DALL-E)
  imageGenerationPerImage?: number; // Default cost per image
  imageGenerationPricing?: ImageGenerationPricing; // Detailed pricing by size/quality

  // Native image output pricing - for models where image tokens are in completionTokens
  // (e.g., Gemini image models via generateText)
  // When set, image tokens are subtracted from text output and priced at this rate
  imageOutputPer1MTokens?: number; // e.g., $60/1M for Gemini image output
  imageOutputTokensBySize?: Record<string, number>; // e.g., { "1K": 1120, "2K": 1680 }
  imageOutputDefaultSize?: string; // Default size key when imageSize is not specified (e.g., "1K")
}

/**
 * Image generation pricing by size and quality.
 * Keys can be:
 * - Pixel-count categories for Gemini native image gen: "512px", "1K", "2K", "4K"
 *   (aspect-ratio independent, based on total pixel count)
 * - Fixed resolutions for Imagen/OpenAI: "1024x1024", "1536x1536"
 * - Quality+resolution for OpenAI: "hd-1024x1024"
 */
export interface ImageGenerationPricing {
  [sizeOrQuality: string]: number;
}

export interface ProviderPricing {
  [modelId: string]: ModelPricing;
}
