import type { ProviderPricing } from "../types";

// Source: https://docs.anthropic.com/en/docs/about-claude/pricing (Feb 2026)
export const anthropicPricing: ProviderPricing = {
  // Claude Opus 4.6
  "claude-opus-4-6": {
    inputPer1MTokens: 5,
    outputPer1MTokens: 25,
    cacheReadPer1MTokens: 0.5,
    cacheWritePer1MTokens: 6.25,
    longContextThreshold: 200000,
    longContextInputPer1MTokens: 10,
    longContextOutputPer1MTokens: 37.5,
    longContextCacheReadPer1MTokens: 1.0,
    longContextCacheWritePer1MTokens: 12.5,
  },
  // Claude Sonnet 4.6
  "claude-sonnet-4-6": {
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
  // Claude Opus 4.5
  "claude-opus-4-5": {
    inputPer1MTokens: 5,
    outputPer1MTokens: 25,
    cacheReadPer1MTokens: 0.5,
    cacheWritePer1MTokens: 6.25,
  },
  // Claude Haiku 4.5
  "claude-haiku-4-5": {
    inputPer1MTokens: 1,
    outputPer1MTokens: 5,
    cacheReadPer1MTokens: 0.1,
    cacheWritePer1MTokens: 1.25,
  },
  // Claude Sonnet 4.5
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
  // Claude Opus 4.1
  "claude-opus-4-1": {
    inputPer1MTokens: 15,
    outputPer1MTokens: 75,
    cacheReadPer1MTokens: 1.5,
    cacheWritePer1MTokens: 18.75,
  },
  // Claude Opus 4.0
  "claude-opus-4-0": {
    inputPer1MTokens: 15,
    outputPer1MTokens: 75,
    cacheReadPer1MTokens: 1.5,
    cacheWritePer1MTokens: 18.75,
  },
  // Claude Sonnet 4.0
  "claude-sonnet-4-0": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
  },
  // Claude 3.7 Sonnet
  "claude-3-7-sonnet-latest": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
  },
  // Claude 3.5 Haiku
  "claude-3-5-haiku-latest": {
    inputPer1MTokens: 0.8,
    outputPer1MTokens: 4,
    cacheReadPer1MTokens: 0.08,
    cacheWritePer1MTokens: 1,
  },
};
