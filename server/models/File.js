import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  fileName: String,
  fileHash: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("File", fileSchema);