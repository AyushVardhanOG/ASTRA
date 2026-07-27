from pydantic import BaseModel


class AIPlanResponse(BaseModel):
    plan: str