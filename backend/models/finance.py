from sqlalchemy import Column, Integer, Float, String

from database import Base


class Finance(Base):
    __tablename__ = "finance"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, nullable=False)
    fee_type = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    amount_paid = Column(Float, nullable=False, default=0)
    session = Column(String, nullable=False)
    term = Column(String, nullable=False)
    status = Column(String, nullable=False, default="pending")