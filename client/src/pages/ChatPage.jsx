import { useChat } from "../hooks/useChat";
import ChatBox from "../components/Chat/ChatBox";
import InputBox from "../components/Chat/InputBox";

export default function ChatPage() {
  const { messages, sendMessage } = useChat();

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-2xl h-[700px] flex flex-col bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">Ask Questions</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">AI Online</span>
            </div>
          </div>
        </div>

        <ChatBox messages={messages} />
        <InputBox onSend={sendMessage} />
      </div>
    </div>
  );
}