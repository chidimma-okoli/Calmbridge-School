from sqlalchemy import Column, Integer, String, Text

from database import Base


class LessonNote(Base):
    __tablename__ = "lesson_notes"

    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(Integer, nullable=False)
    subject = Column(String, nullable=False)
    topic = Column(String, nullable=False)
    content = Column(Text, nullable=False)