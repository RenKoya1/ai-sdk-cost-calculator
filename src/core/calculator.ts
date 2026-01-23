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
  /** Number of Google Maps API requests made */
  googleMapsRequests?: number;
  /** Number of xAI X Search requests made */
  xSearchRequests?: number;
  /** Number of xAI Code Execution requests made */
  codeExecutionRequests?: number;
  /** Number of xAI Document Search requests made */
  documentSearchRequests?: number;
  /** Number of xAI Collections Search requests made */
  collectionsSearchRequests?: number;
  /** Number of images generated */
  imageGenerations?: number;
  /** Image size/quality for pricing lookup (e.g., "1024x1024", "hd-1024x1024") */
  imageSize?: string;
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
        pricing.longContextReasoningPer1MTokens ??
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
  const {
    model,
    usage,
    customPricing,
    webSearchRequests = 0,
    googleMapsRequests = 0,
    xSearchRequests = 0,
    codeExecutionRequests = 0,
    documentSearchRequests = 0,
    collectionsSearchRequests = 0,
    imageGenerations = 0,
    imageSize,
  } = options;

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

  // Calculate Google Maps cost
  let googleMapsCost = 0;
  if (googleMapsRequests > 0 && pricing.googleMapsPer1kRequests) {
    googleMapsCost = (googleMapsRequests / 1000) * pricing.googleMapsPer1kRequests;
  }

  // Calculate xAI X Search cost
  let xSearchCost = 0;
  if (xSearchRequests > 0 && pricing.xSearchPer1kRequests) {
    xSearchCost = (xSearchRequests / 1000) * pricing.xSearchPer1kRequests;
  }

  // Calculate xAI Code Execution cost
  let codeExecutionCost = 0;
  if (codeExecutionRequests > 0 && pricing.codeExecutionPer1kRequests) {
    codeExecutionCost = (codeExecutionRequests / 1000) * pricing.codeExecutionPer1kRequests;
  }

  // Calculate xAI Document Search cost
  let documentSearchCost = 0;
  if (documentSearchRequests > 0 && pricing.documentSearchPer1kRequests) {
    documentSearchCost = (documentSearchRequests / 1000) * pricing.documentSearchPer1kRequests;
  }

  // Calculate xAI Collections Search cost
  let collectionsSearchCost = 0;
  if (collectionsSearchRequests > 0 && pricing.collectionsSearchPer1kRequests) {
    collectionsSearchCost = (collectionsSearchRequests / 1000) * pricing.collectionsSearchPer1kRequests;
  }

  // Calculate image generation cost
  let imageGenerationCost = 0;
  if (imageGenerations > 0) {
    // Try to get price for specific size/quality, fall back to default
    let pricePerImage = pricing.imageGenerationPerImage ?? 0;
    if (imageSize && pricing.imageGenerationPricing?.[imageSize]) {
      pricePerImage = pricing.imageGenerationPricing[imageSize];
    }
    imageGenerationCost = imageGenerations * pricePerImage;
  }

  const totalCost =
    inputCost +
    outputCost +
    cacheReadCost +
    cacheWriteCost +
    reasoningCost +
    webSearchCost +
    googleMapsCost +
    xSearchCost +
    codeExecutionCost +
    documentSearchCost +
    collectionsSearchCost +
    imageGenerationCost;

  return {
    inputCost: roundToMicroDollars(inputCost),
    outputCost: roundToMicroDollars(outputCost),
    cacheReadCost: roundToMicroDollars(cacheReadCost),
    cacheWriteCost: roundToMicroDollars(cacheWriteCost),
    reasoningCost: roundToMicroDollars(reasoningCost),
    webSearchCost: roundToMicroDollars(webSearchCost),
    googleMapsCost: roundToMicroDollars(googleMapsCost),
    xSearchCost: roundToMicroDollars(xSearchCost),
    codeExecutionCost: roundToMicroDollars(codeExecutionCost),
    documentSearchCost: roundToMicroDollars(documentSearchCost),
    collectionsSearchCost: roundToMicroDollars(collectionsSearchCost),
    imageGenerationCost: roundToMicroDollars(imageGenerationCost),
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
  if (result.googleMapsCost > 0) {
    lines.push(`Google Maps:  ${formatCost(result.googleMapsCost, decimals)}`);
  }
  if (result.xSearchCost > 0) {
    lines.push(`X Search:     ${formatCost(result.xSearchCost, decimals)}`);
  }
  if (result.codeExecutionCost > 0) {
    lines.push(`Code Exec:    ${formatCost(result.codeExecutionCost, decimals)}`);
  }
  if (result.documentSearchCost > 0) {
    lines.push(`Doc Search:   ${formatCost(result.documentSearchCost, decimals)}`);
  }
  if (result.collectionsSearchCost > 0) {
    lines.push(`Collections:  ${formatCost(result.collectionsSearchCost, decimals)}`);
  }
  if (result.imageGenerationCost > 0) {
    lines.push(`Image Gen:    ${formatCost(result.imageGenerationCost, decimals)}`);
  }
  lines.push(`Total:        ${formatCost(result.totalCost, decimals)}`);

  return lines.join("\n");
}
