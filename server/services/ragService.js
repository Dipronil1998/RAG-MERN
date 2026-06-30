import { getEmbedding } from "./embeddingService.js";
import { vectorSearch } from "./vectorService.js";
import { openai } from "../config/openai.js";

export const askQuestion = async (question) => {
    // Generate embedding for the question
    const queryEmbedding = await getEmbedding(question);

    // Search similar vectors in Qdrant
    const results = await vectorSearch(queryEmbedding);

    if (!results.length) {
        return "❌ No relevant information found.";
    }

    // Extract chunk text from Qdrant payload
    const context = results
        .map((item) => item.payload.text)
        .join("\n\n");

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0,
        messages: [
            {
                role: "system",
                content: `
You are a helpful AI assistant.

Answer ONLY using the provided context.

If the answer is not present in the context, reply:

"I couldn't find that information in the uploaded documents."

Format the answer in Markdown.
`,
            },
            {
                role: "user",
                content: `Context:\n${context}\n\nQuestion:\n${question}`,
            },
        ],
    });

    return response.choices[0].message.content.trim();
};