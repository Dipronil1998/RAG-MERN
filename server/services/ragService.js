import { getEmbedding } from "./embeddingService.js";
import { vectorSearch } from "./vectorService.js";
import { openai } from "../config/openai.js";

export const askQuestion = async (question) => {
  const queryEmbedding = await getEmbedding(question);
  let docs = await vectorSearch(queryEmbedding);

  if (!docs.length) {
    const textDocs = await Document.find({
      text: { $regex: question, $options: "i" }
    }).limit(3);

    if (textDocs.length) {
      return textDocs.map(d => d.text).join("\n");
    }
    return "❌ No data found in database.";
  }

  // ✅ safer filtering
  const THRESHOLD = 0.2;

  const filteredDocs = docs.filter(
    (d) => d.score && d.score >= THRESHOLD
  );

  // ✅ fallback if nothing passes threshold
  const finalDocs =
    filteredDocs.length > 0 ? filteredDocs : docs.slice(0, 3);

  const context = finalDocs.map((d) => d.text).join("\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0,
    messages: [
      {
        role: "system",
        content:
          "Answer using ONLY the provided context. If answer is not clearly present, say 'Not found in document'.",
      },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion: ${question}`,
      },
    ],
  });

  return response.choices[0].message.content;
};