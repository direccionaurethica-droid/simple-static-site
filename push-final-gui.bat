@echo off
REM push-final-gui.bat — ejecuta el script PowerShell con GUI prompts
cd /d "%~dp0"
start "Push Final GUI" powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0push-final-gui.ps1"
