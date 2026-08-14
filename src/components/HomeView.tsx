import React from 'react';
import { useApp } from '../context/AppContext';
import { initialCourseModulesData } from '../data/lessonsData';
import {
  Play,
  Flame,
  Zap,
  BookOpen,
  Layers,
  BookMarked,
  Bot,
  MessageSquare,
  Mic,
  Headphones,
  CheckSquare,
  Brain,
  Flag,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Award,
  Calendar,
} from 'lucide-react';

interface HomeViewProps {
  onStartLesson?: (lessonId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStartLesson }) => {
  const {
    user,
    setActiveTab,
    completedLessons,
    setActiveLessonModal,
    dailyTasks,
    completeDailyTask,
    weakAreas,
    vocabulary,
  } = useApp();

  // Find next recommended lesson to continue
  const allLessons = initialCourseModulesData.flatMap((m) => m.lessons);
  const nextLesson = allLessons.find((l) => !completedLessons.includes(l.id)) || allLessons[0];

  // Calculate overall level progress
  const totalLessonsInLevel = allLessons.filter((l) => l.level === user.level).length || 4;
  const completedInLevel = allLessons.filter(
    (l) => l.level === user.level && completedLessons.includes(l.id)
  ).length;
  const progressPercent = Math.min(100, Math.round((completedInLevel / totalLessonsInLevel) * 100));

  const levelTitleMap: Record<string, string> = {
    A1: 'Iniciante',
    A2: 'Básico',
    B1: 'Intermediário',
    B2: 'Avançado',
    C1: 'Fluente Profissional',
  };

  const handleStartNextLesson = () => {
    if (nextLesson) {
      if (onStartLesson) {
        onStartLesson(nextLesson.id);
      } else {
        setActiveLessonModal(nextLesson);
      }
    } else {
      setActiveTab('course');
    }
  };

  // 8 Vibrant Quick Access Modules matching the design palette
  const vibrantModules = [
    {
      id: 'vocab',
      emoji: '📖',
      title: 'Vocabulário',
      bgClass: 'bg-emerald-100 hover:bg-emerald-200/90 border-emerald-300 text-emerald-900',
    },
    {
      id: 'grammar',
      emoji: '⚖️',
      title: 'Gramática',
      bgClass: 'bg-purple-100 hover:bg-purple-200/90 border-purple-300 text-purple-900',
    },
    {
      id: 'pronunciation',
      emoji: '🗣️',
      title: 'Pronúncia',
      bgClass: 'bg-amber-100 hover:bg-amber-200/90 border-amber-300 text-amber-900',
    },
    {
      id: 'pronunciation',
      emoji: '🎧',
      title: 'Escuta',
      bgClass: 'bg-rose-100 hover:bg-rose-200/90 border-rose-300 text-rose-900',
    },
    {
      id: 'conversation',
      emoji: '💬',
      title: 'Conversação',
      bgClass: 'bg-sky-100 hover:bg-sky-200/90 border-sky-300 text-sky-900',
    },
    {
      id: 'exercises',
      emoji: '✍️',
      title: 'Exercícios',
      bgClass: 'bg-indigo-100 hover:bg-indigo-200/90 border-indigo-300 text-indigo-900',
    },
    {
      id: 'revision',
      emoji: '♻️',
      title: 'Revisão',
      bgClass: 'bg-orange-100 hover:bg-orange-200/90 border-orange-300 text-orange-900',
    },
    {
      id: 'life',
      emoji: '🏘️',
      title: 'Vida na DE',
      bgClass: 'bg-slate-200 hover:bg-slate-300/90 border-slate-400 text-slate-800',
    },
  ];

  return (
    <div id="home_view_container" className="space-y-6 pb-16">
      {/* Top Banner Alert for Weak Areas if any */}
      {weakAreas.filter((w) => w.status === 'needs_revision').length > 0 && (
        <div
          id="weak_areas_alert"
          onClick={() => setActiveTab('revision')}
          className="p-4 rounded-2xl bg-orange-50 border-2 border-orange-200 flex items-center justify-between gap-4 cursor-pointer hover:bg-orange-100/80 transition-all shadow-xs group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-lg shadow-xs">
              ⚠️
            </div>
            <div>
              <h4 className="text-sm font-bold text-orange-950">Revisão Personalizada Pronta!</h4>
              <p className="text-xs text-orange-800">
                Você tem {weakAreas.filter((w) => w.status === 'needs_revision').length} tópicos com erros identificados (ex: Akkusativ, posição do verbo). Clique para praticar!
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-orange-600 group-hover:translate-x-1 transition-transform" />
        </div>
      )}

      {/* Main Grid: Left Section (8 cols) & Aside (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main 8-column Content */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          {/* Welcome / Level Hero Card */}
          <div
            id="hero_welcome_section"
            className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border-2 border-slate-100 relative overflow-hidden text-slate-800"
          >
            {/* Watermark Level */}
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none select-none">
              <span className="text-8xl sm:text-9xl font-black text-slate-900">{user.level}</span>
            </div>

            <div className="relative z-10">
              <h2 className="text-base sm:text-lg font-medium text-slate-500 mb-1">
                Willkommen zurück, {user.name || 'Guilherme'}!
              </h2>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
                Nível {user.level}: {levelTitleMap[user.level] || 'Iniciante'}
              </h3>

              {/* Progress Bar */}
              <div className="flex items-center gap-4 mb-6 max-w-xl">
                <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${Math.max(8, progressPercent)}%` }}
                  />
                </div>
                <span className="font-bold text-slate-700 text-sm sm:text-base">{progressPercent}%</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  id="continue_studying_button"
                  onClick={handleStartNextLesson}
                  className="bg-blue-600 text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-98 transition-all cursor-pointer flex items-center gap-2.5"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>Continuar Estudando</span>
                </button>
                <button
                  id="view_roadmap_button"
                  onClick={() => setActiveTab('course')}
                  className="bg-slate-100 text-slate-700 px-6 py-3.5 sm:py-4 rounded-2xl font-bold border border-slate-200 hover:bg-slate-200 active:scale-98 transition-all cursor-pointer"
                >
                  Ver Mapa do Curso
                </button>
              </div>
            </div>
          </div>

          {/* Vibrant Quick Modules (4-columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
            {vibrantModules.map((mod, idx) => (
              <div
                key={idx}
                id={`vibrant_tile_${mod.id}_${idx}`}
                onClick={() => setActiveTab(mod.id)}
                className={`${mod.bgClass} p-4 rounded-3xl border-b-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all hover:scale-[1.03] active:scale-95 shadow-xs`}
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-xs shrink-0">
                  {mod.emoji}
                </div>
                <span className="font-bold text-sm leading-tight">{mod.title}</span>
              </div>
            ))}
          </div>

          {/* Daily Study Tasks Section */}
          <div
            id="daily_study_plan_section"
            className="bg-white p-6 sm:p-7 rounded-[2rem] shadow-sm border-2 border-slate-100 text-slate-800"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl border border-blue-100">
                  🎯
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Meu Estudo de Hoje</h3>
                  <p className="text-xs text-slate-500 font-medium">Meta diária: 15 minutos de prática focada</p>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                {dailyTasks.filter((t) => t.completed).length} / {dailyTasks.length} concluídas
              </span>
            </div>

            {/* Daily Tasks List */}
            <div className="space-y-2.5">
              {dailyTasks.map((task) => (
                <div
                  key={task.id}
                  id={`daily_task_${task.id}`}
                  onClick={() => {
                    if (!task.completed) {
                      if (task.type === 'vocab') setActiveTab('vocab');
                      else if (task.type === 'grammar') setActiveTab('grammar');
                      else if (task.type === 'exercise') setActiveTab('exercises');
                      else if (task.type === 'chat') setActiveTab('teacher');
                      else if (task.type === 'pronunciation') setActiveTab('pronunciation');
                      completeDailyTask(task.id);
                    }
                  }}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all cursor-pointer ${
                    task.completed
                      ? 'bg-slate-50 border-slate-100 text-slate-400'
                      : 'bg-white border-slate-100 hover:border-blue-300 hover:shadow-xs text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                    )}
                    <div className="text-xs sm:text-sm font-semibold">
                      <span className={task.completed ? 'line-through text-slate-400' : 'text-slate-900'}>
                        {task.titlePt}
                      </span>
                      <div className="text-[11px] text-slate-400 font-normal mt-0.5">
                        ~{task.estimatedMinutes} min • +{task.xpReward} XP
                      </div>
                    </div>
                  </div>

                  <button
                    className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all shrink-0 ${
                      task.completed
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                    }`}
                  >
                    {task.completed ? 'Feito' : 'Iniciar'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Aside (4 cols): Teacher Card + Meta Diária */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {/* Herr Deutsch AI Highlight Card */}
          <div
            id="teacher_highlight_card"
            className="bg-slate-900 rounded-[2rem] p-6 text-white flex flex-col justify-between relative overflow-hidden border-2 border-slate-800 shadow-md min-h-[290px]"
          >
            <div className="z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-2xl border-2 border-blue-400 shrink-0 shadow-sm">
                  👨‍🏫
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Herr Deutsch AI</h4>
                  <p className="text-[11px] text-blue-300 uppercase tracking-widest font-bold">
                    Professor Virtual
                  </p>
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded-2xl mb-4 text-xs sm:text-sm border-l-4 border-blue-500 italic text-slate-100 leading-relaxed">
                "Hallo! Você está indo muito bem com o acusativo. Que tal praticarmos um pouco mais o gênero dos substantivos hoje?"
              </div>

              <button
                id="start_chat_with_ai_button"
                onClick={() => setActiveTab('teacher')}
                className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 text-sm"
              >
                <Bot className="w-4 h-4" />
                <span>Falar com Professor</span>
              </button>
            </div>

            {/* Background Watermark */}
            <div className="absolute -bottom-10 -right-10 opacity-20 pointer-events-none select-none">
              <span className="text-[10rem] leading-none font-black text-white">DE</span>
            </div>
          </div>

          {/* Meta Diária (Daily Goal Card) */}
          <div
            id="daily_goal_card"
            className="bg-white rounded-[2rem] p-6 shadow-sm border-2 border-slate-100 text-slate-900"
          >
            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-base">
              <span className="text-xl">📅</span> Meta Diária
            </h4>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-500">Estudo de hoje: 12/20 min</span>
                <span className="font-bold text-blue-600">60%</span>
              </div>

              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className="w-3/5 h-full bg-blue-600 rounded-full"></div>
              </div>

              <div className="grid grid-cols-7 gap-1.5 mt-2">
                <div className="h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-[11px] text-white font-black shadow-xs" title="Segunda - Concluído">
                  S
                </div>
                <div className="h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-[11px] text-white font-black shadow-xs" title="Terça - Concluído">
                  T
                </div>
                <div className="h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-[11px] text-white font-black shadow-xs" title="Quarta - Concluído">
                  Q
                </div>
                <div className="h-9 bg-blue-600 rounded-xl flex items-center justify-center text-[11px] text-white font-black animate-pulse shadow-xs" title="Quinta - Hoje!">
                  Q
                </div>
                <div className="h-9 bg-slate-100 rounded-xl flex items-center justify-center text-[11px] text-slate-400 font-bold" title="Sexta">
                  S
                </div>
                <div className="h-9 bg-slate-100 rounded-xl flex items-center justify-center text-[11px] text-slate-400 font-bold" title="Sábado">
                  S
                </div>
                <div className="h-9 bg-slate-100 rounded-xl flex items-center justify-center text-[11px] text-slate-400 font-bold" title="Domingo">
                  D
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
