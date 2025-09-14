import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Consultations from './pages/Consultations';
import VideoCall from './pages/VideoCall';
import HealthRecords from './pages/HealthRecords';
import MedicineTracker from './pages/MedicineTracker';
import SymptomChecker from './pages/SymptomChecker';
import Profile from './pages/Profile';

// Redux
import { Provider } from 'react-redux';
import { store } from './store/store';

// i18n
import './i18n/i18n';

// Service Worker
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Green for healthcare
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#FF6F00', // Orange for Punjab
      light: '#FFB300',
      dark: '#E65100',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

function App() {
  useEffect(() => {
    // Register service worker for offline functionality
    serviceWorkerRegistration.register();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/consultations" element={<Consultations />} />
                <Route path="/consultation/:id/call" element={<VideoCall />} />
                <Route path="/health-records" element={<HealthRecords />} />
                <Route path="/medicines" element={<MedicineTracker />} />
                <Route path="/symptom-checker" element={<SymptomChecker />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
        </Router>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </Provider>
  );
}

export default App;