import React, { useState } from 'react';

interface PharmacyPortalProps {
  onBackToHome: () => void;
}

const PharmacyPortal: React.FC<PharmacyPortalProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'prescriptions' | 'orders'>('inventory');

  const sampleMedicines = [
    { name: 'Paracetamol 500mg', stock: 150, price: 2.50, category: 'Pain Relief' },
    { name: 'Amoxicillin 250mg', stock: 75, price: 8.00, category: 'Antibiotic' },
    { name: 'Omeprazole 20mg', stock: 45, price: 12.00, category: 'Gastric' },
    { name: 'Metformin 500mg', stock: 200, price: 5.50, category: 'Diabetes' },
    { name: 'Amlodipine 5mg', stock: 80, price: 6.25, category: 'Blood Pressure' },
  ];

  const samplePrescriptions = [
    { id: 'RX001', patient: 'Rajesh Kumar', doctor: 'Dr. Sharma', medicines: ['Paracetamol 500mg', 'Amoxicillin 250mg'], status: 'Ready' },
    { id: 'RX002', patient: 'Priya Singh', doctor: 'Dr. Patel', medicines: ['Metformin 500mg'], status: 'Preparing' },
    { id: 'RX003', patient: 'Amit Verma', doctor: 'Dr. Gupta', medicines: ['Amlodipine 5mg', 'Omeprazole 20mg'], status: 'Pending' },
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
              <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Pharmacy Portal</h1>
                <p className="text-sm text-gray-500">Manage medicines and prescriptions</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Nabha Region Pharmacy Network
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'inventory', name: 'Medicine Inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
              { id: 'prescriptions', name: 'Prescriptions', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { id: 'orders', name: 'Orders & Delivery', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-accent-500 text-accent-600'
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
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Medicine Inventory</h2>
                <button className="btn-primary">
                  Add Medicine
                </button>
              </div>
              
              {/* Search Bar */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search medicines..."
                  className="input-field w-full max-w-md"
                />
              </div>

              {/* Medicine List */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (₹)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sampleMedicines.map((medicine, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{medicine.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {medicine.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${medicine.stock < 50 ? 'text-red-600' : 'text-gray-900'}`}>
                            {medicine.stock} units
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{medicine.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-accent-600 hover:text-accent-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prescriptions' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Prescription Management</h2>
              
              <div className="space-y-4">
                {samplePrescriptions.map((prescription, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">Prescription #{prescription.id}</h3>
                        <p className="text-sm text-gray-600">Patient: {prescription.patient} | Doctor: {prescription.doctor}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        prescription.status === 'Ready' ? 'bg-green-100 text-green-800' :
                        prescription.status === 'Preparing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {prescription.status}
                      </span>
                    </div>
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Medicines:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {prescription.medicines.map((medicine, medIndex) => (
                          <li key={medIndex}>{medicine}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex space-x-3">
                      <button className="btn-primary text-sm">Update Status</button>
                      <button className="btn-secondary text-sm">Print Label</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Orders & Delivery</h2>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Orders & Delivery Management</h3>
                <p className="text-gray-600 mb-4">Track medicine orders and manage deliveries to patients</p>
                <button className="btn-primary">Coming Soon</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PharmacyPortal;