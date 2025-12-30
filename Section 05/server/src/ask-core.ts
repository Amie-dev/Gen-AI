import { createChatMode } from "./lc-model";
import { AskResult, AskResultSchema } from "./schema";

export async function askStructured(query: string): Promise<AskResult> {
  const { model } = createChatMode();

  const system = "You are a concise assistant. Respond strictly in JSON.";
  const user = `Summarize for a beginner:\n"${query}"\nReturn fields: summary (short paragraph), confidence (0..1)`;

  // Wrap the model with structured output
  const structer = model.withStructuredOutput(AskResultSchema);

  const result = await structer.invoke([
    { role: "system", content: system },
    { role: "user", content: user },
  ]);

  return result; // <-- critical
}
