/**
 * Per-component cost field names. Used to drive iteration in
 * roundCostBreakdown / multiplyCostBreakdown / addCostBreakdowns / emptyCostBreakdown
 * so adding a new component only requires updating this list.
 */
export const COST_COMPONENT_FIELDS = [
  "inputCost",
  "outputCost",
  "cacheReadCost",
  "cacheWriteCost",
  "cacheStorageCost",
  "reasoningCost",
  "audioInputCost",
  "audioOutputCost",
  "webSearchCost",
  "googleMapsCost",
  "xSearchCost",
  "codeExecutionCost",
  "documentSearchCost",
  "collectionsSearchCost",
  "imageGenerationCost",
  "additionalCost",
] as const;

export type CostComponentField = (typeof COST_COMPONENT_FIELDS)[number];

export type CostBreakdown = {
  [K in CostComponentField]: number;
} & {
  totalCost: number;
  currency: "USD";
  isLongContext: boolean;
};

/**
 * Manual request-count overrides shared by every cost entry point
 * (`calculateCost`, the AI SDK integration, and the trackers). These mirror
 * {@link DetectedRequests} but are all optional: a caller supplies only the
 * counts it wants to bill explicitly, and auto-detection fills the rest.
 */
export interface RequestCountOptions {
  /** Number of web search requests (for grounding/live search) */
  webSearchRequests?: number;
  /** Number of Google Maps API requests */
  googleMapsRequests?: number;
  /** Number of xAI X (Twitter) Search requests */
  xSearchRequests?: number;
  /** Number of xAI Code Execution requests */
  codeExecutionRequests?: number;
  /** Number of xAI Document Search requests */
  documentSearchRequests?: number;
  /** Number of xAI Collections Search requests */
  collectionsSearchRequests?: number;
  /** Number of images generated */
  imageGenerations?: number;
}

/**
 * Non-count billing modifiers shared by the cost entry points: audio token
 * splits, image size selection, and context-cache storage.
 */
export interface CostModifierOptions {
  /** Image size/quality for pricing lookup (e.g., "1024x1024", "hd-1024x1024") */
  imageSize?: string;
  /**
   * Audio input tokens. Subset of usage.inputTokens (noCacheTokens). When
   * provided AND the model has audioInputPer1MTokens, charged at the audio rate
   * and subtracted from the regular input charge to avoid double counting.
   */
  audioInputTokens?: number;
  /**
   * Audio output tokens. Subset of usage.outputTokens (textTokens). When
   * provided AND the model has audioOutputPer1MTokens, charged at the audio rate
   * and subtracted from the regular output charge.
   */
  audioOutputTokens?: number;
  /**
   * Token-hours of context cache storage. token-hours = cached_tokens × hours.
   * Charged at cacheStoragePer1MTokensPerHour (Gemini context caching).
   */
  cacheStorageTokenHours?: number;
}
