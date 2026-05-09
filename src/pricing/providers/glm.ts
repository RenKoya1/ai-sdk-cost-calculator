import type { ProviderPricing } from "../types";

// Source: https://docs.z.ai/guides/overview/pricing (snapshot 2026-05-09)
// Z.ai (Zhipu) GLM models. Cache read = "Cached Input" tier.
// Free-tier models (glm-4.7-flash, glm-4.5-flash, glm-4.6v-flash) priced at 0.
export const glmPricing: ProviderPricing = {
  // Text — GLM-5 family
  "glm-5.1": {
    inputPer1MTokens: 1.4,
    outputPer1MTokens: 4.4,
    cacheReadPer1MTokens: 0.26,
  },
  "glm-5": {
    inputPer1MTokens: 1.0,
    outputPer1MTokens: 3.2,
    cacheReadPer1MTokens: 0.2,
  },
  "glm-5-turbo": {
    inputPer1MTokens: 1.2,
    outputPer1MTokens: 4.0,
    cacheReadPer1MTokens: 0.24,
  },

  // Text — GLM-4.7 family
  "glm-4.7": {
    inputPer1MTokens: 0.6,
    outputPer1MTokens: 2.2,
    cacheReadPer1MTokens: 0.11,
  },
  "glm-4.7-flashx": {
    inputPer1MTokens: 0.07,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.01,
  },
  "glm-4.7-flash": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
  },

  // Text — GLM-4.6
  "glm-4.6": {
    inputPer1MTokens: 0.6,
    outputPer1MTokens: 2.2,
    cacheReadPer1MTokens: 0.11,
  },

  // Text — GLM-4.5 family
  "glm-4.5": {
    inputPer1MTokens: 0.6,
    outputPer1MTokens: 2.2,
    cacheReadPer1MTokens: 0.11,
  },
  "glm-4.5-x": {
    inputPer1MTokens: 2.2,
    outputPer1MTokens: 8.9,
    cacheReadPer1MTokens: 0.45,
  },
  "glm-4.5-air": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 1.1,
    cacheReadPer1MTokens: 0.03,
  },
  "glm-4.5-airx": {
    inputPer1MTokens: 1.1,
    outputPer1MTokens: 4.5,
    cacheReadPer1MTokens: 0.22,
  },
  "glm-4.5-flash": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
  },

  // Vision
  "glm-5v-turbo": {
    inputPer1MTokens: 1.2,
    outputPer1MTokens: 4.0,
    cacheReadPer1MTokens: 0.24,
  },
  "glm-4.6v": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 0.9,
    cacheReadPer1MTokens: 0.05,
  },
  "glm-4.6v-flashx": {
    inputPer1MTokens: 0.04,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.004,
  },
  "glm-4.6v-flash": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
  },
  "glm-4.5v": {
    inputPer1MTokens: 0.6,
    outputPer1MTokens: 1.8,
    cacheReadPer1MTokens: 0.11,
  },

  // Image generation — per docs.z.ai/guides/overview/pricing
  // Billed per image, uniform regardless of resolution.
  "glm-image": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.015,
  },
  "cogview-4": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.01,
  },
};
