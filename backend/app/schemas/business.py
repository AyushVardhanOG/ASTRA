from pydantic import BaseModel


class BusinessIdeaRequest(BaseModel):
    idea: str
    target_users: str
    budget: str
    timeline: str
    team_size: int