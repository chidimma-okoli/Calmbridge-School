from pydantic import BaseModel, ConfigDict


class ResultCreate(BaseModel):
    student_id: int
    subject: str
    score: float
    grade: str
    term: str
    session: str


class ResultResponse(BaseModel):
    id: int
    student_id: int
    subject: str
    score: float
    grade: str
    term: str
    session: str

    model_config = ConfigDict(from_attributes=True)