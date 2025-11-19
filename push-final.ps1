<#
 push-final.ps1
 Script interactivo para configurar el remote correcto y hacer push a GitHub.
 - Pregunta tu usuario de GitHub y el nombre del repo.
 - Elimina cualquier remote 'origin' local, añade el correcto y hace push a main.
 - Muestra errores si algo falla y sugiere pasos.
#>

Set-StrictMode -Version Latest
Clear-Host
Write-Host "--- Empujador final (configura remote y hace push) ---" -ForegroundColor Cyan

# Confirm working directory
$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $root

if (-not (Test-Path .git)) {
  Write-Host "No parece ser un repositorio git (no existe .git). Inicializando..." -ForegroundColor Yellow
  git init
  git add -A
  try { git commit -m "Initial commit - simple-static-site" } catch { Write-Host "Commit omitido (posible commit ya existente)." }
}

# Ask username and repo name (default suggestions from folder)
$suggestedRepo = Split-Path -Leaf $PWD
$username = Read-Host "Introduce tu usuario de GitHub (ej: tu_usuario). Si no lo sabes, abre github.com y mira la esquina superior derecha"
if ([string]::IsNullOrWhiteSpace($username)) {
  Write-Host "Usuario vacío — cancelando." -ForegroundColor Red; exit 1
}
$repo = Read-Host "Introduce el nombre del repositorio en GitHub (sugerido: $suggestedRepo)"
if ([string]::IsNullOrWhiteSpace($repo)) { $repo = $suggestedRepo }

$remoteUrl = "https://github.com/$username/$repo.git"
Write-Host "Usando remote: $remoteUrl" -ForegroundColor Green

Write-Host "Eliminando cualquier remote 'origin' local (si existe)..." -NoNewline
git remote remove origin 2>$null; if ($LASTEXITCODE -eq 0) { Write-Host " OK" } else { Write-Host " (no existía)" }

Write-Host "Añadiendo origin -> $remoteUrl" -ForegroundColor Cyan
git remote add origin $remoteUrl
if ($LASTEXITCODE -ne 0) { Write-Host "Fallo al añadir remote. Comprueba la URL o los permisos." -ForegroundColor Red; exit 1 }

Write-Host "Forzando nombre de rama principal a 'main'..." -ForegroundColor Cyan
git branch -M main 2>$null

Write-Host "Haciendo push a origin main..." -ForegroundColor Cyan
try {
  git push -u origin main 2>&1 | ForEach-Object { $_; }
  if ($LASTEXITCODE -eq 0) {
    Write-Host "Push completado correctamente." -ForegroundColor Green
    Write-Host "Repositorio disponible en: https://github.com/$username/$repo" -ForegroundColor Green
    Start-Process "https://github.com/$username/$repo" -ErrorAction SilentlyContinue
    exit 0
  } else {
    Write-Host "Push falló. Revisa el mensaje arriba." -ForegroundColor Red
    Write-Host "Si falta el repositorio en GitHub, crea uno con el mismo nombre y vuelve a ejecutar este script, o usa 'gh repo create'." -ForegroundColor Yellow
    exit 1
  }
} catch {
  Write-Host "Excepción durante push: $_" -ForegroundColor Red
  exit 1
}
