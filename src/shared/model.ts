import type { LanguageModel } from "ai";

export function getModelId(model: LanguageModel | string): string {
  return typeof model === "string" ? model : model.modelId;
}
