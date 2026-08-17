import api from "./api";

// Fetches all bookings. Requires the admin password.
export async function getBookings(adminPassword) {
  try {
    const response = await api.get("/api/admin/bookings", {
      headers: { "X-ADMIN-PASSWORD": adminPassword },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Incorrect admin password.");
    }
    throw new Error("Could not load bookings. Please try again.");
  }
}

// Marks a booking as confirmed. Requires the admin password.
export async function confirmBooking(reference, adminPassword) {
  try {
    const response = await api.post(
      `/api/admin/confirm/${reference}`,
      {},
      { headers: { "X-ADMIN-PASSWORD": adminPassword } }
    );
    return response.data;
  } catch (error) {
    const backendMessage = error.response?.data?.error;
    throw new Error(backendMessage || "Could not confirm this booking.");
  }
}