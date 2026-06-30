import qdrant from "../config/qdrant.js";

export const vectorSearch = async (embedding) => {
    const response = await qdrant.search("documents", {
        vector: embedding,
        limit: 5,
        with_payload: true,
    });

    return response;
};