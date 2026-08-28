from sqlalchemy import Column, Integer

from database import Base


class ParentStudent(Base):
    __tablename__ = "parent_students"

    id = Column(Integer, primary_key=True, index=True)
    parent_id = Column(Integer, nullable=False)
    student_id = Column(Integer, nullable=False)