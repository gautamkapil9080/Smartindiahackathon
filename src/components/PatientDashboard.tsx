import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { analyzeSymptoms, SymptomAnalysis, getUrgencyColor, getSpecialistInfo } from '../services/aiService';
import { createPatientRequest } from '../services/firestoreService';
import { voiceService, VoiceRecognitionResult } from '../services/voiceService';
import { FamilyService } from '../services/familyService';
import FamilyModeComponent from './FamilyMode';

const PatientDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [activeTab, setActiveTab] = useState<'symptoms' | 'emergency' | 'schemes' | 'family'>('symptoms');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceResult, setVoiceResult] = useState<VoiceRecognitionResult | null>(null);
  const [familyService, setFamilyService] = useState<FamilyService | null>(null);
  const [autoAnalyzeVoice, setAutoAnalyzeVoice] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Initialize family service
  useEffect(() => {
    if (user?.name) {
      const service = new FamilyService(user.name);
      setFamilyService(service);
    }
  }, [user]);

  // Enhanced voice recognition functionality
  const startEnhancedListening = () => {
    if (!voiceService.isSupported()) {
      alert('Voice recognition is not supported in this browser');
      return;
    }

    voiceService.startListening(
      // onResult
      (result: VoiceRecognitionResult) => {
        setVoiceResult(result);
        setSymptoms(result.transcript);
        
        // Auto-analyze if symptoms are detected and auto-analyze is enabled
        if (result.isSymptomRelated && autoAnalyzeVoice && result.extractedSymptoms.length > 0) {
          // Convert speech to better structured text for AI
          const structuredText = voiceService.convertToSymptomText(result.transcript, result.extractedSymptoms);
          setSymptoms(structuredText);
          
          // Auto-trigger analysis after a short delay
          setTimeout(() => {
            if (structuredText.trim()) {
              handleAnalyzeSymptoms(structuredText);
            }
          }, 1000);
        }
      },
      // onStart
      () => {
        setIsListening(true);
        setVoiceResult(null);
      },
      // onEnd
      () => {
        setIsListening(false);
      },
      // onError
      (error: string) => {
        setIsListening(false);
        alert(`Voice recognition error: ${error}`);
      }
    );
  };

  const stopListening = () => {
    voiceService.stopListening();
    setIsListening(false);
  };

  const handleAnalyzeSymptoms = async (customSymptoms?: string) => {
    const symptomsToAnalyze = customSymptoms || symptoms;
    if (!symptomsToAnalyze.trim()) {
      alert('Please enter your symptoms');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeSymptoms({ symptoms: symptomsToAnalyze });
      setAnalysis(result);
    } catch (error) {
      alert('Error analyzing symptoms. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmitConsultationRequest = async () => {
    if (!analysis || !user) return;

    setIsSubmittingRequest(true);
    try {
      await createPatientRequest({
        patientName: user.name,
        village: user.village || '',
        symptoms,
        aiTriage: `${analysis.recommendation} - ${analysis.nextSteps}`,
        urgencyLevel: analysis.urgencyLevel,
        status: 'pending'
      });

      alert('Consultation request submitted successfully! A doctor will review your case shortly.');
      setSymptoms('');
      setAnalysis(null);
    } catch (error) {
      alert('Error submitting request. Please try again.');
    } finally {
      setIsSubmittingRequest(false);
    }
  };

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
    { name: 'Ambulance', number: '108', color: 'bg-red-500' },
    { name: 'Fire Brigade', number: '101', color: 'bg-orange-500' },
    { name: 'Police', number: '100', color: 'bg-blue-500' },
    { name: 'Disaster Management', number: '1070', color: 'bg-purple-500' }
  ];

  const governmentSchemes = [
    {
      name: 'Ayushman Bharat PM-JAY',
      description: 'Free healthcare coverage up to ₹5 lakh per family',
      helpline: '14555',
      link: 'https://pmjay.gov.in/'
    },
    {
      name: 'Punjab Health Scheme',
      description: 'State healthcare scheme for Punjab residents',
      helpline: '1800-180-2024',
      link: 'https://pbhealth.gov.in/'
    },
    {
      name: 'Jan Aushadhi',
      description: 'Generic medicines at affordable prices',
      helpline: '1800-180-4090',
      link: 'https://janaushadhi.gov.in/'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Welcome, {user?.name}</h1>
                <p className="text-sm text-gray-500">{user?.village}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'symptoms', name: 'Symptom Checker', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
              { id: 'family', name: 'Family Mode', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
              { id: 'emergency', name: 'Emergency', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z' },
              { id: 'schemes', name: 'Gov. Schemes', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'symptoms' && (
          <div className="space-y-8">
            {/* Symptom Input */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Describe Your Symptoms</h2>
              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="input-field h-32 resize-none"
                    placeholder="Describe your symptoms in detail (e.g., 'I have fever, headache, and body ache for 2 days')"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    {/* Auto-analyze toggle */}
                    <button
                      onClick={() => setAutoAnalyzeVoice(!autoAnalyzeVoice)}
                      className={`p-2 text-white rounded-lg text-xs transition-all ${
                        autoAnalyzeVoice ? 'bg-secondary-500 hover:bg-secondary-600' : 'bg-gray-400 hover:bg-gray-500'
                      }`}
                      title={`Auto-analyze voice: ${autoAnalyzeVoice ? 'ON' : 'OFF'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </button>

                    {isListening ? (
                      <button
                        onClick={stopListening}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 animate-pulse"
                        title="Stop listening"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 012 0v4a1 1 0 01-2 0v-4z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10a1 1 0 012 0v4a1 1 0 01-2 0v-4z" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={startEnhancedListening}
                        className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                        title="Start voice input"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Voice Recognition Status */}
                {voiceResult && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-blue-900">
                          <strong>Voice Recognition:</strong> {Math.round(voiceResult.confidence * 100)}% confidence
                        </div>
                        {voiceResult.isSymptomRelated && (
                          <div className="text-xs text-blue-700 mt-1">
                            ✓ Medical symptoms detected: {voiceResult.extractedSymptoms.join(', ')}
                            {autoAnalyzeVoice && ' (Auto-analyzing...)'}
                          </div>
                        )}
                        {!voiceResult.isSymptomRelated && (
                          <div className="text-xs text-blue-600 mt-1">
                            💡 Try describing your symptoms more clearly
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Voice Instructions when listening */}
                {isListening && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-green-800">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <strong>Listening... Speak clearly about your symptoms</strong>
                      </div>
                      <ul className="text-xs text-green-700 space-y-1 ml-4">
                        {voiceService.getVoiceInstructions().map((instruction, index) => (
                          <li key={index}>• {instruction}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleAnalyzeSymptoms()}
                  disabled={isAnalyzing || !symptoms.trim()}
                  className="btn-primary flex items-center space-x-2 disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span>Analyze Symptoms</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AI Analysis Results */}
            {analysis && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Analysis Results</h3>
                <div className="space-y-4">
                  {/* Urgency Level */}
                  <div className={`p-4 rounded-lg border ${getUrgencyColor(analysis.urgencyLevel)}`}>
                    <div className="flex items-center space-x-3 mb-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 className="font-semibold">Urgency Level: {analysis.urgencyLevel}</h4>
                      <span className="text-sm">({analysis.confidence}% confidence)</span>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Recommendation</h4>
                      <p className="text-blue-800 text-sm">{analysis.recommendation}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Next Steps</h4>
                      <p className="text-purple-800 text-sm">{analysis.nextSteps}</p>
                    </div>
                  </div>

                  {/* Possible Conditions */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Possible Conditions</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.possibleConditions.map((condition, index) => (
                        <span key={index} className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specialist Info */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Recommended Specialist</h4>
                    <div className="text-green-800 text-sm">
                      <p className="font-medium">{getSpecialistInfo(analysis.specialistNeeded).name}</p>
                      <p>{getSpecialistInfo(analysis.specialistNeeded).availability}</p>
                    </div>
                  </div>

                  {/* Submit Consultation Request */}
                  {analysis.urgencyLevel !== 'Emergency' && (
                    <button
                      onClick={handleSubmitConsultationRequest}
                      disabled={isSubmittingRequest}
                      className="w-full btn-secondary flex items-center justify-center space-x-2"
                    >
                      {isSubmittingRequest ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span>Request Video Consultation</span>
                        </>
                      )}
                    </button>
                  )}
                  
                  {analysis.urgencyLevel === 'Emergency' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <h4 className="font-bold text-red-900">EMERGENCY SITUATION</h4>
                      </div>
                      <p className="text-red-800 mb-4">This requires immediate medical attention. Please call emergency services now.</p>
                      <button 
                        onClick={() => window.open('tel:108')}
                        className="btn-emergency w-full"
                      >
                        Call Ambulance (108)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'emergency' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Services</h2>
              
              {/* Location Sharing */}
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-2">Share Your Location</h3>
                <p className="text-red-800 text-sm mb-4">In case of emergency, share your location with emergency services.</p>
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

              {/* Emergency Contacts */}
              <div className="grid sm:grid-cols-2 gap-4">
                {emergencyContacts.map((contact, index) => (
                  <button
                    key={index}
                    onClick={() => window.open(`tel:${contact.number}`)}
                    className={`${contact.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity`}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div className="text-left">
                        <div className="font-semibold">{contact.name}</div>
                        <div className="text-sm opacity-90">{contact.number}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'family' && familyService && (
          <FamilyModeComponent familyService={familyService} />
        )}

        {activeTab === 'schemes' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Government Health Schemes</h2>
              <div className="grid gap-6">
                {governmentSchemes.map((scheme, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{scheme.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{scheme.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`tel:${scheme.helpline}`}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>Call {scheme.helpline}</span>
                      </a>
                      <a
                        href={scheme.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-secondary-500 text-white text-sm rounded-lg hover:bg-secondary-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>Learn More</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PatientDashboard;