/**
 * Per-component cost field names. Used to drive iteration in
 * roundCostBreakdown / multiplyCostBreakdown / addCostBreakdowns / emptyCostBreakdown
 * so adding a new component only requires updating this list.
 */
export const COST_COMPONENT_FIELDS = [
  "inputCost",
  "outputCost",
  "cacheReadCost",
  "cacheWriteCost",
  "cacheStorageCost",
  "reasoningCost",
  "audioInputCost",
  "audioOutputCost",
  "webSearchCost",
  "googleMapsCost",
  "xSearchCost",
  "codeExecutionCost",
  "documentSearchCost",
  "collectionsSearchCost",
  "imageGenerationCost",
  "additionalCost",
] as const;

export type CostComponentField = (typeof COST_COMPONENT_FIELDS)[number];

export type CostBreakdown = {
  [K in CostComponentField]: number;
} & {
  totalCost: number;
  currency: "USD";
  isLongContext: boolean;
};
