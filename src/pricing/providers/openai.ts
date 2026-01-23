import type { ProviderPricing } from "../types";

// Source: https://openai.com/api/pricing/ (via pricepertoken.com 2026)
export const openaiPricing: ProviderPricing = {
  // GPT-5 Series
  "gpt-5.2": {
    inputPer1MTokens: 1.75,
    outputPer1MTokens: 14,
    cacheReadPer1MTokens: 0.175,
  },
  "gpt-5.1": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
  },
  "gpt-5": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
  },
  "gpt-5-mini": {
    inputPer1MTokens: 0.25,
    outputPer1MTokens: 2,
    cacheReadPer1MTokens: 0.025,
  },
  "gpt-5-nano": {
    inputPer1MTokens: 0.05,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.005,
  },
  // GPT-5 Chat Latest variants
  "gpt-5.2-chat-latest": {
    inputPer1MTokens: 1.75,
    outputPer1MTokens: 14,
    cacheReadPer1MTokens: 0.175,
  },
  "gpt-5.1-chat-latest": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
  },
  "gpt-5-chat-latest": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
  },
  // GPT-5 Codex variants
  "gpt-5.2-codex": {
    inputPer1MTokens: 1.75,
    outputPer1MTokens: 14,
    cacheReadPer1MTokens: 0.175,
  },
  "gpt-5.1-codex-max": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
  },
  "gpt-5.1-codex": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
  },
  "gpt-5.1-codex-mini": {
    inputPer1MTokens: 0.25,
    outputPer1MTokens: 2,
    cacheReadPer1MTokens: 0.025,
  },
  "gpt-5-codex": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
  },
  "codex-mini-latest": {
    inputPer1MTokens: 1.5,
    outputPer1MTokens: 6,
    cacheReadPer1MTokens: 0.375,
  },
  // GPT-5 Pro variants
  "gpt-5.2-pro": {
    inputPer1MTokens: 21,
    outputPer1MTokens: 168,
  },
  "gpt-5-pro": {
    inputPer1MTokens: 15,
    outputPer1MTokens: 120,
  },
  // GPT-5 Search
  "gpt-5-search-api": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
  },
  // GPT-4o (web search: $10/1k calls + tokens at model rate)
  "gpt-4o": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 1.25,
    webSearchPer1kRequests: 10,
  },
  "gpt-4o-2024-11-20": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 1.25,
    webSearchPer1kRequests: 10,
  },
  "gpt-4o-2024-08-06": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 1.25,
    webSearchPer1kRequests: 10,
  },
  "gpt-4o-2024-05-13": {
    inputPer1MTokens: 5,
    outputPer1MTokens: 15,
  },
  // GPT-4o Search Preview
  "gpt-4o-search-preview": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
  },
  // GPT-4o Audio Preview
  "gpt-4o-audio-preview": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
  },
  "gpt-4o-audio-preview-2024-10-01": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
  },
  // GPT-4o Realtime Preview
  "gpt-4o-realtime-preview": {
    inputPer1MTokens: 5,
    outputPer1MTokens: 20,
    cacheReadPer1MTokens: 2.5,
  },
  // GPT-4o-mini (web search: $10/1k calls + fixed 8k tokens per call)
  "gpt-4o-mini": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
    cacheReadPer1MTokens: 0.075,
    webSearchPer1kRequests: 10,
    webSearchTokensPerRequest: 8000,
  },
  "gpt-4o-mini-2024-07-18": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
    cacheReadPer1MTokens: 0.075,
    webSearchPer1kRequests: 10,
    webSearchTokensPerRequest: 8000,
  },
  // GPT-4o-mini variants
  "gpt-4o-mini-search-preview": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
  },
  "gpt-4o-mini-audio-preview": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
  },
  "gpt-4o-mini-realtime-preview": {
    inputPer1MTokens: 0.6,
    outputPer1MTokens: 2.4,
    cacheReadPer1MTokens: 0.3,
  },
  // GPT-4.1 Series (web search: $10/1k calls + tokens at model rate)
  "gpt-4.1": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 8,
    cacheReadPer1MTokens: 0.5,
    webSearchPer1kRequests: 10,
  },
  "gpt-4.1-mini": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 1.6,
    cacheReadPer1MTokens: 0.1,
    webSearchPer1kRequests: 10,
    webSearchTokensPerRequest: 8000,
  },
  "gpt-4.1-nano": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.025,
    webSearchPer1kRequests: 10,
    webSearchTokensPerRequest: 8000,
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
  // GPT Realtime (audio streaming)
  "gpt-realtime": {
    inputPer1MTokens: 4,
    outputPer1MTokens: 16,
    cacheReadPer1MTokens: 0.4,
  },
  "gpt-realtime-mini": {
    inputPer1MTokens: 0.6,
    outputPer1MTokens: 2.4,
    cacheReadPer1MTokens: 0.06,
  },
  // GPT Audio
  "gpt-audio": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
  },
  "gpt-audio-mini": {
    inputPer1MTokens: 0.6,
    outputPer1MTokens: 2.4,
  },
  // Computer Use Preview
  "computer-use-preview": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 12,
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
    inputPer1MTokens: 1.1,
    outputPer1MTokens: 4.4,
    cacheReadPer1MTokens: 0.55,
    reasoningPer1MTokens: 4.4,
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
  "o3-deep-research": {
    inputPer1MTokens: 10,
    outputPer1MTokens: 40,
    cacheReadPer1MTokens: 2.5,
    reasoningPer1MTokens: 40,
  },
  // o4-mini
  "o4-mini": {
    inputPer1MTokens: 1.1,
    outputPer1MTokens: 4.4,
    cacheReadPer1MTokens: 0.275,
    reasoningPer1MTokens: 4.4,
  },
  "o4-mini-deep-research": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 8,
    cacheReadPer1MTokens: 0.5,
    reasoningPer1MTokens: 8,
  },
  // DALL-E 3
  "dall-e-3": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.04, // Default: standard 1024x1024
    imageGenerationPricing: {
      "1024x1024": 0.04,
      "1024x1792": 0.08,
      "1792x1024": 0.08,
      "hd-1024x1024": 0.08,
      "hd-1024x1792": 0.12,
      "hd-1792x1024": 0.12,
    },
  },
  // DALL-E 2
  "dall-e-2": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.02, // Default: 1024x1024
    imageGenerationPricing: {
      "1024x1024": 0.02,
      "512x512": 0.018,
      "256x256": 0.016,
    },
  },
  // GPT Image Models
  "gpt-image-1.5": {
    inputPer1MTokens: 5,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 1.25,
    imageGenerationPerImage: 0.04,
    imageGenerationPricing: {
      "1024x1024": 0.04,
      "1536x1024": 0.08,
      "1024x1536": 0.08,
      "auto": 0.04,
    },
  },
  "chatgpt-image-latest": {
    inputPer1MTokens: 5,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 1.25,
    imageGenerationPerImage: 0.04,
    imageGenerationPricing: {
      "1024x1024": 0.04,
      "1536x1024": 0.08,
      "1024x1536": 0.08,
      "auto": 0.04,
    },
  },
  "gpt-image-1": {
    inputPer1MTokens: 5,
    outputPer1MTokens: 0,
    cacheReadPer1MTokens: 1.25,
    imageGenerationPerImage: 0.04,
    imageGenerationPricing: {
      "1024x1024": 0.04,
      "1536x1024": 0.08,
      "1024x1536": 0.08,
      "auto": 0.04,
    },
  },
  "gpt-image-1-mini": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 0,
    cacheReadPer1MTokens: 0.2,
    imageGenerationPerImage: 0.02,
    imageGenerationPricing: {
      "1024x1024": 0.02,
      "1536x1024": 0.04,
      "1024x1536": 0.04,
      "auto": 0.02,
    },
  },
};
