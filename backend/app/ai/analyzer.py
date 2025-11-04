import json
import uuid
from typing import Any, Dict, List, Optional

from .gemini_client import get_gemini_client, get_gemini_model_name
from .prompts import (
    STRUCTURE_SYSTEM,
    STRUCTURE_USER_TEMPLATE,
    SPELLCHECK_SYSTEM,
    SPELLCHECK_USER_TEMPLATE,
)
from ..models import get_template_by_id
from ..redis_cache import cache_set


def _parse_json_strict(text: str) -> Any:
    text = text.strip()
    # Tentar parse direto; se falhar, tentar localizar o primeiro e último delimitador JSON
    try:
        return json.loads(text)
    except Exception:
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1 and end > start:
            candidate = text[start : end + 1]
            return json.loads(candidate)
        start = text.find("[")
        end = text.rfind("]")
        if start != -1 and end != -1 and end > start:
            candidate = text[start : end + 1]
            return json.loads(candidate)
        raise


def analyze_text(raw_text: str, template_id: str, spellcheck: bool) -> Dict[str, Any]:
    tpl = get_template_by_id(template_id)
    if not tpl:
        raise ValueError("Template não encontrado")

    rules_json = json.dumps(tpl["rules"]) if isinstance(tpl["rules"], dict) else str(tpl["rules"])

    genai = get_gemini_client()
    model_name = get_gemini_model_name()

    # Estrutura
    structure_prompt = {
        "role": "user",
        "parts": [{"text": STRUCTURE_USER_TEMPLATE.format(raw_text=raw_text, rules_json=rules_json)}],
    }
    structure_resp = genai.GenerativeModel(model_name).generate_content(
        contents=[{"role": "system", "parts": [{"text": STRUCTURE_SYSTEM}]}, structure_prompt]
    )
    structure_text = getattr(structure_resp, "text", None) or ""
    structure_json = _parse_json_strict(structure_text)

    corrections_json: List[dict] = []
    if spellcheck:
        spell_prompt = {
            "role": "user",
            "parts": [{"text": SPELLCHECK_USER_TEMPLATE.format(raw_text=raw_text)}],
        }
        spell_resp = genai.GenerativeModel(model_name).generate_content(
            contents=[{"role": "system", "parts": [{"text": SPELLCHECK_SYSTEM}]}, spell_prompt]
        )
        spell_text = getattr(spell_resp, "text", None) or "[]"
        data = _parse_json_strict(spell_text)
        if isinstance(data, list):
            corrections_json = data

    analysis_id = str(uuid.uuid4())
    cache_set(
        f"analysis:{analysis_id}",
        {
            "rawText": raw_text,
            "templateId": template_id,
            "structure_json": structure_json,
            "corrections_json": corrections_json,
        },
        ttl_seconds=900,
    )

    return {"analysisId": analysis_id, "corrections": corrections_json}
