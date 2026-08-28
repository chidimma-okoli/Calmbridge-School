from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from database import SessionLocal
from models.user import User
from schemas.user import UserCreate, UserResponse
from security import hash_password, verify_password
from auth import create_access_token, get_current_user, require_role


router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post(
    "/",
    response_model=UserResponse,
)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    new_user = User(
        username=user.username,
        email=user.email,
        role=user.role.value,
        password_hash=hash_password(user.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.get(
    "/",
    response_model=list[UserResponse],
)
def get_users(
    db: Session = Depends(get_db),
):
    users = db.query(User).all()
    return users


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    existing_user = (
        db.query(User)
        .filter(User.email == form_data.username)
        .first()
    )

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    if not verify_password(
        form_data.password,
        existing_user.password_hash,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    access_token = create_access_token(
        {
            "sub": str(existing_user.id),
            "username": existing_user.username,
            "role": existing_user.role,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.get("/me")
def get_my_profile(
    current_user=Depends(get_current_user),
):
    return {
        "message": "You are authenticated",
        "user": current_user,
    }

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }