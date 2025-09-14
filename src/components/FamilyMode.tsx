import React, { useState } from 'react';
import { FamilyService, FamilyMember, FamilyHealthRecord, getRelationshipDisplayName, getSeverityColor } from '../services/familyService';

interface FamilyModeProps {
  familyService: FamilyService;
}

const FamilyModeComponent: React.FC<FamilyModeProps> = ({ familyService }) => {
  const [members, setMembers] = useState<FamilyMember[]>(familyService.getFamilyMembers());
  const [selectedMemberId, setSelectedMemberId] = useState<string>(members[0]?.id || 'self');
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddRecord, setShowAddRecord] = useState(false);

  const selectedMember = members.find(m => m.id === selectedMemberId) || members[0];
  const records = familyService.getHealthRecords(selectedMember?.id);
  const summary = familyService.getFamilyHealthSummary();
  const insights = familyService.getHealthInsights();

  const refreshMembers = () => setMembers(familyService.getFamilyMembers());

  // Add Member State
  const [newMember, setNewMember] = useState<Partial<FamilyMember>>({
    name: '',
    relationship: 'child',
    gender: 'other',
    chronicConditions: [],
    allergies: []
  });

  // Add Record State
  const [newRecord, setNewRecord] = useState<Partial<FamilyHealthRecord>>({
    symptoms: '',
    medications: [],
    followUpRequired: false,
    notes: '',
    severity: 'low',
    status: 'active'
  });

  const handleAddMember = () => {
    if (!newMember.name || !newMember.relationship || !newMember.gender) return;
    const created = familyService.addFamilyMember({
      id: '', // ignored
      name: newMember.name!,
      relationship: newMember.relationship as any,
      gender: newMember.gender as any,
      chronicConditions: newMember.chronicConditions || [],
      allergies: newMember.allergies || [],
      dateOfBirth: newMember.dateOfBirth,
      age: newMember.age,
      bloodGroup: newMember.bloodGroup,
      emergencyContact: newMember.emergencyContact,
      photo: newMember.photo,
      createdAt: new Date(),
      updatedAt: new Date()
    } as any);
    setShowAddMember(false);
    setNewMember({ name: '', relationship: 'child', gender: 'other', chronicConditions: [], allergies: [] });
    refreshMembers();
    setSelectedMemberId(created.id);
  };

  const handleAddRecord = () => {
    if (!newRecord.symptoms) return;
    familyService.addHealthRecord({
      id: '', // ignored
      familyMemberId: selectedMemberId,
      memberName: selectedMember?.name || '',
      date: new Date(),
      symptoms: newRecord.symptoms!,
      diagnosis: newRecord.diagnosis,
      medications: newRecord.medications || [],
      doctorName: newRecord.doctorName,
      followUpRequired: newRecord.followUpRequired || false,
      notes: newRecord.notes || '',
      severity: newRecord.severity as any,
      status: newRecord.status as any
    } as any);
    setShowAddRecord(false);
    setNewRecord({ symptoms: '', medications: [], followUpRequired: false, notes: '', severity: 'low', status: 'active' });
  };

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-500">{summary.totalMembers}</div>
          <div className="text-sm text-gray-600">Family Members</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-500">{summary.activeHealthIssues}</div>
          <div className="text-sm text-gray-600">Active Health Issues</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-secondary-500">{insights.averageAge}</div>
          <div className="text-sm text-gray-600">Average Age</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-500">{summary.membersNeedingAttention.length}</div>
          <div className="text-sm text-gray-600">Needs Attention</div>
        </div>
      </div>

      {/* Member Selector & Actions */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-gray-900">Family Members</h3>
            <button
              onClick={() => setShowAddMember(true)}
              className="px-3 py-2 bg-secondary-500 hover:bg-secondary-600 text-white text-sm rounded-lg"
            >
              + Add Member
            </button>
          </div>
          <div>
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="input-field"
            >
              {members.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name} ({getRelationshipDisplayName(member.relationship)})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Member Details */}
        {selectedMember && (
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Profile</h4>
              <div className="text-sm text-gray-700 space-y-1">
                <div><span className="font-medium">Name:</span> {selectedMember.name}</div>
                <div><span className="font-medium">Relationship:</span> {getRelationshipDisplayName(selectedMember.relationship)}</div>
                {selectedMember.age && (
                  <div><span className="font-medium">Age:</span> {selectedMember.age}</div>
                )}
                {selectedMember.gender && (
                  <div><span className="font-medium">Gender:</span> {selectedMember.gender}</div>
                )}
                {selectedMember.bloodGroup && (
                  <div><span className="font-medium">Blood Group:</span> {selectedMember.bloodGroup}</div>
                )}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Chronic Conditions</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMember.chronicConditions.length === 0 ? (
                  <span className="text-sm text-gray-600">No chronic conditions listed</span>
                ) : selectedMember.chronicConditions.map((cond, i) => (
                  <span key={i} className="px-2 py-1 bg-white border rounded-full text-xs">{cond}</span>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Allergies</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMember.allergies.length === 0 ? (
                  <span className="text-sm text-gray-600">No allergies listed</span>
                ) : selectedMember.allergies.map((allergy, i) => (
                  <span key={i} className="px-2 py-1 bg-white border rounded-full text-xs">{allergy}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Health Records */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Health Records</h3>
          <button
            onClick={() => setShowAddRecord(true)}
            className="px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm rounded-lg"
          >
            + Add Record
          </button>
        </div>

        {records.length === 0 ? (
          <div className="text-center py-8 text-gray-600">No health records yet for this member</div>
        ) : (
          <div className="space-y-3">
            {records.map(record => (
              <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">{new Date(record.date).toLocaleDateString('en-IN')}</div>
                    <div className="font-medium text-gray-900">{record.diagnosis || 'Diagnosis pending'}</div>
                    <div className="text-sm text-gray-700 mt-1">Symptoms: {record.symptoms}</div>
                    {record.medications.length > 0 && (
                      <div className="text-sm text-gray-700 mt-1">Medicines: {record.medications.join(', ')}</div>
                    )}
                    {record.notes && (
                      <div className="text-sm text-gray-700 mt-1">Notes: {record.notes}</div>
                    )}
                  </div>
                  <div className={`ml-3 px-2 py-1 rounded-full text-xs border ${getSeverityColor(record.severity)}`}>
                    {record.severity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="font-semibold text-gray-900">Add Family Member</h3>
              <button onClick={() => setShowAddMember(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={newMember.name || ''} 
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="e.g., Asha Devi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                  <select
                    className="input-field"
                    value={newMember.relationship}
                    onChange={(e) => setNewMember({ ...newMember, relationship: e.target.value as any })}
                  >
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="grandparent">Grandparent</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    className="input-field"
                    value={newMember.gender}
                    onChange={(e) => setNewMember({ ...newMember, gender: e.target.value as any })}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age (optional)</label>
                  <input 
                    type="number" 
                    className="input-field"
                    value={newMember.age || ''}
                    onChange={(e) => setNewMember({ ...newMember, age: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder="e.g., 35"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chronic Conditions (comma separated)</label>
                  <input 
                    type="text" 
                    className="input-field"
                    value={(newMember.chronicConditions || []).join(', ')}
                    onChange={(e) => setNewMember({ ...newMember, chronicConditions: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                    placeholder="e.g., Diabetes, Hypertension"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Allergies (comma separated)</label>
                  <input 
                    type="text" 
                    className="input-field"
                    value={(newMember.allergies || []).join(', ')}
                    onChange={(e) => setNewMember({ ...newMember, allergies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                    placeholder="e.g., Penicillin, Peanuts"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <button onClick={() => setShowAddMember(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                <button onClick={handleAddMember} className="px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg">Add Member</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Record Modal */}
      {showAddRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="font-semibold text-gray-900">Add Health Record</h3>
              <button onClick={() => setShowAddRecord(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms</label>
                <textarea
                  className="input-field h-24"
                  value={newRecord.symptoms || ''}
                  onChange={(e) => setNewRecord({ ...newRecord, symptoms: e.target.value })}
                  placeholder="Describe symptoms..."
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis (optional)</label>
                  <input
                    className="input-field"
                    value={newRecord.diagnosis || ''}
                    onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
                    placeholder="e.g., Viral fever"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Name (optional)</label>
                  <input
                    className="input-field"
                    value={newRecord.doctorName || ''}
                    onChange={(e) => setNewRecord({ ...newRecord, doctorName: e.target.value })}
                    placeholder="e.g., Dr. Sharma"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                <select
                  className="input-field"
                  value={newRecord.severity}
                  onChange={(e) => setNewRecord({ ...newRecord, severity: e.target.value as any })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  className="input-field"
                  value={newRecord.status}
                  onChange={(e) => setNewRecord({ ...newRecord, status: e.target.value as any })}
                >
                  <option value="active">Active</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medications (comma separated)</label>
                <input
                  className="input-field"
                  value={(newRecord.medications || []).join(', ')}
                  onChange={(e) => setNewRecord({ ...newRecord, medications: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  placeholder="e.g., Paracetamol, Cetirizine"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  className="input-field h-24"
                  value={newRecord.notes || ''}
                  onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                  placeholder="Any additional details..."
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <button onClick={() => setShowAddRecord(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                <button onClick={handleAddRecord} className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg">Add Record</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyModeComponent;