from sqlalchemy.orm import Session

from app.db.models import Project


def get_projects(db: Session):
    return db.query(Project).all()


def create_project(db: Session, name: str):
    project = Project(
        name=name,
        status="Planning",
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return project