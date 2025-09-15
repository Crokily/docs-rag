import { OpenAI, OpenAIEmbedding } from "@llamaindex/openai";
import { GeminiEmbedding, Gemini, GEMINI_MODEL, GEMINI_EMBEDDING_MODEL } from "@llamaindex/google";
import { Settings } from "llamaindex";

export function initSettings() {
  Settings.llm = new OpenAI({
    model: process.env.MODEL ?? "gpt-4o-mini",
    maxTokens: process.env.LLM_MAX_TOKENS
      ? Number(process.env.LLM_MAX_TOKENS)
      : undefined,
    temperature: 0.1,
  });
  // Settings.llm = new Gemini({
  //   model: GEMINI_MODEL.GEMINI_2_5_FLASH_LITE,
  //   temperature: 0.1,
  // });
  Settings.embedModel = new OpenAIEmbedding({
    model: process.env.EMBEDDING_MODEL,
    dimensions: process.env.EMBEDDING_DIM
      ? parseInt(process.env.EMBEDDING_DIM)
      : undefined,
  });
  // Settings.embedModel = new GeminiEmbedding({
  //   model: GEMINI_EMBEDDING_MODEL.EMBEDDING_001,
  // });
}
