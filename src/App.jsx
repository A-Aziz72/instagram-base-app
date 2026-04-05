import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AuthForm from "./AuthForm";
import NewsFeed from "./NewsFeed";
import PostPage from "./PostPage";
import ChatPage from "./ChatPage"; // ✅ ADD THIS
import posts from "./posts";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-logo">Instagram Routes</h1>

        <nav className="app-nav">
          <Link to="/" className="app-link">
            Home
          </Link>

          {/* ✅ NEW CHAT LINK */}
          <Link to="/chat" className="app-link">
            Chat
          </Link>

          <Link to="/authform" className="app-link">
            Auth Form
          </Link>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<NewsFeed posts={posts} />} />

          {/* ✅ NEW CHAT ROUTE */}
          <Route path="/chat" element={<ChatPage />} />

          <Route path="/authform" element={<AuthForm />} />

          <Route path="/posts/:postId" element={<PostPage posts={posts} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
