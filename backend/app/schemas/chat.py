from datetime import datetime
from pydantic import BaseModel


class ChatRequest(BaseModel):
    project_id: int
    message: str


class ChatResponse(BaseModel):
    reply: str


class ChatMessageResponse(BaseModel):
    id: int
    role: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True