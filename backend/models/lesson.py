from sqlalchemy import Column, Integer, String, Text

from database import Base


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    teacher_id = Column(Integer, nullable=False)