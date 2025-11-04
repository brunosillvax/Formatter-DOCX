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
