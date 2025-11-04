from fastapi import APIRouter, Depends, HTTPException
from ..schemas import AnalyzeRequest, AnalyzeResponse, GenerateRequest
from ..auth import require_auth
from ..ai.analyzer import analyze_text
from ..redis_cache import cache_get_json, cache_delete
from ..models import get_template_by_id
from ..docx.generator import generate_docx_from_structure
from fastapi.responses import StreamingResponse
import io


router = APIRouter(prefix="/api/v1/document", tags=["document"])


@router.post("/analyze", response_model=AnalyzeResponse)
def analyze(body: AnalyzeRequest, user_id: str = Depends(require_auth)):
    try:
        result = analyze_text(
            raw_text=body.rawText,
            template_id=body.templateId,
            spellcheck=bool(body.options and body.options.spellcheck),
        )
        return AnalyzeResponse(**result)
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))
    except Exception:
        raise HTTPException(status_code=502, detail="Falha ao analisar o texto")


@router.post("/generate")
def generate(body: GenerateRequest, user_id: str = Depends(require_auth)):
    key = f"analysis:{body.analysisId}"
    data = cache_get_json(key)
    if not data:
        raise HTTPException(status_code=410, detail="Análise expirada ou inexistente")

    tpl = get_template_by_id(data["templateId"]) or {}
    approved = set(body.approvedCorrectionIds or [])
    corrections = [c for c in (data.get("corrections_json") or []) if c.get("id") in approved]

    try:
        content = generate_docx_from_structure(
            raw_text=data["rawText"],
            structure_json=data["structure_json"],
            corrections=corrections,
            rules=tpl.get("rules", {}),
        )
    except Exception:
        raise HTTPException(status_code=500, detail="Erro ao gerar documento")
    finally:
        cache_delete(key)

    return StreamingResponse(
        io.BytesIO(content),
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": "attachment; filename=formatted.docx"},
    )
