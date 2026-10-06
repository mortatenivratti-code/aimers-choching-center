import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToastContainer } from './components/ToastContainer';
import { DemoBookingModal } from './components/Modals/DemoBookingModal';
import { AskDoubtModal } from './components/Modals/AskDoubtModal';
import { NoteReaderModal } from './components/Modals/NoteReaderModal';
import { MarketingKitModal } from './components/Modals/MarketingKitModal';

// Views
import { HomeView } from './views/HomeView';
import { ClassDashboardView } from './views/ClassDashboardView';
import { SyllabusView } from './views/SyllabusView';
import { NotesView } from './views/NotesView';
import { MockTestsView } from './views/MockTestsView';
import { TestInterfaceView } from './views/TestInterfaceView';
import { TestResultView } from './views/TestResultView';
import { ResultsGalleryView } from './views/ResultsGalleryView';
import { StudentDashboardView } from './views/StudentDashboardView';
import { AdminCmsView } from './views/AdminCmsView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const isDistractionFree = currentView === 'test-interface';

  const renderView = () => {
    switch (currentView) {
      case 'class-dashboard':
        return <ClassDashboardView />;
      case 'syllabus':
        return <SyllabusView />;
      case 'notes':
        return <NotesView />;
      case 'mock-tests':
        return <MockTestsView />;
      case 'test-interface':
        return <TestInterfaceView />;
      case 'test-result':
        return <TestResultView />;
      case 'results-gallery':
        return <ResultsGalleryView />;
      case 'student-dashboard':
        return <StudentDashboardView />;
      case 'admin-cms':
        return <AdminCmsView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'home':
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navbar is hidden only in distraction-free active test mode */}
      {!isDistractionFree && <Navbar />}

      <main className="flex-1">
        {renderView()}
      </main>

      {/* Footer is hidden in distraction-free active test mode */}
      {!isDistractionFree && <Footer />}

      {/* Sticky Mobile Bottom Navigation (Classes 6-10, Tests, Notes, Contact) */}
      {!isDistractionFree && <MobileBottomNav />}

      {/* Global Modals & Notifications */}
      <DemoBookingModal />
      <AskDoubtModal />
      <NoteReaderModal />
      <MarketingKitModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
