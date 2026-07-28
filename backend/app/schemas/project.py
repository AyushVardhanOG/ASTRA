from pydantic import BaseModel


class ProjectCreate(BaseModel):
    name: str


class ProjectResponse(BaseModel):
    id: int
    name: str
    status: str

    idea: str | None = None
    problem: str | None = None
    audience: str | None = None
    goal: str | None = None
    budget: str | None = None
    timeline: str | None = None

    ai_report: str | None = None

    class Config:
        from_attributes = True