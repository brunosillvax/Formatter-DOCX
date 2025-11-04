"""Main application module"""
import traceback
import sys
from .factory import create_app

try:
    print("Importando routers...")
    from .routes.auth import router as auth_router
    from .routes.document import router as document_router
    from .routes.templates import router as templates_router

    # Criar aplicação base
    print("Criando aplicação...")
    app = create_app()

    # Registrar routers
    print("Registrando routers...")
    app.include_router(auth_router)
    app.include_router(document_router)
    app.include_router(templates_router)

    print("Aplicação iniciada com sucesso!")
except Exception as e:
    print("Erro ao iniciar aplicação:", str(e), file=sys.stderr)
    print("Traceback:", file=sys.stderr)
    traceback.print_exc()
    raise
