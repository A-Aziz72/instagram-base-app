import { useEffect, useState } from "react";
import { ref, push, set, onValue } from "firebase/database";
import { database } from "./firebase.jsx";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = ref(database, "messages");

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const messagesArray = Object.keys(data).map((key) => ({
          id: key,
          text: data[key].text,
          createdAt: data[key].createdAt,
        }));

        setMessages(messagesArray);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  function sendMessage(event) {
    event.preventDefault();

    if (message.trim() === "") {
      return;
    }

    const messagesRef = ref(database, "messages");
    const newMessageRef = push(messagesRef);

    set(newMessageRef, {
      text: message,
      createdAt: new Date().toISOString(),
    });

    setMessage("");
  }

  return (
    <div className="app">
      <div className="chat-box">
        <h1>Tamkeengram Chat</h1>

        <div className="messages">
          {messages.map((msg) => (
            <div className="message" key={msg.id}>
              <p>{msg.text}</p>
              <span>{new Date(msg.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="form">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
