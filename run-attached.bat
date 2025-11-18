@echo off
REM run-attached.bat — sirve simple-static-website\src en el puerto 8080 y abre el navegador
cd /d "%~dp0"
set TARGET=simple-static-website\src
set PORT=8080
if exist "%TARGET%" (
  where node >nul 2>&1
  if %ERRORLEVEL%==0 (
    echo Iniciando con Node (http-server) en una nueva ventana en puerto %PORT%...
    start "Servidor" cmd /c "npx --yes http-server "%TARGET%" -p %PORT%"
    timeout /t 1 >nul
    start "" "http://localhost:%PORT%"
    goto :eof
  )
  where python >nul 2>&1
  if %ERRORLEVEL%==0 (
    echo Iniciando servidor Python desde %TARGET% en una nueva ventana en puerto %PORT%...
    start "Servidor" cmd /c "pushd "%TARGET%" & python -m http.server %PORT%"
    timeout /t 1 >nul
    start "" "http://localhost:%PORT%"
    goto :eof
  )
  echo No se encontró ni node ni python en PATH. Instala Node.js o Python y vuelve a intentarlo.
) else (
  echo Carpeta %TARGET% no encontrada. Asegurate de que existe.
)
pause

