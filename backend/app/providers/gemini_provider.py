from app.providers.base_provider import BaseAIProvider


class GeminiProvider(BaseAIProvider):

    async def generate(self, prompt: str):
        return "Gemini integration coming soon..."