@echo off
title Git Auto-Sync Watcher
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0auto_watch.ps1"
pause
