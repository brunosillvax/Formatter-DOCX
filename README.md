<div align="center">

# Formatter DOCX ✨📄

Plataforma web para analisar texto com IA, aplicar correções e gerar documentos `.docx` em segundos.

<br/>

<img alt="Node" src="https://img.shields.io/badge/Node-18%2B-339933?logo=node.js&logoColor=white" />
<img alt="Python" src="https://img.shields.io/badge/Python-3.10%2B-3776AB?logo=python&logoColor=white" />
<img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" />
<img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi&logoColor=white" />
<img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white" />
<img alt="Redis" src="https://img.shields.io/badge/Redis-7-DC382D?logo=redis&logoColor=white" />

<br/>

<!-- Demonstração: substitua o GIF abaixo por um real, se desejar -->
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ramo-aleatorio/assets/main/demo-dark.gif" />
  <img alt="Demonstração do app" src="https://raw.githubusercontent.com/ramo-aleatorio/assets/main/demo-light.gif" style="max-width: 840px; border-radius: 12px;" />
</picture>

</div>

---

## Sumário

- [Arquitetura](#arquitetura)
- [Principais Recursos](#principais-recursos)
- [Requisitos](#requisitos)
- [Variáveis de Ambiente (Backend)](#variáveis-de-ambiente-backend)
- [Como Subir (Docker opcional)](#como-subir-docker-opcional)
- [Instalação e Execução](#instalação-e-execução)
- [Fluxo de Uso](#fluxo-de-uso)
- [Endpoints Principais](#endpoints-principais)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Licença](#licença)

## Arquitetura

| Camada      | Tech                       | Porta padrão | Path              |
| ----------- | -------------------------- | -----------: | ----------------- |
| Frontend    | Next.js (React + Tailwind) |         3000 | `frontend/`       |
| Backend API | FastAPI (Uvicorn)          |         8000 | `backend/`        |
| Banco       | PostgreSQL                 |         5432 | Docker (opcional) |
| Cache       | Redis                      |         6379 | Docker (opcional) |

## Principais Recursos

| Recurso                                | Status     | Detalhes                                                                 |
| -------------------------------------- | ---------- | ------------------------------------------------------------------------ |
| ✍️ Correção ortográfica e estilo (IA)  | ✅ Estável | Usa modelos configuráveis (`GEMINI_MODEL`)                                |
| 🔐 Autenticação JWT                    | ✅ Estável | `POST /api/v1/login` retorna `access_token`                               |
| 📄 Geração de `.docx`                   | ✅ Estável | Download imediato do documento                                           |
| ⚙️ Templates semânticos                | ✅ Estável | Seeds e migrações para templates                                         |
| 🚦 Healthcheck da API                  | ✅ Estável | `GET /health`                                                            |
| 🚀 Deploy local com Docker             | ✅ Estável | `docker compose up -d`                                                   |

## Requisitos

- Node.js 18+ e npm
- Python 3.10+
- (Opcional) Docker Desktop para subir Postgres e Redis rapidamente

## Variáveis de Ambiente (Backend)

Crie um arquivo `.env` dentro de `backend/` (mesmo nível de `app/`):

```env
GEMINI_API_KEY=coloque_sua_chave
GEMINI_MODEL=gemini-2.5-pro
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/formatter
REDIS_URL=redis://localhost:6379/0
JWT_SECRET=troque-este-segredo
CORS_ORIGINS=http://localhost:3000
```

> Dica: ajuste `CORS_ORIGINS` se o frontend estiver em outra origem.

## Como Subir (Docker opcional)

```bash
# Na raiz do repositório
docker compose up -d
```

- PostgreSQL disponível em `localhost:5432`
- Redis disponível em `localhost:6379`

Migração inicial (exemplo):

```bash
# psql precisa estar instalado (ou use uma GUI)
psql "postgresql://postgres:postgres@localhost:5432/formatter" -f backend/migrations/001_init.sql
```

## Instalação e Execução

### Método 1: Script Automático (Windows PowerShell)

Para iniciar todos os serviços de uma vez:

```powershell
# Na raiz do projeto
./start.ps1
```

Para parar todos os serviços:

```powershell
# Na raiz do projeto
./stop.ps1
```

### Método 2: Manual (múltiplos terminais)

1. **Terminal 1 - Banco de dados e Redis:**
```bash
docker-compose up -d
```

2. **Terminal 2 - Backend (FastAPI):**
```bash
cd backend
python -m venv .venv
# Windows PowerShell
./.venv/Scripts/Activate.ps1
# Linux/macOS
# source .venv/bin/activate

pip install -r ../requirements.txt
uvicorn app.main:app --reload --port 8000
```

3. **Terminal 3 - Frontend (Next.js):**
```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- PostgreSQL: localhost:15432
- Redis: localhost:6379

Checagem rápida da API:
```bash
curl http://localhost:8000/health
```

## Fluxo de Uso

1. Acesse `http://localhost:3000` e clique em “Abrir o App”.
2. Faça login (endpoint `POST /api/v1/login`). O token é salvo no `localStorage`.
3. Cole seu texto, selecione o modelo, ative/desative correção ortográfica e clique em “Analisar”.
4. Revise as correções e gere o `.docx`.

## Endpoints Principais

| Método | Rota                        | Descrição                             |
| ------ | --------------------------- | ------------------------------------- |
| GET    | `/health`                   | Status da API                         |
| POST   | `/api/v1/login`             | Autenticação (retorna `access_token`) |
| POST   | `/api/v1/document/analyze`  | Analisa texto (IA)                    |
| POST   | `/api/v1/document/generate` | Gera e baixa `.docx`                  |

Headers: `Authorization: Bearer <token>` para rotas de documento.

## Troubleshooting

- 401 no login: verifique usuários no banco e senha.
- Erros 5xx ao analisar/gerar: confirme `GEMINI_API_KEY`, banco/redis ativos e `.env` correto.
- CORS: ajuste `CORS_ORIGINS` no `.env` conforme seu host/porta do frontend.

## Roadmap

- [ ] Histórico de versões do documento
- [ ] Exportação adicional (`.pdf`, `.md`)
- [ ] Ajustes finos de prompts/modelos
- [ ] Perfis de usuários com papéis (RBAC)

## Licença

Uso interno/educacional. Adapte conforme sua necessidade.
