import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Download,
  Bookmark,
  BookOpen,
  CheckCircle,
  FileText,
  ArrowRight,
  Share2,
  SlidersHorizontal,
  Check,
  FileCheck2
} from 'lucide-react';
import { downloadNoteAsPdf } from '../../utils/notePdfGenerator';

export const NoteReaderModal: React.FC = () => {
  const {
    readingNote,
    setReadingNote,
    studentProfile,
    toggleBookmarkNote,
    startTest,
    mockTests,
    showToast
  } = useApp();

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadedJustNow, setDownloadedJustNow] = useState(false);
  const [showPdfOptions, setShowPdfOptions] = useState(false);
  const [includeConcepts, setIncludeConcepts] = useState(true);
  const [includeFormulas, setIncludeFormulas] = useState(true);
  const [includeSolvedExamples, setIncludeSolvedExamples] = useState(true);
  const [includeChecklist, setIncludeChecklist] = useState(true);

  if (!readingNote) return null;

  const isBookmarked = studentProfile.bookmarkedNoteIds.includes(readingNote.id);

  const handleDownloadPdf = () => {
    if (isDownloading) return;
    setIsDownloading(true);

    setTimeout(() => {
      try {
        const filename = downloadNoteAsPdf(readingNote, {
          includeConcepts,
          includeFormulas,
          includeSolvedExamples,
          includeChecklist,
          studentName: studentProfile.name || 'Student'
        });
        setIsDownloading(false);
        setDownloadedJustNow(true);
        showToast(`Offline PDF downloaded: ${filename}`, 'success');
        setTimeout(() => setDownloadedJustNow(false), 3500);
      } catch {
        setIsDownloading(false);
        showToast('Could not generate PDF. Please try again.', 'warning');
      }
    }, 250);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Study note link copied to clipboard!');
    }
  };

  const correspondingTest = mockTests.find(
    t => t.subject === readingNote.subject && t.class === readingNote.class
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Reader Top Bar */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-blue-600 rounded-lg shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                  {readingNote.class} • {readingNote.subject} • Ch {readingNote.chapterNumber}
                </span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                  {readingNote.pageCount} Pages • {readingNote.board || 'State Board / CBSE'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold truncate text-white">
                {readingNote.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggleBookmarkNote(readingNote.id)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
              title={isBookmarked ? 'Saved' : 'Save for later'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors hidden sm:inline-flex cursor-pointer"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowPdfOptions(prev => !prev)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                showPdfOptions
                  ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
              title="Customize Offline PDF Sections"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow cursor-pointer ${
                downloadedJustNow
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {downloadedJustNow ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>PDF Saved</span>
                </>
              ) : (
                <>
                  <Download className={`w-3.5 h-3.5 ${isDownloading ? 'animate-bounce' : ''}`} />
                  <span>{isDownloading ? 'Generating...' : 'Download PDF'}</span>
                </>
              )}
            </button>

            <button
              onClick={() => setReadingNote(null)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Collapsible Offline PDF Customizer Bar */}
        {showPdfOptions && (
          <div className="px-5 py-3.5 bg-slate-800 text-slate-200 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-bold text-blue-300 uppercase tracking-wider text-[11px]">
                Include in Offline PDF:
              </span>

              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeConcepts}
                  onChange={e => setIncludeConcepts(e.target.checked)}
                  className="rounded border-slate-600 text-blue-600 focus:ring-blue-500"
                />
                <span>Core Concepts</span>
              </label>

              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeFormulas}
                  onChange={e => setIncludeFormulas(e.target.checked)}
                  className="rounded border-slate-600 text-blue-600 focus:ring-blue-500"
                />
                <span>Formulas & Theorems</span>
              </label>

              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeSolvedExamples}
                  onChange={e => setIncludeSolvedExamples(e.target.checked)}
                  className="rounded border-slate-600 text-blue-600 focus:ring-blue-500"
                />
                <span>Solved Exam Questions</span>
              </label>

              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeChecklist}
                  onChange={e => setIncludeChecklist(e.target.checked)}
                  className="rounded border-slate-600 text-blue-600 focus:ring-blue-500"
                />
                <span>Revision Checklist</span>
              </label>
            </div>

            <button
              onClick={handleDownloadPdf}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Export Custom PDF</span>
            </button>
          </div>
        )}

        {/* Reader Document Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50 space-y-8 font-sans">
          {/* Note Banner Header */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Aimers Coaching Class Digital Study Material Series
              </span>
              <span className="text-xs text-slate-500">
                Last Revised: {readingNote.lastUpdated || 'Oct 2026'} • Verified by Senior Faculty
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {readingNote.title}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              {readingNote.contentPreview?.summary || readingNote.description}
            </p>

            {/* Key Topics Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {(readingNote.keyTopics || readingNote.badges || ['Exam Revision', 'NCERT Highlights']).map(
                (topic, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-lg border border-blue-100"
                  >
                    #{topic}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Core Concept Notes */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2 border-b border-slate-100 pb-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Fundamental Concepts & Principles
            </h2>
            <div className="space-y-3">
              {(readingNote.contentPreview?.keyPoints || [
                'Understand the core definitions and axiomatic principles of this chapter.',
                'Practice diagrams and sign conventions carefully.',
                'Review standard proofs and step-by-step mathematical reasoning.'
              ]).map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Formulas & Theorems */}
          <div className="bg-amber-50/60 p-6 rounded-xl border border-amber-200 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-amber-900 font-heading flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-amber-600" />
              Must-Remember Formulas & Key Theorems
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(readingNote.contentPreview?.importantFormulasOrFacts || [
                'Formula 1: Refer to NCERT Chapter Summary Sheet',
                'Formula 2: Standard Theorem and Proof statements'
              ]).map((formula, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-lg border border-amber-100 font-mono text-xs sm:text-sm text-slate-800 font-semibold shadow-xs"
                >
                  {formula}
                </div>
              ))}
            </div>
          </div>

          {/* Solved Examples */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-3">
              Expected Exam Questions & Model Solutions
            </h3>
            <div className="space-y-4">
              {(readingNote.contentPreview?.sampleQuestions || [
                {
                  q: 'State and explain the primary theorem with suitable examples.',
                  a: 'Follow step-by-step derivation: Define terms, state assumptions, and write final equation with appropriate units.'
                }
              ]).map((sq, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded">
                      Q{i + 1}
                    </span>
                    <p className="text-sm font-semibold text-slate-800">{sq.q}</p>
                  </div>
                  <div className="pl-8 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
                    <strong className="text-emerald-700 block mb-1">Model Answer / Solution:</strong>
                    {sq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Offline Study Download Card + Test Action */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between gap-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
                  Offline Revision Ready
                </div>
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  Save Chapter Notes as PDF
                </h4>
                <p className="text-slate-600 text-xs mt-1">
                  Download a formatted A4 study handout with concepts, formulas, and solved board questions for offline reading.
                </p>
              </div>
              <button
                onClick={handleDownloadPdf}
                disabled={isDownloading}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>
                  {isDownloading
                    ? 'Preparing PDF File...'
                    : `Download Offline PDF (${readingNote.fileSize || '1.4 MB'})`}
                </span>
              </button>
            </div>

            {correspondingTest && (
              <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-5 rounded-xl shadow-md flex flex-col justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-1">
                    Self-Assessment
                  </div>
                  <h4 className="text-base font-bold font-heading">
                    Ready to test what you just read?
                  </h4>
                  <p className="text-blue-100 text-xs mt-1">
                    Take the {correspondingTest.title} ({correspondingTest.durationMinutes} mins) to evaluate your retention.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setReadingNote(null);
                    startTest(correspondingTest);
                  }}
                  className="w-full py-2.5 px-4 bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Take Chapter Mock Test</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
