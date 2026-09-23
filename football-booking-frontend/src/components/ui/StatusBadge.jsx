export default function StatusBadge({ status }) {
  const styles = {
    Confirmed: { bg: "var(--color-success-bg)", color: "var(--color-success)" },
    Pending: { bg: "var(--color-pending-bg)", color: "var(--color-pending)" },
    Failed: { bg: "var(--color-error-bg)", color: "var(--color-error)" },
  };
  const s = styles[status] || styles.Pending;

  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.3rem 0.75rem",
        borderRadius: "999px",
        fontSize: "0.8rem",
        fontWeight: 700,
        background: s.bg,
        color: s.color,
      }}
    >
      {status}
    </span>
  );
}