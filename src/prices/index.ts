export type { ModelPricing, ProviderPricing } from "./types";

export { openaiPricing } from "./openai";
export { anthropicPricing } from "./anthropic";
export { googlePricing } from "./google";
export { xaiPricing } from "./xai";
export { deepseekPricing } from "./deepseek";

import { openaiPricing } from "./openai";
import { anthropicPricing } from "./anthropic";
import { googlePricing } from "./google";
import { xaiPricing } from "./xai";
import { deepseekPricing } from "./deepseek";
import type { ProviderPricing } from "./types";

// Combined pricing for all providers
export const allPricing: ProviderPricing = {
  ...openaiPricing,
  ...anthropicPricing,
  ...googlePricing,
  ...xaiPricing,
  ...deepseekPricing,
};

// Provider name to pricing map
export const pricingByProvider = {
  openai: openaiPricing,
  anthropic: anthropicPricing,
  google: googlePricing,
  xai: xaiPricing,
  deepseek: deepseekPricing,
} as const;

export type Provider = keyof typeof pricingByProvider;
