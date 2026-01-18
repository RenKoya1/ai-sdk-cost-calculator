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

// Auto-detection utilities
export {
  detectRequestsFromResult,
  withDetectedRequests,
  DEFAULT_WEB_SEARCH_TOOLS,
  DEFAULT_GOOGLE_MAPS_TOOLS,
  DEFAULT_IMAGE_GENERATION_TOOLS,
  type DetectedRequests,
  type DetectOptions,
  type ResultWithToolCalls,
} from "./shared/detect-requests";

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
