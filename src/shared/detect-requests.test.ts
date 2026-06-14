import { describe, it, expect } from "vitest";
import { detectRequestsFromResult, type ResultWithToolCalls } from "./detect-requests";

function groundedResult(
  metadata: Record<string, unknown>,
  namespace: "google" | "googleVertex" | "vertex" = "google",
): ResultWithToolCalls {
  return {
    providerMetadata: {
      [namespace]: { groundingMetadata: metadata },
    },
  } as ResultWithToolCalls;
}

describe("detectRequestsFromResult — Google Search grounding billing", () => {
  const threeQueries = { webSearchQueries: ["a", "b", "c"] };

  it("Gemini 3 family is billed per individual search query", () => {
    const { webSearchRequests } = detectRequestsFromResult(groundedResult(threeQueries), {
      model: "gemini-3-pro-preview",
    });
    expect(webSearchRequests).toBe(3);
  });

  it("Gemini 3.x ids also count per query", () => {
    const { webSearchRequests } = detectRequestsFromResult(groundedResult(threeQueries), {
      model: "gemini-3.1-flash",
    });
    expect(webSearchRequests).toBe(3);
  });

  it("Gemini 2.5 family is billed once per grounded prompt regardless of query count", () => {
    const { webSearchRequests } = detectRequestsFromResult(groundedResult(threeQueries), {
      model: "gemini-2.5-flash",
    });
    expect(webSearchRequests).toBe(1);
  });

  it("Gemini 2.0 / 1.5 families are also per grounded prompt", () => {
    for (const model of ["gemini-2.0-flash", "gemini-1.5-pro"]) {
      const { webSearchRequests } = detectRequestsFromResult(groundedResult(threeQueries), { model });
      expect(webSearchRequests).toBe(1);
    }
  });

  it("counts a grounded prompt with no enumerated queries (2.5) via groundingChunks", () => {
    const { webSearchRequests } = detectRequestsFromResult(
      groundedResult({ groundingChunks: [{ web: { uri: "https://x" } }] }),
      { model: "gemini-2.5-flash" },
    );
    expect(webSearchRequests).toBe(1);
  });

  it("counts a Gemini 3 grounded prompt with no enumerated queries as one use", () => {
    const { webSearchRequests } = detectRequestsFromResult(
      groundedResult({ webSearchQueries: [], searchEntryPoint: { renderedContent: "<div/>" } }),
      { model: "gemini-3-pro" },
    );
    expect(webSearchRequests).toBe(1);
  });

  it("defaults to the conservative per-prompt count when model is omitted", () => {
    const { webSearchRequests } = detectRequestsFromResult(groundedResult(threeQueries));
    expect(webSearchRequests).toBe(1);
  });

  it("does not count web search when no grounding signal is present", () => {
    const { webSearchRequests } = detectRequestsFromResult(groundedResult({}), {
      model: "gemini-2.5-flash",
    });
    expect(webSearchRequests).toBe(0);
  });

  it("detects grounding under the Vertex `vertex` namespace (not `google`)", () => {
    const { webSearchRequests } = detectRequestsFromResult(
      groundedResult(threeQueries, "vertex"),
      { model: "gemini-2.5-pro" },
    );
    expect(webSearchRequests).toBe(1);
  });

  it("detects grounding under the Vertex `googleVertex` namespace", () => {
    const { webSearchRequests } = detectRequestsFromResult(
      groundedResult(threeQueries, "googleVertex"),
      { model: "gemini-3-pro" },
    );
    // Gemini 3 on Vertex is still billed per query
    expect(webSearchRequests).toBe(3);
  });
});
