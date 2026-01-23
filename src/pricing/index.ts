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

/**
 * Normalize model ID by removing common suffixes and trying fallbacks
 * Examples:
 * - claude-3-7-sonnet-latest -> claude-3-7-sonnet
 * - gemini-2.5-flash-preview -> gemini-2.5-flash
 * - gpt-4o-2024-11-20 -> gpt-4o
 */
function normalizeModelId(modelId: string): string[] {
  const candidates: string[] = [modelId]; // Start with exact match

  // Remove -latest suffix
  if (modelId.endsWith('-latest')) {
    candidates.push(modelId.replace(/-latest$/, ''));
  }

  // Remove -preview suffix
  if (modelId.endsWith('-preview')) {
    candidates.push(modelId.replace(/-preview$/, ''));
  }

  // Remove date-like version suffix (e.g., -20241022, -2024-11-20)
  const dateVersionPattern = /-\d{4}-?\d{2}-?\d{2}$/;
  if (dateVersionPattern.test(modelId)) {
    candidates.push(modelId.replace(dateVersionPattern, ''));
  }

  // Remove version numbers at the end (e.g., -001, -002, -v1, -1)
  const versionPattern = /-(v?\d+|0\d{2,})$/;
  if (versionPattern.test(modelId)) {
    candidates.push(modelId.replace(versionPattern, ''));
  }

  return candidates;
}

export function getModelPricingByModelId(
  modelId: string
): ModelPricing | undefined {
  // Try exact match first
  if (flatPricing[modelId]) {
    return flatPricing[modelId];
  }

  // Try normalized versions
  const candidates = normalizeModelId(modelId);
  for (const candidate of candidates) {
    if (flatPricing[candidate]) {
      return flatPricing[candidate];
    }
  }

  return undefined;
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
