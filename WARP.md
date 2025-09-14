# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Rural Healthcare MVP is a Progressive Web App (PWA) designed for telemedicine services in rural areas, specifically targeting 173+ villages in the Nabha region of Punjab, India. The platform connects patients with doctors through video consultations, AI-powered symptom analysis, digital prescriptions, and emergency services.

## Development Commands

### Core Development
- **Start development server**: `npm start` (runs on http://localhost:3000)
- **Build for production**: `npm run build`
- **Run tests**: `npm test`
- **Install dependencies**: `npm install`
- **Start on different port**: `npm start -- --port 3001` (if 3000 is occupied)
- **Clear npm cache**: `npm cache clean --force` (troubleshooting)

### Deployment Commands
- **Quick deploy**: `.\.\deploy.bat` (Windows batch file for full deployment process)
- **Manual deploy**: `npm run deploy-manual` (custom GitHub Pages deployment)
- **Standard deploy**: `npm run deploy` (gh-pages deployment)
- **Pre-deploy build**: `npm run predeploy` (runs build before deployment)

### PowerShell-Specific Commands
- **List files**: `Get-ChildItem` or `ls` (not `ls -la`)
- **Navigate**: `Set-Location "path"` or `cd "path"`
- **View file structure**: `Get-ChildItem -Recurse | Select-Object FullName`
- **Check Node version**: `node --version` and `npm --version`

### Testing Individual Features
- **Test symptom analysis**: Navigate to patient dashboard → Enter symptoms in the symptom checker
- **Test video consultation**: Patient requests consultation → Doctor accepts from doctor dashboard
- **Test prescription generation**: Doctor dashboard → Create prescription → Generate PDF
- **Test family mode**: Patient dashboard → Family tab → Add family members

## Architecture Overview

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom healthcare color palette
- **Database**: Firebase Firestore for real-time data sync
- **Authentication**: Custom context with localStorage (patients: name-based, doctors: email/password)
- **Video Calls**: Jitsi Meet embedded integration
- **PDF Generation**: jsPDF for prescription downloads
- **State Management**: React Context API (AuthContext)

### Key Architectural Patterns

**1. Service Layer Architecture**
The app uses dedicated service classes that act as a bridge between components and external APIs:
- `aiService.ts`: Mock AI symptom analysis with confidence scoring
- `firestoreService.ts`: Firebase CRUD operations for patient requests and prescriptions
- `prescriptionService.ts`: PDF generation and medicine database
- `familyService.ts`: Family health record management with localStorage
- `voiceService.ts`: Voice command processing for accessibility

**2. Context-Based Authentication**
- Single AuthContext manages both patient and doctor sessions
- Automatic view routing based on user type (patient → PatientDashboard, doctor → DoctorDashboard)
- Session persistence via localStorage

**3. Real-time Data Flow**
- Firestore listeners for pending consultation requests (`listenToPendingRequests`)
- Doctors see live updates when patients request consultations
- Status updates propagate in real-time (pending → accepted → completed)

### Component Structure

**View Components** (main screens):
- `LandingPage`: Entry point with patient/doctor login options
- `PatientDashboard`: Symptom checker, consultation requests, emergency services
- `DoctorDashboard`: Pending requests, video calls, prescription forms
- `FamilyMode`: Family member management and health tracking
- `HomeTab`: Central hub with 6 portal buttons for easy navigation

**Feature Components**:
- `SymptomChecker`: Standalone AI symptom analysis tool
- `Emergency`: Comprehensive emergency services interface
- `GovernmentSchemes`: Information and access to health schemes
- `PharmacyPortal`: Medicine inventory and pharmacy locator

**Authentication Components**:
- `PatientLogin`: Name + village input with suggestions
- `DoctorLogin`: Email/password with demo credentials

**Utility Components**:
- `PrescriptionForm`: Medicine selection with common drug database
- `PatientPrescriptions`: View and download prescription history

### Data Models

**Core Entities**:
```typescript
interface PatientRequest {
  patientName: string;
  village: string;
  symptoms: string;
  aiTriage: string; // AI analysis results
  urgencyLevel: 'Low' | 'Medium' | 'High' | 'Emergency';
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  doctorId?: string;
  roomId?: string; // Jitsi room identifier
}

interface Prescription {
  medicines: { name: string; dosage: string; frequency: string; duration: string; }[];
  diagnosis: string;
  notes: string;
}

interface FamilyMember {
  relationship: 'self' | 'spouse' | 'child' | 'parent' | 'sibling';
  chronicConditions: string[];
  allergies: string[];
  emergencyContact?: string;
}
```

## Firebase Configuration

The app uses Firebase Firestore with placeholder configuration in `src/firebase.ts`. For development:

1. Create Firebase project at console.firebase.google.com
2. Enable Firestore Database
3. Replace configuration in `firebase.ts`:
   ```typescript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     // ... other config
   };
   ```

**Firestore Collections**:
- `patientRequests`: Consultation requests with real-time updates
- `prescriptions`: Digital prescriptions linked to requests

## AI Service Integration

The current `aiService.ts` is a mock implementation with pattern-matching for common rural health conditions. To integrate real AI:

1. Replace `analyzeSymptoms()` function with actual API calls
2. Maintain the existing `SymptomAnalysis` interface for consistency
3. Keep confidence scoring (60-95%) and urgency classification
4. Preserve specialist recommendation mapping

**Common Symptom Patterns**:
- Fever, chest pain, headache, stomach issues, cough/cold
- Emergency detection for accidents, bleeding, fractures
- Chronic condition monitoring (diabetes, skin conditions)

## Development Workflows

### Adding New Features

1. **New Service**: Create in `src/services/` following existing patterns
2. **New Component**: Add to `src/components/` with TypeScript interfaces
3. **State Management**: Use existing AuthContext or create new context for complex state
4. **Styling**: Use Tailwind with custom healthcare colors (primary blue, secondary green, accent orange, emergency red)

### Deployment Workflow

1. **Local testing**: `npm start` → Test all features
2. **Build verification**: `npm run build` → Check for build errors
3. **Quick deployment**: Run `.\.\deploy.bat` for automated deployment
4. **Monitor deployment**: Check https://gautamkapil9080.github.io/NEW-SIHMVP (live URL)
5. **Deployment repos**: Primary: SIH-MVP, Fallback: NEW-SIHMVP

### Testing Consultation Flow

1. Start as patient: Enter name/village → Add symptoms → Request consultation
2. Switch to doctor dashboard: Accept request → Start video call
3. Create prescription: Add medicines → Generate PDF
4. Verify: Patient can view prescription in their dashboard

### Working with Family Mode

Family management is handled entirely in `familyService.ts` with localStorage persistence:
- Auto-creates 'self' member on initialization
- Supports health record tracking per family member
- Provides health insights and emergency information compilation

## Color System & Design

Tailwind configuration uses healthcare-specific colors:
- **Primary (Blue)**: Trust and reliability (`primary-500`: #0066cc)
- **Secondary (Green)**: Health and wellness (`secondary-500`: #22c55e)
- **Accent (Orange)**: Urgency and CTAs (`accent-500`: #f97316)
- **Emergency (Red)**: Critical alerts (standard Tailwind red)

## Demo Credentials

**Doctors**:
- `demo@doctor.com` / `demo123`
- `dr.sharma@nabha.gov.in` / `doctor123`
- `dr.kaur@nabha.gov.in` / `doctor123`

**Patients**: Any name with suggested villages (Nabha, Patran, Ghanaur, Bhadson, Dhuri)

## Emergency Features

The platform includes comprehensive emergency services:
- One-click calling: 108 (Ambulance), 100 (Police), 101 (Fire), 1070 (Women's Helpline)
- GPS location detection and sharing
- Emergency condition recognition in AI triage
- Direct integration with emergency services

## Government Schemes Integration

Pre-configured information for:
- **Ayushman Bharat PM-JAY**: ₹5 lakh coverage, helpline 14555
- **Punjab Health Scheme**: State benefits, helpline 1800-180-2024
- **Jan Aushadhi**: Generic medicine store locator

## Medicine Database

`COMMON_MEDICINES` array in `prescriptionService.ts` contains pre-loaded rural healthcare medicines:
- Pain/fever: Paracetamol, Ibuprofen
- Antibiotics: Amoxicillin, Azithromycin
- Gastric: Omeprazole
- Allergies: Cetirizine
- Diabetes: Metformin
- General health: Multivitamins

## Performance Considerations

- **Low-bandwidth optimization**: Jitsi Meet configured for rural internet
- **Offline-first approach**: Core features work with localStorage when Firebase is unavailable
- **PWA implementation**: Service worker ready for app-like installation
- **Mobile-first design**: Optimized for basic smartphones common in rural areas

## Recent Updates & Features

### Home Tab Integration
- **6 Portal System**: Centralized navigation with dedicated buttons
- **Symptom Checker**: Standalone access outside patient dashboard
- **Pharmacy Portal**: Direct medicine search and inventory tracking
- **Government Schemes**: Enhanced scheme information and helpline access
- **Emergency Services**: Improved emergency response interface

## Rural Healthcare Specific Features

1. **Multilingual Support Ready**: Infrastructure for English/Hindi/Punjabi (pending implementation)
2. **Village-based Patient Identification**: No email required, uses name + village
3. **Common Rural Conditions**: AI trained on fever, respiratory, gastric, skin conditions
4. **Government Helpline Integration**: Direct calling capabilities for various services
5. **Pharmacy Network**: Mock implementation for medicine availability tracking across villages

## Repository URLs

- **Primary Repository**: https://github.com/gautamkapil9080/SIH-MVP
- **Backup Repository**: https://github.com/gautamkapil9080/NEW-SIHMVP
- **Live Demo**: https://gautamkapil9080.github.io/NEW-SIHMVP
- **Working Demo**: https://gautamkapil9080.github.io/SIH-MVP/working-demo.html
