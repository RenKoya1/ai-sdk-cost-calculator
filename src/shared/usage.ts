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
  const inputDetails = usage.inputTokenDetails;
  if (inputDetails) {
    totals.noCacheTokens += inputDetails.noCacheTokens ?? 0;
    totals.cacheReadTokens += inputDetails.cacheReadTokens ?? 0;
    totals.cacheWriteTokens += inputDetails.cacheWriteTokens ?? 0;
  } else if (usage.inputTokens !== undefined) {
    totals.noCacheTokens += usage.inputTokens;
  }

  const outputDetails = usage.outputTokenDetails;
  if (outputDetails) {
    totals.textTokens += outputDetails.textTokens ?? 0;
    totals.reasoningTokens += outputDetails.reasoningTokens ?? 0;
  } else if (usage.outputTokens !== undefined) {
    totals.textTokens += usage.outputTokens;
  }
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

  let noCacheTokens = inputDetails?.noCacheTokens ?? 0;
  let cacheReadTokens = inputDetails?.cacheReadTokens ?? 0;
  let cacheWriteTokens = inputDetails?.cacheWriteTokens ?? 0;

  let textTokens = outputDetails?.textTokens ?? 0;
  let reasoningTokens = outputDetails?.reasoningTokens ?? 0;

  if (!inputDetails && usage.inputTokens !== undefined) {
    noCacheTokens = usage.inputTokens;
  }

  if (!outputDetails && usage.outputTokens !== undefined) {
    textTokens = usage.outputTokens;
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
