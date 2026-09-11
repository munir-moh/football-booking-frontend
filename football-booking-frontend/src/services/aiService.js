import api from "./api";

export async function sendChatMessage(message, history = []) {
  try {
    const response = await api.post("/api/ai/chat", { message, history });
    return response.data.reply;
  } catch (error) {
    const backendMessage = error.response?.data?.error;
    throw new Error(backendMessage || "Something went wrong talking to the assistant. Please try again.");
  }
}