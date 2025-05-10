@echo off
setlocal enabledelayedexpansion

echo Starting all services...
echo.

:: Initialize error flag
set "errorOccurred=0"

:: Start Docker containers
echo Starting Docker containers...
cd directus
if errorlevel 1 (
    echo Error: directus directory not found
    set "errorOccurred=1"
    goto :errorhandler
)
docker-compose up -d
if errorlevel 1 (
    echo Error: Failed to start Docker containers
    set "errorOccurred=1"
    goto :errorhandler
)
cd ..

:: Start Node server
echo Starting Node server...
cd server
if errorlevel 1 (
    echo Error: server directory not found
    set "errorOccurred=1"
    goto :errorhandler
)
start "Node Server" cmd /c "npm run dev"
cd ..

:: Start frontend app
echo Starting frontend application...
cd Lingua
if errorlevel 1 (
    echo Error: Lingua directory not found
    set "errorOccurred=1"
    goto :errorhandler
)
start "Frontend App" cmd /c "npm run dev"
cd ..

:: If we reached here, everything succeeded
echo.
echo ========================================
echo  All services started successfully!
echo ========================================
echo.
echo  Press any key to exit...
pause >nul
exit /b 0

:errorhandler
echo.
echo ========================================
echo  ERROR: One or more services failed to start
echo ========================================
echo.
pause
exit /b 1