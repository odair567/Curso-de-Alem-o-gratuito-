import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CourseLevel, UserProfile } from '../types';
import {
  Sparkles,
  BookOpen,
  Target,
  ArrowRight,
  CheckCircle2,
  Award,
} from 'lucide-react';

interface OnboardingModalProps {
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
  const { finishOnboarding, triggerCelebration } = useApp();
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>('Estudante');
  const [reason, setReason] = useState<string>('Viver e trabalhar na Alemanha');
  const [goalMinutes, setGoalMinutes] = useState<number>(15);
  const [livesInGermany, setLivesInGermany] = useState<boolean>(true);

  // Diagnostic Test Questions
  const diagnosticQuestions = [
    {
      id: 'd1',
      question: 'Complete a saudação: "Guten ___ ! Wie geht es Ihnen?"',
      options: ['Tag', 'Buch', 'Tisch', 'Wasser'],
      correctAnswer: 'Tag',
      levelPoints: 'A1',
    },
    {
      id: 'd2',
      question: 'Qual artigo corresponde a "Wohnung" (apartamento)?',
      options: ['die', 'der', 'das', 'den'],
      correctAnswer: 'die',
      levelPoints: 'A1',
    },
    {
      id: 'd3',
      question: 'Complete a frase no passado: "Ich ___ gestern nach Frankfurt gefahren."',
      options: ['bin', 'habe', 'war', 'hatte'],
      correctAnswer: 'bin',
      levelPoints: 'A2',
    },
    {
      id: 'd4',
      question: 'Qual conjunção significa "embora" e joga o verbo para o final?',
      options: ['obwohl', 'weil', 'und', 'aber'],
      correctAnswer: 'obwohl',
      levelPoints: 'B1',
    },
  ];

  const [diagAnswers, setDiagAnswers] = useState<Record<string, string>>({});
  const [evaluatedLevel, setEvaluatedLevel] = useState<CourseLevel>('A1');

  const handleFinish = (levelToSet: CourseLevel) => {
    finishOnboarding({
      name: name.trim() || 'Estudante',
      learningReason: reason,
      dailyGoalMinutes: goalMinutes,
      livesInGermany,
      level: levelToSet,
      onboardingCompleted: true,
    });
    triggerCelebration();
    onClose();
  };

  const evaluateDiagnostic = () => {
    let correctCount = 0;
    diagnosticQuestions.forEach((q) => {
      if (diagAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    let assignedLevel: CourseLevel = 'A1';
    if (correctCount === 4) assignedLevel = 'B1';
    else if (correctCount >= 2) assignedLevel = 'A2';
    else assignedLevel = 'A1';

    setEvaluatedLevel(assignedLevel);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        id="onboarding_modal_box"
        className="w-full max-w-xl bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6"
      >
        {/* STEP 1: Profile & Goals */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl mx-auto shadow-xs">
                🇩🇪
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                Bem-vindo ao Deutsch Fácil AI!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Aprenda alemão com inteligência artificial personalizado para brasileiros
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Como devemos te chamar?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome..."
                  className="w-full p-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Qual é o seu objetivo principal?
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 font-bold cursor-pointer"
                >
                  <option value="Viver e trabalhar na Alemanha">
                    Viver e trabalhar na Alemanha (Cotidiano, Bürgeramt, Emprego)
                  </option>
                  <option value="Estudos & Faculdade na Alemanha">
                    Estudar em universidade alemã / Ausbildung
                  </option>
                  <option value="Cidadania & Passaporte Alemão">
                    Exames oficiais (Goethe / Telc) e Cidadania
                  </option>
                  <option value="Viagens e Cultura">Viagens e hobbies</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Quanto tempo por dia deseja estudar?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 15, 30].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => setGoalMinutes(mins)}
                      className={`p-3 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer shadow-xs ${
                        goalMinutes === mins
                          ? 'bg-blue-600 text-white border-blue-600 font-black'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      {mins} min / dia
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between gap-3">
              <button
                onClick={() => handleFinish('A1')}
                className="text-xs text-slate-500 hover:text-slate-900 font-bold cursor-pointer"
              >
                Começar direto do A1 (Iniciante)
              </button>

              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>Fazer Teste de Nível Rápido</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Quick Diagnostic Questions */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-blue-700 uppercase">
                Diagnóstico de Nivelamento
              </span>
              <h3 className="text-xl font-black text-slate-900">4 Perguntas Rápidas</h3>
            </div>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {diagnosticQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2.5 shadow-xs"
                >
                  <div className="text-xs font-bold text-slate-800">
                    {idx + 1}. {q.question}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => setDiagAnswers({ ...diagAnswers, [q.id]: opt })}
                        className={`p-2.5 rounded-xl text-xs font-bold border-2 text-left transition-all cursor-pointer shadow-xs ${
                          diagAnswers[q.id] === opt
                            ? 'bg-blue-600 text-white border-blue-600 font-black'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-blue-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={evaluateDiagnostic}
              disabled={Object.keys(diagAnswers).length < diagnosticQuestions.length}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xs disabled:opacity-40 cursor-pointer"
            >
              Calcular Meu Nível Recomendado
            </button>
          </div>
        )}

        {/* STEP 3: Evaluation Result */}
        {step === 3 && (
          <div className="space-y-6 text-center animate-in fade-in py-2">
            <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white font-black text-2xl mx-auto shadow-xs border-2 border-blue-500">
              🎯
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-500 uppercase font-bold">
                Resultado do Nivelamento:
              </span>
              <h3 className="text-3xl font-black text-slate-900">Nível {evaluatedLevel}</h3>
              <p className="text-xs sm:text-sm text-slate-600 pt-1 font-medium">
                Personalizamos sua trilha de aprendizado e exercícios com base nas suas respostas.
              </p>
            </div>

            <button
              onClick={() => handleFinish(evaluatedLevel)}
              className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-base shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              Começar a Estudar Agora!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
