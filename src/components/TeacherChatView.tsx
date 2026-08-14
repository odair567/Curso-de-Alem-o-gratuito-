import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TeacherChatMessage } from '../types';
import { geminiService } from '../services/geminiService';
import { ttsService } from '../services/ttsService';
import {
  Bot,
  Send,
  Volume2,
  Mic,
  MicOff,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  AlertCircle,
  Lightbulb,
  MessageSquare,
} from 'lucide-react';

export const TeacherChatView: React.FC = () => {
  const { user, addXP } = useApp();
  const [messages, setMessages] = useState<TeacherChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'ai',
      germanText: 'Hallo! Ich bin Herr Deutsch, dein virtueller Deutschlehrer. Wie kann ich dir heute helfen?',
      portugueseTranslation:
        'Olá! Eu sou o Herr Deutsch, seu professor virtual de alemão. Como posso te ajudar hoje?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickPrompts = [
    'Como pedir comida no restaurante sem errar o artigo?',
    'Simular um diálogo no Bürgeramt para fazer a Anmeldung',
    'Explique a diferença entre "wissen" e "kennen" com exemplos',
    'Qual a regra simples para saber se uso "nicht" ou "kein"?',
    'Corrija esta frase: "Ich habe gestern nach München gefahrt"',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMessage: TeacherChatMessage = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = messages
        .filter((m) => m.id !== 'msg_welcome')
        .map((m) => ({
          sender: m.sender,
          text: m.sender === 'user' ? (m.text || '') : (m.germanText || ''),
        }));

      const aiResponse = await geminiService.chatWithTeacher(query, history, user.level);

      const aiMessage: TeacherChatMessage = {
        id: `msg_ai_${Date.now()}`,
        sender: 'ai',
        germanText: aiResponse.replyDe,
        portugueseTranslation: aiResponse.replyPt,
        correctionsPt: aiResponse.correctionsPt,
        suggestedNextTopics: aiResponse.suggestedVocab,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
      addXP(10, 'Conversa com Herr Deutsch');

      // Speak AI German reply
      if (aiResponse.replyDe) {
        ttsService.speakGerman(aiResponse.replyDe);
      }
    } catch (error) {
      const fallbackMessage: TeacherChatMessage = {
        id: `msg_ai_fallback_${Date.now()}`,
        sender: 'ai',
        germanText: 'Das ist eine sehr gute Frage! Auf Deutsch sagen wir: "Übung macht den Meister".',
        portugueseTranslation:
          'Essa é uma excelente pergunta! Em alemão dizemos: "A prática leva à perfeição". Tente formular mais frases curtas para praticarmos!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Speech Recognition support for Brazilian users
  const handleToggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Seu navegador não suporta reconhecimento de voz direto. Digite sua mensagem no campo de texto.');
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR'; // or 'de-DE'
    recognition.interimResults = false;

    if (!isListening) {
      recognition.start();
      setIsListening(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div id="teacher_chat_container" className="max-w-4xl mx-auto space-y-4 pb-16 flex flex-col h-[calc(100vh-140px)] min-h-[600px]">
      {/* Teacher Header Bar */}
      <div className="p-4 rounded-[1.75rem] bg-white border-2 border-slate-100 flex items-center justify-between shadow-xs shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xs shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                Herr Deutsch AI
              </h3>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online 24h
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Professor nativo virtual adaptado para brasileiros ({user.level})
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'msg_welcome_fresh',
                sender: 'ai',
                germanText: 'Hallo wieder! Womit möchtest du heute üben?',
                portugueseTranslation: 'Olá novamente! Com o que você gostaria de praticar hoje?',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ])
          }
          className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Reiniciar conversa"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Prompts Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 shrink-0">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-blue-50 border-2 border-slate-100 hover:border-blue-300 text-xs text-slate-700 hover:text-blue-700 font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 p-3 sm:p-4 rounded-[2rem] bg-white/80 border-2 border-slate-100 shadow-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] sm:max-w-[80%] rounded-[1.75rem] p-4 sm:p-5 space-y-2.5 shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-sm font-medium'
                  : 'bg-white border-2 border-slate-100 text-slate-800 rounded-tl-sm'
              }`}
            >
              {/* User message */}
              {msg.sender === 'user' ? (
                <div className="text-sm leading-relaxed">{msg.text}</div>
              ) : (
                /* AI Message with German, Translation, Corrections, Audio */
                <div className="space-y-3">
                  {/* German text with audio button */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                      {msg.germanText}
                    </div>
                    {msg.germanText && (
                      <button
                        onClick={() => ttsService.speakGerman(msg.germanText || '')}
                        className="p-2 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 transition-colors shrink-0 shadow-xs cursor-pointer"
                        title="Ouvir resposta em alemão"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Portuguese translation */}
                  {msg.portugueseTranslation && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      <span className="text-[11px] font-bold text-blue-700 block mb-0.5 uppercase tracking-wider">
                        Tradução & Explicação:
                      </span>
                      {msg.portugueseTranslation}
                    </div>
                  )}

                  {/* Grammar correction box if mistakes detected */}
                  {msg.correctionsPt && (
                    <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-200 text-xs text-amber-900 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-800">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                        <span>Dica de Gramática do Professor:</span>
                      </div>
                      <p className="leading-relaxed font-medium">{msg.correctionsPt}</p>
                    </div>
                  )}

                  {/* Suggested Vocabulary chips */}
                  {msg.suggestedNextTopics && msg.suggestedNextTopics.length > 0 && (
                    <div className="pt-1 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">
                        Vocabulário útil:
                      </span>
                      {msg.suggestedNextTopics.map((item, iIdx) => (
                        <span
                          key={iIdx}
                          onClick={() => ttsService.speakGerman(item)}
                          className="cursor-pointer text-[11px] bg-blue-50 hover:bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-lg border border-blue-200 font-semibold transition-colors"
                        >
                          {item} 🔊
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div
                className={`text-[10px] ${
                  msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                } text-right font-medium`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border-2 border-slate-100 text-slate-600 text-xs font-medium w-fit shadow-xs">
            <Bot className="w-4 h-4 text-blue-600 animate-spin" />
            <span>Herr Deutsch está digitando sua resposta...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-2 rounded-2xl bg-white border-2 border-slate-100 flex items-center gap-2 shrink-0 shadow-xs">
        <button
          onClick={handleToggleVoiceInput}
          className={`p-3 rounded-xl transition-colors cursor-pointer ${
            isListening
              ? 'bg-rose-500 text-white animate-pulse'
              : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
          }`}
          title={isListening ? 'Ouvindo... toque para parar' : 'Falar por voz'}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder="Pergunte em português ou escreva em alemão..."
          className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputQuery.trim() || isLoading}
          className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold disabled:opacity-40 transition-all active:scale-95 shadow-xs cursor-pointer"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
