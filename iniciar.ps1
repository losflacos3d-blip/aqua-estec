# ==============================================================================
# Script de inicio seguro para el prototipo local de AQUA ESTEC
# - Arranca el servidor local enlazado exclusivamente a 127.0.0.1:8080
# - Abre automáticamente la web en tu navegador predeterminado
# ==============================================================================

$HostIP = "127.0.0.1"
$Port = 8080
$Url = "http://${HostIP}:${Port}"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  INICIANDO PROTOTIPO LOCAL DE AQUA ESTEC" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Directorio: $ScriptDir"
Write-Host "Dirección local: $Url" -ForegroundColor Yellow
Write-Host "Seguridad: Acceso restringido exclusivamente a este PC"
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

# Comprobar si Node.js está disponible
$NodeCmd = Get-Command node -ErrorAction SilentlyContinue

if ($NodeCmd) {
    Write-Host "Iniciando servidor local con Node.js..." -ForegroundColor Green
    Set-Location $ScriptDir
    
    # Comprobar si el puerto ya está en uso
    $PortCheck = Get-NetTCPConnection -LocalAddress $HostIP -LocalPort $Port -ErrorAction SilentlyContinue
    if ($PortCheck) {
        Write-Host "El puerto $Port ya está activo. Abriendo el navegador..." -ForegroundColor Yellow
        Start-Process $Url
        exit 0
    }

    # Iniciar servidor en segundo plano
    $Process = Start-Process node -ArgumentList "servidor.js" -WorkingDirectory $ScriptDir -PassThru
    Start-Sleep -Seconds 1
    
    # Abrir navegador
    Start-Process $Url

    Write-Host ""
    Write-Host "El prototipo está funcionando correctamente." -ForegroundColor Green
    Write-Host "Para detenerlo, ejecuta el archivo 'detener.bat' o el comando './detener.ps1'." -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "AVISO: No se detectó Node.js en la ruta del sistema." -ForegroundColor Yellow
    Write-Host "Abriendo el archivo index.html directamente en el navegador..." -ForegroundColor White
    Start-Process "$ScriptDir\index.html"
}
