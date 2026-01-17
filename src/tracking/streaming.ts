import { LanguageModelUsage } from "ai";
import { calculateCost } from "../core/calculator";
import type { CostBreakdown } from "../core/types";
import type { ModelPricing } from "../pricing";
import {
  addUsageToTotals,
  createEmptyUsageTotals,
  totalsToUsage,
} from "../shared/usage";

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

  let totals = createEmptyUsageTotals();
  let requestCount = 0;

  return {
    addUsage(usage: LanguageModelUsage): void {
      addUsageToTotals(totals, usage);

      requestCount++;
    },

    getTotalUsage(): LanguageModelUsage {
      return totalsToUsage(totals);
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
      totals = createEmptyUsageTotals();
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
