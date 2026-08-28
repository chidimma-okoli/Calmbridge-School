from pydantic import BaseModel, ConfigDict
from datetime import datetime


class PaymentCreate(BaseModel):
    student_id: int
    finance_id: int
    amount: float
    payment_method: str
    reference: str


class PaymentResponse(BaseModel):
    id: int
    student_id: int
    finance_id: int
    amount: float
    payment_method: str
    reference: str
    payment_date: datetime

    model_config = ConfigDict(from_attributes=True)