import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface DoctorLoginProps {
  onBack: () => void;
}

// Pre-set doctor credentials for MVP
const DOCTOR_CREDENTIALS = [
  { email: 'dr.sharma@nabha.gov.in', password: 'doctor123', name: 'Dr. Rajesh Sharma' },
  { email: 'dr.kaur@nabha.gov.in', password: 'doctor123', name: 'Dr. Priya Kaur' },
  { email: 'dr.singh@nabha.gov.in', password: 'doctor123', name: 'Dr. Manpreet Singh' },
  { email: 'demo@doctor.com', password: 'demo123', name: 'Dr. Demo User' }
];

const DoctorLogin: React.FC<DoctorLoginProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      const doctor = DOCTOR_CREDENTIALS.find(
        doc => doc.email.toLowerCase() === email.toLowerCase() && doc.password === password
      );

      if (doctor) {
        login({
          type: 'doctor',
          name: doctor.name,
          email: doctor.email
        });
      } else {
        setError('Invalid email or password. Please try again.');
      }
      
      setIsLoading(false);
    }, 800);
  };

  const fillDemoCredentials = () => {
    setEmail('demo@doctor.com');
    setPassword('demo123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center text-secondary-600 hover:text-secondary-700 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
          <h2 className="text-3xl font-bold text-gray-900">Doctor Login</h2>
          <p className="text-gray-600 mt-2">Access your medical dashboard</p>
        </div>

        {/* Login Form */}
        <div className="card">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="doctor@nabha.gov.in"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-secondary flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Demo Credentials:</span>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-sm text-secondary-600 hover:text-secondary-700 font-medium"
              >
                Use Demo
              </button>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-sm">
              <div className="space-y-1 text-gray-600">
                <div><strong>Email:</strong> demo@doctor.com</div>
                <div><strong>Password:</strong> demo123</div>
              </div>
            </div>
          </div>

          {/* Available Doctors */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Available Doctors:</h3>
            <div className="space-y-2 text-sm text-gray-600">
              {DOCTOR_CREDENTIALS.map((doctor, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">{doctor.name}</div>
                    <div className="text-xs text-gray-500">{doctor.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Doctor Features */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Doctor Dashboard Features:</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>View pending patient requests</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Conduct video consultations</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Generate digital prescriptions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Secure doctor portal • All consultations are encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;