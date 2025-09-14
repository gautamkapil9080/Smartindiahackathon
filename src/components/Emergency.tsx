import React, { useState } from 'react';

interface EmergencyProps {
  onBackToHome: () => void;
}

const Emergency: React.FC<EmergencyProps> = ({ onBackToHome }) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        
        // Share location via SMS or call
        const message = `Emergency! I need help. My location: https://maps.google.com/?q=${latitude},${longitude}`;
        
        // Try to open SMS app
        if (navigator.share) {
          navigator.share({
            title: 'Emergency Location',
            text: message
          });
        } else {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(message).then(() => {
            alert('Location copied to clipboard. Share this with emergency contacts.');
          });
        }
      },
      (error) => {
        alert('Error getting location: ' + error.message);
      }
    );
  };

  const emergencyContacts = [
    { name: 'Ambulance', number: '108', color: 'bg-red-500', description: 'Medical emergency and ambulance services' },
    { name: 'Fire Brigade', number: '101', color: 'bg-orange-500', description: 'Fire emergencies and rescue operations' },
    { name: 'Police', number: '100', color: 'bg-blue-500', description: 'Law and order emergencies' },
    { name: 'Disaster Management', number: '1070', color: 'bg-purple-500', description: 'Natural disasters and calamities' },
    { name: 'Women Helpline', number: '1091', color: 'bg-pink-500', description: 'Women safety and domestic violence' },
    { name: 'Child Helpline', number: '1098', color: 'bg-indigo-500', description: 'Child abuse and missing children' }
  ];

  const hospitalContacts = [
    { name: 'District Hospital Patiala', number: '0175-2212345', address: 'Patiala, Punjab' },
    { name: 'Civil Hospital Nabha', number: '01765-222345', address: 'Nabha, Patiala' },
    { name: 'PHC Samana', number: '01764-234567', address: 'Samana, Patiala' },
    { name: 'Regional Medical College', number: '0175-2210000', address: 'Patiala, Punjab' }
  ];

  const emergencyTips = [
    {
      title: 'Heart Attack',
      symptoms: 'Chest pain, shortness of breath, nausea',
      actions: ['Call 108 immediately', 'Give aspirin if available', 'Keep patient calm and seated']
    },
    {
      title: 'Stroke',
      symptoms: 'Face drooping, arm weakness, speech difficulty',
      actions: ['Call 108 immediately', 'Note time symptoms started', 'Do not give food or water']
    },
    {
      title: 'Severe Bleeding',
      symptoms: 'Heavy bleeding from wound',
      actions: ['Apply direct pressure to wound', 'Elevate injured area', 'Call 108 for severe cases']
    },
    {
      title: 'Choking',
      symptoms: 'Cannot speak, difficulty breathing',
      actions: ['Perform Heimlich maneuver', 'For infants: back blows and chest thrusts', 'Call 108 if unsuccessful']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBackToHome}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                title="Back to Home"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Emergency Services</h1>
                <p className="text-sm text-gray-500">Quick access to emergency help</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Sharing */}
        <div className="card mb-8">
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Share Your Location
            </h3>
            <p className="text-red-800 text-sm mb-4">In case of emergency, share your location with emergency services and family members.</p>
            <button
              onClick={getLocation}
              className="btn-emergency flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Share Location</span>
            </button>
            {location && (
              <div className="mt-3 p-3 bg-white rounded border text-sm">
                <p>Location: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}</p>
                <a 
                  href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  View on Google Maps
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contacts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyContacts.map((contact, index) => (
              <button
                key={index}
                onClick={() => window.open(`tel:${contact.number}`)}
                className={`${contact.color} text-white p-6 rounded-lg hover:opacity-90 transition-opacity text-left`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="font-semibold text-lg">{contact.name}</div>
                    <div className="text-sm opacity-90">{contact.number}</div>
                  </div>
                </div>
                <p className="text-sm opacity-80">{contact.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Hospital Contacts */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Nearby Hospitals</h2>
          <div className="space-y-4">
            {hospitalContacts.map((hospital, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                  <p className="text-sm text-gray-600">{hospital.address}</p>
                </div>
                <a
                  href={`tel:${hospital.number}`}
                  className="inline-flex items-center px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {hospital.number}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Tips */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency First Aid Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {emergencyTips.map((tip, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Symptoms:</strong> {tip.symptoms}
                </p>
                <div>
                  <strong className="text-sm text-gray-700">Actions:</strong>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
                    {tip.actions.map((action, actionIndex) => (
                      <li key={actionIndex}>{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h4 className="font-semibold text-yellow-900">Important Reminder</h4>
                <p className="text-sm text-yellow-800 mt-1">
                  These are basic first aid tips. Always call emergency services (108) for serious medical emergencies. 
                  Do not attempt procedures you're not trained for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Emergency;