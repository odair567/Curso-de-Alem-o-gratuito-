import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { CourseRoadmapView } from './components/CourseRoadmapView';
import { VocabularyFlashcardsView } from './components/VocabularyFlashcardsView';
import { GrammarView } from './components/GrammarView';
import { TeacherChatView } from './components/TeacherChatView';
import { ConversationsView } from './components/ConversationsView';
import { PronunciationListeningView } from './components/PronunciationListeningView';
import { ExercisesView } from './components/ExercisesView';
import { LifeInGermanyView } from './components/LifeInGermanyView';
import { SmartRevisionView } from './components/SmartRevisionView';
import { ProfileView } from './components/ProfileView';
import { LessonModal } from './components/LessonModal';
import { OnboardingModal } from './components/OnboardingModal';
import { Lesson } from './types';

const MainAppContent: React.FC = () => {
  const { activeTab, user, allLessons } = useApp();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(!user.onboardingCompleted);

  const handleStartLesson = (lessonId: string) => {
    const found = allLessons.find((l) => l.id === lessonId);
    if (found) {
      setSelectedLesson(found);
    }
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView onStartLesson={handleStartLesson} />;
      case 'course':
        return <CourseRoadmapView onStartLesson={handleStartLesson} />;
      case 'flashcards':
      case 'vocab':
        return <VocabularyFlashcardsView />;
      case 'grammar':
        return <GrammarView />;
      case 'chat':
      case 'teacher':
        return <TeacherChatView />;
      case 'conversations':
      case 'conversation':
        return <ConversationsView />;
      case 'pronunciation':
        return <PronunciationListeningView />;
      case 'exercises':
        return <ExercisesView />;
      case 'life_germany':
      case 'life':
        return <LifeInGermanyView />;
      case 'revision':
        return <SmartRevisionView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeView onStartLesson={handleStartLesson} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Global Application Header */}
      <Header />

      {/* Main Content Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        {/* Dynamic Main View */}
        <main className="flex-1 min-w-0">
          {renderActiveView()}
        </main>
      </div>

      {/* Navigation (Desktop Top/Subbar & Mobile Bottom Bar) */}
      <Navigation />

      {/* Active Lesson Modal */}
      {selectedLesson && (
        <LessonModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
        />
      )}

      {/* Onboarding Diagnostic Test Modal */}
      {showOnboarding && (
        <OnboardingModal onClose={() => setShowOnboarding(false)} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
