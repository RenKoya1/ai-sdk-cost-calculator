import { LanguageModelUsage } from "ai";
import { getModelPricingByModelId, type ModelPricing } from "./prices";

const TOKENS_PER_MILLION = 1_000_000;

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
  model: string;
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

interface UsageTokenDetails {
  noCacheTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  textTokens: number;
  reasoningTokens: number;
  totalInputTokens: number;
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

function getUsageTokenDetails(usage: LanguageModelUsage): UsageTokenDetails {
  const inputDetails = usage.inputTokenDetails;
  const outputDetails = usage.outputTokenDetails;

  let noCacheTokens = inputDetails?.noCacheTokens ?? 0;
  let cacheReadTokens = inputDetails?.cacheReadTokens ?? 0;
  let cacheWriteTokens = inputDetails?.cacheWriteTokens ?? 0;

  let textTokens = outputDetails?.textTokens ?? 0;
  let reasoningTokens = outputDetails?.reasoningTokens ?? 0;

  if (!inputDetails && usage.inputTokens !== undefined) {
    noCacheTokens = usage.inputTokens;
  }

  if (!outputDetails && usage.outputTokens !== undefined) {
    textTokens = usage.outputTokens;
  }

  const totalInputTokens =
    usage.inputTokens ?? noCacheTokens + cacheReadTokens + cacheWriteTokens;

  return {
    noCacheTokens,
    cacheReadTokens,
    cacheWriteTokens,
    textTokens,
    reasoningTokens,
    totalInputTokens,
  };
}

function costFromTokens(tokens: number, per1MTokens: number): number {
  return (tokens / TOKENS_PER_MILLION) * per1MTokens;
}

export function calculateCost(options: CalculateCostOptions): CostBreakdown {
  const { model, usage, customPricing } = options;

  const pricing = customPricing ?? getModelPricingByModelId(model);

  if (!pricing) {
    throw new Error(
      `Unknown model: ${model}. Use customPricing option or add the model to prices.ts`,
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

  const totalCost =
    inputCost + outputCost + cacheReadCost + cacheWriteCost + reasoningCost;

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
  lines.push(`Total:        ${formatCost(result.totalCost, decimals)}`);

  return lines.join("\n");
}
