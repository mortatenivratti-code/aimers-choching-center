import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Quote, Settings, UserCheck } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  const { testimonials, setCurrentView } = useApp();
  const [filterRole, setFilterRole] = useState<'All' | 'Student' | 'Parent'>('All');

  const filtered = filterRole === 'All'
    ? testimonials
    : testimonials.filter(t => t.role === filterRole);

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">
              Verified Student & Parent Reviews
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
              Loved by Students. Trusted by Parents.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Read how consistent mentorship and mock tests transformed real school performance.
            </p>
          </div>

          {/* Role Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setFilterRole('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterRole === 'All'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Feedback
            </button>
            <button
              onClick={() => setFilterRole('Student')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterRole === 'Student'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Students
            </button>
            <button
              onClick={() => setFilterRole('Parent')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterRole === 'Parent'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Parents
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(t => (
            <div
              key={t.id}
              className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all"
            >
              <div>
                {/* 5 Stars Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Highlight Tagline */}
                <div className="text-xs font-bold text-slate-900 mb-2 font-heading">
                  "{t.highlight}"
                </div>

                {/* Main Content */}
                <p className="text-xs text-slate-600 leading-relaxed italic mb-6">
                  "{t.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/70">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="font-semibold text-blue-700">{t.role}</span>
                    <span>•</span>
                    <span>{t.class}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
