from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime

from database import Base


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, nullable=False)
    finance_id = Column(Integer, nullable=False)
    amount = Column(Float, nullable=False)
    payment_method = Column(String, nullable=False)
    reference = Column(String, nullable=False, unique=True)
    payment_date = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )