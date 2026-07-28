from sqlalchemy.orm import Session

from app.db.models import Project


def get_projects(db: Session):
    return db.query(Project).all()


def get_project(db: Session, project_id: int):
    return (
        db.query(Project)
        .filter(Project.id == project_id)
        .first()
    )


def create_project(db: Session, name: str):
    project = Project(
        name=name,
        status="Planning",
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


def update_project_workspace(
    db: Session,
    project_id: int,
    idea: str,
    problem: str,
    audience: str,
    goal: str,
    budget: str,
    timeline: str,
    ai_report: str,
):
    project = get_project(db, project_id)

    if project is None:
        return None

    project.idea = idea
    project.problem = problem
    project.audience = audience
    project.goal = goal
    project.budget = budget
    project.timeline = timeline
    project.ai_report = ai_report

    db.commit()
    db.refresh(project)

    return project