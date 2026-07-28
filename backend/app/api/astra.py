from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.business import BusinessIdeaRequest
from app.schemas.ai import (
    GeneratePlanRequest,
    GeneratePlanResponse,
)

from app.services.astra_service import AstraService
from app.services.ai_service import generate_plan
from app.services.project_service import save_ai_report

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
    db: Session = Depends(get_db),
):
    plan = await generate_plan(request)

    save_ai_report(
        db,
        request.project_id,
        plan,
    )

    return GeneratePlanResponse(
        plan=plan,
    )