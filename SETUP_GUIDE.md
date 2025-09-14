# 🚀 Quick Setup Guide - Rural Healthcare MVP

## Prerequisites Checklist
- [ ] Node.js 16+ installed
- [ ] npm or yarn package manager
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] Modern web browser

## 🎯 One-Command Setup
```bash
# Clone and setup in one go
git clone https://github.com/gautamkapil9080/Smartindiahackathon.git
cd Smartindiahackathon
npm install
npm start
```

## 📁 Project Structure Overview
```
Smartindiahackathon/
├── 📂 src/
│   ├── 📂 components/       # React components
│   │   ├── LandingPage.tsx
│   │   ├── PatientDashboard.tsx
│   │   ├── DoctorDashboard.tsx
│   │   └── ...
│   ├── 📂 services/         # Business logic
│   │   ├── aiService.ts
│   │   ├── firestoreService.ts
│   │   └── ...
│   ├── 📂 contexts/         # React contexts
│   │   └── AuthContext.tsx
│   └── App.tsx             # Main app
├── 📂 public/              # Static files
├── 📂 backend/             # Backend code
├── 📂 docs/                # Documentation
├── package.json            # Dependencies
└── README.md              # Main documentation
```

## 🔧 Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Start development server
npm start                    # Runs on http://localhost:3000

# Run on different port
npm start -- --port 3001    # If port 3000 is busy

# Build for production
npm run build

# Run tests
npm test

# Deploy to GitHub Pages
npm run deploy
```

### Windows PowerShell Specific
```powershell
# Quick deploy script
.\deploy.bat

# Check Node version
node --version
npm --version

# Clear npm cache if issues
npm cache clean --force
```

## 🌐 Environment Setup

### Option 1: Run Locally (No Firebase)
The app works completely offline using localStorage:
1. Just run `npm start`
2. Use demo credentials
3. All features work locally

### Option 2: Firebase Integration (Optional)
1. Create project at https://console.firebase.google.com
2. Enable Firestore Database
3. Update `src/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 👤 Demo Accounts

### Patient Access
- **Name**: Any name (e.g., "John Doe")
- **Village**: Select from dropdown (Nabha, Patran, etc.)

### Doctor Access
- **Email**: `demo@doctor.com`
- **Password**: `demo123`

Alternative doctors:
- `dr.sharma@nabha.gov.in` / `doctor123`
- `dr.kaur@nabha.gov.in` / `doctor123`

## 🎮 Testing Features

### 1. Patient Flow
1. Login as patient
2. Check symptoms with AI
3. Request consultation
4. View prescriptions

### 2. Doctor Flow
1. Login as doctor
2. Accept patient requests
3. Start video consultation
4. Generate prescription

### 3. Emergency Services
- Click emergency button
- Select service (108, 100, etc.)
- View emergency information

## 🐛 Common Issues & Solutions

### Port Already in Use
```bash
# Use different port
npm start -- --port 3001
```

### Dependencies Installation Failed
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check Node version (should be 16+)
node --version

# Update npm
npm install -g npm@latest
```

### Firebase Connection Issues
- Check internet connection
- Verify Firebase config is correct
- Ensure Firestore is enabled in Firebase Console

## 📱 Mobile Testing
1. Get your local IP: `ipconfig` (Windows)
2. Access from mobile: `http://YOUR_IP:3000`
3. Make sure devices are on same network

## 🚀 Deployment

### GitHub Pages
```bash
# Automatic deployment
npm run deploy

# Or use batch script (Windows)
.\deploy.bat
```

### Vercel
1. Import project at vercel.com
2. Select repository
3. Deploy with default settings

### Netlify
1. Drag and drop `build` folder
2. Or connect GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `build`

## 📊 Performance Tips
- Use Chrome DevTools for debugging
- Enable React Developer Tools extension
- Monitor Network tab for API calls
- Check Console for errors

## 🔗 Important Links
- **Live Demo**: https://gautamkapil9080.github.io/Smartindiahackathon
- **Repository**: https://github.com/gautamkapil9080/Smartindiahackathon
- **Issues**: https://github.com/gautamkapil9080/Smartindiahackathon/issues

## 💬 Need Help?
1. Check existing issues on GitHub
2. Create new issue with details
3. Include error messages and screenshots
4. Mention your environment (OS, Node version, etc.)

---
**Happy Coding! 🎉**