import type { ProviderPricing } from "../types";

// Source: https://api-docs.deepseek.com/quick_start/pricing (Jan 2026)
// DeepSeek uses cache hit/miss pricing model
export const deepseekPricing: ProviderPricing = {
  // DeepSeek V3 - Latest generation
  "deepseek-chat": {
    inputPer1MTokens: 0.28,
    outputPer1MTokens: 0.42,
    cacheReadPer1MTokens: 0.028,
  },
  "deepseek-v3": {
    inputPer1MTokens: 0.28,
    outputPer1MTokens: 0.42,
    cacheReadPer1MTokens: 0.028,
  },
  "deepseek-v3.2": {
    inputPer1MTokens: 0.28,
    outputPer1MTokens: 0.42,
    cacheReadPer1MTokens: 0.028,
  },
  "deepseek-v3.2-exp": {
    inputPer1MTokens: 0.28,
    outputPer1MTokens: 0.42,
    cacheReadPer1MTokens: 0.028,
  },
  // DeepSeek R1 - Reasoning model
  "deepseek-reasoner": {
    inputPer1MTokens: 0.56,
    outputPer1MTokens: 2.19,
    cacheReadPer1MTokens: 0.14,
    reasoningPer1MTokens: 2.19,
  },
  "deepseek-r1": {
    inputPer1MTokens: 0.56,
    outputPer1MTokens: 2.19,
    cacheReadPer1MTokens: 0.14,
    reasoningPer1MTokens: 2.19,
  },
  "deepseek-r1-0528": {
    inputPer1MTokens: 0.56,
    outputPer1MTokens: 2.19,
    cacheReadPer1MTokens: 0.14,
    reasoningPer1MTokens: 2.19,
  },
  // DeepSeek R1 Distill variants
  "deepseek-r1-distill-llama-70b": {
    inputPer1MTokens: 0.56,
    outputPer1MTokens: 0.77,
    cacheReadPer1MTokens: 0.14,
  },
  "deepseek-r1-distill-qwen-32b": {
    inputPer1MTokens: 0.28,
    outputPer1MTokens: 0.42,
    cacheReadPer1MTokens: 0.07,
  },
  // DeepSeek Coder V2
  "deepseek-coder": {
    inputPer1MTokens: 0.14,
    outputPer1MTokens: 0.28,
    cacheReadPer1MTokens: 0.014,
  },
};
