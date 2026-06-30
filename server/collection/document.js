import qdrant from "../config/qdrant.js";

export const initDocumentCollection = async () => {
    try {
        const collections = await qdrant.getCollections();

        const exists = collections.collections.find(
            (c) => c.name === "documents"
        );

        if (!exists) {
            await qdrant.createCollection("documents", {
                vectors: {
                    size: 1536,
                    distance: "Cosine",
                },
            });

            console.log("📦 Qdrant collection 'documents' created");
        } else {
            console.log("📦 Qdrant collection 'documents' already exists");
        }

    } catch (error) {
        console.error("❌ Failed to init Qdrant collection:", error.message);
    }
};