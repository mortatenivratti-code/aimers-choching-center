import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TargetClass, EducationalBoard, StudyStatus, StudyPriority, ChapterItem } from '../types';
import {
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  BookOpen,
  FileText,
  AlertCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckSquare,
  Circle,
  Search,
  Target,
  Bookmark,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Layers
} from 'lucide-react';

export const StudentDashboardView: React.FC = () => {
  const {
    studentProfile,
    chapters,
    selectedClass,
    setSelectedClass,
    selectedBoard,
    setSelectedBoard,
    updateChapterStatus,
    updateChapterProgress,
    toggleChapterTopic,
    updateChapterStudyPlan,
    mockTests,
    notes,
    startTest,
    setReadingNote,
    navigateToSyllabus,
    navigateToNotes,
    navigateToTests,
    showToast
  } = useApp();

  // Local filter states for the Chapter Progress & Study Plan Tracker
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Study Plan' | StudyStatus>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedChapterIds, setExpandedChapterIds] = useState<Record<string, boolean>>({});
  const [editingTargetId, setEditingTargetId] = useState<string | null>(null);

  const classes: TargetClass[] = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
  const boards: { id: EducationalBoard; label: string }[] = [
    { id: 'State Board', label: 'Maharashtra Board (SSC)' },
    { id: 'CBSE', label: 'CBSE (NCERT)' },
    { id: 'ICSE', label: 'ICSE' }
  ];

  // Chapters for the currently selected Class and Board
  const classBoardChapters = useMemo(() => {
    const matched = chapters.filter(
      ch => ch.class === selectedClass && (!ch.board || ch.board === selectedBoard)
    );
    // Fallback if a specific board has no separate chapters for a given class
    if (matched.length === 0) {
      return chapters.filter(ch => ch.class === selectedClass);
    }
    return matched;
  }, [chapters, selectedClass, selectedBoard]);

  // Compute overall syllabus statistics dynamically from classBoardChapters
  const syllabusMetrics = useMemo(() => {
    const totalChapters = classBoardChapters.length;
    if (totalChapters === 0) {
      return {
        totalChapters: 0,
        completedChapters: 0,
        inProgressChapters: 0,
        notStartedChapters: 0,
        overallPercentage: studentProfile.overallProgress || 68,
        totalTopics: 0,
        completedTopics: 0,
        studyPlanCount: 0,
        highPriorityRemaining: 0
      };
    }

    let sumPct = 0;
    let completedChapters = 0;
    let inProgressChapters = 0;
    let notStartedChapters = 0;
    let totalTopics = 0;
    let completedTopics = 0;
    let studyPlanCount = 0;
    let highPriorityRemaining = 0;

    classBoardChapters.forEach(ch => {
      const pct = ch.completionPercentage ?? (ch.studyStatus === 'Completed' ? 100 : ch.studyStatus === 'In Progress' ? 50 : 0);
      sumPct += pct;
      if (pct === 100 || ch.studyStatus === 'Completed') {
        completedChapters++;
      } else if (pct > 0 || ch.studyStatus === 'In Progress') {
        inProgressChapters++;
      } else {
        notStartedChapters++;
      }

      const chTopicsCount = ch.topics.length;
      const chDoneCount = ch.completedTopics ? ch.completedTopics.length : Math.round((pct / 100) * chTopicsCount);
      totalTopics += chTopicsCount;
      completedTopics += chDoneCount;

      if (ch.inStudyPlan) {
        studyPlanCount++;
      }
      if (ch.studyPriority === 'High' && pct < 100) {
        highPriorityRemaining++;
      }
    });

    const overallPercentage = Math.round(sumPct / totalChapters);

    return {
      totalChapters,
      completedChapters,
      inProgressChapters,
      notStartedChapters,
      overallPercentage,
      totalTopics,
      completedTopics,
      studyPlanCount,
      highPriorityRemaining
    };
  }, [classBoardChapters, studentProfile.overallProgress]);

  // Compute subject-wise progress breakdown
  const subjectProgressList = useMemo(() => {
    const map = new Map<
      string,
      {
        subjectName: string;
        totalChapters: number;
        completedChapters: number;
        inProgressChapters: number;
        sumPercentage: number;
        totalTopics: number;
        completedTopics: number;
      }
    >();

    classBoardChapters.forEach(ch => {
      const pct = ch.completionPercentage ?? 0;
      const existing = map.get(ch.subjectName) || {
        subjectName: ch.subjectName,
        totalChapters: 0,
        completedChapters: 0,
        inProgressChapters: 0,
        sumPercentage: 0,
        totalTopics: 0,
        completedTopics: 0
      };

      existing.totalChapters += 1;
      if (pct === 100) existing.completedChapters += 1;
      else if (pct > 0) existing.inProgressChapters += 1;
      existing.sumPercentage += pct;
      existing.totalTopics += ch.topics.length;
      existing.completedTopics += ch.completedTopics ? ch.completedTopics.length : 0;

      map.set(ch.subjectName, existing);
    });

    return Array.from(map.values()).map(item => ({
      ...item,
      percentage: item.totalChapters > 0 ? Math.round(item.sumPercentage / item.totalChapters) : 0
    }));
  }, [classBoardChapters]);

  // Filter chapters for the Chapter Progress Tracker list
  const filteredChapters = useMemo(() => {
    return classBoardChapters.filter(ch => {
      const pct = ch.completionPercentage ?? 0;
      const status: StudyStatus =
        pct === 100 ? 'Completed' : pct > 0 ? 'In Progress' : 'Not Started';

      const matchSubject = selectedSubject === 'All' || ch.subjectName === selectedSubject;

      let matchStatus = true;
      if (statusFilter === 'Study Plan') {
        matchStatus = Boolean(ch.inStudyPlan || status === 'In Progress');
      } else if (statusFilter !== 'All') {
        matchStatus = status === statusFilter;
      }

      let matchQuery = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = ch.title.toLowerCase().includes(q);
        const inMarathi = ch.titleMarathi?.toLowerCase().includes(q) || false;
        const inSubject = ch.subjectName.toLowerCase().includes(q);
        const inTopics = ch.topics.some(t => t.toLowerCase().includes(q));
        matchQuery = inTitle || inMarathi || inSubject || inTopics;
      }

      return matchSubject && matchStatus && matchQuery;
    });
  }, [classBoardChapters, selectedSubject, statusFilter, searchQuery]);

  // Active Study Plan chapters for quick sidebar summary
  const activeStudyPlanChapters = useMemo(() => {
    return classBoardChapters
      .filter(ch => ch.inStudyPlan || (ch.completionPercentage && ch.completionPercentage > 0 && ch.completionPercentage < 100))
      .sort((a, b) => {
        const prioOrder: Record<StudyPriority, number> = { High: 0, Medium: 1, Low: 2 };
        const pA = prioOrder[a.studyPriority || 'Medium'];
        const pB = prioOrder[b.studyPriority || 'Medium'];
        if (pA !== pB) return pA - pB;
        return (b.completionPercentage || 0) - (a.completionPercentage || 0);
      });
  }, [classBoardChapters]);

  const toggleExpandChapter = (chapterId: string) => {
    setExpandedChapterIds(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const handleAutoPrioritizeHighWeightage = () => {
    let addedCount = 0;
    classBoardChapters.forEach(ch => {
      const pct = ch.completionPercentage ?? 0;
      if (pct < 100 && ch.studyPriority === 'High' && !ch.inStudyPlan) {
        updateChapterStudyPlan(ch.id, { inStudyPlan: true, targetDate: ch.targetDate || '20 Oct 2026' });
        addedCount++;
      }
    });
    if (addedCount === 0) {
      showToast('All high-weightage chapters are already in your active Study Plan!', 'info');
    } else {
      showToast(`Added ${addedCount} high-weightage chapters to your active Study Plan!`);
    }
    setStatusFilter('Study Plan');
  };

  const handleOpenChapterNotes = (ch: ChapterItem) => {
    const matchedNote =
      notes.find(
        n =>
          n.class === ch.class &&
          n.chapterNumber === ch.chapterNumber &&
          n.subject.toLowerCase().includes(ch.subjectName.split(' ')[0].toLowerCase())
      ) ||
      notes.find(n => n.class === ch.class) ||
      notes[0];

    if (matchedNote) {
      setReadingNote(matchedNote);
    } else {
      navigateToNotes(ch.class);
    }
  };

  const handleStartChapterTest = (ch: ChapterItem) => {
    const matchedTest =
      mockTests.find(t => t.id === ch.mockTestId) ||
      mockTests.find(t => t.class === ch.class && t.board === ch.board) ||
      mockTests.find(t => t.class === ch.class);

    if (matchedTest) {
      startTest(matchedTest);
    } else {
      navigateToTests(ch.class);
    }
  };

  const getProgressBarColor = (pct: number) => {
    if (pct === 100) return 'bg-emerald-600';
    if (pct >= 50) return 'bg-blue-600';
    if (pct > 0) return 'bg-amber-500';
    return 'bg-slate-300';
  };

  const getStatusIndicator = (pct: number) => {
    if (pct === 100) {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 whitespace-nowrap">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Completed</span>
        </span>
      );
    }
    if (pct > 0) {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 whitespace-nowrap">
          <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>In Progress</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 whitespace-nowrap">
        <Circle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>Not Started</span>
      </span>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Student Greeting & Curriculum Switcher Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-blue-200 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Academic Year 2026–27</span>
              <span aria-hidden="true">·</span>
              <span>{selectedBoard === 'State Board' ? 'Maharashtra State Board (SSC / Balbharti)' : `${selectedBoard} Curriculum`}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedClass}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
              Good Morning, {studentProfile.name}
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
              Track your chapter-by-chapter completion percentages, check off completed topics, and organize your personalized board exam study plan.
            </p>
          </div>

          {/* Right Controls: Study Streak + Class/Board Selector */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="bg-white/10 border border-white/15 rounded-xl p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm shrink-0 tabular-nums">
                {studentProfile.streakDays}d
              </div>
              <div>
                <div className="text-[11px] text-blue-200 font-medium">Study Streak</div>
                <div className="text-sm font-bold text-white tabular-nums whitespace-nowrap">
                  {studentProfile.streakDays} Days Active
                </div>
              </div>
            </div>

            {/* Interactive Class & Board Switcher for Study Plan */}
            <div className="bg-white/10 border border-white/15 rounded-xl p-3 space-y-2">
              <div className="text-[11px] text-blue-200 font-medium">Active Study Plan Curriculum</div>
              <div className="flex items-center gap-2">
                <select
                  aria-label="Select Class"
                  value={selectedClass}
                  onChange={e => {
                    setSelectedClass(e.target.value as TargetClass);
                    setSelectedSubject('All');
                  }}
                  className="bg-slate-900/90 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {classes.map(cls => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Select Board"
                  value={selectedBoard}
                  onChange={e => {
                    setSelectedBoard(e.target.value as EducationalBoard);
                    setSelectedSubject('All');
                  }}
                  className="bg-slate-900/90 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {boards.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Overall Syllabus Progress */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Overall Syllabus Completion</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <div className="text-2xl font-bold text-slate-900 font-heading tabular-nums">
                {syllabusMetrics.overallPercentage}%
              </div>
              <span className="text-xs text-emerald-700 font-medium tabular-nums">
                {syllabusMetrics.completedChapters}/{syllabusMetrics.totalChapters} Chapters Done
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${syllabusMetrics.overallPercentage}%` }}
              />
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-2 tabular-nums">
              <span>{syllabusMetrics.completedChapters} Completed</span>
              <span aria-hidden="true">·</span>
              <span>{syllabusMetrics.inProgressChapters} In Progress</span>
              <span aria-hidden="true">·</span>
              <span>{syllabusMetrics.notStartedChapters} Remaining</span>
            </div>
          </div>

          {/* Card 2: Topic Mastery & Study Plan */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Topics Mastered</span>
              <Target className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <div className="text-2xl font-bold text-slate-900 font-heading tabular-nums">
                {syllabusMetrics.completedTopics} / {syllabusMetrics.totalTopics}
              </div>
              <span className="text-xs text-blue-700 font-medium tabular-nums">
                {syllabusMetrics.totalTopics > 0
                  ? Math.round((syllabusMetrics.completedTopics / syllabusMetrics.totalTopics) * 100)
                  : 0}% Topics
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${
                    syllabusMetrics.totalTopics > 0
                      ? Math.round((syllabusMetrics.completedTopics / syllabusMetrics.totalTopics) * 100)
                      : 0
                  }%`
                }}
              />
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-2 tabular-nums">
              <span>{syllabusMetrics.studyPlanCount} Pinned in Study Plan</span>
              <span aria-hidden="true">·</span>
              <span>{syllabusMetrics.highPriorityRemaining} High Priority Left</span>
            </div>
          </div>

          {/* Card 3: Mock Tests Attempted */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Mock Tests Attempted</span>
              <Clock className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-heading mt-2 tabular-nums">
              {studentProfile.testsAttempted} Tests
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-3">
              <span>100% On-Time Submission</span>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => navigateToTests(selectedClass)}
                className="text-blue-600 hover:underline font-semibold"
              >
                Take Test
              </button>
            </div>
          </div>

          {/* Card 4: Average Score */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Average Test Score</span>
              <TrendingUp className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-heading mt-2 tabular-nums">
              {studentProfile.averageScore}%
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium mt-3">
              <span>Consistent Board Readiness</span>
              <span aria-hidden="true">·</span>
              <span>Top 10%</span>
            </div>
          </div>
        </div>

        {/* Subject-Wise Completion Breakdown Bar Grid */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                Subject-Wise Syllabus Completion ({selectedClass} · {selectedBoard === 'State Board' ? 'Maharashtra SSC' : selectedBoard})
              </h2>
              <p className="text-xs text-slate-500">
                Click any subject below to filter the chapter-by-chapter study plan tracker.
              </p>
            </div>
            {selectedSubject !== 'All' && (
              <button
                onClick={() => setSelectedSubject('All')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 self-start sm:self-auto whitespace-nowrap"
              >
                Show All Subjects ({classBoardChapters.length} Chapters)
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjectProgressList.map(sub => {
              const isSelected = selectedSubject === sub.subjectName;
              return (
                <button
                  key={sub.subjectName}
                  onClick={() => setSelectedSubject(isSelected ? 'All' : sub.subjectName)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/15'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                      {sub.subjectName}
                    </span>
                    <span className="text-sm font-bold text-blue-700 font-heading tabular-nums shrink-0">
                      {sub.percentage}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-200/80 h-2 rounded-full my-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${getProgressBarColor(sub.percentage)}`}
                      style={{ width: `${sub.percentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 tabular-nums">
                    <span>
                      {sub.completedChapters}/{sub.totalChapters} Chapters Done
                    </span>
                    <span>
                      {sub.completedTopics}/{sub.totalTopics} Topics
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Dashboard 12-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left 8 Columns: Interactive Chapter Progress Tracker + Continue Learning + Recent Results */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Interactive Syllabus Chapter Progress & Study Plan Tracker */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-600" />
                    <span>Syllabus Chapter Progress & Study Plan Tracker</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Update chapter completion percentages, check off individual topics, or pin chapters to your weekly study plan.
                  </p>
                </div>

                <button
                  onClick={() => navigateToSyllabus(selectedClass)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition whitespace-nowrap self-start sm:self-auto"
                >
                  Open Full Syllabus View
                </button>
              </div>

              {/* Filter Bar: Status Segmented Control + Search Input */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {/* Segmented Status Filter Tabs */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
                  {(
                    [
                      { id: 'All', label: `All (${classBoardChapters.length})` },
                      { id: 'Study Plan', label: `Study Plan (${activeStudyPlanChapters.length})` },
                      { id: 'In Progress', label: `In Progress (${syllabusMetrics.inProgressChapters})` },
                      { id: 'Not Started', label: `Not Started (${syllabusMetrics.notStartedChapters})` },
                      { id: 'Completed', label: `Completed (${syllabusMetrics.completedChapters})` }
                    ] as const
                  ).map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setStatusFilter(tab.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                        statusFilter === tab.id
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative min-w-[200px]">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search chapter or topic..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Subject Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <span className="text-xs font-medium text-slate-500 mr-1 shrink-0">Subject:</span>
                <button
                  onClick={() => setSelectedSubject('All')}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition whitespace-nowrap shrink-0 ${
                    selectedSubject === 'All'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Subjects
                </button>
                {subjectProgressList.map(sub => (
                  <button
                    key={sub.subjectName}
                    onClick={() => setSelectedSubject(sub.subjectName)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition whitespace-nowrap shrink-0 tabular-nums ${
                      selectedSubject === sub.subjectName
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {sub.subjectName} ({sub.percentage}%)
                  </button>
                ))}
              </div>

              {/* Chapter Progress List */}
              {filteredChapters.length === 0 ? (
                <div className="p-10 text-center border border-dashed border-slate-200 rounded-xl space-y-2">
                  <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
                  <div className="text-sm font-semibold text-slate-800">
                    No chapters match your current filter
                  </div>
                  <p className="text-xs text-slate-500">
                    Try clearing your search query or switching to "All" chapters.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedSubject('All');
                      setStatusFilter('All');
                      setSearchQuery('');
                    }}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                  {filteredChapters.map(ch => {
                    const pct = ch.completionPercentage ?? 0;
                    const doneTopics = ch.completedTopics || [];
                    const isExpanded = Boolean(expandedChapterIds[ch.id]);
                    const priority: StudyPriority = ch.studyPriority || 'Medium';

                    return (
                      <div key={ch.id} className="p-4 sm:p-5 bg-white hover:bg-slate-50/60 transition-colors space-y-3">
                        {/* Top Row: Metadata + Pin to Study Plan + Status & Percentage */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="space-y-1 flex-1">
                            {/* Clean unboxed metadata line */}
                            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                              <span className="font-semibold text-blue-700">{ch.subjectName}</span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono tabular-nums">Chapter {String(ch.chapterNumber).padStart(2, '0')}</span>
                              <span aria-hidden="true">·</span>
                              <span>Weightage: {ch.importantMarksWeightage}</span>
                              {ch.targetDate && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span className="text-amber-700 font-medium">Target: {ch.targetDate}</span>
                                </>
                              )}
                            </div>

                            {/* Chapter Title */}
                            <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
                              {ch.title}
                              {ch.titleMarathi && (
                                <span className="text-xs font-normal text-slate-500 ml-2">
                                  ({ch.titleMarathi})
                                </span>
                              )}
                            </h3>
                          </div>

                          {/* Right Status & Completion Percentage Readout */}
                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                            {getStatusIndicator(pct)}
                            <span className="text-lg font-bold text-slate-900 font-heading tabular-nums min-w-[3.2rem] text-right">
                              {pct}%
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar + Topic Count Summary */}
                        <div className="space-y-1.5">
                          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${getProgressBarColor(pct)}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                            <span className="tabular-nums">
                              {doneTopics.length} of {ch.topics.length} core topics completed
                            </span>

                            {/* Quick Percentage Stepper Controls */}
                            <div className="flex items-center gap-1">
                              <span className="text-[11px] text-slate-400 mr-1">Set progress:</span>
                              {[0, 25, 50, 75, 100].map(step => (
                                <button
                                  key={step}
                                  onClick={() => updateChapterProgress(ch.id, step)}
                                  className={`px-2 py-0.5 rounded text-[11px] font-semibold tabular-nums transition whitespace-nowrap ${
                                    pct === step
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                  }`}
                                >
                                  {step}%
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Interactive Action & Study Plan Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Expand / Collapse Topic Checklist */}
                            <button
                              onClick={() => toggleExpandChapter(ch.id)}
                              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition flex items-center gap-1 whitespace-nowrap"
                            >
                              <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                              <span>
                                {isExpanded ? 'Hide Topics' : `Manage Topics (${doneTopics.length}/${ch.topics.length})`}
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>

                            {/* Pin/Unpin to Study Plan */}
                            <button
                              onClick={() =>
                                updateChapterStudyPlan(ch.id, {
                                  inStudyPlan: !ch.inStudyPlan,
                                  targetDate: !ch.inStudyPlan && !ch.targetDate ? '20 Oct 2026' : ch.targetDate
                                })
                              }
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 whitespace-nowrap ${
                                ch.inStudyPlan
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                              }`}
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                              <span>{ch.inStudyPlan ? 'In Study Plan' : '+ Study Plan'}</span>
                            </button>

                            {/* Priority Selector */}
                            <select
                              aria-label={`Study Priority for ${ch.title}`}
                              value={priority}
                              onChange={e =>
                                updateChapterStudyPlan(ch.id, {
                                  studyPriority: e.target.value as StudyPriority
                                })
                              }
                              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold focus:outline-none cursor-pointer"
                            >
                              <option value="High">Priority: High</option>
                              <option value="Medium">Priority: Medium</option>
                              <option value="Low">Priority: Low</option>
                            </select>
                          </div>

                          {/* Direct Study Resource Links */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenChapterNotes(ch)}
                              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition flex items-center gap-1 whitespace-nowrap"
                            >
                              <FileText className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Notes</span>
                            </button>
                            <button
                              onClick={() => handleStartChapterTest(ch)}
                              className="px-2.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition flex items-center gap-1 whitespace-nowrap"
                            >
                              <span>Chapter Test</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Expandable Topic-by-Topic Checklist & Custom Percentage Slider */}
                        {isExpanded && (
                          <div className="pt-3 mt-2 border-t border-slate-100 space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span className="text-xs font-semibold text-slate-700">
                                Check off completed topics to automatically calculate chapter completion:
                              </span>

                              {/* Fine-grained Slider Control */}
                              <div className="flex items-center gap-2">
                                <label
                                  htmlFor={`slider-${ch.id}`}
                                  className="text-xs text-slate-500 font-medium whitespace-nowrap tabular-nums"
                                >
                                  Custom Progress: {pct}%
                                </label>
                                <input
                                  id={`slider-${ch.id}`}
                                  type="range"
                                  min={0}
                                  max={100}
                                  step={5}
                                  value={pct}
                                  onChange={e => updateChapterProgress(ch.id, Number(e.target.value))}
                                  className="w-28 accent-blue-600 cursor-pointer"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {ch.topics.map(topic => {
                                const isChecked = doneTopics.includes(topic);
                                return (
                                  <button
                                    key={topic}
                                    onClick={() => toggleChapterTopic(ch.id, topic)}
                                    className={`p-2.5 rounded-lg border text-left text-xs font-medium transition flex items-start gap-2 ${
                                      isChecked
                                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => {}}
                                      className="mt-0.5 rounded text-emerald-600 focus:ring-0 cursor-pointer"
                                    />
                                    <span className={isChecked ? 'line-through text-slate-500' : ''}>
                                      {topic}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Target Date Setter */}
                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                              <div className="flex items-center gap-2">
                                <span className="text-slate-500 font-medium">Target Completion Milestone:</span>
                                {editingTargetId === ch.id ? (
                                  <div className="flex items-center gap-1.5">
                                    {['This Weekend', '15 Oct 2026', '25 Oct 2026', '05 Nov 2026'].map(dateOpt => (
                                      <button
                                        key={dateOpt}
                                        onClick={() => {
                                          updateChapterStudyPlan(ch.id, { targetDate: dateOpt, inStudyPlan: true });
                                          setEditingTargetId(null);
                                        }}
                                        className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded font-medium"
                                      >
                                        {dateOpt}
                                      </button>
                                    ))}
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => setEditingTargetId(ch.id)}
                                    className="text-blue-600 hover:underline font-semibold"
                                  >
                                    {ch.targetDate ? `${ch.targetDate} (Change)` : 'Set Target Date'}
                                  </button>
                                )}
                              </div>

                              <button
                                onClick={() =>
                                  updateChapterStatus(ch.id, pct === 100 ? 'Not Started' : 'Completed')
                                }
                                className="text-xs font-semibold text-emerald-700 hover:underline"
                              >
                                {pct === 100 ? 'Reset Chapter to 0%' : 'Mark Entire Chapter 100% Completed'}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Continue Learning Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-blue-700">
                  Continue Learning
                </span>
                <span className="text-xs text-slate-400 font-mono">Last active session</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 font-heading">
                {studentProfile.lastOpenedChapter?.subject || 'Science'}: {studentProfile.lastOpenedChapter?.title || 'Light - Reflection & Refraction'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Resume your chapter revision notes or test your understanding with a chapter quiz.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => {
                    const sampleNote = notes.find(n => n.class === selectedClass) || notes[0];
                    if (sampleNote) setReadingNote(sampleNote);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Resume Chapter Notes</span>
                </button>

                <button
                  onClick={() => navigateToSyllabus(selectedClass)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition whitespace-nowrap"
                >
                  View Full Syllabus
                </button>
              </div>
            </div>

            {/* Recent Test Results */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Recent Test Results
                </h3>
                <button
                  onClick={() => navigateToTests(selectedClass)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  View All Tests
                </button>
              </div>

              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                {studentProfile.recentResults.map(r => (
                  <div
                    key={r.id}
                    className="p-4 bg-white flex items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{r.testTitle}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span>{r.subject}</span>
                        <span aria-hidden="true">·</span>
                        <span>{r.date}</span>
                      </div>
                    </div>
                    <div className="text-right tabular-nums shrink-0">
                      <div className="text-base font-bold text-blue-700 font-heading">
                        {r.score}/{r.total}
                      </div>
                      <span className="text-xs text-emerald-700 font-medium">
                        {r.percentage}% Accuracy
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right 4 Columns: Active Study Plan Pacing + Upcoming Tests + Weak Topics + Recommended Notes + Badges */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Study Plan Pacing & Priority Queue */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                  <span>My Study Plan Queue</span>
                </h3>
                <span className="text-xs font-semibold text-slate-500 tabular-nums">
                  {activeStudyPlanChapters.length} Active
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Chapters currently in progress or pinned to your study schedule, ordered by exam weightage priority.
              </p>

              {activeStudyPlanChapters.length === 0 ? (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
                  <p className="text-xs text-slate-600">
                    No chapters pinned to your active study plan yet.
                  </p>
                  <button
                    onClick={handleAutoPrioritizeHighWeightage}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg"
                  >
                    Auto-Build High Weightage Plan
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                  {activeStudyPlanChapters.slice(0, 6).map(ch => {
                    const pct = ch.completionPercentage ?? 0;
                    return (
                      <div key={ch.id} className="p-3.5 bg-white space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                              <span className="font-semibold text-blue-700">{ch.subjectName}</span>
                              <span aria-hidden="true">·</span>
                              <span>Priority: {ch.studyPriority || 'Medium'}</span>
                            </div>
                            <div className="text-xs font-bold text-slate-900 mt-0.5 line-clamp-1">
                              Ch {ch.chapterNumber}: {ch.title}
                            </div>
                          </div>
                          <span className="text-xs font-bold text-slate-900 tabular-nums shrink-0">
                            {pct}%
                          </span>
                        </div>

                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${getProgressBarColor(pct)}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>{ch.targetDate ? `Target: ${ch.targetDate}` : `Weightage: ${ch.importantMarksWeightage}`}</span>
                          <button
                            onClick={() =>
                              updateChapterProgress(ch.id, Math.min(100, pct + 25))
                            }
                            className="text-blue-600 hover:underline font-semibold tabular-nums"
                          >
                            {pct < 100 ? '+25% Progress' : 'Completed'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <button
                onClick={handleAutoPrioritizeHighWeightage}
                className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition"
              >
                Auto-Prioritize High Weightage Chapters
              </button>
            </div>

            {/* Upcoming Scheduled Tests */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Upcoming Tests</span>
              </h3>

              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                {(studentProfile.upcomingTests || [
                  { id: 'up-1', title: 'Triangles Board Pattern Test', subject: 'Mathematics', date: 'Tomorrow, 5 PM', duration: '45 Mins' }
                ]).map(t => (
                  <div key={t.id} className="p-3.5 bg-white space-y-1">
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span className="font-semibold text-blue-700">{t.subject}</span>
                      <span className="tabular-nums">{t.date}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900">{t.title}</div>
                    <div className="text-[11px] text-slate-500 tabular-nums">Duration: {t.duration}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Topics Focus Flag */}
            <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-base font-heading">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Identified Weak Topics</span>
              </div>
              <p className="text-xs text-amber-900/80">
                Recommended for targeted revision based on your recent mock test answers:
              </p>

              <div className="divide-y divide-amber-200/70 border border-amber-200 rounded-xl overflow-hidden bg-white">
                {studentProfile.weakTopics.map((w, i) => (
                  <div key={i} className="p-3 text-xs font-semibold text-slate-800 flex items-center justify-between">
                    <span>{w}</span>
                    <button
                      onClick={() => navigateToNotes(selectedClass)}
                      className="text-xs font-semibold text-blue-700 hover:underline"
                    >
                      Practice
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Study Notes */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Recommended Notes
                </h3>
                <button
                  onClick={() => navigateToNotes(selectedClass)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Library
                </button>
              </div>

              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                {notes
                  .filter(n => n.class === selectedClass)
                  .slice(0, 2)
                  .map(n => (
                    <div key={n.id} className="p-3.5 bg-white space-y-1.5">
                      <div className="text-xs font-semibold text-blue-700">{n.subject}</div>
                      <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{n.description}</p>
                      <button
                        onClick={() => setReadingNote(n)}
                        className="pt-1 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <span>Read Online</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Student Achievements & Badges */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Earned Milestones</span>
              </h3>

              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                {(studentProfile.badges || ['Consistency Champion', 'Centum Seeker']).map((b, i) => (
                  <div key={i} className="p-3 bg-white flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{b}</span>
                    <span className="text-emerald-700 font-medium">Unlocked</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
