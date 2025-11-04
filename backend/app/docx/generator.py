from typing import Any, Dict, List
from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt
import re
import io


def _apply_case(original: str, correction: str) -> str:
    if original.isupper():
        return correction.upper()
    if original[:1].isupper():
        return correction[:1].upper() + correction[1:]
    return correction


def _apply_corrections(text: str, corrections: List[Dict[str, str]]) -> str:
    result = text
    for item in corrections:
        orig = item.get("original", "")
        corr = item.get("correction", "")
        if not orig or not corr:
            continue
        pattern = re.compile(rf"\b{re.escape(orig)}\b", flags=re.IGNORECASE)

        def repl(m):
            return _apply_case(m.group(0), corr)

        result = pattern.sub(repl, result)
    return result


def _apply_paragraph_style(p, style_def: Dict[str, Any]):
    if not style_def:
        return
    if style_def.get("alignment") == "center":
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    elif style_def.get("alignment") == "right":
        p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    elif style_def.get("alignment") == "justify":
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    # font
    for run in p.runs:
        if "fontSize" in style_def:
            run.font.size = Pt(style_def["fontSize"])
        if "fontName" in style_def:
            run.font.name = style_def["fontName"]
        if "bold" in style_def:
            run.bold = bool(style_def["bold"])


def generate_docx_from_structure(raw_text: str, structure_json: Dict[str, Any], corrections: List[Dict[str, str]], rules: Dict[str, Any]) -> bytes:
    doc = Document()

    paragraph_styles = rules.get("paragraphStyles", {})
    layout = rules.get("layout", [])

    # Fallback: se estrutura não vier segmentada, usa texto completo como um parágrafo Body
    sections = structure_json.get("sections") if isinstance(structure_json, dict) else None
    if not isinstance(sections, list):
        text = _apply_corrections(raw_text, corrections)
        p = doc.add_paragraph(text)
        _apply_paragraph_style(p, paragraph_styles.get("Body", {}))
    else:
        for block in sections:
            btype = block.get("type", "paragraph")
            style_name = block.get("style") or ("Heading1" if btype == "heading" else "Body")
            spans = block.get("textSpans") or []
            text_parts = [s.get("text", "") for s in spans]
            text = "".join(text_parts)
            text = _apply_corrections(text, corrections)
            if btype in ("paragraph", "heading"):
                p = doc.add_paragraph(text)
                _apply_paragraph_style(p, paragraph_styles.get(style_name, {}))
            elif btype == "list":
                # simplificado: cada span vira um parágrafo com bullet
                for line in text.splitlines():
                    p = doc.add_paragraph(line, style="List Bullet")
                    _apply_paragraph_style(p, paragraph_styles.get("Body", {}))
            else:
                # outros tipos podem ser expandidos no futuro
                p = doc.add_paragraph(text)
                _apply_paragraph_style(p, paragraph_styles.get("Body", {}))

    buf = io.BytesIO()
    doc.save(buf)
    return buf.getvalue()
