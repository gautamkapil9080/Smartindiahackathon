import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import PatientLogin from './components/PatientLogin';
import DoctorLogin from './components/DoctorLogin';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import PatientPrescriptions from './components/PatientPrescriptions';
import './index.css';

type View = 'landing' | 'patientLogin' | 'doctorLogin' | 'patientDashboard' | 'doctorDashboard' | 'prescriptions';

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

  const handleNavigation = (view: View) => {
    setCurrentView(view);
  };

  // Render based on current view
  switch (currentView) {
    case 'patientLogin':
      return (
        <PatientLogin 
          onBack={() => handleNavigation('landing')} 
        />
      );
    
    case 'doctorLogin':
      return (
        <DoctorLogin 
          onBack={() => handleNavigation('landing')} 
        />
      );
    
    case 'patientDashboard':
      return <PatientDashboard />;
    
    case 'doctorDashboard':
      return <DoctorDashboard />;
    
    case 'prescriptions':
      return <PatientPrescriptions />;
    
    case 'landing':
    default:
      return (
        <LandingPage 
          onPatientLogin={() => handleNavigation('patientLogin')}
          onDoctorLogin={() => handleNavigation('doctorLogin')}
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