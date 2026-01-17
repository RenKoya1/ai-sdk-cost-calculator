import type { LanguageModelUsage, LanguageModel } from "ai";
import { calculateCost } from "../core/calculator";
import type { CostBreakdown } from "../core/types";
import type { ModelPricing } from "../pricing";
import { addCostBreakdowns, emptyCostBreakdown } from "../shared/cost";
import { getModelId } from "../shared/model";

export { getModelId };

/**
 * Result with cost information
 */
export interface ResultWithCost<T> {
  result: T;
  cost: CostBreakdown;
}

/**
 * Extended finish result with cost
 */
export interface FinishResultWithCost {
  usage: LanguageModelUsage;
  cost: CostBreakdown;
  text?: string;
  reasoning?: string;
  finishReason?: string;
  [key: string]: unknown;
}

/**
 * Options for cost-aware wrappers
 */
export interface CostAwareOptions {
  /** Custom pricing override */
  customPricing?: ModelPricing;
  /** Number of web search requests */
  webSearchRequests?: number;
  /** Callback when cost is calculated */
  onCost?: (cost: CostBreakdown, usage: LanguageModelUsage) => void;
}

/**
 * Create an onFinish callback wrapper that adds cost calculation
 *
 * @example
 * ```typescript
 * import { generateText } from "ai";
 * import { openai } from "@ai-sdk/openai";
 * import { withCost } from "ai-sdk-cost-calculator";
 *
 * const result = await generateText({
 *   model: openai("gpt-4o"),
 *   prompt: "Hello!",
 *   onFinish: withCost("gpt-4o", ({ cost, usage }) => {
 *     console.log(`Cost: $${cost.totalCost}`);
 *   }),
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
    const cost = calculateCost({
      model: modelId,
      usage: result.usage,
      customPricing: options?.customPricing,
      webSearchRequests: options?.webSearchRequests,
    });

    if (options?.onCost) {
      options.onCost(cost, result.usage);
    }

    if (callback) {
      await callback({ ...result, cost });
    }
  };
}

/**
 * Alias for withCost - creates an onFinish callback with cost calculation
 */
export const onFinishWithCost = withCost;

/**
 * Create a cost-tracking wrapper for use with AI SDK
 *
 * @example
 * ```typescript
 * import { generateText, streamText } from "ai";
 * import { openai } from "@ai-sdk/openai";
 * import { createCostAwareAI } from "ai-sdk-cost-calculator";
 *
 * const ai = createCostAwareAI({
 *   onCost: (model, cost) => console.log(`[${model}] $${cost.totalCost}`),
 * });
 *
 * // Use with generateText
 * const result = await generateText({
 *   model: openai("gpt-4o"),
 *   prompt: "Hello!",
 *   onFinish: ai.onFinish("gpt-4o"),
 * });
 *
 * // Or get cost after the fact
 * const cost = ai.calculate("gpt-4o", result.usage);
 *
 * // Get totals
 * console.log(ai.getTotal());
 * ```
 */
export interface CostAwareAI {
  /**
   * Create an onFinish callback for use with generateText/streamText
   */
  onFinish<T extends { usage: LanguageModelUsage }>(
    model: LanguageModel | string,
    callback?: (result: T & { cost: CostBreakdown }) => void | Promise<void>,
    options?: Omit<CostAwareOptions, "onCost">,
  ): (result: T) => void | Promise<void>;

  /**
   * Calculate and track cost for a usage object
   */
  calculate(
    model: LanguageModel | string,
    usage: LanguageModelUsage,
    options?: Omit<CostAwareOptions, "onCost">,
  ): CostBreakdown;

  /**
   * Get cost for a specific model
   */
  getModel(model: string): CostBreakdown | undefined;

  /**
   * Get all tracked models
   */
  getModels(): string[];

  /**
   * Get total cost across all models
   */
  getTotal(): CostBreakdown;

  /**
   * Get total request count
   */
  getRequestCount(): number;

  /**
   * Reset all tracking
   */
  reset(): void;
}

export interface CreateCostAwareAIOptions {
  /** Custom pricing by model */
  customPricing?: Record<string, ModelPricing>;
  /** Callback when cost is calculated */
  onCost?: (model: string, cost: CostBreakdown, usage: LanguageModelUsage) => void;
}

interface ModelStats {
  cost: CostBreakdown;
  requestCount: number;
}

/**
 * Create a cost-aware AI helper for tracking costs across multiple calls
 */
export function createCostAwareAI(
  options: CreateCostAwareAIOptions = {},
): CostAwareAI {
  const { customPricing = {}, onCost } = options;
  const modelStats = new Map<string, ModelStats>();

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

  return {
    onFinish<T extends { usage: LanguageModelUsage }>(
      model: LanguageModel | string,
      callback?: (result: T & { cost: CostBreakdown }) => void | Promise<void>,
      opts?: Omit<CostAwareOptions, "onCost">,
    ): (result: T) => void | Promise<void> {
      const modelId = getModelId(model);

      return async (result: T) => {
        const cost = calculateCost({
          model: modelId,
          usage: result.usage,
          customPricing: customPricing[modelId] ?? opts?.customPricing,
          webSearchRequests: opts?.webSearchRequests,
        });

        track(modelId, cost);

        if (onCost) {
          onCost(modelId, cost, result.usage);
        }

        if (callback) {
          await callback({ ...result, cost });
        }
      };
    },

    calculate(
      model: LanguageModel | string,
      usage: LanguageModelUsage,
      opts?: Omit<CostAwareOptions, "onCost">,
    ): CostBreakdown {
      const modelId = getModelId(model);

      const cost = calculateCost({
        model: modelId,
        usage,
        customPricing: customPricing[modelId] ?? opts?.customPricing,
        webSearchRequests: opts?.webSearchRequests,
      });

      track(modelId, cost);

      if (onCost) {
        onCost(modelId, cost, usage);
      }

      return cost;
    },

    getModel(model: string): CostBreakdown | undefined {
      return modelStats.get(model)?.cost;
    },

    getModels(): string[] {
      return Array.from(modelStats.keys());
    },

    getTotal(): CostBreakdown {
      let total = emptyCostBreakdown();
      for (const stats of modelStats.values()) {
        total = addCostBreakdowns(total, stats.cost);
      }
      return total;
    },

    getRequestCount(): number {
      let count = 0;
      for (const stats of modelStats.values()) {
        count += stats.requestCount;
      }
      return count;
    },

    reset(): void {
      modelStats.clear();
    },
  };
}

/**
 * One-shot cost calculation from AI SDK result
 *
 * @example
 * ```typescript
 * const result = await generateText({
 *   model: openai("gpt-4o"),
 *   prompt: "Hello!",
 * });
 *
 * const cost = getCost("gpt-4o", result.usage);
 * // or
 * const cost = getCost(openai("gpt-4o"), result.usage);
 * ```
 */
export function getCost(
  model: LanguageModel | string,
  usage: LanguageModelUsage,
  options?: CostAwareOptions,
): CostBreakdown {
  return calculateCost({
    model: getModelId(model),
    usage,
    customPricing: options?.customPricing,
    webSearchRequests: options?.webSearchRequests,
  });
}
