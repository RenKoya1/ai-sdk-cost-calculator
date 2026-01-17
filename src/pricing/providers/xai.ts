import type { ProviderPricing } from "../types";

// Source: https://docs.x.ai/docs/models, https://costgoat.com/pricing/grok-api (Jan 2026)
// Web Search / X Search / Live Search: $5/1k calls (tool calls)
// Live Search sources: $25/1k sources (additional, per source used)
export const xaiPricing: ProviderPricing = {
  // Grok 4 - Flagship model (256K context, web search: $5/1k)
  "grok-4": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.75,
    webSearchPer1kRequests: 5,
  },
  "grok-4-0709": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.75,
    webSearchPer1kRequests: 5,
  },
  // Grok 4 Fast - Reasoning mode (2M context, web search: $5/1k)
  "grok-4-fast-reasoning": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 0.5,
    cacheReadPer1MTokens: 0.05,
    longContextThreshold: 128000,
    longContextInputPer1MTokens: 0.4,
    longContextOutputPer1MTokens: 1.0,
    webSearchPer1kRequests: 5,
  },
  // Grok 4 Fast - Non-reasoning mode (2M context, web search: $5/1k)
  "grok-4-fast-non-reasoning": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 0.5,
    cacheReadPer1MTokens: 0.05,
    longContextThreshold: 128000,
    longContextInputPer1MTokens: 0.4,
    longContextOutputPer1MTokens: 1.0,
    webSearchPer1kRequests: 5,
  },
  // Grok 4.1 Fast - Reasoning mode (2M context, web search: $5/1k)
  "grok-4-1-fast-reasoning": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 0.5,
    cacheReadPer1MTokens: 0.05,
    longContextThreshold: 128000,
    longContextInputPer1MTokens: 0.4,
    longContextOutputPer1MTokens: 1.0,
    webSearchPer1kRequests: 5,
  },
  // Grok 4.1 Fast - Non-reasoning mode (2M context, web search: $5/1k)
  "grok-4-1-fast-non-reasoning": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 0.5,
    cacheReadPer1MTokens: 0.05,
    longContextThreshold: 128000,
    longContextInputPer1MTokens: 0.4,
    longContextOutputPer1MTokens: 1.0,
    webSearchPer1kRequests: 5,
  },
  // Grok Code Fast (256K context)
  "grok-code-fast-1": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 1.5,
    cacheReadPer1MTokens: 0.05,
  },
  // Grok 3 - Previous generation (131K context, web search: $5/1k)
  "grok-3": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.75,
    webSearchPer1kRequests: 5,
  },
  "grok-3-mini": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 0.5,
    cacheReadPer1MTokens: 0.075,
    webSearchPer1kRequests: 5,
  },
  // Grok 2 - Legacy models (32K context)
  "grok-2": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.5,
  },
  "grok-2-vision-1212": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.5,
  },
  // Grok Beta (legacy)
  "grok-beta": {
    inputPer1MTokens: 5,
    outputPer1MTokens: 15,
  },
};
