import { useState } from "react";
import { uploadPDF } from "../../services/uploadApi";

export default function UploadForm() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Select a file");

    const res = await uploadPDF(file);
    alert(res.message);
  };

  return (
    <div>
      <h2>Upload PDF</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}