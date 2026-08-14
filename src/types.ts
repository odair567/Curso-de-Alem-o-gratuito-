export type CourseLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type ArticleType = 'der' | 'die' | 'das' | 'none';

export type DifficultyRating = 'easy' | 'medium' | 'hard';

export type ExerciseType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'translate_pt_de'
  | 'translate_de_pt'
  | 'order_words'
  | 'true_false'
  | 'select_article'
  | 'select_verb'
  | 'type_answer'
  | 'find_error'
  | 'dialogue_complete'
  | 'listening';

export interface VocabularyWord {
  id: string;
  german: string;
  article: ArticleType;
  plural?: string;
  translationPt: string;
  exampleGerman: string;
  examplePt: string;
  level: CourseLevel;
  category: string;
  pronunciationIpa?: string;
  audioHint?: string;
  culturalTip?: string;
  userRating?: DifficultyRating;
  repetitions?: number;
  lastReviewed?: string;
  isFavorite?: boolean;
}

export interface ExerciseItem {
  id: string;
  type: ExerciseType;
  level: CourseLevel;
  category: string;
  instructionPt: string;
  question: string;
  germanContext?: string;
  audioPrompt?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanationPt: string;
  brazilianTip?: string;
  xp: number;
  wordTiles?: string[]; // For order_words
}

export interface LessonExample {
  german: string;
  portuguese: string;
  audio?: string;
  note?: string;
}

export interface LessonVocabularyItem {
  german: string;
  article?: ArticleType;
  plural?: string;
  portuguese: string;
  example?: string;
  examplePt?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  level: CourseLevel;
  titlePt: string;
  titleDe: string;
  descriptionPt: string;
  durationMinutes: number;
  order: number;
  xpReward: number;
  theoryExplanationPt: string;
  grammarFocus: string;
  culturalNotePt?: string;
  vocabulary: LessonVocabularyItem[];
  examples: LessonExample[];
  practiceExercises: ExerciseItem[];
  miniTestExercises: ExerciseItem[];
  isCompleted?: boolean;
  scorePercent?: number;
}

export interface CourseModule {
  id: string;
  level: CourseLevel;
  order: number;
  titlePt: string;
  titleDe: string;
  descriptionPt: string;
  iconName: string;
  lessons: Lesson[];
}

export interface GrammarTopic {
  id: string;
  level: CourseLevel;
  titlePt: string;
  titleDe: string;
  category: string;
  shortSummaryPt: string;
  summaryPt?: string;
  fullExplanationPt: string;
  explanationPt?: string;
  rulesList: string[];
  tables?: {
    header: string[];
    rows: string[][];
  }[];
  examples: LessonExample[];
  brazilianPitfallPt: string;
  brazilianMistakePt?: string;
  goldenRulePt?: string;
  practiceExercises: ExerciseItem[];
}

export interface SituationDialogue {
  id: string;
  titlePt: string;
  titleDe: string;
  category: 'bureaucracy' | 'daily_life' | 'health' | 'work' | 'housing' | 'social';
  location: string;
  level: CourseLevel;
  icon: string;
  descriptionPt: string;
  culturalTipsPt: string;
  contextScenarioPt: string;
  userRolePt: string;
  aiRoleDe: string;
  usefulPhrases: {
    german: string;
    portuguese: string;
    pronunciationNote?: string;
  }[];
  sampleDialogue: {
    speaker: string;
    german: string;
    portuguese: string;
  }[];
}

export interface TeacherChatMessage {
  id: string;
  sender: 'user' | 'teacher' | 'ai';
  text?: string;
  germanText?: string;
  germanOriginal?: string;
  portugueseTranslation?: string;
  correction?: string;
  correctionsPt?: string;
  explanationPt?: string;
  naturalSuggestion?: string;
  suggestedNextTopics?: string[];
  grammarTopicsDetected?: string[];
  timestamp: string;
  audioAvailable?: boolean;
}

export interface WeakAreaItem {
  id: string;
  topicName: string;
  category: string;
  level: CourseLevel;
  mistakesCount: number;
  lastMistakeDate: string;
  recommendedRulePt: string;
  status: 'needs_revision' | 'mastered';
}

export interface DailyStudyTask {
  id: string;
  titlePt: string;
  type: 'vocab' | 'grammar' | 'exercise' | 'chat' | 'listening' | 'pronunciation';
  estimatedMinutes: number;
  completed: boolean;
  actionPayload?: any;
  xpReward: number;
}

export interface AchievementBadge {
  id: string;
  titlePt: string;
  descriptionPt: string;
  icon: string;
  category: 'streak' | 'lessons' | 'vocab' | 'score' | 'level';
  requirement: number;
  currentProgress: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  xpBonus: number;
}

export interface UserProfile {
  name: string;
  email?: string;
  level: CourseLevel;
  dailyGoalMinutes: number;
  learningReason: string;
  livesInGermany: boolean;
  learningPreference: 'conversation' | 'exercises' | 'vocabulary' | 'balanced';
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  completedLessonIds: string[];
  masteredWordsCount: number;
  totalExercisesDone: number;
  accuracyRate: number;
  onboardingCompleted: boolean;
}

export interface LifeInGermanyTopic {
  id: string;
  titlePt: string;
  titleDe: string;
  icon: string;
  category: string;
  importanceLevel: 'Urgente / Chegada' | 'Essencial' | 'Cotidiano';
  summaryPt: string;
  stepByStepPt: string[];
  keyVocabulary: {
    german: string;
    article?: ArticleType;
    portuguese: string;
    contextPt: string;
  }[];
  practicalTipsPt: string[];
  officialLinksOrNotesPt: string;
}
