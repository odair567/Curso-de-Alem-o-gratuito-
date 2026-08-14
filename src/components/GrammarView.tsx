import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { initialGrammarData } from '../data/grammarData';
import { GrammarTopic, CourseLevel } from '../types';
import {
  BookMarked,
  Sparkles,
  Bot,
  Volume2,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { ttsService } from '../services/ttsService';
import { geminiService } from '../services/geminiService';

export const GrammarView: React.FC = () => {
  const { setActiveTab } = useApp();
  const [selectedLevel, setSelectedLevel] = useState<string>('A1');
  const [expandedTopicId, setExpandedTopicId] = useState<string>('gram_artigos');
  const [aiExplanation, setAiExplanation] = useState<{ topicId: string; text: string } | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  const filteredTopics = initialGrammarData.filter(
    (t) => selectedLevel === 'all' || t.level === selectedLevel
  );

  const handleAskAi = async (topic: GrammarTopic) => {
    setIsLoadingAi(true);
    try {
      const response = await geminiService.explainGrammar(topic.titleDe, topic.level);
      setAiExplanation({
        topicId: topic.id,
        text: response.explanationPt || 'Explicação carregada com sucesso.',
      });
    } catch (e) {
      setAiExplanation({
        topicId: topic.id,
        text: `Explicação sobre ${topic.titlePt}: Este tópico é fundamental para falantes de português. A principal diferença reside nas estruturas de declinação e na lógica de casos alemã.`,
      });
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div id="grammar_view_container" className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Gramática Explicada para Brasileiros
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Regras claras, tabelas visuais e dicas anti-erros comuns de quem fala português
          </p>
        </div>

        {/* Level Selector */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start sm:self-auto shadow-xs">
          {['A1', 'A2', 'B1', 'B2', 'C1', 'all'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lvl === 'all' ? 'Todos' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Grammar Topics Accordion List */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => {
          const isExpanded = expandedTopicId === topic.id;

          return (
            <div
              key={topic.id}
              id={`grammar_topic_${topic.id}`}
              className={`rounded-[1.75rem] border-2 transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-white border-blue-400 shadow-md'
                  : 'bg-white border-slate-100 hover:border-slate-200 shadow-xs'
              }`}
            >
              {/* Topic Header Clickable */}
              <div
                onClick={() => setExpandedTopicId(isExpanded ? '' : topic.id)}
                className="p-5 sm:p-6 cursor-pointer flex items-center justify-between gap-4 select-none"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-blue-100 border border-blue-200 text-blue-800 flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                    {topic.level}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-600">{topic.titleDe}</span>
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                      {topic.titlePt}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">{topic.summaryPt}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Topic Expanded Body */}
              {isExpanded && (
                <div className="p-5 sm:p-8 pt-0 border-t border-slate-100 space-y-6 animate-in fade-in duration-300">
                  {/* Brazilian Trap Alert */}
                  {topic.brazilianMistakePt && (
                    <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 flex items-start gap-3 text-rose-900">
                      <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-rose-700">
                          Cuidado: Erro mais comum de brasileiros!
                        </h4>
                        <p className="text-xs sm:text-sm text-rose-900 mt-1 leading-relaxed font-medium">
                          {topic.brazilianMistakePt}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Golden Rule */}
                  {topic.goldenRulePt && (
                    <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-start gap-3 text-amber-900">
                      <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-amber-800">
                          Regra de Ouro / Macete:
                        </h4>
                        <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed font-semibold">
                          {topic.goldenRulePt}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Detailed Explanation */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">
                      Explicação Passo a Passo:
                    </h4>
                    <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 font-medium">
                      {topic.explanationPt}
                    </div>
                  </div>

                  {/* Examples Table */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">
                      Exemplos Práticos com Áudio:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {topic.examples.map((ex, exIdx) => (
                        <div
                          key={exIdx}
                          className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                        >
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-slate-900">
                              {ex.german}
                            </div>
                            <div className="text-xs text-slate-600 mt-0.5 font-medium">
                              {ex.portuguese}
                            </div>
                            {ex.note && (
                              <div className="text-[11px] text-blue-700 mt-1 font-semibold">
                                {ex.note}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => ttsService.speakGerman(ex.german)}
                            className="p-2 rounded-xl bg-blue-100 hover:bg-blue-600 hover:text-white text-blue-700 transition-colors shadow-xs"
                            title="Ouvir áudio"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Bar: Ask AI & Practice */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <button
                      onClick={() => handleAskAi(topic)}
                      disabled={isLoadingAi}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <Bot className="w-4 h-4 text-blue-600" />
                      <span>
                        {isLoadingAi
                          ? 'Consultando Herr Deutsch AI...'
                          : 'Pedir mais explicações à IA'}
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab('exercises')}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Fazer Exercícios Deste Tópico</span>
                    </button>
                  </div>

                  {/* Live AI Explanation Box */}
                  {aiExplanation && aiExplanation.topicId === topic.id && (
                    <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200 text-xs sm:text-sm text-slate-800 space-y-2 animate-in fade-in">
                      <div className="flex items-center gap-2 font-bold text-blue-800">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>Explicação Extra do Herr Deutsch AI:</span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-line font-medium">{aiExplanation.text}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
