// Re-export types and pricing from modular files
export type { ModelPricing, ProviderPricing } from "./prices/types";

export { openaiPricing } from "./prices/openai";
export { anthropicPricing } from "./prices/anthropic";
export { googlePricing } from "./prices/google";
export { xaiPricing } from "./prices/xai";
export { deepseekPricing } from "./prices/deepseek";

import { openaiPricing } from "./prices/openai";
import { anthropicPricing } from "./prices/anthropic";
import { googlePricing } from "./prices/google";
import { xaiPricing } from "./prices/xai";
import { deepseekPricing } from "./prices/deepseek";
import type { ModelPricing, ProviderPricing } from "./prices/types";

// Provider name to pricing map
export const allPricing: Record<string, ProviderPricing> = {
  openai: openaiPricing,
  anthropic: anthropicPricing,
  google: googlePricing,
  xai: xaiPricing,
  deepseek: deepseekPricing,
};

// Combined flat pricing for all models
export const flatPricing: ProviderPricing = {
  ...openaiPricing,
  ...anthropicPricing,
  ...googlePricing,
  ...xaiPricing,
  ...deepseekPricing,
};

export function getModelPricing(
  provider: string,
  modelId: string
): ModelPricing | undefined {
  const providerPricing = allPricing[provider.toLowerCase()];
  if (!providerPricing) return undefined;
  return providerPricing[modelId];
}

export function getModelPricingByModelId(
  modelId: string
): ModelPricing | undefined {
  return flatPricing[modelId];
}

export function getAllSupportedModels(): {
  provider: string;
  modelId: string;
}[] {
  const models: { provider: string; modelId: string }[] = [];
  for (const [provider, pricing] of Object.entries(allPricing)) {
    for (const modelId of Object.keys(pricing)) {
      models.push({ provider, modelId });
    }
  }
  return models;
}

export type Provider = keyof typeof allPricing;
