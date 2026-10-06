import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, CheckCircle2, FileText, Award } from 'lucide-react';

export const TrustCounters: React.FC = () => {
  const { stats } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-5 h-5 text-blue-600" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-indigo-600" />;
      case 'Award':
      default:
        return <Award className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <section className="bg-slate-950 text-white border-b border-slate-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex flex-col items-start text-left ${
                index !== 0 ? 'pt-4 sm:pt-0 sm:pl-6 lg:pl-8' : ''
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                {getIcon(stat.iconName)}
                <span>{stat.label}</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
