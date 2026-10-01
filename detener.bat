@echo off
title AQUA ESTEC - Detener Prototipo Local
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "%~dp0detener.ps1"
pause
