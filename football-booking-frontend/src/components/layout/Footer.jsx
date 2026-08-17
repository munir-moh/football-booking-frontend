export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "2rem 1.5rem",
        color: "var(--color-text-muted)",
        fontSize: "0.82rem",
        borderTop: "1px solid var(--color-border)",
        marginTop: "2rem",
      }}
    >
      © {new Date().getFullYear()} Elite Football Pitch — Book your game, own the pitch.
    </footer>
  );
}