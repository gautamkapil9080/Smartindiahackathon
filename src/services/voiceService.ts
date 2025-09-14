export interface VoiceRecognitionResult {
  transcript: string;
  confidence: number;
  isSymptomRelated: boolean;
  extractedSymptoms: string[];
}

export class VoiceService {
  private recognition: any = null;
  private isListening: boolean = false;

  constructor() {
    this.initializeRecognition();
  }

  private initializeRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    
    // Configure recognition settings
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-IN'; // English (India) for better Hindi-English mix recognition
    this.recognition.maxAlternatives = 3;
  }

  isSupported(): boolean {
    return this.recognition !== null;
  }

  startListening(
    onResult: (result: VoiceRecognitionResult) => void,
    onStart: () => void,
    onEnd: () => void,
    onError: (error: string) => void
  ): void {
    if (!this.recognition || this.isListening) {
      onError('Voice recognition not available or already listening');
      return;
    }

    let finalTranscript = '';
    let interimTranscript = '';

    this.recognition.onstart = () => {
      this.isListening = true;
      onStart();
    };

    this.recognition.onresult = (event: any) => {
      interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        const confidence = event.results[i][0].confidence;
        
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      // Process the current transcript
      const currentTranscript = finalTranscript + interimTranscript;
      const analysisResult = this.analyzeForSymptoms(currentTranscript);
      
      onResult({
        transcript: currentTranscript.trim(),
        confidence: event.results[event.resultIndex]?.[0]?.confidence || 0.8,
        isSymptomRelated: analysisResult.isSymptomRelated,
        extractedSymptoms: analysisResult.symptoms
      });
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      let errorMessage = 'Speech recognition error';
      
      switch(event.error) {
        case 'network':
          errorMessage = 'Network error during speech recognition';
          break;
        case 'not-allowed':
          errorMessage = 'Microphone access denied. Please allow microphone access.';
          break;
        case 'no-speech':
          errorMessage = 'No speech detected. Please try speaking clearly.';
          break;
        case 'audio-capture':
          errorMessage = 'Audio capture failed. Check your microphone.';
          break;
        default:
          errorMessage = `Speech recognition error: ${event.error}`;
      }
      
      onError(errorMessage);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      onEnd();
    };

    try {
      this.recognition.start();
    } catch (error) {
      this.isListening = false;
      onError('Failed to start speech recognition');
    }
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  getListeningState(): boolean {
    return this.isListening;
  }

  private analyzeForSymptoms(text: string): { isSymptomRelated: boolean; symptoms: string[] } {
    const lowerText = text.toLowerCase();
    
    // Common symptom keywords in English and Hindi-English mix
    const symptomKeywords = [
      // Physical symptoms
      'pain', 'ache', 'hurt', 'sore', 'burning', 'sharp', 'dull',
      'fever', 'temperature', 'hot', 'cold', 'chills', 'shiver',
      'headache', 'head pain', 'migraine', 'dizzy', 'dizziness',
      'cough', 'cold', 'sneeze', 'runny nose', 'blocked nose', 'congestion',
      'sore throat', 'throat pain', 'difficulty swallowing',
      'stomach', 'belly', 'abdomen', 'nausea', 'vomit', 'diarrhea', 'constipation',
      'chest', 'breathing', 'shortness of breath', 'wheeze',
      'tired', 'fatigue', 'weakness', 'exhaustion',
      'rash', 'itch', 'skin', 'swelling', 'bump',
      'joint', 'muscle', 'back pain', 'neck pain',
      
      // Hindi-English common terms
      'bukhar', 'dard', 'peeda', 'khansi', 'jukam', 'sir dard',
      'pet', 'chakkar', 'ulti', 'dast', 'kamjori',
      
      // Symptom descriptors
      'since', 'days', 'weeks', 'morning', 'night', 'after eating',
      'severe', 'mild', 'getting worse', 'better', 'same',
      
      // Body parts
      'head', 'eyes', 'ears', 'nose', 'mouth', 'neck', 'chest',
      'arms', 'hands', 'legs', 'feet', 'back', 'stomach'
    ];

    const medicalPhrases = [
      'i have', 'i am having', 'i feel', 'i am feeling',
      'my', 'there is', 'it hurts', 'problem with',
      'difficulty in', 'unable to', 'can\'t', 'cannot'
    ];

    // Check for symptom-related content
    let isSymptomRelated = false;
    const foundSymptoms: string[] = [];

    // Check for medical phrases
    for (const phrase of medicalPhrases) {
      if (lowerText.includes(phrase)) {
        isSymptomRelated = true;
        break;
      }
    }

    // Extract specific symptoms
    for (const symptom of symptomKeywords) {
      if (lowerText.includes(symptom)) {
        isSymptomRelated = true;
        if (!foundSymptoms.includes(symptom)) {
          foundSymptoms.push(symptom);
        }
      }
    }

    // Additional heuristics
    const questionWords = ['what', 'how', 'when', 'where', 'why'];
    const hasQuestionWords = questionWords.some(word => lowerText.includes(word));
    
    // If text contains medical terms but no question words, likely symptoms
    if (foundSymptoms.length > 0 && !hasQuestionWords) {
      isSymptomRelated = true;
    }

    return {
      isSymptomRelated,
      symptoms: foundSymptoms
    };
  }

  // Convert speech to structured symptom data
  convertToSymptomText(transcript: string, extractedSymptoms: string[]): string {
    if (extractedSymptoms.length === 0) {
      return transcript;
    }

    // Clean and structure the transcript for better AI analysis
    let structuredText = transcript;

    // Add context if missing
    if (!transcript.toLowerCase().includes('i have') && 
        !transcript.toLowerCase().includes('i am') &&
        !transcript.toLowerCase().includes('my')) {
      structuredText = `I have ${transcript}`;
    }

    // Add duration context if mentioned
    const durationKeywords = ['since', 'for', 'from', 'days', 'weeks', 'months'];
    const hasDuration = durationKeywords.some(word => transcript.toLowerCase().includes(word));
    
    if (!hasDuration && extractedSymptoms.length > 0) {
      structuredText += '. This started recently.';
    }

    return structuredText;
  }

  // Get voice instructions for users
  getVoiceInstructions(): string[] {
    return [
      "Speak clearly and naturally about your symptoms",
      "You can say things like 'I have fever and headache'",
      "Mention when the symptoms started if possible",
      "Describe the intensity: mild, moderate, or severe",
      "You can speak in Hindi-English mix too",
      "Take your time and speak slowly for better recognition"
    ];
  }
}

// Export singleton instance
export const voiceService = new VoiceService();