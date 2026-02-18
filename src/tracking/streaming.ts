import { LanguageModelUsage } from "ai";
import { calculateCost } from "../core/calculator";
import type { CostBreakdown } from "../core/types";
import type { ModelPricing } from "../pricing";
import { multiplyCostBreakdown } from "../shared/cost";
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
  /** Multiply all cost values by this factor (e.g., 1.5 for 150% markup) */
  costMultiplier?: number;
}

export function createCostTracker(options: CreateCostTrackerOptions): CostTracker {
  const { model, customPricing, costMultiplier } = options;

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
      let cost = calculateCost({
        model,
        usage: this.getTotalUsage(),
        customPricing,
      });

      if (costMultiplier != null) {
        cost = multiplyCostBreakdown(cost, costMultiplier);
      }

      return cost;
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
  /** Multiply all cost values by this factor (e.g., 1.5 for 150% markup) */
  costMultiplier?: number;
  onCost?: (cost: CostBreakdown, usage: LanguageModelUsage) => void;
}

export async function calculateStreamCost<T extends { usage: LanguageModelUsage }>(
  streamResult: T | Promise<T>,
  options: StreamCostOptions
): Promise<CostBreakdown & { usage: LanguageModelUsage }> {
  const result = await streamResult;
  const usage = result.usage;

  let cost = calculateCost({
    model: options.model,
    usage,
    customPricing: options.customPricing,
  });

  if (options.costMultiplier != null) {
    cost = multiplyCostBreakdown(cost, options.costMultiplier);
  }

  if (options.onCost) {
    options.onCost(cost, usage);
  }

  return {
    ...cost,
    usage,
  };
}
