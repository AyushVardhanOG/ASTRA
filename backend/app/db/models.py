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

    ai_report = Column(
        Text,
        nullable=True,
    )