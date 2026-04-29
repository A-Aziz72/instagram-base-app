import { useEffect, useState } from "react";
import { ref, push, set, onValue } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { database, auth } from "./firebase.jsx";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [user, setUser] = useState(null);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const messagesRef = ref(database, "messages");

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const messagesArray = Object.keys(data).map((key) => ({
          id: key,
          text: data[key].text,
          createdAt: data[key].createdAt,
          author: data[key].author,
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

    if (!user) {
      alert("Please login first.");
      return;
    }

    if (message.trim() === "") {
      return;
    }

    const messagesRef = ref(database, "messages");
    const newMessageRef = push(messagesRef);

    set(newMessageRef, {
      text: message,
      createdAt: new Date().toISOString(),
      author: user.email,
    });

    setMessage("");
  }

  async function handleSignUp(event) {
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowAuthForm(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowAuthForm(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className="app">
      <div className="chat-box">
        <div className="navbar">
          <h1>Tamkeengram Chat</h1>

          {user ? (
            <div>
              <p className="user-email">{user.email}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button onClick={() => setShowAuthForm(!showAuthForm)}>
              Create Account or Sign In
            </button>
          )}
        </div>

        {showAuthForm && !user && (
          <form className="auth-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <div className="auth-buttons">
              <button onClick={handleLogin}>Login</button>
              <button onClick={handleSignUp}>Sign Up</button>
            </div>
          </form>
        )}

        <div className="messages">
          {messages.map((msg) => (
            <div className="message" key={msg.id}>
              <strong>{msg.author || "Unknown user"}</strong>
              <p>{msg.text}</p>
              <span>{new Date(msg.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>

        {user ? (
          <form onSubmit={sendMessage} className="form">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />

            <button type="submit">Send</button>
          </form>
        ) : (
          <p className="login-message">Login to send a message.</p>
        )}
      </div>
    </div>
  );
}

export default App;
