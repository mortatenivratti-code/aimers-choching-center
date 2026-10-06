import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TargetClass, MediumOfInstruction, NoteItem } from '../types';
import { downloadNoteAsPdf } from '../utils/notePdfGenerator';
import {
  Search,
  BookOpen,
  Download,
  FileText,
  Filter,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowUpDown
} from 'lucide-react';

export const NotesView: React.FC = () => {
  const {
    notes,
    selectedClass,
    setSelectedClass,
    selectedMedium,
    setSelectedMedium,
    setReadingNote,
    navigateToTests,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [activeBadgeFilter, setActiveBadgeFilter] = useState<string>('All');

  const classes: TargetClass[] = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

  const filteredNotes = notes.filter(note => {
    const matchClass = selectedClass ? note.class === selectedClass : true;
    let matchSubject = selectedSubject === 'All';
    if (!matchSubject) {
      const q = selectedSubject.toLowerCase();
      const nSub = note.subject.toLowerCase();
      matchSubject = nSub.includes(q) ||
        (q === 'mathematics' && (nSub.includes('algebra') || nSub.includes('geometry') || nSub.includes('math'))) ||
        (q === 'science' && nSub.includes('science'));
    }
    const noteBadges = note.badges || note.keyTopics || [];
    const matchBadge = activeBadgeFilter === 'All' || noteBadges.includes(activeBadgeFilter as any);
    const matchSearch =
      searchQuery.trim() === '' ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase());

    return matchClass && matchSubject && matchBadge && matchSearch;
  });

  const handleDownload = (note: NoteItem) => {
    const filename = downloadNoteAsPdf(note);
    showToast(`Downloaded offline PDF: ${filename}`, 'success');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            Verified Academic Library
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
            Chapter-Wise Digital Notes & Summaries
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Concise formula handbooks, solved proofs, ray diagrams, and board-level revision notes prepared by senior coaching educators.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          
          {/* Top Row: Search Input + Class Filter */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search notes by chapter name, topic, or keyword (e.g. Quadratic, Light)..."
                className="w-full pl-11 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Class Selector */}
            <div className="md:col-span-6 flex items-center gap-1.5 overflow-x-auto pb-1">
              {classes.map(cls => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition ${
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

          {/* Bottom Row: Subject Filter + Resource Badge Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs">
            {/* Subjects */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-slate-400 uppercase tracking-wider mr-1">Subject:</span>
              {['All', 'Mathematics', 'Science', 'English', 'Social Science'].map(sub => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                    selectedSubject === sub
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Badges Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-slate-400 uppercase tracking-wider mr-1">Type:</span>
              {['All', 'Formula Sheet', 'Mind Map', 'Important Questions', 'Exam Oriented'].map(badge => (
                <button
                  key={badge}
                  onClick={() => setActiveBadgeFilter(badge)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
                    activeBadgeFilter === badge
                      ? 'bg-emerald-100 text-emerald-800 font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {badge}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Notes Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Available Notes ({filteredNotes.length})
            </h3>
            <span className="text-xs text-slate-500">
              Showing {selectedClass} resources in {selectedMedium}
            </span>
          </div>

          {filteredNotes.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 space-y-3">
              <FileText className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="text-base font-bold text-slate-800 font-heading">
                No matching notes found
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing your search query or selecting a different subject or class from the toolbar above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map(note => (
                <div
                  key={note.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all p-6 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Subject + Class */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                          {note.subject} • Ch {note.chapterNumber}
                        </span>
                        {note.board === 'State Board' && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            MH SSC
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-bold text-slate-400">
                        {note.class}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h4 className="text-base font-bold text-slate-900 font-heading group-hover:text-blue-600 transition-colors mb-1.5">
                      {note.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {note.description}
                    </p>

                    {/* Badges List */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(note.badges || note.keyTopics || ['Exam Essential']).map((b: string, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                    {/* Document Meta Info */}
                    <div className="text-[11px] text-slate-400 flex items-center justify-between pb-3 border-b border-slate-100">
                      <span>{note.pageCount} Pages • Verified PDF</span>
                      <span>{note.fileSize}</span>
                    </div>
                  </div>

                  {/* 3 Explicit Action Buttons: Read Online, Download Notes, Practice Questions */}
                  <div className="pt-4 space-y-2 mt-auto">
                    <button
                      onClick={() => setReadingNote(note)}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Online</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleDownload(note)}
                        className="py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1"
                      >
                        <Download className="w-3 h-3 text-slate-600" />
                        <span>Download</span>
                      </button>

                      <button
                        onClick={() => navigateToTests(note.class)}
                        className="py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1"
                      >
                        <FileText className="w-3 h-3 text-blue-600" />
                        <span>Practice</span>
                      </button>
                    </div>
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
