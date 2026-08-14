// Browser Speech Synthesis for German pronunciation

export interface TTSOptions {
  rate?: number; // 0.7 for slow beginner, 1.0 for normal
  pitch?: number;
  lang?: string;
}

class TTSService {
  private germanVoice: SpeechSynthesisVoice | null = null;
  private isInitialized = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.initVoices();
      };
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const voices = window.speechSynthesis.getVoices();
    // Prioritize natural or native German voices
    const deVoice = voices.find(
      (v) => v.lang.startsWith('de') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Neural'))
    ) || voices.find((v) => v.lang.startsWith('de')) || null;
    
    this.germanVoice = deVoice;
    this.isInitialized = true;
  }

  speakGerman(text: string, optionsOrRate: TTSOptions | number = {}) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this environment');
      return;
    }

    const options: TTSOptions =
      typeof optionsOrRate === 'number' ? { rate: optionsOrRate } : optionsOrRate;

    // Cancel ongoing speech to avoid overlap
    window.speechSynthesis.cancel();

    const cleanText = text.replace(/\[.*?\]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = options.lang || 'de-DE';
    utterance.rate = options.rate ?? 0.88; // Slightly slower for crisp clarity
    utterance.pitch = options.pitch ?? 1.0;

    if (this.germanVoice) {
      utterance.voice = this.germanVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const ttsService = new TTSService();
