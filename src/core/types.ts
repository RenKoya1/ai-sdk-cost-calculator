export interface CostBreakdown {
  inputCost: number;
  outputCost: number;
  cacheReadCost: number;
  cacheWriteCost: number;
  reasoningCost: number;
  webSearchCost: number;
  totalCost: number;
  currency: "USD";
  isLongContext: boolean;
}
