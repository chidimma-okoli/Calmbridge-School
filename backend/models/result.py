from sqlalchemy import Column, Integer, String, Float

from database import Base


class Result(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, nullable=False)
    subject = Column(String, nullable=False)
    score = Column(Float, nullable=False)
    grade = Column(String, nullable=False)
    term = Column(String, nullable=False)
    session = Column(String, nullable=False)