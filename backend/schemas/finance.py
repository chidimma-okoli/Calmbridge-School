from pydantic import BaseModel, ConfigDict


class FinanceCreate(BaseModel):
    student_id: int
    fee_type: str
    amount: float
    amount_paid: float = 0
    session: str
    term: str
    status: str = "pending"


class FinanceResponse(BaseModel):
    id: int
    student_id: int
    fee_type: str
    amount: float
    amount_paid: float
    balance: float
    session: str
    term: str
    status: str

    model_config = ConfigDict(from_attributes=True)