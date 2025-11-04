# Iniciar Docker Compose
Write-Host "Iniciando Docker Compose..." -ForegroundColor Green
docker-compose up -d

# Esperar um pouco para os serviços iniciarem
Start-Sleep -Seconds 2

# Iniciar Backend
Write-Host "Iniciando Backend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; .\.venv\Scripts\Activate.ps1; uvicorn app.main:app --reload --port 8000"

# Esperar o backend iniciar
Start-Sleep -Seconds 3

# Iniciar Frontend
Write-Host "Iniciando Frontend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "`nServiços iniciados:" -ForegroundColor Cyan
Write-Host "- Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "- Backend: http://localhost:8000" -ForegroundColor Yellow
Write-Host "- Banco de dados: localhost:15432" -ForegroundColor Yellow
Write-Host "- Redis: localhost:6379" -ForegroundColor Yellow