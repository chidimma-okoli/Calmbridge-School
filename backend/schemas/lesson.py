from pydantic import BaseModel, ConfigDict


class LessonCreate(BaseModel):
    title: str
    subject: str
    content: str


class LessonResponse(BaseModel):
    id: int
    title: str
    subject: str
    content: str
    teacher_id: int

    model_config = ConfigDict(from_attributes=True)