import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import Alert from "../components/ui/Alert";
import Spinner from "../components/ui/Spinner";
import Button from "../components/ui/Button";
import { verifyPayment } from "../services/paymentService";

export default function PaymentCallbackPage() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");

  const [status, setStatus] = useState("checking"); // checking | Confirmed | Failed | error
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!reference) {
      setStatus("error");
      setErrorMessage("No payment reference found in the URL.");
      return;
    }

    verifyPayment(reference)
      .then((result) => setStatus(result.status))
      .catch((err) => {
        setStatus("error");
        setErrorMessage(err.message);
      });
  }, [reference]);

  return (
    <PageContainer>
      <Card style={{ maxWidth: "480px", margin: "3rem auto", textAlign: "center" }}>
        {status === "checking" && (
          <>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
              <Spinner />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)" }}>Confirming your payment…</h2>
            <p style={{ color: "var(--color-text-muted)" }}>This should only take a moment.</p>
          </>
        )}

        {status === "Confirmed" && (
          <>
            <h2 style={{ fontFamily: "var(--font-heading)" }}>Booking Confirmed!</h2>
            <Alert type="success">
              Your payment was successful and your slot is booked. Reference: {reference}
            </Alert>
            <Button variant="primary" onClick={() => (window.location.href = "/")}>
              Back to Home
            </Button>
          </>
        )}

        {status === "Failed" && (
          <>
            <h2 style={{ fontFamily: "var(--font-heading)" }}>Payment Not Completed</h2>
            <Alert type="error">
              Your payment wasn't completed, so this slot hasn't been booked. Reference: {reference}
            </Alert>
            <Button variant="primary" onClick={() => (window.location.href = "/")}>
              Try Again
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <h2 style={{ fontFamily: "var(--font-heading)" }}>Something Went Wrong</h2>
            <Alert type="error">{errorMessage}</Alert>
            <Link to="/">Return home</Link>
          </>
        )}
      </Card>
    </PageContainer>
  );
}