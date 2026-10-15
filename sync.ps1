param (
    [string]$Message = ""
)

$repoPath = $PSScriptRoot
Set-Location $repoPath
$Host.UI.RawUI.WindowTitle = "Đồng bộ GitHub - HMK"

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "      DONG BO THAY DOI LEN GITHUB (HMK)            " -ForegroundColor Yellow
Write-Host "      Repository: hominhkha2k9-cmyk/HMK            " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

$status = git status --porcelain
if (-not $status) {
    Write-Host "[THONG BAO] Khong co thay doi nao can day len GitHub!" -ForegroundColor Yellow
    Write-Host "Nhan Enter de thoat..." -ForegroundColor Gray
    Read-Host
    exit 0
}

if ([string]::IsNullOrWhiteSpace($Message)) {
    $now = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $Message = "Update: $now"
}

Write-Host "1. Dang them cac tep thay doi (git add .)..." -ForegroundColor Gray
git add .

Write-Host "2. Dang tao commit: `"$Message`"..." -ForegroundColor Gray
git commit -m $Message

Write-Host "3. Dang day code len GitHub (git push origin main)..." -ForegroundColor Cyan
$pushOutput = git push origin main 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "===================================================" -ForegroundColor Green
    Write-Host " [THANH CONG] Da dong bo len GitHub hoan tat!" -ForegroundColor Green
    Write-Host " Xem tai: https://github.com/hominhkha2k9-cmyk/HMK" -ForegroundColor Green
    Write-Host "===================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "[THAT BAI] Co loi xay ra khi day len GitHub:" -ForegroundColor Red
    Write-Host $pushOutput -ForegroundColor Red
}

Write-Host ""
Write-Host "Nhan Enter de dong cua so..." -ForegroundColor Gray
Read-Host
