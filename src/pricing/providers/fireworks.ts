import type { ProviderPricing } from "../types";

// Source: https://fireworks.ai/pricing, https://docs.fireworks.ai/serverless/pricing (Apr 2026)
export const fireworksPricing: ProviderPricing = {
  // Kimi
  "accounts/fireworks/models/kimi-k2p6": {
    inputPer1MTokens: 0.95,
    outputPer1MTokens: 4,
  },
  "accounts/fireworks/models/kimi-k2p5": {
    inputPer1MTokens: 0.6,
    outputPer1MTokens: 3,
  },
  // DeepSeek
  "accounts/fireworks/models/deepseek-v4-pro": {
    inputPer1MTokens: 1.74,
    outputPer1MTokens: 3.48,
    cacheReadPer1MTokens: 0.145,
  },
  "accounts/fireworks/models/deepseek-v3": {
    inputPer1MTokens: 0.56,
    outputPer1MTokens: 1.68,
    cacheReadPer1MTokens: 0.28,
  },
  "accounts/fireworks/models/deepseek-r1": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 8,
    reasoningPer1MTokens: 8,
  },
  // GLM
  "accounts/fireworks/models/glm-5p1": {
    inputPer1MTokens: 1.4,
    outputPer1MTokens: 4.4,
  },
  "accounts/fireworks/models/glm-5": {
    inputPer1MTokens: 1,
    outputPer1MTokens: 3.2,
  },
  "accounts/fireworks/models/glm-4p7": {
    inputPer1MTokens: 0.6,
    outputPer1MTokens: 2.2,
  },
  // MiniMax
  "accounts/fireworks/models/minimax-m2p7": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 1.2,
  },
  "accounts/fireworks/models/minimax-m2p5": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 1.2,
  },
  // Qwen
  "accounts/fireworks/models/qwen3-vl-30b-a3b-thinking": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
  },
  "accounts/fireworks/models/qwen3-235b": {
    inputPer1MTokens: 0.22,
    outputPer1MTokens: 0.88,
    cacheReadPer1MTokens: 0.11,
  },
  // GPT-OSS
  "accounts/fireworks/models/gpt-oss-120b": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
  },
  "accounts/fireworks/models/gpt-oss-20b": {
    inputPer1MTokens: 0.07,
    outputPer1MTokens: 0.3,
  },
  // Llama 3.x
  "accounts/fireworks/models/llama-v3p3-70b-instruct": {
    inputPer1MTokens: 0.9,
    outputPer1MTokens: 0.9,
  },
};
