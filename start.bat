@echo off
setlocal enabledelayedexpansion

echo Starting all services...
echo.

:: Start Docker containers
echo Starting Docker containers...
cd directus
if errorlevel 1 (
    echo Error: directus directory not found
    pause
    exit /b 1
)
docker-compose up -d
if errorlevel 1 (
    echo Error: Failed to start Docker containers
    pause
    exit /b 1
)
cd ..

:: Start Node server in background
echo Starting Node server...
cd server
if errorlevel 1 (
    echo Error: server directory not found
    pause
    exit /b 1
)
start /B npm run start
cd ..

:: Start frontend app in background
echo Starting frontend application...
cd Lingua
if errorlevel 1 (
    echo Error: Lingua directory not found
    pause
    exit /b 1
)
start /B npm run dev
cd ..

echo.
echo ========================================
echo  All services started successfully!
echo ========================================
echo.
echo  Press CTRL+C to stop all services

:: Keep the window open
pause >nul