import type { ProviderPricing } from "./types";

// Source: https://ai.google.dev/gemini-api/docs/pricing (Jan 2026)
export const googlePricing: ProviderPricing = {
  // Gemini 3 Pro Preview - with long context pricing
  "gemini-3-pro-preview": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 12,
    longContextThreshold: 200000,
    longContextInputPer1MTokens: 4,
    longContextOutputPer1MTokens: 18,
  },
  "gemini-3-pro": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 12,
    longContextThreshold: 200000,
    longContextInputPer1MTokens: 4,
    longContextOutputPer1MTokens: 18,
  },
  // Gemini 3 Flash Preview
  "gemini-3-flash-preview": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 3,
  },
  "gemini-3-flash": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 3,
  },
  // Gemini 2.5 Pro - with long context pricing
  "gemini-2.5-pro": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
    reasoningPer1MTokens: 10,
    longContextThreshold: 200000,
    longContextInputPer1MTokens: 2.5,
    longContextOutputPer1MTokens: 15,
  },
  "gemini-2.5-pro-preview": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 10,
    cacheReadPer1MTokens: 0.125,
    reasoningPer1MTokens: 10,
    longContextThreshold: 200000,
    longContextInputPer1MTokens: 2.5,
    longContextOutputPer1MTokens: 15,
  },
  // Gemini 2.5 Flash
  "gemini-2.5-flash": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 2.5,
    cacheReadPer1MTokens: 0.03,
    reasoningPer1MTokens: 2.5,
  },
  "gemini-2.5-flash-preview": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 2.5,
    cacheReadPer1MTokens: 0.03,
    reasoningPer1MTokens: 2.5,
  },
  // Gemini 2.5 Flash-Lite
  "gemini-2.5-flash-lite": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.4,
  },
  // Gemini 2.0 Flash
  "gemini-2.0-flash": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.01,
  },
  // Gemini 2.0 Flash-Lite
  "gemini-2.0-flash-lite": {
    inputPer1MTokens: 0.075,
    outputPer1MTokens: 0.3,
  },
  "gemini-2.0-flash-exp": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
  },
  // Gemini 1.5 Pro - with long context pricing
  "gemini-1.5-pro": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 5,
    cacheReadPer1MTokens: 0.125,
    longContextThreshold: 128000,
    longContextInputPer1MTokens: 2.5,
    longContextOutputPer1MTokens: 10,
  },
  "gemini-1.5-pro-latest": {
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 5,
    cacheReadPer1MTokens: 0.125,
    longContextThreshold: 128000,
    longContextInputPer1MTokens: 2.5,
    longContextOutputPer1MTokens: 10,
  },
  // Gemini 1.5 Flash - with long context pricing
  "gemini-1.5-flash": {
    inputPer1MTokens: 0.075,
    outputPer1MTokens: 0.3,
    cacheReadPer1MTokens: 0.0075,
    longContextThreshold: 128000,
    longContextInputPer1MTokens: 0.15,
    longContextOutputPer1MTokens: 0.6,
  },
  "gemini-1.5-flash-latest": {
    inputPer1MTokens: 0.075,
    outputPer1MTokens: 0.3,
    cacheReadPer1MTokens: 0.0075,
    longContextThreshold: 128000,
    longContextInputPer1MTokens: 0.15,
    longContextOutputPer1MTokens: 0.6,
  },
  "gemini-1.5-flash-8b": {
    inputPer1MTokens: 0.0375,
    outputPer1MTokens: 0.15,
    cacheReadPer1MTokens: 0.00375,
    longContextThreshold: 128000,
    longContextInputPer1MTokens: 0.075,
    longContextOutputPer1MTokens: 0.3,
  },
};
