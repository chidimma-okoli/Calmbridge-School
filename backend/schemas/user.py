from pydantic import BaseModel, EmailStr

from roles import UserRole


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    role: UserRole
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: UserRole

    class Config:
        from_attributes = True