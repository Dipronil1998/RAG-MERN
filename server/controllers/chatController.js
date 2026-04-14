import { askQuestion } from "../services/ragService.js";

export const chat = async (req, res) => {
  try {
    const { question } = req.body;

    const answer = await askQuestion(question);

    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};