import type { ProviderPricing } from "../types";

// Source: https://claude.com/pricing (Jan 2026)
export const anthropicPricing: ProviderPricing = {
  // Claude Opus 4.5 - Most intelligent
  "claude-opus-4-5-20251101": {
    inputPer1MTokens: 5,
    outputPer1MTokens: 25,
    cacheReadPer1MTokens: 0.5,
    cacheWritePer1MTokens: 6.25,
  },
  "claude-opus-4-5": {
    inputPer1MTokens: 5,
    outputPer1MTokens: 25,
    cacheReadPer1MTokens: 0.5,
    cacheWritePer1MTokens: 6.25,
  },
  // Claude Sonnet 4.5 - Balanced with long context pricing
  "claude-sonnet-4-5-20250514": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
    longContextThreshold: 200000,
    longContextInputPer1MTokens: 6,
    longContextOutputPer1MTokens: 22.5,
    longContextCacheReadPer1MTokens: 0.6,
    longContextCacheWritePer1MTokens: 7.5,
  },
  "claude-sonnet-4-5": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
    longContextThreshold: 200000,
    longContextInputPer1MTokens: 6,
    longContextOutputPer1MTokens: 22.5,
    longContextCacheReadPer1MTokens: 0.6,
    longContextCacheWritePer1MTokens: 7.5,
  },
  // Claude Haiku 4.5 - Fastest, most cost-efficient
  "claude-haiku-4-5": {
    inputPer1MTokens: 1,
    outputPer1MTokens: 5,
    cacheReadPer1MTokens: 0.1,
    cacheWritePer1MTokens: 1.25,
  },
  // Claude Opus 4.1
  "claude-opus-4-1": {
    inputPer1MTokens: 15,
    outputPer1MTokens: 75,
    cacheReadPer1MTokens: 1.5,
    cacheWritePer1MTokens: 18.75,
  },
  // Claude Sonnet 4
  "claude-sonnet-4-20250514": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
  },
  "claude-sonnet-4": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
  },
  // Claude Opus 4
  "claude-opus-4-20250514": {
    inputPer1MTokens: 15,
    outputPer1MTokens: 75,
    cacheReadPer1MTokens: 1.5,
    cacheWritePer1MTokens: 18.75,
  },
  "claude-opus-4": {
    inputPer1MTokens: 15,
    outputPer1MTokens: 75,
    cacheReadPer1MTokens: 1.5,
    cacheWritePer1MTokens: 18.75,
  },
  // Claude 3.7 Sonnet (Jan-Feb 2026)
  "claude-3-7-sonnet-20260219": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
  },
  "claude-3-7-sonnet-20260117": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
  },
  "claude-3-7-sonnet-latest": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
  },
  "claude-3-7-sonnet": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
  },
  // Claude 3.5 Sonnet
  "claude-3-5-sonnet-20241022": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
  },
  "claude-3-5-sonnet-20240620": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
  },
  "claude-3-5-sonnet-latest": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
  },
  "claude-3-5-sonnet": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
  },
  // Claude 3.5 Haiku
  "claude-3-5-haiku-20241022": {
    inputPer1MTokens: 0.8,
    outputPer1MTokens: 4,
    cacheReadPer1MTokens: 0.08,
    cacheWritePer1MTokens: 1,
  },
  "claude-3-5-haiku-latest": {
    inputPer1MTokens: 0.8,
    outputPer1MTokens: 4,
    cacheReadPer1MTokens: 0.08,
    cacheWritePer1MTokens: 1,
  },
  "claude-3-5-haiku": {
    inputPer1MTokens: 0.8,
    outputPer1MTokens: 4,
    cacheReadPer1MTokens: 0.08,
    cacheWritePer1MTokens: 1,
  },
  // Claude 3 Opus
  "claude-3-opus-20240229": {
    inputPer1MTokens: 15,
    outputPer1MTokens: 75,
    cacheReadPer1MTokens: 1.5,
    cacheWritePer1MTokens: 18.75,
  },
  "claude-3-opus-latest": {
    inputPer1MTokens: 15,
    outputPer1MTokens: 75,
    cacheReadPer1MTokens: 1.5,
    cacheWritePer1MTokens: 18.75,
  },
  "claude-3-opus": {
    inputPer1MTokens: 15,
    outputPer1MTokens: 75,
    cacheReadPer1MTokens: 1.5,
    cacheWritePer1MTokens: 18.75,
  },
  // Claude 3 Sonnet
  "claude-3-sonnet-20240229": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
  },
  "claude-3-sonnet": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
  },
  // Claude 3 Haiku
  "claude-3-haiku-20240307": {
    inputPer1MTokens: 0.25,
    outputPer1MTokens: 1.25,
    cacheReadPer1MTokens: 0.03,
    cacheWritePer1MTokens: 0.3,
  },
  "claude-3-haiku": {
    inputPer1MTokens: 0.25,
    outputPer1MTokens: 1.25,
    cacheReadPer1MTokens: 0.03,
    cacheWritePer1MTokens: 0.3,
  },
};
