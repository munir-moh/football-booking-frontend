import { useState, useEffect } from "react";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";
import StatusBadge from "../components/ui/StatusBadge";
import { useAdminAuth } from "../context/AdminAuthContext";
import { getBookings, confirmBooking, deleteBooking } from "../services/adminService";

export default function AdminDashboardPage() {
  const { adminPassword, logout } = useAdminAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmingRef, setConfirmingRef] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [deletingRef, setDeletingRef] = useState(null);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    setLoading(true);
    setError("");
    try {
      const data = await getBookings(adminPassword);
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirm(reference) {
    setConfirmingRef(reference);
    try {
      await confirmBooking(reference, adminPassword);
      setBookings((prev) =>
        prev.map((b) => (b.reference === reference ? { ...b, status: "Confirmed" } : b))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setConfirmingRef(null);
    }
  }

  async function handleDelete(reference) {
    const confirmed = window.confirm(
      `Are you sure you want to delete booking ${reference}? This cannot be undone, and the slot will become available again.`
    );
    if (!confirmed) return;

    setDeletingRef(reference);
    try {
      await deleteBooking(reference, adminPassword);
      setBookings((prev) => prev.filter((b) => b.reference !== reference));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingRef(null);
    }
  }

  const pendingCount = bookings.filter((b) => b.status === "Pending").length;
  const confirmedCount = bookings.filter((b) => b.status === "Confirmed").length;
  const failedCount = bookings.filter((b) => b.status === "Failed").length;

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const normalizedPhoneSearch = normalizedSearch.replace(/\D/g, "");
  const filteredBookings = normalizedSearch
    ? bookings.filter((booking) => {
        const matchesText = [booking.reference, booking.email].some((value) =>
          String(value || "").toLowerCase().includes(normalizedSearch)
        );
        const phone = String(booking.phone || "");
        const matchesPhone =
          phone.toLowerCase().includes(normalizedSearch) ||
          (normalizedPhoneSearch.length > 0 &&
            phone.replace(/\D/g, "").includes(normalizedPhoneSearch));

        return matchesText || matchesPhone;
      })
    : bookings;

  const statusPriority = { Confirmed: 0, Pending: 1, Failed: 2 };
  const visibleBookings = [...filteredBookings].sort(
    (a, b) => statusPriority[a.status] - statusPriority[b.status]
  );

  return (
    <>
      <div
        style={{
          background: "var(--gradient-hero)",
          padding: "2rem 2rem 5rem",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "1.5rem", color: "#fff", margin: "0 0 0.25rem" }}>Bookings Dashboard</h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", margin: 0 }}>
              {loading
                ? "Loading…"
                : `${bookings.length} total · ${confirmedCount} confirmed · ${pendingCount} pending${failedCount > 0 ? ` · ${failedCount} failed` : ""}`}
            </p>
          </div>
          <Button variant="ghost-light" onClick={logout}>
            Log Out
          </Button>
        </div>
      </div>

      <PageContainer wide>
        <div style={{ marginTop: "-3.5rem", position: "relative", zIndex: 2 }}>
          {error && <Alert type="error">{error}</Alert>}

          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="booking-search"
              style={{
                display: "block",
                marginBottom: "0.4rem",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "var(--color-text)",
              }}
            >
              Search bookings
            </label>
            <input
              id="booking-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Phone number, email or reference code"
              autoComplete="off"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "0.7rem 0.9rem",
                borderRadius: "var(--radius-sm)",
                border: "1.5px solid var(--color-border)",
                fontSize: "16px",
                fontFamily: "var(--font-body)",
              }}
            />
            {normalizedSearch && !loading && (
              <p role="status" style={{ color: "var(--color-text-muted)", fontSize: "0.82rem", margin: "0.4rem 0 0" }}>
                {filteredBookings.length} {filteredBookings.length === 1 ? "booking" : "bookings"} found
              </p>
            )}
          </div>

          <Card style={{ padding: 0, overflow: "hidden" }}>
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center", padding: "3.5rem" }}>
                <Spinner />
              </div>
            ) : bookings.length === 0 ? (
              <EmptyState message="No bookings yet." />
            ) : visibleBookings.length === 0 ? (
              <EmptyState message="No bookings match your search." />
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table
                  className="responsive-table"
                  style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}
                >
                  <thead>
                    <tr
                      style={{
                        textAlign: "left",
                        background: "var(--color-bg)",
                        borderBottom: "2px solid var(--color-border)",
                      }}
                    >
                      <th style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.03em", color: "var(--color-text-muted)" }}>Reference</th>
                      <th style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.03em", color: "var(--color-text-muted)" }}>Name</th>
                      <th style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.03em", color: "var(--color-text-muted)" }}>Phone</th>
                      <th style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.03em", color: "var(--color-text-muted)" }}>Email</th>
                      <th style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.03em", color: "var(--color-text-muted)" }}>Date</th>
                      <th style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.03em", color: "var(--color-text-muted)" }}>Time</th>
                      <th style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.03em", color: "var(--color-text-muted)" }}>Price</th>
                      <th style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.03em", color: "var(--color-text-muted)" }}>Status</th>
                      <th style={{ padding: "0.85rem 1rem" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleBookings.map((b) => (
                      <tr
                        key={b.reference}
                        onMouseEnter={() => setHoveredRow(b.reference)}
                        onMouseLeave={() => setHoveredRow(null)}
                        style={{
                          borderBottom: "1px solid var(--color-border)",
                          background: hoveredRow === b.reference ? "var(--color-bg)" : "transparent",
                          transition: "background 0.15s ease",
                        }}
                      >
                        <td data-label="Reference" style={{ padding: "0.85rem 1rem", fontWeight: 600 }}>
                          {b.reference}
                        </td>
                        <td data-label="Name" style={{ padding: "0.85rem 1rem" }}>
                          {b.name}
                        </td>
                        <td data-label="Phone" style={{ padding: "0.85rem 1rem" }}>
                          {b.phone}
                        </td>
                        <td data-label="Email" style={{ padding: "0.85rem 1rem" }}>
                          {b.email}
                        </td>
                        <td data-label="Date" style={{ padding: "0.85rem 1rem" }}>
                          {b.date}
                        </td>
                        <td data-label="Time" style={{ padding: "0.85rem 1rem" }}>
                          {b.time}
                        </td>
                        <td data-label="Price" style={{ padding: "0.85rem 1rem" }}>
                          ₦{Number(b.price).toLocaleString()}
                        </td>
                        <td data-label="Status" style={{ padding: "0.85rem 1rem" }}>
                          <StatusBadge status={b.status} />
                        </td>
                        <td data-label="" style={{ padding: "0.85rem 1rem", display: "flex", gap: "0.5rem" }}>
                          {b.status === "Pending" && (
                            <Button
                              variant="secondary"
                              loading={confirmingRef === b.reference}
                              disabled={confirmingRef === b.reference || deletingRef === b.reference}
                              onClick={() => handleConfirm(b.reference)}
                            >
                              Confirm
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            loading={deletingRef === b.reference}
                            disabled={confirmingRef === b.reference || deletingRef === b.reference}
                            onClick={() => handleDelete(b.reference)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </PageContainer>
    </>
  );
}
