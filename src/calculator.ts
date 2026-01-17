import { LanguageModelUsage } from "ai";
import { getModelPricing, type ModelPricing } from "./prices";

export interface CostBreakdown {
  inputCost: number;
  outputCost: number;
  cacheReadCost: number;
  cacheWriteCost: number;
  reasoningCost: number;
  totalCost: number;
  currency: "USD";
  isLongContext: boolean;
}

export interface CalculateCostOptions {
  provider: string;
  modelId: string;
  usage: LanguageModelUsage;
  customPricing?: ModelPricing;
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
  inputTokens: number
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

export function calculateCost(options: CalculateCostOptions): CostBreakdown {
  const { provider, modelId, usage, customPricing } = options;

  const pricing = customPricing ?? getModelPricing(provider, modelId);

  if (!pricing) {
    throw new Error(
      `Unknown model: ${provider}/${modelId}. Use customPricing option or add the model to prices.ts`
    );
  }

  // Extract token counts from details
  const noCacheTokens = usage.inputTokenDetails?.noCacheTokens ?? 0;
  const cacheReadTokens = usage.inputTokenDetails?.cacheReadTokens ?? 0;
  const cacheWriteTokens = usage.inputTokenDetails?.cacheWriteTokens ?? 0;
  const textTokens = usage.outputTokenDetails?.textTokens ?? 0;
  const reasoningTokens = usage.outputTokenDetails?.reasoningTokens ?? 0;

  // Total input tokens for long context threshold check
  const totalInputTokens = usage.inputTokens ?? (noCacheTokens + cacheReadTokens);

  // Get effective pricing based on input token count
  const effectivePricing = getEffectivePricing(pricing, totalInputTokens);

  const inputCost =
    (noCacheTokens / 1_000_000) * effectivePricing.inputPer1MTokens;

  const outputCost =
    (textTokens / 1_000_000) * effectivePricing.outputPer1MTokens;

  const cacheReadCost =
    (cacheReadTokens / 1_000_000) * effectivePricing.cacheReadPer1MTokens;

  const cacheWriteCost =
    (cacheWriteTokens / 1_000_000) * effectivePricing.cacheWritePer1MTokens;

  const reasoningCost =
    (reasoningTokens / 1_000_000) * effectivePricing.reasoningPer1MTokens;

  const totalCost =
    inputCost +
    outputCost +
    cacheReadCost +
    cacheWriteCost +
    reasoningCost;

  return {
    inputCost: roundToMicroDollars(inputCost),
    outputCost: roundToMicroDollars(outputCost),
    cacheReadCost: roundToMicroDollars(cacheReadCost),
    cacheWriteCost: roundToMicroDollars(cacheWriteCost),
    reasoningCost: roundToMicroDollars(reasoningCost),
    totalCost: roundToMicroDollars(totalCost),
    currency: "USD",
    isLongContext: effectivePricing.isLongContext,
  };
}

function roundToMicroDollars(value: number): number {
  return Math.round(value * 1_000_000) / 1_000_000;
}

export function formatCost(cost: number, decimals: number = 6): string {
  return `$${cost.toFixed(decimals)}`;
}

export function formatCostBreakdown(
  result: CostBreakdown,
  decimals: number = 6
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
  lines.push(`Total:        ${formatCost(result.totalCost, decimals)}`);

  return lines.join("\n");
}
