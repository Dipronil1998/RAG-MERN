import { useState } from "react";
import { askQuestion } from "../services/chatApi";

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setIsLoading(true); 

    try {
      const res = await askQuestion(text);

      // 3. Add bot response
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: res.answer },
      ]);
    } catch (error) {
      console.error("Chat API Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading }; 
};