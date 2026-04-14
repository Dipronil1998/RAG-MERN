import { getEmbedding } from "./embeddingService.js";
import { vectorSearch } from "./vectorService.js";
import { openai } from "../config/openai.js";

export const askQuestion = async (question) => {
  const queryEmbedding = await getEmbedding(question);

  const docs = await vectorSearch(queryEmbedding);

  const context = docs.map((d) => d.text).join("\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Answer only from the given context",
      },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion: ${question}`,
      },
    ],
  });

  return response.choices[0].message.content;
};