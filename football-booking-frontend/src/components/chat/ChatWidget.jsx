import { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "../../services/aiService";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! Ask me about pricing, availability, or the pitch's facilities." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  async function handleSend() {
    const trimmed = inputValue.trim();
    if (!trimmed || isSending) return;

    const priorMessages = messages;
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInputValue("");
    setIsSending(true);

    try {
      const reply = await sendChatMessage(trimmed, priorMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: error.message }]);
    } finally {
      setIsSending(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 1000 }}>
      {isOpen && (
        <div
          style={{
            width: "340px",
            height: "440px",
            background: "var(--color-surface)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-card-hover)",
            display: "flex",
            flexDirection: "column",
            marginBottom: "0.75rem",
            overflow: "hidden",
          }}
        >

          <div
            style={{
              background: "var(--color-primary)",
              color: "#fff",
              padding: "0.85rem 1rem",
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Pitch Assistant
            <span
              onClick={() => setIsOpen(false)}
              style={{ cursor: "pointer", fontSize: "1.1rem" }}
            >
              ✕
            </span>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  background: m.role === "user" ? "var(--color-accent)" : "var(--color-bg)",
                  color: m.role === "user" ? "var(--color-primary)" : "var(--color-text)",
                  padding: "0.6rem 0.9rem",
                  borderRadius: "var(--radius-md)",
                  maxWidth: "80%",
                  fontSize: "0.9rem",
                  fontFamily: "var(--font-body)",
                }}
              >
                {m.content}
              </div>
            ))}
            {isSending && (
              <div
                style={{
                  alignSelf: "flex-start",
                  background: "var(--color-bg)",
                  color: "var(--color-text-muted)",
                  padding: "0.6rem 0.9rem",
                  borderRadius: "var(--radius-md)",
                  maxWidth: "80%",
                  fontSize: "0.9rem",
                  fontFamily: "var(--font-body)",
                }}
              >
                Thinking…
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ display: "flex", borderTop: "1px solid var(--color-border)", padding: "0.6rem" }}>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question…"
              disabled={isSending}
              style={{
                flex: 1,
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                padding: "0.5rem 0.7rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                outline: "none",
              }}
            />
            <button
              onClick={handleSend}
              disabled={isSending}
              style={{
                marginLeft: "0.5rem",
                background: "var(--color-accent)",
                color: "var(--color-primary)",
                border: "none",
                borderRadius: "var(--radius-sm)",
                padding: "0.5rem 0.9rem",
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                cursor: isSending ? "not-allowed" : "pointer",
                opacity: isSending ? 0.6 : 1,
              }}
            >
              {isSending ? "…" : "Send"}
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "var(--color-primary)",
          color: "#fff",
          border: "none",
          fontSize: "1.4rem",
          cursor: "pointer",
          boxShadow: "var(--shadow-card-hover)",
        }}
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}