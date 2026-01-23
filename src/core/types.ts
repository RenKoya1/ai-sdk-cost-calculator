export interface CostBreakdown {
  inputCost: number;
  outputCost: number;
  cacheReadCost: number;
  cacheWriteCost: number;
  reasoningCost: number;
  webSearchCost: number;
  googleMapsCost: number;
  xSearchCost: number;
  codeExecutionCost: number;
  documentSearchCost: number;
  collectionsSearchCost: number;
  imageGenerationCost: number;
  totalCost: number;
  currency: "USD";
  isLongContext: boolean;
}
