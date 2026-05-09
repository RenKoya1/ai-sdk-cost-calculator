import type { ProviderPricing } from "../types";

// Source: https://www.together.ai/pricing (Apr 2026)
export const togetherPricing: ProviderPricing = {
  // Llama 4
  "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8": {
    inputPer1MTokens: 0.27,
    outputPer1MTokens: 0.85,
  },
  "meta-llama/Llama-4-Scout-17B-16E-Instruct": {
    inputPer1MTokens: 0.18,
    outputPer1MTokens: 0.59,
  },
  // Llama 3.x — AI SDK uses "Meta-Llama" prefix; bare form retained for API parity
  "meta-llama/Meta-Llama-3.3-70B-Instruct-Turbo": {
    inputPer1MTokens: 0.88,
    outputPer1MTokens: 0.88,
  },
  "meta-llama/Llama-3.3-70B-Instruct-Turbo": {
    inputPer1MTokens: 0.88,
    outputPer1MTokens: 0.88,
  },
  "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo": {
    inputPer1MTokens: 3.5,
    outputPer1MTokens: 3.5,
  },
  // DeepSeek
  "deepseek-ai/DeepSeek-V3": {
    inputPer1MTokens: 0.6,
    outputPer1MTokens: 1.7,
  },
  "deepseek-ai/DeepSeek-V3.1": {
    inputPer1MTokens: 0.6,
    outputPer1MTokens: 1.7,
  },
  "deepseek-ai/DeepSeek-V4-Pro": {
    inputPer1MTokens: 2.1,
    outputPer1MTokens: 4.4,
  },
  "deepseek-ai/DeepSeek-R1-0528": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 7,
    reasoningPer1MTokens: 7,
  },
  // Mistral
  "mistralai/Mixtral-8x22B-Instruct-v0.1": {
    inputPer1MTokens: 1.2,
    outputPer1MTokens: 1.2,
  },
  // Qwen
  "Qwen/Qwen2.5-72B-Instruct-Turbo": {
    inputPer1MTokens: 1.2,
    outputPer1MTokens: 1.2,
  },
  "Qwen/Qwen2.5-7B-Instruct-Turbo": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 0.3,
  },
  "Qwen/Qwen3-Coder-480B-A35B-Instruct": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 2,
  },
  // GPT-OSS
  "openai/gpt-oss-120b": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
  },
  "openai/gpt-oss-20b": {
    inputPer1MTokens: 0.05,
    outputPer1MTokens: 0.2,
  },
  // Kimi
  "moonshotai/Kimi-K2.6": {
    inputPer1MTokens: 1.2,
    outputPer1MTokens: 4.5,
  },
  "moonshotai/Kimi-K2.5": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 2.8,
  },
  // GLM
  "zai-org/GLM-5.1": {
    inputPer1MTokens: 1.4,
    outputPer1MTokens: 4.4,
  },
  "zai-org/GLM-5": {
    inputPer1MTokens: 1,
    outputPer1MTokens: 3.2,
  },
  // MiniMax
  "MiniMaxAI/MiniMax-M2.7": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 1.2,
  },
};
