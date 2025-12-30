import { loadEnv } from "./env";
import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";

loadEnv();

export type Provider = "openai" | "gemini" | "groq";

export function createChatMode(): { provider: Provider; model: any } {
  const forced = (process.env.PROVIDER || "").toLowerCase();
  const hasOpenai = !!process.env.OPENAI_API_KEY;
  const hasGemini = !!process.env.GOOGLE_API_KEY;
  const hasGroq = !!process.env.GROQ_API_KEY;

  const base = { temperature: 0 as const };

  if (forced === "openai" || (!forced && hasOpenai)) {
    return {
      provider: "openai",
      model: new ChatOpenAI({
        ...base,
        model: "gpt-4o-mini",
      }),
    };
  }

  if (forced === "gemini" || (!forced && hasGemini)) {
    return {
      provider: "gemini",
      // Uncomment and configure once you add Gemini support
      model: new ChatGoogleGenerativeAI({
        ...base,
        model: "gemini-2.5-flash",
      }),
      //   model: null,
    };
  }

  if (forced === "groq" || (!forced && hasGroq)) {
    return {
      provider: "groq",
      // Uncomment and configure once you add Groq support
      model: new ChatGroq({
        ...base,
        model: "llama-3.1-8b-instant",
      }),
      //   model: null,
    };
  }
  
  throw new Error("No valid provider configured");
}
