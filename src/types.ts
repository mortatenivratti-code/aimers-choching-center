export type TargetClass = 'Class 6' | 'Class 7' | 'Class 8' | 'Class 9' | 'Class 10';

export type EducationalBoard = 'CBSE' | 'State Board' | 'ICSE';
export type MediumOfInstruction = 'English' | 'Semi-English' | 'Marathi' | 'Hindi / Regional';

export type StudyStatus = 'Not Started' | 'In Progress' | 'Completed';
export type StudyPriority = 'High' | 'Medium' | 'Low';

export interface SubjectItem {
  id: string;
  name: string;
  class: TargetClass;
  iconName: string;
  description: string;
  totalChapters: number;
  notesCount: number;
  testsCount: number;
  color: string;
}

export interface ChapterTopic {
  id: string;
  name: string;
  completed?: boolean;
}

export interface ChapterItem {
  id: string;
  subjectId: string;
  subjectName: string;
  class: TargetClass;
  chapterNumber: number;
  title: string;
  titleMarathi?: string;
  description: string;
  topics: string[];
  board: EducationalBoard;
  hasNotes: boolean;
  practiceQuestionsCount: number;
  mockTestId?: string;
  importantMarksWeightage: string;
  studyStatus?: StudyStatus;
  completionPercentage?: number;
  completedTopics?: string[];
  inStudyPlan?: boolean;
  studyPriority?: StudyPriority;
  targetDate?: string;
}

export interface NoteItem {
  id: string;
  title: string;
  subject: string;
  class: TargetClass;
  chapterNumber: number;
  board?: EducationalBoard;
  medium?: MediumOfInstruction;
  description: string;
  pageCount: number;
  lastUpdated?: string;
  fileSize: string;
  recommendedForExam?: boolean;
  keyTopics?: string[];
  badges?: string[];
  formulaSheetIncluded?: boolean;
  mindMapIncluded?: boolean;
  contentSummary?: string;
  contentPreview?: {
    summary: string;
    keyPoints: string[];
    importantFormulasOrFacts: string[];
    sampleQuestions: { q: string; a: string }[];
  };
}

export interface QuestionOption {
  id?: string;
  label?: 'A' | 'B' | 'C' | 'D';
  text?: string;
}

export interface MockQuestion {
  id: string;
  questionText: string;
  options: (string | QuestionOption)[];
  correctOptionIndex?: number;
  correctAnswer?: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  marks: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  topic: string;
}

export type TestCategory =
  | 'Quick Test'
  | 'Chapter Test'
  | 'Subject Test'
  | 'Revision Test'
  | 'Full Syllabus Mock Test';

export interface MockTest {
  id: string;
  title: string;
  class: TargetClass;
  subject: string;
  board?: string;
  category: TestCategory;
  durationMinutes: number;
  totalMarks: number;
  questionsCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  attemptCount: number;
  passingPercentage?: number;
  description: string;
  questions: MockQuestion[];
}

export type QuestionStatus = 'answered' | 'not-answered' | 'marked-review' | 'not-visited';

export interface TestSubmissionResult {
  id?: string;
  testId: string;
  testTitle: string;
  class: TargetClass;
  subject: string;
  score: number;
  totalMarks: number;
  total?: number;
  accuracy: number;
  percentage?: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  timeSpentSeconds?: number;
  timeTaken?: string;
  date?: string;
  dateCompleted?: string;
  encouragingMessage?: string;
  userAnswers: Record<string, any>;
  topicsToImprove?: string[];
  weakTopics: string[];
  strongTopics: string[];
  recommendedTestIds?: string[];
}

export interface AchieverStudent {
  id: string;
  name: string;
  photoUrl: string;
  class: TargetClass;
  score: string;
  subjectAchievement: string;
  board: string;
  year: string;
  schoolName?: string;
  category: 'Top Performers' | 'Board Results' | 'Subject Toppers' | 'Most Improved Students';
  quote?: string;
  rankBadge?: string;
}

export type Achiever = AchieverStudent;

export interface TestimonialItem {
  id: string;
  name: string;
  role: 'Student' | 'Parent';
  class: TargetClass;
  rating: number;
  content: string;
  avatar: string;
  date: string;
  highlight: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  subtext: string;
  iconName: string;
}

export interface EnquiryItem {
  id: string;
  fullName: string;
  userType: 'Student' | 'Parent';
  mobileNumber: string;
  email?: string;
  class: TargetClass;
  board: EducationalBoard;
  subjectInterest: string;
  preferredBatch: 'Morning' | 'Evening' | 'Weekend' | 'Flexible';
  message?: string;
  date?: string;
  dateSubmitted: string;
  status: 'New' | 'Contacted' | 'Demo Scheduled' | 'Enrolled';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Academics' | 'Mock Tests' | 'Admissions';
}

export interface StudentProfile {
  name: string;
  class: TargetClass;
  board?: string;
  overallProgress?: number;
  overallProgressPercentage: number;
  testsAttempted?: number;
  testsAttemptedCount: number;
  averageScore?: number;
  averageScorePercentage: number;
  streakDays?: number;
  studyStreakDays: number;
  bookmarkedNoteIds: string[];
  recentResults: TestSubmissionResult[];
  weakTopics: string[];
  strongTopics: string[];
  lastOpenedChapter?: {
    subject: string;
    title: string;
    chapterNumber: number;
  };
  upcomingTests?: Array<{
    id: string;
    title: string;
    subject: string;
    date: string;
    duration: string;
  }>;
  badges?: string[];
}
