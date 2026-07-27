from app.providers.gemini_provider import GeminiProvider


class AstraService:

    def __init__(self):
        self.provider = GeminiProvider()

    async def chat(self, prompt: str):
        return await self.provider.generate(prompt)