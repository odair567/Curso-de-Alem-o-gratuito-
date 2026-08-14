import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CourseLevel } from '../types';
import {
  User,
  Flame,
  Zap,
  Award,
  BookOpen,
  CheckSquare,
  Settings,
  Target,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, achievements, updateUserProfile, triggerCelebration } = useApp();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(user.name);
  const [tempGoal, setTempGoal] = useState<number>(user.dailyGoalMinutes);
  const [tempLevel, setTempLevel] = useState<CourseLevel>(user.level);
  const [tempReason, setTempReason] = useState<string>(user.learningReason);

  const handleSaveProfile = () => {
    updateUserProfile({
      name: tempName,
      dailyGoalMinutes: tempGoal,
      level: tempLevel,
      learningReason: tempReason,
    });
    setIsEditing(false);
    triggerCelebration();
  };

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  return (
    <div id="profile_view_container" className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-[2.5rem] bg-white border-2 border-slate-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-white font-black text-2xl shadow-xs border-2 border-blue-500 shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-black text-slate-900">{user.name}</h2>
              <span className="bg-blue-100 text-blue-800 font-black text-xs px-2.5 py-0.5 rounded-lg border border-blue-200 shadow-xs">
                Nível {user.level}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Objetivo: <span className="text-slate-800 font-bold">{user.learningReason}</span>
            </p>
            <p className="text-xs text-emerald-700 font-bold">
              Meta Diária: {user.dailyGoalMinutes} min/dia
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer shadow-xs"
        >
          {isEditing ? 'Cancelar' : 'Editar Perfil'}
        </button>
      </div>

      {/* Edit Form Modal/Card */}
      {isEditing && (
        <div className="p-6 rounded-[2rem] bg-slate-50 border-2 border-slate-200 space-y-4 animate-in fade-in shadow-xs">
          <h3 className="font-black text-slate-900 text-base">Ajustar Metas & Perfil</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Seu Nome:</label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white border-2 border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Nível de Alemão:</label>
              <select
                value={tempLevel}
                onChange={(e) => setTempLevel(e.target.value as CourseLevel)}
                className="w-full p-2.5 rounded-xl bg-white border-2 border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 font-bold cursor-pointer"
              >
                <option value="A1">A1 (Iniciante)</option>
                <option value="A2">A2 (Básico)</option>
                <option value="B1">B1 (Intermediário)</option>
                <option value="B2">B2 (Avançado / Profissional)</option>
                <option value="C1">C1 (Fluente)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Meta de Estudo Diário:
              </label>
              <select
                value={tempGoal}
                onChange={(e) => setTempGoal(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-white border-2 border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
              >
                <option value={10}>10 minutos por dia (Leve)</option>
                <option value={15}>15 minutos por dia (Recomendado)</option>
                <option value={30}>30 minutos por dia (Intensivo)</option>
                <option value={45}>45 minutos por dia (Avanço Rápido)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Motivação Principal:</label>
              <input
                type="text"
                value={tempReason}
                onChange={(e) => setTempReason(e.target.value)}
                placeholder="Ex: Trabalho, Bürgeramt, Faculdade..."
                className="w-full p-2.5 rounded-xl bg-white border-2 border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          <button
            onClick={handleSaveProfile}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xs transition-transform active:scale-95 cursor-pointer"
          >
            Salvar Alterações
          </button>
        </div>
      )}

      {/* Gamification Stats Bento Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border-2 border-slate-100 text-center space-y-1 shadow-xs">
          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
            <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
          </div>
          <div className="text-xl font-black text-slate-900">{user.streakDays} Dias</div>
          <div className="text-[11px] text-slate-500 font-medium">Sequência Diária</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border-2 border-slate-100 text-center space-y-1 shadow-xs">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center">
            <Zap className="w-5 h-5 fill-blue-600 text-blue-600" />
          </div>
          <div className="text-xl font-black text-slate-900">{user.xp} XP</div>
          <div className="text-[11px] text-slate-500 font-medium">Total de Pontos</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border-2 border-slate-100 text-center space-y-1 shadow-xs">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="text-xl font-black text-slate-900">{user.masteredWordsCount}</div>
          <div className="text-[11px] text-slate-500 font-medium">Palavras Dominadas</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border-2 border-slate-100 text-center space-y-1 shadow-xs">
          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 mx-auto flex items-center justify-center">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div className="text-xl font-black text-slate-900">{user.totalExercisesDone}</div>
          <div className="text-[11px] text-slate-500 font-medium">Exercícios Feitos</div>
        </div>
      </div>

      {/* Badges & Achievements Section */}
      <div className="p-6 rounded-[2.5rem] bg-white border-2 border-slate-100 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Award className="w-6 h-6 text-blue-600" />
            <h3 className="font-black text-slate-900 text-lg">Conquistas & Medalhas</h3>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            {unlockedCount} / {achievements.length} Desbloqueadas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border-2 flex flex-col justify-between space-y-2 text-center shadow-xs transition-all ${
                ach.isUnlocked
                  ? 'bg-amber-50/70 border-amber-200'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg ${
                    ach.isUnlocked
                      ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {ach.isUnlocked ? '🏆' : <Lock className="w-5 h-5" />}
                </div>

                <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">{ach.titlePt}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{ach.descriptionPt}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[10px] font-black text-amber-700">
                +{ach.xpBonus} XP
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
