import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  RotateCcw,
  Send,
  AlertTriangle,
  X
} from 'lucide-react';

export const TestInterfaceView: React.FC = () => {
  const {
    activeTest,
    activeQuestionIndex,
    setActiveQuestionIndex,
    answers,
    setAnswer,
    markedForReview,
    toggleMarkForReview,
    submitCurrentTest,
    setCurrentView
  } = useApp();

  // If no test is currently active, return home
  if (!activeTest) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 text-center">
        <div className="space-y-4">
          <p className="text-slate-600">No mock test active.</p>
          <button
            onClick={() => setCurrentView('mock-tests')}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
          >
            Go to Mock Tests
          </button>
        </div>
      </div>
    );
  }

  // Timer countdown: start with duration in seconds
  const [secondsRemaining, setSecondsRemaining] = useState(activeTest.durationMinutes * 60);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitCurrentTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const currentQuestion = activeTest.questions[activeQuestionIndex];
  const selectedOptionIndex = answers[currentQuestion.id];
  const isMarked = markedForReview[currentQuestion.id];

  const handleSelectOption = (idx: number) => {
    setAnswer(currentQuestion.id, idx);
  };

  const handleClearResponse = () => {
    setAnswer(currentQuestion.id, -1);
  };

  const handleNext = () => {
    if (activeQuestionIndex < activeTest.questions.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };

  // Palette status calculator:
  // Green: Answered (answers[id] !== undefined && answers[id] !== -1)
  // Purple: Marked for Review (isMarked)
  // Red: Visited but Not Answered
  // Grey: Not visited yet
  const getQuestionPaletteColor = (index: number) => {
    const q = activeTest.questions[index];
    const isAnswered = answers[q.id] !== undefined && answers[q.id] !== -1;
    const isMarkedReview = markedForReview[q.id];

    if (isMarkedReview) return 'bg-purple-600 text-white border-purple-700';
    if (isAnswered) return 'bg-emerald-600 text-white border-emerald-700';
    if (index === activeQuestionIndex) return 'bg-rose-500 text-white border-rose-600';
    if (index < activeQuestionIndex) return 'bg-rose-100 text-rose-800 border-rose-200';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  const answeredCount = Object.values(answers).filter(v => v !== undefined && v !== -1).length;
  const markedCount = Object.values(markedForReview).filter(Boolean).length;
  const unansweredCount = activeTest.questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* 1. Header (Coaching Logo, Test Name, Question count, Timer, Submit button) */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Test Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 font-heading truncate max-w-xs sm:max-w-md">
                {activeTest.title}
              </h2>
              <div className="text-[11px] text-slate-500 flex items-center gap-2">
                <span>{activeTest.class}</span>
                <span>•</span>
                <span className="font-semibold text-blue-600">
                  Question {activeQuestionIndex + 1} of {activeTest.questions.length}
                </span>
              </div>
            </div>
          </div>

          {/* Timer countdown + Submit CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-mono font-black ${
              secondsRemaining < 300
                ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <Clock className="w-4 h-4 text-slate-500" />
              <span>{formatTime(secondsRemaining)} remaining</span>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Test</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Body (Left: Question & Options; Right: Question Palette) */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Question & Controls (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 flex-1">
            
            {/* Top Question Header & Marks */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-extrabold text-xs font-heading">
                Question {activeQuestionIndex + 1}
              </span>
              <div className="text-xs font-semibold text-slate-500 flex items-center gap-3">
                <span className="text-emerald-700 font-bold">+{currentQuestion.marks} Marks</span>
                <span>-0.0 Negative</span>
              </div>
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-heading">
              {currentQuestion.questionText}
            </div>

            {/* Multiple Choice Options (A, B, C, D) */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOptionIndex === idx;
                const letter = String.fromCharCode(65 + idx); // A, B, C, D

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 text-blue-950 font-bold shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl font-mono font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {letter}
                    </div>
                    <span className="text-sm font-medium leading-relaxed">
                      {typeof option === 'string' ? option : option.text}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Bottom Controls Required:
              [Previous] [Save & Next] [Mark for Review] [Clear Response]
          */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={activeQuestionIndex === 0}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={() => toggleMarkForReview(currentQuestion.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                  isMarked
                    ? 'bg-purple-100 border-purple-300 text-purple-800'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isMarked ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClearResponse}
                className="px-3 py-2.5 text-slate-500 hover:text-slate-800 text-xs font-semibold flex items-center gap-1"
                title="Clear selected option"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Response</span>
              </button>

              <button
                onClick={handleNext}
                disabled={activeQuestionIndex === activeTest.questions.length - 1}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
              >
                <span>Save & Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Question Palette (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-heading uppercase tracking-wider">
                Question Palette
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Click any number to jump directly to that question.
              </p>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] pb-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-600" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span>Not Answered ({unansweredCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-600" />
                <span>Marked for Review ({markedCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-200" />
                <span>Not Visited</span>
              </div>
            </div>

            {/* Grid 1 to 20 */}
            <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto p-1">
              {activeTest.questions.map((q, idx) => {
                const colorClass = getQuestionPaletteColor(idx);
                const isCurrent = idx === activeQuestionIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuestionIndex(idx)}
                    className={`h-10 rounded-xl text-xs font-bold border transition-all flex items-center justify-center font-mono relative ${colorClass} ${
                      isCurrent ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Submit Action */}
            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowSubmitModal(true)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition"
              >
                Submit Test & View Results
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Confirmation Modal Before Submission */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Submit Mock Test?
                </h3>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Are you sure you want to finish the test? Once submitted, your answers will be evaluated and your detailed scorecard will be generated.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Questions:</span>
                <strong className="text-slate-900">{activeTest.questions.length}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700 font-semibold">Answered:</span>
                <strong className="text-emerald-700">{answeredCount}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-rose-600 font-semibold">Unanswered:</span>
                <strong className="text-rose-600">{unansweredCount}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700 font-semibold">Marked for Review:</span>
                <strong className="text-purple-700">{markedCount}</strong>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5">
                <span className="text-slate-600">Time Remaining:</span>
                <strong className="text-slate-900 font-mono">{formatTime(secondsRemaining)}</strong>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                Continue Test
              </button>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  submitCurrentTest();
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
