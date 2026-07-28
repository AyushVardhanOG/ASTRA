export interface ChatRequest {
  project_id: number;
  message: string;
}

export interface ChatResponse {
  reply: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}