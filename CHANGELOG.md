# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-01-17

### Added

- Initial release
- Support for 5 providers: OpenAI, Anthropic, Google, xAI (Grok), DeepSeek
- 85+ model pricing configurations
- `calculateCost()` function for single request cost calculation
- `createCostTracker()` for tracking cumulative costs across multiple requests
- `calculateStreamCost()` for streaming response cost calculation
- `formatCost()` and `formatCostBreakdown()` formatting utilities
- Long context pricing support with automatic tier detection
- Prompt caching support (cache read/write pricing)
- Reasoning token pricing for o1/o3/R1 models
- Full TypeScript type definitions
- ESM and CommonJS builds

### Providers & Models

#### OpenAI (23 models)
- GPT-4o, GPT-4o-mini (with dated variants)
- GPT-4.1, GPT-4.1-mini, GPT-4.1-nano
- GPT-4 Turbo, GPT-4, GPT-4-32k
- GPT-3.5 Turbo
- o1, o1-mini, o1-pro, o1-preview
- o3, o3-mini, o3-pro
- o4-mini

#### Anthropic (23 models)
- Claude Opus 4.5, Sonnet 4.5, Haiku 4.5
- Claude Opus 4.1, Sonnet 4, Opus 4
- Claude 3.5 Sonnet, 3.5 Haiku
- Claude 3 Opus, 3 Sonnet, 3 Haiku
- All models include dated and date-less variants

#### Google Gemini (17 models)
- Gemini 3 Pro, 3 Flash (preview and stable)
- Gemini 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite
- Gemini 2.0 Flash, 2.0 Flash-Lite, 2.0 Flash-Exp
- Gemini 1.5 Pro, 1.5 Flash, 1.5 Flash-8B

#### xAI Grok (12 models)
- Grok 4, Grok 4-0709
- Grok 4 Fast (reasoning/non-reasoning)
- Grok 4.1 Fast (reasoning/non-reasoning)
- Grok Code Fast
- Grok 3, Grok 3-mini
- Grok 2, Grok 2 Vision
- Grok Beta (legacy)

#### DeepSeek (10 models)
- DeepSeek Chat (deepseek-chat, deepseek-v3, deepseek-v3.2, deepseek-v3.2-exp)
- DeepSeek Reasoner (deepseek-reasoner, deepseek-r1, deepseek-r1-0528)
- DeepSeek R1 Distill (llama-70b, qwen-32b)
- DeepSeek Coder
