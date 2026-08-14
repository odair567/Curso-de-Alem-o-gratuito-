import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { initialSituationsData } from '../data/situationsData';
import { SituationDialogue } from '../types';
import { ttsService } from '../services/ttsService';
import { geminiService } from '../services/geminiService';
import {
  MessageSquare,
  Building2,
  ShoppingCart,
  Stethoscope,
  Home,
  Briefcase,
  Utensils,
  Train,
  Cross,
  Volume2,
  Play,
  Bot,
  Send,
  Sparkles,
  Lightbulb,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export const ConversationsView: React.FC = () => {
  const { user, addXP } = useApp();
  const [selectedSituation, setSelectedSituation] = useState<SituationDialogue | null>(null);
  const [isRoleplaying, setIsRoleplaying] = useState<boolean>(false);
  const [roleplayMessages, setRoleplayMessages] = useState<
    Array<{ sender: 'user' | 'ai'; textDe: string; textPt: string; correction?: string }>
  >([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return Building2;
      case 'ShoppingCart':
        return ShoppingCart;
      case 'Stethoscope':
        return Stethoscope;
      case 'Home':
        return Home;
      case 'Briefcase':
        return Briefcase;
      case 'Utensils':
        return Utensils;
      case 'Train':
        return Train;
      case 'Cross':
        return Cross;
      default:
        return MessageSquare;
    }
  };

  const startRoleplay = (sit: SituationDialogue) => {
    setSelectedSituation(sit);
    setIsRoleplaying(true);
    // Initial AI greeting for the roleplay
    setRoleplayMessages([
      {
        sender: 'ai',
        textDe: sit.sampleDialogue[0]?.german || 'Guten Tag! Wie kann ich Ihnen helfen?',
        textPt: sit.sampleDialogue[0]?.portuguese || 'Bom dia! Como posso ajudar você?',
      },
    ]);
  };

  const handleSendRoleplay = async () => {
    if (!userInput.trim() || isLoadingAi || !selectedSituation) return;

    const userText = userInput;
    setUserInput('');

    const newMsgs = [
      ...roleplayMessages,
      {
        sender: 'user' as const,
        textDe: userText,
        textPt: 'Você',
      },
    ];
    setRoleplayMessages(newMsgs);
    setIsLoadingAi(true);

    try {
      const response = await geminiService.chatWithTeacher(
        `[SITUATION ROLEPLAY: Context: ${selectedSituation.titlePt}, Your Persona: ${selectedSituation.aiRoleDe}]. The user says in German: "${userText}". Reply in character in German, and provide translation & gentle correction if any.`,
        [],
        selectedSituation.level
      );

      setRoleplayMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          textDe: response.replyDe,
          textPt: response.replyPt,
          correction: response.correctionsPt,
        },
      ]);
      addXP(15, 'Prática de diálogo');
      ttsService.speakGerman(response.replyDe);
    } catch {
      setRoleplayMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          textDe: 'Sehr gut! Vielen Dank für Ihre Antwort.',
          textPt: 'Muito bem! Obrigado pela sua resposta.',
        },
      ]);
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div id="conversations_view_container" className="space-y-6 pb-16">
      {/* Top Header */}
      {!isRoleplaying ? (
        <>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Diálogos da Vida Real na Alemanha
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Situações reais do dia a dia de brasileiros: Bürgeramt, médico, supermercado, moradia e trabalho
            </p>
          </div>

          {/* Scenarios Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {initialSituationsData.map((sit) => {
              const Icon = getIcon(sit.icon);
              return (
                <div
                  key={sit.id}
                  id={`situation_card_${sit.id}`}
                  className="p-6 rounded-[2rem] bg-white border-2 border-slate-100 hover:border-blue-300 transition-all flex flex-col justify-between shadow-xs group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0 shadow-xs">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                            {sit.level} • {sit.category}
                          </span>
                          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg mt-0.5">
                            {sit.titlePt}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {sit.descriptionPt}
                    </p>

                    {/* Cultural Tip pill */}
                    <div className="mt-3.5 p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span className="font-medium">
                        <strong className="text-amber-800 font-bold">Dica cultural:</strong> {sit.culturalTipsPt}
                      </span>
                    </div>

                    {/* Useful phrases preview */}
                    <div className="mt-4 space-y-1.5">
                      <span className="text-[11px] uppercase font-black text-slate-500 tracking-wider">
                        Frases essenciais:
                      </span>
                      {sit.usefulPhrases.slice(0, 2).map((ph, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                        >
                          <div className="truncate mr-2">
                            <span className="font-bold text-slate-900">{ph.german}</span>
                            <span className="text-slate-500 block text-[11px] font-medium">{ph.portuguese}</span>
                          </div>
                          <button
                            onClick={() => ttsService.speakGerman(ph.german)}
                            className="p-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer shadow-xs shrink-0"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        setSelectedSituation(sit);
                        ttsService.speakGerman(sit.sampleDialogue[0]?.german || '');
                      }}
                      className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ver frases & modelo</span>
                    </button>

                    <button
                      onClick={() => startRoleplay(sit)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Simular Diálogo IA</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* LIVE ROLEPLAY SIMULATION INTERFACE */
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Header Bar */}
          <div className="p-4 rounded-[1.75rem] bg-white border-2 border-slate-100 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsRoleplaying(false)}
                className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">
                  Simulação em tempo real
                </span>
                <h3 className="font-black text-slate-900 text-base sm:text-lg">
                  {selectedSituation?.titlePt}
                </h3>
              </div>
            </div>

            <div className="text-right text-xs text-slate-500 hidden sm:block font-bold">
              <span className="text-slate-800 font-extrabold">{selectedSituation?.aiRoleDe}</span>
            </div>
          </div>

          {/* Useful phrases helper card during roleplay */}
          <div className="p-3.5 rounded-2xl bg-blue-50 border-2 border-blue-200 space-y-2">
            <span className="text-[11px] font-bold text-blue-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Frases úteis que você pode usar:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedSituation?.usefulPhrases.map((ph, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setUserInput(ph.german);
                    ttsService.speakGerman(ph.german);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-100 border border-blue-200 text-xs text-blue-800 text-left transition-colors font-medium shadow-xs cursor-pointer"
                >
                  "{ph.german}" 🔊
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="min-h-[350px] max-h-[480px] overflow-y-auto space-y-3 p-4 rounded-[2rem] bg-white/80 border-2 border-slate-100 shadow-xs">
            {roleplayMessages.map((msg, mIdx) => (
              <div
                key={mIdx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-[1.75rem] p-4 space-y-2 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white font-medium rounded-tr-sm'
                      : 'bg-white border-2 border-slate-100 text-slate-800 rounded-tl-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold opacity-75">
                      {msg.sender === 'user' ? 'Você (Aluno)' : selectedSituation?.aiRoleDe}
                    </span>
                    <button
                      onClick={() => ttsService.speakGerman(msg.textDe)}
                      className="p-1 rounded-lg bg-black/5 hover:bg-black/10 text-current cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-sm font-bold">{msg.textDe}</div>

                  {msg.textPt && (
                    <div className="text-xs opacity-90 italic pt-1 border-t border-current/10 font-normal">
                      {msg.textPt}
                    </div>
                  )}

                  {msg.correction && (
                    <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900 text-xs border border-amber-200 font-medium">
                      💡 <strong>Dica:</strong> {msg.correction}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoadingAi && (
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-slate-600 text-xs flex items-center gap-2 font-medium w-fit shadow-xs">
                <Bot className="w-4 h-4 text-blue-600 animate-spin" />
                <span>O atendente alemão está respondendo...</span>
              </div>
            )}
          </div>

          {/* User Input in Roleplay */}
          <div className="p-2 rounded-2xl bg-white border-2 border-slate-100 flex items-center gap-2 shadow-xs">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendRoleplay();
              }}
              placeholder="Responda em alemão (ex: Guten Tag, ich habe einen Termin...)"
              className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
            />
            <button
              onClick={handleSendRoleplay}
              disabled={!userInput.trim() || isLoadingAi}
              className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold disabled:opacity-40 shadow-xs cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
