import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TargetClass, EducationalBoard, MediumOfInstruction, StudyStatus } from '../types';
import {
  BookOpen,
  FileText,
  CheckSquare,
  CheckCircle2,
  Clock,
  Circle,
  Filter,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

export const SyllabusView: React.FC = () => {
  const {
    chapters,
    selectedClass,
    setSelectedClass,
    selectedBoard,
    setSelectedBoard,
    selectedMedium,
    setSelectedMedium,
    updateChapterStatus,
    toggleChapterTopic,
    navigateToNotes,
    navigateToTests,
    startTest,
    mockTests
  } = useApp();

  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  const classes: TargetClass[] = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
  const boards: { id: EducationalBoard; label: string; subLabel: string }[] = [
    { id: 'State Board', label: 'Maharashtra Board', subLabel: 'SSC / Balbharti' },
    { id: 'CBSE', label: 'CBSE Board', subLabel: 'NCERT' },
    { id: 'ICSE', label: 'ICSE Board', subLabel: 'CISCE' }
  ];
  const mediums: MediumOfInstruction[] = ['English', 'Semi-English', 'Marathi'];

  // Subject quick tabs depending on board and class
  const getSubjectOptions = () => {
    if (selectedBoard === 'State Board') {
      if (selectedClass === 'Class 10' || selectedClass === 'Class 9') {
        return [
          'All',
          'Algebra',
          'Geometry',
          'Science Part 1',
          'Science Part 2',
          'History',
          'Geography'
        ];
      }
      return ['All', 'Mathematics', 'Science', 'Social Science'];
    }
    return ['All', 'Mathematics', 'Science', 'English', 'Social Science'];
  };

  // Filter chapters by class and board and subject
  const filteredChapters = chapters.filter(ch => {
    const matchClass = ch.class === selectedClass;
    const matchBoard = !ch.board || ch.board === selectedBoard;
    
    let matchSubject = true;
    if (selectedSubject !== 'All') {
      const q = selectedSubject.toLowerCase();
      const sName = ch.subjectName.toLowerCase();
      if (q === 'algebra') {
        matchSubject = sName.includes('algebra') || sName.includes('part 1');
      } else if (q === 'geometry') {
        matchSubject = sName.includes('geometry') || sName.includes('part 2');
      } else if (q === 'science part 1') {
        matchSubject = sName.includes('science & technology part 1') || sName.includes('science part 1');
      } else if (q === 'science part 2') {
        matchSubject = sName.includes('science & technology part 2') || sName.includes('science part 2');
      } else {
        matchSubject = sName.includes(q);
      }
    }
    return matchClass && matchBoard && matchSubject;
  });

  // Calculate progress
  const completedCount = filteredChapters.filter(c => (c.completionPercentage ?? 0) === 100 || c.studyStatus === 'Completed').length;
  const inProgressCount = filteredChapters.filter(c => ((c.completionPercentage ?? 0) > 0 && (c.completionPercentage ?? 0) < 100) || (c.studyStatus === 'In Progress' && (c.completionPercentage ?? 0) < 100)).length;
  const progressPercent = filteredChapters.length > 0
    ? Math.round(
        filteredChapters.reduce(
          (sum, c) => sum + (c.completionPercentage ?? (c.studyStatus === 'Completed' ? 100 : c.studyStatus === 'In Progress' ? 50 : 0)),
          0
        ) / filteredChapters.length
      )
    : 0;

  const getStatusBadge = (status: StudyStatus) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
            <Clock className="w-3 h-3" />
            In Progress
          </span>
        );
      case 'Not Started':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            <Circle className="w-3 h-3" />
            Not Started
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Title & Context */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            Academic Curriculum & Blueprint
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
            Class-Wise Interactive Syllabus
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Track your progress across every chapter, view topic breakdowns, and jump directly into notes and practice tests.
          </p>
        </div>

        {/* Filter Toolbar Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Customize Syllabus Filters</span>
            </div>
            {selectedBoard === 'State Board' && (
              <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
                Official Maharashtra State Board (Balbharti)
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Class Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                1. Select Class
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {classes.map(cls => (
                  <button
                    key={cls}
                    onClick={() => {
                      setSelectedClass(cls);
                      setSelectedSubject('All');
                    }}
                    className={`py-2 text-xs font-bold rounded-xl transition-all ${
                      selectedClass === cls
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cls.replace('Class ', 'C')}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Board Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                2. Select Examination Board
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {boards.map(b => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setSelectedBoard(b.id);
                      setSelectedSubject('All');
                    }}
                    className={`py-2 px-1 text-center rounded-xl transition-all ${
                      selectedBoard === b.id
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold leading-tight">{b.label}</div>
                    <div className={`text-[10px] leading-tight mt-0.5 ${selectedBoard === b.id ? 'text-indigo-200' : 'text-slate-500'}`}>
                      {b.subLabel}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Medium Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                3. Medium of Instruction
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {mediums.map(m => (
                  <button
                    key={m}
                    onClick={() => setSelectedMedium(m)}
                    className={`py-2 px-1 text-xs font-bold rounded-xl transition-all ${
                      selectedMedium === m
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Subject Tabs */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-2">Subject:</span>
            {getSubjectOptions().map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedSubject === sub
                    ? 'bg-blue-100 text-blue-800 font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Learning Progress Summary Strip */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
              {selectedClass} • {selectedBoard === 'State Board' ? 'Maharashtra State Board (SSC)' : selectedBoard} • {selectedMedium} Medium
            </div>
            <div className="text-xl font-bold font-heading text-white mt-0.5">
              Curriculum Progress: {progressPercent}% Completed
            </div>
            <div className="text-xs text-blue-100 mt-1">
              {completedCount} Completed • {inProgressCount} In Progress • {filteredChapters.length - completedCount - inProgressCount} To Cover
            </div>
          </div>

          <div className="w-full sm:w-64 bg-white/20 h-3 rounded-full overflow-hidden shrink-0">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Chapter List Accordion / Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Chapters & Topic Blueprints ({filteredChapters.length} Chapters)
            </h3>
            <span className="text-xs text-slate-500">
              Click status icon to toggle your study progress
            </span>
          </div>

          {filteredChapters.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-800">No chapters found for this selection</h4>
              <p className="text-xs text-slate-500 mt-1">
                Try switching the subject filter to "All" or select another class/board.
              </p>
              <button
                onClick={() => setSelectedSubject('All')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
              >
                Reset Subject Filter
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredChapters.map(ch => (
                <div
                  key={ch.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  {/* Left: Chapter Details */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md">
                        {ch.subjectName}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        Chapter {ch.chapterNumber}
                      </span>
                      {ch.board === 'State Board' && (
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Maharashtra SSC
                        </span>
                      )}
                      <span className="text-xs font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded border border-amber-200">
                        Weightage: {ch.importantMarksWeightage}
                      </span>
                      {/* Status badge with click to toggle */}
                      <button
                        onClick={() => {
                          const currentStatus: StudyStatus = ch.studyStatus || 'Not Started';
                          const next: Record<StudyStatus, StudyStatus> = {
                            'Not Started': 'In Progress',
                            'In Progress': 'Completed',
                            'Completed': 'Not Started'
                          };
                          updateChapterStatus(ch.id, next[currentStatus]);
                        }}
                        className="cursor-pointer hover:opacity-80 transition"
                        title="Click to toggle status: Not Started -> In Progress -> Completed"
                      >
                        {getStatusBadge(ch.studyStatus || 'Not Started')}
                      </button>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading flex flex-wrap items-baseline gap-2">
                      <span>
                        {selectedMedium === 'Marathi' && ch.titleMarathi ? ch.titleMarathi : ch.title}
                      </span>
                      {ch.titleMarathi && selectedMedium !== 'Marathi' && (
                        <span className="text-xs sm:text-sm font-semibold text-slate-500 font-sans">
                          ({ch.titleMarathi})
                        </span>
                      )}
                      {selectedMedium === 'Marathi' && (
                        <span className="text-xs sm:text-sm font-normal text-slate-500 font-sans">
                          ({ch.title})
                        </span>
                      )}
                    </h3>

                    {/* Description */}
                    {ch.description && (
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {ch.description}
                      </p>
                    )}

                    {/* Topics List & Progress Bar */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-xs text-slate-600 tabular-nums">
                        <span className="font-semibold text-slate-700">
                          Chapter Completion ({ch.completedTopics?.length || 0}/{ch.topics.length} Topics)
                        </span>
                        <span className="font-bold text-blue-700">
                          {ch.completionPercentage ?? 0}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            (ch.completionPercentage ?? 0) === 100
                              ? 'bg-emerald-600'
                              : (ch.completionPercentage ?? 0) > 0
                              ? 'bg-blue-600'
                              : 'bg-slate-300'
                          }`}
                          style={{ width: `${ch.completionPercentage ?? 0}%` }}
                        />
                      </div>
                      <div className="text-xs text-slate-600 pt-1 flex flex-wrap items-center gap-1.5">
                        <span className="font-semibold text-slate-800 mr-1">Core Topics:</span>
                        {ch.topics.map((t, idx) => {
                          const isTopicDone = ch.completedTopics?.includes(t);
                          return (
                            <button
                              key={idx}
                              onClick={() => toggleChapterTopic(ch.id, t)}
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] transition ${
                                isTopicDone
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-medium'
                                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                              }`}
                              title="Click to mark topic completed/incomplete"
                            >
                              <CheckCircle2 className={`w-3 h-3 ${isTopicDone ? 'text-emerald-600' : 'text-slate-300'}`} />
                              <span>{t}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right: 3 Required Action Buttons */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <button
                      onClick={() => navigateToNotes(selectedClass)}
                      className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      <span>View Notes</span>
                    </button>

                    <button
                      onClick={() => navigateToNotes(selectedClass)}
                      className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      <span>Practice Questions</span>
                    </button>

                    <button
                      onClick={() => {
                        const test = mockTests.find(
                          t => t.id === ch.mockTestId || (t.class === selectedClass && t.board === ch.board)
                        ) || mockTests.find(t => t.class === selectedClass);
                        if (test) startTest(test);
                        else navigateToTests(selectedClass);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>Start Chapter Test</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
