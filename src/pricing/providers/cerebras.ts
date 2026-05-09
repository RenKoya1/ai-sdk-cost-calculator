import type { ProviderPricing } from "../types";

// Source: https://www.cerebras.ai/pricing, https://inference-docs.cerebras.ai (Apr 2026)
// Note: Cerebras lists per-token rates only inside developer dashboard. Values
// below mirror commonly published rates; verify on console before billing.
export const cerebrasPricing: ProviderPricing = {
  "llama-3.3-70b": {
    inputPer1MTokens: 0.85,
    outputPer1MTokens: 1.2,
  },
  "llama3.3-70b": {
    inputPer1MTokens: 0.85,
    outputPer1MTokens: 1.2,
  },
  "llama3.1-8b": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.1,
  },
  "llama-4-scout-17b-16e-instruct": {
    inputPer1MTokens: 0.65,
    outputPer1MTokens: 0.85,
  },
  "qwen-3-32b": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 0.8,
  },
  "qwen-3-235b-a22b-instruct-2507": {
    inputPer1MTokens: 0.6,
    outputPer1MTokens: 1.2,
  },
  "qwen-3-235b-a22b-thinking-2507": {
    inputPer1MTokens: 0.6,
    outputPer1MTokens: 1.2,
    reasoningPer1MTokens: 1.2,
  },
  "qwen-3-coder-480b": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 2,
  },
  "gpt-oss-120b": {
    inputPer1MTokens: 0.35,
    outputPer1MTokens: 0.75,
  },
};
