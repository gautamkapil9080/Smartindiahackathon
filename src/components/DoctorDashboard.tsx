import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  listenToPendingRequests, 
  updateRequestStatus, 
  PatientRequest,
  getPrescriptionByRequestId 
} from '../services/firestoreService';
import { getUrgencyColor } from '../services/aiService';

interface JitsiMeetProps {
  roomName: string;
  onClose: () => void;
  patientName: string;
}

const JitsiMeet: React.FC<JitsiMeetProps> = ({ roomName, onClose, patientName }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isJitsiLoaded, setIsJitsiLoaded] = useState(false);

  useEffect(() => {
    // Load Jitsi Meet API
    if (!(window as any).JitsiMeetExternalAPI) {
      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      script.onload = () => setIsJitsiLoaded(true);
      document.head.appendChild(script);
      
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    } else {
      setIsJitsiLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isJitsiLoaded && containerRef.current) {
      const api = new (window as any).JitsiMeetExternalAPI('meet.jit.si', {
        roomName: roomName,
        width: '100%',
        height: 500,
        parentNode: containerRef.current,
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          enableWelcomePage: false,
          prejoinPageEnabled: false,
          disableProfile: true,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            'fodeviceselection', 'hangup', 'profile', 'recording',
            'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
            'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
            'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
          ],
          SETTINGS_SECTIONS: ['devices', 'language', 'moderator', 'profile', 'calendar'],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        },
        userInfo: {
          displayName: `Dr. (consulting ${patientName})`
        }
      });

      api.addEventListener('readyToClose', onClose);
      api.addEventListener('participantLeft', (participant: any) => {
        if (participant.id !== api.getParticipantsInfo()[0]?.participantId) {
          // Patient left the call
          setTimeout(onClose, 2000);
        }
      });

      return () => {
        api.dispose();
      };
    }
  }, [isJitsiLoaded, roomName, onClose, patientName]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Video Consultation with {patientName}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {!isJitsiLoaded ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <svg className="animate-spin h-8 w-8 text-primary-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading video call...</p>
            </div>
          </div>
        ) : (
          <div ref={containerRef} className="w-full h-96 rounded-lg overflow-hidden"></div>
        )}
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Room ID: {roomName} • This call is automatically recorded for medical records</p>
        </div>
      </div>
    </div>
  );
};

const DoctorDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [patientRequests, setPatientRequests] = useState<PatientRequest[]>([]);
  const [activeCall, setActiveCall] = useState<{ roomName: string; patientName: string; requestId: string } | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<PatientRequest | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Listen to real-time updates of pending requests
    const unsubscribe = listenToPendingRequests((requests) => {
      setPatientRequests(requests);
    });

    return () => unsubscribe();
  }, []);

  const handleAcceptConsultation = async (request: PatientRequest) => {
    if (!request.id || !user) return;

    setIsLoading(true);
    try {
      const roomName = `consultation-${request.id}-${Date.now()}`;
      
      // Update request status to accepted
      await updateRequestStatus(request.id, 'accepted', user.email, roomName);
      
      // Start video call
      setActiveCall({ 
        roomName, 
        patientName: request.patientName,
        requestId: request.id 
      });
    } catch (error) {
      alert('Error accepting consultation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndCall = async () => {
    if (!activeCall) return;

    try {
      // Update request status to completed
      await updateRequestStatus(activeCall.requestId, 'completed');
      setActiveCall(null);
      
      // Show prescription form
      const request = patientRequests.find(r => r.id === activeCall.requestId);
      if (request) {
        setSelectedRequest(request);
      }
    } catch (error) {
      alert('Error ending consultation. Please try again.');
    }
  };

  const getTimeAgo = (timestamp: any) => {
    if (!timestamp || !timestamp.seconds) return 'Just now';
    
    const now = Date.now();
    const requestTime = timestamp.seconds * 1000;
    const diffInMinutes = Math.floor((now - requestTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const urgencyOrder = { 'Emergency': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
  const sortedRequests = [...patientRequests].sort((a, b) => 
    (urgencyOrder[b.urgencyLevel] || 0) - (urgencyOrder[a.urgencyLevel] || 0)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{user?.name}</h1>
                <p className="text-sm text-gray-500">Doctor Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-500">{patientRequests.length}</div>
                <div className="text-xs text-gray-500">Pending</div>
              </div>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Consultation Requests</h2>
          <p className="text-gray-600">Review and accept patient consultation requests below.</p>
        </div>

        {sortedRequests.length === 0 ? (
          <div className="card text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Requests</h3>
            <p className="text-gray-600 mb-6">All patient consultation requests have been handled.</p>
            <div className="text-sm text-gray-500">
              <p>• New requests will appear here automatically</p>
              <p>• Emergency cases are prioritized at the top</p>
              <p>• Video calls are conducted via Jitsi Meet</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedRequests.map((request) => (
              <div key={request.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{request.patientName}</h3>
                        <p className="text-sm text-gray-500">{request.village} • {getTimeAgo(request.createdAt)}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(request.urgencyLevel)}`}>
                        {request.urgencyLevel}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Symptoms</h4>
                        <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">{request.symptoms}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">AI Analysis</h4>
                        <p className="text-gray-600 text-sm bg-blue-50 p-3 rounded-lg">{request.aiTriage}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t">
                  <button
                    onClick={() => handleAcceptConsultation(request)}
                    disabled={isLoading}
                    className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Starting...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Start Video Consultation</span>
                      </>
                    )}
                  </button>
                  
                  {request.urgencyLevel === 'Emergency' && (
                    <button
                      onClick={() => window.open(`tel:108`)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span>Call Emergency</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Today's Stats</h3>
            <div className="text-2xl font-bold text-primary-500">{patientRequests.length}</div>
            <div className="text-xs text-gray-500">Active Requests</div>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Emergency Cases</h3>
            <div className="text-2xl font-bold text-red-500">
              {patientRequests.filter(r => r.urgencyLevel === 'Emergency').length}
            </div>
            <div className="text-xs text-gray-500">Urgent Attention</div>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">High Priority</h3>
            <div className="text-2xl font-bold text-orange-500">
              {patientRequests.filter(r => r.urgencyLevel === 'High').length}
            </div>
            <div className="text-xs text-gray-500">Needs Attention</div>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Locations</h3>
            <div className="text-2xl font-bold text-secondary-500">
              {new Set(patientRequests.map(r => r.village)).size}
            </div>
            <div className="text-xs text-gray-500">Villages Served</div>
          </div>
        </div>
      </main>

      {/* Video Call Modal */}
      {activeCall && (
        <JitsiMeet
          roomName={activeCall.roomName}
          patientName={activeCall.patientName}
          onClose={handleEndCall}
        />
      )}
    </div>
  );
};

export default DoctorDashboard;