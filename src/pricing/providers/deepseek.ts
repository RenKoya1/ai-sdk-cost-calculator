import type { ProviderPricing } from "../types";

// Source: https://api-docs.deepseek.com/quick_start/pricing (Jun 2026)
// DeepSeek uses cache hit/miss pricing model
export const deepseekPricing: ProviderPricing = {
  // DeepSeek V4 - Latest generation (1M context; thinking and non-thinking same price)
  "deepseek-v4-flash": {
    inputPer1MTokens: 0.14,
    outputPer1MTokens: 0.28,
    cacheReadPer1MTokens: 0.0028,
  },
  "deepseek-v4-pro": {
    inputPer1MTokens: 0.435,
    outputPer1MTokens: 0.87,
    cacheReadPer1MTokens: 0.003625,
  },
  // deepseek-chat / deepseek-reasoner alias deepseek-v4-flash until retirement 2026-07-24
  "deepseek-chat": {
    inputPer1MTokens: 0.14,
    outputPer1MTokens: 0.28,
    cacheReadPer1MTokens: 0.0028,
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
  // DeepSeek Reasoner - now aliases deepseek-v4-flash thinking mode (until 2026-07-24)
  "deepseek-reasoner": {
    inputPer1MTokens: 0.14,
    outputPer1MTokens: 0.28,
    cacheReadPer1MTokens: 0.0028,
    reasoningPer1MTokens: 0.28,
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
