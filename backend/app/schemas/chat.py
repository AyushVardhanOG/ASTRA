from pydantic import BaseModel


class ChatRequest(BaseModel):
    project_id: int
    message: str


class ChatResponse(BaseModel):
    reply: str