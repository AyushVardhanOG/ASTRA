from fastapi import APIRouter

from app.schemas.business import BusinessIdeaRequest
from app.schemas.ai import (
    GeneratePlanRequest,
    GeneratePlanResponse,
)

from app.services.astra_service import AstraService
from app.services.ai_service import generate_plan

router = APIRouter(
    prefix="/astra",
    tags=["ASTRA"],
)

service = AstraService()


@router.post("/analyse")
async def analyse(request: BusinessIdeaRequest):
    result = await service.analyse_business(request)

    return {
        "analysis": result
    }


@router.post(
    "/generate-plan",
    response_model=GeneratePlanResponse,
)
async def create_plan(
    request: GeneratePlanRequest,
):
    plan = await generate_plan(request)

    return GeneratePlanResponse(
        plan=plan,
    )