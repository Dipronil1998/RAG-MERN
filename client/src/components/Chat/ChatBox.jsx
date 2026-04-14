import { Bot, User, Loader2 } from "lucide-react";

export default function ChatBox({ messages, isLoading }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
      {messages.length === 0 && !isLoading ? (
        <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
          <Bot className="w-12 h-12 opacity-20" />
          <p className="text-sm font-medium">Ready to analyze your document...</p>
        </div>
      ) : (
        <>
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex items-end gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm
                ${msg.role === "user" ? "bg-indigo-600" : "bg-white border border-slate-200"}`}
              >
                {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-indigo-600" />}
              </div>

              <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.role === "user" 
                  ? "bg-indigo-600 text-white rounded-br-none" 
                  : "bg-white text-slate-700 border border-slate-100 rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))}

          {/* AI Thinking Loader */}
          {isLoading && (
            <div className="flex items-end gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                <Bot className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="bg-white border border-slate-100 px-4 py-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}