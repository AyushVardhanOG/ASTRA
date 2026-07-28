from sqlalchemy.orm import Session

from app.db.models import Project, ProjectVersion


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

    # Update current workspace
    project.idea = idea
    project.problem = problem
    project.audience = audience
    project.goal = goal
    project.budget = budget
    project.timeline = timeline
    project.ai_report = ai_report

    latest_version = (
        db.query(ProjectVersion)
        .filter(ProjectVersion.project_id == project_id)
        .order_by(ProjectVersion.version_number.desc())
        .first()
    )

    next_version = (
        latest_version.version_number + 1
        if latest_version
        else 1
    )

    version = ProjectVersion(
        project_id=project_id,
        version_number=next_version,

        idea=idea,
        problem=problem,
        audience=audience,
        goal=goal,
        budget=budget,
        timeline=timeline,

        ai_report=ai_report,
    )

    db.add(version)

    db.commit()
    db.refresh(project)

    return project


def get_project_versions(
    db: Session,
    project_id: int,
):
    return (
        db.query(ProjectVersion)
        .filter(ProjectVersion.project_id == project_id)
        .order_by(ProjectVersion.version_number.desc())
        .all()
    )


def get_project_version(
    db: Session,
    version_id: int,
):
    return (
        db.query(ProjectVersion)
        .filter(ProjectVersion.id == version_id)
        .first()
    )


def restore_project_version(
    db: Session,
    version_id: int,
):
    version = get_project_version(db, version_id)

    if version is None:
        return None

    project = get_project(db, version.project_id)

    if project is None:
        return None

    project.idea = version.idea
    project.problem = version.problem
    project.audience = version.audience
    project.goal = version.goal
    project.budget = version.budget
    project.timeline = version.timeline
    project.ai_report = version.ai_report

    db.commit()
    db.refresh(project)

    return project