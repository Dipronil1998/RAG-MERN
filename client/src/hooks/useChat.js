import { useState } from "react";
import { askQuestion } from "../services/chatApi";

export const useChat = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (text) => {
    setMessages((prev) => [...prev, { role: "user", text }]);

    const res = await askQuestion(text);

    setMessages((prev) => [
      ...prev,
      { role: "bot", text: res.answer },
    ]);
  };

  return { messages, sendMessage };
};