import { useState, useRef } from "react";
import { uploadPDF } from "../../services/uploadApi";
import { 
  Upload, FileText, X, CheckCircle, AlertCircle, 
  Loader2, PartyPopper, MessageSquareShare, ArrowRight 
} from "lucide-react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const fileInputRef = useRef(null);

  // If using react-router-dom, you would use: const navigate = useNavigate();
  const navigateToChat = () => {
    window.location.href = "/chat"; // Standard redirect
  };

  const handleFileChange = (e) => {
    setUploadStatus("idle");
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
    setUploadStatus("idle");

    try {
      await uploadPDF(file);
      setUploadStatus("success");
      setFile(null); // Clear selection area
    } catch (error) {
      setUploadStatus("error");
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
      setUploadStatus("idle");
    }
  };

  return (
    <div className="min-h-[500px] flex items-center justify-center p-4 bg-slate-50/50">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] border border-slate-100 overflow-hidden">
        <div className="p-8">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Assets Upload</h2>
              <p className="text-sm text-slate-500">Prepare your docs for analysis</p>
            </div>
          </div>

          {/* SUCCESS STATE UI */}
          {uploadStatus === "success" && !file ? (
            <div className="space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-emerald-900">Upload Complete!</h3>
                <p className="text-sm text-emerald-700 mt-1">
                  Your PDF is processed and ready to answer your questions.
                </p>
              </div>

              {/* Navigation Options */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setUploadStatus("idle")}
                  className="py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload More
                </button>
                <button
                  onClick={navigateToChat}
                  className="py-3 px-4 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquareShare className="w-4 h-4" />
                  Start Chatting
                </button>
              </div>
            </div>
          ) : (
            /* UPLOAD ZONE / PREVIEW (Your existing logic) */
            <>
              {!file ? (
                <div
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current.click()}
                  className={`
                    border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer
                    ${isDragging ? "border-indigo-500 bg-indigo-50/50 scale-[1.02]" : "border-slate-200 hover:border-indigo-400 hover:bg-slate-50"}
                  `}
                >
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf" />
                  <FileText className="w-10 h-10 text-slate-300 mb-4" />
                  <p className="text-sm font-semibold text-slate-700">Drag & Drop PDF here</p>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center">
                  <FileText className="w-8 h-8 text-indigo-600 mr-3" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{file.name}</p>
                    <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button onClick={() => setFile(null)} className="text-slate-400 hover:text-red-500"><X /></button>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="w-full mt-8 py-4 rounded-2xl font-bold bg-slate-900 text-white hover:bg-indigo-600 disabled:bg-slate-100 disabled:text-slate-400 transition-all flex items-center justify-center gap-2"
              >
                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Upload"}
              </button>
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400">
           <div className="flex items-center gap-1 uppercase tracking-wider">
             <AlertCircle className="w-3 h-3" /> Secure Server
           </div>
           <button onClick={navigateToChat} className="text-indigo-600 flex items-center gap-1 hover:underline">
             Go to Chat <ArrowRight className="w-3 h-3" />
           </button>
        </div>
      </div>
    </div>
  );
}