import type { ProviderPricing } from "../types";

// Source: https://groq.com/pricing (Apr 2026)
// Cache hits = 50% of input price (where applicable)
export const groqPricing: ProviderPricing = {
  // OpenAI GPT-OSS via Groq
  "openai/gpt-oss-20b": {
    inputPer1MTokens: 0.075,
    outputPer1MTokens: 0.3,
    cacheReadPer1MTokens: 0.0375,
  },
  "openai/gpt-oss-120b": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
    cacheReadPer1MTokens: 0.075,
  },
  // Llama 4
  "meta-llama/llama-4-scout-17b-16e-instruct": {
    inputPer1MTokens: 0.11,
    outputPer1MTokens: 0.34,
  },
  "meta-llama/llama-4-maverick-17b-128e-instruct": {
    inputPer1MTokens: 0.27,
    outputPer1MTokens: 0.85,
  },
  // Llama 3.x
  "llama-3.3-70b-versatile": {
    inputPer1MTokens: 0.59,
    outputPer1MTokens: 0.79,
  },
  "llama-3.1-8b-instant": {
    inputPer1MTokens: 0.05,
    outputPer1MTokens: 0.08,
  },
  // Qwen
  "qwen/qwen3-32b": {
    inputPer1MTokens: 0.29,
    outputPer1MTokens: 0.59,
  },
  // Kimi
  "moonshotai/kimi-k2-instruct-0905": {
    inputPer1MTokens: 1,
    outputPer1MTokens: 3,
    cacheReadPer1MTokens: 0.5,
  },
  "moonshotai/kimi-k2-instruct": {
    inputPer1MTokens: 1,
    outputPer1MTokens: 3,
    cacheReadPer1MTokens: 0.5,
  },
  // DeepSeek distill
  "deepseek-r1-distill-llama-70b": {
    inputPer1MTokens: 0.75,
    outputPer1MTokens: 0.99,
    reasoningPer1MTokens: 0.99,
  },
};
