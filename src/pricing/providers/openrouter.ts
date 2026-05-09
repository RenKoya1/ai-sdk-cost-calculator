// Source: https://openrouter.ai/api/v1/models (snapshot 2026-05-08)
// OpenRouter prices match upstream provider rates. Note: payment surcharges
// (5% BYOK / 5.5% credit purchase) are not encoded — they apply at billing layer.
import type { ProviderPricing } from "../types";

export const openrouterPricing: ProviderPricing = {
  "google/gemini-3.1-flash-lite": {
    inputPer1MTokens: 0.25,
    outputPer1MTokens: 1.5,
    cacheReadPer1MTokens: 0.025,
    cacheWritePer1MTokens: 0.083333,
    reasoningPer1MTokens: 1.5,
    webSearchPer1kRequests: 14,
  },
  "openai/gpt-chat-latest": {
    inputPer1MTokens: 5,
    outputPer1MTokens: 30,
    cacheReadPer1MTokens: 0.5,
    webSearchPer1kRequests: 10,
  },
  "x-ai/grok-4.3": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 2.5,
    cacheReadPer1MTokens: 0.2,
    webSearchPer1kRequests: 5,
  },
  "mistralai/mistral-medium-3-5": {
    inputPer1MTokens: 1.5,
    outputPer1MTokens: 7.5,
  },
  "qwen/qwen3.5-plus-20260420": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 2.4,
  },
  "qwen/qwen3.6-flash": {
    inputPer1MTokens: 0.25,
    outputPer1MTokens: 1.5,
    cacheWritePer1MTokens: 0.3125,
  },
  "qwen/qwen3.6-35b-a3b": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 1,
    cacheReadPer1MTokens: 0.05,
  },
  "qwen/qwen3.6-max-preview": {
    inputPer1MTokens: 1.04,
    outputPer1MTokens: 6.24,
    cacheWritePer1MTokens: 1.3,
  },
  "qwen/qwen3.6-27b": {
    inputPer1MTokens: 0.32,
    outputPer1MTokens: 3.2,
  },
  "openai/gpt-5.5-pro": {
    inputPer1MTokens: 30,
    outputPer1MTokens: 180,
    webSearchPer1kRequests: 10,
  },
  "openai/gpt-5.5": {
    inputPer1MTokens: 5,
    outputPer1MTokens: 30,
    cacheReadPer1MTokens: 0.5,
    webSearchPer1kRequests: 10,
  },
  "deepseek/deepseek-v4-pro": {
    inputPer1MTokens: 0.435,
    outputPer1MTokens: 0.87,
    cacheReadPer1MTokens: 0.003625,
  },
  "deepseek/deepseek-v4-flash": {
    inputPer1MTokens: 0.14,
    outputPer1MTokens: 0.28,
    cacheReadPer1MTokens: 0.0028,
  },
  "openai/gpt-5.4-image-2": {
    inputPer1MTokens: 8,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 2,
    webSearchPer1kRequests: 10,
  },
  "moonshotai/kimi-k2.6": {
    inputPer1MTokens: 0.75,
    outputPer1MTokens: 3.5,
    cacheReadPer1MTokens: 0.15,
  },
  "anthropic/claude-opus-4.7": {
    inputPer1MTokens: 5,
    outputPer1MTokens: 25,
    cacheReadPer1MTokens: 0.5,
    cacheWritePer1MTokens: 6.25,
    webSearchPer1kRequests: 10,
  },
  "anthropic/claude-opus-4.6-fast": {
    inputPer1MTokens: 30,
    outputPer1MTokens: 150,
    cacheReadPer1MTokens: 3,
    cacheWritePer1MTokens: 37.5,
    webSearchPer1kRequests: 10,
  },
  "google/gemma-4-26b-a4b-it": {
    inputPer1MTokens: 0.06,
    outputPer1MTokens: 0.33,
  },
  "google/gemma-4-31b-it": {
    inputPer1MTokens: 0.13,
    outputPer1MTokens: 0.38,
  },
  "qwen/qwen3.6-plus": {
    inputPer1MTokens: 0.325,
    outputPer1MTokens: 1.95,
    cacheWritePer1MTokens: 0.40625,
  },
  "x-ai/grok-4.20-multi-agent": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 6,
    cacheReadPer1MTokens: 0.2,
    webSearchPer1kRequests: 5,
  },
  "x-ai/grok-4.20": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 2.5,
    cacheReadPer1MTokens: 0.2,
    webSearchPer1kRequests: 5,
  },
  "openai/gpt-5.4-nano": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 1.25,
    cacheReadPer1MTokens: 0.02,
    webSearchPer1kRequests: 10,
  },
  "openai/gpt-5.4-mini": {
    inputPer1MTokens: 0.75,
    outputPer1MTokens: 4.5,
    cacheReadPer1MTokens: 0.075,
    webSearchPer1kRequests: 10,
  },
  "mistralai/mistral-small-2603": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
    cacheReadPer1MTokens: 0.015,
  },
  "nvidia/nemotron-3-super-120b-a12b": {
    inputPer1MTokens: 0.09,
    outputPer1MTokens: 0.45,
  },
  "qwen/qwen3.5-9b": {
    inputPer1MTokens: 0.04,
    outputPer1MTokens: 0.15,
  },
  "openai/gpt-5.4-pro": {
    inputPer1MTokens: 30,
    outputPer1MTokens: 180,
    webSearchPer1kRequests: 10,
  },
  "openai/gpt-5.4": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.25,
    webSearchPer1kRequests: 10,
  },
  "openai/gpt-5.3-chat": {
    inputPer1MTokens: 1.75,
    outputPer1MTokens: 14,
    cacheReadPer1MTokens: 0.175,
    webSearchPer1kRequests: 10,
  },
  "google/gemini-3.1-flash-lite-preview": {
    inputPer1MTokens: 0.25,
    outputPer1MTokens: 1.5,
    cacheReadPer1MTokens: 0.025,
    cacheWritePer1MTokens: 0.083333,
    reasoningPer1MTokens: 1.5,
    webSearchPer1kRequests: 14,
  },
  "google/gemini-3.1-flash-image-preview": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 3,
    webSearchPer1kRequests: 14,
  },
  "qwen/qwen3.5-35b-a3b": {
    inputPer1MTokens: 0.14,
    outputPer1MTokens: 1,
    cacheReadPer1MTokens: 0.05,
  },
  "qwen/qwen3.5-27b": {
    inputPer1MTokens: 0.195,
    outputPer1MTokens: 1.56,
  },
  "qwen/qwen3.5-122b-a10b": {
    inputPer1MTokens: 0.26,
    outputPer1MTokens: 2.08,
  },
  "qwen/qwen3.5-flash-02-23": {
    inputPer1MTokens: 0.065,
    outputPer1MTokens: 0.26,
    cacheWritePer1MTokens: 0.08125,
  },
  "google/gemini-3.1-pro-preview-customtools": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 12,
    cacheReadPer1MTokens: 0.2,
    cacheWritePer1MTokens: 0.375,
    reasoningPer1MTokens: 12,
    webSearchPer1kRequests: 14,
  },
  "openai/gpt-5.3-codex": {
    inputPer1MTokens: 1.75,
    outputPer1MTokens: 14,
    cacheReadPer1MTokens: 0.175,
    webSearchPer1kRequests: 10,
  },
  "google/gemini-3.1-pro-preview": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 12,
    cacheReadPer1MTokens: 0.2,
    cacheWritePer1MTokens: 0.375,
    reasoningPer1MTokens: 12,
    webSearchPer1kRequests: 14,
  },
  "anthropic/claude-sonnet-4.6": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
    webSearchPer1kRequests: 10,
  },
  "qwen/qwen3.5-plus-02-15": {
    inputPer1MTokens: 0.26,
    outputPer1MTokens: 1.56,
    cacheWritePer1MTokens: 0.325,
  },
  "qwen/qwen3.5-397b-a17b": {
    inputPer1MTokens: 0.39,
    outputPer1MTokens: 2.34,
    cacheReadPer1MTokens: 0.195,
  },
  "qwen/qwen3-max-thinking": {
    inputPer1MTokens: 0.78,
    outputPer1MTokens: 3.9,
  },
  "anthropic/claude-opus-4.6": {
    inputPer1MTokens: 5,
    outputPer1MTokens: 25,
    cacheReadPer1MTokens: 0.5,
    cacheWritePer1MTokens: 6.25,
    webSearchPer1kRequests: 10,
  },
  "qwen/qwen3-coder-next": {
    inputPer1MTokens: 0.11,
    outputPer1MTokens: 0.8,
    cacheReadPer1MTokens: 0.07,
  },
  "moonshotai/kimi-k2.5": {
    inputPer1MTokens: 0.44,
    outputPer1MTokens: 2,
    cacheReadPer1MTokens: 0.22,
  },
  "openai/gpt-audio": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
  },
  "openai/gpt-audio-mini": {
    inputPer1MTokens: 0.6,
    outputPer1MTokens: 2.4,
  },
  "openai/gpt-5.2-codex": {
    inputPer1MTokens: 1.75,
    outputPer1MTokens: 14,
    cacheReadPer1MTokens: 0.175,
  },
  "google/gemini-3-flash-preview": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 3,
    cacheReadPer1MTokens: 0.05,
    cacheWritePer1MTokens: 0.083333,
    reasoningPer1MTokens: 3,
    webSearchPer1kRequests: 14,
  },
  "nvidia/nemotron-3-nano-30b-a3b": {
    inputPer1MTokens: 0.05,
    outputPer1MTokens: 0.2,
  },
  "openai/gpt-5.2-chat": {
    inputPer1MTokens: 1.75,
    outputPer1MTokens: 14,
    cacheReadPer1MTokens: 0.175,
  },
  "openai/gpt-5.2-pro": {
    inputPer1MTokens: 21,
    outputPer1MTokens: 168,
    webSearchPer1kRequests: 10,
  },
  "openai/gpt-5.2": {
    inputPer1MTokens: 1.75,
    outputPer1MTokens: 14,
    cacheReadPer1MTokens: 0.175,
  },
  "mistralai/devstral-2512": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 2,
    cacheReadPer1MTokens: 0.04,
  },
  "openai/gpt-5.1-codex-max": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
    webSearchPer1kRequests: 10,
  },
  "amazon/nova-2-lite-v1": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 2.5,
  },
  "mistralai/ministral-14b-2512": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 0.2,
    cacheReadPer1MTokens: 0.02,
  },
  "mistralai/ministral-8b-2512": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.15,
    cacheReadPer1MTokens: 0.015,
  },
  "mistralai/ministral-3b-2512": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.1,
    cacheReadPer1MTokens: 0.01,
  },
  "mistralai/mistral-large-2512": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 1.5,
    cacheReadPer1MTokens: 0.05,
  },
  "deepseek/deepseek-v3.2-speciale": {
    inputPer1MTokens: 0.287,
    outputPer1MTokens: 0.431,
    cacheReadPer1MTokens: 0.058,
  },
  "deepseek/deepseek-v3.2": {
    inputPer1MTokens: 0.252,
    outputPer1MTokens: 0.378,
    cacheReadPer1MTokens: 0.0252,
  },
  "anthropic/claude-opus-4.5": {
    inputPer1MTokens: 5,
    outputPer1MTokens: 25,
    cacheReadPer1MTokens: 0.5,
    cacheWritePer1MTokens: 6.25,
    webSearchPer1kRequests: 10,
  },
  "google/gemini-3-pro-image-preview": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 12,
    cacheReadPer1MTokens: 0.2,
    cacheWritePer1MTokens: 0.375,
    reasoningPer1MTokens: 12,
    webSearchPer1kRequests: 14,
  },
  "x-ai/grok-4.1-fast": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 0.5,
    cacheReadPer1MTokens: 0.05,
    webSearchPer1kRequests: 5,
  },
  "openai/gpt-5.1": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.13,
  },
  "openai/gpt-5.1-chat": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
    webSearchPer1kRequests: 10,
  },
  "openai/gpt-5.1-codex": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
  },
  "openai/gpt-5.1-codex-mini": {
    inputPer1MTokens: 0.25,
    outputPer1MTokens: 2,
    cacheReadPer1MTokens: 0.03,
  },
  "moonshotai/kimi-k2-thinking": {
    inputPer1MTokens: 0.6,
    outputPer1MTokens: 2.5,
    cacheReadPer1MTokens: 0.15,
  },
  "amazon/nova-premier-v1": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 12.5,
    cacheReadPer1MTokens: 0.625,
  },
  "perplexity/sonar-pro-search": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    webSearchPer1kRequests: 18,
  },
  "mistralai/voxtral-small-24b-2507": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.3,
    cacheReadPer1MTokens: 0.01,
  },
  "openai/gpt-oss-safeguard-20b": {
    inputPer1MTokens: 0.075,
    outputPer1MTokens: 0.3,
    cacheReadPer1MTokens: 0.037,
  },
  "qwen/qwen3-vl-32b-instruct": {
    inputPer1MTokens: 0.104,
    outputPer1MTokens: 0.416,
  },
  "microsoft/phi-4-mini-instruct": {
    inputPer1MTokens: 0.08,
    outputPer1MTokens: 0.35,
    cacheReadPer1MTokens: 0.08,
  },
  "openai/gpt-5-image-mini": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 2,
    cacheReadPer1MTokens: 0.25,
    webSearchPer1kRequests: 10,
  },
  "anthropic/claude-haiku-4.5": {
    inputPer1MTokens: 1,
    outputPer1MTokens: 5,
    cacheReadPer1MTokens: 0.1,
    cacheWritePer1MTokens: 1.25,
    webSearchPer1kRequests: 10,
  },
  "qwen/qwen3-vl-8b-thinking": {
    inputPer1MTokens: 0.117,
    outputPer1MTokens: 1.365,
  },
  "qwen/qwen3-vl-8b-instruct": {
    inputPer1MTokens: 0.08,
    outputPer1MTokens: 0.5,
  },
  "openai/gpt-5-image": {
    inputPer1MTokens: 10,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 1.25,
    webSearchPer1kRequests: 10,
  },
  "openai/o3-deep-research": {
    inputPer1MTokens: 10,
    outputPer1MTokens: 40,
    cacheReadPer1MTokens: 2.5,
    webSearchPer1kRequests: 10,
  },
  "openai/o4-mini-deep-research": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 8,
    cacheReadPer1MTokens: 0.5,
    webSearchPer1kRequests: 10,
  },
  "nvidia/llama-3.3-nemotron-super-49b-v1.5": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.4,
  },
  "google/gemini-2.5-flash-image": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 2.5,
    cacheReadPer1MTokens: 0.03,
    cacheWritePer1MTokens: 0.083333,
    reasoningPer1MTokens: 2.5,
    webSearchPer1kRequests: 14,
  },
  "qwen/qwen3-vl-30b-a3b-thinking": {
    inputPer1MTokens: 0.13,
    outputPer1MTokens: 1.56,
  },
  "qwen/qwen3-vl-30b-a3b-instruct": {
    inputPer1MTokens: 0.13,
    outputPer1MTokens: 0.52,
  },
  "openai/gpt-5-pro": {
    inputPer1MTokens: 15,
    outputPer1MTokens: 120,
    webSearchPer1kRequests: 10,
  },
  "anthropic/claude-sonnet-4.5": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
    webSearchPer1kRequests: 10,
  },
  "deepseek/deepseek-v3.2-exp": {
    inputPer1MTokens: 0.27,
    outputPer1MTokens: 0.41,
  },
  "google/gemini-2.5-flash-lite-preview-09-2025": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.01,
    cacheWritePer1MTokens: 0.083333,
    reasoningPer1MTokens: 0.4,
    webSearchPer1kRequests: 14,
  },
  "qwen/qwen3-vl-235b-a22b-thinking": {
    inputPer1MTokens: 0.26,
    outputPer1MTokens: 2.6,
  },
  "qwen/qwen3-vl-235b-a22b-instruct": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 0.88,
    cacheReadPer1MTokens: 0.11,
  },
  "qwen/qwen3-max": {
    inputPer1MTokens: 0.78,
    outputPer1MTokens: 3.9,
    cacheReadPer1MTokens: 0.156,
    cacheWritePer1MTokens: 0.975,
  },
  "qwen/qwen3-coder-plus": {
    inputPer1MTokens: 0.65,
    outputPer1MTokens: 3.25,
    cacheReadPer1MTokens: 0.13,
    cacheWritePer1MTokens: 0.8125,
  },
  "openai/gpt-5-codex": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
  },
  "deepseek/deepseek-v3.1-terminus": {
    inputPer1MTokens: 0.27,
    outputPer1MTokens: 0.95,
    cacheReadPer1MTokens: 0.13,
  },
  "x-ai/grok-4-fast": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 0.5,
    cacheReadPer1MTokens: 0.05,
    webSearchPer1kRequests: 5,
  },
  "qwen/qwen3-coder-flash": {
    inputPer1MTokens: 0.195,
    outputPer1MTokens: 0.975,
    cacheReadPer1MTokens: 0.039,
    cacheWritePer1MTokens: 0.24375,
  },
  "qwen/qwen3-next-80b-a3b-thinking": {
    inputPer1MTokens: 0.0975,
    outputPer1MTokens: 0.78,
  },
  "qwen/qwen3-next-80b-a3b-instruct": {
    inputPer1MTokens: 0.09,
    outputPer1MTokens: 1.1,
  },
  "qwen/qwen-plus-2025-07-28": {
    inputPer1MTokens: 0.26,
    outputPer1MTokens: 0.78,
    cacheWritePer1MTokens: 0.325,
  },
  "nvidia/nemotron-nano-9b-v2": {
    inputPer1MTokens: 0.04,
    outputPer1MTokens: 0.16,
  },
  "moonshotai/kimi-k2-0905": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 2,
  },
  "qwen/qwen3-30b-a3b-thinking-2507": {
    inputPer1MTokens: 0.08,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.08,
  },
  "x-ai/grok-code-fast-1": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 1.5,
    cacheReadPer1MTokens: 0.02,
    webSearchPer1kRequests: 5,
  },
  "nousresearch/hermes-4-70b": {
    inputPer1MTokens: 0.13,
    outputPer1MTokens: 0.4,
  },
  "nousresearch/hermes-4-405b": {
    inputPer1MTokens: 1,
    outputPer1MTokens: 3,
  },
  "deepseek/deepseek-chat-v3.1": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.75,
  },
  "openai/gpt-4o-audio-preview": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
  },
  "mistralai/mistral-medium-3.1": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 2,
    cacheReadPer1MTokens: 0.04,
  },
  "openai/gpt-5-chat": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
    webSearchPer1kRequests: 10,
  },
  "openai/gpt-5": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
  },
  "openai/gpt-5-mini": {
    inputPer1MTokens: 0.25,
    outputPer1MTokens: 2,
    cacheReadPer1MTokens: 0.025,
    webSearchPer1kRequests: 10,
  },
  "openai/gpt-5-nano": {
    inputPer1MTokens: 0.05,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.01,
  },
  "openai/gpt-oss-120b": {
    inputPer1MTokens: 0.039,
    outputPer1MTokens: 0.18,
  },
  "openai/gpt-oss-20b": {
    inputPer1MTokens: 0.03,
    outputPer1MTokens: 0.14,
  },
  "anthropic/claude-opus-4.1": {
    inputPer1MTokens: 15,
    outputPer1MTokens: 75,
    cacheReadPer1MTokens: 1.5,
    cacheWritePer1MTokens: 18.75,
    webSearchPer1kRequests: 10,
  },
  "mistralai/codestral-2508": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 0.9,
    cacheReadPer1MTokens: 0.03,
  },
  "qwen/qwen3-coder-30b-a3b-instruct": {
    inputPer1MTokens: 0.07,
    outputPer1MTokens: 0.27,
  },
  "qwen/qwen3-30b-a3b-instruct-2507": {
    inputPer1MTokens: 0.09,
    outputPer1MTokens: 0.3,
  },
  "qwen/qwen3-235b-a22b-thinking-2507": {
    inputPer1MTokens: 0.1495,
    outputPer1MTokens: 1.495,
  },
  "qwen/qwen3-coder": {
    inputPer1MTokens: 0.22,
    outputPer1MTokens: 1.8,
  },
  "google/gemini-2.5-flash-lite": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.01,
    cacheWritePer1MTokens: 0.083333,
    reasoningPer1MTokens: 0.4,
    webSearchPer1kRequests: 14,
  },
  "qwen/qwen3-235b-a22b-2507": {
    inputPer1MTokens: 0.071,
    outputPer1MTokens: 0.1,
  },
  "moonshotai/kimi-k2": {
    inputPer1MTokens: 0.57,
    outputPer1MTokens: 2.3,
  },
  "mistralai/devstral-medium": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 2,
    cacheReadPer1MTokens: 0.04,
  },
  "mistralai/devstral-small": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.3,
    cacheReadPer1MTokens: 0.01,
  },
  "x-ai/grok-4": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.75,
    webSearchPer1kRequests: 5,
  },
  "mistralai/mistral-small-3.2-24b-instruct": {
    inputPer1MTokens: 0.075,
    outputPer1MTokens: 0.2,
  },
  "google/gemini-2.5-flash": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 2.5,
    cacheReadPer1MTokens: 0.03,
    cacheWritePer1MTokens: 0.083333,
    reasoningPer1MTokens: 2.5,
    webSearchPer1kRequests: 14,
  },
  "google/gemini-2.5-pro": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
    cacheWritePer1MTokens: 0.375,
    reasoningPer1MTokens: 10,
    webSearchPer1kRequests: 14,
  },
  "openai/o3-pro": {
    inputPer1MTokens: 20,
    outputPer1MTokens: 80,
    webSearchPer1kRequests: 10,
  },
  "x-ai/grok-3-mini": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 0.5,
    cacheReadPer1MTokens: 0.075,
    webSearchPer1kRequests: 5,
  },
  "x-ai/grok-3": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.75,
    webSearchPer1kRequests: 5,
  },
  "google/gemini-2.5-pro-preview": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
    cacheWritePer1MTokens: 0.375,
    reasoningPer1MTokens: 10,
    webSearchPer1kRequests: 14,
  },
  "deepseek/deepseek-r1-0528": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 2.15,
    cacheReadPer1MTokens: 0.35,
  },
  "anthropic/claude-opus-4": {
    inputPer1MTokens: 15,
    outputPer1MTokens: 75,
    cacheReadPer1MTokens: 1.5,
    cacheWritePer1MTokens: 18.75,
    webSearchPer1kRequests: 10,
  },
  "anthropic/claude-sonnet-4": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
    webSearchPer1kRequests: 10,
  },
  "google/gemma-3n-e4b-it": {
    inputPer1MTokens: 0.06,
    outputPer1MTokens: 0.12,
  },
  "mistralai/mistral-medium-3": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 2,
    cacheReadPer1MTokens: 0.04,
  },
  "google/gemini-2.5-pro-preview-05-06": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
    cacheWritePer1MTokens: 0.375,
    reasoningPer1MTokens: 10,
    webSearchPer1kRequests: 14,
  },
  "meta-llama/llama-guard-4-12b": {
    inputPer1MTokens: 0.18,
    outputPer1MTokens: 0.18,
  },
  "qwen/qwen3-30b-a3b": {
    inputPer1MTokens: 0.09,
    outputPer1MTokens: 0.45,
  },
  "qwen/qwen3-8b": {
    inputPer1MTokens: 0.05,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.05,
  },
  "qwen/qwen3-14b": {
    inputPer1MTokens: 0.06,
    outputPer1MTokens: 0.24,
  },
  "qwen/qwen3-32b": {
    inputPer1MTokens: 0.08,
    outputPer1MTokens: 0.24,
    cacheReadPer1MTokens: 0.04,
  },
  "qwen/qwen3-235b-a22b": {
    inputPer1MTokens: 0.455,
    outputPer1MTokens: 1.82,
  },
  "openai/o4-mini-high": {
    inputPer1MTokens: 1.1,
    outputPer1MTokens: 4.4,
    cacheReadPer1MTokens: 0.275,
    webSearchPer1kRequests: 10,
  },
  "openai/o3": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 8,
    cacheReadPer1MTokens: 0.5,
    webSearchPer1kRequests: 10,
  },
  "openai/o4-mini": {
    inputPer1MTokens: 1.1,
    outputPer1MTokens: 4.4,
    cacheReadPer1MTokens: 0.275,
    webSearchPer1kRequests: 10,
  },
  "openai/gpt-4.1": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 8,
    cacheReadPer1MTokens: 0.5,
  },
  "openai/gpt-4.1-mini": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 1.6,
    cacheReadPer1MTokens: 0.1,
    webSearchPer1kRequests: 10,
  },
  "openai/gpt-4.1-nano": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.025,
    webSearchPer1kRequests: 10,
  },
  "x-ai/grok-3-mini-beta": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 0.5,
    cacheReadPer1MTokens: 0.075,
    webSearchPer1kRequests: 5,
  },
  "x-ai/grok-3-beta": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.75,
    webSearchPer1kRequests: 5,
  },
  "meta-llama/llama-4-maverick": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
  },
  "meta-llama/llama-4-scout": {
    inputPer1MTokens: 0.08,
    outputPer1MTokens: 0.3,
  },
  "deepseek/deepseek-chat-v3-0324": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 0.77,
    cacheReadPer1MTokens: 0.135,
  },
  "openai/o1-pro": {
    inputPer1MTokens: 150,
    outputPer1MTokens: 600,
  },
  "mistralai/mistral-small-3.1-24b-instruct": {
    inputPer1MTokens: 0.35,
    outputPer1MTokens: 0.56,
  },
  "google/gemma-3-4b-it": {
    inputPer1MTokens: 0.04,
    outputPer1MTokens: 0.08,
  },
  "google/gemma-3-12b-it": {
    inputPer1MTokens: 0.04,
    outputPer1MTokens: 0.13,
  },
  "cohere/command-a": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
  },
  "openai/gpt-4o-mini-search-preview": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
    webSearchPer1kRequests: 27.5,
  },
  "openai/gpt-4o-search-preview": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
    webSearchPer1kRequests: 35,
  },
  "google/gemma-3-27b-it": {
    inputPer1MTokens: 0.08,
    outputPer1MTokens: 0.16,
  },
  "perplexity/sonar-reasoning-pro": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 8,
    webSearchPer1kRequests: 5,
  },
  "perplexity/sonar-pro": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    webSearchPer1kRequests: 5,
  },
  "perplexity/sonar-deep-research": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 8,
    reasoningPer1MTokens: 3,
    webSearchPer1kRequests: 5,
  },
  "google/gemini-2.0-flash-lite-001": {
    inputPer1MTokens: 0.075,
    outputPer1MTokens: 0.3,
    reasoningPer1MTokens: 0.3,
    webSearchPer1kRequests: 14,
  },
  "anthropic/claude-3.7-sonnet": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
    cacheReadPer1MTokens: 0.3,
    cacheWritePer1MTokens: 3.75,
    webSearchPer1kRequests: 10,
  },
  "mistralai/mistral-saba": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 0.6,
    cacheReadPer1MTokens: 0.02,
  },
  "meta-llama/llama-guard-3-8b": {
    inputPer1MTokens: 0.48,
    outputPer1MTokens: 0.03,
  },
  "openai/o3-mini-high": {
    inputPer1MTokens: 1.1,
    outputPer1MTokens: 4.4,
    cacheReadPer1MTokens: 0.55,
  },
  "google/gemini-2.0-flash-001": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.025,
    cacheWritePer1MTokens: 0.083333,
    reasoningPer1MTokens: 0.4,
    webSearchPer1kRequests: 14,
  },
  "qwen/qwen-vl-plus": {
    inputPer1MTokens: 0.1365,
    outputPer1MTokens: 0.4095,
    cacheReadPer1MTokens: 0.0273,
  },
  "qwen/qwen-vl-max": {
    inputPer1MTokens: 0.52,
    outputPer1MTokens: 2.08,
  },
  "qwen/qwen-turbo": {
    inputPer1MTokens: 0.0325,
    outputPer1MTokens: 0.13,
    cacheReadPer1MTokens: 0.0065,
  },
  "qwen/qwen2.5-vl-72b-instruct": {
    inputPer1MTokens: 0.25,
    outputPer1MTokens: 0.75,
  },
  "qwen/qwen-plus": {
    inputPer1MTokens: 0.26,
    outputPer1MTokens: 0.78,
    cacheReadPer1MTokens: 0.052,
    cacheWritePer1MTokens: 0.325,
  },
  "qwen/qwen-max": {
    inputPer1MTokens: 1.04,
    outputPer1MTokens: 4.16,
    cacheReadPer1MTokens: 0.208,
  },
  "openai/o3-mini": {
    inputPer1MTokens: 1.1,
    outputPer1MTokens: 4.4,
    cacheReadPer1MTokens: 0.55,
  },
  "mistralai/mistral-small-24b-instruct-2501": {
    inputPer1MTokens: 0.05,
    outputPer1MTokens: 0.08,
  },
  "deepseek/deepseek-r1-distill-qwen-32b": {
    inputPer1MTokens: 0.29,
    outputPer1MTokens: 0.29,
  },
  "perplexity/sonar": {
    inputPer1MTokens: 1,
    outputPer1MTokens: 1,
    webSearchPer1kRequests: 5,
  },
  "deepseek/deepseek-r1-distill-llama-70b": {
    inputPer1MTokens: 0.7,
    outputPer1MTokens: 0.8,
  },
  "deepseek/deepseek-r1": {
    inputPer1MTokens: 0.7,
    outputPer1MTokens: 2.5,
  },
  "microsoft/phi-4": {
    inputPer1MTokens: 0.065,
    outputPer1MTokens: 0.14,
  },
  "deepseek/deepseek-chat": {
    inputPer1MTokens: 0.32,
    outputPer1MTokens: 0.89,
  },
  "openai/o1": {
    inputPer1MTokens: 15,
    outputPer1MTokens: 60,
    cacheReadPer1MTokens: 7.5,
  },
  "cohere/command-r7b-12-2024": {
    inputPer1MTokens: 0.0375,
    outputPer1MTokens: 0.15,
  },
  "meta-llama/llama-3.3-70b-instruct": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.32,
  },
  "amazon/nova-lite-v1": {
    inputPer1MTokens: 0.06,
    outputPer1MTokens: 0.24,
  },
  "amazon/nova-micro-v1": {
    inputPer1MTokens: 0.035,
    outputPer1MTokens: 0.14,
  },
  "amazon/nova-pro-v1": {
    inputPer1MTokens: 0.8,
    outputPer1MTokens: 3.2,
  },
  "openai/gpt-4o-2024-11-20": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 1.25,
  },
  "mistralai/mistral-large-2411": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 6,
    cacheReadPer1MTokens: 0.2,
  },
  "mistralai/mistral-large-2407": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 6,
    cacheReadPer1MTokens: 0.2,
  },
  "mistralai/pixtral-large-2411": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 6,
    cacheReadPer1MTokens: 0.2,
  },
  "qwen/qwen-2.5-coder-32b-instruct": {
    inputPer1MTokens: 0.66,
    outputPer1MTokens: 1,
  },
  "anthropic/claude-3.5-haiku": {
    inputPer1MTokens: 0.8,
    outputPer1MTokens: 4,
    cacheReadPer1MTokens: 0.08,
    cacheWritePer1MTokens: 1,
    webSearchPer1kRequests: 10,
  },
  "qwen/qwen-2.5-7b-instruct": {
    inputPer1MTokens: 0.04,
    outputPer1MTokens: 0.1,
  },
  "inflection/inflection-3-productivity": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
  },
  "inflection/inflection-3-pi": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
  },
  "meta-llama/llama-3.2-3b-instruct": {
    inputPer1MTokens: 0.051,
    outputPer1MTokens: 0.34,
  },
  "meta-llama/llama-3.2-1b-instruct": {
    inputPer1MTokens: 0.027,
    outputPer1MTokens: 0.2,
  },
  "meta-llama/llama-3.2-11b-vision-instruct": {
    inputPer1MTokens: 0.245,
    outputPer1MTokens: 0.245,
  },
  "qwen/qwen-2.5-72b-instruct": {
    inputPer1MTokens: 0.36,
    outputPer1MTokens: 0.4,
  },
  "cohere/command-r-plus-08-2024": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
  },
  "cohere/command-r-08-2024": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
  },
  "nousresearch/hermes-3-llama-3.1-70b": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 0.3,
  },
  "nousresearch/hermes-3-llama-3.1-405b": {
    inputPer1MTokens: 1,
    outputPer1MTokens: 1,
  },
  "openai/gpt-4o-2024-08-06": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 1.25,
  },
  "meta-llama/llama-3.1-8b-instruct": {
    inputPer1MTokens: 0.02,
    outputPer1MTokens: 0.05,
  },
  "meta-llama/llama-3.1-70b-instruct": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 0.4,
  },
  "mistralai/mistral-nemo": {
    inputPer1MTokens: 0.02,
    outputPer1MTokens: 0.03,
  },
  "openai/gpt-4o-mini-2024-07-18": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
    cacheReadPer1MTokens: 0.075,
  },
  "openai/gpt-4o-mini": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
    cacheReadPer1MTokens: 0.075,
  },
  "google/gemma-2-27b-it": {
    inputPer1MTokens: 0.65,
    outputPer1MTokens: 0.65,
  },
  "nousresearch/hermes-2-pro-llama-3-8b": {
    inputPer1MTokens: 0.14,
    outputPer1MTokens: 0.14,
  },
  "openai/gpt-4o-2024-05-13": {
    inputPer1MTokens: 5,
    outputPer1MTokens: 15,
  },
  "openai/gpt-4o": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
  },
  "meta-llama/llama-3-8b-instruct": {
    inputPer1MTokens: 0.04,
    outputPer1MTokens: 0.04,
  },
  "meta-llama/llama-3-70b-instruct": {
    inputPer1MTokens: 0.51,
    outputPer1MTokens: 0.74,
  },
  "mistralai/mixtral-8x22b-instruct": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 6,
    cacheReadPer1MTokens: 0.2,
  },
  "microsoft/wizardlm-2-8x22b": {
    inputPer1MTokens: 0.62,
    outputPer1MTokens: 0.62,
  },
  "openai/gpt-4-turbo": {
    inputPer1MTokens: 10,
    outputPer1MTokens: 30,
  },
  "anthropic/claude-3-haiku": {
    inputPer1MTokens: 0.25,
    outputPer1MTokens: 1.25,
    cacheReadPer1MTokens: 0.03,
    cacheWritePer1MTokens: 0.3,
  },
  "mistralai/mistral-large": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 6,
    cacheReadPer1MTokens: 0.2,
  },
  "openai/gpt-4-turbo-preview": {
    inputPer1MTokens: 10,
    outputPer1MTokens: 30,
  },
  "openai/gpt-3.5-turbo-0613": {
    inputPer1MTokens: 1,
    outputPer1MTokens: 2,
  },
  "openai/gpt-4-1106-preview": {
    inputPer1MTokens: 10,
    outputPer1MTokens: 30,
  },
  "openai/gpt-3.5-turbo-instruct": {
    inputPer1MTokens: 1.5,
    outputPer1MTokens: 2,
  },
  "mistralai/mistral-7b-instruct-v0.1": {
    inputPer1MTokens: 0.11,
    outputPer1MTokens: 0.19,
  },
  "openai/gpt-3.5-turbo-16k": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 4,
  },
  "openai/gpt-4-0314": {
    inputPer1MTokens: 30,
    outputPer1MTokens: 60,
  },
  "openai/gpt-4": {
    inputPer1MTokens: 30,
    outputPer1MTokens: 60,
  },
  "openai/gpt-3.5-turbo": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 1.5,
  },
};
// Total entries: 240
