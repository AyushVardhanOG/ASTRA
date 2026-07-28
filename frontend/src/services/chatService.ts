const API = "http://127.0.0.1:8000";

import type {
  ChatRequest,
  ChatResponse,
} from "../types/chat";

export async function sendMessage(
  request: ChatRequest
): Promise<ChatResponse> {
  const response = await fetch(`${API}/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to send message.");
  }

  return response.json();
}