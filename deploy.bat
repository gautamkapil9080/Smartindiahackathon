@echo off
echo ========================================
echo   Rural Healthcare MVP - Quick Deploy
echo   Updated with Home Tab Features  
echo ========================================
echo.

echo 🔧 Installing dependencies...
call npm install

echo.
echo 🏗️  Building the project...
call npm run build

echo.
echo 🚀 Deploying to GitHub Pages...
call npm run deploy-manual

echo.
echo ✅ Deployment process completed!
echo 🌐 Your updated demo will be available at:
echo    https://gautamkapil9080.github.io/SIH-MVP/working-demo.html
echo.
echo 🏠 New Features Added:
echo    ✓ Home Tab with 6 portal buttons
echo    ✓ Pharmacy Portal
echo    ✓ Standalone Symptom Checker  
echo    ✓ Government Schemes
echo    ✓ Enhanced Emergency Services
echo.
echo 🕒 Please wait 2-3 minutes for GitHub Pages to update
pause