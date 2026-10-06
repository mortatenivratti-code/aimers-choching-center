import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Calculator,
  FlaskConical,
  Globe,
  BookOpen,
  Languages,
  Laptop,
  ArrowRight,
  FileText,
  CheckSquare
} from 'lucide-react';

export const SubjectGrid: React.FC = () => {
  const { subjects, navigateToNotes, selectedClass } = useApp();

  // Filter subjects for the active class (or default to Class 10 subjects as featured)
  const displayedSubjects = subjects.filter(s => s.class === selectedClass);
  const finalSubjects = displayedSubjects.length > 0 ? displayedSubjects : subjects.slice(0, 6);

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="w-6 h-6 text-blue-600" />;
      case 'FlaskConical':
      case 'Atom':
        return <FlaskConical className="w-6 h-6 text-emerald-600" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-amber-600" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-purple-600" />;
      case 'Languages':
        return <Languages className="w-6 h-6 text-rose-600" />;
      case 'Laptop':
      default:
        return <Laptop className="w-6 h-6 text-cyan-600" />;
    }
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">
              Academic Disciplines
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
              Subject-Wise Learning Portal
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Structured chapters, topic-wise notes, and chapter tests aligned with Board blueprints.
            </p>
          </div>

          <div className="text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-xl text-slate-700 self-start md:self-auto">
            Showing Subjects for: <span className="text-blue-700 font-black">{selectedClass}</span>
          </div>
        </div>

        {/* 6 Subject Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {finalSubjects.map(sub => (
            <div
              key={sub.id}
              className="p-6 rounded-2xl border border-slate-200 hover:border-blue-400 bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-slate-50 group-hover:bg-blue-50 rounded-xl transition-colors">
                    {getSubjectIcon(sub.iconName)}
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md tabular-nums">
                    {sub.totalChapters} Chapters
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-blue-700 transition-colors">
                  {sub.name}
                </h3>

                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {sub.description}
                </p>

                {/* Notes and Tests Count */}
                <div className="grid grid-cols-2 gap-2 mt-5 py-3 border-y border-slate-100 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span><strong>{sub.notesCount}</strong> Notes</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <CheckSquare className="w-4 h-4 text-blue-600" />
                    <span><strong>{sub.testsCount}</strong> Mock Tests</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-5 mt-auto">
                <button
                  onClick={() => navigateToNotes(sub.class)}
                  className="w-full py-2.5 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-800 rounded-xl text-xs font-bold transition-all border border-slate-200 hover:border-blue-600 flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Explore Subject Notes & Tests</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
