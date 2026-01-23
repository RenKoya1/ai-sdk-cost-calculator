import type { ProviderPricing } from "../types";

// Source: https://ai.google.dev/gemini-api/docs/pricing (Jan 2026)
// Grounding with Google Search: $14-35/1k requests depending on model
// Google Maps (Dynamic Maps): $7/1k requests
export const googlePricing: ProviderPricing = {
  // Gemini 3 Pro Preview - with long context pricing (grounding: $14/1k, maps: $7/1k)
  // Output price includes thinking tokens
  "gemini-3-pro-preview": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 12,
    reasoningPer1MTokens: 12,
    longContextThreshold: 200000,
    longContextInputPer1MTokens: 4,
    longContextOutputPer1MTokens: 18,
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 7,
  },
  "gemini-3-pro": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 12,
    reasoningPer1MTokens: 12,
    longContextThreshold: 200000,
    longContextInputPer1MTokens: 4,
    longContextOutputPer1MTokens: 18,
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 7,
  },
  // Gemini 3 Pro Image Preview - Native image generation
  "gemini-3-pro-image-preview": {
    inputPer1MTokens: 2, // Text input follows 3 Pro pricing
    outputPer1MTokens: 120, // Estimated based on 2.5 Flash Image pricing
    reasoningPer1MTokens: 12,
    imageGenerationPerImage: 0.05, // Estimated for Pro tier
    imageGenerationPricing: {
      "1024x1024": 0.134,
      "2048x2048": 0.24,
    },
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 7,
  },
  // Gemini 3 Flash Preview (grounding: $14/1k, maps: $7/1k)
  // Output price includes thinking tokens
  "gemini-3-flash-preview": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 3,
    reasoningPer1MTokens: 3,
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 7,
  },
  "gemini-3-flash": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 3,
    reasoningPer1MTokens: 3,
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 7,
  },
  // Gemini 2.5 Pro - with long context pricing (grounding: $35/1k, maps: $7/1k)
  // Output price includes thinking tokens
  "gemini-2.5-pro": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
    reasoningPer1MTokens: 10,
    longContextThreshold: 200000,
    longContextInputPer1MTokens: 2.5,
    longContextOutputPer1MTokens: 15,
    longContextReasoningPer1MTokens: 15,
    webSearchPer1kRequests: 35,
    googleMapsPer1kRequests: 7,
  },
  "gemini-2.5-pro-preview": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
    reasoningPer1MTokens: 10,
    longContextThreshold: 200000,
    longContextInputPer1MTokens: 2.5,
    longContextOutputPer1MTokens: 15,
    longContextReasoningPer1MTokens: 15,
    webSearchPer1kRequests: 35,
    googleMapsPer1kRequests: 7,
  },
  // Gemini 2.5 Flash (grounding: $14/1k, maps: $7/1k)
  // Output price includes thinking tokens
  "gemini-2.5-flash": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 2.5,
    cacheReadPer1MTokens: 0.03,
    reasoningPer1MTokens: 2.5,
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 7,
  },
  "gemini-2.5-flash-preview": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 2.5,
    cacheReadPer1MTokens: 0.03,
    reasoningPer1MTokens: 2.5,
    webSearchPer1kRequests: 14,
    googleMapsPer1kRequests: 7,
  },
  // Gemini 2.5 Flash-Lite
  // Output price includes thinking tokens
  "gemini-2.5-flash-lite": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.4,
    reasoningPer1MTokens: 0.4,
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
  "gemini-2.5-flash-image": {
    inputPer1MTokens: 0.3, // Text input follows 2.5 Flash pricing
    outputPer1MTokens: 30, // $30/1M tokens for image output
    imageGenerationPerImage: 0.039, // Standard 1K image (1290 tokens)
    imageGenerationPricing: {
      "1024x1024": 0.039, // 1K standard
      "2048x2048": 0.134, // 2K large (1120 tokens)
    },
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
  // TODO: Add video and music generation models with new pricing types
  // Veo 3/3.1 - Video generation: $0.40-0.75 per second (requires videoGenerationPerSecond)
  // Lyria 2 - Music generation: $0.06 per 30 seconds (requires musicGenerationPer30Seconds)
  // Lyria RealTime - Music streaming: Free (experimental)
};
