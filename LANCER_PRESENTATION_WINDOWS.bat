@echo off
setlocal
cd /d "%~dp0"
title Fiducial FPSG - Soutenance interactive

echo.
echo =============================================
echo   Fiducial FPSG - Soutenance interactive
echo =============================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo ERREUR : Node.js n'est pas installe sur cet ordinateur.
  echo Installe Node.js LTS, puis relance ce fichier.
  echo Site : https://nodejs.org/
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo ERREUR : npm n'est pas disponible.
  echo Reinstalle Node.js LTS, puis relance ce fichier.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installation des dependances - premiere ouverture uniquement...
  call npm install
  if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERREUR : npm install a echoue.
    pause
    exit /b 1
  )
)

echo Lancement du serveur local...
start "Fiducial FPSG Server" /min cmd /k "cd /d "%~dp0" && npm run dev"

echo Ouverture dans Chrome / navigateur par defaut...
timeout /t 5 >nul
start "" "http://localhost:5173"

echo.
echo La presentation est ouverte ici : http://localhost:5173
echo Ne ferme pas la fenetre serveur avant la fin de la soutenance.
echo.
endlocal
exit /b 0
