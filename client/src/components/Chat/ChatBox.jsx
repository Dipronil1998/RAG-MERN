import { useEffect, useRef } from "react";
import { Bot, User, Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ChatBox({ messages, isLoading }) {
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when messages change or loading starts
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 scroll-smooth"
    >
      {messages.length === 0 && !isLoading ? (
        <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <Bot className="w-10 h-10 text-indigo-500 opacity-40" />
          </div>
          <p className="text-sm font-semibold tracking-wide uppercase opacity-50">Ready to analyze</p>
        </div>
      ) : (
        <>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm
                ${msg.role === "user" ? "bg-indigo-600" : "bg-white border border-slate-200"}`}
              >
                {msg.role === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-indigo-600" />
                )}
              </div>

              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                }`}
              >
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-2">{children}</p>,
                    h2: ({ children }) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-md font-semibold mb-2">{children}</h3>,
                    ul: ({ children }) => <ul className="list-disc ml-5 mb-2">{children}</ul>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    code: ({ inline, children }) =>
                      inline ? (
                        <code className="bg-slate-100 px-1 rounded text-xs">{children}</code>
                      ) : (
                        <pre className="bg-slate-900 text-white p-3 rounded-lg overflow-x-auto text-xs">
                          <code>{children}</code>
                        </pre>
                      ),
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {/* Polished Thinking State */}
          {isLoading && (
            <div className="flex items-end gap-3 animate-in fade-in duration-500">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
              </div>
              <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                  </div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">
                    Thinking
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}