import { LanguageModelUsage } from "ai";
import { getModelPricingByModelId, type ModelPricing } from "../pricing";
import type { CostBreakdown } from "./types";
import { roundToMicroDollars } from "../shared/cost";
import { getUsageTokenDetails } from "../shared/usage";

const TOKENS_PER_MILLION = 1_000_000;

export type { CostBreakdown } from "./types";

export interface CalculateCostOptions {
  model: string;
  usage: LanguageModelUsage;
  customPricing?: ModelPricing;
  /** Number of web search requests made (for grounding/live search) */
  webSearchRequests?: number;
}

interface EffectivePricing {
  inputPer1MTokens: number;
  outputPer1MTokens: number;
  cacheReadPer1MTokens: number;
  cacheWritePer1MTokens: number;
  reasoningPer1MTokens: number;
  isLongContext: boolean;
}

function getEffectivePricing(
  pricing: ModelPricing,
  inputTokens: number,
): EffectivePricing {
  const threshold = pricing.longContextThreshold ?? 200000;
  const isLongContext =
    inputTokens > threshold &&
    pricing.longContextInputPer1MTokens !== undefined;

  if (isLongContext) {
    return {
      inputPer1MTokens: pricing.longContextInputPer1MTokens!,
      outputPer1MTokens:
        pricing.longContextOutputPer1MTokens ?? pricing.outputPer1MTokens,
      cacheReadPer1MTokens:
        pricing.longContextCacheReadPer1MTokens ??
        pricing.cacheReadPer1MTokens ??
        pricing.longContextInputPer1MTokens!,
      cacheWritePer1MTokens:
        pricing.longContextCacheWritePer1MTokens ??
        pricing.cacheWritePer1MTokens ??
        0,
      reasoningPer1MTokens:
        pricing.reasoningPer1MTokens ??
        pricing.longContextOutputPer1MTokens ??
        pricing.outputPer1MTokens,
      isLongContext: true,
    };
  }

  return {
    inputPer1MTokens: pricing.inputPer1MTokens,
    outputPer1MTokens: pricing.outputPer1MTokens,
    cacheReadPer1MTokens:
      pricing.cacheReadPer1MTokens ?? pricing.inputPer1MTokens,
    cacheWritePer1MTokens: pricing.cacheWritePer1MTokens ?? 0,
    reasoningPer1MTokens:
      pricing.reasoningPer1MTokens ?? pricing.outputPer1MTokens,
    isLongContext: false,
  };
}

function costFromTokens(tokens: number, per1MTokens: number): number {
  return (tokens / TOKENS_PER_MILLION) * per1MTokens;
}

export function calculateCost(options: CalculateCostOptions): CostBreakdown {
  const { model, usage, customPricing, webSearchRequests = 0 } = options;

  const pricing = customPricing ?? getModelPricingByModelId(model);

  if (!pricing) {
    throw new Error(
      `Unknown model: ${model}. Use customPricing option or add the model to pricing/providers`,
    );
  }

  const usageDetails = getUsageTokenDetails(usage);

  // Get effective pricing based on input token count
  const effectivePricing = getEffectivePricing(
    pricing,
    usageDetails.totalInputTokens,
  );

  const inputCost = costFromTokens(
    usageDetails.noCacheTokens,
    effectivePricing.inputPer1MTokens,
  );

  const outputCost = costFromTokens(
    usageDetails.textTokens,
    effectivePricing.outputPer1MTokens,
  );

  const cacheReadCost = costFromTokens(
    usageDetails.cacheReadTokens,
    effectivePricing.cacheReadPer1MTokens,
  );

  const cacheWriteCost = costFromTokens(
    usageDetails.cacheWriteTokens,
    effectivePricing.cacheWritePer1MTokens,
  );

  const reasoningCost = costFromTokens(
    usageDetails.reasoningTokens,
    effectivePricing.reasoningPer1MTokens,
  );

  // Calculate web search cost
  let webSearchCost = 0;
  if (webSearchRequests > 0 && pricing.webSearchPer1kRequests) {
    // Base per-request cost
    webSearchCost = (webSearchRequests / 1000) * pricing.webSearchPer1kRequests;

    // Some models charge fixed tokens per search request (e.g., OpenAI mini models charge 8k tokens)
    if (pricing.webSearchTokensPerRequest) {
      const searchTokens = webSearchRequests * pricing.webSearchTokensPerRequest;
      webSearchCost += costFromTokens(
        searchTokens,
        effectivePricing.inputPer1MTokens,
      );
    }
  }

  const totalCost =
    inputCost +
    outputCost +
    cacheReadCost +
    cacheWriteCost +
    reasoningCost +
    webSearchCost;

  return {
    inputCost: roundToMicroDollars(inputCost),
    outputCost: roundToMicroDollars(outputCost),
    cacheReadCost: roundToMicroDollars(cacheReadCost),
    cacheWriteCost: roundToMicroDollars(cacheWriteCost),
    reasoningCost: roundToMicroDollars(reasoningCost),
    webSearchCost: roundToMicroDollars(webSearchCost),
    totalCost: roundToMicroDollars(totalCost),
    currency: "USD",
    isLongContext: effectivePricing.isLongContext,
  };
}

export function formatCost(cost: number, decimals: number = 6): string {
  return `$${cost.toFixed(decimals)}`;
}

export function formatCostBreakdown(
  result: CostBreakdown,
  decimals: number = 6,
): string {
  const lines: string[] = [];

  if (result.isLongContext) {
    lines.push(`(Long context pricing applied)`);
  }
  if (result.inputCost > 0) {
    lines.push(`Input:        ${formatCost(result.inputCost, decimals)}`);
  }
  if (result.cacheReadCost > 0) {
    lines.push(`Cache Read:   ${formatCost(result.cacheReadCost, decimals)}`);
  }
  if (result.cacheWriteCost > 0) {
    lines.push(`Cache Write:  ${formatCost(result.cacheWriteCost, decimals)}`);
  }
  if (result.outputCost > 0) {
    lines.push(`Output:       ${formatCost(result.outputCost, decimals)}`);
  }
  if (result.reasoningCost > 0) {
    lines.push(`Reasoning:    ${formatCost(result.reasoningCost, decimals)}`);
  }
  if (result.webSearchCost > 0) {
    lines.push(`Web Search:   ${formatCost(result.webSearchCost, decimals)}`);
  }
  lines.push(`Total:        ${formatCost(result.totalCost, decimals)}`);

  return lines.join("\n");
}
