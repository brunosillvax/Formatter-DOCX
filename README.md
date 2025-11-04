# Formatter DOCX

Plataforma web para analisar texto com IA, aplicar correções e gerar documentos `.docx` prontos em segundos.

## Arquitetura

| Camada      | Tech                       | Porta padrão | Path              |
| ----------- | -------------------------- | -----------: | ----------------- |
| Frontend    | Next.js (React + Tailwind) |         3000 | `frontend/`       |
| Backend API | FastAPI (Uvicorn)          |         8000 | `backend/`        |
| Banco       | PostgreSQL                 |         5432 | Docker (opcional) |
| Cache       | Redis                      |         6379 | Docker (opcional) |

## Requisitos

- Node.js 18+ e npm
- Python 3.10+
- (Opcional) Docker Desktop para subir Postgres e Redis rapidamente

## Variáveis de ambiente (backend)

Crie um arquivo `.env` dentro de `backend/` (mesmo nível de `app/`):

```env
GEMINI_API_KEY=coloque_sua_chave
GEMINI_MODEL=gemini-2.5-pro
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/formatter
REDIS_URL=redis://localhost:6379/0
JWT_SECRET=troque-este-segredo
CORS_ORIGINS=http://localhost:3000
```

## Subindo dependências (Docker opcional)

```bash
# Na raiz do repositório
docker compose up -d
```

- PostgreSQL disponível em `localhost:5432`
- Redis disponível em `localhost:6379`

Execute a migration inicial (opcional, exemplo):

```bash
# psql precisa estar instalado (ou use uma GUI)
psql "postgresql://postgres:postgres@localhost:5432/formatter" -f backend/migrations/001_init.sql
```

## Instalação e execução

### Método 1: Script Automático (Windows PowerShell)

Para iniciar todos os serviços de uma vez:

```powershell
# Na raiz do projeto
.\start.ps1
```

Para parar todos os serviços:

```powershell
# Na raiz do projeto
.\stop.ps1
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
.\.venv\Scripts\Activate.ps1
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

## Fluxo de uso

1. Acesse `http://localhost:3000` e clique em “Abrir o App”.
2. Faça login (endpoint `POST /api/v1/login`). O token é salvo no `localStorage`.
3. Cole seu texto, selecione modelo, ative/desative correção ortográfica e clique em “Analisar”.
4. Revise as correções e gere o `.docx`.

## Endpoints principais

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

## Scripts úteis

- Frontend
  - `npm run dev`: ambiente de desenvolvimento
  - `npm run build && npm start`: produção local
- Backend
  - `uvicorn app.main:app --host 0.0.0.0 --port 8000`

## Licença

Uso interno/educacional. Adapte conforme sua necessidade.
