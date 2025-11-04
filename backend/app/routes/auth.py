from fastapi import APIRouter, HTTPException
from ..schemas import LoginRequest, LoginResponse
from ..models import get_user_by_username
from ..auth import verify_password, create_access_token


router = APIRouter(prefix="/api/v1", tags=["auth"])


@router.post("/login", response_model=LoginResponse)
def login(body: LoginRequest):
    user = get_user_by_username(body.username)
    if not user or not verify_password(body.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    token = create_access_token(str(user["id"]))
    return LoginResponse(access_token=token)
