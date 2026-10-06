import React from 'react';
import {
  GraduationCap,
  HeartHandshake,
  FileText,
  CheckSquare,
  HelpCircle,
  TrendingUp
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      num: '01',
      title: 'Senior Board-Specialist Faculty',
      description:
        'Educators with 10+ years of experience in Maharashtra State Board (SSC) and CBSE curriculum instruction and paper evaluation.',
      icon: GraduationCap,
      color: 'text-blue-700 bg-blue-50 border-blue-200'
    },
    {
      num: '02',
      title: '25-Student Classroom Batch Cap',
      description:
        'Strictly capped batch sizes ensure every student receives individual attention, copy checking, and personalized mentoring.',
      icon: HeartHandshake,
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200'
    },
    {
      num: '03',
      title: 'Chapter-Wise Offline PDF Notes',
      description:
        'Downloadable revision handouts with formula sheets, labelled ray diagrams, chemical equations, and solved textbook proofs.',
      icon: FileText,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      num: '04',
      title: 'Weekly OMR & Digital Mock Tests',
      description:
        'Sunday chapter assessments and full-length board simulation papers conducted under timed examination conditions.',
      icon: CheckSquare,
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    {
      num: '05',
      title: 'Daily Dedicated Doubt Clinic',
      description:
        '45-minute post-lecture doubt resolution sessions alongside 24/7 digital doubt submission on the student portal.',
      icon: HelpCircle,
      color: 'text-rose-700 bg-rose-50 border-rose-200'
    },
    {
      num: '06',
      title: 'Chapter-Level Progress Analytics',
      description:
        'Live syllabus completion percentages, topic checklists, and automated WhatsApp test report cards for parents.',
      icon: TrendingUp,
      color: 'text-cyan-700 bg-cyan-50 border-cyan-200'
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">
            The Aimers Coaching Class Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
            Engineered for Consistent Academic Improvement
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            A structured pedagogical system combining classroom discipline with digital revision tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-slate-200/90 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-11 h-11 rounded-lg border flex items-center justify-center ${item.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400 tabular-nums">
                    {item.num}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
