# ai-sdk-cost-calculator

Cost calculator for [Vercel AI SDK](https://sdk.vercel.ai/) token usage. Calculate API costs for OpenAI, Anthropic, Google, xAI (Grok), and DeepSeek with support for long context pricing, prompt caching, and reasoning tokens.

## Features

- **Multi-provider support**: OpenAI, Anthropic, Google Gemini, xAI Grok, DeepSeek
- **AI SDK integration**: Works directly with `LanguageModelUsage` from AI SDK
- **Long context pricing**: Automatic tier-based pricing (e.g., Claude Sonnet 4.5 >200K tokens)
- **Prompt caching**: Separate pricing for cache reads and writes
- **Reasoning tokens**: Support for o1/o3/R1 reasoning model costs
- **Cost tracking**: Track cumulative costs across multiple requests
- **TypeScript**: Full type definitions included

## Installation

```bash
npm install ai-sdk-cost-calculator
```

**Peer dependency**: Requires `ai` (Vercel AI SDK) version 6.0.0 or higher.

```bash
npm install ai
```

## Quick Start

```typescript
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { calculateCost, formatCost } from "ai-sdk-cost-calculator";

const result = await generateText({
  model: openai("gpt-4o"),
  prompt: "Hello, world!",
});

const cost = calculateCost({
  model: "gpt-4o",
  usage: result.usage,
});

console.log(`Total cost: ${formatCost(cost.totalCost)}`);
// Output: Total cost: $0.000150
```

## API Reference

### `calculateCost(options)`

Calculate the cost for a single API request.

```typescript
import { calculateCost } from "ai-sdk-cost-calculator";

const cost = calculateCost({
  model: "claude-sonnet-4-5",
  usage: {
    inputTokens: 1000,
    outputTokens: 500,
    inputTokenDetails: {
      noCacheTokens: 700,
      cacheReadTokens: 200,
      cacheWriteTokens: 100,
    },
    outputTokenDetails: {
      textTokens: 500,
      reasoningTokens: 0,
    },
  },
});

console.log(cost);
// {
//   inputCost: 0.0024,
//   outputCost: 0.0075,
//   cacheReadCost: 0.00006,
//   cacheWriteCost: 0.000375,
//   reasoningCost: 0,
//   totalCost: 0.010335,
//   currency: "USD",
//   isLongContext: false
// }
```

#### Options

| Property        | Type                 | Required | Description                                                |
| --------------- | -------------------- | -------- | ---------------------------------------------------------- |
| `model`         | `string`             | Yes      | Model identifier (e.g., `"gpt-4o"`, `"claude-sonnet-4-5"`) |
| `usage`         | `LanguageModelUsage` | Yes      | Token usage from AI SDK                                    |
| `customPricing` | `ModelPricing`       | No       | Override default pricing                                   |

#### Return Value: `CostBreakdown`

| Property         | Type      | Description                                  |
| ---------------- | --------- | -------------------------------------------- |
| `inputCost`      | `number`  | Cost for input tokens (excluding cache)      |
| `outputCost`     | `number`  | Cost for output tokens (excluding reasoning) |
| `cacheReadCost`  | `number`  | Cost for cached input tokens                 |
| `cacheWriteCost` | `number`  | Cost for writing to cache                    |
| `reasoningCost`  | `number`  | Cost for reasoning tokens                    |
| `totalCost`      | `number`  | Sum of all costs                             |
| `currency`       | `"USD"`   | Always USD                                   |
| `isLongContext`  | `boolean` | Whether long context pricing was applied     |

### `formatCost(cost, decimals?)`

Format a cost value as a currency string.

```typescript
import { formatCost } from "ai-sdk-cost-calculator";

formatCost(0.0015); // "$0.001500"
formatCost(0.0015, 4); // "$0.0015"
```

### `formatCostBreakdown(breakdown, decimals?)`

Format a full cost breakdown as a multi-line string.

```typescript
import { formatCostBreakdown } from "ai-sdk-cost-calculator";

const output = formatCostBreakdown(cost);
// Input:        $0.002400
// Cache Read:   $0.000060
// Cache Write:  $0.000375
// Output:       $0.007500
// Total:        $0.010335
```

### `createCostTracker(options)`

Track cumulative costs across multiple requests.

```typescript
import { createCostTracker } from "ai-sdk-cost-calculator";

const tracker = createCostTracker({
  model: "gpt-4o",
});

// Add usage from multiple requests
tracker.addUsage(result1.usage);
tracker.addUsage(result2.usage);
tracker.addUsage(result3.usage);

console.log(`Requests: ${tracker.getRequestCount()}`);
console.log(`Total tokens: ${tracker.getTotalUsage().totalTokens}`);
console.log(`Total cost: ${formatCost(tracker.getTotalCost().totalCost)}`);

// Reset when needed
tracker.reset();
```

### `calculateStreamCost(streamResult, options)`

Calculate cost from a streaming response.

```typescript
import { streamText } from "ai";
import { calculateStreamCost } from "ai-sdk-cost-calculator";

const stream = await streamText({
  model: openai("gpt-4o"),
  prompt: "Write a haiku",
});

const cost = await calculateStreamCost(stream, {
  model: "gpt-4o",
  onCost: (cost, usage) => {
    console.log(`Stream completed: ${formatCost(cost.totalCost)}`);
  },
});
```

### Pricing Data Access

Access raw pricing data for any provider or model.

```typescript
import {
  openaiPricing,
  anthropicPricing,
  googlePricing,
  xaiPricing,
  deepseekPricing,
  getModelPricing,
  getModelPricingByModelId,
  getAllSupportedModels,
} from "ai-sdk-cost-calculator";

// Get pricing for a specific model
const pricing = getModelPricing("anthropic", "claude-sonnet-4-5");
console.log(pricing);
// {
//   inputPer1MTokens: 3,
//   outputPer1MTokens: 15,
//   cacheReadPer1MTokens: 0.3,
//   cacheWritePer1MTokens: 3.75,
//   longContextThreshold: 200000,
//   longContextInputPer1MTokens: 6,
//   longContextOutputPer1MTokens: 22.5,
//   ...
// }

// Get pricing by model ID only (searches all providers)
const pricing2 = getModelPricingByModelId("gpt-4o");

// List all supported models
const models = getAllSupportedModels();
// [{ provider: "openai", modelId: "gpt-4o" }, ...]
```

## Supported Models

### OpenAI (23 models)

- GPT-4o, GPT-4o-mini
- GPT-4.1, GPT-4.1-mini, GPT-4.1-nano
- GPT-4 Turbo, GPT-4, GPT-4-32k
- GPT-3.5 Turbo
- o1, o1-mini, o1-pro, o1-preview
- o3, o3-mini, o3-pro
- o4-mini

### Anthropic (23 models)

- Claude Opus 4.5, Sonnet 4.5, Haiku 4.5
- Claude Opus 4.1, Sonnet 4, Opus 4
- Claude 3.5 Sonnet, 3.5 Haiku
- Claude 3 Opus, 3 Sonnet, 3 Haiku
- All dated variants (e.g., `claude-3-5-sonnet-20241022`)

### Google Gemini (17 models)

- Gemini 3 Pro, 3 Flash
- Gemini 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite
- Gemini 2.0 Flash, 2.0 Flash-Lite
- Gemini 1.5 Pro, 1.5 Flash, 1.5 Flash-8B

### xAI Grok (12 models)

- Grok 4, Grok 4-0709
- Grok 4 Fast (reasoning/non-reasoning)
- Grok 4.1 Fast (reasoning/non-reasoning)
- Grok Code Fast
- Grok 3, Grok 3-mini
- Grok 2, Grok 2 Vision

### DeepSeek (10 models)

- DeepSeek Chat (V3, V3.2)
- DeepSeek Reasoner (R1)
- DeepSeek R1 Distill variants
- DeepSeek Coder

## Long Context Pricing

Some models have tiered pricing based on input token count:

| Model             | Threshold | Standard    | Long Context |
| ----------------- | --------- | ----------- | ------------ |
| Claude Sonnet 4.5 | 200K      | $3/$15      | $6/$22.50    |
| Gemini 2.5 Pro    | 200K      | $1.25/$10   | $2.50/$15    |
| Gemini 1.5 Pro    | 128K      | $1.25/$5    | $2.50/$10    |
| Grok 4 Fast       | 128K      | $0.20/$0.50 | $0.40/$1.00  |

The calculator automatically applies the correct pricing tier based on input token count.

## Custom Pricing

Override default pricing for any model:

```typescript
const cost = calculateCost({
  model: "gpt-4o",
  usage: result.usage,
  customPricing: {
    inputPer1MTokens: 2.0, // Custom rate
    outputPer1MTokens: 8.0,
    cacheReadPer1MTokens: 1.0,
  },
});
```

## TypeScript Types

```typescript
import type {
  CostBreakdown,
  CalculateCostOptions,
  ModelPricing,
  ProviderPricing,
  Provider,
  CostTracker,
  CreateCostTrackerOptions,
  StreamCostOptions,
} from "ai-sdk-cost-calculator";
```

## Pricing Sources

Pricing data is sourced from official provider documentation:

- [OpenAI API Pricing](https://openai.com/api/pricing/)
- [Anthropic Claude Pricing](https://www.anthropic.com/pricing)
- [Google Gemini API Pricing](https://ai.google.dev/gemini-api/docs/pricing)
- [xAI Grok API](https://docs.x.ai/docs/models)
- [DeepSeek API Pricing](https://api-docs.deepseek.com/quick_start/pricing)

**Note**: Prices may change. Please verify current pricing with official sources for production use.

## License

MIT
