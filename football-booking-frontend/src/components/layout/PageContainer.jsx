export default function PageContainer({ children, wide = false }) {
  return (
    <main
      style={{
        maxWidth: wide ? "960px" : "480px",
        margin: "0 auto",
        padding: "2rem 1.25rem",
        minHeight: "70vh",
      }}
    >
      {children}
    </main>
  );
}