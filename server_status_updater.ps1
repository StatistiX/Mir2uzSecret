# ==============================================================================
# LEGEND OF MIR 2 UZ SECRET - AUTOMATIC REAL-TIME SERVER STATUS & PLAYER COUNT UPDATER
# Designed for Windows Game Server machine - Synced directly to live website www.mir2.uz
# ==============================================================================

# --- [CONFIGURATIONS] ---
$ServerPort = 7000             # Login Gate/Status port to check if online
$GamePort = 7200               # Game Port where players connect (used to count players dynamically)
$PlayersMax = 1000             # Maximum players capacity
$UpdateIntervalSeconds = 10    # Time in seconds between updates

# --- [FIREBASE DIRECT SYNC CONFIGS] ---
$FirebaseProjectId = "legendofmir2uzsecret"
$FirebaseAPIKey = "AIzaSyDLy0MoIvsY5QxdOre5jI9kJRmjslSd7Mg"

# --- [ALTERNATIVE PLAYER COUNT METHODS] ---
$UseTextFileOverride = $false  # Set to $true if you want to read players from a local file instead of TCP connections
$TextFileOverridePath = "C:\Mir2\M2Server\online.txt"

# ------------------------------------------------------------------------------
# Clear screen & Premium ASCII Medieval Header
Clear-Host
Write-Host "==========================================================================" -ForegroundColor Yellow
Write-Host "                LEGEND OF MIR 2 UZ SECRET - SERVER DAEMON                  " -ForegroundColor Crimson -BackgroundColor Black
Write-Host "         Dynamic Real-time status syncing engine for www.mir2.uz          " -ForegroundColor DarkYellow
Write-Host "==========================================================================" -ForegroundColor Yellow
Write-Host "Configured Login Port   : $ServerPort" -ForegroundColor Gray
Write-Host "Configured Game Port    : $GamePort (TCP connection counter active)" -ForegroundColor Gray
Write-Host "Firebase Cloud Database : $FirebaseProjectId" -ForegroundColor Green
Write-Host "Update Frequency        : Every $UpdateIntervalSeconds seconds" -ForegroundColor Gray
Write-Host "Press Ctrl + C to stop the updater daemon at any time." -ForegroundColor DarkRed
Write-Host "--------------------------------------------------------------------------" -ForegroundColor Yellow

$uri = "https://firestore.googleapis.com/v1/projects/$FirebaseProjectId/databases/(default)/documents/server_status/status?key=$FirebaseAPIKey"

# Daemon Infinite Loop
while ($true) {
    try {
        # 1. CHECK IF LOGIN PORT IS OPEN LOCALLY (Online/Offline Check)
        $portCheck = Test-NetConnection -ComputerName "127.0.0.1" -Port $ServerPort -InformationLevel Quiet -WarningAction SilentlyContinue -ErrorAction SilentlyContinue
        
        $isOnline = $false
        $playersCount = 0
        
        if ($portCheck) {
            $isOnline = $true
            
            # 2. CALCULATE PLAYERS ONLINE
            if ($UseTextFileOverride) {
                # Method A: Read from text file override
                if (Test-Path $TextFileOverridePath) {
                    $fileContent = Get-Content -Path $TextFileOverridePath -TotalCount 1 -ErrorAction SilentlyContinue
                    if ($fileContent -as [int]) {
                        $playersCount = [int]$fileContent
                    }
                } else {
                    Write-Host "[Warning] Player override file not found at $TextFileOverridePath! Falling back to TCP." -ForegroundColor Red
                }
            } else {
                # Method B: Smart TCP Connection Count (Counts actual established client connections on GamePort)
                # Standard and robust for M2Server setups!
                $tcpConnections = Get-NetTCPConnection -State Established -LocalPort $GamePort -ErrorAction SilentlyContinue
                if ($tcpConnections) {
                    $playersCount = $tcpConnections.Count
                }
            }
        }
        
        # 3. COMPILE DATA AND PUSH TO FIREBASE FIRESTORE
        $body = @{
            fields = @{
                online = @{ booleanValue = [bool]$isOnline }
                playersOnline = @{ integerValue = [int]$playersCount }
                playersMax = @{ integerValue = [int]$PlayersMax }
            }
        } | ConvertTo-Json -Depth 5
        
        # Call REST API (Patch updates or creates the document instantly)
        $response = Invoke-RestMethod -Uri $uri -Method Patch -Body $body -ContentType "application/json" -ErrorAction Stop
        
        # 4. PRINT BEAUTIFUL STATUS LOG IN CONSOLE
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        if ($isOnline) {
            Write-Host "[$timestamp] status: " -NoNewline -ForegroundColor Gray
            Write-Host "ONLINE " -NoNewline -ForegroundColor Green -BackgroundColor Black
            Write-Host " | players: " -NoNewline -ForegroundColor Gray
            Write-Host "$playersCount / $PlayersMax" -NoNewline -ForegroundColor Gold
            Write-Host " | Sync Successful ✅" -ForegroundColor DarkGreen
        } else {
            Write-Host "[$timestamp] status: " -NoNewline -ForegroundColor Gray
            Write-Host "OFFLINE 🛑" -NoNewline -ForegroundColor Crimson -BackgroundColor Black
            Write-Host " | Sync Successful ✅" -ForegroundColor DarkGreen
        }
        
    } catch {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        Write-Host "[$timestamp] Sync Error: " -NoNewline -ForegroundColor Crimson
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
    
    # Wait for the next cycle
    Start-Sleep -Seconds $UpdateIntervalSeconds
}
