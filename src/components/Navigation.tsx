import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  BookOpen,
  Layers,
  BookMarked,
  Bot,
  MessageSquare,
  Mic,
  CheckSquare,
  Brain,
  Flag,
  User,
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, weakAreas } = useApp();

  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'course', label: 'Curso', icon: BookOpen },
    { id: 'vocab', label: 'Vocabulário', icon: Layers },
    { id: 'grammar', label: 'Gramática', icon: BookMarked },
    { id: 'teacher', label: 'Herr Deutsch IA', icon: Bot, isHighlight: true },
    { id: 'conversation', label: 'Conversação', icon: MessageSquare },
    { id: 'pronunciation', label: 'Pronúncia & Voz', icon: Mic },
    { id: 'exercises', label: 'Exercícios', icon: CheckSquare },
    {
      id: 'revision',
      label: 'Minha Revisão',
      icon: Brain,
      badge: weakAreas.filter((w) => w.status === 'needs_revision').length,
    },
    { id: 'life', label: 'Vida na Alemanha', icon: Flag },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  const isCurrentTab = (id: string) => {
    if (activeTab === id) return true;
    if (id === 'vocab' && activeTab === 'flashcards') return true;
    if (id === 'teacher' && activeTab === 'chat') return true;
    if (id === 'conversation' && activeTab === 'conversations') return true;
    if (id === 'life' && activeTab === 'life_germany') return true;
    return false;
  };

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav
        id="mobile_bottom_navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-lg border-t-2 border-slate-100 text-slate-500 px-3 py-2 shadow-2xl flex items-center justify-around"
      >
        <button
          id="mobile_nav_home"
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
            isCurrentTab('home') ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Início</span>
        </button>

        <button
          id="mobile_nav_course"
          onClick={() => setActiveTab('course')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
            isCurrentTab('course') ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px]">Curso</span>
        </button>

        <button
          id="mobile_nav_vocab"
          onClick={() => setActiveTab('vocab')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
            isCurrentTab('vocab') ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px]">Palavras</span>
        </button>

        {/* Central Prominent Herr Deutsch Button */}
        <button
          id="mobile_nav_teacher"
          onClick={() => setActiveTab('teacher')}
          className={`flex flex-col items-center justify-center -mt-6 w-13 h-13 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-300 border-2 border-white active:scale-95 transition-all ${
            isCurrentTab('teacher') ? 'ring-4 ring-blue-200' : ''
          }`}
        >
          <Bot className="w-6 h-6" />
        </button>

        <button
          id="mobile_nav_conversation"
          onClick={() => setActiveTab('conversation')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
            isCurrentTab('conversation') ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px]">Diálogos</span>
        </button>

        <button
          id="mobile_nav_revision"
          onClick={() => setActiveTab('revision')}
          className={`relative flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
            isCurrentTab('revision') ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Brain className="w-5 h-5" />
          <span className="text-[10px]">Revisão</span>
          {weakAreas.filter((w) => w.status === 'needs_revision').length > 0 && (
            <span className="absolute top-0 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border border-white" />
          )}
        </button>

        <button
          id="mobile_nav_profile"
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
            isCurrentTab('profile') ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Perfil</span>
        </button>
      </nav>

      {/* Desktop Navigation Top Sub-Bar */}
      <div id="desktop_sub_nav" className="hidden md:block bg-white/95 border-b-2 border-slate-100 sticky top-18 z-30 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-start gap-1.5 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isCurrentTab(item.id);
            return (
              <button
                key={item.id}
                id={`desktop_nav_tab_${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                  active
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-blue-600' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full shadow-xs">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
