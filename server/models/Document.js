import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  text: String,
  embedding: [Number],
  fileId: mongoose.Schema.Types.ObjectId,
});

export default mongoose.model("Document", documentSchema);