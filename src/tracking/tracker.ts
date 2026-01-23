import type { LanguageModelUsage, LanguageModel } from "ai";
import { calculateCost } from "../core/calculator";
import type { CostBreakdown } from "../core/types";
import type { ModelPricing } from "../pricing";
import { addCostBreakdowns, roundCostBreakdown } from "../shared/cost";
import {
  detectRequestsFromResult,
  type DetectOptions,
  type ResultWithToolCalls,
} from "../shared/detect-requests";
import { getModelId } from "../shared/model";
import {
  addUsageToTotals,
  createEmptyUsageTotals,
  totalsToUsage,
  type UsageTokenTotals,
} from "../shared/usage";

/**
 * Options for adding usage to the tracker
 */
export interface AddUsageOptions extends DetectOptions {
  /** Number of web search requests made */
  webSearchRequests?: number;
  /** Number of Google Maps API requests made */
  googleMapsRequests?: number;
  /** Number of images generated */
  imageGenerations?: number;
  /** Image size/quality for pricing lookup */
  imageSize?: string;
}

/**
 * Per-model cost summary
 */
export interface ModelCostSummary {
  model: string;
  requestCount: number;
  usage: LanguageModelUsage;
  cost: CostBreakdown;
}

/**
 * Multi-model cost tracker instance
 */
export interface MultiModelCostTracker {
  /**
   * Add usage for a specific model
   */
  add(
    model: LanguageModel | string,
    usage: LanguageModelUsage,
    options?: AddUsageOptions,
  ): CostBreakdown;

  /**
   * Create an onFinish callback for use with generateText/streamText
   */
  onFinish<T extends { usage: LanguageModelUsage }>(
    model: LanguageModel | string,
    callback?: (result: T & { cost: CostBreakdown }) => void | Promise<void>,
    options?: AddUsageOptions,
  ): (result: T) => void | Promise<void>;

  /**
   * Get cost breakdown for a specific model
   */
  getModel(model: string): ModelCostSummary | undefined;

  /**
   * Get all tracked models
   */
  getModels(): string[];

  /**
   * Get cost summaries for all models
   */
  getAllCosts(): ModelCostSummary[];

  /**
   * Get total cost across all models
   */
  getTotal(): CostBreakdown;

  /**
   * Get total request count across all models
   */
  getTotalRequestCount(): number;

  /**
   * Reset tracking for a specific model
   */
  resetModel(model: string): void;

  /**
   * Reset all tracking
   */
  reset(): void;
}

/**
 * Options for creating a multi-model cost tracker
 */
export interface CreateMultiModelTrackerOptions {
  /** Custom pricing overrides by model */
  customPricing?: Record<string, ModelPricing>;
  /** Callback when cost is added */
  onCost?: (model: string, cost: CostBreakdown) => void;
}

interface ModelTrackingData {
  totals: UsageTokenTotals;
  webSearchRequests: number;
  googleMapsRequests: number;
  imageGenerations: number;
  requestCount: number;
}

function createEmptyTrackingData(): ModelTrackingData {
  return {
    totals: createEmptyUsageTotals(),
    webSearchRequests: 0,
    googleMapsRequests: 0,
    imageGenerations: 0,
    requestCount: 0,
  };
}

function trackingDataToUsage(data: ModelTrackingData): LanguageModelUsage {
  return totalsToUsage(data.totals);
}

/**
 * Create a multi-model cost tracker that can track costs across different models
 *
 * @example
 * ```typescript
 * const tracker = createMultiModelTracker();
 *
 * // Track usage from different models
 * tracker.add("gpt-4o", result1.usage, { webSearchRequests: 5 });
 * tracker.add("claude-sonnet-4-5", result2.usage);
 * tracker.add("gpt-4o", result3.usage);
 *
 * // Get costs
 * console.log(tracker.getTotal().totalCost);
 * console.log(tracker.getModel("gpt-4o")?.cost.totalCost);
 * ```
 */
export function createMultiModelTracker(
  options: CreateMultiModelTrackerOptions = {},
): MultiModelCostTracker {
  const { customPricing = {}, onCost } = options;
  const modelData = new Map<string, ModelTrackingData>();

  function getOrCreateModelData(model: string): ModelTrackingData {
    let data = modelData.get(model);
    if (!data) {
      data = createEmptyTrackingData();
      modelData.set(model, data);
    }
    return data;
  }

  function addUsageToData(
    data: ModelTrackingData,
    usage: LanguageModelUsage,
    opts?: AddUsageOptions,
  ): void {
    addUsageToTotals(data.totals, usage);

    data.webSearchRequests += opts?.webSearchRequests ?? 0;
    data.googleMapsRequests += opts?.googleMapsRequests ?? 0;
    data.imageGenerations += opts?.imageGenerations ?? 0;
    data.requestCount++;
  }

  function calculateModelCost(model: string, data: ModelTrackingData, imageSize?: string): CostBreakdown {
    return calculateCost({
      model,
      usage: trackingDataToUsage(data),
      customPricing: customPricing[model],
      webSearchRequests: data.webSearchRequests,
      googleMapsRequests: data.googleMapsRequests,
      imageGenerations: data.imageGenerations,
      imageSize,
    });
  }

  return {
    add(
      model: LanguageModel | string,
      usage: LanguageModelUsage,
      opts?: AddUsageOptions,
    ): CostBreakdown {
      const modelId = getModelId(model);
      const data = getOrCreateModelData(modelId);
      addUsageToData(data, usage, opts);

      const cost = calculateModelCost(modelId, data);

      if (onCost) {
        onCost(modelId, cost);
      }

      return cost;
    },

    onFinish<T extends { usage: LanguageModelUsage }>(
      model: LanguageModel | string,
      callback?: (result: T & { cost: CostBreakdown }) => void | Promise<void>,
      opts?: AddUsageOptions,
    ): (result: T) => void | Promise<void> {
      const modelId = getModelId(model);

      return async (result: T) => {
        let finalOpts = opts;

        // Auto-detect tool usage (enabled by default)
        const detected = detectRequestsFromResult(
          result as unknown as ResultWithToolCalls,
          opts,
        );
        finalOpts = {
          ...opts,
          webSearchRequests: opts?.webSearchRequests ?? detected.webSearchRequests,
          googleMapsRequests: opts?.googleMapsRequests ?? detected.googleMapsRequests,
          imageGenerations: opts?.imageGenerations ?? detected.imageGenerations,
        };

        const cost = this.add(modelId, result.usage, finalOpts);

        if (callback) {
          await callback({ ...result, cost });
        }
      };
    },

    getModel(model: string): ModelCostSummary | undefined {
      const data = modelData.get(model);
      if (!data) return undefined;

      return {
        model,
        requestCount: data.requestCount,
        usage: trackingDataToUsage(data),
        cost: calculateModelCost(model, data),
      };
    },

    getModels(): string[] {
      return Array.from(modelData.keys());
    },

    getAllCosts(): ModelCostSummary[] {
      return Array.from(modelData.entries()).map(([model, data]) => ({
        model,
        requestCount: data.requestCount,
        usage: trackingDataToUsage(data),
        cost: calculateModelCost(model, data),
      }));
    },

    getTotal(): CostBreakdown {
      let total: CostBreakdown = {
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

      for (const [model, data] of modelData.entries()) {
        total = addCostBreakdowns(total, calculateModelCost(model, data));
      }

      return roundCostBreakdown(total);
    },

    getTotalRequestCount(): number {
      let total = 0;
      for (const data of modelData.values()) {
        total += data.requestCount;
      }
      return total;
    },

    resetModel(model: string): void {
      modelData.delete(model);
    },

    reset(): void {
      modelData.clear();
    },
  };
}

/**
 * Alias for createMultiModelTracker for convenience
 */
export const createTracker = createMultiModelTracker;
