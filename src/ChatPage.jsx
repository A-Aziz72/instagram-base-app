export default function ChatPage() {
  const chats = [
    { id: 1, user: "Maya", message: "Are you coming later?" },
    { id: 2, user: "Alex", message: "Sent you the file." },
    { id: 3, user: "Jordan", message: "That looks great 🔥" },
  ];

  return (
    <div>
      <h1>Chat</h1>

      {chats.map((chat) => (
        <div
          key={chat.id}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "12px 0",
          }}
        >
          <h3>{chat.user}</h3>
          <p>{chat.message}</p>
        </div>
      ))}
    </div>
  );
}
