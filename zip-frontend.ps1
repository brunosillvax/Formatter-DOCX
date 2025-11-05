Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

try {
    # Garante execução no diretório do script
    $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    Set-Location -LiteralPath $scriptDir

    $sourceDir = Join-Path $scriptDir 'frontend'
    if (-not (Test-Path -LiteralPath $sourceDir)) {
        throw "Diretório não encontrado: $sourceDir"
    }

    $destZip = Join-Path $scriptDir 'frontend.zip'
    if (Test-Path -LiteralPath $destZip) {
        Remove-Item -LiteralPath $destZip -Force
    }

    # Exclusões comuns (pastas e caches)
    $excludeRegex = '\\(node_modules|\.venv|__pycache__|\.next|dist|build|\.git|\.idea|\.vscode)\\'

    # Lista apenas arquivos válidos
    $files = Get-ChildItem -LiteralPath $sourceDir -Recurse -File |
        Where-Object { $_.FullName -notmatch $excludeRegex -and $_.Name -ne '.DS_Store' }

    if (-not $files) { throw 'Nenhum arquivo elegível para compactação foi encontrado.' }

    Compress-Archive -Path ($files.FullName) -DestinationPath $destZip -CompressionLevel Optimal -Force

    Write-Host "OK: frontend.zip gerado em $destZip" -ForegroundColor Green
}
catch {
    Write-Error $_
    exit 1
}
exit 0
