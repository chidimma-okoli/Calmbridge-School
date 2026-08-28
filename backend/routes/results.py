from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from auth import require_role
from database import SessionLocal
from models.result import Result
from models.parent_student import ParentStudent
from schemas.result import ResultCreate, ResultResponse


router = APIRouter(
    prefix="/results",
    tags=["Results"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get(
    "/",
    response_model=list[ResultResponse],
)
def get_results(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("student", "teacher", "parent", "admin")
    ),
):
    role = current_user["role"]
    user_id = int(current_user["sub"])

    if role == "student":
        results = (
            db.query(Result)
            .filter(Result.student_id == user_id)
            .all()
        )

    elif role == "parent":
        student_ids = (
            db.query(ParentStudent.student_id)
            .filter(ParentStudent.parent_id == user_id)
            .all()
        )

        student_ids = [
            student_id[0]
            for student_id in student_ids
        ]

        results = (
            db.query(Result)
            .filter(Result.student_id.in_(student_ids))
            .all()
        )

    else:
        results = db.query(Result).all()

    return results


@router.post(
    "/",
    response_model=ResultResponse,
)
def create_result(
    result: ResultCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("teacher", "admin")
    ),
):
    new_result = Result(
        student_id=result.student_id,
        subject=result.subject,
        score=result.score,
        grade=result.grade,
        term=result.term,
        session=result.session,
    )

    db.add(new_result)
    db.commit()
    db.refresh(new_result)

    return new_result