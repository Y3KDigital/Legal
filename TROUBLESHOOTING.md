# Troubleshooting

## Docker Build Fails: `npm ci` Error

**Problem**: `npm ci --only=production` fails because `package-lock.json` doesn't exist yet.

**Solution**: Dockerfile now uses `npm install` instead of `npm ci`.

## Port 8080 Already Allocated

**Problem**: `Bind for 0.0.0.0:8080 failed: port is already allocated`

**Solution**:

### Find what's using port 8080:
```powershell
netstat -ano | Select-String "8080"
```

### Kill the process:
```powershell
Stop-Process -Id <PID> -Force
```

### Or change orchestrator port:
Edit `docker-compose.yml`:
```yaml
mcp-orchestrator:
  ports:
    - "8090:8080"  # Changed from 8080:8080
```

Then restart:
```powershell
docker-compose down
docker-compose up -d
```

## Services Won't Start

### Check logs:
```powershell
docker-compose logs mcp-securities
docker-compose logs --tail=50 --follow
```

### Restart a specific service:
```powershell
docker-compose restart mcp-securities
```

### Rebuild and restart:
```powershell
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## PowerShell `curl` Command Fails

**Problem**: PowerShell's `curl` is an alias for `Invoke-WebRequest` with different syntax.

**Solution**: Use the provided `test-api.ps1` script, or use `Invoke-RestMethod`:

```powershell
$body = @{
    tool = "securities_characterization_draft"
    arguments = @{
        tokenDescription = "Real estate token"
        jurisdictions = @("US")
    }
} | ConvertTo-Json -Depth 10

$response = Invoke-RestMethod `
    -Uri "http://localhost:8081/mcp/call" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body

Write-Host $response.result.content
```

## Service Health Check Fails

### Verify service is running:
```powershell
docker-compose ps
```

### Check if port is reachable:
```powershell
Test-NetConnection -ComputerName localhost -Port 8081
```

### Inspect container:
```powershell
docker logs legal-mcp-securities
docker exec -it legal-mcp-securities sh
```

## YAML Validation Errors

### Validate state machines:
```powershell
pip install pyyaml jsonschema
python -c "import yaml; yaml.safe_load(open('compliance/state_machines/rwa_issuance.yaml'))"
```

### Validate policy packs:
```powershell
python -c "import yaml; yaml.safe_load(open('compliance/policy_packs/us.yaml'))"
```

## Permission Denied on GitHub Push

**Problem**: `Permission to Y3KDigital/Legal.git denied to kevanbtc`

**Solution**: Ensure GitHub CLI is authenticated as the correct user:

```powershell
gh auth status
gh auth switch  # Switch between accounts if needed
gh auth setup-git -h github.com
```

## Docker Images "Already Exist" Error

**Solution**:
```powershell
docker-compose down --rmi local
docker-compose build --no-cache
docker-compose up -d
```

## Need to Reset Everything

```powershell
# Stop and remove containers, networks, and images
docker-compose down --rmi local --volumes

# Rebuild from scratch
docker-compose build --no-cache

# Start services
docker-compose up -d

# Verify
docker-compose ps
.\test-api.ps1
```
