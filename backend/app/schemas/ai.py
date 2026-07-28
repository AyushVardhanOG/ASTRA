from pydantic import BaseModel


class GeneratePlanRequest(BaseModel):
    project_id: int

    idea: str
    problem: str
    audience: str
    goal: str
    budget: str
    timeline: str


class GeneratePlanResponse(BaseModel):
    plan: str