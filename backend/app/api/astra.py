from fastapi import APIRouter

router = APIRouter(prefix="/astra", tags=["ASTRA"])


@router.get("/")
async def home():
    return {
        "message": "ASTRA API is ready 🚀"
    }