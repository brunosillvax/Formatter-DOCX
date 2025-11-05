from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, HTTPException, Depends
from ..schemas import (
    LoginRequest,
    LoginResponse,
    UserProfile,
    PlanInfo,
    UpdateProfileRequest,
    ChangePlanRequest,
)
from ..models import get_user_by_username, get_user_by_id, update_user_email, update_user_plan
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
    plan = PlanInfo(
        name=user.get("plan_name") or "Free",
        status=user.get("plan_status") or "active",
        expires_at=(user.get("plan_expires_at").isoformat() if user.get("plan_expires_at") else None),
    )
    return UserProfile(id=str(user["id"]), username=user["username"], email=user.get("email"), plan=plan)


@router.patch("/me", response_model=UserProfile)
def update_me(body: UpdateProfileRequest, user_id: str = Depends(require_auth)):
    if body.email is not None:
        update_user_email(user_id, body.email.strip())
    return me(user_id)  # reutiliza a resposta de /me


@router.get("/plans")
def list_plans():
    return {
        "plans": [
            {"id": "Free", "label": "Free", "durationDays": None},
            {"id": "Pro", "label": "Pro (30 dias)", "durationDays": 30},
            {"id": "Business", "label": "Business (30 dias)", "durationDays": 30},
        ]
    }


@router.post("/me/plan", response_model=UserProfile)
def change_plan(body: ChangePlanRequest, user_id: str = Depends(require_auth)):
    plan = (body.plan or "").strip()
    if plan not in {"Free", "Pro", "Business"}:
        raise HTTPException(status_code=400, detail="Plano inválido")

    if plan == "Free":
        update_user_plan(user_id, "Free", "active", None)
    else:
        expires = datetime.now(timezone.utc) + timedelta(days=30)
        update_user_plan(user_id, plan, "active", expires)
    return me(user_id)
