import type { CostBreakdown } from "../core/types";

const MICRO_DOLLARS = 1_000_000;

export function roundToMicroDollars(value: number): number {
  return Math.round(value * MICRO_DOLLARS) / MICRO_DOLLARS;
}

export function roundCostBreakdown(cost: CostBreakdown): CostBreakdown {
  return {
    inputCost: roundToMicroDollars(cost.inputCost),
    outputCost: roundToMicroDollars(cost.outputCost),
    cacheReadCost: roundToMicroDollars(cost.cacheReadCost),
    cacheWriteCost: roundToMicroDollars(cost.cacheWriteCost),
    reasoningCost: roundToMicroDollars(cost.reasoningCost),
    webSearchCost: roundToMicroDollars(cost.webSearchCost),
    googleMapsCost: roundToMicroDollars(cost.googleMapsCost),
    xSearchCost: roundToMicroDollars(cost.xSearchCost),
    codeExecutionCost: roundToMicroDollars(cost.codeExecutionCost),
    documentSearchCost: roundToMicroDollars(cost.documentSearchCost),
    collectionsSearchCost: roundToMicroDollars(cost.collectionsSearchCost),
    imageGenerationCost: roundToMicroDollars(cost.imageGenerationCost),
    totalCost: roundToMicroDollars(cost.totalCost),
    currency: "USD",
    isLongContext: cost.isLongContext,
  };
}

export function emptyCostBreakdown(): CostBreakdown {
  return {
    inputCost: 0,
    outputCost: 0,
    cacheReadCost: 0,
    cacheWriteCost: 0,
    reasoningCost: 0,
    webSearchCost: 0,
    googleMapsCost: 0,
    xSearchCost: 0,
    codeExecutionCost: 0,
    documentSearchCost: 0,
    collectionsSearchCost: 0,
    imageGenerationCost: 0,
    totalCost: 0,
    currency: "USD",
    isLongContext: false,
  };
}

export function addCostBreakdowns(
  a: CostBreakdown,
  b: CostBreakdown,
): CostBreakdown {
  return {
    inputCost: a.inputCost + b.inputCost,
    outputCost: a.outputCost + b.outputCost,
    cacheReadCost: a.cacheReadCost + b.cacheReadCost,
    cacheWriteCost: a.cacheWriteCost + b.cacheWriteCost,
    reasoningCost: a.reasoningCost + b.reasoningCost,
    webSearchCost: a.webSearchCost + b.webSearchCost,
    googleMapsCost: a.googleMapsCost + b.googleMapsCost,
    xSearchCost: a.xSearchCost + b.xSearchCost,
    codeExecutionCost: a.codeExecutionCost + b.codeExecutionCost,
    documentSearchCost: a.documentSearchCost + b.documentSearchCost,
    collectionsSearchCost: a.collectionsSearchCost + b.collectionsSearchCost,
    imageGenerationCost: a.imageGenerationCost + b.imageGenerationCost,
    totalCost: a.totalCost + b.totalCost,
    currency: "USD",
    isLongContext: a.isLongContext || b.isLongContext,
  };
}
