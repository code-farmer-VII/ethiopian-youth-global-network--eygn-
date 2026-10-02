import React, { useState } from 'react';
import { PageType } from '../types';
import { EYGN_INFO } from '../data/eygnData';
import { ApiRequestError, subscribeToNewsletter } from '../lib/api';
import { Mail, MapPin, Send, CheckCircle2, Globe, Shield, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { buttonHoverProps, transitionSmooth, viewportStandard } from '../utils/motion';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setSubscribeError(null);
    setIsSubscribing(true);
    try {
      await subscribeToNewsletter(newsletterEmail);
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    } catch (err) {
      setSubscribeError(err instanceof ApiRequestError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101b02] text-[#fcfdfa] border-t-2 border-[#f3a310]/40 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-dark-pattern opacity-25 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#06592b]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main footer columns */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportStandard}
        transition={transitionSmooth}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Col 1: Brand & Tagline (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#f3a310] text-[#1a2805] flex items-center justify-center font-bold text-sm shadow">
                EYGN
              </div>
              <h3 className="text-xl font-bold font-serif text-white tracking-tight">
                Ethiopian Youth Global Network
              </h3>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed">
              {EYGN_INFO.subtitle}
            </p>

            {/* Tagline Callout */}
            <div className="p-3.5 bg-white/5 border-l-2 border-[#f3a310] rounded-r-lg">
              <span className="text-[11px] uppercase tracking-wider text-[#f3a310] font-semibold block">
                Official Creed
              </span>
              <p className="text-sm font-serif italic text-white mt-0.5">
                "{EYGN_INFO.motto}"
              </p>
              <p className="text-xs text-[#fcfdfa]/60 mt-0.5">
                {EYGN_INFO.mottoAm}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-400">
              <MapPin className="w-4 h-4 text-[#f3a310] shrink-0" />
              <span>{EYGN_INFO.headquarters}</span>
            </div>
          </div>

          {/* Col 2: Strategic Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#f3a310]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#f3a310] hover:translate-x-0.5 transition-all duration-200 cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#f3a310] hover:translate-x-0.5 transition-all duration-200 cursor-pointer"
                >
                  About EYGN
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('programs')}
                  className="hover:text-[#f3a310] hover:translate-x-0.5 transition-all duration-200 cursor-pointer"
                >
                  Flagship programs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('team')}
                  className="hover:text-[#f3a310] hover:translate-x-0.5 transition-all duration-200 cursor-pointer"
                >
                  Leadership & directorate
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('media')}
                  className="hover:text-[#f3a310] hover:translate-x-0.5 transition-all duration-200 cursor-pointer"
                >
                  Media center
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('membership')}
                  className="hover:text-[#f3a310] hover:translate-x-0.5 transition-all duration-200 cursor-pointer"
                >
                  Join the network
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#f3a310] hover:translate-x-0.5 transition-all duration-200 cursor-pointer"
                >
                  Contact secretariat
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Inquiries & Contacts (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#f3a310]">
              Official Channels
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              {EYGN_INFO.officialEmails.map((item, idx) => (
                <li key={idx}>
                  <span className="text-[11px] text-stone-400 block">{item.label}</span>
                  <a
                    href={`mailto:${item.email}`}
                    className="font-mono text-white hover:text-[#f3a310] hover:translate-x-0.5 transition-all duration-200 flex items-center gap-1.5"
                  >
                    <Mail className="w-3 h-3 text-[#06592b]" />
                    <span className="truncate">{item.email}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter & Communiqué (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#f3a310]">
              Global Newsletter
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Receive quarterly diplomatic briefings, research calls, and chapter milestone reports.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#f3a310] transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubscribing}
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#f3a310] hover:bg-[#e09407] disabled:opacity-60 disabled:cursor-not-allowed text-[#1a2805] text-xs font-semibold rounded-md transition-colors flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </motion.button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-800/50 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Almost there — check your email to confirm your subscription.</span>
                </div>
              )}

              {subscribeError && (
                <div className="text-xs text-red-400 bg-red-950/40 p-2 rounded border border-red-800/50">
                  {subscribeError}
                </div>
              )}
            </form>

            <div className="pt-2">
              <span className="text-[11px] text-stone-400 block mb-1">Prepared by:</span>
              <p className="text-xs font-medium text-white">
                Mr. Amanuel Lemma · Head of Media & Communication
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-[#f3a310]" />
            <span>© {new Date().getFullYear()} Ethiopian Youth Global Network (EYGN). All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              {...buttonHoverProps}
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-[#f3a310] hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

