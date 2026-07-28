from pydantic import BaseModel


class GeneratePlanRequest(BaseModel):
    idea: str
    problem: str
    audience: str
    goal: str
    budget: str
    timeline: str


class GeneratePlanResponse(BaseModel):
    plan: str