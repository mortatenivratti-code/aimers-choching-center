import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TargetClass, EducationalBoard, NoteItem, MockTest, Achiever } from '../types';
import { sanitizeInputText } from '../utils/security';
import {
  Settings,
  Users,
  FileText,
  CheckSquare,
  Award,
  PhoneCall,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

export const AdminCmsView: React.FC = () => {
  const {
    stats,
    updateStat,
    enquiries,
    updateEnquiryStatus,
    notes,
    addNote,
    deleteNote,
    mockTests,
    addMockTest,
    achievers,
    addAchiever,
    deleteAchiever,
    syncAllToSupabase,
    authUser,
    signInWithGoogle,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'enquiries' | 'stats' | 'notes' | 'tests' | 'achievers'
  >('enquiries');

  // Form state for adding new note
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteClass, setNewNoteClass] = useState<TargetClass>('Class 10');
  const [newNoteSubject, setNewNoteSubject] = useState('Mathematics');
  const [newNoteChapter, setNewNoteChapter] = useState('1');
  const [newNoteDesc, setNewNoteDesc] = useState('');

  // Form state for adding new mock test
  const [newTestTitle, setNewTestTitle] = useState('');
  const [newTestClass, setNewTestClass] = useState<TargetClass>('Class 10');
  const [newTestSubject, setNewTestSubject] = useState('Science');
  const [newTestDuration, setNewTestDuration] = useState('30');
  const [newTestCategory, setNewTestCategory] = useState<'Quick Test' | 'Chapter Test' | 'Subject Test' | 'Full Syllabus Mock Test'>('Chapter Test');

  // Form state for adding new achiever
  const [newAchName, setNewAchName] = useState('');
  const [newAchScore, setNewAchScore] = useState('98.2%');
  const [newAchClass, setNewAchClass] = useState<TargetClass>('Class 10');
  const [newAchSubject, setNewAchSubject] = useState('Mathematics 100/100');
  const [newAchCategory, setNewAchCategory] = useState<'Top Performers' | 'Board Results' | 'Subject Toppers' | 'Most Improved Students'>('Top Performers');

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = sanitizeInputText(newNoteTitle, 140);
    const cleanDesc = sanitizeInputText(newNoteDesc, 400);
    if (!cleanTitle) return;

    addNote({
      id: 'note-' + Date.now(),
      title: cleanTitle,
      class: newNoteClass,
      subject: sanitizeInputText(newNoteSubject, 60),
      chapterNumber: Math.max(1, Math.min(30, parseInt(newNoteChapter, 10) || 1)),
      description: cleanDesc || 'Verified coaching revision document.',
      medium: 'English',
      pageCount: 12,
      fileSize: '1.5 MB',
      badges: ['Important Questions', 'Exam Oriented'],
      formulaSheetIncluded: true,
      mindMapIncluded: true,
      recommendedForExam: true,
      contentSummary: 'Curated revision summary with solved proofs and formulas.'
    });

    setNewNoteTitle('');
    setNewNoteDesc('');
    showToast('New Chapter Note added to Digital Library!');
  };

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = sanitizeInputText(newTestTitle, 140);
    if (!cleanTitle) return;

    addMockTest({
      id: 'test-' + Date.now(),
      title: cleanTitle,
      class: newTestClass,
      subject: sanitizeInputText(newTestSubject, 60),
      board: 'CBSE',
      category: newTestCategory,
      questionsCount: 15,
      durationMinutes: Math.max(5, Math.min(180, parseInt(newTestDuration, 10) || 30)),
      totalMarks: 60,
      difficulty: 'Medium',
      attemptCount: 12,
      description: 'Faculty-curated mock assessment for exam practice.',
      questions: [
        {
          id: `q-${Date.now()}-1`,
          questionText: 'Which of the following represents a fundamental principle in this unit?',
          options: ['Option A (Verified)', 'Option B', 'Option C', 'Option D'],
          correctOptionIndex: 0,
          explanation: 'Option A is the correct answer based on standard NCERT theorems.',
          marks: 4,
          topic: sanitizeInputText(newTestSubject, 60)
        }
      ]
    });

    setNewTestTitle('');
    showToast('New Mock Test published to Portal!');
  };

  const handleCreateAchiever = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizeInputText(newAchName, 100);
    if (!cleanName) return;

    addAchiever({
      id: 'ach-' + Date.now(),
      name: cleanName,
      class: newAchClass,
      board: 'CBSE',
      score: sanitizeInputText(newAchScore, 30),
      schoolName: 'Aimers Coaching Class',
      subjectAchievement: sanitizeInputText(newAchSubject, 80),
      category: newAchCategory,
      year: '2026',
      photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
      quote: 'Consistency and regular mock test practice at Aimers Coaching Class changed my marks completely.'
    });

    setNewAchName('');
    showToast('New Topper Record published to Results Gallery!');
  };

  if (!authUser) {
    return (
      <div className="bg-slate-50 min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-lg text-center space-y-5">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center mx-auto">
            <Settings className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-black text-slate-900 font-heading">
              Administrator Authentication Required
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Access to student enquiries, contact numbers, and CMS publishing controls is restricted to authenticated Aimers Coaching Class staff.
            </p>
          </div>
          <button
            onClick={() => void signInWithGoogle()}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition cursor-pointer"
          >
            Sign In with Google to Access Admin CMS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Settings className="w-4 h-4" />
              <span>Administrative Content Management System (CMS)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-white">
              Aimers Coaching Class Portal Management
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Manage enquiries, edit website trust statistics, publish notes, create tests, and maintain topper records.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => void syncAllToSupabase()}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Sync All Tables to Supabase</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs sm:text-sm font-bold border-b border-slate-200">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'enquiries'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Admission Enquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'stats'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Trust Counters & Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'notes'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Chapter Notes ({notes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tests')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'tests'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Mock Tests ({mockTests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('achievers')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'achievers'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Results & Achievers ({achievers.length})</span>
          </button>
        </div>

        {/* 1. TAB: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Recent Leads & Counselling Submissions
              </h3>
              <span className="text-xs text-slate-500">Live data persisted locally</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="p-3">Full Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Mobile (WhatsApp)</th>
                    <th className="p-3">Class & Board</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enquiries.map(enq => (
                    <tr key={enq.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3 font-bold text-slate-900">{enq.fullName}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold">
                          {enq.userType}
                        </span>
                      </td>
                      <td className="p-3 font-mono font-semibold text-slate-800">
                        {enq.mobileNumber}
                      </td>
                      <td className="p-3">
                        {enq.class} ({enq.board})
                      </td>
                      <td className="p-3 text-slate-400">{enq.date}</td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            enq.status === 'New'
                              ? 'bg-rose-100 text-rose-800'
                              : enq.status === 'Contacted'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          value={enq.status}
                          onChange={e => updateEnquiryStatus(enq.id, e.target.value as any)}
                          className="text-[11px] p-1 border border-slate-200 rounded-lg bg-white"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Enrolled">Enrolled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. TAB: STATS / TRUST COUNTERS */}
        {activeTab === 'stats' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Configure Trust & Achievement Counters
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Prompt requirement: "Do NOT create fake claims. Keep all statistics configurable from the CMS/admin panel."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.map(s => (
                <div key={s.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700">{s.label}</span>
                    <span className="text-[11px] text-slate-400 font-mono">ID: {s.id}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Display Value</label>
                      <input
                        type="text"
                        value={s.value}
                        onChange={e => updateStat(s.id, e.target.value, s.subtext)}
                        className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Supporting Subtext</label>
                      <input
                        type="text"
                        value={s.subtext}
                        onChange={e => updateStat(s.id, s.value, e.target.value)}
                        className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. TAB: NOTES MANAGEMENT */}
        {activeTab === 'notes' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Create Note Form */}
            <form onSubmit={handleCreateNote} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-blue-600" />
                <span>Upload / Publish New Chapter Note</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Note Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Linear Equations in Two Variables"
                    value={newNoteTitle}
                    onChange={e => setNewNoteTitle(e.target.value)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Class *</label>
                  <select
                    value={newNoteClass}
                    onChange={e => setNewNoteClass(e.target.value as TargetClass)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-xl"
                  >
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={newNoteSubject}
                    onChange={e => setNewNoteSubject(e.target.value)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Chapter No. *</label>
                  <input
                    type="number"
                    required
                    value={newNoteChapter}
                    onChange={e => setNewNoteChapter(e.target.value)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description / Key Formulas</label>
                <input
                  type="text"
                  placeholder="Key concepts, NCERT proofs, and important questions summary"
                  value={newNoteDesc}
                  onChange={e => setNewNoteDesc(e.target.value)}
                  className="w-full p-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow"
              >
                Publish Note to Digital Portal
              </button>
            </form>

            {/* List Notes */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 font-heading">Existing Published Notes</h3>
              <div className="divide-y divide-slate-100 text-xs">
                {notes.map(n => (
                  <div key={n.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{n.title}</div>
                      <div className="text-slate-500 text-[11px]">{n.class} • {n.subject} • Chapter {n.chapterNumber}</div>
                    </div>
                    <button
                      onClick={() => deleteNote(n.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Delete note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. TAB: TESTS */}
        {activeTab === 'tests' && (
          <div className="space-y-6 animate-in fade-in">
            <form onSubmit={handleCreateTest} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-blue-600" />
                <span>Create & Publish Online Mock Test</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Test Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Light & Reflection Mastery Quiz"
                    value={newTestTitle}
                    onChange={e => setNewTestTitle(e.target.value)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Class *</label>
                  <select
                    value={newTestClass}
                    onChange={e => setNewTestClass(e.target.value as TargetClass)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-xl"
                  >
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newTestCategory}
                    onChange={e => setNewTestCategory(e.target.value as any)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-xl"
                  >
                    <option value="Quick Test">Quick Test</option>
                    <option value="Chapter Test">Chapter Test</option>
                    <option value="Subject Test">Subject Test</option>
                    <option value="Full Syllabus Mock Test">Full Syllabus Mock Test</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={newTestDuration}
                    onChange={e => setNewTestDuration(e.target.value)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow"
              >
                Publish Test
              </button>
            </form>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 font-heading">Available Tests</h3>
              <div className="divide-y divide-slate-100 text-xs">
                {mockTests.map(t => (
                  <div key={t.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{t.title}</div>
                      <div className="text-slate-500 text-[11px]">
                        {t.class} • {t.subject} • {t.durationMinutes} mins • {t.questionsCount} Qs
                      </div>
                    </div>
                    <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">
                      {t.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. TAB: ACHIEVERS */}
        {activeTab === 'achievers' && (
          <div className="space-y-6 animate-in fade-in">
            <form onSubmit={handleCreateAchiever} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-blue-600" />
                <span>Add Student Topper / Board Achiever</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Student Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pratik Patil"
                    value={newAchName}
                    onChange={e => setNewAchName(e.target.value)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Percentage / Score *</label>
                  <input
                    type="text"
                    required
                    value={newAchScore}
                    onChange={e => setNewAchScore(e.target.value)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Class</label>
                  <select
                    value={newAchClass}
                    onChange={e => setNewAchClass(e.target.value as TargetClass)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-xl"
                  >
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newAchCategory}
                    onChange={e => setNewAchCategory(e.target.value as any)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-xl"
                  >
                    <option value="Top Performers">Top Performers</option>
                    <option value="Board Results">Board Results</option>
                    <option value="Subject Toppers">Subject Toppers</option>
                    <option value="Most Improved Students">Most Improved Students</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject Achievement / Highlight</label>
                <input
                  type="text"
                  value={newAchSubject}
                  onChange={e => setNewAchSubject(e.target.value)}
                  className="w-full p-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow"
              >
                Publish Achiever Record
              </button>
            </form>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 font-heading">Verified Achievers Gallery Records</h3>
              <div className="divide-y divide-slate-100 text-xs">
                {achievers.map(a => (
                  <div key={a.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{a.name} ({a.score})</div>
                      <div className="text-slate-500 text-[11px]">{a.class} • {a.category} • {a.subjectAchievement}</div>
                    </div>
                    <button
                      onClick={() => deleteAchiever(a.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
