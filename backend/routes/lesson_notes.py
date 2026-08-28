from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from auth import require_role
from database import SessionLocal
from models.lesson_note import LessonNote
from schemas.lesson_note import (
    LessonNoteCreate,
    LessonNoteUpdate,
    LessonNoteResponse,
)


router = APIRouter(
    prefix="/lesson-notes",
    tags=["Lesson Notes"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get(
    "/",
    response_model=list[LessonNoteResponse],
)
def get_lesson_notes(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("student", "teacher", "admin")
    ),
):
    lesson_notes = db.query(LessonNote).all()
    return lesson_notes


@router.post(
    "/",
    response_model=LessonNoteResponse,
)
def create_lesson_note(
    lesson_note: LessonNoteCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("teacher", "admin")
    ),
):
    new_lesson_note = LessonNote(
        teacher_id=int(current_user["sub"]),
        subject=lesson_note.subject,
        topic=lesson_note.topic,
        content=lesson_note.content,
    )

    db.add(new_lesson_note)
    db.commit()
    db.refresh(new_lesson_note)

    return new_lesson_note


@router.put(
    "/{lesson_note_id}",
    response_model=LessonNoteResponse,
)
def update_lesson_note(
    lesson_note_id: int,
    lesson_note: LessonNoteUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("teacher", "admin")
    ),
):
    existing_note = (
        db.query(LessonNote)
        .filter(LessonNote.id == lesson_note_id)
        .first()
    )

    if not existing_note:
        raise HTTPException(
            status_code=404,
            detail="Lesson note not found",
        )

    user_id = int(current_user["sub"])
    user_role = current_user["role"]

    if (
        user_role == "teacher"
        and existing_note.teacher_id != user_id
    ):
        raise HTTPException(
            status_code=403,
            detail="You can only update your own lesson notes",
        )

    existing_note.subject = lesson_note.subject
    existing_note.topic = lesson_note.topic
    existing_note.content = lesson_note.content

    db.commit()
    db.refresh(existing_note)

    return existing_note


@router.delete(
    "/{lesson_note_id}"
)
def delete_lesson_note(
    lesson_note_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("teacher", "admin")
    ),
):
    existing_note = (
        db.query(LessonNote)
        .filter(LessonNote.id == lesson_note_id)
        .first()
    )

    if not existing_note:
        raise HTTPException(
            status_code=404,
            detail="Lesson note not found",
        )

    user_id = int(current_user["sub"])
    user_role = current_user["role"]

    if (
        user_role == "teacher"
        and existing_note.teacher_id != user_id
    ):
        raise HTTPException(
            status_code=403,
            detail="You can only delete your own lesson notes",
        )

    db.delete(existing_note)
    db.commit()

    return {
        "message": "Lesson note deleted successfully"
    }