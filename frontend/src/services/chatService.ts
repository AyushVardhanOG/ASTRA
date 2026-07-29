const API = "http://127.0.0.1:8000";

import type {
  ChatRequest,
  ChatResponse,
  ChatMessage,
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

export async function streamMessage(
  request: ChatRequest,
  onChunk: (chunk: string) => void
): Promise<void> {
  const response = await fetch(`${API}/chat/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to stream response.");
  }

  if (!response.body) {
    throw new Error("Streaming is not supported.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();

    if (done) break;

    onChunk(
      decoder.decode(value, {
        stream: true,
      })
    );
  }
}

export async function getChatHistory(
  projectId: number
): Promise<ChatMessage[]> {
  const response = await fetch(
    `${API}/chat/history/${projectId}`
  );

  if (!response.ok) {
    throw new Error("Failed to load chat history.");
  }

  return response.json();
}