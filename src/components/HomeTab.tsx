import React from 'react';

interface HomeTabProps {
  onNavigateToPatientPortal: () => void;
  onNavigateToDoctorPortal: () => void;
  onNavigateToPharmacyPortal: () => void;
  onNavigateToSymptomChecker: () => void;
  onNavigateToGovernmentSchemes: () => void;
  onNavigateToEmergency: () => void;
}

const HomeTab: React.FC<HomeTabProps> = ({
  onNavigateToPatientPortal,
  onNavigateToDoctorPortal,
  onNavigateToPharmacyPortal,
  onNavigateToSymptomChecker,
  onNavigateToGovernmentSchemes,
  onNavigateToEmergency
}) => {
  const portalButtons = [
    {
      title: 'Patient Portal',
      description: 'Access your health records, book appointments, and manage your healthcare',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      onClick: onNavigateToPatientPortal,
      bgColor: 'bg-primary-500',
      hoverColor: 'hover:bg-primary-600',
      textColor: 'text-white'
    },
    {
      title: 'Doctor Portal',
      description: 'Healthcare providers can manage patients, consultations, and prescriptions',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      onClick: onNavigateToDoctorPortal,
      bgColor: 'bg-secondary-500',
      hoverColor: 'hover:bg-secondary-600',
      textColor: 'text-white'
    },
    {
      title: 'Pharmacy Portal',
      description: 'Manage medicine inventory, prescriptions, and availability across the region',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      onClick: onNavigateToPharmacyPortal,
      bgColor: 'bg-accent-500',
      hoverColor: 'hover:bg-accent-600',
      textColor: 'text-white'
    },
    {
      title: 'Symptom Checker',
      description: 'AI-powered symptom analysis with voice recognition support',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      onClick: onNavigateToSymptomChecker,
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      textColor: 'text-white'
    },
    {
      title: 'Government Schemes',
      description: 'Easy access to Ayushman Bharat, PMJAY and other healthcare schemes',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      onClick: onNavigateToGovernmentSchemes,
      bgColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      textColor: 'text-white'
    },
    {
      title: 'Emergency',
      description: 'Quick access to emergency services and location sharing',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      onClick: onNavigateToEmergency,
      bgColor: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      textColor: 'text-white'
    }
  ];

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
              <h1 className="text-xl font-bold text-gray-900">Rural Healthcare Platform</h1>
            </div>
            <div className="text-sm text-gray-500">
              Serving 173+ villages in Nabha Region
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Healthcare at your
            <span className="text-primary-500 block">doorstep</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose your portal below to access comprehensive healthcare services designed for rural communities.
          </p>
        </div>

        {/* Portal Buttons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {portalButtons.map((portal, index) => (
            <button
              key={index}
              onClick={portal.onClick}
              className={`${portal.bgColor} ${portal.hoverColor} ${portal.textColor} p-8 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                  {portal.icon}
                </div>
                <h3 className="text-xl font-bold">{portal.title}</h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  {portal.description}
                </p>
                <div className="flex items-center space-x-2 mt-4">
                  <span className="text-sm font-medium">Access Portal</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
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

        {/* Daily Health Tips */}
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

export default HomeTab;