import ChatBox from "../components/Chat/ChatBox";
import InputBox from "../components/Chat/InputBox";
import { useChat } from "../hooks/useChat";

export default function ChatPage() {
  const { messages, sendMessage } = useChat();

  return (
    <div>
      <h2>Ask Questions</h2>
      <ChatBox messages={messages} />
      <InputBox onSend={sendMessage} />
    </div>
  );
}