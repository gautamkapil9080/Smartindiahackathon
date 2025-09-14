# Rural Healthcare Telemedicine MVP - Nabha

## 🚀 Live Demo

### 🌐 Try the Application
- **Live Demo**: [https://gautamkapil9080.github.io/NEW-SIHMVP/](https://gautamkapil9080.github.io/NEW-SIHMVP/)
- **Vercel Deployment**: [https://rural-healthcare-mvp.vercel.app](https://rural-healthcare-mvp.vercel.app)
- **Netlify Deployment**: [https://rural-healthcare-mvp.netlify.app](https://rural-healthcare-mvp.netlify.app)

### 📱 Demo Credentials
```
Phone: 9876543210
Password: demo123
```

## 🏥 Project Overview

A telemedicine platform designed to address healthcare accessibility challenges in Nabha and surrounding rural areas of Punjab, India. This MVP provides video consultations, digital health records, medicine availability tracking, and offline capabilities optimized for low-bandwidth rural environments.

### Problem Statement (ID: 25018)
- **Organization**: Government of Punjab, Department of Higher Education
- **Category**: Software (MedTech/BioTech/HealthTech)
- **Target**: 173 villages served by understaffed Nabha Civil Hospital

## 🎯 Key Features

### Core MVP Features
1. **Multi-lingual Support** - Punjabi, Hindi, and English interfaces
2. **Video Consultations** - Low-bandwidth optimized telemedicine
3. **Digital Health Records** - Offline-capable patient records
4. **Medicine Tracker** - Real-time pharmacy inventory
5. **AI Symptom Checker** - Rule-based health assessment
6. **Offline Mode** - Works without constant internet

## 🏗️ Project Structure

```
rural-healthcare-mvp/
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions CI/CD
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js   # Database configuration
│   │   ├── controllers/      # Request handlers
│   │   ├── middleware/
│   │   │   ├── auth.js       # JWT authentication
│   │   │   ├── errorHandler.js
│   │   │   └── rateLimiter.js
│   │   ├── models/
│   │   │   └── User.js       # User model with auth
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── consultation.routes.js
│   │   │   ├── medicine.routes.js
│   │   │   ├── record.routes.js
│   │   │   └── symptom.routes.js
│   │   ├── utils/
│   │   │   └── symptomData.js # AI symptom checker data
│   │   └── server.js         # Main server file
│   ├── .env.example          # Environment variables template
│   └── package.json          # Backend dependencies
├── frontend/
│   ├── public/
│   │   ├── index.html        # Main HTML file
│   │   └── manifest.json     # PWA manifest
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   └── Layout.js  # Main layout wrapper
│   │   │   └── PrivateRoute.js # Protected route component
│   │   ├── i18n/
│   │   │   └── i18n.js        # Multi-language support
│   │   ├── pages/
│   │   │   ├── Login.js       # Login page
│   │   │   ├── Register.js    # Registration page
│   │   │   ├── Dashboard.js   # Main dashboard
│   │   │   ├── Consultations.js
│   │   │   ├── VideoCall.js   # Video consultation
│   │   │   ├── HealthRecords.js
│   │   │   ├── MedicineTracker.js
│   │   │   ├── SymptomChecker.js
│   │   │   └── Profile.js
│   │   ├── store/
│   │   │   └── store.js       # Redux store configuration
│   │   ├── App.js             # Main React component
│   │   ├── index.js           # React entry point
│   │   ├── index.css          # Global styles
│   │   ├── serviceWorker.js  # PWA service worker
│   │   └── serviceWorkerRegistration.js
│   └── package.json          # Frontend dependencies
├── database/                 # SQLite database files
├── docs/                     # Additional documentation
├── scripts/                  # Utility scripts
├── .gitignore               # Git ignore file
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose setup
├── netlify.toml             # Netlify deployment config
├── vercel.json              # Vercel deployment config
└── README.md                # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
cd rural-healthcare-mvp
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Set up environment variables**
```bash
# Create .env file in backend directory
cp backend/.env.example backend/.env
# Edit with your configuration
```

5. **Initialize Database**
```bash
cd backend
npm run db:init
```

6. **Start Development Servers**

Backend (Terminal 1):
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

Frontend (Terminal 2):
```bash
cd frontend
npm start
# App runs on http://localhost:3000
```

## 💻 Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Lightweight database
- **JWT** - Authentication
- **Socket.io** - Real-time communication
- **WebRTC** - Video calling

### Frontend
- **React** - UI framework
- **Material-UI** - Component library
- **Redux Toolkit** - State management
- **Service Workers** - Offline capabilities
- **IndexedDB** - Local data storage
- **WebRTC** - Video consultations

## 📱 Features Implementation

### 1. User Registration/Login
- Phone number-based authentication
- OTP verification
- Role-based access (Patient/Doctor/Pharmacy)

### 2. Video Consultations
- WebRTC-based video calls
- Low-bandwidth optimization
- Call scheduling and queuing
- In-call chat and file sharing

### 3. Digital Health Records
- Patient medical history
- Prescription management
- Lab report uploads
- Offline sync capability

### 4. Medicine Availability
- Real-time inventory tracking
- Pharmacy network integration
- Alternative medicine suggestions
- Price comparison

### 5. AI Symptom Checker
- Multi-language symptom input
- Common rural health conditions database
- Emergency detection and alerts
- Doctor recommendation

### 6. Offline Functionality
- Service worker caching
- Queue-based data sync
- Local data persistence
- Automatic retry mechanisms

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - OTP verification

### Consultations
- `GET /api/consultations` - List consultations
- `POST /api/consultations/book` - Book appointment
- `GET /api/consultations/:id` - Get consultation details
- `POST /api/consultations/:id/join` - Join video call

### Health Records
- `GET /api/records` - Get patient records
- `POST /api/records` - Create new record
- `PUT /api/records/:id` - Update record
- `GET /api/records/:id/download` - Download record

### Medicine Tracker
- `GET /api/medicines/search` - Search medicines
- `GET /api/medicines/availability` - Check availability
- `GET /api/pharmacies/nearby` - Find nearby pharmacies

### Symptom Checker
- `POST /api/symptoms/check` - Analyze symptoms
- `GET /api/symptoms/conditions` - List common conditions

## 🔒 Security Considerations

- JWT-based authentication
- HTTPS enforcement in production
- Data encryption at rest
- HIPAA compliance considerations
- Regular security audits
- Input validation and sanitization

## 📊 Database Schema

### Users Table
- id, phone, name, role, language, created_at

### Patients Table
- id, user_id, age, gender, village, medical_history

### Doctors Table
- id, user_id, specialization, license_no, hospital_id

### Appointments Table
- id, patient_id, doctor_id, date_time, status, meeting_link

### Health Records Table
- id, patient_id, type, data, created_by, created_at

### Medicines Table
- id, name, generic_name, category, typical_price

### Pharmacy Inventory Table
- id, pharmacy_id, medicine_id, quantity, price, updated_at

## 🚢 Deployment

### Local Development
```bash
npm run dev
```

### Production Build
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

### Docker Deployment
```bash
docker-compose up -d
```

### Environment Variables
Required environment variables:
- `DATABASE_URL` - SQLite database path
- `JWT_SECRET` - JWT signing secret
- `PORT` - Server port
- `NODE_ENV` - Environment (development/production)
- `TWILIO_ACCOUNT_SID` - For SMS OTP (optional)
- `TWILIO_AUTH_TOKEN` - For SMS OTP (optional)

## 📈 Performance Optimization

- Lazy loading of components
- Image compression and optimization
- CDN integration for static assets
- Database query optimization
- Caching strategies
- Progressive Web App features

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is developed for the Government of Punjab under the Department of Higher Education.

## 👥 Stakeholders

- **Primary**: Rural patients in Nabha and 173 surrounding villages
- **Secondary**: Nabha Civil Hospital staff
- **Tertiary**: Punjab Health Department, Local pharmacies

## 📊 Success Metrics

- Number of consultations completed
- Average wait time reduction
- Medicine availability improvement
- User satisfaction scores
- System uptime and reliability

## 🆘 Support

For issues and questions:
- Create an issue in the repository
- Contact the development team
- Refer to the documentation in `/docs`

## 🗺️ Roadmap

### Phase 1 (MVP) - Current
- Basic telemedicine functionality
- User authentication
- Simple symptom checker

### Phase 2
- Advanced AI diagnosis assistance
- Integration with government health schemes
- Multi-hospital network

### Phase 3
- Wearable device integration
- Predictive health analytics
- Expanded language support

---

**Built with ❤️ for rural healthcare accessibility in Punjab**

# Rural Healthcare MVP

**Healthcare at your doorstep** - A comprehensive telemedicine platform designed specifically for rural healthcare in the Nabha region, serving 173+ villages with limited medical infrastructure.

## 🌐 Live Demo
**🔗 Live Application**: https://gautamkapil9080.github.io/NEW-SIHMVP  
**📊 Source Code**: https://github.com/gautamkapil9080/NEW-SIHMVP

### Demo Credentials:
- **Patient**: Any name (e.g., "Rajesh Kumar") + Village (e.g., "Nabha")  
- **Doctor**: `demo@doctor.com` / `demo123`

## 🌟 Problem Statement

Rural healthcare in the Nabha region faces critical challenges:
- **173+ villages** served by understaffed Nabha Civil Hospital
- Only **11 doctors available** out of 23 sanctioned posts
- Patients travel long distances only to find specialists unavailable
- Medicine stock-outs at local pharmacies
- Only **31% rural households** have reliable internet access

## 💡 Our Solution: Complete Healthcare Ecosystem

A Progressive Web App (PWA) that provides comprehensive healthcare services optimized for rural internet connectivity and basic smartphones.

## 🚀 Key Features

### 1. 🌐 **Multilingual Interface**
- Support for English, Hindi, and Punjabi
- Cultural sensitivity for rural communities
- Real-time language switching (planned)

### 2. 📹 **Video Consultations**
- Low-bandwidth optimized for rural internet via Jitsi Meet
- Real-time video/audio consultations
- Doctor-patient appointment management
- Connection quality indicators

### 3. 🤖 **AI Symptom Checker**
- Intelligent symptom analysis with confidence scoring
- Priority-based recommendations (Low/Medium/High/Emergency)
- Direct integration with consultation booking
- Optimized for common rural health issues

### 4. 💊 **Real-time Medicine Tracker**
- Live pharmacy inventory across Nabha region (simulated)
- Location-based search and filtering
- Direct pharmacy contact integration
- Price comparison across vendors (planned)

### 5. 📋 **Digital Prescription System**
- PDF generation with jsPDF
- Complete medical history access
- Doctor prescription forms with common medicines
- Downloadable and printable prescriptions

### 6. 🏛️ **Government Schemes Integration**
- Ayushman Bharat PM-JAY information
- Punjab Health Scheme center locator
- Jan Aushadhi generic medicine stores
- Direct helpline integration

### 7. 🚨 **Comprehensive Emergency Services**
- Multiple emergency numbers (108, 100, 101, 1070)
- GPS location sharing with emergency services
- Emergency warning signs recognition
- One-click emergency calling

## 🛠️ Technical Architecture

### **Modern Tech Stack**
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Database**: Firebase Firestore for real-time data
- **Video Calls**: Jitsi Meet embedded integration
- **AI Services**: Mock implementation (Wrap AI ready)
- **PDF Generation**: jsPDF for prescriptions
- **PWA**: Service workers for offline functionality
- **Authentication**: Simple name-based for patients, email/password for doctors

### **Progressive Web App (PWA)**
- Install on mobile devices like native app
- Offline-first architecture (planned)
- Service worker for caching (basic implementation)
- Responsive design for all screen sizes

## 📊 Expected Impact & Scalability

### **Immediate Impact**
- **100,000+ rural residents** served
- **60-70% reduction** in unnecessary travel
- **3x increase** in doctor availability through virtual consultations
- Real-time medicine access for 50+ pharmacies

### **Government-Ready Solution**
- Designed for official deployment by Punjab Health Department
- Cost-effective - works on existing mobile infrastructure
- Scalable - template for other districts across India
- Secure - follows healthcare data protection standards

## 🚀 Getting Started

### Prerequisites
- **Node.js 16+** - Download from [nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - Download from [git-scm.com](https://git-scm.com/)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **Firebase account** (optional - app works offline)

### 🔧 Quick Start (5 minutes)

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/rural-healthcare-mvp.git
   cd rural-healthcare-mvp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   *This may take 2-3 minutes to download all packages*

3. **Start the development server**
   ```bash
   npm start
   ```
   *Server will start on http://localhost:3000 and open automatically*

4. **Start using the app!**
   - **Patient Demo**: Use any name + village (suggestions provided)
   - **Doctor Demo**: `demo@doctor.com` / `demo123`

### 🏥 Firebase Setup (Optional)

The app works **completely offline** using localStorage. For real-time features:

1. Create Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Copy config to `src/firebase.ts`:
   ```typescript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     // ... rest of config
   };
   ```

### 📦 Available Commands

```bash
npm start          # Start development server (http://localhost:3000)
npm test           # Run tests
npm run build      # Build for production
npm run eject      # Eject from Create React App (not recommended)
```

### 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
npm start -- --port 3001
```

**npm install fails?**
```bash
npm cache clean --force
npm install
```

**Node.js not found?**
- Install from [nodejs.org](https://nodejs.org/)
- Restart your terminal after installation
- Verify with `node --version` and `npm --version`

## 🎯 Demo Credentials

### **Doctor Login**
- **Email**: `demo@doctor.com`
- **Password**: `demo123`

Or use any of these pre-configured doctors:
- `dr.sharma@nabha.gov.in` / `doctor123`
- `dr.kaur@nabha.gov.in` / `doctor123`
- `dr.singh@nabha.gov.in` / `doctor123`

### **Patient Login**
- **Name**: Any name (e.g., "John Doe")
- **Village**: Any village (suggestions provided)

## 📱 How to Use

### **For Patients:**
1. Click "Patient Login" on the landing page
2. Enter your name and village
3. Describe symptoms in the symptom checker
4. Review AI analysis and recommendations
5. Request video consultation if needed
6. Access emergency services if urgent
7. View government health schemes

### **For Doctors:**
1. Click "Doctor Login" and use demo credentials
2. View pending patient consultation requests
3. Accept consultations to start video calls
4. Create and generate PDF prescriptions
5. Monitor patient statistics

## 🏗️ Project Structure

```
rural-healthcare-mvp/
├── public/
│   ├── index.html
│   └── manifest.json (PWA)
├── src/
│   ├── components/          # React components
│   │   ├── LandingPage.tsx
│   │   ├── PatientLogin.tsx
│   │   ├── DoctorLogin.tsx
│   │   ├── PatientDashboard.tsx
│   │   ├── DoctorDashboard.tsx
│   │   ├── PrescriptionForm.tsx
│   │   └── PatientPrescriptions.tsx
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx
│   ├── services/          # API and utility services
│   │   ├── aiService.ts   # AI symptom analysis
│   │   ├── firestoreService.ts
│   │   └── prescriptionService.ts
│   ├── App.tsx           # Main app component
│   ├── index.tsx         # Entry point
│   └── index.css         # Tailwind CSS
├── tailwind.config.js    # Tailwind configuration
├── package.json
└── README.md
```

## 🎨 Design System

### **Color Palette**
- **Primary Blue**: Healthcare trust and reliability
- **Secondary Green**: Health and wellness
- **Accent Orange**: Urgency and calls-to-action
- **Emergency Red**: Critical alerts and emergency actions

### **Typography**
- Clean, readable fonts optimized for rural users
- Multiple text sizes for accessibility
- High contrast for better visibility

## 🚨 Emergency Features

- **One-click emergency calling**: Direct access to 108, 100, 101, 1070
- **GPS location sharing**: Automatic location detection and sharing
- **Emergency triage**: AI identifies emergency conditions
- **Hospital locator**: Integration with Google Maps

## 🏥 Health Schemes Integration

The platform provides easy access to:
- **Ayushman Bharat PM-JAY**: Up to ₹5 lakh coverage
- **Punjab Health Scheme**: State-specific benefits
- **Jan Aushadhi**: Affordable generic medicines
- Direct helpline numbers and application links

## 🤖 AI-Powered Features

### **Symptom Analysis**
- Pattern recognition for common rural health issues
- Confidence scoring (60-95%)
- Urgency classification
- Specialist recommendations
- Treatment suggestions

### **Common Conditions Covered**
- Fever and infections
- Respiratory issues
- Gastrointestinal problems
- Skin conditions
- Emergency situations
- Chronic disease management

## 📋 Prescription System

### **Features**
- Digital prescription generation
- PDF download with jsPDF
- Common medicine database
- Dosage and frequency templates
- Patient medication history
- Printable format for local pharmacies

### **Medicine Database**
Pre-loaded with common rural healthcare medicines:
- Paracetamol, Ibuprofen
- Antibiotics (Amoxicillin, Azithromycin)
- Antacids, Antihistamines
- Diabetic medications
- Vitamins and supplements

## 🌐 PWA Features (Planned Enhancement)

- **Offline functionality**: Core features work without internet
- **App installation**: Install like native mobile app
- **Push notifications**: Appointment reminders
- **Background sync**: Data synchronization when online
- **Cache management**: Efficient data storage

## 🔒 Security & Privacy

- **Data encryption**: All patient data encrypted
- **HIPAA compliance**: Healthcare data protection
- **Secure authentication**: Doctor credential verification
- **Privacy controls**: Patient consent management
- **Audit trails**: Complete activity logging

## 🚀 Future Enhancements

### **Phase 2 Features**
- Multi-language voice interface
- Real-time chat during consultations
- Medicine delivery integration
- Health insurance processing
- Specialist referral system

### **Phase 3 Features**
- IoT device integration (BP monitors, glucometers)
- AI-powered health predictions
- Community health worker dashboard
- Mobile health unit coordination
- Telemedicine kiosks in villages

## 🤝 Contributing

This MVP was built for internal hackathon demonstration. Future contributions welcome for:
- Multi-language support implementation
- Real AI service integration
- Enhanced PWA features
- Performance optimizations
- Additional government scheme integrations

## 📞 Support & Contact

- **Emergency**: 108 (Ambulance), 100 (Police), 101 (Fire)
- **Technical Support**: support@ruralhealthcare.gov.in
- **Health Schemes**: 14555 (PM-JAY), 1800-180-2024 (Punjab Health)

## 📄 License

This project is designed for government deployment and public health benefit. 

---

**Built with ❤️ for rural healthcare transformation in Punjab, India**

*Serving 173+ villages • Connecting patients with doctors • Healthcare at your doorstep*