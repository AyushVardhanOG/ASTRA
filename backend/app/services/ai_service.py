from app.providers.gemini_provider import GeminiProvider
from app.prompts.business_plan import build_business_plan_prompt

provider = GeminiProvider()


async def generate_plan(data):
    prompt = build_business_plan_prompt(data)

    return await provider.generate(prompt)