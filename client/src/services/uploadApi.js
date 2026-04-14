import API from "./api";

export const uploadPDF = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await API.post("/upload", formData);
  return res.data;
};