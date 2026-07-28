from sqlalchemy.orm import Session

from app.db.models import Project
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

    prompt = build_chat_prompt(
        project,
        message,
    )

    return await provider.generate(prompt)