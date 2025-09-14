import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Prescription, getPrescriptionByRequestId } from '../services/firestoreService';
import { downloadPrescriptionPDF, PrescriptionData } from '../services/prescriptionService';

const PatientPrescriptions: React.FC = () => {
  const { user, logout } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  useEffect(() => {
    // In a real app, you would fetch all prescriptions for the current patient
    // For this MVP, we'll show a mock prescription or empty state
    const loadPrescriptions = async () => {
      setIsLoading(true);
      try {
        // Mock data for demonstration
        // In real implementation, fetch by patient name/ID
        setTimeout(() => {
          setPrescriptions([]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading prescriptions:', error);
        setIsLoading(false);
      }
    };

    loadPrescriptions();
  }, [user]);

  const handleDownloadPrescription = (prescription: Prescription) => {
    const prescriptionData: PrescriptionData = {
      patientName: prescription.patientName,
      village: user?.village || '',
      doctorName: prescription.doctorName,
      diagnosis: prescription.diagnosis,
      medicines: prescription.medicines,
      notes: prescription.notes,
      consultationDate: prescription.createdAt.toDate()
    };

    downloadPrescriptionPDF(prescriptionData);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp || !timestamp.toDate) return 'Unknown';
    return timestamp.toDate().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp || !timestamp.toDate) return '';
    return timestamp.toDate().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-primary-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading your prescriptions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">My Prescriptions</h1>
                <p className="text-sm text-gray-500">{user?.name} • {user?.village}</p>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Digital Prescriptions</h2>
          <p className="text-gray-600">View and download your medical prescriptions from consultations.</p>
        </div>

        {prescriptions.length === 0 ? (
          <div className="card text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Prescriptions Yet</h3>
            <p className="text-gray-600 mb-6">Your prescriptions from doctor consultations will appear here.</p>
            
            {/* Demo Prescription */}
            <div className="max-w-md mx-auto mt-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Demo Prescription Available</h4>
                <p className="text-blue-800 text-sm mb-4">
                  Click below to see what a prescription looks like and download a sample PDF.
                </p>
                <button
                  onClick={() => {
                    const demoPrescription: PrescriptionData = {
                      patientName: user?.name || 'Demo Patient',
                      patientAge: 35,
                      village: user?.village || 'Demo Village',
                      doctorName: 'Dr. Demo Physician',
                      diagnosis: 'Common cold with mild fever. Rest and hydration recommended.',
                      medicines: [
                        {
                          name: 'Paracetamol 500mg',
                          dosage: '1 tablet',
                          frequency: 'Three times daily',
                          duration: '5 days'
                        },
                        {
                          name: 'Cetirizine 10mg',
                          dosage: '1 tablet',
                          frequency: 'Once daily at bedtime',
                          duration: '3 days'
                        }
                      ],
                      notes: 'Take complete rest for 3-4 days. Drink plenty of warm water. Avoid cold food and beverages. Return if symptoms worsen.',
                      consultationDate: new Date()
                    };
                    
                    downloadPrescriptionPDF(demoPrescription, 'demo_prescription.pdf');
                  }}
                  className="btn-primary text-sm px-4 py-2"
                >
                  Download Demo Prescription
                </button>
              </div>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="text-left">
                  <h5 className="font-medium text-gray-700 mb-2">How to get prescriptions:</h5>
                  <ul className="space-y-1">
                    <li>• Complete symptom analysis</li>
                    <li>• Request video consultation</li>
                    <li>• Consult with doctor</li>
                    <li>• Receive digital prescription</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h5 className="font-medium text-gray-700 mb-2">Prescription features:</h5>
                  <ul className="space-y-1">
                    <li>• PDF download available</li>
                    <li>• Digital signature</li>
                    <li>• Medicine details included</li>
                    <li>• Dosage instructions clear</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{prescription.doctorName}</h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(prescription.createdAt)} • {formatTime(prescription.createdAt)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPrescription(prescription)}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Diagnosis</h4>
                    <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                      {prescription.diagnosis}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Medicines ({prescription.medicines.length})</h4>
                    <div className="space-y-2">
                      {prescription.medicines.slice(0, 2).map((medicine, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          <span className="font-medium">{medicine.name}</span> - {medicine.dosage} {medicine.frequency}
                        </div>
                      ))}
                      {prescription.medicines.length > 2 && (
                        <div className="text-sm text-gray-500">
                          +{prescription.medicines.length - 2} more medicines
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t">
                  <button
                    onClick={() => handleDownloadPrescription(prescription)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download PDF</span>
                  </button>
                  <button
                    onClick={() => setSelectedPrescription(prescription)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Health Tips */}
        <div className="mt-8 card bg-gradient-to-r from-primary-50 to-secondary-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Medicine Safety Tips</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h4 className="font-medium mb-2">Taking Medicines Safely:</h4>
              <ul className="space-y-1">
                <li>• Take medicines exactly as prescribed</li>
                <li>• Complete the full course even if feeling better</li>
                <li>• Take with food if stomach upset occurs</li>
                <li>• Set reminders for regular timing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">When to Contact Doctor:</h4>
              <ul className="space-y-1">
                <li>• Side effects or allergic reactions</li>
                <li>• No improvement after prescribed duration</li>
                <li>• Symptoms get worse</li>
                <li>• Questions about your medicines</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Prescription Detail Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Prescription Details</h3>
                <button
                  onClick={() => setSelectedPrescription(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Doctor</h4>
                  <p className="text-gray-600">{selectedPrescription.doctorName}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Date</h4>
                  <p className="text-gray-600">{formatDate(selectedPrescription.createdAt)}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Diagnosis</h4>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedPrescription.diagnosis}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Prescribed Medicines</h4>
                <div className="space-y-3">
                  {selectedPrescription.medicines.map((medicine, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="font-medium text-gray-900 mb-1">{medicine.name}</div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Dosage:</span> {medicine.dosage}
                        </div>
                        <div>
                          <span className="font-medium">Frequency:</span> {medicine.frequency}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> {medicine.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedPrescription.notes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Additional Instructions</h4>
                  <p className="text-gray-600 bg-blue-50 p-3 rounded-lg">{selectedPrescription.notes}</p>
                </div>
              )}

              <div className="flex space-x-3 pt-4 border-t">
                <button
                  onClick={() => handleDownloadPrescription(selectedPrescription)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setSelectedPrescription(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientPrescriptions;