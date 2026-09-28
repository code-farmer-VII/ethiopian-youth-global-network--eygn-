import React, { useEffect, useState } from 'react';
import { EventItem, Language, PageType } from '../types';
import { EYGN_INFO, STATISTICS, UPCOMING_EVENTS, TRANSLATIONS } from '../data/eygnData';
import { listPosts, listPrograms, PostSummary, ProgramDto } from '../lib/api';
import { ChapterMap } from '../components/ChapterMap';
import { ArrowRight, Calendar, Sparkles, MapPin, ChevronRight, Globe, Shield, Ticket } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  language: Language;
  onSelectPost: (slug: string) => void;
  onRegisterEvent: (event: EventItem) => void;
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  language,
  onSelectPost,
  onRegisterEvent,
}) => {
  const t = TRANSLATIONS[language];
  const featuredEvents = UPCOMING_EVENTS.slice(0, 3);

  const [latestPosts, setLatestPosts] = useState<PostSummary[]>([]);
  const [featuredPrograms, setFeaturedPrograms] = useState<ProgramDto[]>([]);

  useEffect(() => {
    listPosts({ size: 3 })
      .then((res) => setLatestPosts(res.content))
      .catch(() => setLatestPosts([]));
    listPrograms()
      .then((res) => setFeaturedPrograms(res.slice(0, 3)))
      .catch(() => setFeaturedPrograms([]));
  }, []);

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-stone-200">
        {/* Background decorative subtle gradients */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-[500px] h-[500px] rounded-full bg-[#f3a310]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] rounded-full bg-[#06592b]/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Domain Kicker */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#06592b]">
                <span className="w-2 h-2 rounded-full bg-[#f3a310]" />
                <span>{t.heroKicker}</span>
                <span className="text-stone-300">·</span>
                <span className="text-stone-600 font-mono text-[11px]">DISPATCH Q1 2026</span>
              </div>

              {/* H1: 32-40px, Bold, Primary Green (#1a2805) */}
              <h1 className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold text-[#1a2805] tracking-tight leading-[1.16] text-balance">
                {EYGN_INFO.headline}
              </h1>

              {/* Body: 16px, Regular, Dark color */}
              <p className="text-[16px] text-[#1a2805] leading-relaxed max-w-2xl">
                {EYGN_INFO.subtitle}
              </p>

              {/* Action Buttons: 16px, Medium, sentence case */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('membership')}
                  className="px-6 py-3.5 bg-[#1a2805] hover:bg-[#06592b] text-[#f3a310] font-medium text-[16px] rounded-xl shadow-md transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span>{EYGN_INFO.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('programs')}
                  className="px-6 py-3.5 bg-white hover:bg-stone-50 text-[#1a2805] border border-stone-300 font-medium text-[16px] rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>{t.explorePrograms}</span>
                </button>
              </div>

              {/* Trust & Alignment Callout */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-stone-600">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#06592b]" />
                  <span>Structured & neutral mechanism</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-[#06592b]" />
                  <span>Global diaspora & homeland alignment</span>
                </div>
              </div>
            </div>

            {/* Right Visual Composition: Hero Artwork & Editorial Card */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute inset-0 bg-[#1a2805] rounded-2xl transform rotate-2 translate-x-2 translate-y-2 opacity-15" />
                
                {/* Main Hero Card: Primary Green #1a2805 with Gold #f3a310 Accent */}
                <div className="relative bg-[#1a2805] text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-[#f3a310]/30 overflow-hidden">
                  <div className="absolute inset-0 bg-dark-pattern opacity-30 pointer-events-none" />
                  
                  {/* Ethiopian Tri-color Accent Bar */}
                  <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-500 via-[#f3a310] to-red-500 rounded-full mb-6" />

                  <span className="text-[12px] font-semibold text-[#f3a310] uppercase tracking-wider block">
                    Strategic mandate
                  </span>
                  <h3 className="text-[22px] font-bold text-white mt-1 leading-snug">
                    Bridging diaspora excellence with homeland growth
                  </h3>
                  
                  <p className="text-[15px] text-stone-300 leading-relaxed mt-3">
                    Mobilizing thousands of Ethiopian scholars, engineers, and civic changemakers across North America, Europe, Africa, and the Middle East to accelerate Ethiopia's sustainable transformation.
                  </p>

                  <div className="my-6 pt-4 border-t border-white/15 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[11px] uppercase text-white/60 block">Next flagship assembly</span>
                      <span className="text-sm font-semibold text-[#f3a310] block mt-0.5">
                        Adwa Memorial Pavilion
                      </span>
                      <span className="text-xs text-white/80">April 18, 2026</span>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase text-white/60 block">Working focus</span>
                      <span className="text-sm font-semibold text-white block mt-0.5">
                        DEAIP & Green Legacy
                      </span>
                      <span className="text-xs text-white/80">COP Climate Cohort</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate('about')}
                    className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[16px] font-medium transition-colors flex items-center justify-center gap-2 border border-white/20 cursor-pointer"
                  >
                    <span>Read founding charter</span>
                    <ArrowRight className="w-4 h-4 text-[#f3a310]" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MISSION & VISION DUAL PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Box */}
          <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs relative overflow-hidden group hover:border-[#06592b]/40 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-[#06592b]/10 text-[#06592b] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#06592b] block mb-1">
              Our mission
            </span>
            {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
            <h2 className="text-[24px] md:text-[26px] font-bold text-[#06592b] mb-2">
              Empowerment through action
            </h2>
            <p className="text-[16px] text-[#1a2805] leading-relaxed">
              "{EYGN_INFO.missionStatement}"
            </p>
          </div>

          {/* Vision Box */}
          <div className="bg-[#1a2805] text-white p-8 rounded-2xl border border-[#f3a310]/30 shadow-sm relative overflow-hidden group">
            <div className="w-11 h-11 rounded-xl bg-[#f3a310]/20 text-[#f3a310] flex items-center justify-center mb-4">
              <Globe className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#f3a310] block mb-1">
              Our vision
            </span>
            <h2 className="text-[24px] md:text-[26px] font-bold text-[#f3a310] mb-2">
              Transformational horizon
            </h2>
            <p className="text-[16px] text-stone-200 leading-relaxed">
              "{EYGN_INFO.visionStatement}"
            </p>
          </div>

        </div>
      </section>

      {/* 3. STATISTICS COUNTER (Quarterly Update) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-2">
            <div>
              <span className="text-xs font-semibold text-[#06592b] uppercase tracking-wider block">
                Impact in numbers
              </span>
              {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
              <h2 className="text-[24px] md:text-[28px] font-bold text-[#06592b]">
                Network density & global reach
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-mono">
              Quarterly audit: March 2026
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {STATISTICS.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-3xl sm:text-4xl font-bold font-mono text-[#1a2805] tabular-nums">
                    {stat.value}
                  </span>
                  <span className="text-2xl font-bold text-[#f3a310]">{stat.suffix}</span>
                </div>
                <h4 className="text-[16px] font-semibold text-[#1a2805]">{stat.label}</h4>
                <p className="text-xs text-stone-500">{stat.quarterlyNote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROGRAMS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#06592b] uppercase tracking-wider block">
              Flagship pipelines
            </span>
            {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
            <h2 className="text-[24px] md:text-[28px] font-bold text-[#06592b]">
              Structured pathways for national service
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('programs')}
            className="text-[16px] font-medium text-[#06592b] hover:text-[#1a2805] flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View all 6 programs</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPrograms.map((program) => (
            <div
              key={program.slug}
              className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-[#06592b] shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-stone-50 border border-stone-200 text-[#06592b] rounded">
                    {program.acronym}
                  </span>
                  <span className="text-stone-500 text-[11px]">{program.pillar}</span>
                </div>

                <h3 className="text-[18px] font-bold text-[#1a2805] leading-snug mb-2">
                  {program.title}
                </h3>
                <p className="text-[14px] text-stone-600 leading-relaxed mb-4">
                  {program.subtitle}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-stone-100">
                  <span className="text-[11px] font-semibold text-stone-700 block">Core activities:</span>
                  {program.activities.slice(0, 2).map((act, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f3a310] mt-1.5 shrink-0" />
                      <span className="line-clamp-2">{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-[#06592b] font-medium">Flagship initiative</span>
                <button
                  type="button"
                  onClick={() => onNavigate('programs')}
                  className="text-[15px] font-medium text-[#1a2805] hover:text-[#06592b] flex items-center gap-1 cursor-pointer"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE CHAPTER NETWORK MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterMap onSelectChapter={() => {}} />
      </section>

      {/* 6. UPCOMING EVENTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#06592b] uppercase tracking-wider block">
              Conferences & assemblies
            </span>
            {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
            <h2 className="text-[24px] md:text-[28px] font-bold text-[#06592b]">
              Upcoming global & national events
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('programs')}
            className="text-[16px] font-medium text-[#06592b] hover:text-[#1a2805] flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>See full calendar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between hover:border-[#f3a310] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                  <span className="flex items-center gap-1 text-[#06592b] font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {event.date}
                  </span>
                  <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded text-[11px] font-medium">
                    {event.type}
                  </span>
                </div>

                <h3 className="text-[18px] font-bold text-[#1a2805] leading-snug mb-2">
                  {event.title}
                </h3>
                <p className="text-[14px] text-stone-600 leading-relaxed mb-4">
                  {event.description}
                </p>

                <div className="text-xs text-stone-500 flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[12px] text-stone-500">
                  {event.registeredCount}/{event.capacity} seats filled
                </span>
                {/* Buttons: 16px, Medium, sentence case */}
                <button
                  type="button"
                  onClick={() => onRegisterEvent(event)}
                  className="px-4 py-2 bg-[#1a2805] hover:bg-[#06592b] text-[#f3a310] text-[15px] font-medium rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Register for event</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. LATEST NEWS / BLOG POSTS (VERBATIM CONTENT FROM BRIEF) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#06592b] uppercase tracking-wider block">
              Dispatches & statements
            </span>
            {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
            <h2 className="text-[24px] md:text-[28px] font-bold text-[#06592b]">
              Latest official dispatches
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('media')}
            className="text-[16px] font-medium text-[#06592b] hover:text-[#1a2805] flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View all dispatches</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <div
              key={post.slug}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between hover:shadow-sm transition-all group"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                  <span className="font-semibold text-[#06592b]">{post.categories.join(', ')}</span>
                  <span>·</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>

                <h3 className="text-[18px] font-bold text-[#1a2805] group-hover:text-[#06592b] transition-colors leading-snug mb-2">
                  {post.title}
                </h3>

                <p className="text-[14px] text-stone-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-[12px] text-stone-400">{post.readingTime}</span>
                <button
                  type="button"
                  onClick={() => onSelectPost(post.slug)}
                  className="text-[15px] font-medium text-[#06592b] group-hover:text-[#1a2805] flex items-center gap-1 cursor-pointer"
                >
                  <span>{t.readMore}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. PROMINENT "JOIN THE NETWORK" CONVERSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1a2805] text-white rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-[#f3a310]/40 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-dark-pattern opacity-30 pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#f3a310]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#f3a310]/20 text-[#f3a310] border border-[#f3a310]/30">
              Direct national service pathway
            </span>

            {/* H2 in dark banner: 24-28px or bold display */}
            <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-white tracking-tight leading-tight">
              Many Minds. One Future. One Ethiopia.
            </h2>

            <p className="text-[16px] text-stone-300 leading-relaxed max-w-2xl mx-auto">
              Join over 500 Ethiopian scholars, engineers, entrepreneurs, and student delegates across 15+ countries. Mobilize your skills and make a direct, tangible contribution to the nation.
            </p>

            {/* Buttons: 16px, Medium, sentence case */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('membership')}
                className="px-8 py-3.5 bg-[#f3a310] hover:bg-[#e09407] text-[#1a2805] font-medium text-[16px] rounded-xl shadow-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                Apply for membership
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-[16px] rounded-xl border border-white/20 transition-colors cursor-pointer"
              >
                Inquire as institutional partner
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
