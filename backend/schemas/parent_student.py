from pydantic import BaseModel, ConfigDict


class ParentStudentCreate(BaseModel):
    parent_id: int
    student_id: int


class ParentStudentResponse(BaseModel):
    id: int
    parent_id: int
    student_id: int

    model_config = ConfigDict(from_attributes=True)