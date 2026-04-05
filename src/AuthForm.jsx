import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import "./styles.css";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    alert("Signed in successfully!");
    navigate("/");
  };

  return (
    <div className="auth-form">
      <div className="auth-card">
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="auth-input"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="auth-input"
          />

          <button type="submit" className="auth-button">
            Submit
          </button>
        </form>

        <p>
          <Link to="/" className="app-link">
            Back to News Feed
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
