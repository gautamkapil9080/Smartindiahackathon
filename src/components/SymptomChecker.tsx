import React, { useState, useRef } from 'react';
import { analyzeSymptoms, SymptomAnalysis, getUrgencyColor, getSpecialistInfo } from '../services/aiService';
import { voiceService, VoiceRecognitionResult } from '../services/voiceService';

interface SymptomCheckerProps {
  onBackToHome: () => void;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onBackToHome }) => {
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceResult, setVoiceResult] = useState<VoiceRecognitionResult | null>(null);
  const [autoAnalyzeVoice, setAutoAnalyzeVoice] = useState(true);

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
          const structuredText = voiceService.convertToSymptomText(result.transcript, result.extractedSymptoms);
          setSymptoms(structuredText);
          
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
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">AI Symptom Checker</h1>
                <p className="text-sm text-gray-500">Get intelligent symptom analysis</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      </main>
    </div>
  );
};

export default SymptomChecker;