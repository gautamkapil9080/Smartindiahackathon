import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface PatientLoginProps {
  onBack: () => void;
}

const PatientLogin: React.FC<PatientLoginProps> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [village, setVillage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !village.trim()) {
      alert('Please enter both name and village');
      return;
    }

    setIsLoading(true);
    
    // Simulate a small delay for UX
    setTimeout(() => {
      login({
        type: 'patient',
        name: name.trim(),
        village: village.trim()
      });
      setIsLoading(false);
    }, 500);
  };

  const commonVillages = [
    'Nabha', 'Bhadson', 'Dhablan', 'Ghanaur', 'Kahangarh',
    'Sahlon', 'Rajpura', 'Fatehgarh Sahib', 'Morinda', 'Samana'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
          <h2 className="text-3xl font-bold text-gray-900">Patient Login</h2>
          <p className="text-gray-600 mt-2">Enter your details to access healthcare services</p>
        </div>

        {/* Login Form */}
        <div className="card">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-2">
                Village/City
              </label>
              <input
                id="village"
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="input-field"
                placeholder="Enter your village or city"
                list="villages"
                required
              />
              <datalist id="villages">
                {commonVillages.map(villageOption => (
                  <option key={villageOption} value={villageOption} />
                ))}
              </datalist>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Continue
                </>
              )}
            </button>
          </form>

          {/* Features Preview */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-4">What you can do:</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Get AI-powered symptom analysis</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Consult doctors via video call</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Access emergency services</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Download prescriptions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Your information is secure and used only for healthcare services.</p>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;