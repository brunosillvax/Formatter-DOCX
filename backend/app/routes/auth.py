from fastapi import APIRouter, HTTPException, Depends
from ..schemas import LoginRequest, LoginResponse, UserProfile, PlanInfo
from ..models import get_user_by_username, get_user_by_id
from ..auth import verify_password, create_access_token, require_auth


router = APIRouter(prefix="/api/v1", tags=["auth"])


@router.post("/login", response_model=LoginResponse)
def login(body: LoginRequest):
    user = get_user_by_username(body.username)
    if not user or not verify_password(body.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    token = create_access_token(str(user["id"]))
    return LoginResponse(access_token=token)


@router.get("/me", response_model=UserProfile)
def me(user_id: str = Depends(require_auth)):
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    # Plano básico default (não há tabela de assinatura por enquanto)
    plan = PlanInfo(name="Free", status="active", expires_at=None)
    return UserProfile(id=str(user["id"]), username=user["username"], plan=plan)
