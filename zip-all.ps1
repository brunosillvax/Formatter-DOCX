Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

try {
    $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    Set-Location -LiteralPath $scriptDir

    if (-not (Test-Path -LiteralPath './zip-backend.ps1')) { throw 'zip-backend.ps1 não encontrado.' }
    if (-not (Test-Path -LiteralPath './zip-frontend.ps1')) { throw 'zip-frontend.ps1 não encontrado.' }

    # Limpa zips antigos
    Remove-Item -LiteralPath './backend.zip' -Force -ErrorAction SilentlyContinue
    Remove-Item -LiteralPath './frontend.zip' -Force -ErrorAction SilentlyContinue

    # Gera cada zip separadamente
    & powershell -NoProfile -ExecutionPolicy Bypass -File ./zip-backend.ps1
    & powershell -NoProfile -ExecutionPolicy Bypass -File ./zip-frontend.ps1

    if (-not (Test-Path -LiteralPath './backend.zip')) { throw 'Falhou ao gerar backend.zip' }
    if (-not (Test-Path -LiteralPath './frontend.zip')) { throw 'Falhou ao gerar frontend.zip' }

    Write-Host 'OK: Zips prontos: backend.zip e frontend.zip' -ForegroundColor Green
}
catch {
    Write-Error $_
    exit 1
}
exit 0
