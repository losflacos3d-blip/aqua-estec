# ==============================================================================
# Script de parada segura del servidor local de AQUA ESTEC
# ==============================================================================

$Port = 8080
$HostIP = "127.0.0.1"

Write-Host ""
Write-Host "Buscando procesos del servidor en el puerto $Port ($HostIP)..." -ForegroundColor Cyan

$Connections = Get-NetTCPConnection -LocalAddress $HostIP -LocalPort $Port -ErrorAction SilentlyContinue

if ($Connections) {
    foreach ($conn in $Connections) {
        $pidToKill = $conn.OwningProcess
        if ($pidToKill -gt 0) {
            try {
                Stop-Process -Id $pidToKill -Force -ErrorAction SilentlyContinue
                Write-Host "Servidor detenido correctamente (Proceso ID: $pidToKill)." -ForegroundColor Green
            } catch {
                Write-Host "No se pudo detener el proceso ID: $pidToKill." -ForegroundColor Red
            }
        }
    }
} else {
    Write-Host "No se encontró ningún servidor activo en $HostIP:$Port." -ForegroundColor Yellow
}

Write-Host "El prototipo local está detenido." -ForegroundColor White
Write-Host ""
