import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CourseLevel, DifficultyRating, VocabularyWord } from '../types';
import {
  Volume2,
  Star,
  RotateCw,
  Search,
  Filter,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
} from 'lucide-react';
import { ttsService } from '../services/ttsService';

export const VocabularyFlashcardsView: React.FC = () => {
  const { vocabulary, rateWord, toggleFavoriteWord, user } = useApp();

  const [selectedLevel, setSelectedLevel] = useState<string>('A1');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'flashcards' | 'list'>('flashcards');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  // Filter vocabulary
  const filteredWords = vocabulary.filter((word) => {
    const matchesLevel = selectedLevel === 'all' || word.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || word.category === selectedCategory;
    const matchesFavorite = !onlyFavorites || word.isFavorite;
    const matchesSearch =
      word.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.translationPt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesCategory && matchesFavorite && matchesSearch;
  });

  const currentWord: VocabularyWord | undefined = filteredWords[currentIndex] || filteredWords[0];

  // Helper for article badge color in Vibrant Palette
  const getArticleColor = (article: string) => {
    switch (article) {
      case 'der':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'die':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'das':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getArticleBorderGlow = (article: string) => {
    switch (article) {
      case 'der':
        return 'border-blue-200 hover:border-blue-400 shadow-blue-50';
      case 'die':
        return 'border-rose-200 hover:border-rose-400 shadow-rose-50';
      case 'das':
        return 'border-emerald-200 hover:border-emerald-400 shadow-emerald-50';
      default:
        return 'border-slate-200 hover:border-slate-300';
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(filteredWords.length - 1);
    }
  };

  const handleRating = (rating: DifficultyRating) => {
    if (currentWord) {
      rateWord(currentWord.id, rating);
      handleNext();
    }
  };

  // Categories list
  const categories = Array.from(new Set(vocabulary.map((w) => w.category)));

  // Stats
  const masteredCount = vocabulary.filter((w) => w.userRating === 'easy').length;
  const learningCount = vocabulary.filter((w) => w.userRating === 'medium').length;
  const hardCount = vocabulary.filter((w) => w.userRating === 'hard').length;

  return (
    <div id="vocabulary_view_container" className="space-y-6 pb-16">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Vocabulário & Flashcards
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Fixação com repetição espaçada, artigos coloridos e pronúncia nativa
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="bg-slate-100 p-1 rounded-2xl border border-slate-200 flex items-center shadow-xs">
            <button
              id="mode_flashcards_btn"
              onClick={() => setViewMode('flashcards')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'flashcards'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Flashcards
            </button>
            <button
              id="mode_list_btn"
              onClick={() => setViewMode('list')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lista Completa
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-[1.5rem] bg-white border-2 border-emerald-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-slate-900">{masteredCount}</div>
            <div className="text-[11px] text-emerald-700 font-bold">Dominadas (Fácil)</div>
          </div>
        </div>

        <div className="p-4 rounded-[1.5rem] bg-white border-2 border-amber-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-slate-900">{learningCount}</div>
            <div className="text-[11px] text-amber-700 font-bold">Em Aprendizado</div>
          </div>
        </div>

        <div className="p-4 rounded-[1.5rem] bg-white border-2 border-rose-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-slate-900">{hardCount}</div>
            <div className="text-[11px] text-rose-700 font-bold">Difíceis (Revisar)</div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="p-4 rounded-[1.75rem] bg-white border-2 border-slate-100 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar em alemão ou português..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-medium"
            />
          </div>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => {
              setSelectedLevel(e.target.value);
              setCurrentIndex(0);
            }}
            className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-blue-500 font-bold cursor-pointer"
          >
            <option value="all">Todos os Níveis</option>
            <option value="A1">Nível A1</option>
            <option value="A2">Nível A2</option>
            <option value="B1">Nível B1</option>
            <option value="B2">Nível B2</option>
            <option value="C1">Nível C1</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentIndex(0);
            }}
            className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-blue-500 font-bold cursor-pointer"
          >
            <option value="all">Todas as Categorias</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Favorites Filter Toggle */}
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`p-2.5 rounded-xl border-2 flex items-center justify-center transition-all cursor-pointer ${
              onlyFavorites
                ? 'bg-amber-50 border-amber-300 text-amber-600 shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
            }`}
            title="Apenas favoritos"
          >
            <Star className={`w-5 h-5 ${onlyFavorites ? 'fill-amber-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* FLASHCARD INTERACTIVE VIEW */}
      {viewMode === 'flashcards' && (
        <div className="max-w-2xl mx-auto space-y-5">
          {currentWord ? (
            <>
              {/* Progress counter */}
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-2">
                <span>
                  Palavra {currentIndex + 1} de {filteredWords.length}
                </span>
                <span className="text-blue-600">{currentWord.category} • {currentWord.level}</span>
              </div>

              {/* 3D Flip Card */}
              <div
                id={`flashcard_${currentWord.id}`}
                onClick={() => setIsFlipped(!isFlipped)}
                className={`min-h-[320px] sm:min-h-[360px] rounded-[2rem] p-6 sm:p-8 bg-white border-2 ${getArticleBorderGlow(
                  currentWord.article
                )} shadow-md flex flex-col justify-between cursor-pointer transition-all duration-300 transform active:scale-[0.99] select-none relative text-slate-800`}
              >
                {/* Top Bar of Card */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {currentWord.article !== 'none' && (
                      <span
                        className={`text-xs font-black uppercase px-3 py-1 rounded-xl border ${getArticleColor(
                          currentWord.article
                        )}`}
                      >
                        {currentWord.article}
                      </span>
                    )}
                    <span className="text-xs font-medium text-slate-400">
                      Clique no cartão para virar ↺
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteWord(currentWord.id);
                      }}
                      className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-amber-500 transition-colors"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          currentWord.isFavorite ? 'text-amber-500 fill-amber-500' : ''
                        }`}
                      />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        ttsService.speakGerman(
                          `${currentWord.article !== 'none' ? currentWord.article : ''} ${currentWord.german}`
                        );
                      }}
                      className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors border border-blue-100 shadow-xs"
                      title="Ouvir pronúncia nativa"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Card Front / Back Content */}
                {!isFlipped ? (
                  <div className="text-center py-6 space-y-4">
                    <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      {currentWord.article !== 'none' && (
                        <span className="opacity-60 mr-2 font-bold">
                          {currentWord.article}
                        </span>
                      )}
                      {currentWord.german}
                    </div>

                    {currentWord.plural && (
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        Plural: <span className="text-slate-800 font-bold">{currentWord.plural}</span>
                      </p>
                    )}

                    <div className="pt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-xs font-bold text-slate-700 border border-slate-200">
                      <RotateCw className="w-3.5 h-3.5 text-blue-600" />
                      <span>Toque para ver a tradução & exemplos</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 space-y-4 animate-in fade-in">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                        Tradução em Português:
                      </span>
                      <div className="text-2xl sm:text-3xl font-black text-blue-600 mt-1">
                        {currentWord.translationPt}
                      </div>
                    </div>

                    {/* Example Sentence */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500">Exemplo prático:</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            ttsService.speakGerman(currentWord.exampleGerman);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900">
                        {currentWord.exampleGerman}
                      </p>
                      <p className="text-xs text-slate-600 italic">
                        {currentWord.examplePt}
                      </p>
                    </div>

                    {currentWord.culturalTip && (
                      <p className="text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-left font-medium">
                        💡 <strong>Dica cultural:</strong> {currentWord.culturalTip}
                      </p>
                    )}
                  </div>
                )}

                {/* Bottom Navigation on Card */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-bold"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-bold"
                  >
                    <span>Próxima</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Spaced Repetition Rating Buttons */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <button
                  id="btn_rate_hard"
                  onClick={() => handleRating('hard')}
                  className="py-3 px-2 rounded-2xl bg-rose-50 hover:bg-rose-100 border-2 border-rose-200 text-rose-800 font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 flex flex-col items-center gap-0.5 cursor-pointer"
                >
                  <span>🔴 Difícil</span>
                  <span className="text-[10px] text-rose-600 font-medium">Revisar logo</span>
                </button>

                <button
                  id="btn_rate_medium"
                  onClick={() => handleRating('medium')}
                  className="py-3 px-2 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 text-amber-900 font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 flex flex-col items-center gap-0.5 cursor-pointer"
                >
                  <span>🟡 Médio</span>
                  <span className="text-[10px] text-amber-700 font-medium">Lembrando</span>
                </button>

                <button
                  id="btn_rate_easy"
                  onClick={() => handleRating('easy')}
                  className="py-3 px-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 text-emerald-900 font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 flex flex-col items-center gap-0.5 cursor-pointer"
                >
                  <span>🟢 Fácil</span>
                  <span className="text-[10px] text-emerald-700 font-medium">Dominado (+5 XP)</span>
                </button>
              </div>
            </>
          ) : (
            <div className="p-12 text-center rounded-[2rem] bg-white border-2 border-slate-100 text-slate-500 shadow-xs">
              Nenhuma palavra encontrada com os filtros selecionados.
            </div>
          )}
        </div>
      )}

      {/* FULL VOCABULARY LIST VIEW */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredWords.map((word) => (
            <div
              key={word.id}
              className={`p-4 rounded-[1.5rem] bg-white border-2 ${getArticleBorderGlow(
                word.article
              )} shadow-xs flex flex-col justify-between space-y-2 hover:shadow-md transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-lg border ${getArticleColor(
                      word.article
                    )}`}
                  >
                    {word.article !== 'none' ? word.article : '—'}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      {word.level}
                    </span>
                    <button
                      onClick={() => toggleFavoriteWord(word.id)}
                      className="text-slate-400 hover:text-amber-500 p-1"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          word.isFavorite ? 'text-amber-500 fill-amber-500' : ''
                        }`}
                      />
                    </button>
                    <button
                      onClick={() =>
                        ttsService.speakGerman(
                          `${word.article !== 'none' ? word.article : ''} ${word.german}`
                        )
                      }
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="font-extrabold text-slate-900 text-base">
                  {word.german}
                </div>
                <div className="text-sm font-bold text-blue-600">
                  {word.translationPt}
                </div>
                {word.plural && (
                  <div className="text-xs text-slate-500 mt-1">
                    Plural: <span className="text-slate-800 font-semibold">{word.plural}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>{word.category}</span>
                <span
                  className={
                    word.userRating === 'easy'
                      ? 'text-emerald-600 font-bold'
                      : word.userRating === 'hard'
                      ? 'text-rose-600 font-bold'
                      : 'text-slate-400'
                  }
                >
                  {word.userRating === 'easy'
                    ? 'Dominado'
                    : word.userRating === 'hard'
                    ? 'Difícil'
                    : 'Aprender'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
