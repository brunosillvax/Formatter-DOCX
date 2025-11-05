# Uso: Execute no PowerShell na raiz do projeto
# - Faz login (se necessário) e realiza deploy do backend e do frontend

Write-Host "===> Deploy Square Cloud (backend)" -ForegroundColor Cyan
Set-Location backend
squarecloud deploy

Write-Host "===> Deploy Square Cloud (frontend)" -ForegroundColor Cyan
Set-Location ../frontend
squarecloud deploy

Write-Host "Pronto. Ajuste as variáveis no painel (NEXT_PUBLIC_API_URL e FRONTEND_ORIGIN) e reinicie os apps." -ForegroundColor Green


