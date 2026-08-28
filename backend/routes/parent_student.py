from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from auth import require_role
from database import SessionLocal
from models.user import User
from models.parent_student import ParentStudent
from schemas.parent_student import (
    ParentStudentCreate,
    ParentStudentResponse,
)


router = APIRouter(
    prefix="/parent-students",
    tags=["Parent-Student"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post(
    "/",
    response_model=ParentStudentResponse,
)
def create_parent_student(
    relationship: ParentStudentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("admin")
    ),
):
    parent = (
        db.query(User)
        .filter(
            User.id == relationship.parent_id,
            User.role == "parent",
        )
        .first()
    )

    if not parent:
        raise HTTPException(
            status_code=404,
            detail="Parent user not found",
        )

    student = (
        db.query(User)
        .filter(
            User.id == relationship.student_id,
            User.role == "student",
        )
        .first()
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student user not found",
        )

    existing_relationship = (
        db.query(ParentStudent)
        .filter(
            ParentStudent.parent_id == relationship.parent_id,
            ParentStudent.student_id == relationship.student_id,
        )
        .first()
    )

    if existing_relationship:
        raise HTTPException(
            status_code=400,
            detail="Parent-student relationship already exists",
        )

    new_relationship = ParentStudent(
        parent_id=relationship.parent_id,
        student_id=relationship.student_id,
    )

    db.add(new_relationship)
    db.commit()
    db.refresh(new_relationship)

    return new_relationship


@router.get(
    "/",
    response_model=list[ParentStudentResponse],
)
def get_parent_students(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("admin")
    ),
):
    relationships = db.query(ParentStudent).all()
    return relationships