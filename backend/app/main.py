"""Main application module"""
import traceback
import sys
from .factory import create_app
import os
from fastapi.middleware.cors import CORSMiddleware

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

    # CORS para permitir o frontend hospedado na Square Cloud (ou local)
    allowed_origin = os.getenv("FRONTEND_ORIGIN", "*")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[allowed_origin] if allowed_origin != "*" else ["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    print("Aplicação iniciada com sucesso!")
except Exception as e:
    print("Erro ao iniciar aplicação:", str(e), file=sys.stderr)
    print("Traceback:", file=sys.stderr)
    traceback.print_exc()
    raise
