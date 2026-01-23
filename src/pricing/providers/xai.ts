import type { ProviderPricing } from "../types";

// Source: https://docs.x.ai/docs/models, https://costgoat.com/pricing/grok-api (Jan 2026)
// Tool Pricing (per 1,000 calls):
// - Web Search: $5
// - X Search: $5
// - Code Execution: $5
// - Document Search: $5
// - Collections Search: $2.50
// - View Image/Video: Token-based only (no additional charge)
export const xaiPricing: ProviderPricing = {
  // Grok 4 - Flagship model (256K context, tools: $5/1k each)
  "grok-4": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.75,
    webSearchPer1kRequests: 5,
    xSearchPer1kRequests: 5,
    codeExecutionPer1kRequests: 5,
    documentSearchPer1kRequests: 5,
    collectionsSearchPer1kRequests: 2.5,
  },
  "grok-4-0709": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.75,
    webSearchPer1kRequests: 5,
    xSearchPer1kRequests: 5,
    codeExecutionPer1kRequests: 5,
    documentSearchPer1kRequests: 5,
    collectionsSearchPer1kRequests: 2.5,
  },
  // Grok 4 Fast - Reasoning mode (2M context, tools: $5/1k each)
  "grok-4-fast-reasoning": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 0.5,
    cacheReadPer1MTokens: 0.05,
    longContextThreshold: 128000,
    longContextInputPer1MTokens: 0.4,
    longContextOutputPer1MTokens: 1.0,
    webSearchPer1kRequests: 5,
    xSearchPer1kRequests: 5,
    codeExecutionPer1kRequests: 5,
    documentSearchPer1kRequests: 5,
    collectionsSearchPer1kRequests: 2.5,
  },
  // Grok 4 Fast - Non-reasoning mode (2M context, tools: $5/1k each)
  "grok-4-fast-non-reasoning": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 0.5,
    cacheReadPer1MTokens: 0.05,
    longContextThreshold: 128000,
    longContextInputPer1MTokens: 0.4,
    longContextOutputPer1MTokens: 1.0,
    webSearchPer1kRequests: 5,
    xSearchPer1kRequests: 5,
    codeExecutionPer1kRequests: 5,
    documentSearchPer1kRequests: 5,
    collectionsSearchPer1kRequests: 2.5,
  },
  // Grok 4.1 Fast - Reasoning mode (2M context, tools: $5/1k each)
  "grok-4-1-fast-reasoning": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 0.5,
    cacheReadPer1MTokens: 0.05,
    longContextThreshold: 128000,
    longContextInputPer1MTokens: 0.4,
    longContextOutputPer1MTokens: 1.0,
    webSearchPer1kRequests: 5,
    xSearchPer1kRequests: 5,
    codeExecutionPer1kRequests: 5,
    documentSearchPer1kRequests: 5,
    collectionsSearchPer1kRequests: 2.5,
  },
  // Grok 4.1 Fast - Non-reasoning mode (2M context, tools: $5/1k each)
  "grok-4-1-fast-non-reasoning": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 0.5,
    cacheReadPer1MTokens: 0.05,
    longContextThreshold: 128000,
    longContextInputPer1MTokens: 0.4,
    longContextOutputPer1MTokens: 1.0,
    webSearchPer1kRequests: 5,
    xSearchPer1kRequests: 5,
    codeExecutionPer1kRequests: 5,
    documentSearchPer1kRequests: 5,
    collectionsSearchPer1kRequests: 2.5,
  },
  // Grok Code Fast (256K context)
  "grok-code-fast-1": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 1.5,
    cacheReadPer1MTokens: 0.05,
  },
  // Grok 3 - Previous generation (131K context, tools: $5/1k each)
  "grok-3": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.75,
    webSearchPer1kRequests: 5,
    xSearchPer1kRequests: 5,
    codeExecutionPer1kRequests: 5,
    documentSearchPer1kRequests: 5,
    collectionsSearchPer1kRequests: 2.5,
  },
  "grok-3-latest": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.75,
    webSearchPer1kRequests: 5,
    xSearchPer1kRequests: 5,
    codeExecutionPer1kRequests: 5,
    documentSearchPer1kRequests: 5,
    collectionsSearchPer1kRequests: 2.5,
  },
  "grok-3-fast": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.75,
    webSearchPer1kRequests: 5,
    xSearchPer1kRequests: 5,
    codeExecutionPer1kRequests: 5,
    documentSearchPer1kRequests: 5,
    collectionsSearchPer1kRequests: 2.5,
  },
  "grok-3-fast-latest": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.75,
    webSearchPer1kRequests: 5,
    xSearchPer1kRequests: 5,
    codeExecutionPer1kRequests: 5,
    documentSearchPer1kRequests: 5,
    collectionsSearchPer1kRequests: 2.5,
  },
  "grok-3-mini": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 0.5,
    cacheReadPer1MTokens: 0.075,
    webSearchPer1kRequests: 5,
    xSearchPer1kRequests: 5,
    codeExecutionPer1kRequests: 5,
    documentSearchPer1kRequests: 5,
    collectionsSearchPer1kRequests: 2.5,
  },
  "grok-3-mini-latest": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 0.5,
    cacheReadPer1MTokens: 0.075,
    webSearchPer1kRequests: 5,
    xSearchPer1kRequests: 5,
    codeExecutionPer1kRequests: 5,
    documentSearchPer1kRequests: 5,
    collectionsSearchPer1kRequests: 2.5,
  },
  "grok-3-mini-fast": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 0.5,
    cacheReadPer1MTokens: 0.075,
    webSearchPer1kRequests: 5,
    xSearchPer1kRequests: 5,
    codeExecutionPer1kRequests: 5,
    documentSearchPer1kRequests: 5,
    collectionsSearchPer1kRequests: 2.5,
  },
  "grok-3-mini-fast-latest": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 0.5,
    cacheReadPer1MTokens: 0.075,
    webSearchPer1kRequests: 5,
    xSearchPer1kRequests: 5,
    codeExecutionPer1kRequests: 5,
    documentSearchPer1kRequests: 5,
    collectionsSearchPer1kRequests: 2.5,
  },
  // Grok 2 - Legacy models (32K context)
  "grok-2": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.5,
  },
  "grok-2-latest": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.5,
  },
  "grok-2-1212": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.5,
  },
  "grok-2-vision": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.5,
  },
  "grok-2-vision-latest": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.5,
  },
  "grok-2-vision-1212": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.5,
  },
  // Grok 2 Image - Image generation (pricing TBD)
  "grok-2-image": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.04, // Estimated based on market rates
  },
  // Grok Beta (legacy)
  "grok-beta": {
    inputPer1MTokens: 5,
    outputPer1MTokens: 15,
  },
};
