# Auto-Sync Watcher cho GitHub
$repoPath = $PSScriptRoot
Set-Location $repoPath
$Host.UI.RawUI.WindowTitle = "Git Auto-Sync Watcher - HMK"

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "   GIT AUTO-SYNC WATCHER (Tu dong day len GitHub)  " -ForegroundColor Yellow
Write-Host "   Repository: hominhkha2k9-cmyk/HMK               " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "Dang theo doi thay doi trong thu muc: $repoPath" -ForegroundColor Gray
Write-Host "Khi ban bam Ctrl + S luu file, he thong se tu dong commit va push." -ForegroundColor Green
Write-Host "Nhan Ctrl + C de dung theo doi bat cu luc nao.`n" -ForegroundColor DarkGray

$debounceSeconds = 5

while ($true) {
    Start-Sleep -Seconds 3
    $status = git status --porcelain
    if ($status) {
        $changeCount = ($status | Measure-Object -Line).Lines
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Phat hien $changeCount tep thay doi! Cho $debounceSeconds giay de hoan tat luu..." -ForegroundColor Yellow
        Start-Sleep -Seconds $debounceSeconds
        
        $finalStatus = git status --porcelain
        if ($finalStatus) {
            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Dang git add & commit..." -ForegroundColor Cyan
            git add .
            git commit -m "auto: cap nhat ma nguon ($timestamp)"
            
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Dang push len GitHub..." -ForegroundColor Cyan
            $pushResult = git push origin main 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] >>> PUSH THANH CONG! Da cap nhat tren GitHub." -ForegroundColor Green
            } else {
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] >>> LOI KHI PUSH: $pushResult" -ForegroundColor Red
            }
            Write-Host "Tiep tuc theo doi cac thay doi moi...`n" -ForegroundColor Gray
        }
    }
}
