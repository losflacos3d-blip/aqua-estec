@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo No se encuentra Node.js. Consulta README.md.
  pause
  exit /b 1
)
node server.mjs
if errorlevel 1 pause
