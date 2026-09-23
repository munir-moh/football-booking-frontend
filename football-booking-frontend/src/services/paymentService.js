import api from "./api";

export async function verifyPayment(reference) {
  try {
    const response = await api.get(`/api/payment/verify/${reference}`);
    return response.data;
  } catch (error) {
    const backendMessage = error.response?.data?.error;
    throw new Error(backendMessage || "Could not verify payment status.");
  }
}