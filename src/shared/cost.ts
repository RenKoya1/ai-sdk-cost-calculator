import {
  COST_COMPONENT_FIELDS,
  type CostBreakdown,
  type CostComponentField,
} from "../core/types";

const MICRO_DOLLARS = 1_000_000;

export function roundToMicroDollars(value: number): number {
  return Math.round(value * MICRO_DOLLARS) / MICRO_DOLLARS;
}

function mapBreakdown(
  cost: CostBreakdown,
  fn: (value: number, field: CostComponentField | "totalCost") => number,
): CostBreakdown {
  const out = {
    currency: "USD" as const,
    isLongContext: cost.isLongContext,
    totalCost: fn(cost.totalCost, "totalCost"),
  } as CostBreakdown;
  for (const field of COST_COMPONENT_FIELDS) {
    out[field] = fn(cost[field], field);
  }
  return out;
}

export function emptyCostBreakdown(): CostBreakdown {
  const out = {
    currency: "USD" as const,
    isLongContext: false,
    totalCost: 0,
  } as CostBreakdown;
  for (const field of COST_COMPONENT_FIELDS) {
    out[field] = 0;
  }
  return out;
}

export function roundCostBreakdown(cost: CostBreakdown): CostBreakdown {
  return mapBreakdown(cost, roundToMicroDollars);
}

export function multiplyCostBreakdown(
  cost: CostBreakdown,
  multiplier: number,
): CostBreakdown {
  return mapBreakdown(cost, (value) => roundToMicroDollars(value * multiplier));
}

export function addCostBreakdowns(
  a: CostBreakdown,
  b: CostBreakdown,
): CostBreakdown {
  const out = {
    currency: "USD" as const,
    isLongContext: a.isLongContext || b.isLongContext,
    totalCost: a.totalCost + b.totalCost,
  } as CostBreakdown;
  for (const field of COST_COMPONENT_FIELDS) {
    out[field] = a[field] + b[field];
  }
  return out;
}
