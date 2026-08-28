from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from auth import require_role
from database import SessionLocal
from models.lesson import Lesson
from schemas.lesson import LessonCreate, LessonResponse


router = APIRouter(
    prefix="/lms",
    tags=["LMS"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get(
    "/",
    response_model=list[LessonResponse],
)
def read_lesson_notes(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("student", "teacher", "admin")
    ),
):
    lessons = db.query(Lesson).all()
    return lessons


@router.post(
    "/",
    response_model=LessonResponse,
)
def create_lesson(
    lesson: LessonCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("teacher", "admin")
    ),
):
    new_lesson = Lesson(
        title=lesson.title,
        subject=lesson.subject,
        content=lesson.content,
        teacher_id=int(current_user["sub"]),
    )

    db.add(new_lesson)
    db.commit()
    db.refresh(new_lesson)

    return new_lesson