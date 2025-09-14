// Wrap AI Service for Symptom Triage
// This is a mock implementation for MVP - replace with actual Wrap AI integration

export interface SymptomAnalysis {
  urgencyLevel: 'Low' | 'Medium' | 'High' | 'Emergency';
  confidence: number;
  recommendation: string;
  possibleConditions: string[];
  nextSteps: string;
  specialistNeeded: 'General' | 'Cardiologist' | 'Dermatologist' | 'Psychiatrist' | 'Orthopedic' | 'Emergency';
}

export interface TriageRequest {
  symptoms: string;
  patientAge?: number;
  gender?: 'male' | 'female' | 'other';
  duration?: string;
}

// Mock symptom analysis data for common rural health issues
const SYMPTOM_PATTERNS = [
  {
    keywords: ['fever', 'temperature', 'chills', 'hot'],
    analysis: {
      urgencyLevel: 'Medium' as const,
      confidence: 85,
      recommendation: 'Monitor temperature and stay hydrated. Consult a doctor if fever persists.',
      possibleConditions: ['Viral Fever', 'Bacterial Infection', 'Common Cold'],
      nextSteps: 'Take rest, drink fluids, and consult a general practitioner',
      specialistNeeded: 'General' as const
    }
  },
  {
    keywords: ['chest pain', 'heart', 'chest pressure', 'breathing difficulty'],
    analysis: {
      urgencyLevel: 'High' as const,
      confidence: 90,
      recommendation: 'Seek immediate medical attention for chest pain.',
      possibleConditions: ['Cardiac Issue', 'Respiratory Problem', 'Anxiety'],
      nextSteps: 'Contact emergency services or visit nearest hospital immediately',
      specialistNeeded: 'Emergency' as const
    }
  },
  {
    keywords: ['headache', 'head pain', 'migraine', 'dizzy'],
    analysis: {
      urgencyLevel: 'Low' as const,
      confidence: 75,
      recommendation: 'Rest in a quiet, dark room and stay hydrated.',
      possibleConditions: ['Tension Headache', 'Migraine', 'Dehydration'],
      nextSteps: 'Take adequate rest and consider consulting a doctor if persistent',
      specialistNeeded: 'General' as const
    }
  },
  {
    keywords: ['stomach', 'abdominal', 'nausea', 'vomiting', 'diarrhea'],
    analysis: {
      urgencyLevel: 'Medium' as const,
      confidence: 80,
      recommendation: 'Maintain hydration and follow BRAT diet.',
      possibleConditions: ['Gastroenteritis', 'Food Poisoning', 'Indigestion'],
      nextSteps: 'Stay hydrated, eat bland foods, consult doctor if symptoms worsen',
      specialistNeeded: 'General' as const
    }
  },
  {
    keywords: ['cough', 'cold', 'sneezing', 'runny nose', 'sore throat'],
    analysis: {
      urgencyLevel: 'Low' as const,
      confidence: 88,
      recommendation: 'Rest, warm fluids, and avoid cold exposure.',
      possibleConditions: ['Common Cold', 'Upper Respiratory Infection', 'Allergies'],
      nextSteps: 'Take rest, drink warm liquids, and monitor symptoms',
      specialistNeeded: 'General' as const
    }
  },
  {
    keywords: ['accident', 'injury', 'bleeding', 'broken', 'fracture', 'emergency'],
    analysis: {
      urgencyLevel: 'Emergency' as const,
      confidence: 95,
      recommendation: 'Call emergency services immediately.',
      possibleConditions: ['Physical Trauma', 'Fracture', 'Internal Injury'],
      nextSteps: 'Call 108 immediately and do not move the patient',
      specialistNeeded: 'Emergency' as const
    }
  },
  {
    keywords: ['diabetes', 'blood sugar', 'thirst', 'frequent urination'],
    analysis: {
      urgencyLevel: 'Medium' as const,
      confidence: 70,
      recommendation: 'Monitor blood sugar levels and maintain diet.',
      possibleConditions: ['Diabetes', 'High Blood Sugar', 'Dehydration'],
      nextSteps: 'Check blood sugar, follow diabetic diet, consult doctor',
      specialistNeeded: 'General' as const
    }
  },
  {
    keywords: ['skin', 'rash', 'itching', 'allergy', 'swelling'],
    analysis: {
      urgencyLevel: 'Low' as const,
      confidence: 65,
      recommendation: 'Avoid allergens and apply cool compress.',
      possibleConditions: ['Allergic Reaction', 'Skin Infection', 'Dermatitis'],
      nextSteps: 'Keep area clean, avoid scratching, consult dermatologist if persistent',
      specialistNeeded: 'Dermatologist' as const
    }
  }
];

export const analyzeSymptoms = async (request: TriageRequest): Promise<SymptomAnalysis> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      const symptoms = request.symptoms.toLowerCase();
      
      // Find matching pattern based on keywords
      const matchedPattern = SYMPTOM_PATTERNS.find(pattern => 
        pattern.keywords.some(keyword => symptoms.includes(keyword))
      );

      if (matchedPattern) {
        resolve(matchedPattern.analysis);
      } else {
        // Default analysis for unmatched symptoms
        resolve({
          urgencyLevel: 'Medium',
          confidence: 60,
          recommendation: 'Please consult with a general practitioner for proper diagnosis.',
          possibleConditions: ['General Health Concern', 'Requires Medical Assessment'],
          nextSteps: 'Schedule a consultation with a doctor for detailed examination',
          specialistNeeded: 'General'
        });
      }
    }, 1500); // Simulate AI processing time
  });
};

export const getUrgencyColor = (urgencyLevel: SymptomAnalysis['urgencyLevel']): string => {
  switch (urgencyLevel) {
    case 'Low': return 'text-green-600 bg-green-50 border-green-200';
    case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'High': return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'Emergency': return 'text-red-600 bg-red-50 border-red-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export const getSpecialistInfo = (specialist: SymptomAnalysis['specialistNeeded']) => {
  const specialistMap = {
    'General': { name: 'General Practitioner', availability: 'Available 24/7' },
    'Cardiologist': { name: 'Heart Specialist', availability: 'Mon-Fri, 9 AM - 5 PM' },
    'Dermatologist': { name: 'Skin Specialist', availability: 'Tue, Thu, Sat - 10 AM - 4 PM' },
    'Psychiatrist': { name: 'Mental Health Specialist', availability: 'Mon, Wed, Fri - 2 PM - 6 PM' },
    'Orthopedic': { name: 'Bone & Joint Specialist', availability: 'Mon-Sat, 8 AM - 2 PM' },
    'Emergency': { name: 'Emergency Services', availability: 'Immediate - Call 108' }
  };
  
  return specialistMap[specialist] || specialistMap['General'];
};