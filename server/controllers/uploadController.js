import File from "../models/File.js";
import Document from "../models/Document.js";
import { extractTextFromPDF } from "../services/pdfService.js";
import { chunkText } from "../services/chunkService.js";
import { getEmbedding } from "../services/embeddingService.js";
import { generateFileHash } from "../utils/hash.js";

export const uploadPDF = async (req, res) => {
    try {
        const filePath = req.file.path;

        const hash = generateFileHash(filePath);

        const existing = await File.findOne({ fileHash: hash });
        if (existing) {
            return res.json({ message: "File already uploaded" });
        }

        const text = await extractTextFromPDF(filePath);
        const chunks = chunkText(text);

        const fileDoc = await File.create({
            fileName: req.file.originalname,
            fileHash: hash,
        });

        for (const chunk of chunks) {
            const embedding = await getEmbedding(chunk);

            await Document.create({
                text: chunk,
                embedding,
                fileId: fileDoc._id,
            });
        }

        res.json({ message: "Upload successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};