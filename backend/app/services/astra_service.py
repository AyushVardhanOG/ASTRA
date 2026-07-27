from app.services.orchestrator import AstraOrchestrator


class AstraService:

    def __init__(self):
        self.orchestrator = AstraOrchestrator()

    async def analyse_business(self, request):
        return await self.orchestrator.analyse_business(request)