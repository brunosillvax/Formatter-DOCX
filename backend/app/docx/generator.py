from typing import Any, Dict, List
from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt, Cm
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

    # Aplicar alinhamento primeiro
    alignment = style_def.get("alignment")
    if alignment == "center":
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    elif alignment == "right":
        p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    elif alignment == "justify":
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    elif alignment == "left":
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT

    # Formatação de parágrafo (indent, spacing)
    fmt = p.paragraph_format
    if "firstLineIndentCm" in style_def:
        try:
            fmt.first_line_indent = Cm(float(style_def["firstLineIndentCm"]))
        except Exception:
            pass
    if "lineSpacing" in style_def:
        try:
            fmt.line_spacing = float(style_def["lineSpacing"])
        except Exception:
            pass
    if "leftIndentCm" in style_def:
        try:
            fmt.left_indent = Cm(float(style_def["leftIndentCm"]))
        except Exception:
            pass

    # Aplicar formatação de fonte em todos os runs
    # Se não houver runs, criar um run vazio para aplicar a formatação
    if not p.runs:
        # Se o parágrafo está vazio, adicionar um espaço em branco para ter um run
        run = p.add_run(" ")
        run.font.size = Pt(style_def.get("fontSize", 12))
        run.font.name = style_def.get("fontName", "Calibri")
        run.bold = bool(style_def.get("bold", False))
        # Remover o espaço depois
        p.runs[0].text = ""
    else:
        # Aplicar formatação em todos os runs existentes
        for run in p.runs:
            if "fontSize" in style_def:
                run.font.size = Pt(style_def["fontSize"])
            if "fontName" in style_def:
                run.font.name = style_def["fontName"]
            if "bold" in style_def:
                run.bold = bool(style_def["bold"])


def _apply_keyword_emphasis(text: str, rules: Dict[str, Any]) -> str:
    # Opcional: regras de ênfase por palavra-chave
    if not isinstance(rules, dict):
        return text
    emphasis = rules.get("emphasis", {}) if isinstance(rules.get("emphasis", {}), dict) else {}
    keywords = emphasis.get("uppercaseBoldKeywords", [])
    if not isinstance(keywords, list) or not keywords:
        return text
    result = text
    for kw in keywords:
        if not kw:
            continue
        pattern = re.compile(rf"\b{re.escape(kw)}\b", flags=re.IGNORECASE)
        result = pattern.sub(kw.upper(), result)
    return result


def generate_docx_from_structure(raw_text: str, structure_json: Dict[str, Any], corrections: List[Dict[str, str]], rules: Dict[str, Any]) -> bytes:
    doc = Document()

    paragraph_styles = rules.get("paragraphStyles", {})
    layout = rules.get("layout", [])

    # Extrair sections da estrutura
    # structure_json pode ser um dict com "sections" ou uma list diretamente
    sections = None
    if isinstance(structure_json, dict):
        sections = structure_json.get("sections")
    elif isinstance(structure_json, list):
        sections = structure_json

    # Fallback: se estrutura não vier segmentada, usa texto completo como um parágrafo Body
    if not isinstance(sections, list) or len(sections) == 0:
        text = _apply_corrections(raw_text, corrections)
        text = _apply_keyword_emphasis(text, rules)
        p = doc.add_paragraph()
        if text.strip():
            p.add_run(text)
        _apply_paragraph_style(p, paragraph_styles.get("Body", {}))
    else:
        for block in sections:
            btype = (block.get("type", "paragraph") or "paragraph").lower()
            # map types/title/heading_n
            default_style = "Body"
            left_indent_cm = None
            if btype in ("heading", "heading_1", "heading_2", "heading_3"):
                if btype == "heading":
                    level = str(block.get("level") or "1")
                else:
                    level = btype.split("_")[1]
                default_style = f"Heading{level}"
                # optional indent mapping per level
                level_key = f"heading_{level}"
                indent_map = rules.get("indentLevelsCm", {}) if isinstance(rules.get("indentLevelsCm", {}), dict) else {}
                left_indent_cm = indent_map.get(level_key)
            elif btype == "title":
                default_style = paragraph_styles.get("Title") and "Title" or "Heading1"
            elif btype == "key_label":
                default_style = paragraph_styles.get("KeyLabel") and "KeyLabel" or "Body"
            style_name = block.get("style") or default_style
            spans = block.get("textSpans") or []
            text_parts = [s.get("text", "") for s in spans]
            text = "".join(text_parts)
            text = _apply_corrections(text, corrections)
            text = _apply_keyword_emphasis(text, rules)
            if btype in ("paragraph", "heading", "heading_1", "heading_2", "heading_3", "title", "key_label"):
                # Criar parágrafo e aplicar estilo
                p = doc.add_paragraph()
                style_def = dict(paragraph_styles.get(style_name, {}))
                if left_indent_cm is not None:
                    style_def["leftIndentCm"] = left_indent_cm
                # force bold for key_label
                if btype == "key_label":
                    style_def["bold"] = True
                # Adicionar texto após criar o parágrafo para garantir que tenha um run
                if text.strip():
                    run = p.add_run(text)
                else:
                    run = p.add_run(" ")
                    run.text = ""
                # Aplicar estilo após adicionar o texto
                _apply_paragraph_style(p, style_def)
            elif btype == "list":
                list_type = (block.get("listType") or "unordered").lower()
                items = block.get("items")
                lines = items if isinstance(items, list) and items else text.splitlines()
                list_style = "List Number" if list_type == "ordered" else "List Bullet"
                for line in lines:
                    p = doc.add_paragraph(style=list_style)
                    if str(line).strip():
                        run = p.add_run(str(line))
                    body_style = dict(paragraph_styles.get("Body", {}))
                    _apply_paragraph_style(p, body_style)
            elif btype == "table":
                headers = block.get("headers") or []
                rows = block.get("rows") or []
                col_count = len(headers) if headers else (len(rows[0]) if rows else 0)
                row_count = (1 if headers else 0) + len(rows)
                if col_count > 0 and row_count > 0:
                    tbl = doc.add_table(rows=row_count, cols=col_count)
                    tbl.style = 'Light Grid Accent 1'  # Estilo de tabela padrão
                    r_index = 0
                    if headers:
                        for c, val in enumerate(headers):
                            cell = tbl.rows[0].cells[c]
                            cell.text = str(val)
                            # Aplicar negrito e centralizar cabeçalhos
                            for paragraph in cell.paragraphs:
                                paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
                                for run in paragraph.runs:
                                    run.bold = True
                                    if "fontSize" in paragraph_styles.get("Body", {}):
                                        run.font.size = Pt(paragraph_styles.get("Body", {}).get("fontSize", 12))
                        r_index = 1
                    for i, row in enumerate(rows):
                        for c, val in enumerate(row):
                            cell = tbl.rows[r_index + i].cells[c]
                            cell.text = str(val)
                            # Aplicar formatação de fonte nas células
                            for paragraph in cell.paragraphs:
                                body_style = paragraph_styles.get("Body", {})
                                for run in paragraph.runs:
                                    if "fontSize" in body_style:
                                        run.font.size = Pt(body_style["fontSize"])
                                    if "fontName" in body_style:
                                        run.font.name = body_style["fontName"]
            else:
                # outros tipos podem ser expandidos no futuro
                p = doc.add_paragraph(text)
                _apply_paragraph_style(p, paragraph_styles.get("Body", {}))

    buf = io.BytesIO()
    doc.save(buf)
    return buf.getvalue()
