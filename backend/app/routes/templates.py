from fastapi import APIRouter
from ..schemas import TemplatesResponse, TemplateItem
from ..db import get_conn, put_conn


router = APIRouter(prefix="/api/v1", tags=["templates"])


@router.get("/templates", response_model=TemplatesResponse)
def list_templates():
    print("Iniciando list_templates")
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            print("Executando query SQL")
            cur.execute("SELECT id, name, description, preview_url, rules FROM templates ORDER BY name ASC")
            print("Query executada, buscando resultados")
            rows = cur.fetchall()
            print(f"Encontrados {len(rows)} templates")
            
            items = []
            for row in rows:
                rid, name, desc, preview, rules = row
                category = None
                try:
                    if isinstance(rules, dict):
                        meta = rules.get("metadata") or {}
                        if isinstance(meta, dict):
                            category = meta.get("category")
                except Exception as e:
                    print(f"Erro ao processar metadata: {str(e)}")
                    pass
                items.append(TemplateItem(id=rid, name=name, description=desc, preview_url=preview, category=category))
            print(f"Processados {len(items)} templates com sucesso")
    except Exception as e:
        print(f"Erro ao listar templates: {str(e)}")
        raise
    finally:
        put_conn(conn)
    return TemplatesResponse(templates=items)
