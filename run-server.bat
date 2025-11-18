@echo off
REM run-server.bat — intenta arrancar node server.js en PORT 8081, si no está node usa Python para servir ./src
cd /d "%~dp0"
where node >nul 2>&1
if %ERRORLEVEL%==0 (
  echo Iniciando servidor Node en puerto 8081...
  set PORT=8081
  node server.js
  goto :eof
)
where python >nul 2>&1
if %ERRORLEVEL%==0 (
  echo Iniciando servidor Python desde carpeta src en puerto 8081...
  pushd src
  python -m http.server 8081
  popd
  goto :eof
)
echo No se encontró ni node ni python en PATH. Instala Node.js o Python y vuelve a intentarlo.
pause
