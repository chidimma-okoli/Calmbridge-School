import os
from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt


SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "development-secret-change-me",
)

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/users/login"
)


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire
    })

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


def get_current_user(
    token: str = Depends(oauth2_scheme),
):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={
            "WWW-Authenticate": "Bearer"
        },
    )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise credentials_exception

        return payload

    except JWTError:
        raise credentials_exception
def require_role(*allowed_roles: str):
    def role_checker(
        current_user=Depends(get_current_user),
    ):
        user_role = current_user.get("role")

        if user_role not in allowed_roles:
            raise HTTPException(
                status_code=403,
                detail="You do not have permission to access this resource",
            )

        return current_user

    return role_checker