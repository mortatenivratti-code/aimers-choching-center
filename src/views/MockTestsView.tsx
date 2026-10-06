import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TargetClass, MockTest } from '../types';
import {
  CheckSquare,
  Clock,
  Award,
  BarChart2,
  PlayCircle,
  Filter,
  Flame,
  Search,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const MockTestsView: React.FC = () => {
  const {
    mockTests,
    selectedClass,
    setSelectedClass,
    startTest
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  const classes: TargetClass[] = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

  const categories = [
    'All',
    'Quick Test',
    'Chapter Test',
    'Subject Test',
    'Revision Test',
    'Full Syllabus Mock Test'
  ];

  const filteredTests = mockTests.filter(test => {
    const matchClass = selectedClass ? test.class === selectedClass : true;
    const matchCat = activeCategory === 'All' || test.category === activeCategory;
    let matchSubject = selectedSubject === 'All';
    if (!matchSubject) {
      const q = selectedSubject.toLowerCase();
      const tSub = test.subject.toLowerCase();
      matchSubject = tSub.includes(q) ||
        (q === 'mathematics' && (tSub.includes('algebra') || tSub.includes('geometry') || tSub.includes('math'))) ||
        (q === 'science' && tSub.includes('science'));
    }
    return matchClass && matchCat && matchSubject;
  });

  const getDifficultyBadge = (level: 'Easy' | 'Medium' | 'Hard') => {
    switch (level) {
      case 'Easy':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            Easy
          </span>
        );
      case 'Medium':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
            Medium
          </span>
        );
      case 'Hard':
      default:
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-900">
            Hard
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            Online Examination Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
            Comprehensive Mock Test System
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Instant evaluation, step-by-step solutions, detailed topic breakdown, and authentic exam room simulator for Classes 6 to 10.
          </p>
        </div>

        {/* Filter and Category Bar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          {/* Class Selectors */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Select Class:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {classes.map(cls => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
                    selectedClass === cls
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Categories: Quick, Chapter, Subject, Revision, Full Syllabus */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="font-bold text-slate-400 uppercase tracking-wider mr-2">Test Format:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tests Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Available Tests ({filteredTests.length})
            </h3>
            <span className="text-xs text-slate-500">
              Filtered for {selectedClass} • Automatic scorecards generated
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map(test => (
              <div
                key={test.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Top row: Subject, Difficulty */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                        {test.subject} • {test.category}
                      </span>
                      {test.board === 'State Board' && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          MH SSC
                        </span>
                      )}
                    </div>
                    {getDifficultyBadge(test.difficulty)}
                  </div>

                  {/* Test Title */}
                  <h4 className="text-base font-bold text-slate-900 font-heading mb-1.5">
                    {test.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {test.description}
                  </p>

                  {/* Metadata Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs mb-4">
                    <div className="text-center">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Questions</span>
                      <strong className="text-slate-900 font-black">{test.questionsCount} Qs</strong>
                    </div>
                    <div className="text-center border-x border-slate-100">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Duration</span>
                      <strong className="text-slate-900 font-black">{test.durationMinutes} Mins</strong>
                    </div>
                    <div className="text-center">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Marks</span>
                      <strong className="text-slate-900 font-black">{test.totalMarks} M</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                    <span>{test.class} • {test.board}</span>
                    <span>{test.attemptCount} Students Attempted</span>
                  </div>
                </div>

                {/* Primary Action */}
                <div className="pt-2">
                  <button
                    onClick={() => startTest(test)}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    <span>Start Test</span>
                    <PlayCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
