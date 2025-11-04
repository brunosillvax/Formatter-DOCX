import json
import uuid
import re
from typing import Dict, Any

from .gemini_client import get_gemini_client, get_gemini_model_name
from .prompts import SYSTEM_PROMPT, USER_PROMPT_TEMPLATE
from ..models import get_template_by_id
from ..redis_cache import cache_set


def _sanitize_text(raw_text: str) -> str:
    """
    Remove instruções de sistema, metadados e prompts que não são parte do conteúdo real do documento.
    """
    text = raw_text

    # Padrões comuns de instruções de sistema que devem ser removidos
    patterns_to_remove = [
        r'Você é um (engenheiro|assistente|especialista).*?Regras gerais:',
        r'Diretrizes\s*\n.*?Nunca sobrescreva.*?\.env',
        r'Planejamento\s*\n.*?fases ainda restam\.',
        r'Depuração\s*\n.*?logs adicionados anteriormente\.',
        r'Manipulação de PRDs\s*\n.*?exemplos de estrutura de código\.',
        r'Regras gerais:\s*\n.*?confirmar\.\]',
        r'Regras/layout do template.*?Tarefas:',
        r'Tarefas:\s*\n.*?Formato de saída JSON:',
        r'Formato de saída JSON:\s*\n.*?}}',
        r'\{.*?textSpans.*?\}',  # Remove estruturas JSON de exemplo
    ]

    for pattern in patterns_to_remove:
        text = re.sub(pattern, '', text, flags=re.DOTALL | re.IGNORECASE)

    # Remove linhas que começam com padrões de instrução
    lines = text.split('\n')
    filtered_lines = []
    skip_next = False

    for i, line in enumerate(lines):
        line_lower = line.strip().lower()

        # Ignora linhas que são claramente instruções
        if any(keyword in line_lower for keyword in [
            'você é um', 'diretrizes', 'planejamento', 'depuração',
            'manipulação de prds', 'regras gerais:', 'tarefas:',
            'formato de saída', 'análise estrutural', 'análise ortográfica',
            'textspans', 'ignore completamente', 'instruções:'
        ]):
            skip_next = True
            continue

        # Se encontrou uma seção de instruções, pula até encontrar conteúdo real
        if skip_next and (line.strip() == '' or line.strip().startswith('-')):
            continue

        skip_next = False
        filtered_lines.append(line)

    text = '\n'.join(filtered_lines)

    # Remove múltiplas linhas em branco
    text = re.sub(r'\n{3,}', '\n\n', text)

    return text.strip()


def analyze_text(raw_text: str, template_id: str, spellcheck: bool) -> Dict[str, Any]:
    tpl = get_template_by_id(template_id)
    if not tpl:
        raise ValueError("Template não encontrado")

    rules_json = json.dumps(tpl["rules"]) if isinstance(tpl["rules"], dict) else str(tpl["rules"])

    # Sanitizar o texto antes de enviar para a IA
    sanitized_text = _sanitize_text(raw_text)

    # Log para debug (pode ser removido depois)
    if len(sanitized_text) < len(raw_text):
        print(f"DEBUG: Texto sanitizado. Original: {len(raw_text)} chars, Sanitizado: {len(sanitized_text)} chars")

    try:
        genai = get_gemini_client()
        model = genai.GenerativeModel(get_gemini_model_name())
    except RuntimeError as e:
        # Erro de configuração (API key não configurada)
        raise RuntimeError(f"Erro ao configurar cliente Gemini: {str(e)}")
    except Exception as e:
        raise RuntimeError(f"Erro ao inicializar modelo Gemini: {str(e)}")

    # Análise unificada (estrutura + correções)
    # Combinar system prompt com user prompt, já que Gemini não suporta role "system" diretamente
    full_prompt = f"{SYSTEM_PROMPT}\n\n{USER_PROMPT_TEMPLATE.format(raw_text=sanitized_text, rules_json=rules_json)}"

    try:
        # Formato correto conforme documentação: passar texto diretamente
        response = model.generate_content(
            full_prompt,
            generation_config={
                "response_mime_type": "application/json",
                "temperature": 0.2
            }
        )
    except Exception as e:
        error_msg = str(e)

        # Detectar erro de quota (429)
        if "429" in error_msg or "quota" in error_msg.lower() or "Quota exceeded" in error_msg:
            # Extrair tempo de retry se disponível
            retry_seconds = None
            retry_match = re.search(r'retry.*?(\d+)\s*seconds?', error_msg, re.IGNORECASE)
            if retry_match:
                retry_seconds = int(retry_match.group(1))

            # Mensagem amigável
            if retry_seconds:
                raise RuntimeError(
                    f"Limite de requisições da API do Gemini excedido temporariamente. "
                    f"Tente novamente em {retry_seconds} segundos. "
                    f"Se o problema persistir, verifique seu plano e billing em https://ai.dev/usage"
                )
            else:
                raise RuntimeError(
                    f"Limite de requisições da API do Gemini excedido. "
                    f"Tente novamente em alguns segundos. "
                    f"Se o problema persistir, verifique seu plano e billing em https://ai.dev/usage"
                )

        # Outros erros
        raise RuntimeError(f"Erro ao chamar API do Gemini: {error_msg}")

    response_text = getattr(response, "text", None) or "{}"
    try:
        response_json = json.loads(response_text)
    except json.JSONDecodeError as e:
        raise RuntimeError(f"Resposta inválida da API do Gemini: {str(e)}")

    structure_json = response_json.get("sections", [])
    corrections_json = response_json.get("corrections", []) if spellcheck else []

    analysis_id = str(uuid.uuid4())
    try:
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
    except RuntimeError as e:
        raise RuntimeError(f"Erro ao salvar análise no cache: {str(e)}")

    return {"analysisId": analysis_id, "corrections": corrections_json}
