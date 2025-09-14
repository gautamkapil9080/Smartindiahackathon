import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import PatientLogin from './components/PatientLogin';
import DoctorLogin from './components/DoctorLogin';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import PatientPrescriptions from './components/PatientPrescriptions';
import HomeTab from './components/HomeTab';
import PharmacyPortal from './components/PharmacyPortal';
import SymptomChecker from './components/SymptomChecker';
import GovernmentSchemes from './components/GovernmentSchemes';
import Emergency from './components/Emergency';
import './index.css';

type View = 
  | 'landing' 
  | 'home'
  | 'patientLogin' 
  | 'doctorLogin' 
  | 'patientDashboard' 
  | 'doctorDashboard' 
  | 'prescriptions'
  | 'pharmacyPortal'
  | 'symptomChecker'
  | 'governmentSchemes'
  | 'emergency';

const AppContent: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const [currentView, setCurrentView] = useState<View>('landing');

// Auto-redirect based on login state and user type
  React.useEffect(() => {
    if (isLoggedIn && user) {
      if (user.type === 'patient') {
        setCurrentView('patientDashboard');
      } else if (user.type === 'doctor') {
        setCurrentView('doctorDashboard');
      }
    } else {
      setCurrentView('landing');
    }
  }, [isLoggedIn, user]);
  
  // Handle navigation from landing page to home tab
  const handleLandingToHome = () => {
    setCurrentView('home');
  };

  const handleNavigation = (view: View) => {
    setCurrentView(view);
  };

  // Render based on current view
  switch (currentView) {
    case 'home':
      return (
        <HomeTab 
          onNavigateToPatientPortal={() => handleNavigation('patientLogin')}
          onNavigateToDoctorPortal={() => handleNavigation('doctorLogin')}
          onNavigateToPharmacyPortal={() => handleNavigation('pharmacyPortal')}
          onNavigateToSymptomChecker={() => handleNavigation('symptomChecker')}
          onNavigateToGovernmentSchemes={() => handleNavigation('governmentSchemes')}
          onNavigateToEmergency={() => handleNavigation('emergency')}
        />
      );
      
    case 'patientLogin':
      return (
        <PatientLogin 
          onBack={() => handleNavigation('home')} 
        />
      );
    
    case 'doctorLogin':
      return (
        <DoctorLogin 
          onBack={() => handleNavigation('home')} 
        />
      );
    
    case 'patientDashboard':
      return <PatientDashboard />;
    
    case 'doctorDashboard':
      return <DoctorDashboard />;
    
    case 'prescriptions':
      return <PatientPrescriptions />;
      
    case 'pharmacyPortal':
      return <PharmacyPortal onBackToHome={() => handleNavigation('home')} />;
      
    case 'symptomChecker':
      return <SymptomChecker onBackToHome={() => handleNavigation('home')} />;
      
    case 'governmentSchemes':
      return <GovernmentSchemes onBackToHome={() => handleNavigation('home')} />;
      
    case 'emergency':
      return <Emergency onBackToHome={() => handleNavigation('home')} />;
    
    case 'landing':
    default:
      return (
        <LandingPage 
          onPatientLogin={() => handleNavigation('patientLogin')}
          onDoctorLogin={() => handleNavigation('doctorLogin')}
          onEnterApp={handleLandingToHome}
        />
      );
  }
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="App">
        <AppContent />
      </div>
    </AuthProvider>
  );
};

export default App;