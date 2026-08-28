from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from auth import require_role
from database import SessionLocal
from models.finance import Finance
from schemas.finance import FinanceCreate, FinanceResponse


router = APIRouter(
    prefix="/finance",
    tags=["Finance"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def finance_response(finance):
    return {
        "id": finance.id,
        "student_id": finance.student_id,
        "fee_type": finance.fee_type,
        "amount": finance.amount,
        "amount_paid": finance.amount_paid,
        "balance": finance.amount - finance.amount_paid,
        "session": finance.session,
        "term": finance.term,
        "status": finance.status,
    }


@router.get(
    "/",
    response_model=list[FinanceResponse],
)
def get_finance(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("finance", "admin")
    ),
):
    finances = (
        db.query(Finance)
        .order_by(Finance.student_id)
        .all()
    )

    return [
        finance_response(finance)
        for finance in finances
    ]


@router.post(
    "/",
    response_model=FinanceResponse,
)
def create_finance(
    finance: FinanceCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("finance", "admin")
    ),
):
    new_finance = Finance(
        student_id=finance.student_id,
        fee_type=finance.fee_type,
        amount=finance.amount,
        amount_paid=finance.amount_paid,
        session=finance.session,
        term=finance.term,
        status=finance.status,
    )

    db.add(new_finance)
    db.commit()
    db.refresh(new_finance)

    return finance_response(new_finance)


@router.get(
    "/{finance_id}",
    response_model=FinanceResponse,
)
def get_finance_record(
    finance_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("finance", "admin")
    ),
):
    finance = (
        db.query(Finance)
        .filter(Finance.id == finance_id)
        .first()
    )

    if not finance:
        raise HTTPException(
            status_code=404,
            detail="Finance record not found",
        )

    return finance_response(finance)


@router.put(
    "/{finance_id}",
    response_model=FinanceResponse,
)
def update_finance(
    finance_id: int,
    finance_data: FinanceCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("finance", "admin")
    ),
):
    finance = (
        db.query(Finance)
        .filter(Finance.id == finance_id)
        .first()
    )

    if not finance:
        raise HTTPException(
            status_code=404,
            detail="Finance record not found",
        )

    finance.student_id = finance_data.student_id
    finance.fee_type = finance_data.fee_type
    finance.amount = finance_data.amount
    finance.amount_paid = finance_data.amount_paid
    finance.session = finance_data.session
    finance.term = finance_data.term
    finance.status = finance_data.status

    db.commit()
    db.refresh(finance)

    return finance_response(finance)


@router.delete(
    "/{finance_id}",
)
def delete_finance(
    finance_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("finance", "admin")
    ),
):
    finance = (
        db.query(Finance)
        .filter(Finance.id == finance_id)
        .first()
    )

    if not finance:
        raise HTTPException(
            status_code=404,
            detail="Finance record not found",
        )

    db.delete(finance)
    db.commit()

    return {
        "message": "Finance record deleted successfully"
    }