import type { ProviderPricing } from "../types";

// Source: https://docs.perplexity.ai/getting-started/pricing (Jan 2026)
// Perplexity models are search-native with request fees based on context size
// Request fees (per 1k requests): Low $5-6, Medium $8-10, High $12-14
export const perplexityPricing: ProviderPricing = {
  // Sonar - Most affordable search model
  sonar: {
    inputPer1MTokens: 1,
    outputPer1MTokens: 1,
    webSearchPer1kRequests: 5, // Low context
  },
  "sonar-small": {
    inputPer1MTokens: 1,
    outputPer1MTokens: 1,
    webSearchPer1kRequests: 5,
  },
  // Sonar Pro - Higher quality search
  "sonar-pro": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    webSearchPer1kRequests: 6, // Low context for pro
  },
  // Sonar Reasoning - With reasoning capabilities
  "sonar-reasoning": {
    inputPer1MTokens: 1,
    outputPer1MTokens: 5,
    reasoningPer1MTokens: 5,
    webSearchPer1kRequests: 5,
  },
  // Sonar Reasoning Pro - Advanced reasoning + search
  "sonar-reasoning-pro": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 8,
    reasoningPer1MTokens: 8,
    webSearchPer1kRequests: 6,
  },
  // Sonar Deep Research - Comprehensive research mode
  "sonar-deep-research": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 8,
    reasoningPer1MTokens: 8,
    webSearchPer1kRequests: 5,
  },
};
