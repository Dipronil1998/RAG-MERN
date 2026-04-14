export default function ChatBox({ messages }) {
  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i}>
          <b>{msg.role}:</b> {msg.text}
        </div>
      ))}
    </div>
  );
}