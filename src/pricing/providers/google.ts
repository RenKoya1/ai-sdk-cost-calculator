import type { ProviderPricing } from "../types";

// Source: https://ai.google.dev/gemini-api/docs/pricing (Apr 2026)
// Grounding with Google Search:
//   - Gemini 3 family: 5,000 queries/month free (shared across Gemini 3), then $14/1k
//   - Gemini 2.5 family: 1,500 RPD free, then $35/1k
//   - Input tokens provided by grounding are NOT charged
// Grounding with Google Maps:
//   - Gemini 3 family: 5,000/month free (shared), then $14/1k
//   - Gemini 2.5 family: 1,500-10,000 RPD free, then $25/1k
// Audio rates and cache storage rates: caller must supply audioInputTokens /
// audioOutputTokens / cacheStorageTokenHours to engage these line items.
export const googlePricing: ProviderPricing = {
  // Gemini 3.1 Pro Preview - with long context pricing
  // Grounding: Gemini 3 family shares 5,000 free/month, then $14/1k for both Search and Maps
  // Output price includes thinking tokens. Cache storage: $4.50/1M tokens/hour
  "gemini-3.1-pro-preview": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 12,
    cacheReadPer1MTokens: 0.2,
    cacheStoragePer1MTokensPerHour: 4.5,
    reasoningPer1MTokens: 12,
    longContextThreshold: 200000,
    longContextInputPer1MTokens: 4,
    longContextOutputPer1MTokens: 18,
    longContextCacheReadPer1MTokens: 0.4,
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 14,
  },
  "gemini-3.1-pro-preview-customtools": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 12,
    cacheReadPer1MTokens: 0.2,
    cacheStoragePer1MTokensPerHour: 4.5,
    reasoningPer1MTokens: 12,
    longContextThreshold: 200000,
    longContextInputPer1MTokens: 4,
    longContextOutputPer1MTokens: 18,
    longContextCacheReadPer1MTokens: 0.4,
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 14,
  },
  // Gemini 3 Pro Preview - with long context pricing
  // Grounding: $14/1k Search and Maps (5k free/month shared across Gemini 3)
  // Output price includes thinking tokens
  "gemini-3-pro-preview": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 12,
    cacheReadPer1MTokens: 0.2,
    reasoningPer1MTokens: 12,
    longContextThreshold: 200000,
    longContextInputPer1MTokens: 4,
    longContextOutputPer1MTokens: 18,
    longContextCacheReadPer1MTokens: 0.4,
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 14,
  },
  "gemini-3-pro": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 12,
    cacheReadPer1MTokens: 0.2,
    reasoningPer1MTokens: 12,
    longContextThreshold: 200000,
    longContextInputPer1MTokens: 4,
    longContextOutputPer1MTokens: 18,
    longContextCacheReadPer1MTokens: 0.4,
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 14,
  },
  // Gemini 3 Pro Image Preview - Native image generation
  // Image output: $120/1M tokens. 1K/2K = 1120 tokens ($0.134), 4K = 2000 tokens ($0.24)
  "gemini-3-pro-image-preview": {
    inputPer1MTokens: 2, // Text input follows 3 Pro pricing
    outputPer1MTokens: 12, // Text/thinking output (same as 3 Pro)
    reasoningPer1MTokens: 12,
    imageOutputPer1MTokens: 120,
    imageOutputTokensBySize: {
      "1K": 1120,
      "2K": 1120,
      "4K": 2000,
    },
    imageGenerationPricing: {
      // Exact per-image prices from Google
      "1K": 0.134,
      "2K": 0.134,
      "4K": 0.24,
    },
    imageGenerationPerImage: 0.134, // Default 1K
    imageOutputDefaultSize: "1K",
    webSearchPer1kRequests: 14, // Web and Image Search; Maps not supported on this model
  },
  // Gemini 3 Flash Preview
  // Input: $0.50/1M (text/image/video), $1.00/1M (audio)
  // Output: $3.00/1M (incl. thinking)
  // Cache: $0.05/1M (text/image/video), $0.10/1M (audio), $1.00/1M/hour storage
  // Grounding: $14/1k Search and Maps (5k free/month shared across Gemini 3)
  "gemini-3-flash-preview": {
    inputPer1MTokens: 0.5,
    audioInputPer1MTokens: 1,
    outputPer1MTokens: 3,
    cacheReadPer1MTokens: 0.05,
    cacheStoragePer1MTokensPerHour: 1,
    reasoningPer1MTokens: 3,
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 14,
  },
  "gemini-3-flash": {
    inputPer1MTokens: 0.5,
    audioInputPer1MTokens: 1,
    outputPer1MTokens: 3,
    cacheReadPer1MTokens: 0.05,
    cacheStoragePer1MTokensPerHour: 1,
    reasoningPer1MTokens: 3,
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 14,
  },
  // Gemini 3.1 Flash Image Preview - Native image generation (grounding: $14/1k, no Maps)
  // Input: $0.50/1M tokens (text/image), Text+thinking output: $3/1M, Image output: $60/1M
  // Image output: $0.045 per 0.5K, $0.067 per 1K, $0.101 per 2K, $0.151 per 4K
  "gemini-3.1-flash-image-preview": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 3, // Text/thinking output
    reasoningPer1MTokens: 3,
    imageOutputPer1MTokens: 60,
    imageOutputTokensBySize: {
      "512px": 747,
      "1K": 1120,
      "2K": 1680,
      "4K": 2520,
    },
    imageGenerationPricing: {
      // Exact per-image prices from Google
      "512px": 0.045,
      "1K": 0.067,
      "2K": 0.101,
      "4K": 0.151,
    },
    imageGenerationPerImage: 0.067, // Default 1K
    imageOutputDefaultSize: "1K",
    webSearchPer1kRequests: 14,
  },
  "gemini-3.1-flash-image": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 3, // Text and thinking output
    reasoningPer1MTokens: 3,
    imageOutputPer1MTokens: 60,
    imageOutputTokensBySize: {
      "512px": 747,
      "1K": 1120,
      "2K": 1680,
      "4K": 2520,
    },
    imageGenerationPricing: {
      // Exact per-image prices from Google
      "512px": 0.045,
      "1K": 0.067,
      "2K": 0.101,
      "4K": 0.151,
    },
    imageGenerationPerImage: 0.067, // Default 1K
    imageOutputDefaultSize: "1K",
    webSearchPer1kRequests: 14,
  },
  // Gemini 3.1 Flash Lite Preview - Lightweight model
  // Input: $0.25/1M (text/image/video), $0.50/1M (audio)
  // Output: $1.50/1M (including thinking), Cache: $0.025/1M read, $1.00/1M/hour storage
  // Grounding: $14/1k Search and Maps (5k free/month shared across Gemini 3)
  "gemini-3.1-flash-lite-preview": {
    inputPer1MTokens: 0.25,
    audioInputPer1MTokens: 0.5,
    outputPer1MTokens: 1.5,
    cacheReadPer1MTokens: 0.025,
    cacheStoragePer1MTokensPerHour: 1,
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 14,
  },
  "gemini-3.1-flash-lite": {
    inputPer1MTokens: 0.25,
    audioInputPer1MTokens: 0.5,
    outputPer1MTokens: 1.5,
    cacheReadPer1MTokens: 0.025,
    cacheStoragePer1MTokensPerHour: 1,
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 14,
  },
  // Gemini 2.5 Pro - with long context pricing (grounding: $35/1k, maps: $25/1k)
  // Output price includes thinking tokens. Cache storage: $4.50/1M tokens/hour
  "gemini-2.5-pro": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
    cacheStoragePer1MTokensPerHour: 4.5,
    reasoningPer1MTokens: 10,
    longContextThreshold: 200000,
    longContextInputPer1MTokens: 2.5,
    longContextOutputPer1MTokens: 15,
    longContextCacheReadPer1MTokens: 0.25,
    longContextReasoningPer1MTokens: 15,
    webSearchPer1kRequests: 35,
    googleMapsPer1kRequests: 25,
  },
  "gemini-2.5-pro-preview": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
    cacheStoragePer1MTokensPerHour: 4.5,
    reasoningPer1MTokens: 10,
    longContextThreshold: 200000,
    longContextInputPer1MTokens: 2.5,
    longContextOutputPer1MTokens: 15,
    longContextCacheReadPer1MTokens: 0.25,
    longContextReasoningPer1MTokens: 15,
    webSearchPer1kRequests: 35,
    googleMapsPer1kRequests: 25,
  },
  // Gemini 2.5 Flash (grounding: $35/1k, maps: $25/1k)
  // Audio input: $1/1M, Cache audio: $0.10/1M, Storage: $1/1M/hour
  "gemini-2.5-flash": {
    inputPer1MTokens: 0.3,
    audioInputPer1MTokens: 1,
    outputPer1MTokens: 2.5,
    cacheReadPer1MTokens: 0.03,
    cacheStoragePer1MTokensPerHour: 1,
    reasoningPer1MTokens: 2.5,
    webSearchPer1kRequests: 35,
    googleMapsPer1kRequests: 25,
  },
  "gemini-2.5-flash-preview": {
    inputPer1MTokens: 0.3,
    audioInputPer1MTokens: 1,
    outputPer1MTokens: 2.5,
    cacheReadPer1MTokens: 0.03,
    cacheStoragePer1MTokensPerHour: 1,
    reasoningPer1MTokens: 2.5,
    webSearchPer1kRequests: 35,
    googleMapsPer1kRequests: 25,
  },
  // Gemini 2.5 Flash-Lite (grounding: $35/1k, maps: $25/1k)
  // Audio input: $0.30/1M, Cache audio: $0.03/1M, Storage: $1/1M/hour
  "gemini-2.5-flash-lite": {
    inputPer1MTokens: 0.1,
    audioInputPer1MTokens: 0.3,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.01,
    cacheStoragePer1MTokensPerHour: 1,
    reasoningPer1MTokens: 0.4,
    webSearchPer1kRequests: 35,
    googleMapsPer1kRequests: 25,
  },
  "gemini-2.5-flash-lite-preview-09-2025": {
    inputPer1MTokens: 0.1,
    audioInputPer1MTokens: 0.3,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.01,
    cacheStoragePer1MTokensPerHour: 1,
    reasoningPer1MTokens: 0.4,
    webSearchPer1kRequests: 35,
  },
  // Gemini 2.0 Flash (grounding: $14/1k, maps: $7/1k)
  // Output price includes thinking tokens
  "gemini-2.0-flash": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.01,
    reasoningPer1MTokens: 0.4,
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 7,
  },
  // Gemini 2.0 Flash-Lite
  // Output price includes thinking tokens
  "gemini-2.0-flash-lite": {
    inputPer1MTokens: 0.075,
    outputPer1MTokens: 0.3,
    reasoningPer1MTokens: 0.3,
  },
  "gemini-2.0-flash-exp": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    reasoningPer1MTokens: 0,
  },
  // Gemini 1.5 Pro - with long context pricing (grounding: $35/1k, maps: $7/1k)
  // Output price includes thinking tokens
  "gemini-1.5-pro": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 5,
    cacheReadPer1MTokens: 0.125,
    reasoningPer1MTokens: 5,
    longContextThreshold: 128000,
    longContextInputPer1MTokens: 2.5,
    longContextOutputPer1MTokens: 10,
    longContextReasoningPer1MTokens: 10,
    webSearchPer1kRequests: 35,
    googleMapsPer1kRequests: 7,
  },
  "gemini-1.5-pro-latest": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 5,
    cacheReadPer1MTokens: 0.125,
    reasoningPer1MTokens: 5,
    longContextThreshold: 128000,
    longContextInputPer1MTokens: 2.5,
    longContextOutputPer1MTokens: 10,
    longContextReasoningPer1MTokens: 10,
    webSearchPer1kRequests: 35,
    googleMapsPer1kRequests: 7,
  },
  // Gemini 1.5 Flash - with long context pricing (grounding: $14/1k, maps: $7/1k)
  // Output price includes thinking tokens
  "gemini-1.5-flash": {
    inputPer1MTokens: 0.075,
    outputPer1MTokens: 0.3,
    cacheReadPer1MTokens: 0.0075,
    reasoningPer1MTokens: 0.3,
    longContextThreshold: 128000,
    longContextInputPer1MTokens: 0.15,
    longContextOutputPer1MTokens: 0.6,
    longContextReasoningPer1MTokens: 0.6,
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 7,
  },
  "gemini-1.5-flash-latest": {
    inputPer1MTokens: 0.075,
    outputPer1MTokens: 0.3,
    cacheReadPer1MTokens: 0.0075,
    reasoningPer1MTokens: 0.3,
    longContextThreshold: 128000,
    longContextInputPer1MTokens: 0.15,
    longContextOutputPer1MTokens: 0.6,
    longContextReasoningPer1MTokens: 0.6,
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 7,
  },
  "gemini-1.5-flash-8b": {
    inputPer1MTokens: 0.0375,
    outputPer1MTokens: 0.15,
    cacheReadPer1MTokens: 0.00375,
    reasoningPer1MTokens: 0.15,
    longContextThreshold: 128000,
    longContextInputPer1MTokens: 0.075,
    longContextOutputPer1MTokens: 0.3,
    longContextReasoningPer1MTokens: 0.3,
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 7,
  },
  // Imagen 3 - image generation
  "imagen-3.0-generate-002": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.04,
    imageGenerationPricing: {
      "1024x1024": 0.04,
      "1536x1536": 0.08,
    },
  },
  "imagen-3.0-generate-001": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.04,
    imageGenerationPricing: {
      "1024x1024": 0.04,
      "1536x1536": 0.08,
    },
  },
  "imagen-3": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.04,
    imageGenerationPricing: {
      "1024x1024": 0.04,
      "1536x1536": 0.08,
    },
  },
  // Imagen 3 Fast
  "imagen-3.0-fast-generate-001": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.02,
    imageGenerationPricing: {
      "1024x1024": 0.02,
      "1536x1536": 0.04,
    },
  },
  "imagen-3-fast": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.02,
    imageGenerationPricing: {
      "1024x1024": 0.02,
      "1536x1536": 0.04,
    },
  },
  // Gemini 2.5 Flash Image - Native image generation
  // Output: $30/1M tokens. 1K (1024x1024) = 1290 tokens = $0.039 per image
  "gemini-2.5-flash-image": {
    inputPer1MTokens: 0.3, // Text/image input
    outputPer1MTokens: 2.5, // Text output (same as 2.5 Flash)
    imageOutputPer1MTokens: 30,
    imageOutputTokensBySize: {
      "1K": 1290,
    },
    imageGenerationPricing: {
      "1K": 0.039,
    },
    imageGenerationPerImage: 0.039,
    imageOutputDefaultSize: "1K",
  },
  // Gemini 2.5 Flash TTS - Text-to-Speech
  "gemini-2.5-flash-tts": {
    inputPer1MTokens: 0.5, // Text input
    outputPer1MTokens: 10, // Audio output
  },
  "gemini-2.5-flash-tts-batch": {
    inputPer1MTokens: 0.25, // Batch pricing
    outputPer1MTokens: 5, // Batch pricing
  },
  // Gemini 2.5 Pro TTS - Text-to-Speech (higher quality)
  "gemini-2.5-pro-tts": {
    inputPer1MTokens: 1,
    outputPer1MTokens: 20,
  },
  "gemini-2.5-pro-tts-batch": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 10,
  },
  // Gemini 3.1 Flash TTS Preview - Text-to-Speech (audio: 25 tokens/second)
  "gemini-3.1-flash-tts-preview": {
    inputPer1MTokens: 1, // Text input
    outputPer1MTokens: 20, // Audio output
  },
  "gemini-3.1-flash-tts-preview-batch": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 10,
  },
  // Gemini 3.1 Flash Live Preview - Real-time audio dialogue
  // Input: $0.75 text, $3 audio (or $0.005/min), $1 image/video. Output: $4.50 text, $12 audio
  "gemini-3.1-flash-live-preview": {
    inputPer1MTokens: 0.75,
    audioInputPer1MTokens: 3,
    outputPer1MTokens: 4.5,
    audioOutputPer1MTokens: 12,
    webSearchPer1kRequests: 14,
  },
  // Gemini 2.5 Flash Native Audio (Live API)
  // Input: $0.50 text, $3 audio/video. Output: $2 text, $12 audio
  "gemini-2.5-flash-native-audio-preview-12-2025": {
    inputPer1MTokens: 0.5,
    audioInputPer1MTokens: 3,
    outputPer1MTokens: 2,
    audioOutputPer1MTokens: 12,
  },
  // TODO: Add video and music generation models with new pricing types
  // Veo 3/3.1 - Video generation: $0.40-0.75 per second (requires videoGenerationPerSecond)
  // Lyria 2 - Music generation: $0.06 per 30 seconds (requires musicGenerationPer30Seconds)
  // Lyria RealTime - Music streaming: Free (experimental)
};
