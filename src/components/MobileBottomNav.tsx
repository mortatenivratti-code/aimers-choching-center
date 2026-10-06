import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Layers, CheckSquare, FileText, PhoneCall } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentView, setCurrentView, navigateToClass, selectedClass } = useApp();

  // If in active distraction-free test interface, do not display mobile bottom nav
  if (currentView === 'test-interface') return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-2 py-1.5 safe-area-inset-bottom">
      <div className="grid grid-cols-5 gap-1 text-center">
        <button
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            currentView === 'home'
              ? 'text-blue-700 font-bold'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => {
            navigateToClass(selectedClass);
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            currentView === 'class-dashboard'
              ? 'text-blue-700 font-bold'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Classes</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('mock-tests');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            currentView === 'mock-tests' || currentView === 'test-result'
              ? 'text-blue-700 font-bold'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <CheckSquare className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Tests</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('notes');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            currentView === 'notes' || currentView === 'syllabus'
              ? 'text-blue-700 font-bold'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <FileText className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Notes</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            currentView === 'contact'
              ? 'text-blue-700 font-bold'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <PhoneCall className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Contact</span>
        </button>
      </div>
    </div>
  );
};
