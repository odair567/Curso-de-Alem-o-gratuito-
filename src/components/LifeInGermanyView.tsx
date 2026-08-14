import React, { useState } from 'react';
import { initialLifeInGermanyData } from '../data/lifeInGermanyData';
import { LifeInGermanyTopic } from '../types';
import { ttsService } from '../services/ttsService';
import {
  Flag,
  Building2,
  ShieldAlert,
  Home,
  Tv,
  CreditCard,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const LifeInGermanyView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTopicId, setExpandedTopicId] = useState<string>('life_anmeldung');

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return Building2;
      case 'ShieldAlert':
        return ShieldAlert;
      case 'Home':
        return Home;
      case 'Tv':
        return Tv;
      case 'CreditCard':
        return CreditCard;
      default:
        return Flag;
    }
  };

  const filteredTopics = initialLifeInGermanyData.filter(
    (t) => selectedCategory === 'all' || t.category === selectedCategory
  );

  const categories = Array.from(new Set(initialLifeInGermanyData.map((t) => t.category)));

  return (
    <div id="life_in_germany_container" className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Guia Prático: Vida na Alemanha
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Manual de sobrevivência, burocracia, saúde, aluguel e termos essenciais para brasileiros
          </p>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shadow-xs ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white font-black'
                : 'bg-white text-slate-700 border-2 border-slate-100 hover:text-slate-900'
            }`}
          >
            Todos os Tópicos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shadow-xs ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-black'
                  : 'bg-white text-slate-700 border-2 border-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => {
          const Icon = getTopicIcon(topic.icon);
          const isExpanded = expandedTopicId === topic.id;

          return (
            <div
              key={topic.id}
              id={`life_topic_${topic.id}`}
              className={`rounded-[2rem] border-2 transition-all duration-200 overflow-hidden shadow-xs ${
                isExpanded
                  ? 'bg-white border-blue-300'
                  : 'bg-white border-slate-100 hover:border-slate-300'
              }`}
            >
              {/* Card Header Clickable */}
              <div
                onClick={() => setExpandedTopicId(isExpanded ? '' : topic.id)}
                className="p-5 sm:p-6 cursor-pointer flex items-center justify-between gap-4 select-none"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                        {topic.category}
                      </span>
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                        {topic.importanceLevel}
                      </span>
                    </div>
                    <h3 className="font-black text-slate-900 text-base sm:text-lg mt-1">
                      {topic.titlePt}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{topic.summaryPt}</p>
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </div>

              {/* Card Expanded Content */}
              {isExpanded && (
                <div className="p-5 sm:p-8 pt-0 border-t border-slate-100 space-y-6 animate-in fade-in duration-300">
                  {/* Step by Step Guide */}
                  <div className="space-y-2.5 pt-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Passo a Passo Prático:</span>
                    </h4>
                    <div className="space-y-2">
                      {topic.stepByStepPt.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium"
                        >
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key German Vocabulary */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span>Termos em Alemão que você precisa reconhecer:</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {topic.keyVocabulary.map((vocab, vIdx) => (
                        <div
                          key={vIdx}
                          className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-blue-700">
                                {vocab.article} {vocab.german}
                              </span>
                              <button
                                onClick={() =>
                                  ttsService.speakGerman(
                                    `${vocab.article ? vocab.article : ''} ${vocab.german}`
                                  )
                                }
                                className="text-slate-400 hover:text-blue-600 p-1 cursor-pointer"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-xs text-slate-900 font-bold">
                              {vocab.portuguese}
                            </div>
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium italic pt-1 border-t border-slate-200">
                            {vocab.contextPt}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Practical Tips */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>Dicas Valiosas & Cuidados:</span>
                    </h4>
                    <div className="space-y-2">
                      {topic.practicalTipsPt.map((tip, tIdx) => (
                        <div
                          key={tIdx}
                          className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-200 text-xs sm:text-sm text-amber-900 leading-relaxed font-medium"
                        >
                          💡 {tip}
                        </div>
                      ))}
                    </div>
                  </div>

                  {topic.officialLinksOrNotesPt && (
                    <div className="text-xs text-slate-500 italic pt-2 font-medium">
                      ℹ️ Observação: {topic.officialLinksOrNotesPt}
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
