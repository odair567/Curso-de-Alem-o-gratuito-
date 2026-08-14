import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { standaloneExercisesData } from '../data/exercisesData';
import { ExerciseItem } from '../types';
import { ttsService } from '../services/ttsService';
import { geminiService } from '../services/geminiService';
import {
  CheckSquare,
  Sparkles,
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Zap,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Filter,
  Bot,
} from 'lucide-react';

export const ExercisesView: React.FC = () => {
  const { user, recordExerciseResult, addXP, triggerCelebration } = useApp();
  const [exercises, setExercises] = useState<ExerciseItem[]>(standaloneExercisesData);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedWordOrder, setSelectedWordOrder] = useState<string[]>([]);
  const [typedAnswer, setTypedAnswer] = useState<string>('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('all');
  const [scoreStats, setScoreStats] = useState({ correct: 0, total: 0 });

  const filteredExercises = exercises.filter(
    (ex) => selectedLevelFilter === 'all' || ex.level === selectedLevelFilter
  );

  const currentExercise: ExerciseItem | undefined =
    filteredExercises[currentIndex] || filteredExercises[0];

  const handleSelectOption = (opt: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(opt);
  };

  const handleTileClick = (word: string) => {
    if (isAnswerSubmitted) return;
    if (selectedWordOrder.includes(word)) {
      setSelectedWordOrder(selectedWordOrder.filter((w) => w !== word));
    } else {
      setSelectedWordOrder([...selectedWordOrder, word]);
    }
  };

  const handleCheckAnswer = () => {
    if (!currentExercise || isAnswerSubmitted) return;

    let isCorrect = false;
    const targetAnswerStr = Array.isArray(currentExercise.correctAnswer)
      ? currentExercise.correctAnswer.join(' ')
      : String(currentExercise.correctAnswer || '');

    if (currentExercise.type === 'order_words') {
      const builtSentence = selectedWordOrder.join(' ');
      isCorrect =
        builtSentence.trim().toLowerCase() === targetAnswerStr.trim().toLowerCase();
    } else if (currentExercise.type === 'type_answer') {
      isCorrect =
        typedAnswer.trim().toLowerCase() === targetAnswerStr.trim().toLowerCase();
    } else {
      isCorrect = selectedOption === targetAnswerStr;
    }

    setIsAnswerSubmitted(true);
    recordExerciseResult(
      currentExercise.category || 'Exercício',
      isCorrect,
      currentExercise
    );

    setScoreStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    if (isCorrect) {
      triggerCelebration();
    }
  };

  const handleNextExercise = () => {
    setIsAnswerSubmitted(false);
    setSelectedOption(null);
    setSelectedWordOrder([]);
    setTypedAnswer('');

    if (currentIndex < filteredExercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleGenerateAiExercises = async () => {
    setIsGeneratingAi(true);
    try {
      const topic = currentExercise?.category || 'Akkusativ e Dativ';
      const aiExercises = await geminiService.generateAdaptiveExercises(
        topic,
        user.level,
        4
      );
      if (aiExercises && aiExercises.length > 0) {
        setExercises([...aiExercises, ...exercises]);
        setCurrentIndex(0);
        setIsAnswerSubmitted(false);
        setSelectedOption(null);
      }
    } catch {
      // fallback smoothly
    } finally {
      setIsGeneratingAi(false);
    }
  };

  if (!currentExercise) {
    return (
      <div className="p-12 text-center text-slate-400">
        Nenhum exercício disponível para os filtros selecionados.
      </div>
    );
  }

  return (
    <div id="exercises_hub_container" className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Exercícios Interativos
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            10 formatos de questões dinâmicas com feedback em tempo real
          </p>
        </div>

        {/* Level Filter & AI Generator */}
        <div className="flex items-center gap-2">
          <select
            value={selectedLevelFilter}
            onChange={(e) => {
              setSelectedLevelFilter(e.target.value);
              setCurrentIndex(0);
              setIsAnswerSubmitted(false);
            }}
            className="px-3 py-1.5 rounded-xl bg-white border-2 border-slate-200 text-xs font-bold text-slate-700 focus:outline-none shadow-xs cursor-pointer"
          >
            <option value="all">Todos os Níveis</option>
            <option value="A1">Nível A1</option>
            <option value="A2">Nível A2</option>
            <option value="B1">Nível B1</option>
            <option value="B2">Nível B2</option>
            <option value="C1">Nível C1</option>
          </select>

          <button
            onClick={handleGenerateAiExercises}
            disabled={isGeneratingAi}
            className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50 shadow-xs cursor-pointer"
            title="Gerar novos desafios com Inteligência Artificial"
          >
            <Bot className="w-4 h-4 text-blue-600" />
            <span>{isGeneratingAi ? 'Gerando...' : 'Gerar com IA'}</span>
          </button>
        </div>
      </div>

      {/* Progress & Stats Bar */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border-2 border-slate-100 text-xs font-semibold text-slate-600 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="bg-blue-100 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded-lg font-bold">
            {currentExercise.level}
          </span>
          <span className="font-bold text-slate-800">{currentExercise.category}</span>
        </div>

        <div className="flex items-center gap-4">
          <span>
            Questão <span className="font-bold text-slate-900">{currentIndex + 1}</span> de {filteredExercises.length}
          </span>
          <span className="text-emerald-700 font-black bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
            Acertos: {scoreStats.correct} / {scoreStats.total}
          </span>
        </div>
      </div>

      {/* MAIN EXERCISE CARD */}
      <div
        id={`exercise_box_${currentExercise.id}`}
        className="p-6 sm:p-8 rounded-[2rem] bg-white border-2 border-slate-100 shadow-xs space-y-6"
      >
        {/* Instruction in PT */}
        <div className="space-y-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-blue-600">
            {currentExercise.type.replace('_', ' ')}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-800">
            {currentExercise.instructionPt}
          </h3>
        </div>

        {/* Question Text / German Context */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          {currentExercise.germanContext && (
            <div className="text-xs text-blue-700 font-semibold pb-2 border-b border-slate-200">
              {currentExercise.germanContext}
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <div className="text-base sm:text-xl font-black text-slate-900">
              {currentExercise.question}
            </div>
            {currentExercise.question.includes('___') && (
              <button
                onClick={() => ttsService.speakGerman(currentExercise.question.replace('___', ''))}
                className="p-2 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors shadow-xs cursor-pointer"
                title="Ouvir áudio"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 1. Multiple choice / Fill blank / Article options */}
        {currentExercise.options && currentExercise.type !== 'order_words' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentExercise.options.map((opt, oIdx) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === currentExercise.correctAnswer;

              let btnStyle =
                'bg-slate-50 border-2 border-slate-200/80 hover:border-blue-300 hover:bg-white text-slate-800 shadow-xs';
              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 font-black shadow-xs';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-50 border-2 border-rose-500 text-rose-900 font-black shadow-xs';
                }
              } else if (isSelected) {
                btnStyle = 'bg-blue-50 border-2 border-blue-500 text-blue-900 font-black shadow-xs';
              }

              return (
                <button
                  key={oIdx}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* 2. Order words interactive tiles */}
        {currentExercise.type === 'order_words' && currentExercise.wordTiles && (
          <div className="space-y-4">
            {/* Drop / built area */}
            <div className="min-h-[56px] p-3 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 flex flex-wrap items-center gap-2">
              {selectedWordOrder.length === 0 ? (
                <span className="text-xs text-slate-400 font-medium">
                  Clique nas palavras abaixo na ordem correta...
                </span>
              ) : (
                selectedWordOrder.map((w, wIdx) => (
                  <button
                    key={wIdx}
                    onClick={() => handleTileClick(w)}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    {w} ✕
                  </button>
                ))
              )}
            </div>

            {/* Available Tiles */}
            <div className="flex flex-wrap gap-2 pt-2">
              {currentExercise.wordTiles.map((tile, tIdx) => {
                const isUsed = selectedWordOrder.includes(tile);
                return (
                  <button
                    key={tIdx}
                    disabled={isUsed || isAnswerSubmitted}
                    onClick={() => handleTileClick(tile)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer ${
                      isUsed
                        ? 'opacity-30 border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-blue-50 active:scale-95 shadow-xs'
                    }`}
                  >
                    {tile}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Type answer field */}
        {currentExercise.type === 'type_answer' && (
          <input
            type="text"
            value={typedAnswer}
            disabled={isAnswerSubmitted}
            onChange={(e) => setTypedAnswer(e.target.value)}
            placeholder="Digite a resposta correta em alemão..."
            className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-medium"
          />
        )}

        {/* Explanation & Brazilian Tip on Answer Submitted */}
        {isAnswerSubmitted && (
          <div className="space-y-3 pt-2 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-1.5">
              <div className="font-bold text-blue-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Resposta Correta: {currentExercise.correctAnswer}</span>
              </div>
              <p className="leading-relaxed text-slate-700 font-medium">{currentExercise.explanationPt}</p>
            </div>

            {currentExercise.brazilianTip && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="font-medium">
                  <strong className="text-amber-800 font-bold">Dica para brasileiros:</strong> {currentExercise.brazilianTip}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Submit or Next Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
            <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>+{currentExercise.xp || 20} XP</span>
          </div>

          {!isAnswerSubmitted ? (
            <button
              onClick={handleCheckAnswer}
              disabled={
                (!selectedOption &&
                  selectedWordOrder.length === 0 &&
                  !typedAnswer.trim()) ||
                isAnswerSubmitted
              }
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xs transition-all active:scale-95 disabled:opacity-40 cursor-pointer"
            >
              Verificar Resposta
            </button>
          ) : (
            <button
              onClick={handleNextExercise}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xs flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <span>Próximo Exercício</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
