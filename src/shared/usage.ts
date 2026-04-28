import type { LanguageModelUsage } from "ai";

export interface UsageTokenDetails {
  noCacheTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  textTokens: number;
  reasoningTokens: number;
  totalInputTokens: number;
}

export interface UsageTokenTotals {
  noCacheTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  textTokens: number;
  reasoningTokens: number;
}

export function createEmptyUsageTotals(): UsageTokenTotals {
  return {
    noCacheTokens: 0,
    cacheReadTokens: 0,
    cacheWriteTokens: 0,
    textTokens: 0,
    reasoningTokens: 0,
  };
}

export function addUsageToTotals(
  totals: UsageTokenTotals,
  usage: LanguageModelUsage,
): void {
  const details = getUsageTokenDetails(usage);
  totals.noCacheTokens += details.noCacheTokens;
  totals.cacheReadTokens += details.cacheReadTokens;
  totals.cacheWriteTokens += details.cacheWriteTokens;
  totals.textTokens += details.textTokens;
  totals.reasoningTokens += details.reasoningTokens;
}

export function totalsToUsage(totals: UsageTokenTotals): LanguageModelUsage {
  const inputTokens =
    totals.noCacheTokens + totals.cacheReadTokens + totals.cacheWriteTokens;
  const outputTokens = totals.textTokens + totals.reasoningTokens;

  return {
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
    inputTokenDetails: {
      noCacheTokens: totals.noCacheTokens,
      cacheReadTokens: totals.cacheReadTokens,
      cacheWriteTokens: totals.cacheWriteTokens,
    },
    outputTokenDetails: {
      textTokens: totals.textTokens,
      reasoningTokens: totals.reasoningTokens,
    },
  };
}

export function getUsageTokenDetails(
  usage: LanguageModelUsage,
): UsageTokenDetails {
  const inputDetails = usage.inputTokenDetails;
  const outputDetails = usage.outputTokenDetails;

  // Cache read: prefer details, fall back to deprecated top-level cachedInputTokens
  const cacheReadTokens =
    inputDetails?.cacheReadTokens ?? usage.cachedInputTokens ?? 0;
  const cacheWriteTokens = inputDetails?.cacheWriteTokens ?? 0;

  // noCacheTokens: prefer details. If details exist but noCacheTokens is
  // undefined (some providers populate only cacheRead), derive from
  // inputTokens - cacheRead - cacheWrite. If no details at all, use inputTokens.
  let noCacheTokens: number;
  if (inputDetails?.noCacheTokens !== undefined) {
    noCacheTokens = inputDetails.noCacheTokens;
  } else if (usage.inputTokens !== undefined) {
    noCacheTokens = Math.max(
      0,
      usage.inputTokens - cacheReadTokens - cacheWriteTokens,
    );
  } else {
    noCacheTokens = 0;
  }

  // reasoningTokens: prefer details, fall back to deprecated top-level
  const reasoningTokens =
    outputDetails?.reasoningTokens ?? usage.reasoningTokens ?? 0;

  // textTokens: prefer details. If details exist but textTokens is undefined,
  // derive from outputTokens - reasoningTokens. If no details, use outputTokens.
  let textTokens: number;
  if (outputDetails?.textTokens !== undefined) {
    textTokens = outputDetails.textTokens;
  } else if (usage.outputTokens !== undefined) {
    textTokens = Math.max(0, usage.outputTokens - reasoningTokens);
  } else {
    textTokens = 0;
  }

  const totalInputTokens =
    usage.inputTokens ?? noCacheTokens + cacheReadTokens + cacheWriteTokens;

  return {
    noCacheTokens,
    cacheReadTokens,
    cacheWriteTokens,
    textTokens,
    reasoningTokens,
    totalInputTokens,
  };
}
