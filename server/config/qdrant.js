import { QdrantClient } from "@qdrant/js-client-rest";

const qdrant = new QdrantClient({
    url: process.env.QDRANT_URL,
});

const checkConnection = async () => {
    try {
        await qdrant.getCollections();

        console.log("✅ Qdrant connected successfully");
    } catch (error) {
        console.error("❌ Qdrant connection failed:", error.message);
    }
};

checkConnection();

export default qdrant;