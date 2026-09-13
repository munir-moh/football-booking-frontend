export default function Input({ label, error, ...inputProps }) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: "0.4rem",
            fontWeight: 600,
            fontSize: "0.9rem",
            color: "var(--color-text)",
          }}
        >
          {label}
        </label>
      )}
      <input
        {...inputProps}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "0.7rem 0.9rem",
          borderRadius: "var(--radius-sm)",
          border: `1.5px solid ${error ? "var(--color-error)" : "var(--color-border)"}`,
          fontSize: "16px",
          fontFamily: "var(--font-body)",
          outline: "none",
          appearance: "none",
          WebkitAppearance: "none",
        }}
      />
      {error && (
        <p style={{ color: "var(--color-error)", fontSize: "0.82rem", margin: "0.35rem 0 0" }}>
          {error}
        </p>
      )}
    </div>
  );
}