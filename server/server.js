import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { initDocumentCollection } from "./collection/document.js";
import qdrant from "./config/qdrant.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Main server bootstrap function
const startServer = async () => {
  try {
    console.log("🚀 Starting server...");

    // 1. Connect MongoDB
    await connectDB();
    console.log("✅ MongoDB connected");

    // 2. Check Qdrant connection
    await qdrant.getCollections();
    console.log("✅ Qdrant connected");

    // 3. Initialize Qdrant collection
    await initDocumentCollection();

    // 4. Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();