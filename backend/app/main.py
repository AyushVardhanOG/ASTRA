from fastapi import FastAPI
from app.core.config import settings
from app.api.astra import router as astra_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI Powered Virtual CTO",
)

app.include_router(astra_router)


@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.APP_NAME} 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }