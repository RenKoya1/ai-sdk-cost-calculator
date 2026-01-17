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
  provider: string;
  modelId: string;
  customPricing?: ModelPricing;
}

export function createCostTracker(options: CreateCostTrackerOptions): CostTracker {
  const { provider, modelId, customPricing } = options;

  // Track detail fields directly
  let totalNoCacheTokens = 0;
  let totalCacheReadTokens = 0;
  let totalCacheWriteTokens = 0;
  let totalTextTokens = 0;
  let totalReasoningTokens = 0;
  let requestCount = 0;

  return {
    addUsage(usage: LanguageModelUsage): void {
      totalNoCacheTokens += usage.inputTokenDetails?.noCacheTokens ?? 0;
      totalCacheReadTokens += usage.inputTokenDetails?.cacheReadTokens ?? 0;
      totalCacheWriteTokens += usage.inputTokenDetails?.cacheWriteTokens ?? 0;
      totalTextTokens += usage.outputTokenDetails?.textTokens ?? 0;
      totalReasoningTokens += usage.outputTokenDetails?.reasoningTokens ?? 0;

      requestCount++;
    },

    getTotalUsage(): LanguageModelUsage {
      const inputTokens = totalNoCacheTokens + totalCacheReadTokens;
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
        provider,
        modelId,
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
  provider: string;
  modelId: string;
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
    provider: options.provider,
    modelId: options.modelId,
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
