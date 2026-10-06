import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart,
  BarChart3,
  CalendarCheck,
  AlertCircle,
  Award,
  Clock,
  MessageSquareQuote,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

export const ParentSection: React.FC = () => {
  const { setIsDemoModalOpen } = useApp();

  const features = [
    {
      icon: BarChart3,
      title: 'Detailed Test Performance',
      desc: 'Instant WhatsApp scorecards after every Sunday mock test with marks, accuracy %, and class ranking.'
    },
    {
      icon: CalendarCheck,
      title: 'Real-Time Attendance',
      desc: 'Automated SMS alerts within 15 minutes if your child misses a classroom session or arrives late.'
    },
    {
      icon: AlertCircle,
      title: 'Weak Topics Flagging',
      desc: 'Clear diagnosis of which specific chapters (e.g. Trigonometry or Chemical Reactions) require extra revision.'
    },
    {
      icon: Award,
      title: 'Strong Subjects Recognition',
      desc: 'Celebrate strengths and nurture potential for science and maths Olympiads and NTSE foundation.'
    },
    {
      icon: Clock,
      title: 'Upcoming Tests Calendar',
      desc: 'Access your child’s 30-day exam roadmap in advance so homework and school tests don’t clash.'
    },
    {
      icon: MessageSquareQuote,
      title: 'Direct Teacher Feedback',
      desc: 'Monthly one-on-one parent-faculty sessions to discuss focus, study habits, and psychological well-being.'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-blue-50/50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl overflow-hidden relative">
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Side: Overview & Features */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-bold uppercase tracking-widest text-blue-700">
                Parent Partnership & Transparency
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
                Stay Connected With Your Child's Progress
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We believe that true academic excellence is built on a tripartite partnership: the dedicated student, the inspiring teacher, and the informed, supportive parent. No guesswork, no exam surprises.
              </p>

              {/* 6 Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {features.map((f, idx) => {
                  const Icon = f.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="p-2 bg-blue-100/80 text-blue-700 rounded-lg shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{f.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Talk to Our Counsellor</span>
                </button>

                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero spam • Confidential counselling</span>
                </div>
              </div>
            </div>

            {/* Right Side: Visual Parent Dashboard Preview Mockup */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-2xl border border-slate-800 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <div className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                      Parent Companion App
                    </div>
                    <div className="text-base font-bold font-heading">
                      Aditya Sharma • Class 10 CBSE
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-bold tabular-nums">
                    Attendance 98%
                  </span>
                </div>

                {/* Score Summary */}
                <div className="bg-slate-800/80 p-4 rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">Sunday Mock Exam #8:</span>
                    <span className="text-emerald-400 font-bold">88 / 100 (Top 5%)</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '88%' }} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="text-slate-300">
                      Maths: <strong className="text-white">96%</strong>
                    </div>
                    <div className="text-slate-300">
                      Science: <strong className="text-white">82%</strong>
                    </div>
                  </div>
                </div>

                {/* Weak Topic Alert */}
                <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Focus Area Identified:
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Light Ray Diagrams (Needs 2 practice drills). Teacher has assigned targeted revision worksheet.
                  </p>
                </div>

                {/* Teacher Note */}
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/60 text-xs text-slate-300">
                  <span className="text-blue-400 font-semibold block mb-0.5">Teacher Remark:</span>
                  "Aditya is showing great speed in algebra. Daily 20 mins revision of chemical equations will easily push his score above 95%."
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
