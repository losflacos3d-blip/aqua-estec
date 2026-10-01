@echo off
title AQUA ESTEC - Iniciar Prototipo Local
cd /d "%~dp0"
echo ==========================================================
echo   Iniciando Prototipo Local de AQUA ESTEC...
echo ==========================================================
powershell -ExecutionPolicy Bypass -File "%~dp0iniciar.ps1"
pause
