@echo off
REM make-zip.bat — crea un ZIP del proyecto en la raiz
cd /d "%~dp0"
set ZIPNAME=simple-static-site.zip
where powershell >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo PowerShell no encontrado. No se puede crear ZIP automaticamente.
  pause
  exit /b 1
)
echo Creando %ZIPNAME% ...
powershell -Command "Compress-Archive -Path (Get-ChildItem -Path . -Force | Where-Object { $_.Name -ne '%ZIPNAME%' }) -DestinationPath '%ZIPNAME%' -Force"
if %ERRORLEVEL%==0 (
  echo ZIP creado: %ZIPNAME%
) else (
  echo Error creando ZIP.
)
pause
