Write-Host "Testing MCP Services..." -ForegroundColor Cyan

Write-Host "`n1. Health Checks:" -ForegroundColor Yellow

$services = @(
    @{Name="Securities"; Port=8081},
    @{Name="Tax"; Port=8082},
    @{Name="Contracts"; Port=8083},
    @{Name="Jurisdiction"; Port=8084}
)

foreach ($service in $services) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:$($service.Port)/health" -Method GET -UseBasicParsing -TimeoutSec 2
        Write-Host "  [OK] $($service.Name) (port $($service.Port))" -ForegroundColor Green
    } catch {
        Write-Host "  [FAIL] $($service.Name) (port $($service.Port)): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n2. Test Tool (Securities Characterization):" -ForegroundColor Yellow
$body = @{
    tool = "securities_characterization_draft"
    arguments = @{
        tokenDescription = "Real estate-backed revenue token"
        jurisdictions = @("US", "EU")
    }
} | ConvertTo-Json -Depth 10

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8081/mcp/call" -Method POST -ContentType "application/json" -Body $body -TimeoutSec 5
    Write-Host "  [OK] Tool executed successfully" -ForegroundColor Green
    Write-Host "  Result type: $($response.result.type)" -ForegroundColor Gray
} catch {
    Write-Host "  [FAIL] $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nDone!" -ForegroundColor Cyan
