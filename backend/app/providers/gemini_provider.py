import asyncio
import google.generativeai as genai

from app.core.config import settings
from app.providers.base_provider import BaseAIProvider


class GeminiProvider(BaseAIProvider):

    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)

        self.model = genai.GenerativeModel(
            "gemini-2.5-flash"
        )

    async def generate(self, prompt: str) -> str:
        response = await asyncio.to_thread(
            self.model.generate_content,
            prompt
        )

        return response.text