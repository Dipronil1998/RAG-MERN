import { getEmbedding } from "./embeddingService.js";
import { vectorSearch } from "./vectorService.js";
import { openai } from "../config/openai.js";
import Document from "../models/Document.js";

export const askQuestion = async (question) => {
  const queryEmbedding = await getEmbedding(question);

  const vectorDocs = await vectorSearch(queryEmbedding);

  const textDocs = await Document.find({
    text: { $regex: question, $options: "i" }
  }).limit(5);

  const docs = [...vectorDocs, ...textDocs];

  // ✅ safer filtering
  const THRESHOLD = 0.25;

  const filteredDocs = docs.filter(
    (d) => d.score && d.score >= THRESHOLD
  );

  if (!filteredDocs.length) {
    console.log("⚠️ Vector search weak, using text fallback...");

    const textDocs = await Document.find({
      text: { $regex: question, $options: "i" }
    }).limit(3);

    if (textDocs.length) {
      return textDocs.map(d => d.text).join("\n");
    }

    return "❌ No data found in database.";
  }

  const context = filteredDocs.map((d) => d.text).join("\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0,
    messages: [
      {
        role: "system",
        content:
          `
Format the answer in proper Markdown.

IMPORTANT:
- Always use line breaks between headings
- Add a blank line after each section
- Do NOT write everything in one line
- Use proper spacing

Example format:

## Heading

### Subheading

- Point 1
- Point 2
`,
      },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion: ${question}`,
      },
    ],
  });

  return response.choices[0].message.content.trim();
};