import React, { useState, useEffect } from 'react';
import { EventItem, Language, PageType } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { TeamPage } from './pages/TeamPage';
import { MediaPage } from './pages/MediaPage';
import { MembershipPage } from './pages/MembershipPage';
import { ContactPage } from './pages/ContactPage';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { EventRegistrationModal } from './components/EventRegistrationModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';

import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
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

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfa] text-[#1a2805] font-sans antialiased selection:bg-[#f3a310]/30">
      {/* Strict Top Bar Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
        onLanguageChange={setLanguage}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Page Canvas with Smooth Page Transitions */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentPage === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                language={language}
                onSelectPost={setSelectedPostSlug}
                onRegisterEvent={setSelectedEvent}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'programs' && (
              <ProgramsPage
                onNavigate={handleNavigate}
                onRegisterEvent={setSelectedEvent}
              />
            )}

            {currentPage === 'team' && (
              <TeamPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'media' && (
              <MediaPage onSelectPost={setSelectedPostSlug} />
            )}

            {currentPage === 'membership' && (
              <MembershipPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'contact' && (
              <ContactPage />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

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
        onNavigate={handleNavigate}
      />
    </div>
  );
}
