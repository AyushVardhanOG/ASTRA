from app.agents.business_agent import BusinessAgent


class AstraOrchestrator:

    def __init__(self):
        self.business_agent = BusinessAgent()

    async def analyse_business(self, request):
        return await self.business_agent.analyse(
            request.idea,
            request.target_users,
            request.budget,
            request.timeline,
            request.team_size,
        )