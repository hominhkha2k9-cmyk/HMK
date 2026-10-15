@echo off
chcp 65001 >nul
title Tự động đồng bộ GitHub - HMK
cd /d "%~dp0"

echo ===================================================
echo     DONG BO THAY DOI LEN GITHUB (HMK)
echo ===================================================
echo.

git status --porcelain > "%temp%\git_status.tmp"
for %%I in ("%temp%\git_status.tmp") do set size=%%~zI

if %size% EQU 0 (
    echo [THONG BAO] Khong co thay doi nao can day len GitHub!
    del "%temp%\git_status.tmp" >nul 2>&1
    echo.
    pause
    exit /b 0
)
del "%temp%\git_status.tmp" >nul 2>&1

set "msg=%~1"
if "%msg%"=="" (
    for /f "tokens=1-3 delims=/ " %%a in ("%date%") do set mydate=%%a-%%b-%%c
    set "msg=Update: %date% %time%"
)

echo Dang them cac tap tin thay doi...
git add .

echo Dang tao commit: "%msg%"...
git commit -m "%msg%"

echo.
echo Dang day code len GitHub (origin/main)...
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===================================================
    echo  [THANH CONG] Da dong bo len GitHub hoan tat!
    echo  Repository: https://github.com/hominhkha2k9-cmyk/HMK
    echo ===================================================
) else (
    echo.
    echo [THAT BAI] Co loi xay ra khi day len GitHub.
)

echo.
pause
