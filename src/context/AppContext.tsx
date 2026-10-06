import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase';
import { supabase } from '../lib/supabase';
import { sanitizeInputText, safeParseStorage } from '../utils/security';
import {
  TargetClass,
  EducationalBoard,
  MediumOfInstruction,
  StudyStatus,
  StudyPriority,
  SubjectItem,
  ChapterItem,
  NoteItem,
  MockTest,
  TestSubmissionResult,
  AchieverStudent,
  TestimonialItem,
  StatItem,
  EnquiryItem,
  StudentProfile
} from '../types';
import {
  INITIAL_STATS,
  INITIAL_SUBJECTS,
  INITIAL_CHAPTERS,
  INITIAL_NOTES,
  INITIAL_MOCK_TESTS,
  INITIAL_ACHIEVERS,
  INITIAL_TESTIMONIALS,
  INITIAL_ENQUIRIES
} from '../data/initialData';

export type AppView =
  | 'home'
  | 'class-dashboard'
  | 'syllabus'
  | 'notes'
  | 'mock-tests'
  | 'test-interface'
  | 'test-result'
  | 'results-gallery'
  | 'student-dashboard'
  | 'admin-cms'
  | 'about'
  | 'contact';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  message: string;
}

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedClass: TargetClass;
  setSelectedClass: (cls: TargetClass) => void;
  selectedBoard: EducationalBoard;
  setSelectedBoard: (board: EducationalBoard) => void;
  selectedMedium: MediumOfInstruction;
  setSelectedMedium: (medium: MediumOfInstruction) => void;

  // Data
  stats: StatItem[];
  updateStat: (id: string, value: string, subtext: string) => void;
  updateStats: (newStats: StatItem[]) => void;
  subjects: SubjectItem[];
  chapters: ChapterItem[];
  updateChapterStatus: (chapterId: string, status: StudyStatus) => void;
  updateChapterProgress: (chapterId: string, percentage: number) => void;
  toggleChapterTopic: (chapterId: string, topic: string) => void;
  updateChapterStudyPlan: (
    chapterId: string,
    updates: { inStudyPlan?: boolean; studyPriority?: StudyPriority; targetDate?: string }
  ) => void;
  notes: NoteItem[];
  addNote: (note: NoteItem) => void;
  deleteNote: (id: string) => void;
  mockTests: MockTest[];
  addMockTest: (test: MockTest) => void;
  achievers: AchieverStudent[];
  addAchiever: (achiever: AchieverStudent) => void;
  deleteAchiever: (id: string) => void;
  updateAchievers: (achievers: AchieverStudent[]) => void;
  testimonials: TestimonialItem[];
  enquiries: EnquiryItem[];
  addEnquiry: (enquiry: Omit<EnquiryItem, 'id' | 'dateSubmitted' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: EnquiryItem['status']) => void;

  // Active testing states & interface
  activeTest: MockTest | null;
  activeQuestionIndex: number;
  setActiveQuestionIndex: (idx: number) => void;
  answers: Record<string, number>;
  setAnswer: (questionId: string, optionIndex: number) => void;
  markedForReview: Record<string, boolean>;
  toggleMarkForReview: (questionId: string) => void;
  startTest: (test: MockTest) => void;
  exitTest: () => void;
  submitCurrentTest: () => void;
  activeResult: TestSubmissionResult | null;
  lastTestResult: TestSubmissionResult | null;
  submitTest: (result: TestSubmissionResult) => void;

  // Reader & Modals
  readingNote: NoteItem | null;
  setReadingNote: (note: NoteItem | null) => void;
  isDemoModalOpen: boolean;
  setIsDemoModalOpen: (open: boolean) => void;
  isDoubtModalOpen: boolean;
  setIsDoubtModalOpen: (open: boolean) => void;
  isMarketingKitModalOpen: boolean;
  setIsMarketingKitModalOpen: (open: boolean) => void;

  // Student Profile & Auth
  studentProfile: StudentProfile;
  toggleBookmarkNote: (noteId: string) => void;
  authUser: FirebaseUser | null;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  syncAllToSupabase: () => Promise<void>;

  // Toast
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;

  // Navigation helpers
  navigateToClass: (cls: TargetClass) => void;
  navigateToNotes: (cls?: TargetClass, subject?: string) => void;
  navigateToSyllabus: (cls?: TargetClass) => void;
  navigateToTests: (cls?: TargetClass) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const hydrateChaptersWithProgress = (list: ChapterItem[]): ChapterItem[] => {
  return list.map(ch => {
    if (ch.completionPercentage !== undefined && ch.studyStatus !== undefined && ch.completedTopics !== undefined) {
      return ch;
    }

    const totalTopics = ch.topics.length || 1;
    let pct = ch.completionPercentage;
    let status: StudyStatus = ch.studyStatus || 'Not Started';
    let completedTopics: string[] = ch.completedTopics || [];
    let inStudyPlan = ch.inStudyPlan;
    let studyPriority: StudyPriority = ch.studyPriority || 'Medium';
    let targetDate = ch.targetDate;

    // Parse weightage number for smart default priority
    const weightMatch = ch.importantMarksWeightage?.match(/\d+/);
    const weightNum = weightMatch ? parseInt(weightMatch[0], 10) : 5;
    if (!ch.studyPriority) {
      studyPriority = weightNum >= 7 ? 'High' : weightNum >= 5 ? 'Medium' : 'Low';
    }

    if (pct === undefined) {
      if (ch.studyStatus === 'Completed') {
        pct = 100;
        completedTopics = [...ch.topics];
      } else if (ch.studyStatus === 'In Progress') {
        const halfCount = Math.max(1, Math.ceil(totalTopics / 2));
        completedTopics = ch.topics.slice(0, halfCount);
        pct = Math.round((completedTopics.length / totalTopics) * 100);
        inStudyPlan = inStudyPlan ?? true;
      } else {
        // Seed realistic progress based on chapter number so student has an active study plan
        if (ch.chapterNumber === 1) {
          status = 'Completed';
          pct = 100;
          completedTopics = [...ch.topics];
          inStudyPlan = inStudyPlan ?? false;
        } else if (ch.chapterNumber === 2) {
          status = 'In Progress';
          const count = Math.max(1, totalTopics - 1);
          completedTopics = ch.topics.slice(0, count);
          pct = Math.round((completedTopics.length / totalTopics) * 100);
          inStudyPlan = inStudyPlan ?? true;
          targetDate = targetDate || '12 Oct 2026';
        } else if (ch.chapterNumber === 3) {
          status = 'In Progress';
          const count = Math.max(1, Math.floor(totalTopics / 2));
          completedTopics = ch.topics.slice(0, count);
          pct = Math.round((completedTopics.length / totalTopics) * 100);
          inStudyPlan = inStudyPlan ?? true;
          targetDate = targetDate || '18 Oct 2026';
        } else if (ch.chapterNumber === 4) {
          status = 'In Progress';
          completedTopics = ch.topics.slice(0, 1);
          pct = Math.round((completedTopics.length / totalTopics) * 100);
          inStudyPlan = inStudyPlan ?? true;
          targetDate = targetDate || '25 Oct 2026';
        } else {
          status = 'Not Started';
          pct = 0;
          completedTopics = [];
          inStudyPlan = inStudyPlan ?? (ch.chapterNumber === 5);
          if (ch.chapterNumber === 5) {
            targetDate = targetDate || '02 Nov 2026';
          }
        }
      }
    }

    return {
      ...ch,
      studyStatus: status,
      completionPercentage: pct,
      completedTopics,
      inStudyPlan: inStudyPlan ?? false,
      studyPriority,
      targetDate
    };
  });
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedClass, setSelectedClass] = useState<TargetClass>('Class 10');
  const [selectedBoard, setSelectedBoard] = useState<EducationalBoard>('State Board');
  const [selectedMedium, setSelectedMedium] = useState<MediumOfInstruction>('English');

  // Persistence loaded states
  const [stats, setStats] = useState<StatItem[]>(() =>
    safeParseStorage('vidyasetu_stats', INITIAL_STATS, Array.isArray)
  );

  const [subjects] = useState<SubjectItem[]>(INITIAL_SUBJECTS);
  const [chapters, setChapters] = useState<ChapterItem[]>(() => {
    const saved = localStorage.getItem('vidyasetu_chapters');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasMh = Array.isArray(parsed) && parsed.some((c: ChapterItem) => c.id && c.id.startsWith('mh-'));
        if (hasMh) {
          const hydrated = hydrateChaptersWithProgress(parsed);
          localStorage.setItem('vidyasetu_chapters', JSON.stringify(hydrated));
          return hydrated;
        }
        const merged = [...INITIAL_CHAPTERS];
        if (Array.isArray(parsed)) {
          parsed.forEach((p: ChapterItem) => {
            if (!merged.some(m => m.id === p.id)) {
              merged.push(p);
            }
          });
        }
        const hydrated = hydrateChaptersWithProgress(merged);
        localStorage.setItem('vidyasetu_chapters', JSON.stringify(hydrated));
        return hydrated;
      } catch (e) {
        return hydrateChaptersWithProgress(INITIAL_CHAPTERS);
      }
    }
    return hydrateChaptersWithProgress(INITIAL_CHAPTERS);
  });

  const [notes, setNotes] = useState<NoteItem[]>(() => {
    const saved = localStorage.getItem('vidyasetu_notes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasMh = Array.isArray(parsed) && parsed.some((n: NoteItem) => n.id && n.id.startsWith('note-mh-'));
        if (hasMh) return parsed;
        const merged = [...INITIAL_NOTES];
        if (Array.isArray(parsed)) {
          parsed.forEach((p: NoteItem) => {
            if (!merged.some(m => m.id === p.id)) {
              merged.push(p);
            }
          });
        }
        localStorage.setItem('vidyasetu_notes', JSON.stringify(merged));
        return merged;
      } catch (e) {
        return INITIAL_NOTES;
      }
    }
    return INITIAL_NOTES;
  });

  const [mockTests, setMockTests] = useState<MockTest[]>(() => {
    const saved = localStorage.getItem('vidyasetu_tests');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasMh = Array.isArray(parsed) && parsed.some((t: MockTest) => t.id && t.id.startsWith('test-mh-'));
        if (hasMh) return parsed;
        const merged = [...INITIAL_MOCK_TESTS];
        if (Array.isArray(parsed)) {
          parsed.forEach((p: MockTest) => {
            if (!merged.some(m => m.id === p.id)) {
              merged.push(p);
            }
          });
        }
        localStorage.setItem('vidyasetu_tests', JSON.stringify(merged));
        return merged;
      } catch (e) {
        return INITIAL_MOCK_TESTS;
      }
    }
    return INITIAL_MOCK_TESTS;
  });

  const [achievers, setAchievers] = useState<AchieverStudent[]>(() =>
    safeParseStorage('vidyasetu_achievers', INITIAL_ACHIEVERS, Array.isArray)
  );

  const [testimonials] = useState<TestimonialItem[]>(INITIAL_TESTIMONIALS);

  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(() =>
    safeParseStorage('vidyasetu_enquiries', INITIAL_ENQUIRIES, Array.isArray)
  );

  // Active testing state
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [activeResult, setActiveResult] = useState<TestSubmissionResult | null>(null);
  const [lastTestResult, setLastTestResult] = useState<TestSubmissionResult | null>(() =>
    safeParseStorage<TestSubmissionResult | null>(
      'vidyasetu_last_result',
      null,
      (val) => typeof val === 'object' && val !== null
    )
  );

  // Modals & Reader
  const [readingNote, setReadingNote] = useState<NoteItem | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isDoubtModalOpen, setIsDoubtModalOpen] = useState(false);
  const [isMarketingKitModalOpen, setIsMarketingKitModalOpen] = useState(false);

  // Student Profile
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    return {
      name: 'Aditya Sharma',
      class: 'Class 10',
      board: 'CBSE',
      overallProgress: 68,
      overallProgressPercentage: 68,
      testsAttempted: 14,
      testsAttemptedCount: 14,
      averageScore: 76,
      averageScorePercentage: 76,
      streakDays: 5,
      studyStreakDays: 5,
      bookmarkedNoteIds: ['note-math-10-ch1', 'note-sci-10-ch1'],
      recentResults: [
        {
          id: 'res-prev-1',
          testId: 'test-sci-10-1',
          testTitle: 'Chemical Reactions & Equations Chapter Test',
          class: 'Class 10',
          subject: 'Science',
          score: 36,
          totalMarks: 40,
          total: 40,
          percentage: 90,
          accuracy: 90,
          correctCount: 9,
          incorrectCount: 1,
          unattemptedCount: 0,
          date: '16 Sep 2026',
          userAnswers: {},
          weakTopics: ['Balancing Redox Reactions'],
          strongTopics: ['Precipitation Reactions']
        },
        {
          id: 'res-prev-2',
          testId: 'test-math-10-1',
          testTitle: 'Real Numbers & Polynomials Quick Test',
          class: 'Class 10',
          subject: 'Mathematics',
          score: 16,
          totalMarks: 20,
          total: 20,
          percentage: 80,
          accuracy: 80,
          correctCount: 4,
          incorrectCount: 1,
          unattemptedCount: 0,
          date: '14 Sep 2026',
          userAnswers: {},
          weakTopics: ['Euclid Division Lemma'],
          strongTopics: ['Quadratic Zeroes']
        }
      ],
      lastOpenedChapter: {
        subject: 'Science',
        title: 'Light - Reflection and Refraction',
        chapterNumber: 9
      },
      upcomingTests: [
        {
          id: 'up-1',
          title: 'Triangles & Trigonometry Board Simulator',
          subject: 'Mathematics',
          date: 'Tomorrow, 5:00 PM',
          duration: '45 Mins'
        },
        {
          id: 'up-2',
          title: 'Electricity & Magnetic Effects Assessment',
          subject: 'Science',
          date: 'Sunday, 10:00 AM',
          duration: '60 Mins'
        }
      ],
      weakTopics: ['Trigonometry Identities', 'Ray Diagrams', 'HCF Factorisation'],
      strongTopics: ['Quadratic Equations', 'Chemical Reactions', 'Arithmetic Progressions'],
      badges: ['Consistency Champion (5-Day Streak)', 'Centum Seeker (Maths 100%)', 'Quick Solver']
    };
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Firebase Auth user & in-memory ID token (never stored in localStorage)
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const authTokenRef = useRef<string | null>(null);

  const syncWithCloudSql = async (endpoint: string, method: 'GET' | 'POST', body?: unknown) => {
    const token = authTokenRef.current || (auth.currentUser ? await auth.currentUser.getIdToken() : null);
    if (!token) return null;
    authTokenRef.current = token;
    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user);
      if (user) {
        try {
          const token = await user.getIdToken();
          authTokenRef.current = token;
          setStudentProfile(prev => ({
            ...prev,
            name: user.displayName || prev.name,
          }));

          const data = await syncWithCloudSql('/api/me', 'GET');
          if (data && Array.isArray(data.chapterProgress) && data.chapterProgress.length > 0) {
            setChapters(prev =>
              prev.map(ch => {
                const dbRow = data.chapterProgress.find((r: any) => r.chapterId === ch.id);
                if (!dbRow) return ch;
                let parsedTopics: string[] = ch.completedTopics || [];
                try {
                  parsedTopics = JSON.parse(dbRow.completedTopicsJson || '[]');
                } catch {
                  parsedTopics = ch.completedTopics || [];
                }
                return {
                  ...ch,
                  studyStatus: (dbRow.studyStatus as StudyStatus) || ch.studyStatus,
                  completionPercentage: dbRow.completionPercentage ?? ch.completionPercentage,
                  completedTopics: parsedTopics,
                  inStudyPlan: Boolean(dbRow.inStudyPlan),
                  studyPriority: (dbRow.studyPriority as StudyPriority) || ch.studyPriority,
                  targetDate: dbRow.targetDate || ch.targetDate,
                };
              })
            );
          }
        } catch {
          // Keep existing local state on transient network error
        }
      } else {
        authTokenRef.current = null;
      }
    });
    return () => unsubscribe();
  }, []);

  const syncAllToSupabase = async () => {
    try {
      const hydratedChapters = hydrateChaptersWithProgress(chapters);

      const progressRows = hydratedChapters.map(ch => ({
        chapter_id: ch.id,
        study_status: ch.studyStatus || 'Not Started',
        completion_percentage: ch.completionPercentage ?? 0,
        completed_topics_json: JSON.stringify(ch.completedTopics || []),
        in_study_plan: Boolean(ch.inStudyPlan),
        study_priority: ch.studyPriority || 'Medium',
        target_date: ch.targetDate || null,
      }));

      const noteRows = notes.map(n => ({
        id: n.id,
        title: n.title,
        target_class: n.class,
        subject: n.subject,
        chapter_number: n.chapterNumber,
        description: n.description,
        medium: n.medium || 'English',
      }));

      const testRows = mockTests.map(t => ({
        id: t.id,
        title: t.title,
        target_class: t.class,
        subject: t.subject,
        board: t.board,
        category: t.category,
        duration_minutes: t.durationMinutes,
        total_marks: t.totalMarks,
      }));

      const achRows = achievers.map(a => ({
        id: a.id,
        name: a.name,
        target_class: a.class,
        board: a.board,
        score: a.score,
        school_name: a.schoolName || 'Aimers Coaching Class',
        subject_achievement: a.subjectAchievement,
        category: a.category,
        year: a.year,
      }));

      const [r1, r2, r3, r4] = await Promise.all([
        supabase.from('chapter_progress').upsert(progressRows, { onConflict: 'chapter_id' }),
        supabase.from('notes').upsert(noteRows, { onConflict: 'id' }),
        supabase.from('mock_tests').upsert(testRows, { onConflict: 'id' }),
        supabase.from('achievers').upsert(achRows, { onConflict: 'id' }),
      ]);

      const existingEnq = await supabase.from('enquiries').select('id').limit(1);
      if (!existingEnq.error && (!existingEnq.data || existingEnq.data.length === 0)) {
        await supabase.from('enquiries').insert(
          enquiries.map(e => ({
            full_name: e.fullName,
            user_type: e.userType,
            mobile_number: e.mobileNumber,
            email: e.email || null,
            target_class: e.class,
            board: e.board,
            subject_interest: e.subjectInterest,
            preferred_batch: e.preferredBatch,
            message: e.message || null,
            date_submitted: e.dateSubmitted,
            status: e.status || 'New',
          }))
        );
      }

      const existingRes = await supabase.from('test_results').select('id').limit(1);
      if (!existingRes.error && (!existingRes.data || existingRes.data.length === 0)) {
        await supabase.from('test_results').insert(
          studentProfile.recentResults.map(r => ({
            test_id: r.testId,
            test_title: r.testTitle,
            target_class: r.class,
            subject: r.subject,
            score: r.score,
            total_marks: r.totalMarks,
            percentage: r.percentage ?? 0,
            accuracy: r.accuracy,
            date_completed: r.date || 'Recent',
          }))
        );
      }

      const firstErr = r1.error || r2.error || r3.error || r4.error;
      if (firstErr) {
        showToast(`Supabase RLS Notice: ${firstErr.message}`, 'warning');
      } else {
        showToast('All tables synced to Supabase successfully!', 'success');
      }
    } catch {
      showToast('Could not sync to Supabase. Check table RLS policies.', 'warning');
    }
  };

  // Hydrate initial records from Supabase (opptrstfkanjmekocggh) on mount
  useEffect(() => {
    const loadFromSupabase = async () => {
      try {
        const [progressRes, enquiriesRes, resultsRes, notesRes, achieversRes] = await Promise.all([
          supabase.from('chapter_progress').select('*'),
          supabase.from('enquiries').select('*').order('id', { ascending: false }),
          supabase.from('test_results').select('*').order('id', { ascending: false }).limit(10),
          supabase.from('notes').select('*'),
          supabase.from('achievers').select('*'),
        ]);

        if (progressRes.data && progressRes.data.length > 0) {
          setChapters(prev =>
            prev.map(ch => {
              const row = progressRes.data.find((r: any) => r.chapter_id === ch.id);
              if (!row) return ch;
              let parsedTopics: string[] = ch.completedTopics || [];
              try {
                parsedTopics = JSON.parse(row.completed_topics_json || '[]');
              } catch {
                parsedTopics = ch.completedTopics || [];
              }
              return {
                ...ch,
                studyStatus: (row.study_status as StudyStatus) || ch.studyStatus,
                completionPercentage: row.completion_percentage ?? ch.completionPercentage,
                completedTopics: parsedTopics,
                inStudyPlan: Boolean(row.in_study_plan),
                studyPriority: (row.study_priority as StudyPriority) || ch.studyPriority,
                targetDate: row.target_date || ch.targetDate,
              };
            })
          );
        } else if (!progressRes.error) {
          // Seed initial chapter progress into Supabase if table is empty
          const hydrated = hydrateChaptersWithProgress(INITIAL_CHAPTERS);
          const seedRows = hydrated.map(ch => ({
            chapter_id: ch.id,
            study_status: ch.studyStatus || 'Not Started',
            completion_percentage: ch.completionPercentage ?? 0,
            completed_topics_json: JSON.stringify(ch.completedTopics || []),
            in_study_plan: Boolean(ch.inStudyPlan),
            study_priority: ch.studyPriority || 'Medium',
            target_date: ch.targetDate || null,
          }));
          void supabase.from('chapter_progress').upsert(seedRows, { onConflict: 'chapter_id' });
        }

        if (enquiriesRes.data && enquiriesRes.data.length > 0) {
          const mappedEnquiries: EnquiryItem[] = enquiriesRes.data.map((r: any) => ({
            id: String(r.id || `enq-${Date.now()}`),
            fullName: r.full_name || 'Student',
            userType: r.user_type || 'Parent',
            mobileNumber: r.mobile_number || '',
            email: r.email || undefined,
            class: (r.target_class as TargetClass) || 'Class 10',
            board: (r.board as EducationalBoard) || 'State Board',
            subjectInterest: r.subject_interest || 'All Subjects',
            preferredBatch: r.preferred_batch || 'Evening',
            message: r.message || undefined,
            dateSubmitted: r.date_submitted || 'Recent',
            date: r.date_submitted || 'Recent',
            status: r.status || 'New',
          }));
          setEnquiries(prev => {
            const existingIds = new Set(mappedEnquiries.map(e => e.id));
            return [...mappedEnquiries, ...prev.filter(e => !existingIds.has(e.id))];
          });
        }

        if (resultsRes.data && resultsRes.data.length > 0) {
          const mappedResults: TestSubmissionResult[] = resultsRes.data.map((r: any) => ({
            id: String(r.id || `res-${Date.now()}`),
            testId: r.test_id || 'test-1',
            testTitle: r.test_title || 'Mock Assessment',
            class: (r.target_class as TargetClass) || 'Class 10',
            subject: r.subject || 'Science',
            score: Number(r.score ?? 0),
            totalMarks: Number(r.total_marks ?? 100),
            total: Number(r.total_marks ?? 100),
            percentage: Number(r.percentage ?? 0),
            accuracy: Number(r.accuracy ?? 0),
            correctCount: 0,
            incorrectCount: 0,
            unattemptedCount: 0,
            date: r.date_completed || 'Recent',
            userAnswers: {},
            weakTopics: [],
            strongTopics: [],
          }));
          setStudentProfile(prev => ({
            ...prev,
            recentResults: [
              ...mappedResults,
              ...prev.recentResults.filter(
                existing => !mappedResults.some(m => m.id === existing.id)
              ),
            ].slice(0, 10),
          }));
        }

        if (notesRes.data && notesRes.data.length > 0) {
          setNotes(prev => {
            const existingIds = new Set(prev.map(n => n.id));
            const extraNotes: NoteItem[] = notesRes.data
              .filter((r: any) => r.id && !existingIds.has(r.id))
              .map((r: any) => ({
                id: String(r.id),
                title: String(r.title || 'Chapter Note'),
                class: (r.target_class as TargetClass) || 'Class 10',
                subject: String(r.subject || 'Science'),
                chapterNumber: Number(r.chapter_number || 1),
                description: String(r.description || 'Verified coaching revision document.'),
                medium: (r.medium as MediumOfInstruction) || 'English',
                pageCount: 12,
                fileSize: '1.5 MB',
                badges: ['Important Questions', 'Exam Oriented'],
                formulaSheetIncluded: true,
                mindMapIncluded: true,
                recommendedForExam: true,
                contentSummary: String(r.description || 'Curated revision summary.'),
              }));
            return extraNotes.length > 0 ? [...extraNotes, ...prev] : prev;
          });
        }

        if (achieversRes.data && achieversRes.data.length > 0) {
          setAchievers(prev => {
            const existingIds = new Set(prev.map(a => a.id));
            const extraAchievers: AchieverStudent[] = achieversRes.data
              .filter((r: any) => r.id && !existingIds.has(r.id))
              .map((r: any) => ({
                id: String(r.id),
                name: String(r.name || 'Student'),
                class: (r.target_class as TargetClass) || 'Class 10',
                board: (r.board as EducationalBoard) || 'State Board',
                score: String(r.score || '95%'),
                schoolName: String(r.school_name || 'Aimers Coaching Class'),
                subjectAchievement: String(r.subject_achievement || 'Topper'),
                category: r.category || 'Top Performers',
                year: String(r.year || '2026'),
                photoUrl:
                  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
                quote:
                  'Consistency and regular mock test practice at Aimers Coaching Class changed my marks completely.',
              }));
            return extraAchievers.length > 0 ? [...extraAchievers, ...prev] : prev;
          });
        }
      } catch {
        // Fallback to local state if tables are not yet initialized
      }
    };

    void loadFromSupabase();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const cred = await signInWithPopup(auth, googleAuthProvider);
      authTokenRef.current = await cred.user.getIdToken();
      showToast(`Signed in as ${cred.user.displayName || cred.user.email}`);
    } catch (error: any) {
      if (error?.code !== 'auth/popup-closed-by-user') {
        showToast('Sign-in could not be completed. Please try again.', 'warning');
      }
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      authTokenRef.current = null;
      showToast('Signed out successfully', 'info');
    } catch {
      showToast('Failed to sign out', 'warning');
    }
  };

  const persistChapterProgressToBackends = (updated: ChapterItem) => {
    void syncWithCloudSql('/api/chapter-progress', 'POST', {
      chapterId: updated.id,
      studyStatus: updated.studyStatus || 'Not Started',
      completionPercentage: updated.completionPercentage ?? 0,
      completedTopics: updated.completedTopics || [],
      inStudyPlan: Boolean(updated.inStudyPlan),
      studyPriority: updated.studyPriority || 'Medium',
      targetDate: updated.targetDate || null,
    });

    void supabase
      .from('chapter_progress')
      .upsert(
        {
          chapter_id: updated.id,
          study_status: updated.studyStatus || 'Not Started',
          completion_percentage: updated.completionPercentage ?? 0,
          completed_topics_json: JSON.stringify(updated.completedTopics || []),
          in_study_plan: Boolean(updated.inStudyPlan),
          study_priority: updated.studyPriority || 'Medium',
          target_date: updated.targetDate || null,
        },
        { onConflict: 'chapter_id' }
      )
      .then(() => {});
  };

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('vidyasetu_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('vidyasetu_chapters', JSON.stringify(chapters));
  }, [chapters]);

  useEffect(() => {
    localStorage.setItem('vidyasetu_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('vidyasetu_tests', JSON.stringify(mockTests));
  }, [mockTests]);

  useEffect(() => {
    localStorage.setItem('vidyasetu_achievers', JSON.stringify(achievers));
  }, [achievers]);

  useEffect(() => {
    localStorage.setItem('vidyasetu_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    if (lastTestResult) {
      localStorage.setItem('vidyasetu_last_result', JSON.stringify(lastTestResult));
    }
  }, [lastTestResult]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const updateStat = (id: string, value: string, subtext: string) => {
    const cleanValue = sanitizeInputText(value, 40);
    const cleanSubtext = sanitizeInputText(subtext, 120);
    setStats(prev =>
      prev.map(s => (s.id === id ? { ...s, value: cleanValue, subtext: cleanSubtext } : s))
    );
    showToast('Statistic counter updated!');
  };

  const updateStats = (newStats: StatItem[]) => {
    setStats(newStats);
    showToast('Statistics counters updated in CMS!');
  };

  const updateChapterStatus = (chapterId: string, status: StudyStatus) => {
    let updatedItem: ChapterItem | undefined;
    setChapters(prev =>
      prev.map(c => {
        if (c.id !== chapterId) return c;
        let nextPct = c.completionPercentage || 0;
        let nextTopics = c.completedTopics || [];
        if (status === 'Completed') {
          nextPct = 100;
          nextTopics = [...c.topics];
        } else if (status === 'Not Started') {
          nextPct = 0;
          nextTopics = [];
        } else if (status === 'In Progress') {
          if (nextPct === 0 || nextPct === 100) {
            const half = Math.max(1, Math.ceil(c.topics.length / 2));
            nextTopics = c.topics.slice(0, half);
            nextPct = Math.round((nextTopics.length / (c.topics.length || 1)) * 100);
          }
        }
        updatedItem = {
          ...c,
          studyStatus: status,
          completionPercentage: nextPct,
          completedTopics: nextTopics
        };
        return updatedItem;
      })
    );
    if (updatedItem) persistChapterProgressToBackends(updatedItem);
    showToast(`Chapter marked as ${status} (${status === 'Completed' ? '100%' : status === 'Not Started' ? '0%' : 'In Progress'})`);
  };

  const updateChapterProgress = (chapterId: string, percentage: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(percentage)));
    const nextStatus: StudyStatus =
      clamped === 100 ? 'Completed' : clamped === 0 ? 'Not Started' : 'In Progress';

    let targetChapter: ChapterItem | undefined;
    setChapters(prev =>
      prev.map(c => {
        if (c.id !== chapterId) return c;
        const total = c.topics.length || 1;
        const targetTopicCount = Math.round((clamped / 100) * total);
        const nextTopics = c.topics.slice(0, targetTopicCount);
        targetChapter = {
          ...c,
          studyStatus: nextStatus,
          completionPercentage: clamped,
          completedTopics: nextTopics
        };
        return targetChapter;
      })
    );

    if (targetChapter) {
      persistChapterProgressToBackends(targetChapter);
      setStudentProfile(prev => ({
        ...prev,
        lastOpenedChapter: {
          subject: targetChapter!.subjectName,
          title: targetChapter!.title,
          chapterNumber: targetChapter!.chapterNumber
        }
      }));
    }
    showToast(`Chapter progress updated to ${clamped}%`);
  };

  const toggleChapterTopic = (chapterId: string, topic: string) => {
    let updatedPct = 0;
    let targetChapter: ChapterItem | undefined;

    setChapters(prev =>
      prev.map(c => {
        if (c.id !== chapterId) return c;
        const currentCompleted = c.completedTopics || [];
        const exists = currentCompleted.includes(topic);
        const nextTopics = exists
          ? currentCompleted.filter(t => t !== topic)
          : [...currentCompleted, topic];
        const total = c.topics.length || 1;
        updatedPct = Math.round((nextTopics.length / total) * 100);
        const nextStatus: StudyStatus =
          updatedPct === 100 ? 'Completed' : updatedPct === 0 ? 'Not Started' : 'In Progress';

        targetChapter = {
          ...c,
          completedTopics: nextTopics,
          completionPercentage: updatedPct,
          studyStatus: nextStatus
        };
        return targetChapter;
      })
    );

    if (targetChapter) {
      persistChapterProgressToBackends(targetChapter);
      setStudentProfile(prev => ({
        ...prev,
        lastOpenedChapter: {
          subject: targetChapter!.subjectName,
          title: targetChapter!.title,
          chapterNumber: targetChapter!.chapterNumber
        }
      }));
    }
    showToast(`Topic updated — Chapter at ${updatedPct}% completion`);
  };

  const updateChapterStudyPlan = (
    chapterId: string,
    updates: { inStudyPlan?: boolean; studyPriority?: StudyPriority; targetDate?: string }
  ) => {
    let updatedItem: ChapterItem | undefined;
    setChapters(prev =>
      prev.map(c => {
        if (c.id !== chapterId) return c;
        updatedItem = { ...c, ...updates };
        return updatedItem;
      })
    );
    if (updatedItem) persistChapterProgressToBackends(updatedItem);
    if (updates.inStudyPlan !== undefined) {
      showToast(
        updates.inStudyPlan
          ? 'Chapter added to your active Study Plan'
          : 'Chapter removed from active Study Plan',
        'info'
      );
    } else if (updates.studyPriority) {
      showToast(`Study priority set to ${updates.studyPriority}`);
    } else if (updates.targetDate !== undefined) {
      showToast(`Target completion date updated to ${updates.targetDate}`);
    }
  };

  const addNote = (note: NoteItem) => {
    const createdNote: NoteItem = {
      ...note,
      id: note.id || 'note-' + Date.now(),
      lastUpdated: note.lastUpdated || 'Today'
    };
    setNotes(prev => [createdNote, ...prev]);
    void supabase
      .from('notes')
      .upsert({
        id: createdNote.id,
        title: createdNote.title,
        target_class: createdNote.class,
        subject: createdNote.subject,
        chapter_number: createdNote.chapterNumber,
        description: createdNote.description,
        medium: createdNote.medium || 'English',
      })
      .then(() => {});
    showToast(`Note "${note.title}" published successfully!`);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    void supabase.from('notes').delete().eq('id', id).then(() => {});
    showToast('Note deleted from library');
  };

  const addMockTest = (test: MockTest) => {
    const createdTest: MockTest = {
      ...test,
      id: test.id || 'test-' + Date.now()
    };
    setMockTests(prev => [createdTest, ...prev]);
    void supabase
      .from('mock_tests')
      .upsert({
        id: createdTest.id,
        title: createdTest.title,
        target_class: createdTest.class,
        subject: createdTest.subject,
        board: createdTest.board,
        category: createdTest.category,
        duration_minutes: createdTest.durationMinutes,
        total_marks: createdTest.totalMarks,
      })
      .then(() => {});
    showToast(`Mock Test "${test.title}" added successfully!`);
  };

  const addAchiever = (achiever: AchieverStudent) => {
    const created: AchieverStudent = {
      ...achiever,
      id: achiever.id || 'ach-' + Date.now(),
      schoolName: achiever.schoolName || 'Aimers Coaching Class'
    };
    setAchievers(prev => [created, ...prev]);
    void supabase
      .from('achievers')
      .upsert({
        id: created.id,
        name: created.name,
        target_class: created.class,
        board: created.board,
        score: created.score,
        school_name: created.schoolName,
        subject_achievement: created.subjectAchievement,
        category: created.category,
        year: created.year,
      })
      .then(() => {});
    showToast(`Topper profile for ${achiever.name} added!`);
  };

  const deleteAchiever = (id: string) => {
    setAchievers(prev => prev.filter(a => a.id !== id));
    void supabase.from('achievers').delete().eq('id', id).then(() => {});
    showToast('Achiever record deleted');
  };

  const updateAchievers = (newList: AchieverStudent[]) => {
    setAchievers(newList);
    showToast('Achievers gallery updated!');
  };

  const addEnquiry = (data: Omit<EnquiryItem, 'id' | 'dateSubmitted' | 'status'>) => {
    const dateStr = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const newEnquiry: EnquiryItem = {
      ...data,
      fullName: sanitizeInputText(data.fullName, 100),
      mobileNumber: sanitizeInputText(data.mobileNumber, 20),
      email: data.email ? sanitizeInputText(data.email, 160) : undefined,
      subjectInterest: sanitizeInputText(data.subjectInterest, 120),
      message: data.message ? sanitizeInputText(data.message, 600) : undefined,
      id: 'enq-' + Date.now(),
      dateSubmitted: dateStr,
      date: dateStr,
      status: 'New'
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
    void syncWithCloudSql('/api/enquiries', 'POST', newEnquiry);
    void supabase
      .from('enquiries')
      .insert({
        full_name: newEnquiry.fullName,
        user_type: newEnquiry.userType,
        mobile_number: newEnquiry.mobileNumber,
        email: newEnquiry.email || null,
        target_class: newEnquiry.class,
        board: newEnquiry.board,
        subject_interest: newEnquiry.subjectInterest,
        preferred_batch: newEnquiry.preferredBatch,
        message: newEnquiry.message || null,
        date_submitted: newEnquiry.dateSubmitted,
        status: newEnquiry.status,
      })
      .then(() => {});
    showToast('Enquiry received! Our academic counsellor will contact you within 2 hours.', 'success');
  };

  const updateEnquiryStatus = (id: string, status: EnquiryItem['status']) => {
    setEnquiries(prev =>
      prev.map(e => (e.id === id ? { ...e, status } : e))
    );
    void supabase.from('enquiries').update({ status }).eq('id', id).then(() => {});
    showToast(`Enquiry status updated to ${status}`);
  };

  const startTest = (test: MockTest) => {
    setActiveTest(test);
    setActiveQuestionIndex(0);
    setAnswers({});
    setMarkedForReview({});
    setCurrentView('test-interface');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setAnswer = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const toggleMarkForReview = (questionId: string) => {
    setMarkedForReview(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const exitTest = () => {
    setActiveTest(null);
    setCurrentView('mock-tests');
  };

  const submitCurrentTest = () => {
    if (!activeTest) return;

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let earnedMarks = 0;

    activeTest.questions.forEach((q) => {
      const userChoice = answers[q.id];
      const correctIdx = q.correctOptionIndex !== undefined ? q.correctOptionIndex : 0;
      if (userChoice === undefined || userChoice === -1) {
        unattemptedCount++;
      } else if (userChoice === correctIdx) {
        correctCount++;
        earnedMarks += q.marks || 4;
      } else {
        incorrectCount++;
      }
    });

    const attemptedCount = correctCount + incorrectCount;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const percentage = Math.round((earnedMarks / (activeTest.totalMarks || 100)) * 100);

    const result: TestSubmissionResult = {
      id: 'res-' + Date.now(),
      testId: activeTest.id,
      testTitle: activeTest.title,
      class: activeTest.class,
      subject: activeTest.subject,
      score: earnedMarks,
      totalMarks: activeTest.totalMarks,
      total: activeTest.totalMarks,
      accuracy,
      percentage,
      correctCount,
      incorrectCount,
      unattemptedCount,
      timeTaken: `${Math.floor(activeTest.durationMinutes * 0.75)}:20 mins`,
      encouragingMessage:
        percentage >= 80
          ? 'Outstanding performance! Keep maintaining this exam sharpness.'
          : percentage >= 60
          ? 'Good effort! A targeted revision on weak concepts will push you into the 90%+ club.'
          : "Keep going! Review each mistake's step-by-step solution to master these principles.",
      userAnswers: answers,
      topicsToImprove: [
        'Formula derivation & step calculation',
        'Time pacing under timed test conditions',
        'NCERT exemplar multi-concept questions'
      ],
      weakTopics: [activeTest.subject + ' Practice'],
      strongTopics: ['Fundamentals']
    };

    setLastTestResult(result);
    submitTest(result);
  };

  const submitTest = (result: TestSubmissionResult) => {
    setActiveResult(result);
    setLastTestResult(result);
    setActiveTest(null);
    setStudentProfile(prev => ({
      ...prev,
      testsAttempted: (prev.testsAttempted || 14) + 1,
      testsAttemptedCount: prev.testsAttemptedCount + 1,
      averageScore: Math.round(
        (((prev.averageScore || 76) * prev.testsAttemptedCount) + result.accuracy) /
          (prev.testsAttemptedCount + 1)
      ),
      averageScorePercentage: Math.round(
        (prev.averageScorePercentage * prev.testsAttemptedCount + result.accuracy) /
          (prev.testsAttemptedCount + 1)
      ),
      recentResults: [result, ...prev.recentResults.slice(0, 8)]
    }));
    void syncWithCloudSql('/api/test-results', 'POST', result);
    void supabase
      .from('test_results')
      .insert({
        test_id: result.testId,
        test_title: result.testTitle,
        target_class: result.class,
        subject: result.subject,
        score: result.score,
        total_marks: result.totalMarks,
        percentage: result.percentage ?? 0,
        accuracy: result.accuracy,
        date_completed: result.date || new Date().toLocaleDateString('en-GB'),
      })
      .then(() => {});
    setCurrentView('test-result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleBookmarkNote = (noteId: string) => {
    setStudentProfile(prev => {
      const isBookmarked = prev.bookmarkedNoteIds.includes(noteId);
      const nextBookmarks = isBookmarked
        ? prev.bookmarkedNoteIds.filter(id => id !== noteId)
        : [...prev.bookmarkedNoteIds, noteId];
      showToast(isBookmarked ? 'Removed from saved notes' : 'Note saved to your dashboard!');
      return { ...prev, bookmarkedNoteIds: nextBookmarks };
    });
  };

  const navigateToClass = (cls: TargetClass) => {
    setSelectedClass(cls);
    setCurrentView('class-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToNotes = (cls?: TargetClass) => {
    if (cls) setSelectedClass(cls);
    setCurrentView('notes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSyllabus = (cls?: TargetClass) => {
    if (cls) setSelectedClass(cls);
    setCurrentView('syllabus');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTests = (cls?: TargetClass) => {
    if (cls) setSelectedClass(cls);
    setCurrentView('mock-tests');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedClass,
        setSelectedClass,
        selectedBoard,
        setSelectedBoard,
        selectedMedium,
        setSelectedMedium,
        stats,
        updateStat,
        updateStats,
        subjects,
        chapters,
        updateChapterStatus,
        updateChapterProgress,
        toggleChapterTopic,
        updateChapterStudyPlan,
        notes,
        addNote,
        deleteNote,
        mockTests,
        addMockTest,
        achievers,
        addAchiever,
        deleteAchiever,
        updateAchievers,
        testimonials,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        activeTest,
        activeQuestionIndex,
        setActiveQuestionIndex,
        answers,
        setAnswer,
        markedForReview,
        toggleMarkForReview,
        startTest,
        exitTest,
        submitCurrentTest,
        activeResult,
        lastTestResult,
        submitTest,
        readingNote,
        setReadingNote,
        isDemoModalOpen,
        setIsDemoModalOpen,
        isDoubtModalOpen,
        setIsDoubtModalOpen,
        isMarketingKitModalOpen,
        setIsMarketingKitModalOpen,
        studentProfile,
        toggleBookmarkNote,
        authUser,
        signInWithGoogle,
        signOutUser,
        syncAllToSupabase,
        toasts,
        showToast,
        dismissToast,
        navigateToClass,
        navigateToNotes,
        navigateToSyllabus,
        navigateToTests
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
