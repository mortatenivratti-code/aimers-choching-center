import React from 'react';
import { BookOpen, Edit3, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';

export const LearningProcess: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Learn',
      subtitle: 'Understand concepts with expert teaching.',
      description: 'Interactive classroom and digital lectures breaking down complex theorems into intuitive visual real-life examples.',
      icon: BookOpen,
      accent: 'bg-blue-600 text-white shadow-blue-500/30'
    },
    {
      num: '02',
      title: 'Practice',
      subtitle: 'Solve questions and examples.',
      description: 'Step-by-step NCERT textbook questions, exemplar problems, and curated chapter worksheets with varying difficulty.',
      icon: Edit3,
      accent: 'bg-indigo-600 text-white shadow-indigo-500/30'
    },
    {
      num: '03',
      title: 'Test',
      subtitle: 'Take regular mock tests.',
      description: 'Timed online chapter quizzes, weekend unit tests, and authentic board exam pattern mock evaluations.',
      icon: CheckCircle2,
      accent: 'bg-amber-600 text-white shadow-amber-500/30'
    },
    {
      num: '04',
      title: 'Improve',
      subtitle: 'Analyse mistakes and strengthen weak topics.',
      description: 'Diagnostic performance report cards, 1-on-1 faculty doubt clearing, and customized practice for weaker areas.',
      icon: TrendingUp,
      accent: 'bg-emerald-600 text-white shadow-emerald-500/30'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2">
            The 4-Step Academic Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
            How Aimers Coaching Class Students Succeed
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            A seamless methodology that takes you from initial concept confusion to total examination readiness.
          </p>
        </div>

        {/* Desktop Horizontal Timeline & Mobile Vertical Timeline */}
        <div className="relative">
          {/* Timeline Connector Bar (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-16 right-16 h-0.5 bg-slate-200 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-blue-300 transition-all shadow-xs flex flex-col justify-between group hover:-translate-y-1 duration-200"
                >
                  <div>
                    {/* Top Step Icon with Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-md ${step.accent}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono font-black text-2xl text-slate-300 group-hover:text-blue-500 transition-colors">
                        {step.num}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 font-heading mb-1">
                      {step.title}
                    </h3>
                    <div className="text-xs font-bold text-blue-700 mb-2">
                      {step.subtitle}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                    <span>Phase {step.num} of 04</span>
                    {idx < 3 && <ArrowRight className="w-3.5 h-3.5 text-slate-400 lg:hidden" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
