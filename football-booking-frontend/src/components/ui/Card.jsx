import { useState } from "react";

export default function Card({ children, style = {}, hoverable = false }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => hoverable && setHovered(false)}
      style={{
        background: "var(--color-surface)",
        borderRadius: "var(--radius-lg)",
        boxShadow: hovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
        transform: hovered ? "translateY(-2px)" : "none",
        transition: "all 0.2s ease",
        padding: "1.75rem",
        ...style,
      }}
    >
      {children}
    </div>
  );
}