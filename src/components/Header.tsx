import React from 'react';
import { useApp } from '../context/AppContext';
import { CourseLevel } from '../types';
import { Flame, Zap, Award, Sparkles, BookOpen, Bot } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, activeTab, setActiveTab, selectedLevel, setSelectedLevel } = useApp();

  const levels: CourseLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

  return (
    <header id="main_header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-100 text-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-2 flex items-center justify-between">
        {/* Brand & Logo */}
        <div
          id="brand_logo_button"
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="bg-slate-950 p-2 rounded-xl shadow-sm border border-slate-800 group-hover:scale-105 transition-transform flex flex-col justify-center shrink-0">
            <div className="w-6 h-1.5 bg-[#FFCE00] mb-0.5 rounded-xs"></div>
            <div className="w-6 h-1.5 bg-[#DD0000] mb-0.5 rounded-xs"></div>
            <div className="w-6 h-1.5 bg-slate-950 rounded-xs"></div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight text-slate-900">
                DEUTSCH FÁCIL <span className="text-blue-600">AI</span>
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 hidden sm:block">Alemão prático e direto para brasileiros</p>
          </div>
        </div>

        {/* Level Switcher */}
        <div id="level_selector_group" className="hidden md:flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200">
          {levels.map((lvl) => {
            const isCurrent = user.level === lvl;
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                id={`level_btn_${lvl}`}
                onClick={() => {
                  setSelectedLevel(lvl);
                  if (activeTab === 'home') setActiveTab('course');
                }}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <span>{lvl}</span>
                {isCurrent && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-300' : 'bg-emerald-500'} animate-pulse`} title="Seu nível atual" />
                )}
              </button>
            );
          })}
        </div>

        {/* User Stats: Streak, XP, AI Teacher Launcher, Profile Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak */}
          <div
            id="streak_indicator"
            className="flex items-center gap-1.5 bg-orange-50 border border-orange-200/80 px-3 py-1.5 rounded-full text-orange-600 text-xs sm:text-sm font-bold shadow-xs"
            title={`${user.streakDays} dias de sequência de estudo!`}
          >
            <span className="text-base sm:text-lg">🔥</span>
            <span>{user.streakDays} Dias</span>
          </div>

          {/* XP */}
          <div
            id="xp_indicator"
            className="flex items-center gap-1.5 bg-blue-50 border border-blue-200/80 px-3 py-1.5 rounded-full text-blue-600 text-xs sm:text-sm font-bold shadow-xs"
            title="Seus Pontos de Experiência"
          >
            <span className="text-base sm:text-lg">⭐</span>
            <span>{user.xp.toLocaleString()} XP</span>
          </div>

          {/* Herr Deutsch AI Quick Launcher */}
          <button
            id="header_ai_teacher_button"
            onClick={() => setActiveTab('teacher')}
            className="hidden sm:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-sm transition-all active:scale-95 border border-slate-700"
          >
            <Bot className="w-4 h-4 text-blue-400" />
            <span>Herr Deutsch</span>
          </button>

          {/* User Profile Avatar */}
          <button
            id="header_user_avatar"
            onClick={() => setActiveTab('profile')}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 border-2 border-white shadow-sm flex items-center justify-center text-white font-black text-sm transition-all"
            title="Ver meu perfil"
          >
            {user.name ? user.name.charAt(0).toUpperCase() : 'G'}
          </button>
        </div>
      </div>
    </header>
  );
};
