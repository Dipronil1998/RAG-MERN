import Document from "../models/Document.js";

export const vectorSearch = async (queryEmbedding) => {
  return await Document.aggregate([
    {
      $vectorSearch: {
        queryVector: queryEmbedding,
        path: "embedding",
        numCandidates: 100,
        limit: 5,
        index: "vector_index",
      },
    },
  ]);
};