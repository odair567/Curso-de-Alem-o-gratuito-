import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lesson, ExerciseItem } from '../types';
import { ttsService } from '../services/ttsService';
import {
  X,
  Sparkles,
  Volume2,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Zap,
  Award,
  RotateCcw,
} from 'lucide-react';

interface LessonModalProps {
  lesson: Lesson;
  onClose: () => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({ lesson, onClose }) => {
  const { completeLesson, recordExerciseResult, addXP, triggerCelebration } = useApp();

  // Pedagogical Steps:
  // 1: Introduction & Goals
  // 2: Theory & Grammar Explanation
  // 3: Key Vocabulary with Audio
  // 4: Practical Examples with Audio
  // 5: Cultural / Everyday Life Tip
  // 6: Practice Exercises
  // 7: Mini-Test
  // 8: Results, Error Review & XP Award
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 8;

  // Practice state
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({});
  const [practiceSubmitted, setPracticeSubmitted] = useState<boolean>(false);

  // Mini-test state
  const [testAnswers, setTestAnswers] = useState<Record<string, string>>({});
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
  const [mistakes, setMistakes] = useState<string[]>([]);

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Finish lesson
      completeLesson(lesson.id, 100, lesson.xpReward);
      onClose();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handlePracticeSubmit = () => {
    setPracticeSubmitted(true);
    let correctCount = 0;
    lesson.practiceExercises.forEach((ex) => {
      const ans = practiceAnswers[ex.id];
      const isCorrect = ans === ex.correctAnswer;
      if (isCorrect) correctCount++;
      recordExerciseResult(ex.category || 'Exercício', isCorrect, ex);
    });
    if (correctCount === lesson.practiceExercises.length) {
      triggerCelebration();
    }
  };

  const handleTestSubmit = () => {
    setTestSubmitted(true);
    const newMistakes: string[] = [];
    lesson.miniTestExercises.forEach((ex) => {
      const ans = testAnswers[ex.id];
      const isCorrect = ans === ex.correctAnswer;
      if (!isCorrect) {
        newMistakes.push(
          `Questão: "${ex.question}" — Resposta correta: ${ex.correctAnswer}`
        );
      }
      recordExerciseResult(ex.category || 'Mini-Teste', isCorrect, ex);
    });
    setMistakes(newMistakes);
    if (newMistakes.length === 0) {
      triggerCelebration();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
      <div
        id="lesson_modal_container"
        className="w-full max-w-3xl bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Top Navigation */}
        <div className="p-4 sm:p-5 border-b-2 border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 font-black flex items-center justify-center text-sm border border-blue-200 shadow-xs">
              {lesson.level}
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-700">{lesson.titleDe}</span>
              <h3 className="font-black text-slate-900 text-sm sm:text-base line-clamp-1">
                {lesson.titlePt}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar of 8 steps */}
        <div className="w-full h-1.5 bg-slate-100">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Modal Body Scroll Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: OBJECTIVE & OVERVIEW */}
          {currentStep === 1 && (
            <div className="space-y-6 text-center sm:text-left animate-in fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                <Sparkles className="w-4 h-4" />
                <span>Passo 1 de 8: Objetivo da Lição</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {lesson.titlePt}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                {lesson.descriptionPt}
              </p>

              {lesson.grammarFocus && (
                <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-left space-y-1">
                  <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
                    Foco Gramatical:
                  </span>
                  <div className="text-sm font-bold text-slate-900">
                    {lesson.grammarFocus}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-center">
                  <div className="text-xs text-slate-500 font-medium">Duração estimada</div>
                  <div className="text-base font-black text-slate-900 mt-0.5">
                    ~{lesson.durationMinutes} minutos
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-200 text-center">
                  <div className="text-xs text-amber-700 font-medium">Recompensa</div>
                  <div className="text-base font-black text-amber-800 mt-0.5">
                    +{lesson.xpReward} XP
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: THEORY EXPLANATION */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                <BookOpen className="w-4 h-4" />
                <span>Passo 2 de 8: Explicação Teórica Simples</span>
              </div>

              <h3 className="text-xl font-black text-slate-900">Entenda a Lógica do Alemão</h3>

              <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-medium">
                {lesson.theoryExplanationPt}
              </div>
            </div>
          )}

          {/* STEP 3: VOCABULARY WITH AUDIO */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <Volume2 className="w-4 h-4" />
                <span>Passo 3 de 8: Vocabulário & Pronúncia da Lição</span>
              </div>

              <h3 className="text-xl font-black text-slate-900">
                Palavras Chave (Toque para ouvir a pronúncia nativa):
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lesson.vocabulary.map((voc, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div>
                      <div className="text-sm font-black text-slate-900">{voc.german}</div>
                      <div className="text-xs text-blue-700 font-bold">{voc.portuguese}</div>
                      {voc.example && (
                        <div className="text-[11px] text-slate-500 mt-1 italic font-medium">
                          "{voc.example}"
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => ttsService.speakGerman(voc.german)}
                      className="p-2.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white text-blue-600 border-2 border-slate-200 transition-colors shrink-0 cursor-pointer shadow-xs"
                      title="Ouvir pronúncia"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: PRACTICAL EXAMPLES */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                <Sparkles className="w-4 h-4" />
                <span>Passo 4 de 8: Frases de Exemplo em Contexto</span>
              </div>

              <h3 className="text-xl font-black text-slate-900">Como Usar no Dia a Dia:</h3>

              <div className="space-y-3">
                {lesson.examples.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div>
                      <div className="text-sm sm:text-base font-bold text-slate-900">
                        {ex.german}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                        {ex.portuguese}
                      </div>
                    </div>
                    <button
                      onClick={() => ttsService.speakGerman(ex.german)}
                      className="p-2.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white text-blue-600 border-2 border-slate-200 transition-colors shrink-0 cursor-pointer shadow-xs"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: CULTURAL & PRACTICAL TIP */}
          {currentStep === 5 && (
            <div className="space-y-6 text-center sm:text-left animate-in fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                <Lightbulb className="w-4 h-4" />
                <span>Passo 5 de 8: Dica Cultural & Costumes Alemães</span>
              </div>

              <h3 className="text-2xl font-black text-slate-900">
                Como os alemães realmente se comportam:
              </h3>

              <div className="p-6 rounded-[2rem] bg-amber-50 border-2 border-amber-200 text-sm sm:text-base text-amber-900 leading-relaxed space-y-3 font-medium shadow-xs">
                <p>{lesson.culturalNotePt}</p>
              </div>
            </div>
          )}

          {/* STEP 6: PRACTICE EXERCISES */}
          {currentStep === 6 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                <CheckCircle2 className="w-4 h-4" />
                <span>Passo 6 de 8: Exercícios de Fixação</span>
              </div>

              <h3 className="text-xl font-black text-slate-900">Pratique o que aprendeu:</h3>

              <div className="space-y-4">
                {lesson.practiceExercises.map((ex) => (
                  <div
                    key={ex.id}
                    className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3 shadow-xs"
                  >
                    <div className="text-xs text-blue-700 font-bold">{ex.instructionPt}</div>
                    <div className="text-sm font-black text-slate-900">{ex.question}</div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ex.options?.map((opt, oIdx) => {
                        const isSelected = practiceAnswers[ex.id] === opt;
                        const isCorrect = opt === ex.correctAnswer;

                        let style =
                          'bg-white border-2 border-slate-200 hover:border-blue-400 text-slate-800 shadow-xs';
                        if (practiceSubmitted) {
                          if (isCorrect) {
                            style = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 font-bold shadow-xs';
                          } else if (isSelected && !isCorrect) {
                            style = 'bg-rose-50 border-2 border-rose-500 text-rose-900 font-bold shadow-xs';
                          }
                        } else if (isSelected) {
                          style = 'bg-blue-50 border-2 border-blue-600 text-blue-900 font-bold shadow-xs';
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={practiceSubmitted}
                            onClick={() =>
                              setPracticeAnswers({ ...practiceAnswers, [ex.id]: opt })
                            }
                            className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {practiceSubmitted && (
                      <div className="text-xs text-slate-600 font-medium pt-2 border-t border-slate-200">
                        {ex.explanationPt}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!practiceSubmitted && (
                <button
                  onClick={handlePracticeSubmit}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xs cursor-pointer"
                >
                  Conferir Respostas dos Exercícios
                </button>
              )}
            </div>
          )}

          {/* STEP 7: MINI-TEST */}
          {currentStep === 7 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                <Award className="w-4 h-4" />
                <span>Passo 7 de 8: Mini-Teste Final da Lição</span>
              </div>

              <h3 className="text-xl font-black text-slate-900">Avaliação de Domínio:</h3>

              <div className="space-y-4">
                {lesson.miniTestExercises.map((ex) => (
                  <div
                    key={ex.id}
                    className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3 shadow-xs"
                  >
                    <div className="text-xs text-blue-700 font-bold">{ex.instructionPt}</div>
                    <div className="text-sm font-black text-slate-900">{ex.question}</div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ex.options?.map((opt, oIdx) => {
                        const isSelected = testAnswers[ex.id] === opt;
                        const isCorrect = opt === ex.correctAnswer;

                        let style =
                          'bg-white border-2 border-slate-200 hover:border-blue-400 text-slate-800 shadow-xs';
                        if (testSubmitted) {
                          if (isCorrect) {
                            style = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 font-bold shadow-xs';
                          } else if (isSelected && !isCorrect) {
                            style = 'bg-rose-50 border-2 border-rose-500 text-rose-900 font-bold shadow-xs';
                          }
                        } else if (isSelected) {
                          style = 'bg-blue-50 border-2 border-blue-600 text-blue-900 font-bold shadow-xs';
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={testSubmitted}
                            onClick={() =>
                              setTestAnswers({ ...testAnswers, [ex.id]: opt })
                            }
                            className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {testSubmitted && (
                      <div className="text-xs text-slate-600 font-medium pt-2 border-t border-slate-200">
                        {ex.explanationPt}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!testSubmitted && (
                <button
                  onClick={handleTestSubmit}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xs cursor-pointer"
                >
                  Finalizar Mini-Teste
                </button>
              )}
            </div>
          )}

          {/* STEP 8: REWARDS, ERROR REVIEW & NEXT STEPS */}
          {currentStep === 8 && (
            <div className="space-y-6 text-center animate-in fade-in py-4">
              <div className="w-16 h-16 rounded-3xl bg-amber-500 flex items-center justify-center text-white font-black text-2xl mx-auto shadow-xs">
                🏆
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  Parabéns! Lição Concluída!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Você completou com sucesso a lição "{lesson.titlePt}".
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-900 font-black text-sm shadow-xs">
                <Zap className="w-5 h-5 fill-amber-500 text-amber-500" />
                <span>+{lesson.xpReward} XP Adicionados ao seu Perfil</span>
              </div>

              {mistakes.length > 0 ? (
                <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-left space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 font-black text-rose-800 text-xs">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Revisão de Erros Detectados:</span>
                  </div>
                  {mistakes.map((m, mIdx) => (
                    <p key={mIdx} className="text-xs text-rose-900 font-medium">
                      • {m}
                    </p>
                  ))}
                  <p className="text-[11px] text-slate-500 font-medium pt-1">
                    Esses pontos foram enviados automaticamente para o seu módulo "Minha Revisão".
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-900 text-xs sm:text-sm font-bold shadow-xs">
                  ✨ Pontuação perfeita! Você dominou todos os conceitos desta lição.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Action Controls */}
        <div className="p-4 sm:p-5 border-t-2 border-slate-100 bg-white flex items-center justify-between">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-900 text-xs font-bold disabled:opacity-30 flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <span className="text-xs text-slate-500 font-bold">
            Passo {currentStep} de {totalSteps}
          </span>

          <button
            onClick={handleNextStep}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
          >
            <span>{currentStep === totalSteps ? 'Concluir & Fechar' : 'Avançar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
