
@echo off
REM push-final.bat — ejecuta el script PowerShell interactivo para configurar remote y push
cd /d "%~dp0"
REM Abrir en nueva ventana de PowerShell y mantenerla abierta para ver prompts y errores
start "Push Final" powershell -NoExit -NoProfile -ExecutionPolicy Bypass -File "%~dp0push-final.ps1"
