import React from 'react';
import { useApp } from '../context/AppContext';
import { CLASS_METADATA } from '../data/initialData';
import { TargetClass } from '../types';
import {
  BookOpen,
  FileText,
  CheckSquare,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Compass,
  Zap,
  Target
} from 'lucide-react';

export const ClassCards: React.FC = () => {
  const { navigateToClass, navigateToSyllabus, navigateToNotes, navigateToTests } = useApp();

  const classList: TargetClass[] = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

  const getClassIcon = (cls: TargetClass) => {
    switch (cls) {
      case 'Class 6':
        return <Compass className="w-5 h-5 text-cyan-600" />;
      case 'Class 7':
        return <Sparkles className="w-5 h-5 text-indigo-600" />;
      case 'Class 8':
        return <Zap className="w-5 h-5 text-sky-600" />;
      case 'Class 9':
        return <GraduationCap className="w-5 h-5 text-amber-600" />;
      case 'Class 10':
      default:
        return <Target className="w-5 h-5 text-rose-600" />;
    }
  };

  return (
    <section id="classes-section" className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">
            Targeted Academic Pathways • Classes 6 to 10
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
            Select Your Academic Grade
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Specialized curriculum alignment, board-specific preparation, and customized notes tailored for each grade level from Class 6 to 10.
          </p>
        </div>

        {/* 5 Class Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {classList.map(cls => {
            const meta = CLASS_METADATA[cls];
            const isClass10 = cls === 'Class 10';

            return (
              <div
                key={cls}
                className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg ${
                  isClass10
                    ? 'border-rose-300 ring-2 ring-rose-500/20 md:col-span-2 lg:col-span-1'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                {/* Card Top Banner / Pill */}
                <div className="p-5 pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-slate-100 rounded-xl">
                        {getClassIcon(cls)}
                      </div>
                      <span className="font-extrabold text-xl text-slate-900 font-heading">
                        {cls}
                      </span>
                    </div>

                    {isClass10 ? (
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 tracking-wider">
                        Board Special
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-400">
                        {meta.studentCount}
                      </span>
                    )}
                  </div>

                  <div className="font-bold text-sm text-slate-800 mb-1.5">
                    {meta.tagline}
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mb-4 min-h-[48px]">
                    {meta.description}
                  </p>

                  {/* Core Subjects Included */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Core Subjects:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {meta.subjects.map(sub => (
                        <span
                          key={sub}
                          className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3 Explicit Action Buttons Required */}
                <div className="p-4 pt-2 bg-slate-50/70 border-t border-slate-100 space-y-2 mt-auto">
                  <button
                    onClick={() => navigateToClass(cls)}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Class Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => navigateToSyllabus(cls)}
                      className="py-1.5 px-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-semibold transition flex items-center justify-center gap-1"
                    >
                      <BookOpen className="w-3 h-3 text-blue-600" />
                      <span>Syllabus</span>
                    </button>

                    <button
                      onClick={() => navigateToNotes(cls)}
                      className="py-1.5 px-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-semibold transition flex items-center justify-center gap-1"
                    >
                      <FileText className="w-3 h-3 text-emerald-600" />
                      <span>Notes</span>
                    </button>
                  </div>

                  <button
                    onClick={() => navigateToTests(cls)}
                    className="w-full py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1"
                  >
                    <CheckSquare className="w-3 h-3 text-blue-600" />
                    <span>Take Mock Test</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
