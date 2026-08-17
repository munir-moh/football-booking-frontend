export default function StatusBadge({ status }) {
  const isConfirmed = status === "Confirmed";

  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.3rem 0.75rem",
        borderRadius: "999px",
        fontSize: "0.8rem",
        fontWeight: 700,
        background: isConfirmed ? "var(--color-success-bg)" : "var(--color-pending-bg)",
        color: isConfirmed ? "var(--color-success)" : "var(--color-pending)",
      }}
    >
      {status}
    </span>
  );
}