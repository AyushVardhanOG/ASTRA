from sqlalchemy.orm import Session

from app.db.models import Project, ChatMessage
from app.prompts.startup_chat import build_chat_prompt
from app.providers.gemini_provider import GeminiProvider

provider = GeminiProvider()


async def chat_with_project(
    db: Session,
    project_id: int,
    message: str,
):
    project = (
        db.query(Project)
        .filter(Project.id == project_id)
        .first()
    )

    if project is None:
        return None

    # Save user message
    user_message = ChatMessage(
        project_id=project_id,
        role="user",
        content=message,
    )

    db.add(user_message)
    db.commit()

    prompt = build_chat_prompt(
        project,
        message,
    )

    reply = await provider.generate(prompt)

    # Save assistant reply
    assistant_message = ChatMessage(
        project_id=project_id,
        role="assistant",
        content=reply,
    )

    db.add(assistant_message)
    db.commit()

    return reply


async def stream_chat_with_project(
    db: Session,
    project_id: int,
    message: str,
):
    project = (
        db.query(Project)
        .filter(Project.id == project_id)
        .first()
    )

    if project is None:
        return

    # Save user message
    user_message = ChatMessage(
        project_id=project_id,
        role="user",
        content=message,
    )

    db.add(user_message)
    db.commit()

    prompt = build_chat_prompt(
        project,
        message,
    )

    full_reply = ""

    async for chunk in provider.stream_generate(prompt):
        full_reply += chunk
        yield chunk

    # Save complete assistant response
    assistant_message = ChatMessage(
        project_id=project_id,
        role="assistant",
        content=full_reply,
    )

    db.add(assistant_message)
    db.commit()


async def get_chat_history(
    db: Session,
    project_id: int,
):
    project = (
        db.query(Project)
        .filter(Project.id == project_id)
        .first()
    )

    if project is None:
        return None

    return (
        db.query(ChatMessage)
        .filter(ChatMessage.project_id == project_id)
        .order_by(ChatMessage.created_at.asc())
        .all()
    )