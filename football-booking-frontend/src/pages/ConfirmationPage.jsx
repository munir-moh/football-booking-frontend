import { useLocation, Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";

function Row({ label, value, bold = false }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0.65rem 0",
        borderBottom: "1px solid var(--color-border)",
        fontSize: bold ? "1rem" : "0.92rem",
      }}
    >
      <span style={{ color: "var(--color-text-muted)", fontWeight: bold ? 600 : 400 }}>{label}</span>
      <span style={{ fontWeight: bold ? 700 : 600 }}>{value}</span>
    </div>
  );
}

function TopBand({ children }) {
  return (
    <div
      className="pitch-lines"
      style={{
        background: "var(--gradient-hero)",
        padding: "3rem 1.5rem 2.5rem",
        textAlign: "center",
        color: "#fff",
      }}
    >
      {children}
    </div>
  );
}

export default function ConfirmationPage() {
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <>
        <TopBand>
          <h1 style={{ fontSize: "1.6rem", color: "#fff", margin: 0 }}>No Booking Found</h1>
        </TopBand>
        <PageContainer>
          <div style={{ marginTop: "-3rem" }}>
            <Card style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
                It looks like you navigated here directly. Please make a booking first.
              </p>
              <Link to="/">
                <Button>Back to Booking</Button>
              </Link>
            </Card>
          </div>
        </PageContainer>
      </>
    );
  }

  const payment = booking.payment || {};

  return (
    <>
      <TopBand>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "rgba(232, 161, 61, 0.15)",
            color: "var(--color-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.6rem",
            margin: "0 auto 0.75rem",
            border: "2px solid rgba(232, 161, 61, 0.4)",
          }}
        >
          ✓
        </div>
        <h1 style={{ fontSize: "1.7rem", color: "#fff", margin: "0 0 0.4rem" }}>Booking Confirmed!</h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem" }}>
          Booking created successfully.
        </p>
      </TopBand>

      <PageContainer>
        <div style={{ marginTop: "-3rem", position: "relative", zIndex: 2 }}>

          <Card style={{ marginBottom: "1.25rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <h3 style={{ margin: 0 }}>Booking Details</h3>
              <StatusBadge status={booking.status || "Pending"} />
            </div>
            <Row label="Name" value={booking.name} />
            <Row label="Phone" value={booking.phone} />
            <Row label="Date" value={booking.date} />
            <Row label="Time" value={booking.time} />
            <Row label="Duration" value={`${booking.hours} hour(s)`} />
            <Row label="Total Amount" value={`₦${Number(booking.price).toLocaleString()}`} bold />
          </Card>

          <Card
            style={{
              marginBottom: "1.25rem",
              background: "var(--color-error-bg)",
              border: "1.5px solid rgba(194, 52, 52, 0.3)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.9rem" }}>
              <span style={{ fontSize: "1.1rem" }}>⚠️</span>
              <h3 style={{ margin: 0, color: "var(--color-error)", fontSize: "1rem" }}>
                Important: Payment Reference
              </h3>
            </div>
            <div
              style={{
                background: "var(--color-surface)",
                borderRadius: "var(--radius-sm)",
                padding: "1rem",
                textAlign: "center",
                marginBottom: "0.9rem",
              }}
            >
              <p style={{ margin: "0 0 0.4rem", fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                Your Payment Reference
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  color: "var(--color-error)",
                  letterSpacing: "0.02em",
                }}
              >
                {booking.reference}
              </p>
            </div>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--color-error)" }}>
              You MUST include this reference in your description/narration when making your payment. This helps us confirm your booking.
            </p>
          </Card>

          <Card style={{ marginBottom: "1.25rem" }}>
            <h3 style={{ marginBottom: "0.75rem" }}>Transfer Payment To</h3>
            <Row label="Bank" value={payment.bank} />
            <Row label="Account Name" value={payment.account_name} />
            <Row label="Account Number" value={payment.account_number} />
            <Row label="Amount" value={`₦${Number(booking.price).toLocaleString()}`} bold />
          </Card>

          <Card
            style={{
              marginBottom: "1.5rem",
              background: "var(--color-pending-bg)",
              border: "1.5px solid rgba(179, 118, 12, 0.25)",
            }}
          >
            <h3 style={{ marginBottom: "0.75rem", color: "var(--color-pending)", fontSize: "1rem" }}>
              Payment Instructions
            </h3>
            <ol style={{ margin: 0, paddingLeft: "1.2rem", color: "var(--color-pending)", fontSize: "0.88rem", lineHeight: 1.8 }}>
              <li>Transfer ₦{Number(booking.price).toLocaleString()} to the account above</li>
              <li>
                Use <strong>{booking.reference}</strong> as your payment description/narration
              </li>
              <li>Keep your transaction receipt</li>
              <li>Your booking will be confirmed once payment is received</li>
            </ol>
          </Card>

          <Link to="/" style={{ textDecoration: "none" }}>
            <Button fullWidth>Make Another Booking</Button>
          </Link>
        </div>
      </PageContainer>
    </>
  );
}