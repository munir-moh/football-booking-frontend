import api from "./api";

export async function createBooking({ name, phone, date, startTime, hours }) {
  try {
    const response = await api.post("/api/book", {
      name,
      phone,
      date,
      start_time: startTime,
      hours,
    });

    const { booking, payment_details } = response.data;

    return {
      ...booking,
      payment: payment_details,
    };
  } catch (error) {
    const backendMessage = error.response?.data?.error;
    throw new Error(backendMessage || "Something went wrong while booking. Please try again.");
  }
}