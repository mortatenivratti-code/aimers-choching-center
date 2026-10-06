import React from 'react';
import { useApp } from '../context/AppContext';
import { TargetClass } from '../types';
import {
  ArrowRight,
  CheckCircle2,
  BookOpen,
  FileText,
  Award,
  MapPin,
  HelpCircle
} from 'lucide-react';

export const Hero: React.FC = () => {
  const {
    setIsDemoModalOpen,
    setIsDoubtModalOpen,
    navigateToClass,
    navigateToNotes,
    selectedClass
  } = useApp();

  const classesList: TargetClass[] = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Core Institutional Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Editorial Overline (Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-700">
              <span>Aimers Coaching Class</span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                2W5X+P79, Palam, Maharashtra 431720
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-950 font-heading tracking-tight leading-[1.08]">
              Structured Classroom & Digital Mastery for{' '}
              <span className="text-blue-700">Classes 6 to 10.</span>
            </h1>

            {/* Concrete Value Proposition */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
              Rigorous board exam preparation across{' '}
              <span className="font-semibold text-slate-900">Maharashtra State Board (SSC)</span> and{' '}
              <span className="font-semibold text-slate-900">CBSE</span> curricula—combining 25-student classroom batches, downloadable chapter-wise PDF notes, and weekly mock assessments.
            </p>

            {/* Interactive Quick Grade Selector */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 space-y-2.5 max-w-2xl">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-slate-500">
                  Direct Academic Portal Access:
                </span>
                <span className="text-slate-500 font-medium">
                  Active Grade: <strong className="text-blue-700">{selectedClass}</strong>
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {classesList.map(cls => (
                  <button
                    key={cls}
                    onClick={() => navigateToClass(cls)}
                    className={`py-2 px-2 rounded-lg text-xs font-bold transition border cursor-pointer ${
                      selectedClass === cls
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:text-blue-700'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Schedule Free Demo Class</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateToNotes(selectedClass)}
                className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Download Chapter PDFs</span>
              </button>

              <button
                onClick={() => setIsDoubtModalOpen(true)}
                className="px-4 py-3.5 text-slate-700 hover:text-blue-700 hover:bg-slate-50 font-semibold text-xs rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Ask Academic Doubt</span>
              </button>
            </div>

            {/* Institutional Credentials Strip */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Board Syllabus Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>English, Semi-English & Marathi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Weekly Parent SMS Scorecards</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Institutional Frame */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-xl">
              <div className="relative">
                <img
                  src="/src/assets/images/aimers_coaching_hero_1791307527641.jpg"
                  alt="Er. Giriraj Lokhande Sir felicitating Class 10 board topper at Aimers Coaching Class, Palam"
                  referrerPolicy="no-referrer"
                  className="w-full h-72 sm:h-88 object-cover object-center brightness-95"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-1">
                    Admissions Open • 2026–27 Academic Session
                  </div>
                  <div className="text-lg font-bold font-heading">
                    Dedicated Mentorship in Palam, Maharashtra
                  </div>
                </div>
              </div>

              {/* Structured Bottom Academic Specification Grid */}
              <div className="p-5 bg-slate-900 text-white grid grid-cols-3 divide-x divide-slate-800 text-center">
                <div className="px-2">
                  <div className="text-xl font-black font-heading tabular-nums text-white">25</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Max Batch Size</div>
                </div>
                <div className="px-2">
                  <div className="text-xl font-black font-heading tabular-nums text-emerald-400">
                    98.4%
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">SSC & CBSE Pass</div>
                </div>
                <div className="px-2">
                  <div className="text-xl font-black font-heading tabular-nums text-amber-400">
                    500+
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Chapter PDFs & Tests</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
