import fs from "fs";
import pdf from "pdf-parse-fork";

export const extractTextFromPDF = async (filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);
    
    // The fork fixes the internal 'new' keyword issue 
    // and exports the function correctly for ESM
    const data = await pdf(buffer);
    
    return data.text;
  } catch (error) {
    console.error("PDF Extraction Error:", error);
    throw error;
  }
};