from fastapi import APIRouter

from app.schemas.business import BusinessIdeaRequest
from app.services.astra_service import AstraService

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