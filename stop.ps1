# Parar processos do Node.js (frontend)
Write-Host "Parando Frontend..." -ForegroundColor Yellow
taskkill /F /IM node.exe 2>$null

# Parar processos Python (backend)
Write-Host "Parando Backend..." -ForegroundColor Yellow
taskkill /F /IM python.exe 2>$null

# Parar Docker Compose
Write-Host "Parando Docker Compose..." -ForegroundColor Yellow
docker-compose down

Write-Host "`nTodos os serviços foram parados!" -ForegroundColor Green