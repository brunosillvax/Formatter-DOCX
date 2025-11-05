from typing import List, Optional
from pydantic import BaseModel


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    access_token: str


class AnalyzeOptions(BaseModel):
    spellcheck: Optional[bool] = False


class AnalyzeRequest(BaseModel):
    rawText: str
    templateId: str
    options: Optional[AnalyzeOptions] = AnalyzeOptions()


class CorrectionItem(BaseModel):
    id: str
    original: str
    correction: str
    context: Optional[str] = None


class AnalyzeResponse(BaseModel):
    analysisId: str
    corrections: List[CorrectionItem]


class GenerateRequest(BaseModel):
    analysisId: str
    approvedCorrectionIds: Optional[List[str]] = None


class TemplateItem(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    preview_url: Optional[str] = None
    category: Optional[str] = None


class TemplatesResponse(BaseModel):
    templates: List[TemplateItem]


class PlanInfo(BaseModel):
    name: str
    status: str
    expires_at: Optional[str] = None  # ISO8601 ou None para plano gratuito


class UserProfile(BaseModel):
    id: str
    username: str
    email: Optional[str] = None
    plan: PlanInfo


class UpdateProfileRequest(BaseModel):
    email: Optional[str] = None


class ChangePlanRequest(BaseModel):
    plan: str  # Free, Pro, Business
