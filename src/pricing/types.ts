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

  // Web search pricing
  webSearchPer1kRequests?: number; // Cost per 1,000 web search requests
  webSearchTokensPerRequest?: number; // Fixed tokens charged per search (e.g., OpenAI charges 8k tokens)
}

export interface ProviderPricing {
  [modelId: string]: ModelPricing;
}
