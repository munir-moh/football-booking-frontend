import api from "./api";

export async function createBooking({ name, phone, email, date, startTime, hours }) {
  try {
    const response = await api.post("/api/book", {
      name,
      phone,
      email,
      date,
      start_time: startTime,
      hours,
    });

    const { booking, payment } = response.data;

    return {
      ...booking,
      payment,
    };
  } catch (error) {
    const backendMessage = error.response?.data?.error;
    throw new Error(backendMessage || "Something went wrong while booking. Please try again.");
  }
}