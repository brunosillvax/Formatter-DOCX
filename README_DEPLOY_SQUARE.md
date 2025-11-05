# Deploy na Square Cloud

Este guia publica o backend (FastAPI) e o frontend (Next.js) em dois apps separados na Square Cloud.

## Pré‑requisitos
- Node.js 18+ e npm
- Python 3.10+
- Conta na Square Cloud e CLI instalada (`npm i -g @squarecloud/cli`)

## Variáveis importantes
- Backend: `FRONTEND_ORIGIN` → URL pública do frontend (ex.: https://seu-frontend.square.app)
- Frontend: `NEXT_PUBLIC_API_URL` → URL pública do backend (ex.: https://seu-backend.square.app)

## Passos rápidos
1. Login na Square Cloud
```bash
squarecloud login
```

2. Deploy do backend
```bash
cd backend
squarecloud deploy
```
- Depois do deploy, copie a URL pública gerada (ex.: https://seu-backend.square.app)

3. Deploy do frontend
```bash
cd ../frontend
# Ajuste a env NEXT_PUBLIC_API_URL no painel da Square para a URL do backend
squarecloud deploy
```

4. Ajuste de variáveis no painel
- No app do frontend, defina `NEXT_PUBLIC_API_URL`.
- No app do backend, defina `FRONTEND_ORIGIN` com a URL do frontend.
- Reinicie cada app após salvar as envs.

## Scripts e arquivos adicionados
- `backend/squarecloud.app.yaml` → build/start backend + CORS via env
- `frontend/squarecloud.app.yaml` → build/start frontend + env pública da API
- `square-deploy.ps1` → script opcional para automatizar deploy local (Windows PowerShell)

## Problemas comuns
- CORS: verifique `FRONTEND_ORIGIN` (deve casar 100% com a URL do frontend)
- Porta: o `start` do Next usa `$PORT`, exigido pela Square
- Cache: se o frontend não vê a API, confirme `NEXT_PUBLIC_API_URL` e reimplante


