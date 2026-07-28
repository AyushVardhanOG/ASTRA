from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.project import (
    ProjectCreate,
    ProjectResponse,
    ProjectVersionResponse,
)

from app.services.project_service import (
    create_project,
    get_projects,
    get_project,
    get_project_versions,
    get_project_version,
    restore_project_version,
)

router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
)


@router.get(
    "/",
    response_model=list[ProjectResponse],
)
def read_projects(
    db: Session = Depends(get_db),
):
    return get_projects(db)


@router.get(
    "/{project_id}",
    response_model=ProjectResponse,
)
def read_project(
    project_id: int,
    db: Session = Depends(get_db),
):
    project = get_project(db, project_id)

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return project


@router.post(
    "/",
    response_model=ProjectResponse,
)
def add_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
):
    return create_project(
        db,
        project.name,
    )


# -----------------------------
# Version History
# -----------------------------


@router.get(
    "/{project_id}/versions",
    response_model=list[ProjectVersionResponse],
)
def read_project_versions(
    project_id: int,
    db: Session = Depends(get_db),
):
    return get_project_versions(
        db,
        project_id,
    )


@router.get(
    "/version/{version_id}",
    response_model=ProjectVersionResponse,
)
def read_project_version(
    version_id: int,
    db: Session = Depends(get_db),
):
    version = get_project_version(
        db,
        version_id,
    )

    if version is None:
        raise HTTPException(
            status_code=404,
            detail="Version not found",
        )

    return version


@router.post(
    "/version/{version_id}/restore",
    response_model=ProjectResponse,
)
def restore_version(
    version_id: int,
    db: Session = Depends(get_db),
):
    project = restore_project_version(
        db,
        version_id,
    )

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Version not found",
        )

    return project