import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TargetClass } from '../types';
import { CLASS_METADATA } from '../data/initialData';
import {
  BookOpen,
  FileText,
  CheckSquare,
  HelpCircle,
  FileCheck2,
  Award,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  Download,
  Calendar
} from 'lucide-react';

export const ClassDashboardView: React.FC = () => {
  const {
    selectedClass,
    setSelectedClass,
    subjects,
    chapters,
    notes,
    mockTests,
    achievers,
    startTest,
    setReadingNote,
    setIsDoubtModalOpen,
    setIsDemoModalOpen,
    navigateToSyllabus,
    navigateToNotes,
    navigateToTests,
    setCurrentView
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'syllabus' | 'notes' | 'tests' | 'papers' | 'results'
  >('overview');

  const classes: TargetClass[] = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
  const meta = CLASS_METADATA[selectedClass];

  // Filter content by current selected class
  const classSubjects = subjects.filter(s => s.class === selectedClass);
  const classChapters = chapters.filter(c => c.class === selectedClass);
  const classNotes = notes.filter(n => n.class === selectedClass);
  const classTests = mockTests.filter(t => t.class === selectedClass);
  const classAchievers = achievers.filter(a => a.class === selectedClass);

  return (
    <div className="bg-slate-50 min-h-screen py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Class Selection Navigation Pills */}
        <div className="bg-white p-2 sm:p-3 rounded-2xl shadow-xs border border-slate-200">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Switch Target Class
          </div>
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {classes.map(cls => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`py-2.5 sm:py-3 px-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex flex-col items-center justify-center ${
                  selectedClass === cls
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>{cls}</span>
                <span className="text-[10px] font-normal opacity-80 hidden sm:inline">
                  {CLASS_METADATA[cls].tagline.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Hero Class Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{meta.tagline}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-white">
              {selectedClass} Academic Portal
            </h1>

            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              {meta.description}
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-medium text-slate-200">
                {classSubjects.length > 0 ? classSubjects.length : 5} Core Subjects
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-medium text-slate-200">
                {classNotes.length} Curated Notes
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-medium text-slate-200">
                {classTests.length > 0 ? classTests.length : 3} Mock Tests
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-bold">
                CBSE & State Board Aligned
              </span>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow transition"
              >
                Book Free Demo for {selectedClass}
              </button>
              <button
                onClick={() => setIsDoubtModalOpen(true)}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Ask Faculty a Doubt</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation Required:
            → Syllabus
            → Subjects
            → Chapter-wise Notes
            → Important Questions
            → Mock Tests
            → Previous/Practice Papers
            → Results
        */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition ${
              activeTab === 'syllabus'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Syllabus & Chapters
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition ${
              activeTab === 'notes'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Chapter-wise Notes
          </button>
          <button
            onClick={() => setActiveTab('tests')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition ${
              activeTab === 'tests'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Mock Tests
          </button>
          <button
            onClick={() => setActiveTab('papers')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition ${
              activeTab === 'papers'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Important Questions & PYQs
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition ${
              activeTab === 'results'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            {selectedClass} Toppers
          </button>
        </div>

        {/* Tab Content: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Key Focus Highlights */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 font-heading mb-3">
                Key Academic Focus Pillars for {selectedClass}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {meta.keyFocus.map((focus, i) => (
                  <div key={i} className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs font-semibold text-blue-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span>{focus}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subjects in this class */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  Subjects Taught in {selectedClass}
                </h3>
                <button
                  onClick={() => navigateToSyllabus(selectedClass)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>View Complete Syllabus</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {classSubjects.length > 0 ? (
                  classSubjects.map(sub => (
                    <div
                      key={sub.id}
                      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-base font-bold text-slate-900 font-heading">
                            {sub.name}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                            {sub.totalChapters} Ch.
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4">
                          {sub.description}
                        </p>
                      </div>
                      <div className="flex gap-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => navigateToNotes(selectedClass)}
                          className="flex-1 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold text-center transition"
                        >
                          Notes
                        </button>
                        <button
                          onClick={() => navigateToTests(selectedClass)}
                          className="flex-1 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold text-center transition"
                        >
                          Mock Tests
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
                    Subjects for {selectedClass} include Mathematics, Science, English, Social Science and Regional Languages.
                  </div>
                )}
              </div>
            </div>

            {/* Quick Notes for this Class */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  Featured Chapter Notes ({selectedClass})
                </h3>
                <button
                  onClick={() => navigateToNotes(selectedClass)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>View All Notes</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {classNotes.slice(0, 4).map(note => (
                  <div
                    key={note.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {note.subject} • Ch {note.chapterNumber}
                        </span>
                        {note.recommendedForExam && (
                          <span className="text-[10px] bg-amber-100 text-amber-900 font-extrabold px-2 py-0.5 rounded">
                            Exam Recommended
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">
                        {note.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {note.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100">
                      <span className="text-[11px] text-slate-400">
                        {note.pageCount} Pages • {note.fileSize}
                      </span>
                      <button
                        onClick={() => setReadingNote(note)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
                      >
                        Read Online
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: SYLLABUS */}
        {activeTab === 'syllabus' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 font-heading mb-2">
                Detailed {selectedClass} Chapter Blueprint
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                All syllabus chapters with exam marks weightage and direct mock tests.
              </p>

              <div className="space-y-3">
                {classChapters.map(ch => (
                  <div
                    key={ch.id}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                          {ch.subjectName} • Ch {ch.chapterNumber}
                        </span>
                        <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {ch.importantMarksWeightage}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 font-heading">
                        {ch.title}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Topics: {ch.topics.join(' • ')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => navigateToNotes(selectedClass)}
                        className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold transition"
                      >
                        View Notes
                      </button>
                      <button
                        onClick={() => {
                          const test = mockTests.find(t => t.class === selectedClass);
                          if (test) startTest(test);
                          else navigateToTests(selectedClass);
                        }}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
                      >
                        Start Chapter Test
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classNotes.map(note => (
                <div
                  key={note.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {note.subject}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {note.fileSize}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      {note.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      {note.description}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setReadingNote(note)}
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold text-center transition"
                    >
                      Read Online
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: TESTS */}
        {activeTab === 'tests' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {classTests.map(test => (
                <div
                  key={test.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                        {test.category}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {test.attemptCount} Attempts
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 font-heading">
                      {test.title}
                    </h4>
                    <p className="text-xs text-slate-600">
                      {test.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
                      <span><strong>{test.questionsCount}</strong> Questions</span>
                      <span>•</span>
                      <span><strong>{test.durationMinutes}</strong> Minutes</span>
                      <span>•</span>
                      <span><strong>{test.totalMarks}</strong> Marks</span>
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100">
                    <button
                      onClick={() => startTest(test)}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span>Start Mock Test</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: PAPERS */}
        {activeTab === 'papers' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 animate-in fade-in">
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Previous Board Papers & Model Practice Worksheets
            </h3>
            <p className="text-xs text-slate-600">
              Free downloadable PDF practice papers designed according to standard board exam blueprints.
            </p>

            <div className="space-y-3">
              {[
                { title: `${selectedClass} Mathematics Pre-Board Model Paper 2026`, marks: '80 Marks', time: '3 Hours', size: '1.4 MB' },
                { title: `${selectedClass} Science Term 1 Comprehensive Practice Paper`, marks: '80 Marks', time: '3 Hours', size: '1.8 MB' },
                { title: `${selectedClass} 5-Year Solved Board PYQs Compendium`, marks: 'Important Marks Only', time: 'Self-Paced', size: '3.2 MB' }
              ].map((p, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{p.title}</h4>
                    <span className="text-[11px] text-slate-500">
                      {p.marks} • Duration: {p.time} • File: {p.size}
                    </span>
                  </div>
                  <button
                    onClick={() => alert(`Simulating download for ${p.title}`)}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                    <span>Download PDF</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: RESULTS */}
        {activeTab === 'results' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {classAchievers.map(ach => (
                <div
                  key={ach.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition"
                >
                  <img
                    src={ach.photoUrl}
                    alt={ach.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {ach.board}
                      </span>
                      <span className="text-sm font-black text-emerald-600">
                        {ach.score}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 font-heading">
                      {ach.name}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium">
                      {ach.subjectAchievement}
                    </p>
                    {ach.quote && (
                      <p className="text-[11px] text-slate-500 italic pt-2 border-t border-slate-100">
                        "{ach.quote}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
