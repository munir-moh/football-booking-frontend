import { useEffect, useRef, useState } from "react";

const BOOKING_STEPS = [
  "Enter your name, phone number, and email, then choose a date, start time, and duration.",
  "Select Book Now and complete payment through the Paystack checkout page.",
  "Your booking is confirmed after Paystack verifies successful payment.",
];

const BOOKING_RULES = [
  "The pitch is open from 7:00 AM to 11:00 PM. Your session must finish by closing time.",
  "The booking form offers durations from 1 to 5 hours.",
  "Bookings must be made at least 1 hour before the start time.",
  "Start times are available on the hour or half-hour.",
  "Customer self-service cancellations are not available in the app. Contact the pitch to request a cancellation.",
];

export default function BookingInfoButton({ phoneNumber }) {
  const [isOpen, setIsOpen] = useState(false);
  const launcherRef = useRef(null);
  const closeButtonRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) {
        launcherRef.current?.focus();
        wasOpenRef.current = false;
      }
      return undefined;
    }

    wasOpenRef.current = true;
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        aria-label="Open booking process, pitch rules and contact information"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        title="Booking information"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "1.5rem",
          zIndex: 1000,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "var(--color-primary)",
          color: "#fff",
          border: "none",
          fontSize: "1.45rem",
          cursor: "pointer",
          boxShadow: "var(--shadow-card-hover)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <span aria-hidden="true" style={{ filter: "brightness(0) invert(1)" }}>📝</span>
      </button>

      {isOpen && (
        <div
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            background: "rgba(10, 24, 18, 0.62)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-info-title"
            style={{
              width: "min(460px, 100%)",
              maxHeight: "min(720px, 90vh)",
              overflowY: "auto",
              background: "var(--color-surface)",
              color: "var(--color-text)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "0 16px 48px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "1rem",
                padding: "1.2rem 1.25rem 1rem",
                background: "var(--color-surface)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <div>
                <h2 id="booking-info-title" style={{ margin: 0, fontSize: "1.15rem" }}>
                  Booking information
                </h2>
                <p style={{ margin: "0.25rem 0 0", color: "var(--color-text-muted)", fontSize: "0.88rem" }}>
                  Process, pitch rules, and contact details
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close booking information"
                onClick={() => setIsOpen(false)}
                style={{
                  flex: "0 0 auto",
                  width: "36px",
                  height: "36px",
                  border: "none",
                  borderRadius: "50%",
                  background: "var(--color-bg)",
                  color: "var(--color-primary)",
                  fontSize: "1.4rem",
                  lineHeight: 1,
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
              <section aria-labelledby="booking-steps-title" style={{ marginBottom: "1.2rem" }}>
                <h3 id="booking-steps-title" style={{ fontSize: "0.98rem", marginBottom: "0.55rem" }}>
                  How booking works
                </h3>
                <ol style={{ margin: 0, paddingLeft: "1.25rem", lineHeight: 1.55 }}>
                  {BOOKING_STEPS.map((step) => (
                    <li key={step} style={{ paddingLeft: "0.2rem", marginBottom: "0.45rem" }}>
                      {step}
                    </li>
                  ))}
                </ol>
              </section>

              <section aria-labelledby="pitch-rules-title" style={{ marginBottom: "1.2rem" }}>
                <h3 id="pitch-rules-title" style={{ fontSize: "0.98rem", marginBottom: "0.55rem" }}>
                  Pitch rules
                </h3>
                <ul style={{ margin: 0, paddingLeft: "1.25rem", lineHeight: 1.55 }}>
                  {BOOKING_RULES.map((rule) => (
                    <li key={rule} style={{ paddingLeft: "0.2rem", marginBottom: "0.45rem" }}>
                      {rule}
                    </li>
                  ))}
                </ul>
              </section>

              {phoneNumber && (
                <section aria-labelledby="pitch-contact-title">
                  <h3 id="pitch-contact-title" style={{ fontSize: "0.98rem", marginBottom: "0.55rem" }}>
                    Contact the pitch
                  </h3>
                  <p style={{ margin: 0, fontWeight: 700, color: "var(--color-primary)" }}>
                    {phoneNumber}
                  </p>
                </section>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
