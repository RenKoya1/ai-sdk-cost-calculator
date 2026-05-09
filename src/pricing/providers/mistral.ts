import type { ProviderPricing } from "../types";

// Source: https://mistral.ai/pricing, https://pricepertoken.com (Apr 2026)
export const mistralPricing: ProviderPricing = {
  // Mistral Large
  "mistral-large-latest": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 1.5,
  },
  "mistral-large-2512": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 1.5,
  },
  "mistral-large-2411": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 6,
  },
  "mistral-large": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 1.5,
  },
  // Mistral Medium (AI SDK uses date-stamped IDs: 2508, 2505)
  "mistral-medium-latest": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 2,
  },
  "mistral-medium-2508": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 2,
  },
  "mistral-medium-2505": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 2,
  },
  "mistral-medium-3.1": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 2,
  },
  "mistral-medium-3": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 2,
  },
  // Mistral Small
  "mistral-small-latest": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
  },
  "mistral-small-2603": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
  },
  "mistral-small-3.2-24b-instruct": {
    inputPer1MTokens: 0.075,
    outputPer1MTokens: 0.2,
  },
  "mistral-small-3.1-24b-instruct": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.3,
  },
  "mistral-small-24b-instruct-2501": {
    inputPer1MTokens: 0.05,
    outputPer1MTokens: 0.08,
  },
  "mistral-small": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.3,
  },
  // Ministral
  "ministral-3b-latest": {
    inputPer1MTokens: 0.04,
    outputPer1MTokens: 0.04,
  },
  "ministral-3b-2512": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.1,
  },
  "ministral-3b": {
    inputPer1MTokens: 0.04,
    outputPer1MTokens: 0.04,
  },
  "ministral-8b-latest": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.1,
  },
  "ministral-8b-2512": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.15,
  },
  "ministral-8b": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.1,
  },
  // Codestral
  "codestral-latest": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 0.9,
  },
  "codestral-2508": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 0.9,
  },
  // Devstral (code agent)
  "devstral-medium": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 2,
  },
  "devstral-2512": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 0.9,
  },
  "devstral-small": {
    inputPer1MTokens: 0.07,
    outputPer1MTokens: 0.28,
  },
  // Pixtral / Vision
  "pixtral-large-latest": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 6,
  },
  "pixtral-12b": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.1,
  },
  "pixtral-12b-2409": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.1,
  },
  // Voxtral (audio)
  "voxtral-small-24b-2507": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.3,
  },
  // Magistral (reasoning) — AI SDK uses date-stamped IDs (2506, 2507)
  "magistral-small-latest": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 1.5,
    reasoningPer1MTokens: 1.5,
  },
  "magistral-small-2507": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 1.5,
    reasoningPer1MTokens: 1.5,
  },
  "magistral-small-2506": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 1.5,
    reasoningPer1MTokens: 1.5,
  },
  "magistral-medium-latest": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 5,
    reasoningPer1MTokens: 5,
  },
  "magistral-medium-2507": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 5,
    reasoningPer1MTokens: 5,
  },
  "magistral-medium-2506": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 5,
    reasoningPer1MTokens: 5,
  },
  // Open weights
  "open-mistral-nemo": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.15,
  },
  "open-mistral-7b": {
    inputPer1MTokens: 0.25,
    outputPer1MTokens: 0.25,
  },
  "open-mixtral-8x7b": {
    inputPer1MTokens: 0.7,
    outputPer1MTokens: 0.7,
  },
  "open-mixtral-8x22b": {
    inputPer1MTokens: 2,
    outputPer1MTokens: 6,
  },
  "mistral-nemo": {
    inputPer1MTokens: 0.02,
    outputPer1MTokens: 0.03,
  },
  "mistral-saba": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 0.6,
  },
};
