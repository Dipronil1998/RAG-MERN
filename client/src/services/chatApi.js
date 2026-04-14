import API from "./api";

export const askQuestion = async (question) => {
  const res = await API.post("/chat", { question });
  return res.data;
};