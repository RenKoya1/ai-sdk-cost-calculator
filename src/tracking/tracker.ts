import type { LanguageModelUsage, LanguageModel } from "ai";
import { calculateCost } from "../core/calculator";
import type { CostBreakdown } from "../core/types";
import { buildAdditionalCost } from "../integrations/ai-sdk";
import type { ModelPricing } from "../pricing";
import { addCostBreakdowns, roundCostBreakdown, multiplyCostBreakdown, emptyCostBreakdown } from "../shared/cost";
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
  /** Number of xAI X Search requests */
  xSearchRequests?: number;
  /** Number of xAI Code Execution requests */
  codeExecutionRequests?: number;
  /** Number of xAI Document Search requests */
  documentSearchRequests?: number;
  /** Number of xAI Collections Search requests */
  collectionsSearchRequests?: number;
  /** Number of images generated */
  imageGenerations?: number;
  /** Image size/quality for pricing lookup */
  imageSize?: string;
  /** Audio input tokens (subset of usage.inputTokens) */
  audioInputTokens?: number;
  /** Audio output tokens (subset of usage.outputTokens) */
  audioOutputTokens?: number;
  /** Token-hours of context cache storage (Gemini) */
  cacheStorageTokenHours?: number;
  /** Multiply all cost values by this factor (e.g., 1.5 for 150% markup) */
  costMultiplier?: number;
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
   * Add a raw USD cost without a model (e.g., external API fees)
   */
  addCost(amount: number, label?: string): CostBreakdown;

  /**
   * Get all additional (model-free) costs
   */
  getAdditionalCosts(): Array<{ label?: string; amount: number }>;

  /**
   * Get total additional cost
   */
  getAdditionalCostTotal(): number;

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
  /** Cumulative token usage (for display). Not used for pricing — pricing is per-call. */
  totals: UsageTokenTotals;
  /** Accumulated, already-multiplied cost from each add() call. */
  cost: CostBreakdown;
  /** Cumulative tool/feature request counts (additive across calls). */
  webSearchRequests: number;
  googleMapsRequests: number;
  imageGenerations: number;
  /** Last imageSize seen, used as fallback for getModel/getAllCosts display. */
  imageSize?: string;
  requestCount: number;
}

function createEmptyTrackingData(): ModelTrackingData {
  return {
    totals: createEmptyUsageTotals(),
    cost: emptyCostBreakdown(),
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
  const additionalCosts: Array<{ label?: string; amount: number }> = [];

  function getOrCreateModelData(model: string): ModelTrackingData {
    let data = modelData.get(model);
    if (!data) {
      data = createEmptyTrackingData();
      modelData.set(model, data);
    }
    return data;
  }

  return {
    add(
      model: LanguageModel | string,
      usage: LanguageModelUsage,
      opts?: AddUsageOptions,
    ): CostBreakdown {
      const modelId = getModelId(model);
      const data = getOrCreateModelData(modelId);

      // Price this call independently. Long-context threshold and per-call
      // multiplier must NOT see cumulative token totals from prior calls.
      let delta = calculateCost({
        model: modelId,
        usage,
        customPricing: customPricing[modelId],
        webSearchRequests: opts?.webSearchRequests,
        googleMapsRequests: opts?.googleMapsRequests,
        xSearchRequests: opts?.xSearchRequests,
        codeExecutionRequests: opts?.codeExecutionRequests,
        documentSearchRequests: opts?.documentSearchRequests,
        collectionsSearchRequests: opts?.collectionsSearchRequests,
        imageGenerations: opts?.imageGenerations,
        imageSize: opts?.imageSize,
        audioInputTokens: opts?.audioInputTokens,
        audioOutputTokens: opts?.audioOutputTokens,
        cacheStorageTokenHours: opts?.cacheStorageTokenHours,
      });

      if (opts?.costMultiplier != null) {
        delta = multiplyCostBreakdown(delta, opts.costMultiplier);
      }

      // Accumulate
      addUsageToTotals(data.totals, usage);
      data.cost = addCostBreakdowns(data.cost, delta);
      data.webSearchRequests += opts?.webSearchRequests ?? 0;
      data.googleMapsRequests += opts?.googleMapsRequests ?? 0;
      data.imageGenerations += opts?.imageGenerations ?? 0;
      if (opts?.imageSize) data.imageSize = opts.imageSize;
      data.requestCount++;

      onCost?.(modelId, delta);
      return delta;
    },

    onFinish<T extends { usage: LanguageModelUsage }>(
      model: LanguageModel | string,
      callback?: (result: T & { cost: CostBreakdown }) => void | Promise<void>,
      opts?: AddUsageOptions,
    ): (result: T) => void | Promise<void> {
      const modelId = getModelId(model);

      return async (result: T) => {
        const detected = detectRequestsFromResult(
          result as unknown as ResultWithToolCalls,
          opts,
        );
        const enrichedOpts: AddUsageOptions = {
          ...opts,
          webSearchRequests: opts?.webSearchRequests ?? detected.webSearchRequests,
          googleMapsRequests: opts?.googleMapsRequests ?? detected.googleMapsRequests,
          imageGenerations: opts?.imageGenerations ?? detected.imageGenerations,
        };

        const cost = this.add(modelId, result.usage, enrichedOpts);
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
        cost: data.cost,
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
        cost: data.cost,
      }));
    },

    getTotal(): CostBreakdown {
      let total = emptyCostBreakdown();
      for (const data of modelData.values()) {
        total = addCostBreakdowns(total, data.cost);
      }
      const additionalTotal = additionalCosts.reduce((sum, c) => sum + c.amount, 0);
      total.additionalCost += additionalTotal;
      total.totalCost += additionalTotal;
      return roundCostBreakdown(total);
    },

    getTotalRequestCount(): number {
      let total = 0;
      for (const data of modelData.values()) {
        total += data.requestCount;
      }
      return total;
    },

    addCost(amount: number, label?: string): CostBreakdown {
      additionalCosts.push({ label, amount });
      const cost = buildAdditionalCost(amount);
      onCost?.(label ?? "_additional", cost);
      return cost;
    },

    getAdditionalCosts(): Array<{ label?: string; amount: number }> {
      return [...additionalCosts];
    },

    getAdditionalCostTotal(): number {
      return buildAdditionalCost(
        additionalCosts.reduce((sum, c) => sum + c.amount, 0),
      ).additionalCost;
    },

    resetModel(model: string): void {
      modelData.delete(model);
    },

    reset(): void {
      modelData.clear();
      additionalCosts.length = 0;
    },
  };
}

/**
 * Alias for createMultiModelTracker for convenience
 */
export const createTracker = createMultiModelTracker;
