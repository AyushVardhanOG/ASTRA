from app.providers.gemini_provider import GeminiProvider


provider = GeminiProvider()


class AIService:

    async def generate_plan(self, project_name: str) -> str:
        prompt = f"""
You are ASTRA AI.

You are an experienced startup CTO.

Generate a complete startup blueprint.

Project:
{project_name}

Return the following sections:

# Vision

# Problem

# Target Users

# Competitor Analysis

# MVP Features

# Tech Stack

# Database Design

# API Endpoints

# Timeline

# Risks

# Monetization
"""

        return await provider.generate(prompt)


ai_service = AIService()