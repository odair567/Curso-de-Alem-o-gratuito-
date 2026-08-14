import React from 'react';
import { useApp } from '../context/AppContext';
import { initialCourseModulesData } from '../data/lessonsData';
import { CourseLevel, Lesson } from '../types';
import {
  CheckCircle2,
  Lock,
  Play,
  Sparkles,
  Clock,
  Zap,
  BookOpen,
  Award,
  ChevronRight,
} from 'lucide-react';
import { ttsService } from '../services/ttsService';

export const CourseRoadmapView: React.FC = () => {
  const {
    selectedLevel,
    setSelectedLevel,
    completedLessons,
    setActiveLessonModal,
    user,
  } = useApp();

  const levels: CourseLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

  // Filter modules by selected level
  const currentModules = initialCourseModulesData.filter(
    (m) => m.level === selectedLevel
  );

  return (
    <div id="course_roadmap_container" className="space-y-6 pb-16">
      {/* Header & Level Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Trilha de Aprendizado: Nível {selectedLevel}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Estrutura progressiva de A1 a C1 com explicações e exercícios práticos
          </p>
        </div>

        {/* Level Switcher */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start shadow-xs">
          {levels.map((lvl) => {
            const isSelected = selectedLevel === lvl;
            const isUserLevel = user.level === lvl;
            return (
              <button
                key={lvl}
                id={`course_level_tab_${lvl}`}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span>{lvl}</span>
                {isUserLevel && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-8">
        {currentModules.map((module, mIdx) => {
          const moduleLessons = module.lessons;
          const completedCount = moduleLessons.filter((l) =>
            completedLessons.includes(l.id)
          ).length;

          return (
            <div
              key={module.id}
              id={`module_card_${module.id}`}
              className="rounded-[2rem] bg-white border-2 border-slate-100 p-6 sm:p-8 shadow-xs relative overflow-hidden"
            >
              {/* Module Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 text-blue-800 flex items-center justify-center font-black text-lg shrink-0 shadow-xs">
                    {mIdx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                        {module.level}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-base sm:text-xl">
                        {module.titlePt}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {module.descriptionPt}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200 self-start sm:self-auto">
                  {completedCount} / {moduleLessons.length} Lições Concluídas
                </div>
              </div>

              {/* Lessons Grid in Module */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {moduleLessons.map((lesson, lIdx) => {
                  const isDone = completedLessons.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      id={`lesson_item_${lesson.id}`}
                      onClick={() => setActiveLessonModal(lesson)}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between group ${
                        isDone
                          ? 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300 shadow-xs'
                          : 'bg-slate-50/80 border-slate-200 hover:border-blue-300 hover:bg-white shadow-xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="text-[11px] font-bold text-blue-700 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded-lg">
                            {lesson.titleDe}
                          </span>

                          <div className="flex items-center gap-2">
                            {isDone ? (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Concluído</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-200/80 px-2.5 py-0.5 rounded-full">
                                <Clock className="w-3 h-3" />
                                <span>{lesson.durationMinutes} min</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <h4 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-blue-600 transition-colors">
                          {lesson.titlePt}
                        </h4>

                        <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 font-medium">
                          {lesson.descriptionPt}
                        </p>

                        {lesson.grammarFocus && (
                          <div className="mt-3 p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-700 font-medium">
                            <span className="text-blue-600 font-bold">Foco:</span>{' '}
                            {lesson.grammarFocus}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                          <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>+{lesson.xpReward} XP</span>
                        </div>

                        <button
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer ${
                            isDone
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{isDone ? 'Revisar' : 'Iniciar'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
