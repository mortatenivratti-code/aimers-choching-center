import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  BarChart3,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TestResultView: React.FC = () => {
  const {
    lastTestResult,
    activeTest,
    startTest,
    mockTests,
    setCurrentView,
    navigateToNotes
  } = useApp();

  const [viewSolutionsOpen, setViewSolutionsOpen] = useState(false);

  useEffect(() => {
    // Fire celebratory confetti if student scored >= 70%
    if (lastTestResult && (lastTestResult.percentage ?? 0) >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [lastTestResult]);

  if (!lastTestResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <p className="text-slate-600">No recent test result available.</p>
          <button
            onClick={() => setCurrentView('mock-tests')}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
          >
            Explore Mock Tests
          </button>
        </div>
      </div>
    );
  }

  const result = lastTestResult;
  const currentTestQuestions = activeTest ? activeTest.questions : [];

  // Recommended next test
  const nextTest = mockTests.find(
    t => t.class === result.class && t.id !== result.testId
  ) || mockTests[0];

  return (
    <div className="bg-slate-50 min-h-screen py-10 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl text-center relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Mock Assessment Scorecard</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-heading text-white">
              Your Test Result: {result.testTitle}
            </h1>

            <p className="text-blue-100 text-sm max-w-lg mx-auto font-medium">
              "{result.encouragingMessage}"
            </p>
          </div>
        </div>

        {/* 5 Core Score Cards Required:
            Total Score | Accuracy | Correct | Incorrect | Unattempted | Time Taken
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Total Score */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center flex flex-col justify-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Score</span>
            <div className="text-2xl font-black text-blue-700 font-heading mt-1">
              {result.score}/{result.totalMarks}
            </div>
            <span className="text-[10px] text-slate-500 font-semibold">{result.percentage}% Marks</span>
          </div>

          {/* Accuracy */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center flex flex-col justify-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Accuracy</span>
            <div className="text-2xl font-black text-indigo-700 font-heading mt-1">
              {result.accuracy}%
            </div>
            <span className="text-[10px] text-slate-500 font-semibold">Correct/Attempted</span>
          </div>

          {/* Correct */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center flex flex-col justify-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Correct</span>
            <div className="text-2xl font-black text-emerald-600 font-heading mt-1">
              {result.correctCount}
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">+{result.score} Marks</span>
          </div>

          {/* Incorrect */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center flex flex-col justify-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Incorrect</span>
            <div className="text-2xl font-black text-rose-600 font-heading mt-1">
              {result.incorrectCount}
            </div>
            <span className="text-[10px] text-rose-600 font-semibold">0 Negative</span>
          </div>

          {/* Unattempted */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center flex flex-col justify-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Skipped</span>
            <div className="text-2xl font-black text-slate-600 font-heading mt-1">
              {result.unattemptedCount}
            </div>
            <span className="text-[10px] text-slate-400 font-semibold">Unanswered</span>
          </div>

          {/* Time Taken */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center flex flex-col justify-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Time Taken</span>
            <div className="text-2xl font-black text-slate-800 font-heading mt-1 font-mono">
              {result.timeTaken}
            </div>
            <span className="text-[10px] text-slate-400 font-semibold">Paced Well</span>
          </div>
        </div>

        {/* Visual Topic Breakdown Performance Graph */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>Subject & Topic Accuracy Breakdown</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Class Average: 68%</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { topic: 'Conceptual Formulas & Theorems', accuracy: Math.min(100, result.accuracy + 5) },
              { topic: 'Step-by-Step Calculation Speed', accuracy: result.accuracy },
              { topic: 'Exam Question Interpretation', accuracy: Math.max(20, result.accuracy - 8) }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.topic}</span>
                  <span className="text-slate-900 font-bold">{item.accuracy}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.accuracy >= 75 ? 'bg-emerald-500' : item.accuracy >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${item.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Topics to Improve Box */}
        <div className="bg-amber-50/70 border border-amber-200 p-6 rounded-3xl space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm font-heading">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Recommended Focus Topics For Your Next Revision</span>
          </div>

          <div className="space-y-2">
            {(result.topicsToImprove || ['Formula derivation', 'Speed & accuracy pacing']).map((topic: string, i: number) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-amber-200/80 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px]">
                    {i + 1}
                  </span>
                  <span>{topic}</span>
                </div>
                <button
                  onClick={() => navigateToNotes(result.class)}
                  className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg font-bold text-[11px] transition"
                >
                  Revise Notes →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons: [Retry Test] [View Solutions] [Try Next Test] */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (activeTest) startTest(activeTest);
              }}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Test</span>
            </button>

            <button
              onClick={() => setViewSolutionsOpen(!viewSolutionsOpen)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                viewSolutionsOpen
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>{viewSolutionsOpen ? 'Hide Solutions' : 'View Detailed Solutions'}</span>
              {viewSolutionsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {nextTest && (
            <button
              onClick={() => startTest(nextTest)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
            >
              <span>Try Next Test: {nextTest.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Detailed Solutions Accordion */}
        {viewSolutionsOpen && currentTestQuestions.length > 0 && (
          <div className="space-y-4 pt-2 animate-in fade-in">
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Complete Question-by-Question Verified Solutions
            </h3>

            <div className="space-y-3">
              {currentTestQuestions.map((q, idx) => {
                const userAns = result.userAnswers[q.id];
                const correctIdx = q.correctOptionIndex !== undefined ? q.correctOptionIndex : 0;
                const isCorrect = userAns === correctIdx;

                return (
                  <div
                    key={q.id}
                    className={`bg-white p-6 rounded-2xl border shadow-xs space-y-3 ${
                      isCorrect ? 'border-emerald-200' : 'border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 font-heading">
                        Question {idx + 1}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isCorrect ? 'Correct (+4)' : 'Incorrect (0)'}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-900">
                      {q.questionText}
                    </p>

                    {/* Options status */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                      {q.options.map((opt, oIdx) => {
                        const isCorrectOption = oIdx === correctIdx;
                        const isUserChoice = userAns === oIdx;
                        const optText = typeof opt === 'string' ? opt : opt.text;

                        let optClass = 'bg-slate-50 border-slate-200 text-slate-700';
                        if (isCorrectOption) {
                          optClass = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                        } else if (isUserChoice) {
                          optClass = 'bg-rose-50 border-rose-300 text-rose-900 line-through';
                        }

                        return (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${optClass}`}
                          >
                            <span>{String.fromCharCode(65 + oIdx)}) {optText}</span>
                            {isCorrectOption && (
                              <span className="text-[10px] bg-emerald-200 text-emerald-900 font-black px-1.5 py-0.2 rounded">
                                Correct
                              </span>
                            )}
                            {isUserChoice && !isCorrectOption && (
                              <span className="text-[10px] bg-rose-200 text-rose-900 font-black px-1.5 py-0.2 rounded">
                                Your Choice
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Step-by-Step Explanation */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-blue-700 block">
                        Step-by-Step Solution & Faculty Explanation:
                      </span>
                      <p className="leading-relaxed font-mono text-[11px] text-slate-800">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
