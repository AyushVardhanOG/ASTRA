from app.prompts.business_prompt import BUSINESS_DISCOVERY_PROMPT
from app.providers.gemini_provider import GeminiProvider


class BusinessAgent:

    def __init__(self):
        self.provider = GeminiProvider()

    async def analyse(
        self,
        idea,
        target_users,
        budget,
        timeline,
        team_size,
    ):

        prompt = BUSINESS_DISCOVERY_PROMPT.format(
            idea=idea,
            target_users=target_users,
            budget=budget,
            timeline=timeline,
            team_size=team_size,
        )

        return await self.provider.generate(prompt)