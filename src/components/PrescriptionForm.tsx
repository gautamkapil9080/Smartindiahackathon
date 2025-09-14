import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PatientRequest, createPrescription } from '../services/firestoreService';
import { 
  PrescriptionData, 
  downloadPrescriptionPDF, 
  COMMON_MEDICINES, 
  COMMON_FREQUENCIES, 
  COMMON_DURATIONS 
} from '../services/prescriptionService';

interface PrescriptionFormProps {
  patientRequest: PatientRequest;
  onClose: () => void;
  onPrescriptionCreated: () => void;
}

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({ 
  patientRequest, 
  onClose, 
  onPrescriptionCreated 
}) => {
  const { user } = useAuth();
  const [diagnosis, setDiagnosis] = useState('');
  const [medicines, setMedicines] = useState<Medicine[]>([
    { name: '', dosage: '', frequency: '', duration: '' }
  ]);
  const [notes, setNotes] = useState('');
  const [patientAge, setPatientAge] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const removeMedicine = (index: number) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter((_, i) => i !== index));
    }
  };

  const updateMedicine = (index: number, field: keyof Medicine, value: string) => {
    const updatedMedicines = medicines.map((medicine, i) => 
      i === index ? { ...medicine, [field]: value } : medicine
    );
    setMedicines(updatedMedicines);
  };

  const fillCommonMedicine = (index: number, medicineData: typeof COMMON_MEDICINES[0]) => {
    updateMedicine(index, 'name', medicineData.name);
    if (medicineData.commonDosages.length > 0) {
      updateMedicine(index, 'dosage', medicineData.commonDosages[0]);
    }
    if (medicineData.commonFrequencies.length > 0) {
      updateMedicine(index, 'frequency', medicineData.commonFrequencies[0]);
    }
    if (medicineData.commonDurations.length > 0) {
      updateMedicine(index, 'duration', medicineData.commonDurations[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!diagnosis.trim()) {
      alert('Please enter a diagnosis');
      return;
    }

    const validMedicines = medicines.filter(m => 
      m.name.trim() && m.dosage.trim() && m.frequency.trim() && m.duration.trim()
    );

    if (validMedicines.length === 0) {
      alert('Please add at least one complete medicine entry');
      return;
    }

    if (!user) {
      alert('User not authenticated');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create prescription in Firestore
      await createPrescription({
        patientRequestId: patientRequest.id!,
        patientName: patientRequest.patientName,
        doctorName: user.name,
        medicines: validMedicines,
        diagnosis: diagnosis.trim(),
        notes: notes.trim()
      });

      // Generate and download PDF
      const prescriptionData: PrescriptionData = {
        patientName: patientRequest.patientName,
        patientAge: patientAge === '' ? undefined : Number(patientAge),
        village: patientRequest.village,
        doctorName: user.name,
        diagnosis: diagnosis.trim(),
        medicines: validMedicines,
        notes: notes.trim(),
        consultationDate: new Date()
      };

      downloadPrescriptionPDF(prescriptionData);
      
      alert('Prescription created and downloaded successfully!');
      onPrescriptionCreated();
      onClose();
    } catch (error) {
      console.error('Error creating prescription:', error);
      alert('Error creating prescription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Create Prescription</h2>
              <p className="text-sm text-gray-600">Patient: {patientRequest.patientName} • {patientRequest.village}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Patient Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Age (optional)
              </label>
              <input
                type="number"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value === '' ? '' : Number(e.target.value))}
                className="input-field"
                placeholder="Enter patient age"
                min="0"
                max="120"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Date
              </label>
              <input
                type="text"
                value={new Date().toLocaleDateString('en-IN')}
                className="input-field bg-gray-50"
                disabled
              />
            </div>
          </div>

          {/* Symptoms Review */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Patient Symptoms</h3>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-900 text-sm">{patientRequest.symptoms}</p>
            </div>
          </div>

          {/* AI Triage Review */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">AI Analysis</h3>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-purple-900 text-sm">{patientRequest.aiTriage}</p>
            </div>
          </div>

          {/* Diagnosis */}
          <div>
            <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 mb-2">
              Diagnosis *
            </label>
            <textarea
              id="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="input-field h-24 resize-none"
              placeholder="Enter your diagnosis based on the consultation..."
              required
            />
          </div>

          {/* Medicines */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Prescribed Medications</h3>
              <button
                type="button"
                onClick={addMedicine}
                className="btn-secondary text-sm px-4 py-2"
              >
                <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Medicine
              </button>
            </div>

            <div className="space-y-4">
              {medicines.map((medicine, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-900">Medicine {index + 1}</h4>
                    {medicines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMedicine(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Medicine Name
                      </label>
                      <input
                        type="text"
                        value={medicine.name}
                        onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                        className="input-field"
                        placeholder="e.g., Paracetamol 500mg"
                        list={`medicines-${index}`}
                      />
                      <datalist id={`medicines-${index}`}>
                        {COMMON_MEDICINES.map((med, i) => (
                          <option key={i} value={med.name} />
                        ))}
                      </datalist>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dosage
                      </label>
                      <input
                        type="text"
                        value={medicine.dosage}
                        onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                        className="input-field"
                        placeholder="e.g., 1 tablet"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Frequency
                      </label>
                      <select
                        value={medicine.frequency}
                        onChange={(e) => updateMedicine(index, 'frequency', e.target.value)}
                        className="input-field"
                      >
                        <option value="">Select frequency</option>
                        {COMMON_FREQUENCIES.map((freq, i) => (
                          <option key={i} value={freq}>{freq}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <select
                        value={medicine.duration}
                        onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                        className="input-field"
                      >
                        <option value="">Select duration</option>
                        {COMMON_DURATIONS.map((dur, i) => (
                          <option key={i} value={dur}>{dur}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Quick Fill Options */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Quick fill common medicines:</p>
                    <div className="flex flex-wrap gap-2">
                      {COMMON_MEDICINES.slice(0, 4).map((commonMed, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => fillCommonMedicine(index, commonMed)}
                          className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full"
                        >
                          {commonMed.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Instructions */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Instructions (Optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input-field h-24 resize-none"
              placeholder="Any additional instructions for the patient..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 btn-secondary flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Create & Download Prescription</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionForm;