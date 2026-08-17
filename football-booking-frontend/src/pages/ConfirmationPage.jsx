import { useLocation, Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";

function Row({ label, value }) {
  return (
    <div 
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0.65rem 0",
        borderBottom: "1px solid var(--color-border)",
        fontSize: "0.92rem",
      }}
    >
      <span style={{ color: "var(--color-text-muted)" }}>{label}</span>
      <span style={{ fontWeight: 600 }}>{value}</span>
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
        <h1 style={{ fontSize: "1.7rem", color: "#fff", margin: "0 0 0.4rem" }}>Booking Received</h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem" }}>
          Complete payment to secure your slot.
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
            <Row label="Reference" value={booking.reference} />
            <Row label="Name" value={booking.name} />
            <Row label="Date" value={booking.date} />
            <Row label="Time" value={booking.time} />
            <Row label="Duration" value={`${booking.hours} ${booking.hours === 1 ? "hour" : "hours"}`} />
            <Row label="Price" value={`₦${Number(booking.price).toLocaleString()}`} />
          </Card>

          <Card>
            <h3 style={{ marginBottom: "0.75rem" }}>Payment Details</h3>
            <Row label="Bank Name" value={payment.bank} />
            <Row label="Account Name" value={payment.account_name} />
            <Row label="Account Number" value={payment.account_number} />
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginTop: "1rem" }}>
              Please transfer the exact amount and keep your reference number for confirmation.
            </p>
          </Card>

          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="ghost">Make Another Booking</Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    </>
  );
}