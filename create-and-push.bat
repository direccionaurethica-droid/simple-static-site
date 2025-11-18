@echo off
REM create-and-push.bat — inicializa git, crea commit y usa gh para crear repo remoto si está autenticado
cd /d "%~dp0"
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo Git no esta instalado. Instala Git antes de usar este script.
  pause
  exit /b 1
)
if not exist .git (
  echo Inicializando repositorio git...
  git init
  git add -A
  git commit -m "Initial commit - simple-static-site" --author="autodeploy <autodeploy@example.com>" 2>nul
) else (
  echo Repositorio git ya inicializado.
)

where gh >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo GitHub CLI (gh) no instalado. Si quieres crear el repo remoto instala gh y autenticalo con 'gh auth login'.
  echo Comandos para manualmente crear repo y push:
  echo   git remote add origin https://github.com/USERNAME/REPO.git
  echo   git push -u origin main
  pause
  exit /b 0
)

echo Verificando estado de autenticacion gh...
gh auth status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo gh no autenticado. Ejecuta 'gh auth login' e intenta de nuevo.
  pause
  exit /b 0
)

echo Creando repo en GitHub y empujando...
gh repo create --public --source=. --remote=origin --push
if %ERRORLEVEL%==0 (
  echo Repo creado y push realizado.
) else (
  echo Hubo un error al crear el repo o hacer push. Revisa la salida de gh.
)
pause
