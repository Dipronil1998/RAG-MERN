import { useState } from "react";
import { SendHorizontal, Loader2 } from "lucide-react";

export default function InputBox({ onSend, isLoading }) {
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    // Prevent sending if empty OR if already loading
    if (!input.trim() || isLoading) return;
    
    onSend(input);
    setInput("");
  };

  return (
    <div className="p-4 bg-white border-t border-slate-100">
      <form 
        onSubmit={handleSend}
        className={`relative flex items-center border rounded-2xl px-4 py-2 transition-all duration-200 
          ${isLoading 
            ? "bg-slate-100 border-slate-100 cursor-not-allowed" 
            : "bg-slate-50 border-slate-200 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500"
          }`}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder={isLoading ? "AI is generating..." : "Type your message..."}
          className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 text-slate-700 placeholder:text-slate-400 disabled:text-slate-400"
        />
        
        <button 
          type="submit"
          disabled={!input.trim() || isLoading}
          className={`ml-2 p-2 rounded-xl transition-all shadow-lg flex items-center justify-center min-w-[40px] min-h-[40px]
            ${!input.trim() || isLoading
              ? "bg-slate-200 text-slate-400 shadow-none cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-indigo-100"
            }`}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <SendHorizontal className="w-5 h-5" />
          )}
        </button>
      </form>
      
      <p className="text-[10px] text-center text-slate-400 mt-2 font-medium uppercase tracking-tighter">
        {isLoading ? "Please wait for the response" : "Press Enter to send"}
      </p>
    </div>
  );
}