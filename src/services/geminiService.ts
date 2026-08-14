import { CourseLevel, ExerciseItem } from '../types';

export interface TeacherChatResponse {
  replyDe: string;
  replyPt: string;
  correctionsPt?: string;
  suggestedVocab?: string[];
  explanationPt?: string;
}

export interface PronunciationScoreResponse {
  score: number;
  isAccurate: boolean;
  feedbackPt: string;
  tipsForBrazilians: string;
  phoneticTips?: string[];
}

export interface GrammarExplainResponse {
  title: string;
  explanationPt: string;
  summaryPt: string;
  rules: string[];
  examples: { german: string; portuguese: string; note?: string }[];
  brazilianPitfall?: string;
}

export async function askTeacherAI(
  message: string,
  history: { sender: 'user' | 'teacher' | 'ai'; text: string }[] = [],
  userLevel: CourseLevel = 'A1',
  contextTopic: string = 'Geral'
): Promise<TeacherChatResponse> {
  try {
    const formattedHistory = history.map((h) => ({
      sender: h.sender === 'ai' ? ('teacher' as const) : h.sender,
      text: h.text,
    }));
    const res = await fetch('/api/teacher-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history: formattedHistory, userLevel, contextTopic }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const data = await res.json();
    return {
      replyDe: data.germanReply || data.replyDe || 'Sehr gut! Was möchtest du als Nächstes sagen?',
      replyPt: data.explanationPt || data.replyPt || data.replyText || 'Muito bem! Como posso te ajudar?',
      correctionsPt: data.correction || data.correctionsPt,
      suggestedVocab: data.grammarTopicsDetected || data.suggestedVocab || [],
      explanationPt: data.explanationPt,
    };
  } catch (error) {
    console.warn('Fallback teacher response on client network issue', error);
    return {
      replyDe: 'Das ist eine sehr gute Frage! Auf Deutsch sagen wir: "Übung macht den Meister".',
      replyPt: `Entendi sua pergunta: "${message}". Em alemão, lembre-se da posição do verbo na oração principal (sempre na posição 2).`,
      correctionsPt: 'Dica: Mantenha sempre a inicial de substantivos em maiúscula!',
      suggestedVocab: ['das Wort (a palavra)', 'der Satz (a frase)', 'die Übung (o exercício)'],
      explanationPt: 'A prática constante leva à fluência.',
    };
  }
}

export async function evaluatePronunciationAI(
  targetText: string,
  spokenText: string
): Promise<PronunciationScoreResponse> {
  try {
    const res = await fetch('/api/pronunciation-evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetText, spokenText }),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return {
      score: data.score || 85,
      isAccurate: data.isAccurate ?? true,
      feedbackPt: data.feedbackPt || 'Pronúncia clara e compreensível!',
      tipsForBrazilians: Array.isArray(data.phoneticTips)
        ? data.phoneticTips.join(' • ')
        : data.tipsForBrazilians || 'Articule com calma os sons consonantais alemães.',
      phoneticTips: data.phoneticTips || [],
    };
  } catch (error) {
    const cleanTarget = targetText.toLowerCase().trim();
    const cleanSpoken = (spokenText || '').toLowerCase().trim();
    const isExact = cleanTarget === cleanSpoken;
    return {
      score: isExact ? 95 : spokenText ? 82 : 60,
      isAccurate: isExact || (spokenText?.length || 0) > 2,
      feedbackPt: isExact
        ? 'Pronúncia excelente e clara!'
        : 'Boa tentativa! Foque nos sons característicos alemães como o W (com som de V) e as vogais com trema.',
      tipsForBrazilians: 'Dica: Para o trema Ö faça boca de O e fale Ê. Para o Ü faça bico de U e fale I.',
      phoneticTips: ['Pratique repetindo a frase devagar', 'Articule bem a terminação das palavras'],
    };
  }
}

export async function explainGrammarAI(
  topic: string,
  userLevel: CourseLevel = 'A1',
  question?: string
): Promise<GrammarExplainResponse> {
  try {
    const res = await fetch('/api/explain-grammar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, userLevel, question }),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return {
      title: data.title || topic,
      explanationPt: data.summaryPt || data.explanationPt || `Guia prático de ${topic}.`,
      summaryPt: data.summaryPt || `Explicação de ${topic}`,
      rules: data.rules || ['Atenção ao gênero dos artigos (der, die, das) e aos 4 casos.'],
      examples: data.examples || [{ german: 'Ich lerne Deutsch.', portuguese: 'Eu aprendo alemão.' }],
      brazilianPitfall: data.brazilianPitfall,
    };
  } catch (error) {
    return {
      title: topic,
      explanationPt: `Tópico: ${topic}. Este conceito gramatical é essencial no nível ${userLevel}. Lembre-se que em alemão os casos definem as funções dos elementos na oração (sujeito = Nominativo, objeto direto = Acusativo, objeto indireto = Dativo).`,
      summaryPt: `Guia prático de ${topic} para falantes de português.`,
      rules: [
        'Atenção ao gênero dos substantivos (der, die, das).',
        'O verbo sempre vai para a posição 2 em orações afirmativas principais.',
      ],
      examples: [
        { german: 'Ich lerne Deutsch.', portuguese: 'Eu aprendo alemão.' },
        { german: 'Der Tisch ist groß.', portuguese: 'A mesa é grande.' },
      ],
      brazilianPitfall: 'Substantivos em alemão são sempre escritos com inicial MAIÚSCULA!',
    };
  }
}

export async function fetchAdaptiveExercises(
  weakArea: string,
  level: CourseLevel = 'A1',
  count: number = 3
): Promise<ExerciseItem[]> {
  try {
    const res = await fetch('/api/adaptive-exercises', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weakArea, level, count }),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.exercises || [];
  } catch (error) {
    return [];
  }
}

export const geminiService = {
  chatWithTeacher: askTeacherAI,
  evaluatePronunciation: evaluatePronunciationAI,
  explainGrammar: explainGrammarAI,
  generateAdaptiveExercises: fetchAdaptiveExercises,
};
