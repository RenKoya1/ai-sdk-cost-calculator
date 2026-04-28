import { LanguageModelUsage } from "ai";
import { getModelPricingByModelId, type ModelPricing } from "../pricing";
import {
  COST_COMPONENT_FIELDS,
  type CostBreakdown,
  type CostComponentField,
} from "./types";
import { roundToMicroDollars } from "../shared/cost";
import { getUsageTokenDetails } from "../shared/usage";

const TOKENS_PER_MILLION = 1_000_000;

export type { CostBreakdown } from "./types";

export interface CalculateCostOptions {
  model: string;
  usage: LanguageModelUsage;
  customPricing?: ModelPricing;
  /** Number of web search requests made (for grounding/live search) */
  webSearchRequests?: number;
  /** Number of Google Maps API requests made */
  googleMapsRequests?: number;
  /** Number of xAI X Search requests made */
  xSearchRequests?: number;
  /** Number of xAI Code Execution requests made */
  codeExecutionRequests?: number;
  /** Number of xAI Document Search requests made */
  documentSearchRequests?: number;
  /** Number of xAI Collections Search requests made */
  collectionsSearchRequests?: number;
  /** Number of images generated */
  imageGenerations?: number;
  /** Image size/quality for pricing lookup (e.g., "1024x1024", "hd-1024x1024") */
  imageSize?: string;
  /**
   * Audio input tokens. Subset of usage.inputTokens (noCacheTokens). When
   * provided AND model has audioInputPer1MTokens, charged at audio rate;
   * subtracted from regular input charge to avoid double counting.
   */
  audioInputTokens?: number;
  /**
   * Audio output tokens. Subset of usage.outputTokens (textTokens). When
   * provided AND model has audioOutputPer1MTokens, charged at audio rate;
   * subtracted from regular output charge.
   */
  audioOutputTokens?: number;
  /**
   * Token-hours of context cache storage. token-hours = cached_tokens × hours.
   * Charged at cacheStoragePer1MTokensPerHour (Gemini context caching).
   */
  cacheStorageTokenHours?: number;
}

interface EffectivePricing {
  inputPer1MTokens: number;
  outputPer1MTokens: number;
  cacheReadPer1MTokens: number;
  cacheWritePer1MTokens: number;
  reasoningPer1MTokens: number;
  isLongContext: boolean;
}

function getEffectivePricing(
  pricing: ModelPricing,
  inputTokens: number,
): EffectivePricing {
  const threshold = pricing.longContextThreshold ?? 200000;
  const isLongContext =
    inputTokens > threshold &&
    pricing.longContextInputPer1MTokens !== undefined;

  if (isLongContext) {
    return {
      inputPer1MTokens: pricing.longContextInputPer1MTokens!,
      outputPer1MTokens:
        pricing.longContextOutputPer1MTokens ?? pricing.outputPer1MTokens,
      cacheReadPer1MTokens:
        pricing.longContextCacheReadPer1MTokens ??
        pricing.cacheReadPer1MTokens ??
        pricing.longContextInputPer1MTokens!,
      cacheWritePer1MTokens:
        pricing.longContextCacheWritePer1MTokens ??
        pricing.cacheWritePer1MTokens ??
        0,
      reasoningPer1MTokens:
        pricing.longContextReasoningPer1MTokens ??
        pricing.reasoningPer1MTokens ??
        pricing.longContextOutputPer1MTokens ??
        pricing.outputPer1MTokens,
      isLongContext: true,
    };
  }

  return {
    inputPer1MTokens: pricing.inputPer1MTokens,
    outputPer1MTokens: pricing.outputPer1MTokens,
    cacheReadPer1MTokens:
      pricing.cacheReadPer1MTokens ?? pricing.inputPer1MTokens,
    cacheWritePer1MTokens: pricing.cacheWritePer1MTokens ?? 0,
    reasoningPer1MTokens:
      pricing.reasoningPer1MTokens ?? pricing.outputPer1MTokens,
    isLongContext: false,
  };
}

function costFromTokens(tokens: number, per1MTokens: number): number {
  return (tokens / TOKENS_PER_MILLION) * per1MTokens;
}

export function calculateCost(options: CalculateCostOptions): CostBreakdown {
  const {
    model,
    usage,
    customPricing,
    webSearchRequests = 0,
    googleMapsRequests = 0,
    xSearchRequests = 0,
    codeExecutionRequests = 0,
    documentSearchRequests = 0,
    collectionsSearchRequests = 0,
    imageGenerations = 0,
    imageSize,
    audioInputTokens = 0,
    audioOutputTokens = 0,
    cacheStorageTokenHours = 0,
  } = options;

  const pricing = customPricing ?? getModelPricingByModelId(model);

  if (!pricing) {
    throw new Error(
      `Unknown model: ${model}. Use customPricing option or add the model to pricing/providers`,
    );
  }

  const usageDetails = getUsageTokenDetails(usage);

  // Get effective pricing based on input token count
  const effectivePricing = getEffectivePricing(
    pricing,
    usageDetails.totalInputTokens,
  );

  // Audio tokens (when caller specifies them) are subsets of noCacheTokens
  // and textTokens — split out and priced at audio rates if model has them.
  // If model has no audio rate, fall back to regular input/output rate
  // (no split) by treating audio counts as 0.
  const hasAudioInRate = pricing.audioInputPer1MTokens != null;
  const hasAudioOutRate = pricing.audioOutputPer1MTokens != null;
  const billableAudioIn = hasAudioInRate
    ? Math.min(audioInputTokens, usageDetails.noCacheTokens)
    : 0;
  const billableAudioOut = hasAudioOutRate
    ? Math.min(audioOutputTokens, usageDetails.textTokens)
    : 0;

  const inputCost = costFromTokens(
    usageDetails.noCacheTokens - billableAudioIn,
    effectivePricing.inputPer1MTokens,
  );

  const audioInputCost = costFromTokens(
    billableAudioIn,
    pricing.audioInputPer1MTokens ?? 0,
  );

  const cacheReadCost = costFromTokens(
    usageDetails.cacheReadTokens,
    effectivePricing.cacheReadPer1MTokens,
  );

  const cacheWriteCost = costFromTokens(
    usageDetails.cacheWriteTokens,
    effectivePricing.cacheWritePer1MTokens,
  );

  const cacheStorageCost = cacheStorageTokenHours > 0 && pricing.cacheStoragePer1MTokensPerHour
    ? (cacheStorageTokenHours / TOKENS_PER_MILLION) * pricing.cacheStoragePer1MTokensPerHour
    : 0;

  const reasoningCost = costFromTokens(
    usageDetails.reasoningTokens,
    effectivePricing.reasoningPer1MTokens,
  );

  // Calculate image generation cost and determine image token adjustment
  let imageGenerationCost = 0;
  let imageOutputTokens = 0; // Tokens to subtract from text output (native image gen only)

  if (imageGenerations > 0) {
    if (pricing.imageOutputTokensBySize) {
      // Native image generation (e.g., Gemini image models via generateText)
      // Image tokens are included in completionTokens — subtract them from text output
      const sizeKey = imageSize ?? pricing.imageOutputDefaultSize ?? "1K";
      const tokensPerImage = pricing.imageOutputTokensBySize[sizeKey]
        ?? pricing.imageOutputTokensBySize[pricing.imageOutputDefaultSize ?? "1K"]
        ?? 1120; // fallback: ~1K image

      imageOutputTokens = imageGenerations * tokensPerImage;

      // Use exact per-image price from imageGenerationPricing if available,
      // otherwise compute from token rate (imageOutputPer1MTokens)
      if (pricing.imageGenerationPricing?.[sizeKey]) {
        imageGenerationCost = imageGenerations * pricing.imageGenerationPricing[sizeKey];
      } else if (pricing.imageGenerationPerImage) {
        imageGenerationCost = imageGenerations * pricing.imageGenerationPerImage;
      } else if (pricing.imageOutputPer1MTokens) {
        imageGenerationCost = costFromTokens(imageOutputTokens, pricing.imageOutputPer1MTokens);
      }
    } else {
      // Dedicated image model (e.g., Imagen, DALL-E): flat per-image pricing
      let pricePerImage = pricing.imageGenerationPerImage ?? 0;
      if (imageSize && pricing.imageGenerationPricing?.[imageSize]) {
        pricePerImage = pricing.imageGenerationPricing[imageSize];
      }
      imageGenerationCost = imageGenerations * pricePerImage;
    }
  }

  // Text output cost. Subtract image and audio tokens to avoid double-counting:
  // image tokens are priced at imageOutputPer1MTokens, audio at audioOutputPer1MTokens.
  const textOutputTokens = Math.max(
    0,
    usageDetails.textTokens - imageOutputTokens - billableAudioOut,
  );
  const outputCost = costFromTokens(
    textOutputTokens,
    effectivePricing.outputPer1MTokens,
  );

  const audioOutputCost = costFromTokens(
    billableAudioOut,
    pricing.audioOutputPer1MTokens ?? 0,
  );

  // Per-1k request fees: count × (per1kPrice / 1000). Web search has an
  // additional fixed-token charge handled below.
  const feeFor = (count: number, per1k: number | undefined): number =>
    count > 0 && per1k ? (count / 1000) * per1k : 0;

  let webSearchCost = feeFor(webSearchRequests, pricing.webSearchPer1kRequests);
  if (webSearchRequests > 0 && pricing.webSearchTokensPerRequest) {
    // Some models charge fixed tokens per search (e.g., OpenAI mini = 8k tokens)
    webSearchCost += costFromTokens(
      webSearchRequests * pricing.webSearchTokensPerRequest,
      effectivePricing.inputPer1MTokens,
    );
  }

  const googleMapsCost = feeFor(googleMapsRequests, pricing.googleMapsPer1kRequests);
  const xSearchCost = feeFor(xSearchRequests, pricing.xSearchPer1kRequests);
  const codeExecutionCost = feeFor(codeExecutionRequests, pricing.codeExecutionPer1kRequests);
  const documentSearchCost = feeFor(documentSearchRequests, pricing.documentSearchPer1kRequests);
  const collectionsSearchCost = feeFor(collectionsSearchRequests, pricing.collectionsSearchPer1kRequests);

  const components: Record<CostComponentField, number> = {
    inputCost,
    outputCost,
    cacheReadCost,
    cacheWriteCost,
    cacheStorageCost,
    reasoningCost,
    audioInputCost,
    audioOutputCost,
    webSearchCost,
    googleMapsCost,
    xSearchCost,
    codeExecutionCost,
    documentSearchCost,
    collectionsSearchCost,
    imageGenerationCost,
    additionalCost: 0,
  };

  let totalCost = 0;
  const breakdown = {
    currency: "USD" as const,
    isLongContext: effectivePricing.isLongContext,
    totalCost: 0,
  } as CostBreakdown;
  for (const field of COST_COMPONENT_FIELDS) {
    const rounded = roundToMicroDollars(components[field]);
    breakdown[field] = rounded;
    totalCost += components[field];
  }
  breakdown.totalCost = roundToMicroDollars(totalCost);
  return breakdown;
}

export function formatCost(cost: number, decimals: number = 6): string {
  return `$${cost.toFixed(decimals)}`;
}

const FORMAT_LABELS: Record<CostComponentField, string> = {
  inputCost: "Input:        ",
  cacheReadCost: "Cache Read:   ",
  cacheWriteCost: "Cache Write:  ",
  cacheStorageCost: "Cache Store:  ",
  outputCost: "Output:       ",
  reasoningCost: "Reasoning:    ",
  audioInputCost: "Audio In:     ",
  audioOutputCost: "Audio Out:    ",
  webSearchCost: "Web Search:   ",
  googleMapsCost: "Google Maps:  ",
  xSearchCost: "X Search:     ",
  codeExecutionCost: "Code Exec:    ",
  documentSearchCost: "Doc Search:   ",
  collectionsSearchCost: "Collections:  ",
  imageGenerationCost: "Image Gen:    ",
  additionalCost: "Additional:   ",
};

const FORMAT_ORDER: CostComponentField[] = [
  "inputCost",
  "audioInputCost",
  "cacheReadCost",
  "cacheWriteCost",
  "cacheStorageCost",
  "outputCost",
  "audioOutputCost",
  "reasoningCost",
  "webSearchCost",
  "googleMapsCost",
  "xSearchCost",
  "codeExecutionCost",
  "documentSearchCost",
  "collectionsSearchCost",
  "imageGenerationCost",
  "additionalCost",
];

export function formatCostBreakdown(
  result: CostBreakdown,
  decimals: number = 6,
): string {
  const lines: string[] = [];
  if (result.isLongContext) {
    lines.push(`(Long context pricing applied)`);
  }
  for (const field of FORMAT_ORDER) {
    const value = result[field];
    if (value > 0) {
      lines.push(`${FORMAT_LABELS[field]} ${formatCost(value, decimals)}`);
    }
  }
  lines.push(`Total:        ${formatCost(result.totalCost, decimals)}`);
  return lines.join("\n");
}
