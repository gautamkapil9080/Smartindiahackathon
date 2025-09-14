import React from 'react';

interface GovernmentSchemesProps {
  onBackToHome: () => void;
}

const GovernmentSchemes: React.FC<GovernmentSchemesProps> = ({ onBackToHome }) => {
  const governmentSchemes = [
    {
      name: 'Ayushman Bharat PM-JAY',
      description: 'Free healthcare coverage up to ₹5 lakh per family per year for secondary and tertiary hospitalization',
      helpline: '14555',
      link: 'https://pmjay.gov.in/',
      benefits: [
        'Free treatment in empaneled hospitals',
        'Coverage for pre-existing conditions',
        'No cap on family size and age',
        'Cashless and paperless treatment'
      ],
      eligibility: 'Rural and urban poor families as per SECC 2011 database'
    },
    {
      name: 'Punjab Health Scheme',
      description: 'State healthcare scheme providing comprehensive medical coverage for Punjab residents',
      helpline: '1800-180-2024',
      link: 'https://pbhealth.gov.in/',
      benefits: [
        'Free treatment in government hospitals',
        'Subsidized treatment in private hospitals',
        'Emergency medical services',
        'Medicine assistance program'
      ],
      eligibility: 'All Punjab residents with valid state ID'
    },
    {
      name: 'Jan Aushadhi Scheme',
      description: 'Generic medicines at affordable prices through dedicated Jan Aushadhi stores',
      helpline: '1800-180-4090',
      link: 'https://janaushadhi.gov.in/',
      benefits: [
        'Generic medicines at 50-90% lower prices',
        'Quality assured by Bureau of Indian Standards',
        'Wide range of medicines available',
        'Easy accessibility through stores'
      ],
      eligibility: 'Available to all citizens without any restrictions'
    },
    {
      name: 'Rashtriya Swasthya Bima Yojana (RSBY)',
      description: 'Health insurance scheme for Below Poverty Line (BPL) families',
      helpline: '1800-180-1111',
      link: 'https://www.rsby.gov.in/',
      benefits: [
        'Insurance coverage up to ₹30,000 per family',
        'Covers hospitalization expenses',
        'Pre-existing diseases covered',
        'Transport allowance provided'
      ],
      eligibility: 'BPL families identified by respective state governments'
    },
    {
      name: 'Janani Shishu Suraksha Karyakram (JSSK)',
      description: 'Free delivery and treatment services for pregnant women and sick newborns',
      helpline: '104',
      link: 'https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=841&lid=168',
      benefits: [
        'Free delivery in public health institutions',
        'Free C-section when required',
        'Free medicines and diagnostics',
        'Free diet during stay in health institutions'
      ],
      eligibility: 'All pregnant women delivering in public health institutions'
    },
    {
      name: 'Rashtriya Bal Swasthya Karyakram (RBSK)',
      description: 'Child health screening and early intervention services',
      helpline: '104',
      link: 'https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=818&lid=168',
      benefits: [
        'Free health screening for children',
        'Treatment of 4 Ds (Defects, Diseases, Deficiencies, Disabilities)',
        'Early intervention services',
        'Referral and follow-up services'
      ],
      eligibility: 'All children from birth to 18 years'
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
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Government Health Schemes</h1>
                <p className="text-sm text-gray-500">Access healthcare benefits and schemes</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Healthcare Schemes</h2>
          <p className="text-gray-600">
            Explore various government healthcare schemes available to rural communities. 
            These schemes provide free or subsidized healthcare services to eligible beneficiaries.
          </p>
        </div>

        <div className="space-y-8">
          {governmentSchemes.map((scheme, index) => (
            <div key={index} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{scheme.name}</h3>
                  <p className="text-gray-600 mb-4">{scheme.description}</p>
                </div>
                <div className="ml-4 flex flex-col space-y-2">
                  <a
                    href={`tel:${scheme.helpline}`}
                    className="inline-flex items-center px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call {scheme.helpline}
                  </a>
                  <a
                    href={scheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-secondary-500 text-white text-sm rounded-lg hover:bg-secondary-600 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Learn More
                  </a>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Benefits */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Key Benefits
                  </h4>
                  <ul className="space-y-2">
                    {scheme.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="text-green-800 text-sm flex items-start">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Eligibility */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Eligibility Criteria
                  </h4>
                  <p className="text-blue-800 text-sm leading-relaxed">{scheme.eligibility}</p>
                </div>
              </div>

              {/* Quick Action */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Need Help?</p>
                    <p className="text-sm text-gray-600">Contact the helpline for assistance with enrollment or queries</p>
                  </div>
                  <button
                    onClick={() => {
                      const message = `Hello, I need information about ${scheme.name}. Can you help me with the enrollment process?`;
                      const phoneNumber = scheme.helpline.replace(/[^\d]/g, '');
                      const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
                      window.open(smsUrl);
                    }}
                    className="px-4 py-2 bg-accent-500 text-white text-sm rounded-lg hover:bg-accent-600 transition-colors"
                  >
                    Send SMS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 card bg-gradient-to-r from-primary-50 to-secondary-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Important Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Document Requirements</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Aadhaar Card</li>
                <li>• Ration Card</li>
                <li>• Income Certificate (if applicable)</li>
                <li>• Residence Proof</li>
                <li>• Bank Account Details</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">How to Apply</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Visit nearest Common Service Center (CSC)</li>
                <li>• Contact local Health Worker (ASHA/ANM)</li>
                <li>• Apply online through respective portals</li>
                <li>• Visit district hospital or PHC</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GovernmentSchemes;