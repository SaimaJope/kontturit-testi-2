@echo off
setlocal
cd /d "%~dp0"
set "ASTRO_TELEMETRY_DISABLED=1"
set "KONTTURI_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not exist "%KONTTURI_NODE%" set "KONTTURI_NODE=node"
"%KONTTURI_NODE%" node_modules\astro\bin\astro.mjs dev --host 127.0.0.1
if errorlevel 1 (
  echo Sivuston kaynnistys ei onnistunut. Katso README.md.
  pause
  exit /b 1
)
start "" "http://127.0.0.1:4321"
