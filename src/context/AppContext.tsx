import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CourseLevel,
  UserProfile,
  VocabularyWord,
  ExerciseItem,
  WeakAreaItem,
  DailyStudyTask,
  AchievementBadge,
  Lesson,
  DifficultyRating,
} from '../types';
import { initialVocabularyData } from '../data/vocabularyData';
import { initialCourseModulesData } from '../data/lessonsData';
import { initialAchievementsData } from '../data/achievementsData';
import { soundEffects } from '../services/soundEffects';

interface AppContextType {
  user: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedLevel: CourseLevel;
  setSelectedLevel: (level: CourseLevel) => void;
  vocabulary: VocabularyWord[];
  rateWord: (wordId: string, rating: DifficultyRating) => void;
  toggleFavoriteWord: (wordId: string) => void;
  completedLessons: string[];
  completeLesson: (lessonId: string, scorePercent: number, xpEarned: number) => void;
  addXP: (amount: number, reason?: string) => void;
  recordExerciseResult: (category: string, isCorrect: boolean, exercise: ExerciseItem) => void;
  weakAreas: WeakAreaItem[];
  resolveWeakArea: (id: string) => void;
  dailyTasks: DailyStudyTask[];
  completeDailyTask: (taskId: string) => void;
  achievements: AchievementBadge[];
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  finishOnboarding: (data: Partial<UserProfile>) => void;
  activeLessonModal: Lesson | null;
  setActiveLessonModal: (lesson: Lesson | null) => void;
  triggerCelebration: () => void;
  streakCount: number;
}

const STORAGE_KEYS = {
  USER: 'deutsch_facil_user_v1',
  VOCAB: 'deutsch_facil_vocab_v1',
  WEAK_AREAS: 'deutsch_facil_weak_areas_v1',
  COMPLETED_LESSONS: 'deutsch_facil_completed_lessons_v1',
  ACHIEVEMENTS: 'deutsch_facil_achievements_v1',
};

const defaultUser: UserProfile = {
  name: 'Estudante',
  level: 'A1',
  dailyGoalMinutes: 15,
  learningReason: 'Viver e trabalhar na Alemanha',
  livesInGermany: true,
  learningPreference: 'balanced',
  xp: 120,
  streakDays: 3,
  lastActiveDate: new Date().toISOString(),
  completedLessonIds: [],
  masteredWordsCount: 14,
  totalExercisesDone: 8,
  accuracyRate: 92,
  onboardingCompleted: true,
};

const defaultDailyTasks: DailyStudyTask[] = [
  {
    id: 'dt_1',
    titlePt: 'Aprender 5 palavras novas de A1',
    type: 'vocab',
    estimatedMinutes: 3,
    completed: true,
    xpReward: 20,
  },
  {
    id: 'dt_2',
    titlePt: 'Revisar flashcards marcados como difíceis',
    type: 'vocab',
    estimatedMinutes: 4,
    completed: false,
    xpReward: 25,
  },
  {
    id: 'dt_3',
    titlePt: 'Lição guiada: Artigos der, die, das',
    type: 'grammar',
    estimatedMinutes: 5,
    completed: false,
    xpReward: 35,
  },
  {
    id: 'dt_4',
    titlePt: 'Resolver 5 exercícios interativos',
    type: 'exercise',
    estimatedMinutes: 5,
    completed: false,
    xpReward: 30,
  },
  {
    id: 'dt_5',
    titlePt: 'Conversar 3 minutos com Herr Deutsch AI',
    type: 'chat',
    estimatedMinutes: 3,
    completed: false,
    xpReward: 40,
  },
  {
    id: 'dt_6',
    titlePt: 'Treinar pronúncia com microfone',
    type: 'pronunciation',
    estimatedMinutes: 3,
    completed: false,
    xpReward: 25,
  },
];

const defaultWeakAreas: WeakAreaItem[] = [
  {
    id: 'weak_akkusativ',
    topicName: 'Akkusativ Masculino (den / einen)',
    category: 'Casos Gramaticais',
    level: 'A1',
    mistakesCount: 3,
    lastMistakeDate: new Date().toISOString(),
    recommendedRulePt: 'Lembre-se: No Akkusativ, o artigo masculino "der" transforma-se em "den" (e "ein" em "einen").',
    status: 'needs_revision',
  },
  {
    id: 'weak_verb_position',
    topicName: 'Posição do Verbo (Posição 2 em orações afirmativas)',
    category: 'Estrutura da Frase',
    level: 'A1',
    mistakesCount: 2,
    lastMistakeDate: new Date().toISOString(),
    recommendedRulePt: 'Em orações principais, o verbo conjugado SEMPRE fica na segunda posição da frase.',
    status: 'needs_revision',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : defaultUser;
    } catch {
      return defaultUser;
    }
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel>(user.level || 'A1');

  const [vocabulary, setVocabulary] = useState<VocabularyWord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VOCAB);
      return saved ? JSON.parse(saved) : initialVocabularyData;
    } catch {
      return initialVocabularyData;
    }
  });

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
      return saved ? JSON.parse(saved) : ['les_a1_1_alfabeto'];
    } catch {
      return ['les_a1_1_alfabeto'];
    }
  });

  const [weakAreas, setWeakAreas] = useState<WeakAreaItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WEAK_AREAS);
      return saved ? JSON.parse(saved) : defaultWeakAreas;
    } catch {
      return defaultWeakAreas;
    }
  });

  const [achievements, setAchievements] = useState<AchievementBadge[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      return saved ? JSON.parse(saved) : initialAchievementsData;
    } catch {
      return initialAchievementsData;
    }
  });

  const [dailyTasks, setDailyTasks] = useState<DailyStudyTask[]>(defaultDailyTasks);
  const [activeLessonModal, setActiveLessonModal] = useState<Lesson | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VOCAB, JSON.stringify(vocabulary));
    } catch {}
  }, [vocabulary]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(completedLessons));
    } catch {}
  }, [completedLessons]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WEAK_AREAS, JSON.stringify(weakAreas));
    } catch {}
  }, [weakAreas]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
    } catch {}
  }, [achievements]);

  const triggerCelebration = () => {
    soundEffects.playCelebration();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#000000'],
      });
    } catch {}
  };

  const addXP = (amount: number, reason?: string) => {
    setUser((prev) => {
      const newXP = prev.xp + amount;
      // check if level up
      let newLevel = prev.level;
      if (newXP >= 1500 && prev.level === 'A1') newLevel = 'A2';
      if (newXP >= 3500 && prev.level === 'A2') newLevel = 'B1';
      if (newXP >= 7000 && prev.level === 'B1') newLevel = 'B2';
      if (newXP >= 12000 && prev.level === 'B2') newLevel = 'C1';

      if (newLevel !== prev.level) {
        triggerCelebration();
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
    });
  };

  const rateWord = (wordId: string, rating: DifficultyRating) => {
    soundEffects.playClick();
    setVocabulary((prev) =>
      prev.map((w) => {
        if (w.id === wordId) {
          const reps = (w.repetitions || 0) + 1;
          return {
            ...w,
            userRating: rating,
            repetitions: reps,
            lastReviewed: new Date().toISOString(),
          };
        }
        return w;
      })
    );

    if (rating === 'easy') {
      addXP(5);
      setUser((prev) => ({ ...prev, masteredWordsCount: prev.masteredWordsCount + 1 }));
    } else if (rating === 'hard') {
      // Record in weak areas if marked hard multiple times
      const word = vocabulary.find((v) => v.id === wordId);
      if (word) {
        setWeakAreas((prev) => {
          const existing = prev.find((wa) => wa.topicName.includes(word.german));
          if (existing) {
            return prev.map((wa) => (wa.id === existing.id ? { ...wa, mistakesCount: wa.mistakesCount + 1 } : wa));
          }
          return [
            ...prev,
            {
              id: `weak_word_${word.id}`,
              topicName: `Palavra difícil: ${word.german} (${word.translationPt})`,
              category: 'Vocabulário',
              level: word.level,
              mistakesCount: 1,
              lastMistakeDate: new Date().toISOString(),
              recommendedRulePt: `Lembre-se do artigo: ${word.article !== 'none' ? word.article : ''} ${word.german}. Ex: ${word.exampleGerman}`,
              status: 'needs_revision',
            },
          ];
        });
      }
    }
  };

  const toggleFavoriteWord = (wordId: string) => {
    soundEffects.playClick();
    setVocabulary((prev) =>
      prev.map((w) => (w.id === wordId ? { ...w, isFavorite: !w.isFavorite } : w))
    );
  };

  const completeLesson = (lessonId: string, scorePercent: number, xpEarned: number) => {
    triggerCelebration();
    setCompletedLessons((prev) => (prev.includes(lessonId) ? prev : [...prev, lessonId]));
    addXP(xpEarned);

    setUser((prev) => ({
      ...prev,
      completedLessonIds: prev.completedLessonIds.includes(lessonId)
        ? prev.completedLessonIds
        : [...prev.completedLessonIds, lessonId],
    }));

    // Unlock achievement for first lesson
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === 'ach_first_step' && !ach.isUnlocked) {
          return { ...ach, isUnlocked: true, currentProgress: 1, unlockedAt: new Date().toISOString() };
        }
        return ach;
      })
    );
  };

  const recordExerciseResult = (category: string, isCorrect: boolean, exercise: ExerciseItem) => {
    if (isCorrect) {
      soundEffects.playCorrect();
      addXP(exercise.xp || 15);
      setUser((prev) => ({
        ...prev,
        totalExercisesDone: prev.totalExercisesDone + 1,
      }));
    } else {
      soundEffects.playIncorrect();
      setUser((prev) => ({
        ...prev,
        totalExercisesDone: prev.totalExercisesDone + 1,
      }));

      // Log weak spot
      setWeakAreas((prev) => {
        const existing = prev.find((wa) => wa.topicName.toLowerCase() === category.toLowerCase());
        if (existing) {
          return prev.map((wa) =>
            wa.id === existing.id
              ? {
                  ...wa,
                  mistakesCount: wa.mistakesCount + 1,
                  lastMistakeDate: new Date().toISOString(),
                  status: 'needs_revision',
                }
              : wa
          );
        }
        return [
          ...prev,
          {
            id: `wa_${Date.now()}`,
            topicName: category,
            category: exercise.category || 'Gramática',
            level: exercise.level || 'A1',
            mistakesCount: 1,
            lastMistakeDate: new Date().toISOString(),
            recommendedRulePt: exercise.explanationPt || 'Revise as regras deste tópico na seção de Gramática.',
            status: 'needs_revision',
          },
        ];
      });
    }
  };

  const resolveWeakArea = (id: string) => {
    setWeakAreas((prev) =>
      prev.map((wa) => (wa.id === id ? { ...wa, status: 'mastered' } : wa))
    );
    addXP(30);
    soundEffects.playCorrect();
  };

  const completeDailyTask = (taskId: string) => {
    soundEffects.playCorrect();
    setDailyTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId && !t.completed) {
          addXP(t.xpReward);
          return { ...t, completed: true };
        }
        return t;
      })
    );
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const finishOnboarding = (data: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...data,
      onboardingCompleted: true,
    }));
    triggerCelebration();
  };

  return (
    <AppContext.Provider
      value={{
        user,
        activeTab,
        setActiveTab,
        selectedLevel,
        setSelectedLevel,
        vocabulary,
        rateWord,
        toggleFavoriteWord,
        completedLessons,
        completeLesson,
        addXP,
        recordExerciseResult,
        weakAreas,
        resolveWeakArea,
        dailyTasks,
        completeDailyTask,
        achievements,
        updateUserProfile,
        finishOnboarding,
        activeLessonModal,
        setActiveLessonModal,
        triggerCelebration,
        streakCount: user.streakDays || 3,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
