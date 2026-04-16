import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("RAG AI Backend");
});

app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);

export default app;