// Common rural health conditions and symptoms database
const symptomDatabase = {
  conditions: [
    {
      id: 1,
      name: {
        english: "Fever",
        hindi: "बुखार",
        punjabi: "ਬੁਖਾਰ"
      },
      symptoms: ["high_temperature", "chills", "sweating", "headache", "body_ache"],
      severity: "moderate",
      advice: {
        english: "Take rest, drink plenty of fluids. Consult doctor if fever persists for more than 3 days.",
        hindi: "आराम करें, खूब तरल पदार्थ पिएं। यदि बुखार 3 दिनों से अधिक रहता है तो डॉक्टर से सलाह लें।",
        punjabi: "ਆਰਾਮ ਕਰੋ, ਬਹੁਤ ਸਾਰੇ ਤਰਲ ਪਦਾਰਥ ਪੀਓ। ਜੇ ਬੁਖਾਰ 3 ਦਿਨਾਂ ਤੋਂ ਵੱਧ ਰਹਿੰਦਾ ਹੈ ਤਾਂ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।"
      }
    },
    {
      id: 2,
      name: {
        english: "Dengue",
        hindi: "डेंगू",
        punjabi: "ਡੇਂਗੂ"
      },
      symptoms: ["high_fever", "severe_headache", "eye_pain", "joint_pain", "rash", "bleeding"],
      severity: "high",
      advice: {
        english: "Seek immediate medical attention. Monitor platelet count.",
        hindi: "तुरंत चिकित्सा सहायता लें। प्लेटलेट काउंट की निगरानी करें।",
        punjabi: "ਤੁਰੰਤ ਡਾਕਟਰੀ ਸਹਾਇਤਾ ਲਓ। ਪਲੇਟਲੇਟ ਗਿਣਤੀ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ।"
      }
    },
    {
      id: 3,
      name: {
        english: "Malaria",
        hindi: "मलेरिया",
        punjabi: "ਮਲੇਰੀਆ"
      },
      symptoms: ["periodic_fever", "chills", "sweating", "headache", "nausea", "vomiting"],
      severity: "high",
      advice: {
        english: "Get blood test done immediately. Start antimalarial treatment as prescribed.",
        hindi: "तुरंत रक्त जांच करवाएं। निर्धारित एंटीमलेरियल उपचार शुरू करें।",
        punjabi: "ਤੁਰੰਤ ਖੂਨ ਦੀ ਜਾਂਚ ਕਰਵਾਓ। ਨਿਰਧਾਰਤ ਐਂਟੀਮਲੇਰੀਅਲ ਇਲਾਜ ਸ਼ੁਰੂ ਕਰੋ।"
      }
    },
    {
      id: 4,
      name: {
        english: "Diarrhea",
        hindi: "दस्त",
        punjabi: "ਦਸਤ"
      },
      symptoms: ["loose_stools", "abdominal_pain", "dehydration", "weakness", "nausea"],
      severity: "moderate",
      advice: {
        english: "Take ORS solution, maintain hydration. Avoid spicy food.",
        hindi: "ORS घोल लें, हाइड्रेशन बनाए रखें। मसालेदार भोजन से बचें।",
        punjabi: "ORS ਘੋਲ ਲਓ, ਹਾਈਡ੍ਰੇਸ਼ਨ ਬਣਾਈ ਰੱਖੋ। ਮਸਾਲੇਦਾਰ ਭੋਜਨ ਤੋਂ ਬਚੋ।"
      }
    },
    {
      id: 5,
      name: {
        english: "Respiratory Infection",
        hindi: "श्वसन संक्रमण",
        punjabi: "ਸਾਹ ਦੀ ਲਾਗ"
      },
      symptoms: ["cough", "cold", "breathing_difficulty", "chest_pain", "fever"],
      severity: "moderate",
      advice: {
        english: "Rest, steam inhalation, warm fluids. Consult if breathing difficulty increases.",
        hindi: "आराम, भाप लेना, गर्म तरल पदार्थ। सांस लेने में कठिनाई बढ़ने पर परामर्श लें।",
        punjabi: "ਆਰਾਮ, ਭਾਫ਼ ਲੈਣਾ, ਗਰਮ ਤਰਲ। ਸਾਹ ਲੈਣ ਵਿੱਚ ਮੁਸ਼ਕਲ ਵਧਣ 'ਤੇ ਸਲਾਹ ਲਓ।"
      }
    },
    {
      id: 6,
      name: {
        english: "Hypertension",
        hindi: "उच्च रक्तचाप",
        punjabi: "ਹਾਈ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ"
      },
      symptoms: ["headache", "dizziness", "chest_pain", "shortness_of_breath", "nosebleeds"],
      severity: "moderate",
      advice: {
        english: "Monitor blood pressure regularly, reduce salt intake, take prescribed medications.",
        hindi: "नियमित रूप से रक्तचाप की निगरानी करें, नमक का सेवन कम करें, निर्धारित दवाएं लें।",
        punjabi: "ਨਿਯਮਿਤ ਤੌਰ 'ਤੇ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ, ਨਮਕ ਦੀ ਮਾਤਰਾ ਘਟਾਓ, ਦਵਾਈਆਂ ਲਓ।"
      }
    },
    {
      id: 7,
      name: {
        english: "Diabetes",
        hindi: "मधुमेह",
        punjabi: "ਸ਼ੂਗਰ"
      },
      symptoms: ["frequent_urination", "excessive_thirst", "fatigue", "blurred_vision", "slow_healing"],
      severity: "chronic",
      advice: {
        english: "Monitor blood sugar, follow diet plan, regular exercise, take medications.",
        hindi: "रक्त शर्करा की निगरानी करें, आहार योजना का पालन करें, नियमित व्यायाम, दवाएं लें।",
        punjabi: "ਬਲੱਡ ਸ਼ੂਗਰ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ, ਖੁਰਾਕ ਯੋਜਨਾ ਦੀ ਪਾਲਣਾ ਕਰੋ, ਨਿਯਮਿਤ ਕਸਰਤ, ਦਵਾਈਆਂ ਲਓ।"
      }
    },
    {
      id: 8,
      name: {
        english: "Anemia",
        hindi: "एनीमिया",
        punjabi: "ਖੂਨ ਦੀ ਕਮੀ"
      },
      symptoms: ["weakness", "fatigue", "pale_skin", "dizziness", "shortness_of_breath"],
      severity: "moderate",
      advice: {
        english: "Iron-rich diet, vitamin C intake, iron supplements as prescribed.",
        hindi: "आयरन युक्त आहार, विटामिन सी का सेवन, निर्धारित आयरन सप्लीमेंट।",
        punjabi: "ਆਇਰਨ ਭਰਪੂਰ ਖੁਰਾਕ, ਵਿਟਾਮਿਨ ਸੀ ਦਾ ਸੇਵਨ, ਆਇਰਨ ਸਪਲੀਮੈਂਟ।"
      }
    },
    {
      id: 9,
      name: {
        english: "Skin Infection",
        hindi: "त्वचा संक्रमण",
        punjabi: "ਚਮੜੀ ਦੀ ਲਾਗ"
      },
      symptoms: ["rash", "itching", "redness", "swelling", "pus_formation"],
      severity: "low",
      advice: {
        english: "Keep area clean and dry, apply prescribed ointment, avoid scratching.",
        hindi: "क्षेत्र को साफ और सूखा रखें, निर्धारित मलम लगाएं, खुजलाने से बचें।",
        punjabi: "ਖੇਤਰ ਨੂੰ ਸਾਫ਼ ਅਤੇ ਸੁੱਕਾ ਰੱਖੋ, ਨਿਰਧਾਰਤ ਮਲਮ ਲਗਾਓ, ਖੁਰਕਣ ਤੋਂ ਬਚੋ।"
      }
    },
    {
      id: 10,
      name: {
        english: "Heat Stroke",
        hindi: "लू लगना",
        punjabi: "ਲੂ ਲੱਗਣਾ"
      },
      symptoms: ["high_temperature", "no_sweating", "confusion", "rapid_heartbeat", "nausea"],
      severity: "emergency",
      advice: {
        english: "EMERGENCY! Move to cool place immediately, apply cold water, seek urgent medical help.",
        hindi: "आपातकाल! तुरंत ठंडी जगह पर ले जाएं, ठंडा पानी लगाएं, तत्काल चिकित्सा सहायता लें।",
        punjabi: "ਐਮਰਜੈਂਸੀ! ਤੁਰੰਤ ਠੰਡੀ ਜਗ੍ਹਾ 'ਤੇ ਲੈ ਜਾਓ, ਠੰਡਾ ਪਾਣੀ ਲਗਾਓ, ਤੁਰੰਤ ਡਾਕਟਰੀ ਮਦਦ ਲਓ।"
      }
    }
  ],
  symptoms: {
    general: ["fever", "headache", "body_ache", "weakness", "fatigue"],
    respiratory: ["cough", "cold", "breathing_difficulty", "chest_pain", "sore_throat"],
    digestive: ["nausea", "vomiting", "diarrhea", "abdominal_pain", "loss_of_appetite"],
    skin: ["rash", "itching", "redness", "swelling", "pus_formation"],
    emergency: ["severe_bleeding", "unconsciousness", "severe_breathing_difficulty", "chest_pain", "severe_dehydration"]
  }
};

// Function to analyze symptoms and suggest conditions
function analyzeSymptoms(selectedSymptoms, language = 'english') {
  const matches = [];
  
  symptomDatabase.conditions.forEach(condition => {
    const matchingSymptoms = condition.symptoms.filter(symptom => 
      selectedSymptoms.includes(symptom)
    );
    
    if (matchingSymptoms.length > 0) {
      const matchPercentage = (matchingSymptoms.length / condition.symptoms.length) * 100;
      matches.push({
        condition: condition.name[language],
        matchPercentage: Math.round(matchPercentage),
        severity: condition.severity,
        advice: condition.advice[language],
        matchedSymptoms: matchingSymptoms.length,
        totalSymptoms: condition.symptoms.length
      });
    }
  });
  
  // Sort by match percentage
  matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
  
  // Check for emergency symptoms
  const hasEmergency = selectedSymptoms.some(symptom => 
    symptomDatabase.symptoms.emergency.includes(symptom)
  );
  
  return {
    possibleConditions: matches.slice(0, 3), // Top 3 matches
    requiresUrgentCare: hasEmergency || matches.some(m => m.severity === 'emergency'),
    generalAdvice: getGeneralAdvice(language)
  };
}

function getGeneralAdvice(language) {
  const advice = {
    english: "This is an initial assessment only. Please consult a doctor for proper diagnosis and treatment.",
    hindi: "यह केवल प्रारंभिक मूल्यांकन है। उचित निदान और उपचार के लिए कृपया डॉक्टर से परामर्श लें।",
    punjabi: "ਇਹ ਸਿਰਫ਼ ਸ਼ੁਰੂਆਤੀ ਮੁਲਾਂਕਣ ਹੈ। ਸਹੀ ਨਿਦਾਨ ਅਤੇ ਇਲਾਜ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।"
  };
  return advice[language] || advice.english;
}

module.exports = {
  symptomDatabase,
  analyzeSymptoms
};