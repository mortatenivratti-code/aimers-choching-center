import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Achiever } from '../types';
import {
  Award,
  Trophy,
  Star,
  TrendingUp,
  Percent,
  CheckCircle2,
  Settings,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';

export const ResultsGalleryView: React.FC = () => {
  const { achievers, setCurrentView, setIsDemoModalOpen } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('All');

  const categories = [
    'All',
    'Top Performers',
    'Board Results',
    'Subject Toppers',
    'Most Improved Students'
  ];

  const filteredAchievers = achievers.filter(a => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    const matchClass = selectedClassFilter === 'All' || a.class === selectedClassFilter;
    return matchCat && matchClass;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            Hall of Fame & Academic Excellence
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
            Student Results & Achievers Showcase
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Celebrating consistent effort, conceptual breakthroughs, and top board examination scores across Classes 6 to 10.
          </p>
        </div>

        {/* Chate-Inspired Trust Stats Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black font-heading text-amber-400">98.4%</div>
            <div className="text-xs font-bold text-slate-200 mt-1">Class 10 Highest Score</div>
            <div className="text-[10px] text-blue-200">State & CBSE Combined</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-heading text-emerald-400">38+</div>
            <div className="text-xs font-bold text-slate-200 mt-1">Students Above 90%</div>
            <div className="text-[10px] text-blue-200">Academic Year 2025–26</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-heading text-sky-400">14</div>
            <div className="text-xs font-bold text-slate-200 mt-1">100/100 Perfect Scores</div>
            <div className="text-[10px] text-blue-200">In Maths & Science</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-heading text-rose-400">+25.4%</div>
            <div className="text-xs font-bold text-slate-200 mt-1">Avg. Score Improvement</div>
            <div className="text-[10px] text-blue-200">From Joining to Boards</div>
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Categories: Top Performers | Board Results | Subject Toppers | Most Improved */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Class Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Class:</span>
            <select
              value={selectedClassFilter}
              onChange={e => setSelectedClassFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Classes (6–10)</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 7">Class 7</option>
              <option value="Class 6">Class 6</option>
            </select>
          </div>
        </div>

        {/* Achievers Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievers.map(ach => (
            <div
              key={ach.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Photo Header with Badge Overlay */}
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={ach.photoUrl}
                    alt={ach.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 font-bold text-[10px] uppercase tracking-wider border border-white/20">
                      {ach.category}
                    </span>
                  </div>

                  {/* Year Tag */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 text-slate-800 font-bold text-[10px]">
                      {ach.year}
                    </span>
                  </div>

                  {/* Bottom Score Overlay */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <div className="text-xl font-black font-heading">{ach.score}</div>
                      <div className="text-[11px] text-slate-200 font-medium">{ach.class} • {ach.board}</div>
                    </div>
                  </div>
                </div>

                {/* Details Container */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-black text-slate-900 font-heading">
                    {ach.name}
                  </h3>

                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs font-semibold text-blue-900 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{ach.subjectAchievement}</span>
                  </div>

                  {ach.quote && (
                    <p className="text-xs text-slate-600 leading-relaxed italic border-l-2 border-slate-300 pl-3 py-1">
                      "{ach.quote}"
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="p-5 pt-0 mt-auto flex items-center justify-between border-t border-slate-100 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Board Record
                </span>
                <span className="font-mono">{ach.year} Batch</span>
              </div>
            </div>
          ))}
        </div>

        {/* Transparency & CMS Note */}
        <div className="p-6 bg-slate-100 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              All student achievements and percentages shown are genuine and backed by verified school mark sheets.
            </span>
          </div>

          <button
            onClick={() => setCurrentView('admin-cms')}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 text-xs flex items-center gap-1.5 transition shrink-0"
          >
            <Settings className="w-3.5 h-3.5 text-slate-600" />
            <span>Manage Achievers in CMS</span>
          </button>
        </div>

      </div>
    </div>
  );
};
