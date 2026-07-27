from fastapi import APIRouter
from pydantic import BaseModel

from app.services.astra_service import AstraService


router = APIRouter(
    prefix="/astra",
    tags=["ASTRA"],
)

service = AstraService()


class PromptRequest(BaseModel):
    prompt: str


@router.post("/chat")
async def chat(request: PromptRequest):

    response = await service.chat(request.prompt)

    return {
        "response": response
    }