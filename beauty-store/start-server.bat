@echo off
chcp 65001 >nul
echo ==========================================
echo   VELOURA BEAUTY - Starting Server
echo ==========================================
echo.

REM Check if we're in the right folder (has index.html)
if not exist "index.html" (
    echo ERROR: index.html not found in this folder!
    echo.
    echo Current folder: %cd%
    echo.
    echo Checking for nested beauty-store folder...
    if exist "beauty-store\index.html" (
        echo Found nested folder! Moving into it...
        cd beauty-store
        echo Now in: %cd%
    ) else (
        echo ERROR: Cannot find index.html anywhere!
        echo Please make sure you extracted the ZIP correctly.
        pause
        exit /b 1
    )
)

echo Found index.html in: %cd%
echo.

REM Try different methods to start server
echo Trying to start server...
echo.

py -m http.server 5500 >nul 2>&1
if %errorlevel% equ 0 (
    echo Server started at http://localhost:5500
    start http://localhost:5500
    pause
    exit /b 0
)

python -m http.server 5500 >nul 2>&1
if %errorlevel% equ 0 (
    echo Server started at http://localhost:5500
    start http://localhost:5500
    pause
    exit /b 0
)

python3 -m http.server 5500 >nul 2>&1
if %errorlevel% equ 0 (
    echo Server started at http://localhost:5500
    start http://localhost:5500
    pause
    exit /b 0
)

echo Python not found. Trying Node.js...

npx serve -l 5500 >nul 2>&1
if %errorlevel% equ 0 (
    echo Server started at http://localhost:5500
    start http://localhost:5500
    pause
    exit /b 0
)

echo.
echo ==========================================
echo   ERROR: No server found!
echo ==========================================
echo.
echo Please install one of the following:
echo 1. Python: https://www.python.org/downloads/
echo    (Check "Add Python to PATH" during install)
echo 2. Node.js: https://nodejs.org/
echo.
echo OR use VS Code with Live Server extension.
echo.
pause
