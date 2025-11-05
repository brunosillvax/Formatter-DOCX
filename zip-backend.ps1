Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

try {
    # Garante execução no diretório do script
    $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    Set-Location -LiteralPath $scriptDir

    $sourceDir = Join-Path $scriptDir 'backend'
    if (-not (Test-Path -LiteralPath $sourceDir)) {
        throw "Diretório não encontrado: $sourceDir"
    }

    $destZip = Join-Path $scriptDir 'backend.zip'
    if (Test-Path -LiteralPath $destZip) {
        Remove-Item -LiteralPath $destZip -Force
    }

    # Fecha processos que podem bloquear arquivos (silencioso)
    Stop-Process -Name uvicorn -Force -ErrorAction SilentlyContinue
    Stop-Process -Name python -Force -ErrorAction SilentlyContinue
    Stop-Process -Name python3 -Force -ErrorAction SilentlyContinue

    # Exclusões comuns (pastas e caches)
    $excludeRegex = '\\(node_modules|\.venv|__pycache__|\.mypy_cache|\.pytest_cache|\.next|dist|build|\.git|\.idea|\.vscode)\\'

    # Lista apenas arquivos válidos do diretório backend
    $files = Get-ChildItem -LiteralPath $sourceDir -Recurse -File |
        Where-Object { $_.FullName -notmatch $excludeRegex -and $_.Extension -ne '.pyc' -and $_.Name -ne '.DS_Store' }

    if (-not $files) { throw 'Nenhum arquivo elegível para compactação foi encontrado.' }

    # Incluir requirements.txt na raiz do ZIP (necessário para build na Square Cloud)
    $extra = @()
    $requirements = Join-Path $scriptDir 'requirements.txt'
    if (Test-Path -LiteralPath $requirements) {
        $extra += $requirements
    } else {
        Write-Warning 'requirements.txt não encontrado na raiz do projeto. O build na Square pode falhar.'
    }

    $pathsToZip = @()
    $pathsToZip += $files.FullName
    $pathsToZip += $extra

    Compress-Archive -Path $pathsToZip -DestinationPath $destZip -CompressionLevel Optimal -Force

    Write-Host "OK: backend.zip gerado em $destZip" -ForegroundColor Green
}
catch {
    Write-Error $_
    exit 1
}
exit 0
