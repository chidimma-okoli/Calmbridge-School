from pydantic import BaseModel, ConfigDict


class LessonNoteCreate(BaseModel):
    subject: str
    topic: str
    content: str


class LessonNoteUpdate(BaseModel):
    subject: str
    topic: str
    content: str


class LessonNoteResponse(BaseModel):
    id: int
    teacher_id: int
    subject: str
    topic: str
    content: str

    model_config = ConfigDict(from_attributes=True)