from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from auth import require_role
from database import SessionLocal
from models.payment import Payment
from models.finance import Finance
from schemas.payment import PaymentCreate, PaymentResponse


router = APIRouter(
    prefix="/payments",
    tags=["Payments"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post(
    "/",
    response_model=PaymentResponse,
)
def create_payment(
    payment: PaymentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("finance", "admin")
    ),
):
    finance = (
        db.query(Finance)
        .filter(Finance.id == payment.finance_id)
        .first()
    )

    if not finance:
        raise HTTPException(
            status_code=404,
            detail="Finance record not found",
        )

    if finance.student_id != payment.student_id:
        raise HTTPException(
            status_code=400,
            detail="Payment student does not match finance record",
        )

    if payment.amount <= 0:
        raise HTTPException(
            status_code=400,
            detail="Payment amount must be greater than zero",
        )

    balance = finance.amount - finance.amount_paid

    if payment.amount > balance:
        raise HTTPException(
            status_code=400,
            detail="Payment cannot be greater than outstanding balance",
        )

    existing_payment = (
        db.query(Payment)
        .filter(Payment.reference == payment.reference)
        .first()
    )

    if existing_payment:
        raise HTTPException(
            status_code=400,
            detail="Payment reference already exists",
        )

    new_payment = Payment(
        student_id=payment.student_id,
        finance_id=payment.finance_id,
        amount=payment.amount,
        payment_method=payment.payment_method,
        reference=payment.reference,
    )

    finance.amount_paid += payment.amount

    if finance.amount_paid >= finance.amount:
        finance.amount_paid = finance.amount
        finance.status = "paid"
    else:
        finance.status = "pending"

    db.add(new_payment)
    db.commit()
    db.refresh(new_payment)

    return new_payment


@router.get(
    "/",
    response_model=list[PaymentResponse],
)
def get_payments(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("finance", "admin")
    ),
):
    return (
        db.query(Payment)
        .order_by(Payment.payment_date.desc())
        .all()
    )


@router.get(
    "/student/{student_id}",
    response_model=list[PaymentResponse],
)
def get_student_payments(
    student_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("finance", "admin")
    ),
):
    return (
        db.query(Payment)
        .filter(Payment.student_id == student_id)
        .order_by(Payment.payment_date.desc())
        .all()
    )


@router.get(
    "/{payment_id}",
    response_model=PaymentResponse,
)
def get_payment(
    payment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("finance", "admin")
    ),
):
    payment = (
        db.query(Payment)
        .filter(Payment.id == payment_id)
        .first()
    )

    if not payment:
        raise HTTPException(
            status_code=404,
            detail="Payment not found",
        )

    return payment


@router.delete(
    "/{payment_id}",
)
def delete_payment(
    payment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role("finance", "admin")
    ),
):
    payment = (
        db.query(Payment)
        .filter(Payment.id == payment_id)
        .first()
    )

    if not payment:
        raise HTTPException(
            status_code=404,
            detail="Payment not found",
        )

    finance = (
        db.query(Finance)
        .filter(Finance.id == payment.finance_id)
        .first()
    )

    if finance:
        finance.amount_paid -= payment.amount

        if finance.amount_paid < 0:
            finance.amount_paid = 0

        if finance.amount_paid >= finance.amount:
            finance.status = "paid"
        else:
            finance.status = "pending"

    db.delete(payment)
    db.commit()

    return {
        "message": "Payment deleted successfully"
    }