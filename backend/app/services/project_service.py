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