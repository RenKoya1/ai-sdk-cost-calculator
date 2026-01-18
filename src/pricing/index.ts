// Re-export types and pricing from modular files
export type { ModelPricing, ProviderPricing, ImageGenerationPricing } from "./types";

export { openaiPricing } from "./providers/openai";
export { anthropicPricing } from "./providers/anthropic";
export { googlePricing } from "./providers/google";
export { xaiPricing } from "./providers/xai";
export { deepseekPricing } from "./providers/deepseek";
export { perplexityPricing } from "./providers/perplexity";

import { openaiPricing } from "./providers/openai";
import { anthropicPricing } from "./providers/anthropic";
import { googlePricing } from "./providers/google";
import { xaiPricing } from "./providers/xai";
import { deepseekPricing } from "./providers/deepseek";
import { perplexityPricing } from "./providers/perplexity";
import type { ModelPricing, ProviderPricing } from "./types";

// Provider name to pricing map
export const allPricing: Record<string, ProviderPricing> = {
  openai: openaiPricing,
  anthropic: anthropicPricing,
  google: googlePricing,
  xai: xaiPricing,
  deepseek: deepseekPricing,
  perplexity: perplexityPricing,
};

// Combined flat pricing for all models
export const flatPricing: ProviderPricing = {
  ...openaiPricing,
  ...anthropicPricing,
  ...googlePricing,
  ...xaiPricing,
  ...deepseekPricing,
  ...perplexityPricing,
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
