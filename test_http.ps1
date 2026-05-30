try {
    $res = Invoke-WebRequest -Uri "http://mir2.uz" -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
    Write-Output "HTTP Status: $($res.StatusCode)"
    Write-Output "Headers: $($res.Headers | Out-String)"
} catch {
    Write-Output "Error visiting http://mir2.uz : $_"
}

try {
    $res = Invoke-WebRequest -Uri "http://www.mir2.uz" -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
    Write-Output "HTTP (www) Status: $($res.StatusCode)"
} catch {
    Write-Output "Error visiting http://www.mir2.uz : $_"
}
