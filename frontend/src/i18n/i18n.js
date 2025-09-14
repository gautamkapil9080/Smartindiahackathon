import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to Rural Healthcare",
      login: "Login",
      register: "Register",
      dashboard: "Dashboard",
      consultations: "Consultations",
      symptomChecker: "Symptom Checker",
      medicines: "Medicine Tracker",
      healthRecords: "Health Records"
    }
  },
  hi: {
    translation: {
      welcome: "ग्रामीण स्वास्थ्य सेवा में आपका स्वागत है",
      login: "लॉग इन करें",
      register: "रजिस्टर करें",
      dashboard: "डैशबोर्ड",
      consultations: "परामर्श",
      symptomChecker: "लक्षण जांचकर्ता",
      medicines: "दवा ट्रैकर",
      healthRecords: "स्वास्थ्य रिकॉर्ड"
    }
  },
  pa: {
    translation: {
      welcome: "ਪਿੰਡਾਂ ਦੀ ਸਿਹਤ ਸੇਵਾ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ",
      login: "ਲੌਗਇਨ",
      register: "ਰਜਿਸਟਰ",
      dashboard: "ਡੈਸ਼ਬੋਰਡ",
      consultations: "ਸਲਾਹ-ਮਸ਼ਵਰਾ",
      symptomChecker: "ਲੱਛਣ ਜਾਂਚਕਰਤਾ",
      medicines: "ਦਵਾਈ ਟਰੈਕਰ",
      healthRecords: "ਸਿਹਤ ਰਿਕਾਰਡ"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;