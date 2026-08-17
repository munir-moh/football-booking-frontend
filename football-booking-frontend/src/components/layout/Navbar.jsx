import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "var(--color-primary)",
        padding: "1.1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "var(--color-accent)",
            display: "inline-block",
          }}
        />
        <span
          style={{
            color: "#fff",
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: "1.15rem",
            letterSpacing: "-0.01em",
          }}
        >
          Elite Football Pitch
        </span>
      </Link>
      <Link
        to="/admin"
        style={{
          color: "var(--color-accent)",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "0.88rem",
          padding: "0.5rem 1rem",
          border: "1.5px solid rgba(232, 161, 61, 0.4)",
          borderRadius: "var(--radius-sm)",
        }}
      >
        Admin
      </Link>
    </nav>
  );
}