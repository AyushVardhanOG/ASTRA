export interface ChatRequest {
  project_id: number;
  message: string;
}

export interface ChatResponse {
  reply: string;
}

export interface ChatMessage {
  id?: number;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
}