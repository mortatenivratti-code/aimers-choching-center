import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { TargetClass } from '../types';

export const Footer: React.FC = () => {
  const {
    setCurrentView,
    navigateToClass,
    navigateToNotes,
    navigateToSyllabus,
    navigateToTests
  } = useApp();

  const classes: TargetClass[] = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-24 lg:pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight font-heading">
                  Aimers <span className="text-blue-500">Coaching Class</span>
                </span>
                <p className="text-[11px] text-slate-500">
                  Classes 6–10 Coaching & Digital Learning Portal
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              "Strong Concepts. Smart Preparation. Better Results." Providing dedicated, board-aligned academic excellence for school and board examinations across CBSE and State Boards.
            </p>

            <div className="pt-2 space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>2W5X+P79, Palam, Maharashtra 431720</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+919763986833" className="hover:text-white transition">
                  Helpline: +91 97639 86833
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>info@aimerscoaching.edu.in</span>
              </div>
            </div>
          </div>

          {/* Column 1: Company */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm font-heading tracking-wide uppercase">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setCurrentView('about')} className="hover:text-white transition">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('about')} className="hover:text-white transition">
                  Faculty & Mentors
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('results-gallery')} className="hover:text-white transition">
                  Results & Achievers
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:text-white transition">
                  Student Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('admin-cms')} className="hover:text-amber-400 transition font-medium">
                  Admin CMS Panel
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Academics */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm font-heading tracking-wide uppercase">
              Academics
            </h4>
            <ul className="space-y-2">
              {classes.map(cls => (
                <li key={cls}>
                  <button
                    onClick={() => navigateToClass(cls)}
                    className="hover:text-white transition"
                  >
                    {cls} Learning Hub
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Study & Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm font-heading tracking-wide uppercase">
              Study Portal
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateToSyllabus()} className="hover:text-white transition">
                  Interactive Syllabus
                </button>
              </li>
              <li>
                <button onClick={() => navigateToNotes()} className="hover:text-white transition">
                  Chapter-wise Notes
                </button>
              </li>
              <li>
                <button onClick={() => navigateToTests()} className="hover:text-white transition">
                  500+ Online Mock Tests
                </button>
              </li>
              <li>
                <button onClick={() => navigateToNotes()} className="hover:text-white transition">
                  Practice Papers & PYQs
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('student-dashboard')} className="hover:text-blue-400 transition font-medium">
                  Student Dashboard
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 Aimers Coaching Class. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Admission Rules</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
