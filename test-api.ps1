# PowerShell API Test Script for MCP Services

Write-Host "Testing MCP Services..." -ForegroundColor Cyan

# Test health endpoints
Write-Host "`n1. Health Checks:" -ForegroundColor Yellow

$services = @(
    @{Name="Orchestrator"; Port=8080},
    @{Name="Securities"; Port=8081},
    @{Name="Tax"; Port=8082},
    @{Name="Contracts"; Port=8083},
    @{Name="Jurisdiction"; Port=8084}
)

foreach ($service in $services) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:$($service.Port)/health" -Method GET -UseBasicParsing
        Write-Host "  ✓ $($service.Name) (port $($service.Port)): OK" -ForegroundColor Green
    } catch {
        Write-Host "  ✗ $($service.Name) (port $($service.Port)): Failed - $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test list tools
Write-Host "`n2. List Available Tools (Securities Agent):" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8081/mcp/tools" -Method POST -ContentType "application/json"
    $response.tools | ForEach-Object {
        Write-Host "  - $($_.name): $($_.description)" -ForegroundColor Gray
    }
} catch {
    Write-Host "  ✗ Failed to list tools: $($_.Exception.Message)" -ForegroundColor Red
}

# Test tool execution
Write-Host "`n3. Test Tool Execution (Securities Characterization):" -ForegroundColor Yellow
$body = @{
    tool = "securities_characterization_draft"
    arguments = @{
        tokenDescription = "Real estate-backed revenue token"
        jurisdictions = @("US", "EU")
    }
} | ConvertTo-Json -Depth 10

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8081/mcp/call" -Method POST -ContentType "application/json" -Body $body
    Write-Host "  ✓ Tool executed successfully" -ForegroundColor Green
    Write-Host "`n  Result:" -ForegroundColor Gray
    Write-Host "  $($response.result.content.Substring(0, [Math]::Min(200, $response.result.content.Length)))..." -ForegroundColor Gray
} catch {
    Write-Host "  ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n4. Test Orchestrator Routing:" -ForegroundColor Yellow
$routingBody = @{
    query = "What are the Howey test factors for securities?"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/route" -Method POST -ContentType "application/json" -Body $routingBody
    Write-Host "  ✓ Routed to: $($response.route_to)" -ForegroundColor Green
    Write-Host "    Escalation required: $($response.escalation.required_human_role)" -ForegroundColor Gray
} catch {
    Write-Host "  ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nDone!" -ForegroundColor Cyan
