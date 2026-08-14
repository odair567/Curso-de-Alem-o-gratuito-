import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WeakAreaItem } from '../types';
import { geminiService } from '../services/geminiService';
import {
  Brain,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Play,
  RotateCcw,
  Zap,
  BookOpen,
  ArrowRight,
  Bot,
} from 'lucide-react';

export const SmartRevisionView: React.FC = () => {
  const { weakAreas, resolveWeakArea, setActiveTab, user } = useApp();
  const [selectedTopic, setSelectedTopic] = useState<WeakAreaItem | null>(null);
  const [isGeneratingDrill, setIsGeneratingDrill] = useState<boolean>(false);
  const [drillExplanation, setDrillExplanation] = useState<string | null>(null);

  const pendingWeakAreas = weakAreas.filter((w) => w.status === 'needs_revision');
  const masteredWeakAreas = weakAreas.filter((w) => w.status === 'mastered');

  const handleStartDrill = async (wa: WeakAreaItem) => {
    setSelectedTopic(wa);
    setIsGeneratingDrill(true);
    try {
      const resp = await geminiService.explainGrammar(
        wa.topicName,
        wa.level
      );
      setDrillExplanation(resp.explanationPt);
    } catch {
      setDrillExplanation(
        `Dica de revisão para ${wa.topicName}: Foque na regra de ouro e pratique frases curtas no dia a dia.`
      );
    } finally {
      setIsGeneratingDrill(false);
    }
  };

  return (
    <div id="smart_revision_container" className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Minha Revisão Inteligente
            </h2>
            <span className="bg-rose-50 text-rose-700 border border-rose-200 text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs">
              {pendingWeakAreas.length} pendentes
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Algoritmo adaptativo que mapeia seus erros e cria treinos focados nos seus pontos fracos
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: List of weak areas */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Tópicos com Erros Frequentes</span>
            </h3>
          </div>

          {pendingWeakAreas.length === 0 ? (
            <div className="p-8 text-center rounded-[2rem] bg-white border-2 border-slate-100 text-slate-700 space-y-3 shadow-xs">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-black text-lg text-slate-900">Nenhum ponto fraco pendente!</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto font-medium">
                Você dominou todas as suas revisões recentes. Continue fazendo lições e exercícios para manter o ritmo!
              </p>
              <button
                onClick={() => setActiveTab('course')}
                className="mt-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Avançar no Curso</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingWeakAreas.map((wa) => (
                <div
                  key={wa.id}
                  id={`weak_card_${wa.id}`}
                  className="p-5 rounded-[2rem] bg-white border-2 border-slate-100 hover:border-blue-300 transition-all flex flex-col justify-between space-y-3 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                          {wa.level} • {wa.category}
                        </span>
                        <span className="text-xs font-bold text-rose-700">
                          {wa.mistakesCount} erros registrados
                        </span>
                      </div>
                      <h4 className="font-black text-slate-900 text-base mt-1.5">
                        {wa.topicName}
                      </h4>
                    </div>

                    <button
                      onClick={() => resolveWeakArea(wa.id)}
                      className="text-xs font-bold text-slate-400 hover:text-emerald-600 p-2 rounded-xl hover:bg-emerald-50 transition-colors cursor-pointer"
                      title="Marcar como Dominado"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                  </div>

                  {wa.recommendedRulePt && (
                    <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-200 text-xs text-amber-900 leading-relaxed font-medium">
                      💡 <strong className="text-amber-800 font-bold">Dica de fixação:</strong> {wa.recommendedRulePt}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <button
                      onClick={() => resolveWeakArea(wa.id)}
                      className="text-xs font-bold text-slate-500 hover:text-emerald-700 cursor-pointer"
                    >
                      Marcar como Dominado (+30 XP)
                    </button>

                    <button
                      onClick={() => handleStartDrill(wa)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Revisar com IA</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mastered topics */}
          {masteredWeakAreas.length > 0 && (
            <div className="pt-6 space-y-3">
              <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Tópicos Superados & Dominados ({masteredWeakAreas.length})</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {masteredWeakAreas.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between font-medium shadow-xs"
                  >
                    <span className="font-bold text-slate-800">{m.topicName}</span>
                    <span className="text-[10px] text-emerald-700 font-black">Dominado ✔</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column: AI Drill Assistant */}
        <div className="space-y-4">
          <div className="p-6 rounded-[2rem] bg-white border-2 border-slate-100 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-base">Assistente de Fixação</h4>
                <p className="text-xs text-slate-500 font-medium">Herr Deutsch AI</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              O sistema monitora cada erro em exercícios ou flashcards para evitar que você memorize padrões errados.
            </p>

            {isGeneratingDrill && (
              <div className="p-4 rounded-2xl bg-blue-50 text-blue-800 text-xs font-semibold flex items-center gap-2 animate-pulse border border-blue-200">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Gerando treino especial para você...</span>
              </div>
            )}

            {drillExplanation && selectedTopic && (
              <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200 text-xs text-slate-800 space-y-2 animate-in fade-in">
                <span className="font-black text-blue-800 block text-sm">
                  Treino: {selectedTopic.topicName}
                </span>
                <p className="leading-relaxed whitespace-pre-line font-medium text-slate-700">{drillExplanation}</p>

                <button
                  onClick={() => setActiveTab('exercises')}
                  className="mt-2 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Fazer Exercícios Práticos
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
