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
}

export interface ProviderPricing {
  [modelId: string]: ModelPricing;
}
