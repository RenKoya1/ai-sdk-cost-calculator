import { LanguageModelUsage } from "ai";
import { calculateCost, type CostBreakdown } from "./calculator";
import type { ModelPricing } from "./prices";

export interface CostTracker {
  addUsage(usage: LanguageModelUsage): void;
  getTotalUsage(): LanguageModelUsage;
  getTotalCost(): CostBreakdown;
  getRequestCount(): number;
  reset(): void;
}

export interface CreateCostTrackerOptions {
  model: string;
  customPricing?: ModelPricing;
}

export function createCostTracker(options: CreateCostTrackerOptions): CostTracker {
  const { model, customPricing } = options;

  // Track detail fields directly
  let totalNoCacheTokens = 0;
  let totalCacheReadTokens = 0;
  let totalCacheWriteTokens = 0;
  let totalTextTokens = 0;
  let totalReasoningTokens = 0;
  let requestCount = 0;

  return {
    addUsage(usage: LanguageModelUsage): void {
      const inputDetails = usage.inputTokenDetails;
      if (inputDetails) {
        totalNoCacheTokens += inputDetails.noCacheTokens ?? 0;
        totalCacheReadTokens += inputDetails.cacheReadTokens ?? 0;
        totalCacheWriteTokens += inputDetails.cacheWriteTokens ?? 0;
      } else if (usage.inputTokens !== undefined) {
        totalNoCacheTokens += usage.inputTokens;
      }

      const outputDetails = usage.outputTokenDetails;
      if (outputDetails) {
        totalTextTokens += outputDetails.textTokens ?? 0;
        totalReasoningTokens += outputDetails.reasoningTokens ?? 0;
      } else if (usage.outputTokens !== undefined) {
        totalTextTokens += usage.outputTokens;
      }

      requestCount++;
    },

    getTotalUsage(): LanguageModelUsage {
      const inputTokens =
        totalNoCacheTokens + totalCacheReadTokens + totalCacheWriteTokens;
      const outputTokens = totalTextTokens + totalReasoningTokens;

      return {
        inputTokens,
        outputTokens,
        totalTokens: inputTokens + outputTokens,
        inputTokenDetails: {
          noCacheTokens: totalNoCacheTokens,
          cacheReadTokens: totalCacheReadTokens,
          cacheWriteTokens: totalCacheWriteTokens,
        },
        outputTokenDetails: {
          textTokens: totalTextTokens,
          reasoningTokens: totalReasoningTokens,
        },
      };
    },

    getTotalCost(): CostBreakdown {
      return calculateCost({
        model,
        usage: this.getTotalUsage(),
        customPricing,
      });
    },

    getRequestCount(): number {
      return requestCount;
    },

    reset(): void {
      totalNoCacheTokens = 0;
      totalCacheReadTokens = 0;
      totalCacheWriteTokens = 0;
      totalTextTokens = 0;
      totalReasoningTokens = 0;
      requestCount = 0;
    },
  };
}

export interface StreamCostOptions {
  model: string;
  customPricing?: ModelPricing;
  onCost?: (cost: CostBreakdown, usage: LanguageModelUsage) => void;
}

export async function calculateStreamCost<T extends { usage: LanguageModelUsage }>(
  streamResult: T | Promise<T>,
  options: StreamCostOptions
): Promise<CostBreakdown & { usage: LanguageModelUsage }> {
  const result = await streamResult;
  const usage = result.usage;

  const cost = calculateCost({
    model: options.model,
    usage,
    customPricing: options.customPricing,
  });

  if (options.onCost) {
    options.onCost(cost, usage);
  }

  return {
    ...cost,
    usage,
  };
}
