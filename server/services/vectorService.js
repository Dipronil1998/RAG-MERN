import Document from "../models/Document.js";

export const vectorSearch = async (queryEmbedding) => {
  return await Document.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        queryVector: queryEmbedding,
        path: "embedding",
        numCandidates: 200,
        limit: 10,
      },
    },
    {
      $project: {
        text: 1,
        score: { $meta: "vectorSearchScore" }, // ✅ MUST
      },
    },
  ]);
};