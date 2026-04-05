import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "16px",
        padding: "16px",
        borderBottom: "1px solid #ddd",
        marginBottom: "20px",
      }}
    >
      <NavLink
        to="/"
        style={({ isActive }) => ({
          textDecoration: "none",
          fontWeight: isActive ? "bold" : "normal",
          color: "black",
        })}
      >
        News Feed
      </NavLink>

      <NavLink
        to="/chat"
        style={({ isActive }) => ({
          textDecoration: "none",
          fontWeight: isActive ? "bold" : "normal",
          color: "black",
        })}
      >
        Chat
      </NavLink>
    </nav>
  );
}
