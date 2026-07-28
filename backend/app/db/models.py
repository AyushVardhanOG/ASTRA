from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.session import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    status = Column(
        String,
        default="Planning",
    )

    idea = Column(Text, nullable=True)

    problem = Column(Text, nullable=True)

    audience = Column(Text, nullable=True)

    goal = Column(Text, nullable=True)

    budget = Column(String, nullable=True)

    timeline = Column(String, nullable=True)

    # Keeps the latest report for quick loading
    ai_report = Column(Text, nullable=True)

    versions = relationship(
        "ProjectVersion",
        back_populates="project",
        cascade="all, delete-orphan",
        order_by="ProjectVersion.version_number.desc()",
    )


class ProjectVersion(Base):
    __tablename__ = "project_versions"

    id = Column(Integer, primary_key=True, index=True)

    project_id = Column(
        Integer,
        ForeignKey("projects.id"),
        nullable=False,
    )

    version_number = Column(Integer, nullable=False)

    idea = Column(Text, nullable=True)
    problem = Column(Text, nullable=True)
    audience = Column(Text, nullable=True)
    goal = Column(Text, nullable=True)
    budget = Column(String, nullable=True)
    timeline = Column(String, nullable=True)

    ai_report = Column(Text, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    project = relationship(
        "Project",
        back_populates="versions",
    )