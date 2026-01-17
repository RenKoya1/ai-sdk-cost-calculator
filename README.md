# ai-sdk-cost-calculator

Cost calculator for [Vercel AI SDK](https://sdk.vercel.ai/) token usage. Calculate API costs for OpenAI, Anthropic, Google, xAI (Grok), DeepSeek, and Perplexity with support for long context pricing, prompt caching, reasoning tokens, and web search.

## Features

- **Multi-provider support**: OpenAI, Anthropic, Google Gemini, xAI Grok, DeepSeek, Perplexity
- **AI SDK native**: Use with `onFinish` callbacks via `withCost()` wrapper
- **Session tracking**: Track costs across multiple calls with `createCostAwareAI()`
- **Multi-model tracking**: Track costs across different models in a single tracker
- **Web search pricing**: Calculate costs for grounding/search features
- **Long context pricing**: Automatic tier-based pricing (e.g., Claude Sonnet 4.5 >200K tokens)
- **Prompt caching**: Separate pricing for cache reads and writes
- **Reasoning tokens**: Support for o1/o3/R1 reasoning model costs
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

## AI SDK Integration

### Using `withCost` with `onFinish`

The easiest way to track costs is with the `withCost` callback wrapper:

```typescript
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { withCost, formatCost } from "ai-sdk-cost-calculator";

const result = await generateText({
  model: openai("gpt-4o"),
  prompt: "Hello!",
  onFinish: withCost("gpt-4o", ({ cost, usage }) => {
    console.log(`Cost: ${formatCost(cost.totalCost)}`);
    console.log(`Tokens: ${usage.inputTokens} in, ${usage.outputTokens} out`);
  }),
});
```

You can also pass the model object directly:

```typescript
const model = openai("gpt-4o");

await generateText({
  model,
  prompt: "Hello!",
  onFinish: withCost(model, ({ cost }) => {
    console.log(`Cost: ${formatCost(cost.totalCost)}`);
  }),
});
```

### Using `getCost` for One-Shot Calculation

For simple post-hoc cost calculation:

```typescript
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { getCost, formatCost } from "ai-sdk-cost-calculator";

const result = await generateText({
  model: openai("gpt-4o"),
  prompt: "Hello!",
});

const cost = getCost("gpt-4o", result.usage);
console.log(`Cost: ${formatCost(cost.totalCost)}`);
```

### Using `createCostAwareAI` for Session Tracking

For tracking costs across multiple calls in a session:

```typescript
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { createCostAwareAI, formatCost } from "ai-sdk-cost-calculator";

const ai = createCostAwareAI({
  onCost: (model, cost) => {
    console.log(`[${model}] ${formatCost(cost.totalCost)}`);
  },
});

// First call
await generateText({
  model: openai("gpt-4o"),
  prompt: "Hello!",
  onFinish: ai.onFinish("gpt-4o"),
});

// Second call with different model
await generateText({
  model: anthropic("claude-sonnet-4-5"),
  prompt: "Hello!",
  onFinish: ai.onFinish("claude-sonnet-4-5"),
});

// Get totals
console.log(`Total: ${formatCost(ai.getTotal().totalCost)}`);
console.log(`Requests: ${ai.getRequestCount()}`);
console.log(`Models: ${ai.getModels().join(", ")}`);

// Reset when needed
ai.reset();
```

## Multi-Model Tracker

Track costs across multiple models in a single tracker instance.

```typescript
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { createTracker, formatCost } from "ai-sdk-cost-calculator";

const tracker = createTracker({
  onCost: (model, cost) => {
    console.log(`[${model}] Cost: ${formatCost(cost.totalCost)}`);
  },
});

// Use with onFinish callback
await generateText({
  model: openai("gpt-4o"),
  prompt: "Hello!",
  onFinish: tracker.onFinish("gpt-4o"),
});

await generateText({
  model: anthropic("claude-sonnet-4-5"),
  prompt: "Hello!",
  onFinish: tracker.onFinish("claude-sonnet-4-5", ({ cost, text }) => {
    console.log(`Response: ${text}, Cost: ${formatCost(cost.totalCost)}`);
  }),
});

// Or add usage manually
tracker.add("gpt-4o", result.usage, { webSearchRequests: 5 });

// Get per-model costs
for (const summary of tracker.getAllCosts()) {
  console.log(`${summary.model}: ${formatCost(summary.cost.totalCost)}`);
}

// Get total cost across all models
console.log(`Total: ${formatCost(tracker.getTotal().totalCost)}`);
console.log(`Requests: ${tracker.getTotalRequestCount()}`);
console.log(`Models: ${tracker.getModels().join(", ")}`);

// Reset when needed
tracker.reset();
```

## Web Search Costs

Calculate costs including web search/grounding features.

```typescript
const cost = calculateCost({
  model: "gpt-4o",
  usage: result.usage,
  webSearchRequests: 10, // Number of web searches
});

console.log(cost.webSearchCost); // $0.10 for 10 searches
```

### Web Search Pricing by Provider

| Provider      | Model            | Cost per 1k searches | Notes                      |
| ------------- | ---------------- | -------------------- | -------------------------- |
| **OpenAI**    | GPT-4o, GPT-4.1  | $10                  | + tokens at model rate     |
| **OpenAI**    | GPT-4o-mini      | $10                  | + 8k tokens per search     |
| **Google**    | Gemini Flash     | $14                  | Grounding with Google      |
| **Google**    | Gemini Pro       | $35                  | Grounding with Google      |
| **xAI**       | Grok models      | $5                   | Web Search / X Search      |
| **Perplexity** | Sonar           | $5                   | Search-native              |
| **Perplexity** | Sonar Pro       | $6                   | Search-native              |

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
  webSearchRequests: 5,
});
```

#### Options

| Property            | Type                 | Required | Description                                                |
| ------------------- | -------------------- | -------- | ---------------------------------------------------------- |
| `model`             | `string`             | Yes      | Model identifier (e.g., `"gpt-4o"`, `"claude-sonnet-4-5"`) |
| `usage`             | `LanguageModelUsage` | Yes      | Token usage from AI SDK                                    |
| `customPricing`     | `ModelPricing`       | No       | Override default pricing                                   |
| `webSearchRequests` | `number`             | No       | Number of web search requests                              |

#### Return Value: `CostBreakdown`

| Property        | Type      | Description                                  |
| --------------- | --------- | -------------------------------------------- |
| `inputCost`     | `number`  | Cost for input tokens (excluding cache)      |
| `outputCost`    | `number`  | Cost for output tokens (excluding reasoning) |
| `cacheReadCost` | `number`  | Cost for cached input tokens                 |
| `cacheWriteCost`| `number`  | Cost for writing to cache                    |
| `reasoningCost` | `number`  | Cost for reasoning tokens                    |
| `webSearchCost` | `number`  | Cost for web search requests                 |
| `totalCost`     | `number`  | Sum of all costs                             |
| `currency`      | `"USD"`   | Always USD                                   |
| `isLongContext` | `boolean` | Whether long context pricing was applied     |

### `createTracker(options?)`

Create a multi-model cost tracker.

```typescript
import { createTracker } from "ai-sdk-cost-calculator";

const tracker = createTracker({
  customPricing: {
    "my-model": { inputPer1MTokens: 1, outputPer1MTokens: 2 },
  },
  onCost: (model, cost) => console.log(model, cost.totalCost),
});

// Methods
tracker.onFinish(model, callback?, options?);  // Create onFinish callback
tracker.add(model, usage, options?);           // Add usage, returns CostBreakdown
tracker.getModel(model);                       // Get ModelCostSummary for a model
tracker.getModels();                           // Get all tracked model names
tracker.getAllCosts();                         // Get all ModelCostSummary[]
tracker.getTotal();                            // Get total CostBreakdown
tracker.getTotalRequestCount();                // Get total request count
tracker.resetModel(model);                     // Reset specific model
tracker.reset();                               // Reset all
```

### `createCostTracker(options)`

Track cumulative costs for a single model.

```typescript
import { createCostTracker } from "ai-sdk-cost-calculator";

const tracker = createCostTracker({ model: "gpt-4o" });

tracker.addUsage(result1.usage);
tracker.addUsage(result2.usage);

console.log(tracker.getTotalCost().totalCost);
tracker.reset();
```

### `withCost(model, callback?, options?)`

Create an `onFinish` callback wrapper that adds cost calculation.

```typescript
import { withCost } from "ai-sdk-cost-calculator";

await generateText({
  model: openai("gpt-4o"),
  prompt: "Hello!",
  onFinish: withCost("gpt-4o", ({ cost, usage, text }) => {
    console.log(`Cost: $${cost.totalCost}`);
  }),
});
```

| Parameter  | Type                      | Required | Description                          |
| ---------- | ------------------------- | -------- | ------------------------------------ |
| `model`    | `LanguageModel \| string` | Yes      | Model ID or AI SDK model instance    |
| `callback` | `function`                | No       | Called with result + cost breakdown  |
| `options`  | `CostAwareOptions`        | No       | Custom pricing, web search, onCost   |

### `getCost(model, usage, options?)`

One-shot cost calculation from AI SDK result.

```typescript
import { getCost } from "ai-sdk-cost-calculator";

const result = await generateText({ model: openai("gpt-4o"), prompt: "Hello!" });
const cost = getCost("gpt-4o", result.usage);
// or: getCost(openai("gpt-4o"), result.usage)
```

| Parameter | Type                      | Required | Description                         |
| --------- | ------------------------- | -------- | ----------------------------------- |
| `model`   | `LanguageModel \| string` | Yes      | Model ID or AI SDK model instance   |
| `usage`   | `LanguageModelUsage`      | Yes      | Token usage from AI SDK             |
| `options` | `CostAwareOptions`        | No       | Custom pricing, web search, onCost  |

### `createCostAwareAI(options?)`

Create a cost-tracking helper for use across multiple AI SDK calls.

```typescript
import { createCostAwareAI } from "ai-sdk-cost-calculator";

const ai = createCostAwareAI({
  customPricing: { "my-model": { inputPer1MTokens: 1, outputPer1MTokens: 2 } },
  onCost: (model, cost, usage) => console.log(`[${model}] $${cost.totalCost}`),
});

// Use with onFinish
await generateText({
  model: openai("gpt-4o"),
  onFinish: ai.onFinish("gpt-4o"),
});

// Or calculate directly
const cost = ai.calculate("gpt-4o", result.usage);

// Methods
ai.onFinish(model, callback?, options?);  // Create onFinish callback
ai.calculate(model, usage, options?);     // Calculate and track cost
ai.getModel(model);                       // Get CostBreakdown for a model
ai.getModels();                           // Get all tracked model names
ai.getTotal();                            // Get total CostBreakdown
ai.getRequestCount();                     // Get total request count
ai.reset();                               // Reset all tracking
```

### `getModelId(model)`

Extract model ID from AI SDK model or string.

```typescript
import { getModelId } from "ai-sdk-cost-calculator";
import { openai } from "@ai-sdk/openai";

getModelId("gpt-4o");           // "gpt-4o"
getModelId(openai("gpt-4o"));   // "gpt-4o"
```

### `formatCost(cost, decimals?)`

Format a cost value as a currency string.

```typescript
formatCost(0.0015);      // "$0.001500"
formatCost(0.0015, 4);   // "$0.0015"
```

### `formatCostBreakdown(breakdown, decimals?)`

Format a full cost breakdown as a multi-line string.

```typescript
const output = formatCostBreakdown(cost);
// Input:        $0.002400
// Cache Read:   $0.000060
// Output:       $0.007500
// Web Search:   $0.050000
// Total:        $0.059960
```

### `calculateStreamCost(streamResult, options)`

Calculate cost from a streaming response.

```typescript
import { streamText } from "ai";
import { calculateStreamCost, formatCost } from "ai-sdk-cost-calculator";

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

### Perplexity (6 models)

- Sonar, Sonar Small
- Sonar Pro
- Sonar Reasoning, Sonar Reasoning Pro
- Sonar Deep Research

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
    inputPer1MTokens: 2.0,
    outputPer1MTokens: 8.0,
    cacheReadPer1MTokens: 1.0,
    webSearchPer1kRequests: 15,
  },
});
```

## TypeScript Types

```typescript
import type {
  // Core
  CostBreakdown,
  CalculateCostOptions,
  ModelPricing,
  ProviderPricing,
  Provider,
  // Single model tracker
  CostTracker,
  CreateCostTrackerOptions,
  StreamCostOptions,
  // Multi-model tracker
  MultiModelCostTracker,
  CreateMultiModelTrackerOptions,
  ModelCostSummary,
  AddUsageOptions,
  // AI SDK integration
  CostAwareAI,
  CreateCostAwareAIOptions,
  CostAwareOptions,
  ResultWithCost,
  FinishResultWithCost,
} from "ai-sdk-cost-calculator";
```

## Pricing Sources

Pricing data is sourced from official provider documentation:

- [OpenAI API Pricing](https://openai.com/api/pricing/)
- [Anthropic Claude Pricing](https://www.anthropic.com/pricing)
- [Google Gemini API Pricing](https://ai.google.dev/gemini-api/docs/pricing)
- [xAI Grok API](https://docs.x.ai/docs/models)
- [DeepSeek API Pricing](https://api-docs.deepseek.com/quick_start/pricing)
- [Perplexity API Pricing](https://docs.perplexity.ai/getting-started/pricing)

**Note**: Prices may change. Please verify current pricing with official sources for production use.

## License

MIT
