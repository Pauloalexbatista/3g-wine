@echo off
SETLOCAL
title 3GWINE - Luxury Wine Platform

REM Ir para a pasta do projeto
cd /d "%~dp0"

echo ===================================================
echo   3GWINE - PORTAL DE DESENVOLVIMENTO
echo ===================================================
echo.
echo [+] A abrir o seu navegador em http://localhost:3000...
echo.

REM Abre o browser imediatamente. Se o server demorar, o user faz refresh.
start http://localhost:3000

echo [+] A iniciar o servidor Next.js na porta 3000...
echo [+] (Mantenha esta janela aberta enquanto testa o site)
echo.

REM IMPORTANTE: Usar 'call' no Windows para evitar que o script feche prematuramente
call npm run dev -- -p 3000

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [!] Ocorreu um erro ao iniciar o servidor.
    echo [!] Certifique-se que o Node.js esta instalado e as dependencias carregadas.
    echo.
    pause
)
