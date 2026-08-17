export default function EmptyState({ message }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "3rem 1rem",
        color: "var(--color-text-muted)",
      }}
    >
      <p style={{ fontSize: "0.95rem" }}>{message}</p>
    </div>
  );
}