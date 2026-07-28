from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
)

from app.services.chat_service import (
    chat_with_project,
    stream_chat_with_project,
)

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"],
)


@router.post(
    "/",
    response_model=ChatResponse,
)
async def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
):
    reply = await chat_with_project(
        db=db,
        project_id=request.project_id,
        message=request.message,
    )

    if reply is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return ChatResponse(
        reply=reply,
    )


@router.post("/stream")
async def stream_chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
):
    generator = stream_chat_with_project(
        db=db,
        project_id=request.project_id,
        message=request.message,
    )

    if generator is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return StreamingResponse(
        generator,
        media_type="text/plain",
    )