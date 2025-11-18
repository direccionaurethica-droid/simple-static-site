Param(
  [int]$Port = 8081
)
$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $root
if (Get-Command node -ErrorAction SilentlyContinue) {
  $env:PORT = $Port
  Write-Host "Iniciando servidor Node en puerto $Port..."
  node server.js
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
  Write-Host "Iniciando servidor Python desde carpeta src en puerto $Port..."
  Push-Location src
  python -m http.server $Port
  Pop-Location
} else {
  Write-Host "No se encontró ni node ni python. Instala Node.js o Python y vuelve a intentarlo." -ForegroundColor Yellow
}
