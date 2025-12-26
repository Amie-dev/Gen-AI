import { loadEnv } from "./env";

loadEnv()
type Provider = "opinai" | "gemini" | "grok";

type HelloOutPut = {
  ok: true;
  provider: Provider;
  model: string;
  message: string;
};

type GeminiGenerateContent = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

type OpenAIChatCompletion = {
  choices?: Array<{ message?: { content?: string } }>;
};

// Gemini
export async function helleGemini(): Promise<HelloOutPut> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("Google API key missing");

  const model = "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Say a short hello and who am i ?" }] }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini ${response.status}: ${await response.text()}`);
  }

  const json = (await response.json()) as GeminiGenerateContent;
  const text =
    json?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Hello as default";

  return { ok: true, provider: "gemini", model, message: String(text).trim() };
}

/*

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function main() {
    loadEnv()
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
  console.log(response)
}

main();

*/

// Groq
export async function helloGrok(): Promise<HelloOutPut> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ API key missing");

  const model = "llama-3.1-8b-instant";
  const url = `https://api.groq.com/openai/v1/chat/completions`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: "Say a short hello and who are ypou" }],
      temperature: 0,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq ${response.status}: ${await response.text()}`);
  }

  const json = (await response.json()) as OpenAIChatCompletion;
  const text = json?.choices?.[0]?.message?.content ?? "Hello as default";

  return { ok: true, provider: "grok", model, message: String(text).trim() };
}

// OpenAI
export async function helloOpenAI(): Promise<HelloOutPut> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI API key missing");

  const model = "gpt-4o-mini"; // use a valid OpenAI model
  const url = `https://api.openai.com/v1/chat/completions`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: "Say a short hello" }],
      temperature: 0,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI ${response.status}: ${await response.text()}`);
  }

  const json = (await response.json()) as OpenAIChatCompletion;
  const text = json?.choices?.[0]?.message?.content ?? "Hello as default";

  return { ok: true, provider: "opinai", model, message: String(text).trim() };
}

// Selector
export async function selectHello(): Promise<HelloOutPut> {
  const forced = (process.env.PROVIDER || "").toLowerCase();

  const tryProvider = async (fn: () => Promise<HelloOutPut>, name: string) => {
    try {
      return await fn();
    } catch (err) {
      console.warn(`${name} failed:`, err instanceof Error ? err.message : String(err));
      return null;
    }
  };

  // forced provider first
  if (forced === "gemini") {
    const result = await tryProvider(helleGemini, "Gemini");
    if (result) return result;
  }
  if (forced === "grok") {
    const result = await tryProvider(helloGrok, "Groq");
    if (result) return result;
  }
  if (forced === "opinai") {
    const result = await tryProvider(helloOpenAI, "OpenAI");
    if (result) return result;
  }

  // fallback order if forced fails
  for (const fn of [helloGrok, helloOpenAI]) {
    const result = await tryProvider(fn, fn.name);
    if (result) return result;
  }

  throw new Error("All providers failed. Check API keys and quotas.");
}
