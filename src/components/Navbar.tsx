import React, { useState } from 'react';
import { Language, PageType } from '../types';
import { TRANSLATIONS } from '../data/eygnData';
import { Search, Globe, Menu, X, ChevronDown, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  language,
  onLanguageChange,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = TRANSLATIONS[language];

  const navItems: { id: PageType; label: string }[] = [
    { id: 'home', label: t.home },
    { id: 'about', label: t.about },
    { id: 'programs', label: t.programs },
    { id: 'team', label: t.team },
    { id: 'media', label: t.media },
    { id: 'membership', label: t.membership },
    { id: 'contact', label: t.contact },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Museum / Institutional Operational Utility Ribbon */}
      <div className="bg-[#1a2805] text-[#fcfdfa] text-[11px] py-1.5 px-4 sm:px-8 border-b border-[#06592b]/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 truncate">
            <span className="flex items-center gap-1 text-[#f3a310] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f3a310] animate-pulse" />
              <span>GLOBAL REPATRIATION & INNOVATION INITIATIVE</span>
            </span>
            <span className="text-white/40 hidden sm:inline">·</span>
            <span className="text-white/70 hidden sm:inline truncate">
              Connecting Ethiopian youth worldwide to serve the nation
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/70 text-[11px] shrink-0 font-medium">
            <span className="hidden md:inline">HQ: Adwa Memorial Complex, Addis Ababa</span>
            <span className="text-[#f3a310]">Q1 2026 Cohort Open</span>
          </div>
        </div>
      </div>

      {/* Main One-Row, Three-Zone Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#ffffff] border-b border-stone-200 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06592b] rounded-lg py-1"
          >
            {/* National emblem badge */}
            <div className="w-10 h-10 rounded-lg bg-[#1a2805] text-[#f3a310] flex items-center justify-center font-bold text-sm tracking-tight border border-[#f3a310]/30 shadow-sm shrink-0">
              EYGN
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#1a2805] leading-tight hover:text-[#06592b] transition-colors whitespace-nowrap">
                Ethiopian Youth Global Network
              </span>
              <span className="text-[11px] text-[#06592b] font-medium hidden sm:block">
                Connecting and Empowering
              </span>
            </div>
          </button>

          {/* Zone 2: 4-6 Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-[15px] font-medium py-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#06592b] font-semibold'
                      : 'text-stone-700 hover:text-[#1a2805]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f3a310] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 Primary actions + Utilities */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick search affordance */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="p-2.5 text-stone-600 hover:text-[#1a2805] hover:bg-stone-100 rounded-lg transition-colors"
              title="Search repository (Cmd+K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Switcher Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#06592b]" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-stone-500" />
              </button>

              {langDropdownOpen && (
                <div
                  className="absolute right-0 mt-1.5 w-36 bg-white rounded-lg shadow-xl border border-stone-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setLangDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onLanguageChange('en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-stone-100 ${
                      language === 'en' ? 'font-bold text-[#06592b]' : 'text-stone-700'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-[#06592b]" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onLanguageChange('am');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-stone-100 ${
                      language === 'am' ? 'font-bold text-[#06592b]' : 'text-stone-700'
                    }`}
                  >
                    <span>አማርኛ (Amharic)</span>
                    {language === 'am' && <span className="w-1.5 h-1.5 rounded-full bg-[#06592b]" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onLanguageChange('fr');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-stone-100 ${
                      language === 'fr' ? 'font-bold text-[#06592b]' : 'text-stone-700'
                    }`}
                  >
                    <span>Français</span>
                    {language === 'fr' && <span className="w-1.5 h-1.5 rounded-full bg-[#06592b]" />}
                  </button>
                </div>
              )}
            </div>

            {/* Primary CTA Button: Buttons: 16px, Medium, sentence case */}
            <button
              type="button"
              onClick={() => handleNavClick('membership')}
              className="px-4.5 py-2.5 text-[16px] font-medium text-[#1a2805] bg-[#f3a310] hover:bg-[#e09407] rounded-xl shadow-xs transition-all whitespace-nowrap transform active:scale-95"
            >
              {t.joinNetwork}
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white/98 px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                  currentPage === item.id
                    ? 'bg-[#1a2805] text-[#f3a310]'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{item.label}</span>
                {currentPage === item.id && (
                  <span className="w-2 h-2 rounded-full bg-[#f3a310]" />
                )}
              </button>
            ))}

            <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <span>Language:</span>
              <div className="flex gap-1">
                {(['en', 'am', 'fr'] as Language[]).map(l => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => {
                      onLanguageChange(l);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2 py-1 uppercase font-semibold rounded ${
                      language === l ? 'bg-[#06592b] text-white' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
