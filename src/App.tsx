import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { EventItem, Language } from './types';
import { ROUTES } from './lib/routes';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { TeamPage } from './pages/TeamPage';
import { MediaPage } from './pages/MediaPage';
import { MembershipPage } from './pages/MembershipPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { EventRegistrationModal } from './components/EventRegistrationModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';

/** Scrolls to the top of the page on every route change (standard react-router pattern --
 * the browser doesn't do this on its own for client-side navigation). */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

export default function App() {
  const [language, setLanguage] = useState<Language>('en');

  // Modal states
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfa] text-[#1a2805] font-sans antialiased">
      <ScrollToTop />

      {/* Strict Top Bar Navigation */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Page Canvas */}
      <main className="flex-1">
        <Routes>
          <Route
            path={ROUTES.home}
            element={
              <HomePage
                language={language}
                onSelectPost={setSelectedPostSlug}
                onRegisterEvent={setSelectedEvent}
              />
            }
          />
          <Route path={ROUTES.about} element={<AboutPage />} />
          <Route
            path={ROUTES.programs}
            element={<ProgramsPage onRegisterEvent={setSelectedEvent} />}
          />
          <Route path={ROUTES.team} element={<TeamPage />} />
          <Route path={ROUTES.media} element={<MediaPage onSelectPost={setSelectedPostSlug} />} />
          <Route path={ROUTES.membership} element={<MembershipPage />} />
          <Route path={ROUTES.contact} element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <ArticleReaderModal
        slug={selectedPostSlug}
        onClose={() => setSelectedPostSlug(null)}
      />

      <EventRegistrationModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectPost={setSelectedPostSlug}
      />
    </div>
  );
}
