import { LanguageModelUsage } from "ai";
import { calculateCost } from "../core/calculator";
import type { CostBreakdown } from "../core/types";
import type { ModelPricing } from "../pricing";
import {
  addCostBreakdowns,
  emptyCostBreakdown,
  multiplyCostBreakdown,
} from "../shared/cost";
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
  let cost = emptyCostBreakdown();
  let requestCount = 0;

  return {
    // Each addUsage represents one completion. Pricing is computed per-call so
    // long-context thresholds and multipliers apply correctly without being
    // distorted by cumulative token totals from prior calls.
    addUsage(usage: LanguageModelUsage): void {
      let delta = calculateCost({ model, usage, customPricing });
      if (costMultiplier != null) {
        delta = multiplyCostBreakdown(delta, costMultiplier);
      }
      addUsageToTotals(totals, usage);
      cost = addCostBreakdowns(cost, delta);
      requestCount++;
    },

    getTotalUsage(): LanguageModelUsage {
      return totalsToUsage(totals);
    },

    getTotalCost(): CostBreakdown {
      return cost;
    },

    getRequestCount(): number {
      return requestCount;
    },

    reset(): void {
      totals = createEmptyUsageTotals();
      cost = emptyCostBreakdown();
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
