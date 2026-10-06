import React, { useState } from 'react';
import { useApp, AppView } from '../context/AppContext';
import {
  GraduationCap,
  ChevronDown,
  BookOpen,
  FileCheck2,
  Award,
  LayoutDashboard,
  Menu,
  X,
  FileText,
  Settings,
  Sparkles,
  Info,
  Phone
} from 'lucide-react';
import { TargetClass } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    selectedClass,
    navigateToClass,
    navigateToNotes,
    navigateToSyllabus,
    navigateToTests,
    setIsDemoModalOpen,
    setIsMarketingKitModalOpen,
    authUser,
    signInWithGoogle,
    signOutUser
  } = useApp();

  const [classesOpen, setClassesOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const classesList: TargetClass[] = [
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9',
    'Class 10'
  ];

  const classDescriptions: Record<TargetClass, string> = {
    'Class 6': 'Foundation Building & Core Basics',
    'Class 7': 'Concept Strengthening & Logic',
    'Class 8': 'Analytical Practice & Olympiad Base',
    'Class 9': 'Pre-Board Rigour & Problem Solving',
    'Class 10': 'Board Exam Blueprint & PYQ Mastery'
  };

  const navItemClass = (active: boolean) =>
    `px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
      active
        ? 'text-blue-700 bg-blue-50/90 font-bold'
        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/80'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Clean Brand Wordmark (No subtitle or stat pill clutter) */}
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-700 transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg sm:text-xl text-slate-950 tracking-tight font-heading">
              Aimers Coaching Class
            </span>
          </button>

          {/* Primary Desktop Navigation (5 Clean Top-Level Items) */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setCurrentView('home')}
              className={navItemClass(currentView === 'home')}
            >
              Home
            </button>

            {/* 2. Classes Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setClassesOpen(true)}
              onMouseLeave={() => setClassesOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 ${navItemClass(
                  currentView === 'class-dashboard'
                )}`}
              >
                <span>Classes 6–10</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {classesOpen && (
                <div className="absolute left-0 w-64 pt-1.5 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 space-y-0.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1.5">
                      Academic Grade Portals
                    </div>
                    {classesList.map(cls => (
                      <button
                        key={cls}
                        onClick={() => {
                          navigateToClass(cls);
                          setClassesOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex flex-col cursor-pointer ${
                          selectedClass === cls && currentView === 'class-dashboard'
                            ? 'bg-blue-50 text-blue-700 font-bold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-blue-700'
                        }`}
                      >
                        <span className="font-bold text-sm text-slate-900">{cls}</span>
                        <span className="text-[11px] text-slate-500">{classDescriptions[cls]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Academic Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setPortalOpen(true)}
              onMouseLeave={() => setPortalOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 ${navItemClass(
                  currentView === 'syllabus' ||
                    currentView === 'notes' ||
                    currentView === 'mock-tests' ||
                    currentView === 'results-gallery'
                )}`}
              >
                <span>Academic Portal</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {portalOpen && (
                <div className="absolute left-0 w-68 pt-1.5 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 space-y-0.5">
                    <button
                      onClick={() => {
                        navigateToSyllabus();
                        setPortalOpen(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 transition-colors flex items-start gap-2.5 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-bold text-slate-900">Interactive Syllabus Tracker</div>
                        <div className="text-[11px] text-slate-500">State Board SSC & CBSE blueprints</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        navigateToNotes();
                        setPortalOpen(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 transition-colors flex items-start gap-2.5 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-bold text-slate-900">Chapter Notes & Offline PDFs</div>
                        <div className="text-[11px] text-slate-500">Formula sheets, derivations & solved Qs</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        navigateToTests();
                        setPortalOpen(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 transition-colors flex items-start gap-2.5 cursor-pointer"
                    >
                      <FileCheck2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-bold text-slate-900">Online Mock Test Series</div>
                        <div className="text-[11px] text-slate-500">Timed chapter & full-board simulators</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentView('results-gallery');
                        setPortalOpen(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 transition-colors flex items-start gap-2.5 cursor-pointer"
                    >
                      <Award className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-bold text-slate-900">Board Toppers & Results</div>
                        <div className="text-[11px] text-slate-500">Verified academic achievers gallery</div>
                      </div>
                    </button>

                    <div className="pt-1 mt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setIsMarketingKitModalOpen(true);
                          setPortalOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-800">Institute Poster & Banner Studio</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Student Dashboard */}
            <button
              onClick={() => setCurrentView('student-dashboard')}
              className={navItemClass(currentView === 'student-dashboard')}
            >
              Student Dashboard
            </button>

            {/* 5. Contact & Admissions */}
            <button
              onClick={() => setCurrentView('contact')}
              className={navItemClass(currentView === 'contact' || currentView === 'about')}
            >
              Admissions & Contact
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => setCurrentView('admin-cms')}
              className={`p-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                currentView === 'admin-cms'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title="Administrative CMS"
            >
              <Settings className="w-4 h-4" />
            </button>

            {authUser ? (
              <button
                onClick={() => void signOutUser()}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                title={`Signed in as ${authUser.email}`}
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => void signInWithGoogle()}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
              >
                Student Sign In
              </button>
            )}

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Schedule Free Demo
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg"
            >
              Free Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => {
                setCurrentView('student-dashboard');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-blue-50 border border-blue-100 rounded-lg text-left flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-blue-700" />
              <div className="text-xs">
                <div className="font-bold text-slate-900">Student Portal</div>
                <div className="text-[10px] text-slate-600">Study Plan & Progress</div>
              </div>
            </button>

            <button
              onClick={() => {
                setCurrentView('admin-cms');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-left flex items-center gap-2"
            >
              <Settings className="w-4 h-4 text-slate-700" />
              <div className="text-xs">
                <div className="font-bold text-slate-900">Admin CMS</div>
                <div className="text-[10px] text-slate-500">Portal Management</div>
              </div>
            </button>
          </div>

          {/* Mobile Classes Grid */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Select Grade
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {classesList.map(cls => (
                <button
                  key={cls}
                  onClick={() => {
                    navigateToClass(cls);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 text-xs font-bold rounded-lg text-center transition ${
                    selectedClass === cls && currentView === 'class-dashboard'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cls.replace('Class ', 'C')}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => {
                setCurrentView('home');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigateToSyllabus();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              Interactive Syllabus Tracker
            </button>
            <button
              onClick={() => {
                navigateToNotes();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              Chapter Notes & Offline PDFs
            </button>
            <button
              onClick={() => {
                navigateToTests();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              Online Mock Tests
            </button>
            <button
              onClick={() => {
                setCurrentView('results-gallery');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              Board Toppers & Results
            </button>
            <button
              onClick={() => {
                setCurrentView('about');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50 flex items-center gap-2"
            >
              <Info className="w-4 h-4 text-slate-400" />
              <span>About Aimers Coaching Class</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('contact');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-slate-400" />
              <span>Admissions & Contact Desk</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setIsDemoModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm"
            >
              Schedule Free Demo Class
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
