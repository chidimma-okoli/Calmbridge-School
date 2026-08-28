from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from auth import require_role
from database import SessionLocal
from models.result import Result
from models.parent_student import ParentStudent
from models.user import User


router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_reports(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("parent", "admin")
    ),
):
    role = current_user["role"]
    user_id = int(current_user["sub"])

    # ADMIN: see reports for all students
    if role == "admin":
        results = (
            db.query(Result)
            .order_by(
                Result.student_id,
                Result.subject
            )
            .all()
        )

    # PARENT: see reports only for linked children
    else:
        student_ids = (
            db.query(ParentStudent.student_id)
            .filter(
                ParentStudent.parent_id == user_id
            )
            .all()
        )

        student_ids = [
            student_id[0]
            for student_id in student_ids
        ]

        results = (
            db.query(Result)
            .filter(
                Result.student_id.in_(student_ids)
            )
            .order_by(
                Result.student_id,
                Result.subject
            )
            .all()
        )

    reports = {}

    for result in results:
        student_id = result.student_id

        # Find the student
        student = (
            db.query(User)
            .filter(User.id == student_id)
            .first()
        )

        # Create report for this student
        if student_id not in reports:
            reports[student_id] = {
                "student_id": student_id,
                "student_name": (
                    student.username
                    if student
                    else "Unknown"
                ),
                "student_email": (
                    student.email
                    if student
                    else "Unknown"
                ),
                "session": result.session,
                "term": result.term,
                "subjects": [],
                "total_score": 0,
                "subject_count": 0,
            }

        # Add subject result
        reports[student_id]["subjects"].append(
            {
                "subject": result.subject,
                "score": result.score,
                "grade": result.grade,
            }
        )

        # Calculate totals
        reports[student_id]["total_score"] += result.score
        reports[student_id]["subject_count"] += 1

    # Calculate average score
    for report in reports.values():

        if report["subject_count"] > 0:
            report["average_score"] = round(
                report["total_score"]
                / report["subject_count"],
                2,
            )
        else:
            report["average_score"] = 0

        # Remove internal calculation fields
        del report["total_score"]
        del report["subject_count"]

    return list(reports.values())