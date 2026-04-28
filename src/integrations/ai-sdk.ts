import type { LanguageModelUsage, LanguageModel } from "ai";
import { calculateCost } from "../core/calculator";
import type { CostBreakdown } from "../core/types";
import type { ModelPricing } from "../pricing";
import {
  addCostBreakdowns,
  emptyCostBreakdown,
  multiplyCostBreakdown,
  roundToMicroDollars,
} from "../shared/cost";
import {
  detectRequestsFromResult,
  type DetectOptions,
  type ResultWithToolCalls,
} from "../shared/detect-requests";
import { getModelId } from "../shared/model";

export { getModelId };

export interface ResultWithCost<T> {
  result: T;
  cost: CostBreakdown;
}

export interface FinishResultWithCost {
  usage: LanguageModelUsage;
  cost: CostBreakdown;
  text?: string;
  reasoning?: string;
  finishReason?: string;
  [key: string]: unknown;
}

export interface CostAwareOptions extends DetectOptions {
  /** Custom pricing override */
  customPricing?: ModelPricing;
  /** Number of web search requests */
  webSearchRequests?: number;
  /** Number of Google Maps API requests */
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
  /** Audio input tokens (subset of usage.inputTokens) for separate audio billing */
  audioInputTokens?: number;
  /** Audio output tokens (subset of usage.outputTokens) for separate audio billing */
  audioOutputTokens?: number;
  /** Token-hours of context cache storage (Gemini) */
  cacheStorageTokenHours?: number;
  /** Multiply all cost values by this factor (e.g., 1.5 for 150% markup) */
  costMultiplier?: number;
  /** Callback when cost is calculated */
  onCost?: (cost: CostBreakdown, usage: LanguageModelUsage) => void;
}

/**
 * Resolve manual + auto-detected request counts from an AI SDK result.
 * Manual values always take precedence over detection.
 */
function resolveRequestCounts(
  result: ResultWithToolCalls | undefined,
  options: CostAwareOptions | undefined,
) {
  const detected = result ? detectRequestsFromResult(result, options) : undefined;
  return {
    webSearchRequests: options?.webSearchRequests ?? detected?.webSearchRequests,
    googleMapsRequests: options?.googleMapsRequests ?? detected?.googleMapsRequests,
    xSearchRequests: options?.xSearchRequests ?? detected?.xSearchRequests,
    codeExecutionRequests: options?.codeExecutionRequests ?? detected?.codeExecutionRequests,
    documentSearchRequests: options?.documentSearchRequests ?? detected?.documentSearchRequests,
    collectionsSearchRequests: options?.collectionsSearchRequests ?? detected?.collectionsSearchRequests,
    imageGenerations: options?.imageGenerations ?? detected?.imageGenerations,
  };
}

/**
 * Centralized cost calculation: detection + pricing + multiplier.
 * Used by withCost / getCost / createCostAwareAI to avoid duplication.
 */
function computeCost(args: {
  modelId: string;
  usage: LanguageModelUsage;
  customPricing: ModelPricing | undefined;
  options: CostAwareOptions | undefined;
  result?: ResultWithToolCalls;
}): CostBreakdown {
  const counts = resolveRequestCounts(args.result, args.options);
  let cost = calculateCost({
    model: args.modelId,
    usage: args.usage,
    customPricing: args.customPricing,
    ...counts,
    imageSize: args.options?.imageSize,
    audioInputTokens: args.options?.audioInputTokens,
    audioOutputTokens: args.options?.audioOutputTokens,
    cacheStorageTokenHours: args.options?.cacheStorageTokenHours,
  });
  if (args.options?.costMultiplier != null) {
    cost = multiplyCostBreakdown(cost, args.options.costMultiplier);
  }
  return cost;
}

/**
 * Create an onFinish callback wrapper that adds cost calculation.
 *
 * @example
 * ```typescript
 * const result = await generateText({
 *   model: openai("gpt-4o"),
 *   prompt: "Hello!",
 *   onFinish: withCost("gpt-4o", ({ cost }) => console.log(`$${cost.totalCost}`)),
 * });
 * ```
 */
export function withCost<T extends { usage: LanguageModelUsage }>(
  model: LanguageModel | string,
  callback?: (result: T & { cost: CostBreakdown }) => void | Promise<void>,
  options?: CostAwareOptions,
): (result: T) => void | Promise<void> {
  const modelId = getModelId(model);

  return async (result: T) => {
    const cost = computeCost({
      modelId,
      usage: result.usage,
      customPricing: options?.customPricing,
      options,
      result: result as unknown as ResultWithToolCalls,
    });

    options?.onCost?.(cost, result.usage);
    if (callback) {
      await callback({ ...result, cost });
    }
  };
}

/** Alias for withCost */
export const onFinishWithCost = withCost;

export interface CostAwareAI {
  onFinish<T extends { usage: LanguageModelUsage }>(
    model: LanguageModel | string,
    callback?: (result: T & { cost: CostBreakdown }) => void | Promise<void>,
    options?: Omit<CostAwareOptions, "onCost">,
  ): (result: T) => void | Promise<void>;

  calculate(
    model: LanguageModel | string,
    usage: LanguageModelUsage,
    options?: Omit<CostAwareOptions, "onCost">,
  ): CostBreakdown;

  getModel(model: string): CostBreakdown | undefined;
  getModels(): string[];
  getTotal(): CostBreakdown;
  getRequestCount(): number;
  addCost(amount: number, label?: string): CostBreakdown;
  reset(): void;
}

export interface CreateCostAwareAIOptions {
  customPricing?: Record<string, ModelPricing>;
  onCost?: (model: string, cost: CostBreakdown, usage: LanguageModelUsage) => void;
}

interface ModelStats {
  cost: CostBreakdown;
  requestCount: number;
}

/**
 * Build a CostBreakdown for a flat additional charge (no model attached).
 * Reused by createCostAwareAI and createMultiModelTracker.
 */
export function buildAdditionalCost(amount: number): CostBreakdown {
  const cost = emptyCostBreakdown();
  const rounded = roundToMicroDollars(amount);
  cost.additionalCost = rounded;
  cost.totalCost = rounded;
  return cost;
}

const EMPTY_USAGE_FOR_ADDITIONAL: LanguageModelUsage = {
  inputTokens: 0,
  outputTokens: 0,
  totalTokens: 0,
  inputTokenDetails: { noCacheTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0 },
  outputTokenDetails: { textTokens: 0, reasoningTokens: 0 },
};

export function createCostAwareAI(
  options: CreateCostAwareAIOptions = {},
): CostAwareAI {
  const { customPricing = {}, onCost } = options;
  const modelStats = new Map<string, ModelStats>();
  const additionalCosts: Array<{ label?: string; amount: number }> = [];

  function track(modelId: string, cost: CostBreakdown): void {
    const existing = modelStats.get(modelId);
    if (existing) {
      modelStats.set(modelId, {
        cost: addCostBreakdowns(existing.cost, cost),
        requestCount: existing.requestCount + 1,
      });
    } else {
      modelStats.set(modelId, { cost, requestCount: 1 });
    }
  }

  function compute(
    modelId: string,
    usage: LanguageModelUsage,
    opts: Omit<CostAwareOptions, "onCost"> | undefined,
    result?: ResultWithToolCalls,
  ): CostBreakdown {
    return computeCost({
      modelId,
      usage,
      customPricing: customPricing[modelId] ?? opts?.customPricing,
      options: opts,
      result,
    });
  }

  return {
    onFinish<T extends { usage: LanguageModelUsage }>(
      model: LanguageModel | string,
      callback?: (result: T & { cost: CostBreakdown }) => void | Promise<void>,
      opts?: Omit<CostAwareOptions, "onCost">,
    ): (result: T) => void | Promise<void> {
      const modelId = getModelId(model);

      return async (result: T) => {
        const cost = compute(
          modelId,
          result.usage,
          opts,
          result as unknown as ResultWithToolCalls,
        );
        track(modelId, cost);
        onCost?.(modelId, cost, result.usage);
        if (callback) {
          await callback({ ...result, cost });
        }
      };
    },

    calculate(model, usage, opts) {
      const modelId = getModelId(model);
      const cost = compute(modelId, usage, opts);
      track(modelId, cost);
      onCost?.(modelId, cost, usage);
      return cost;
    },

    getModel(model) {
      return modelStats.get(model)?.cost;
    },

    getModels() {
      return Array.from(modelStats.keys());
    },

    getTotal() {
      let total = emptyCostBreakdown();
      for (const stats of modelStats.values()) {
        total = addCostBreakdowns(total, stats.cost);
      }
      const additionalTotal = additionalCosts.reduce((sum, c) => sum + c.amount, 0);
      total.additionalCost += additionalTotal;
      total.totalCost += additionalTotal;
      return total;
    },

    getRequestCount() {
      let count = 0;
      for (const stats of modelStats.values()) {
        count += stats.requestCount;
      }
      return count;
    },

    addCost(amount, label) {
      additionalCosts.push({ label, amount });
      const cost = buildAdditionalCost(amount);
      onCost?.(label ?? "_additional", cost, EMPTY_USAGE_FOR_ADDITIONAL);
      return cost;
    },

    reset() {
      modelStats.clear();
      additionalCosts.length = 0;
    },
  };
}

/**
 * One-shot cost calculation from AI SDK usage.
 *
 * @example
 * ```typescript
 * const cost = getCost("gpt-4o", result.usage);
 * ```
 */
export function getCost(
  model: LanguageModel | string,
  usage: LanguageModelUsage,
  options?: CostAwareOptions,
): CostBreakdown {
  return computeCost({
    modelId: getModelId(model),
    usage,
    customPricing: options?.customPricing,
    options,
  });
}
