import React from 'react';

interface LandingPageProps {
  onPatientLogin: () => void;
  onDoctorLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onPatientLogin, onDoctorLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Rural Healthcare</h1>
            </div>
            <div className="text-sm text-gray-500">
              Serving 173+ villages in Nabha Region
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Healthcare at your
            <span className="text-primary-500 block">doorstep</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Connecting rural communities with quality healthcare through technology. 
            Get medical consultations, prescriptions, and emergency services from the comfort of your home.
          </p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary-500">100,000+</div>
              <div className="text-gray-600">Rural residents served</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-secondary-500">24/7</div>
              <div className="text-gray-600">Emergency services</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-accent-500">50+</div>
              <div className="text-gray-600">Partner pharmacies</div>
            </div>
          </div>

          {/* Login Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <button
              onClick={onPatientLogin}
              className="btn-primary text-lg px-8 py-4 min-w-48"
            >
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Patient Login</span>
              </div>
            </button>
            
            <button
              onClick={onDoctorLogin}
              className="btn-secondary text-lg px-8 py-4 min-w-48"
            >
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Doctor Login</span>
              </div>
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="card">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Video Consultations</h3>
            <p className="text-gray-600">Connect with doctors via high-quality video calls optimized for rural internet.</p>
          </div>

          <div className="card">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Symptom Checker</h3>
            <p className="text-gray-600">Get intelligent symptom analysis and priority recommendations before consultation.</p>
          </div>

          <div className="card">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency Services</h3>
            <p className="text-gray-600">Quick access to emergency contacts and location sharing for urgent medical needs.</p>
          </div>

          <div className="card">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Medicine Tracker</h3>
            <p className="text-gray-600">Real-time pharmacy inventory and medicine availability across the region.</p>
          </div>

          <div className="card">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Digital Records</h3>
            <p className="text-gray-600">Offline-first health records that sync when online for complete medical history.</p>
          </div>

          <div className="card">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Government Schemes</h3>
            <p className="text-gray-600">Easy access to Ayushman Bharat, PMJAY and other healthcare schemes.</p>
          </div>
        </div>

        {/* Health Tips Carousel - Simple Static Version */}
        <div className="card bg-gradient-to-r from-primary-50 to-secondary-50">
          <h3 className="text-2xl font-bold text-center mb-8">Daily Health Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-4xl mb-2">💧</div>
              <h4 className="font-semibold mb-2">Stay Hydrated</h4>
              <p className="text-gray-600">Drink at least 8-10 glasses of water daily for better health.</p>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">🥗</div>
              <h4 className="font-semibold mb-2">Balanced Diet</h4>
              <p className="text-gray-600">Include fruits, vegetables, and whole grains in your daily meals.</p>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">🚶</div>
              <h4 className="font-semibold mb-2">Regular Exercise</h4>
              <p className="text-gray-600">Walk for 30 minutes daily to maintain good cardiovascular health.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Rural Healthcare Platform</h3>
            <p className="text-gray-400 mb-4">Healthcare at your doorstep • Serving Nabha Region</p>
            <div className="flex justify-center space-x-4 text-sm text-gray-400">
              <span>Emergency: 108</span>
              <span>•</span>
              <span>Fire: 101</span>
              <span>•</span>
              <span>Police: 100</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;