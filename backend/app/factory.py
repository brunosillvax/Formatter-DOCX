"""FastAPI application factory"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings


def create_app() -> FastAPI:
    """Create and configure the FastAPI application"""
    print("Iniciando criação do app...")
    app = FastAPI(title="DOCX Formatter API")

    print("Configurando CORS...")
    # Configuração CORS direta para desenvolvimento
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],  # Frontend URL fixa
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Métodos específicos
        allow_headers=["*"],
        expose_headers=["*"],
        max_age=3600,
    )

    @app.get("/health")
    def health():
        return {"status": "ok"}

    return app