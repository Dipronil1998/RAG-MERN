import { useState, useRef } from "react";
import { uploadPDF } from "../../services/uploadApi";
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please select a PDF file");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    try {
      const res = await uploadPDF(file);
      // Replace with a toast notification in a real app
      console.log(res.message);
      setFile(null);
    } catch (error) {
      console.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  // Drag and drop handlers
  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") setFile(droppedFile);
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4 bg-slate-50/50">
      {/* Main Card */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] border border-slate-100 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Assets Upload</h2>
              <p className="text-sm text-slate-500">Sync your PDF documents to the cloud</p>
            </div>
          </div>

          {/* Upload Zone */}
          {!file ? (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current.click()}
              className={`
                relative group cursor-pointer
                border-2 border-dashed rounded-2xl p-10
                flex flex-col items-center justify-center
                transition-all duration-300 ease-in-out
                ${isDragging 
                  ? "border-indigo-500 bg-indigo-50/50 scale-[1.02]" 
                  : "border-slate-200 hover:border-indigo-400 hover:bg-slate-50"}
              `}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange} 
                className="hidden" 
                accept=".pdf" 
              />
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                <FileText className="w-8 h-8 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </div>
              <p className="text-sm font-semibold text-slate-700">Click to browse or drag file</p>
              <p className="text-xs text-slate-400 mt-2 font-medium">PDF (max. 10MB)</p>
            </div>
          ) : (
            /* File Preview Case */
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 flex items-center animate-in fade-in zoom-in duration-300">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button 
                onClick={() => setFile(null)}
                className="ml-2 p-2 hover:bg-white rounded-lg text-slate-400 hover:text-red-500 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className={`
              w-full mt-8 py-4 px-6 rounded-2xl font-bold text-[15px]
              transition-all duration-300 flex items-center justify-center gap-2
              ${!file || isUploading
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-200 active:scale-95"}
            `}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Upload Document
                <CheckCircle className={`w-5 h-5 ${!file ? 'opacity-20' : 'opacity-100'}`} />
              </>
            )}
          </button>
        </div>

        {/* Footer info */}
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center text-xs text-slate-400 gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            Encrypted End-to-End
          </div>
          <span className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">v1.0.4</span>
        </div>
      </div>
    </div>
  );
}