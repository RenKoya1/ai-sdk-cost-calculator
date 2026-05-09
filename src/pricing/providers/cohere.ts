import type { ProviderPricing } from "../types";

// Source: https://cohere.com/pricing (Apr 2026)
export const coherePricing: ProviderPricing = {
  // Command A — flagship
  "command-a-03-2025": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
  },
  "command-a-reasoning-08-2025": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
    reasoningPer1MTokens: 10,
  },
  "command-a-vision-07-2025": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
  },
  // Command R+
  "command-r-plus": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
  },
  "command-r-plus-08-2024": {
    inputPer1MTokens: 2.5,
    outputPer1MTokens: 10,
  },
  "command-r-plus-04-2024": {
    inputPer1MTokens: 3,
    outputPer1MTokens: 15,
  },
  // Command R
  "command-r": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
  },
  "command-r-08-2024": {
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.6,
  },
  "command-r-03-2024": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 1.5,
  },
  // Command R7B
  "command-r7b-12-2024": {
    inputPer1MTokens: 0.0375,
    outputPer1MTokens: 0.15,
  },
  // Legacy Command
  "command": {
    inputPer1MTokens: 1,
    outputPer1MTokens: 2,
  },
  "command-light": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 0.6,
  },
  // Aya
  "c4ai-aya-expanse-8b": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 1.5,
  },
  "c4ai-aya-expanse-32b": {
    inputPer1MTokens: 0.5,
    outputPer1MTokens: 1.5,
  },
};
