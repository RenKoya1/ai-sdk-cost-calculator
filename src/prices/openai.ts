import type { ProviderPricing } from "./types";

// Source: https://openai.com/api/pricing/ (via pricepertoken.com 2026)
export const openaiPricing: ProviderPricing = {
  // GPT-4o
  "gpt-4o": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 1.25,
  },
  "gpt-4o-2024-11-20": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 1.25,
  },
  "gpt-4o-2024-08-06": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 1.25,
  },
  "gpt-4o-mini": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
    cacheReadPer1MTokens: 0.075,
  },
  "gpt-4o-mini-2024-07-18": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
    cacheReadPer1MTokens: 0.075,
  },
  // GPT-4.1
  "gpt-4.1": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 8,
    cacheReadPer1MTokens: 0.5,
  },
  "gpt-4.1-mini": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 1.6,
    cacheReadPer1MTokens: 0.1,
  },
  "gpt-4.1-nano": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.025,
  },
  // GPT-4 Turbo
  "gpt-4-turbo": {
    inputPer1MTokens: 10,
    outputPer1MTokens: 30,
  },
  "gpt-4-turbo-2024-04-09": {
    inputPer1MTokens: 10,
    outputPer1MTokens: 30,
  },
  // GPT-4
  "gpt-4": {
    inputPer1MTokens: 30,
    outputPer1MTokens: 60,
  },
  "gpt-4-32k": {
    inputPer1MTokens: 60,
    outputPer1MTokens: 120,
  },
  // GPT-3.5 Turbo
  "gpt-3.5-turbo": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 1.5,
  },
  "gpt-3.5-turbo-0125": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 1.5,
  },
  // o1
  "o1": {
    inputPer1MTokens: 15,
    outputPer1MTokens: 60,
    cacheReadPer1MTokens: 7.5,
    reasoningPer1MTokens: 60,
  },
  "o1-2024-12-17": {
    inputPer1MTokens: 15,
    outputPer1MTokens: 60,
    cacheReadPer1MTokens: 7.5,
    reasoningPer1MTokens: 60,
  },
  "o1-preview": {
    inputPer1MTokens: 15,
    outputPer1MTokens: 60,
    reasoningPer1MTokens: 60,
  },
  "o1-mini": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 12,
    cacheReadPer1MTokens: 1.5,
    reasoningPer1MTokens: 12,
  },
  "o1-pro": {
    inputPer1MTokens: 150,
    outputPer1MTokens: 600,
    reasoningPer1MTokens: 600,
  },
  // o3 (80% price reduction applied June 2025)
  "o3": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 8,
    cacheReadPer1MTokens: 0.5,
    reasoningPer1MTokens: 8,
  },
  "o3-mini": {
    inputPer1MTokens: 1.1,
    outputPer1MTokens: 4.4,
    cacheReadPer1MTokens: 0.55,
    reasoningPer1MTokens: 4.4,
  },
  "o3-pro": {
    inputPer1MTokens: 20,
    outputPer1MTokens: 80,
    reasoningPer1MTokens: 80,
  },
  // o4-mini
  "o4-mini": {
    inputPer1MTokens: 1.1,
    outputPer1MTokens: 4.4,
    cacheReadPer1MTokens: 0.275,
    reasoningPer1MTokens: 4.4,
  },
};
