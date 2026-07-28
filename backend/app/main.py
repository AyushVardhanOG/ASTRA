from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.session import Base, engine
from app.db import models

from app.api.astra import router as astra_router
from app.api.projects import router as project_router

from app.api.chat import router as chat_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI Powered Virtual CTO",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(astra_router)
app.include_router(project_router)
app.include_router(chat_router)