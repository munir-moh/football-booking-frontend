export default function Spinner() {
  return (
    <div
      style={{
        width: "22px",
        height: "22px",
        border: "3px solid var(--color-border)",
        borderTopColor: "var(--color-accent)",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }}
    />
  );
}