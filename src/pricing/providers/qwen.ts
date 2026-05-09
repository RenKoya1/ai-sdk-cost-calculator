import type { ProviderPricing } from "../types";

// Source: https://www.alibabacloud.com/help/en/model-studio/model-pricing
// (International/Singapore endpoint, USD, snapshot 2026-05-09)
// Tiered pricing simplified to base (lowest input-length) tier.
// Cache read = input * 0.1 where docs state "90% discount", else 0.5x for "50% discount".
export const qwenPricing: ProviderPricing = {
  // Qwen3 Max
  "qwen3-max": {
    inputPer1MTokens: 1.2,
    outputPer1MTokens: 6,
    cacheReadPer1MTokens: 0.12,
  },
  "qwen3-max-preview": {
    inputPer1MTokens: 1.2,
    outputPer1MTokens: 6,
    cacheReadPer1MTokens: 0.12,
  },

  // Qwen3.5 Plus / Flash
  "qwen3.5-plus": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 2.4,
  },
  "qwen3.5-flash": {
    inputPer1MTokens: 0.1,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.01,
  },

  // Qwen Plus / Flash / Turbo / Long
  "qwen-plus": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 1.2,
  },
  "qwen-plus-latest": {
    inputPer1MTokens: 0.4,
    outputPer1MTokens: 1.2,
  },
  "qwen-flash": {
    inputPer1MTokens: 0.05,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.005,
  },
  "qwen-turbo": {
    inputPer1MTokens: 0.05,
    outputPer1MTokens: 0.2,
    cacheReadPer1MTokens: 0.025,
  },
  "qwen-turbo-latest": {
    inputPer1MTokens: 0.05,
    outputPer1MTokens: 0.2,
    cacheReadPer1MTokens: 0.025,
  },
  "qwen-long": {
    inputPer1MTokens: 0.072,
    outputPer1MTokens: 0.287,
  },
  "qwen-long-latest": {
    inputPer1MTokens: 0.072,
    outputPer1MTokens: 0.287,
  },
  "qwen-max": {
    inputPer1MTokens: 1.04,
    outputPer1MTokens: 4.16,
    cacheReadPer1MTokens: 0.208,
  },
  "qwen-max-latest": {
    inputPer1MTokens: 1.04,
    outputPer1MTokens: 4.16,
    cacheReadPer1MTokens: 0.208,
  },

  // QwQ reasoning
  "qwq-plus": {
    inputPer1MTokens: 0.8,
    outputPer1MTokens: 2.4,
    reasoningPer1MTokens: 2.4,
  },
  "qwq-plus-latest": {
    inputPer1MTokens: 0.8,
    outputPer1MTokens: 2.4,
    reasoningPer1MTokens: 2.4,
  },

  // Vision-Language
  "qwen3-vl-plus": {
    inputPer1MTokens: 0.2,
    outputPer1MTokens: 1.6,
    cacheReadPer1MTokens: 0.02,
  },
  "qwen3-vl-flash": {
    inputPer1MTokens: 0.05,
    outputPer1MTokens: 0.4,
    cacheReadPer1MTokens: 0.005,
  },
  "qwen-vl-plus": {
    inputPer1MTokens: 0.1365,
    outputPer1MTokens: 0.4095,
    cacheReadPer1MTokens: 0.0273,
  },
  "qwen-vl-max": {
    inputPer1MTokens: 0.52,
    outputPer1MTokens: 2.08,
  },
  "qwen-vl-max-latest": {
    inputPer1MTokens: 0.52,
    outputPer1MTokens: 2.08,
  },

  // Omni (multimodal)
  "qwen3-omni-flash": {
    inputPer1MTokens: 0.43,
    outputPer1MTokens: 1.66,
  },

  // Coder
  "qwen3-coder-plus": {
    inputPer1MTokens: 1.0,
    outputPer1MTokens: 5,
    cacheReadPer1MTokens: 0.1,
  },
  "qwen3-coder-flash": {
    inputPer1MTokens: 0.3,
    outputPer1MTokens: 1.5,
  },

  // Qwen2.5 family (legacy, international rates)
  "qwen2.5-72b-instruct": {
    inputPer1MTokens: 0.36,
    outputPer1MTokens: 0.4,
  },
  "qwen2.5-32b-instruct": {
    inputPer1MTokens: 0.28,
    outputPer1MTokens: 0.56,
  },
  "qwen2.5-14b-instruct": {
    inputPer1MTokens: 0.28,
    outputPer1MTokens: 0.56,
  },
  "qwen2.5-7b-instruct": {
    inputPer1MTokens: 0.04,
    outputPer1MTokens: 0.1,
  },
  "qwen2.5-coder-32b-instruct": {
    inputPer1MTokens: 0.66,
    outputPer1MTokens: 1,
  },

  // Image generation — per Alibaba Model Studio docs (International/Singapore, USD)
  // Billed per successfully generated image; uniform across resolution/aspect ratio.
  // Multi-image fusion same rate as single; cost scales linearly with output count.
  "qwen-image": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.035,
  },
  "qwen-image-plus": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.03,
  },
  "qwen-image-max": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.075,
  },
  "qwen-image-2.0": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.035,
  },
  "qwen-image-2.0-pro": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.075,
  },

  // Image editing
  "qwen-image-edit": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.045,
  },
  "qwen-image-edit-plus": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.03,
  },
  "qwen-image-edit-max": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.075,
  },

  // Wan (Tongyi Wanxiang) — Text-to-Image
  "wan2.6-t2i": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.03,
  },
  "wan2.6-image": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.03,
  },
  "wan2.5-t2i-preview": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.03,
  },
  "wan2.5-i2i-preview": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.03,
  },
  "wan2.2-t2i-plus": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.05,
  },
  "wan2.2-t2i-flash": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.025,
  },
  "wan2.1-t2i-plus": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.05,
  },
  "wan2.1-t2i-turbo": {
    inputPer1MTokens: 0,
    outputPer1MTokens: 0,
    imageGenerationPerImage: 0.025,
  },
};
