import { describe, it, expect } from "vitest";
import { createMultiModelTracker } from "./tracker";
import type { ModelPricing } from "../pricing";

const testPricing: ModelPricing = {
  inputPer1MTokens: 1,
  outputPer1MTokens: 1,
  // $100 per 1,000 calls => $0.1 per call
  codeExecutionPer1kRequests: 100,
};

const zeroUsage = {
  inputTokens: 0,
  outputTokens: 0,
  totalTokens: 0,
  inputTokenDetails: { noCacheTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0 },
  outputTokenDetails: { textTokens: 0, reasoningTokens: 0 },
};

describe("createMultiModelTracker().onFinish — request auto-detection", () => {
  it("auto-detects xAI code execution tool calls and bills them", async () => {
    const tracker = createMultiModelTracker({
      customPricing: { "grok-test": testPricing },
    });

    const result = {
      usage: zeroUsage,
      toolCalls: [{ toolName: "code_execution" }],
    };

    let captured: { codeExecutionCost: number } | undefined;
    await tracker.onFinish("grok-test", ({ cost }) => {
      captured = cost;
    })(result);

    expect(captured?.codeExecutionCost).toBeGreaterThan(0);
  });
});
