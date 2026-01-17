// Calculator
export {
  calculateCost,
  formatCost,
  formatCostBreakdown,
  type CostBreakdown,
  type CalculateCostOptions,
} from "./core/calculator";

// Streaming utilities (single model)
export {
  createCostTracker,
  calculateStreamCost,
  type CostTracker,
  type CreateCostTrackerOptions,
  type StreamCostOptions,
} from "./tracking/streaming";

// Multi-model tracker
export {
  createTracker,
  type MultiModelCostTracker,
  type CreateMultiModelTrackerOptions,
  type ModelCostSummary,
  type AddUsageOptions,
} from "./tracking/tracker";

// AI SDK integration
export {
  withCost,
  onFinishWithCost,
  getCost,
  getModelId,
  createCostAwareAI,
  type CostAwareAI,
  type CreateCostAwareAIOptions,
  type CostAwareOptions,
  type ResultWithCost,
  type FinishResultWithCost,
} from "./integrations/ai-sdk";

// Pricing data
export {
  getModelPricing,
  getModelPricingByModelId,
  getAllSupportedModels,
  openaiPricing,
  anthropicPricing,
  googlePricing,
  xaiPricing,
  deepseekPricing,
  perplexityPricing,
  allPricing,
  flatPricing,
  type ModelPricing,
  type ProviderPricing,
  type Provider,
} from "./pricing";
