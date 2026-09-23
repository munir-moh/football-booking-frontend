import { useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import { createBooking } from "../services/bookingService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DURATION_OPTIONS = [1, 2, 3, 4, 5];

export default function HomePage() {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    startTime: "",
    hours: 1,
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Please enter your full name.";
    const trimmedPhone = form.phone.trim();
    if (!trimmedPhone) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^\d{11}$/.test(trimmedPhone)) {
      newErrors.phone = "Phone number must be exactly 11 digits.";
    }
    const trimmedEmail = form.email.trim();
    if (!trimmedEmail) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.date) newErrors.date = "Please choose a date.";
    if (!form.startTime) newErrors.startTime = "Please choose a start time.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function formatDateForForm(date) {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function parseFormDate(dateStr) {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const booking = await createBooking(form);
      if (booking.payment?.authorization_url) {
        window.location.href = booking.payment.authorization_url;
      } else {
        setSubmitError("Could not start payment. Please try again.");
      }
    } catch (err) {
      setSubmitError(err.message);
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
          padding: "4rem 1.5rem 3rem",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "rgba(232, 161, 61, 0.15)",
            color: "var(--color-accent)",
            padding: "0.35rem 0.9rem",
            borderRadius: "999px",
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.03em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Instant Booking
        </span>
        <h1 style={{ fontSize: "2.1rem", color: "#fff", margin: "0 0 0.6rem", letterSpacing: "-0.02em" }}>
          Book Your Pitch,<br />Play Today
        </h1>
        <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: "380px", margin: "0 auto", fontSize: "0.95rem" }}>
          Reserve your slot in seconds. No calls, no waiting, just pick a time and play.
        </p>
      </div>

      <PageContainer>
        <div style={{ marginTop: "-3.5rem" }}>
          <Card style={{ position: "relative", zIndex: 2 }}>
            <form onSubmit={handleSubmit}>
              {submitError && <Alert type="error">{submitError}</Alert>}

              <Input
                label="Full Name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name}
                placeholder="e.g. Munir Mohammed"
              />
              <Input
                label="Phone Number"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, "").slice(0, 11))}
                error={errors.phone}
                placeholder="e.g. 08123456789"
                inputMode="numeric"
              />
              <Input
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
                placeholder="e.g. munir@example.com"
              />

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600, fontSize: "0.9rem", color: "var(--color-text)" }}>
                  Date
                </label>
                <DatePicker
                  selected={parseFormDate(form.date)}
                  onChange={(date) => handleChange("date", formatDateForForm(date))}
                  minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                  className="custom-datepicker-input"
                />
                {errors.date && (
                  <p style={{ color: "var(--color-error)", fontSize: "0.82rem", margin: "0.35rem 0 0" }}>
                    {errors.date}
                  </p>
                )}
              </div>

              <Input
                label="Start Time"
                type="time"
                step="1800"
                value={form.startTime}
                onChange={(e) => handleChange("startTime", e.target.value)}
                error={errors.startTime}
              />

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600, fontSize: "0.9rem" }}>
                  Duration (hours)
                </label>
                <select
                  value={form.hours}
                  onChange={(e) => handleChange("hours", Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.9rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1.5px solid var(--color-border)",
                    fontSize: "16px",
                  }}
                >
                  {DURATION_OPTIONS.map((h) => (
                    <option key={h} value={h}>
                      {h} {h === 1 ? "hour" : "hours"} — ₦{(h * 10000).toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <Button type="submit" loading={loading} disabled={loading} fullWidth>
                Book Now
              </Button>
            </form>
          </Card>
        </div>
      </PageContainer>
    </>
  );
}