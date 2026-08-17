export default function Button({
  children,
  variant = "primary", // "primary" | "secondary" | "ghost"
  loading = false,
  disabled = false,
  type = "button",
  onClick,
}) {
  const base = {
    padding: "0.75rem 1.5rem",
    borderRadius: "var(--radius-md)",
    fontFamily: "var(--font-heading)",
    fontWeight: 600,
    fontSize: "0.95rem",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    border: "2px solid transparent",
    transition: "all 0.15s ease",
    opacity: disabled ? 0.6 : 1,
  };

  const variants = {
    primary: {
      background: "var(--color-accent)",
      color: "var(--color-primary)",
    },
    secondary: {
      background: "var(--color-primary)",
      color: "#fff",
    },
    ghost: {
      background: "transparent",
      color: "var(--color-primary)",
      borderColor: "var(--color-border)",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{ ...base, ...variants[variant] }}
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}