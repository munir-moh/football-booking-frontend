import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import { useAdminAuth } from "../context/AdminAuthContext";
import { getBookings } from "../services/adminService";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Please enter the admin password.");
      return;
    }

    setLoading(true);
    try {
      await getBookings(password);
      login(password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className="pitch-lines"
        style={{
          background: "var(--gradient-hero)",
          padding: "3rem 1.5rem 2.5rem",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h1 style={{ fontSize: "1.6rem", color: "#fff", margin: "0 0 0.4rem" }}>Admin Login</h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem" }}>
          Enter the admin password to continue.
        </p>
      </div>

      <PageContainer>
        <div style={{ marginTop: "-3rem", position: "relative", zIndex: 2 }}>
          <Card>
            <form onSubmit={handleSubmit}>
              {error && <Alert type="error">{error}</Alert>}
              <Input
                label="Admin Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <Button type="submit" loading={loading} disabled={loading} fullWidth>
                Log In
              </Button>
            </form>
          </Card>
        </div>
      </PageContainer>
    </>
  );
}