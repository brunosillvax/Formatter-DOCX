STRUCTURE_SYSTEM = (
    "Você é um assistente que extrai apenas a estrutura do texto sem reescrever. "
    "Responda ESTRITAMENTE em JSON válido."
)

STRUCTURE_USER_TEMPLATE = (
    "Texto bruto:\n{raw_text}\n\n"
    "Regras/layout do template (JSON):\n{rules_json}\n\n"
    "Tarefa: produzir um JSON com 'sections' contendo spans de texto exatamente como no original, "
    "tipando cada bloco com 'type' (heading|paragraph|list|table) e 'selectors' compatíveis com o layout.\n"
    "Exemplo de saída mínima: {\"sections\":[{\"id\":\"intro\",\"type\":\"paragraph\",\"textSpans\":[{\"text\":\"...\"}]}]}"
)

SPELLCHECK_SYSTEM = (
    "Você é um corretor ortográfico estrito (português). Não reescreva estilo, não resuma. "
    "Responda apenas JSON válido com erros e correções."
)

SPELLCHECK_USER_TEMPLATE = (
    "Texto bruto:\n{raw_text}\n\n"
    "Tarefa: retorne uma lista JSON de objetos {id, original, correction, context?}. "
    "Apenas ortografia/acentuação. Sem sinônimos, sem mudanças de estilo. Sem duplicatas."
)
