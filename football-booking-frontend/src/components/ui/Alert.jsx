export default function Alert({ type = "error", children }) {
  const styles = {
    error: { bg: "var(--color-error-bg)", color: "var(--color-error)" },
    success: { bg: "var(--color-success-bg)", color: "var(--color-success)" },
    pending: { bg: "var(--color-pending-bg)", color: "var(--color-pending)" },
  };
  const s = styles[type];

  return (
    <div
      style={{
        background: s.bg,
        color: s.color,
        padding: "0.85rem 1rem",
        borderRadius: "var(--radius-sm)",
        fontSize: "0.9rem",
        fontWeight: 500,
        marginBottom: "1rem",
      }}
    >
      {children}
    </div>
  );
}