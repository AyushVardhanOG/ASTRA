from sqlalchemy import Column, Integer, String, Text

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

    ai_report = Column(
        Text,
        nullable=True,
    )