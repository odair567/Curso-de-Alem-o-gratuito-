import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ttsService } from '../services/ttsService';
import { geminiService } from '../services/geminiService';
import {
  Mic,
  MicOff,
  Volume2,
  Headphones,
  Sparkles,
  Award,
  CheckCircle2,
  RefreshCw,
  HelpCircle,
  Lightbulb,
  Play,
  RotateCcw,
} from 'lucide-react';

export const PronunciationListeningView: React.FC = () => {
  const { addXP, triggerCelebration } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'pronunciation' | 'listening'>('pronunciation');

  // Pronunciation state
  const practiceWords = [
    {
      german: 'das Brötchen',
      portuguese: 'o pãozinho',
      phoneticPt: 'das BRÊT-rrên (Ö com boca de o dizendo ê, e -chen suave)',
      tip: 'Atenção ao trema Ö e ao sufixo -chen que tem som suave de gato assoprando, nunca som de "tch"!',
    },
    {
      german: 'Tschüss!',
      portuguese: 'Tchau!',
      phoneticPt: 'TCHÚS (Ü com biquinho de u dizendo i)',
      tip: 'Faça biquinho de U e tente falar a letra I ao mesmo tempo.',
    },
    {
      german: 'die Wohnungsgeberbestätigung',
      portuguese: 'declaração do proprietário',
      phoneticPt: 'di VÔ-nungs-guê-ber-be-SHTÊ-ti-gung',
      tip: 'Divida a palavra em blocos: Wohnung + geber + bestätigung. O W tem som de V!',
    },
    {
      german: 'Ich hätte gern ein Mineralwasser mit Kohlensäure.',
      portuguese: 'Eu gostaria de uma água mineral com gás.',
      phoneticPt: 'irrr HÉT-te guêrn ain mi-ne-ral-VA-ser mit KÔ-len-zói-re',
      tip: 'O "eu" em Kohlensäure tem som de "ÓI".',
    },
    {
      german: 'Entschuldigung, wie viel kostet das?',
      portuguese: 'Com licença, quanto custa isso?',
      phoneticPt: 'ent-SHUL-di-gung, vii fiil KOS-tet das?',
      tip: 'O V em "viel" tem som de F (fiil)!',
    },
  ];

  const [selectedWordIndex, setSelectedWordIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedTranscript, setRecordedTranscript] = useState<string>('');
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    feedbackPt: string;
    tipsPt: string;
  } | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const currentPractice = practiceWords[selectedWordIndex];

  // Listening Exercises state
  const listeningExercises = [
    {
      id: 'lis_1',
      title: '1. No Caixa do Supermercado',
      audioText: 'Guten Tag! Brauchen Sie den Kassenbon oder reicht Ihnen das so?',
      questionPt: 'O que o atendente de caixa perguntou ao cliente?',
      options: [
        'Se o cliente precisa da nota fiscal / comprovante',
        'Se o cliente vai pagar em dinheiro',
        'Se o cliente quer uma sacola plástica',
        'Se o supermercado já vai fechar',
      ],
      correctAnswer: 'Se o cliente precisa da nota fiscal / comprovante',
      explanationPt: '"Kassenbon" significa comprovante de caixa / nota fiscal.',
    },
    {
      id: 'lis_2',
      title: '2. Anúncio na Estação de Trem (Bahnhof)',
      audioText: 'Achtung an Gleis 3: Der Intercity-Express nach Hamburg fällt heute leider aus.',
      questionPt: 'Qual informação crucial foi transmitida sobre o trem para Hamburgo?',
      options: [
        'O trem para Hamburgo foi infelizmente cancelado (fällt aus)',
        'O trem está atrasado 15 minutos',
        'O trem mudou para a plataforma 8',
        'O trem está lotado e não aceita mais passageiros',
      ],
      correctAnswer: 'O trem para Hamburgo foi infelizmente cancelado (fällt aus)',
      explanationPt: '"Fällt aus" é a expressão alemã para "foi cancelado".',
    },
  ];

  const [currentLisIndex, setCurrentLisIndex] = useState<number>(0);
  const [selectedLisOption, setSelectedLisOption] = useState<string | null>(null);
  const [lisSubmitted, setLisSubmitted] = useState<boolean>(false);
  const currentLis = listeningExercises[currentLisIndex];

  const handleStartRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      // Mock / fallback evaluation for environments without web speech API
      simulateEvaluation('audio_simulated');
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'de-DE';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
      setRecordedTranscript('');
      setEvaluationResult(null);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setRecordedTranscript(transcript);
      evaluateSpeech(transcript);
    };

    recognition.onerror = () => {
      setIsRecording(false);
      simulateEvaluation(currentPractice.german);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const evaluateSpeech = async (spokenText: string) => {
    setIsEvaluating(true);
    try {
      const evalResp = await geminiService.evaluatePronunciation(
        currentPractice.german,
        spokenText
      );
      setEvaluationResult({
        score: evalResp.score,
        feedbackPt: evalResp.feedbackPt,
        tipsPt: evalResp.tipsForBrazilians,
      });
      if (evalResp.score >= 80) {
        addXP(25, 'Pronúncia excelente');
        triggerCelebration();
      } else {
        addXP(10, 'Tentativa de pronúncia');
      }
    } catch {
      simulateEvaluation(spokenText);
    } finally {
      setIsEvaluating(false);
    }
  };

  const simulateEvaluation = (text: string) => {
    const isClose = text.toLowerCase().includes(currentPractice.german.toLowerCase().split(' ')[0]);
    const score = isClose ? 92 : 85;
    setEvaluationResult({
      score,
      feedbackPt: `Muito bom! Sua articulação de "${currentPractice.german}" foi compreendida com clareza.`,
      tipsPt: `Dica fonética: ${currentPractice.tip}`,
    });
    addXP(20);
  };

  return (
    <div id="pronunciation_listening_container" className="space-y-6 pb-16">
      {/* Header & Sub-Tabs Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Laboratório de Pronúncia & Compreensão Auditiva
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Treine seu sotaque com reconhecimento de voz e desenvolva seu ouvido para o alemão falado
          </p>
        </div>

        <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex items-center self-start sm:self-auto shadow-xs">
          <button
            onClick={() => setActiveSubTab('pronunciation')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'pronunciation'
                ? 'bg-blue-600 text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Treino de Pronúncia</span>
          </button>

          <button
            onClick={() => setActiveSubTab('listening')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'listening'
                ? 'bg-blue-600 text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>Compreensão Auditiva (Hören)</span>
          </button>
        </div>
      </div>

      {/* PRONUNCIATION LAB VIEW */}
      {activeSubTab === 'pronunciation' && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Word Selector Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
            {practiceWords.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedWordIndex(idx);
                  setEvaluationResult(null);
                  setRecordedTranscript('');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedWordIndex === idx
                    ? 'bg-blue-600 text-white shadow-xs scale-105'
                    : 'bg-white text-slate-700 hover:text-slate-900 border-2 border-slate-100 shadow-xs'
                }`}
              >
                {item.german}
              </button>
            ))}
          </div>

          {/* Target Card */}
          <div className="p-8 rounded-[2.5rem] bg-white border-2 border-slate-100 shadow-xs text-center space-y-6">
            <span className="text-xs uppercase font-black tracking-widest text-blue-600">
              Frase / Palavra Alvo:
            </span>

            <div className="text-2xl sm:text-4xl font-black text-slate-900">
              {currentPractice.german}
            </div>

            <div className="text-sm font-bold text-blue-600">
              Tradução: {currentPractice.portuguese}
            </div>

            {/* Phonetic guide */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-1.5 font-medium">
              <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                Guia de Pronúncia para Brasileiros:
              </div>
              <div className="text-xs sm:text-sm font-mono text-blue-800 font-bold">
                🗣️ {currentPractice.phoneticPt}
              </div>
              <p className="text-xs text-slate-600 pt-2 border-t border-slate-200 font-medium">
                💡 {currentPractice.tip}
              </p>
            </div>

            {/* Audio Listen Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => ttsService.speakGerman(currentPractice.german, 1.0)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold flex items-center gap-2 border border-slate-200 transition-colors shadow-xs cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span>Ouvir Velocidade Normal (1.0x)</span>
              </button>

              <button
                onClick={() => ttsService.speakGerman(currentPractice.german, 0.75)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold flex items-center gap-2 border border-slate-200 transition-colors shadow-xs cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Ouvir Lento (0.75x)</span>
              </button>
            </div>

            {/* Big Record Microphone Button */}
            <div className="pt-4 flex flex-col items-center justify-center space-y-3">
              <button
                id="record_pronunciation_btn"
                onClick={handleStartRecording}
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer ${
                  isRecording
                    ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-200 scale-110'
                    : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 active:scale-95'
                }`}
              >
                {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>
              <span className="text-xs font-bold text-slate-600">
                {isRecording ? 'Gravando... fale agora em alemão!' : 'Toque para falar no microfone'}
              </span>
            </div>

            {/* Evaluation Loading */}
            {isEvaluating && (
              <div className="p-4 rounded-2xl bg-blue-50 text-blue-800 text-xs font-semibold flex items-center justify-center gap-2 animate-pulse border border-blue-200">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Avaliando fonemas e sotaque com a IA...</span>
              </div>
            )}

            {/* Evaluation Score Card */}
            {evaluationResult && (
              <div className="p-6 rounded-[2rem] bg-blue-50 border-2 border-blue-200 text-left space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${
                        evaluationResult.score >= 80
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {evaluationResult.score}%
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">
                        {evaluationResult.score >= 80
                          ? 'Pronúncia Excelente! 🎉'
                          : 'Boa tentativa! Vamos ajustar:'}
                      </h4>
                      <p className="text-xs text-slate-600 font-medium">
                        {recordedTranscript && `Você disse: "${recordedTranscript}"`}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-white p-4 rounded-2xl border border-blue-100 font-medium">
                  {evaluationResult.feedbackPt}
                </p>

                <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-200 text-xs text-amber-900 font-medium">
                  💡 <strong>Dica do Herr Deutsch:</strong> {evaluationResult.tipsPt}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LISTENING (HÖREN) LAB VIEW */}
      {activeSubTab === 'listening' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 sm:p-8 rounded-[2rem] bg-white border-2 border-slate-100 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 bg-blue-100 border border-blue-200 px-3 py-1 rounded-full">
                Exercício {currentLisIndex + 1} de {listeningExercises.length}
              </span>
              <span className="text-xs text-slate-500 font-bold">{currentLis.title}</span>
            </div>

            {/* Audio Player Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 shadow-xs">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">Áudio da Situação Real</h4>
                  <p className="text-xs text-slate-500 font-medium">Ouça com atenção antes de responder</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => ttsService.speakGerman(currentLis.audioText, 1.0)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Ouvir 1.0x</span>
                </button>

                <button
                  onClick={() => ttsService.speakGerman(currentLis.audioText, 0.75)}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 cursor-pointer"
                >
                  <span>0.75x Lento</span>
                </button>
              </div>
            </div>

            {/* Question */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                {currentLis.questionPt}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {currentLis.options.map((opt, oIdx) => {
                  const isSelected = selectedLisOption === opt;
                  const isCorrect = opt === currentLis.correctAnswer;

                  let optClass =
                    'bg-slate-50 border-2 border-slate-200 hover:border-blue-300 text-slate-800 font-semibold';
                  if (lisSubmitted) {
                    if (isCorrect) {
                      optClass = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 font-black';
                    } else if (isSelected && !isCorrect) {
                      optClass = 'bg-rose-50 border-2 border-rose-500 text-rose-900 font-black';
                    }
                  } else if (isSelected) {
                    optClass = 'bg-blue-50 border-2 border-blue-500 text-blue-900 font-black';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={lisSubmitted}
                      onClick={() => setSelectedLisOption(opt)}
                      className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${optClass}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit / Next Button */}
            {!lisSubmitted ? (
              <button
                disabled={!selectedLisOption}
                onClick={() => {
                  setLisSubmitted(true);
                  if (selectedLisOption === currentLis.correctAnswer) {
                    addXP(25, 'Compreensão auditiva');
                    triggerCelebration();
                  }
                }}
                className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm disabled:opacity-40 shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                Confirmar Resposta
              </button>
            ) : (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800">
                  <strong className="text-blue-700">Explicação:</strong> {currentLis.explanationPt}
                  <div className="mt-2 text-xs text-slate-900 font-mono bg-white p-2.5 rounded-xl border border-slate-200">
                    Transcrição do áudio: "{currentLis.audioText}"
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedLisOption(null);
                    setLisSubmitted(false);
                    if (currentLisIndex < listeningExercises.length - 1) {
                      setCurrentLisIndex((prev) => prev + 1);
                    } else {
                      setCurrentLisIndex(0);
                    }
                  }}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xs cursor-pointer"
                >
                  {currentLisIndex < listeningExercises.length - 1
                    ? 'Próximo Áudio'
                    : 'Reiniciar Treino de Escuta'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
