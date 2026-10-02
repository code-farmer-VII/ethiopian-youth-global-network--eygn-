import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EventItem, Language, PageType } from '../types';
import { EYGN_INFO, STATISTICS, TRANSLATIONS } from '../data/eygnData';
import { listEvents, listPosts, listPrograms, listStatistics, PostSummary, ProgramDto, StatisticDto } from '../lib/api';
import { toEventItem } from '../lib/eventFormat';
import { ChapterMap } from '../components/ChapterMap';
import { ROUTES } from '../lib/routes';
import { SEO } from '../components/SEO';
import { SITE_URL } from '../lib/siteConfig';
import { ArrowRight, Calendar, Sparkles, MapPin, ChevronRight, Globe, Shield, Ticket } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from 'motion/react';
import { fadeInUp, fadeInScale, staggerContainer, transitionSmooth, buttonHoverProps, cardHoverProps, viewportStandard } from '../utils/motion';


const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: EYGN_INFO.name,
  alternateName: EYGN_INFO.acronym,
  url: SITE_URL,
  description: EYGN_INFO.missionStatement,
  email: EYGN_INFO.officialEmails[0]?.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: EYGN_INFO.headquarters,
  },
};

interface HomePageProps {
  language: Language;
  onSelectPost: (slug: string) => void;
  onRegisterEvent: (event: EventItem) => void;
}

// Smooth Count-Up Animated Number Component
function AnimatedCounter({ to, duration = 2 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, to, {
        duration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => setCount(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [inView, to, duration]);

  return <span ref={ref}>{count}</span>;
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export const HomePage: React.FC<HomePageProps> = ({
  language,
  onSelectPost,
  onRegisterEvent,
}) => {
  const t = TRANSLATIONS[language];

  const [latestPosts, setLatestPosts] = useState<PostSummary[]>([]);
  const [featuredPrograms, setFeaturedPrograms] = useState<ProgramDto[]>([]);
  const [featuredEvents, setFeaturedEvents] = useState<EventItem[]>([]);
  const [statistics, setStatistics] = useState<StatisticDto[]>([]);

  useEffect(() => {
    listPosts({ size: 3 })
      .then((res) => setLatestPosts(res.content))
      .catch(() => setLatestPosts([]));
    listPrograms()
      .then((res) => setFeaturedPrograms(res.slice(0, 3)))
      .catch(() => setFeaturedPrograms([]));
    listEvents('upcoming')
      .then((res) => setFeaturedEvents(res.slice(0, 3).map(toEventItem)))
      .catch(() => setFeaturedEvents([]));
    listStatistics()
      .then(setStatistics)
      .catch(() => setStatistics([]));
  }, []);

  // Mouse Movement Parallax for Hero Section
  const heroMouseX = useMotionValue(0);
  const heroMouseY = useMotionValue(0);
  const heroSpringConfig = { damping: 25, stiffness: 120 };
  const heroSpringX = useSpring(heroMouseX, heroSpringConfig);
  const heroSpringY = useSpring(heroMouseY, heroSpringConfig);

  // Background image parallax offsets (subtle & smooth)
  const heroBgX = useTransform(heroSpringX, [-400, 400], [-15, 15]);
  const heroBgY = useTransform(heroSpringY, [-400, 400], [-15, 15]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    heroMouseX.set(e.clientX - centerX);
    heroMouseY.set(e.clientY - centerY);
  };

  const handleHeroMouseLeave = () => {
    heroMouseX.set(0);
    heroMouseY.set(0);
  };

  // Mouse Movement Glow for Conversion Banner
  const bannerMouseX = useMotionValue(0);
  const bannerMouseY = useMotionValue(0);
  const bannerSpringX = useSpring(bannerMouseX, heroSpringConfig);
  const bannerSpringY = useSpring(bannerMouseY, heroSpringConfig);

  const handleBannerMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    bannerMouseX.set(e.clientX - centerX);
    bannerMouseY.set(e.clientY - centerY);
  };

  const handleBannerMouseLeave = () => {
    bannerMouseX.set(0);
    bannerMouseY.set(0);
  };

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. FULL WIDTH HERO SECTION WITH FADED BACKGROUND IMAGE & TRANSPARENT WHITE OVERLAY */}
      <section 
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative w-full min-h-[600px] lg:min-h-[680px] flex items-center overflow-hidden py-20 lg:py-28 bg-[#fcfdfa] border-b border-stone-200"
      >
        {/* Full-width Background Image Container with Transparent White Overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            style={{ x: heroBgX, y: heroBgY, scale: 1.08 }}
            className="absolute -inset-8 w-[calc(100%+64px)] h-[calc(100%+64px)]"
          >
            <img
              src="https://media.licdn.com/dms/image/v2/D5612AQGYDhRSnClTNg/article-cover_image-shrink_720_1280/B56Z4Rjps7IkAI-/0/1778411067059?e=2147483647&v=beta&t=ihbZDfK2qZiBtB0ERR2PZsTvDNCL11cn0kq--rjwMOM"
              alt="Ethiopian Youth Global Network Hero Background"
              className="w-full h-full object-cover object-center opacity-75"
            />
            {/* Transparent White Gradient Overlays for High Legibility & Clean Visual Balance */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/40" />
          </motion.div>

          {/* Ambient interactive light orb */}
          <motion.div
            style={{
              x: heroSpringX,
              y: heroSpringY,
            }}
            className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[#f3a310]/10 blur-3xl pointer-events-none"
          />
        </div>

        {/* Full Width Hero Content Container */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            
            {/* Domain Kicker */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#06592b] bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200/90 shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#f3a310]" />
              <span>{t.heroKicker}</span>
              <span className="text-stone-300">·</span>
              <span className="text-stone-600 font-mono text-[11px]">DISPATCH Q1 2026</span>
            </motion.div>

            {/* H1: 32-40px+ Bold Primary Green (#1a2805) */}
            <motion.h1 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-[34px] sm:text-[44px] lg:text-[52px] font-bold text-[#1a2805] tracking-tight leading-[1.14] text-balance"
            >
              {EYGN_INFO.headline}
            </motion.h1>

            {/* Subtitle Body: Regular, Dark color */}
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-[16px] sm:text-[18px] text-[#1a2805] leading-relaxed max-w-2xl font-normal"
            >
              {EYGN_INFO.subtitle}
            </motion.p>

            {/* Action Buttons: 16px, Medium, sentence case */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.button
                {...buttonHoverProps}
                type="button"
                onClick={() => navigate(ROUTES.membership)}
                className="px-8 py-3.5 bg-[#1a2805] hover:bg-[#06592b] text-[#f3a310] font-medium text-[16px] rounded-xl shadow-md transition-colors flex items-center gap-2 group cursor-pointer"
              >
                <span>{EYGN_INFO.ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                {...buttonHoverProps}
                type="button"
                onClick={() => navigate(ROUTES.programs)}
                className="px-7 py-3.5 bg-white/90 hover:bg-white text-[#1a2805] border border-stone-300 font-medium text-[16px] rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>{t.explorePrograms}</span>
              </motion.button>
            </motion.div>

            {/* Trust & Alignment Callout */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-700 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#06592b]" />
                <span>Structured & neutral mechanism</span>
              </div>
              <span className="text-stone-300">·</span>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#06592b]" />
                <span>Global diaspora & homeland alignment</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* 2. MISSION & VISION DUAL PILLARS */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer(0.15)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Box */}
          <motion.div 
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs relative overflow-hidden group hover:border-[#06592b]/40 transition-colors"
          >
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
          </motion.div>

          {/* Vision Box */}
          <motion.div 
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-[#1a2805] text-white p-8 rounded-2xl border border-[#f3a310]/30 shadow-sm relative overflow-hidden group"
          >
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
          </motion.div>

        </div>
      </motion.section>

      {/* 3. STATISTICS COUNTER (Quarterly Update) WITH DYNAMIC ANIMATED COUNT-UP NUMBERS */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={transitionSmooth}
      >
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
              <motion.div 
                key={idx} 
                className="space-y-1"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-baseline gap-0.5">
                  <span className="text-3xl sm:text-4xl font-bold font-mono text-[#1a2805] tabular-nums">
                    <AnimatedCounter to={typeof stat.value === 'number' ? stat.value : parseInt(stat.value, 10)} duration={2 + idx * 0.2} />
                  </span>
                  <span className="text-2xl font-bold text-[#f3a310]">{stat.suffix}</span>
                </div>
                <h4 className="text-[16px] font-semibold text-[#1a2805]">{stat.label}</h4>
                <p className="text-xs text-stone-500">{stat.quarterlyNote}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. FEATURED PROGRAMS SHOWCASE */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={transitionSmooth}
      >
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
            onClick={() => navigate(ROUTES.programs)}
            className="text-[16px] font-medium text-[#06592b] hover:text-[#1a2805] flex items-center gap-1 self-start sm:self-auto cursor-pointer group"
          >
            <span>View all 6 programs</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPrograms.map((program, idx) => (
            <motion.div
              key={program.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
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
                  onClick={() => navigate(ROUTES.programs)}
                  className="text-[15px] font-medium text-[#1a2805] hover:text-[#06592b] flex items-center gap-1 cursor-pointer group"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 5. INTERACTIVE CHAPTER NETWORK MAP */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={transitionSmooth}
      >
        <ChapterMap onSelectChapter={() => {}} />
      </motion.section>

      {/* 6. UPCOMING EVENTS PREVIEW */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={transitionSmooth}
      >
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
            onClick={() => navigate(ROUTES.programs)}
            className="text-[16px] font-medium text-[#06592b] hover:text-[#1a2805] flex items-center gap-1 self-start sm:self-auto cursor-pointer group"
          >
            <span>See full calendar</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
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
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => onRegisterEvent(event)}
                  className="px-4 py-2 bg-[#1a2805] hover:bg-[#06592b] text-[#f3a310] text-[15px] font-medium rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Register for event</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 7. LATEST NEWS / BLOG POSTS */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={transitionSmooth}
      >
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
            onClick={() => navigate(ROUTES.media)}
            className="text-[16px] font-medium text-[#06592b] hover:text-[#1a2805] flex items-center gap-1 self-start sm:self-auto cursor-pointer group"
          >
            <span>View all dispatches</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
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
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 8. PROMINENT "JOIN THE NETWORK" CONVERSION BANNER WITH MOUSE SPOTLIGHT */}
      <motion.section 
        onMouseMove={handleBannerMouseMove}
        onMouseLeave={handleBannerMouseLeave}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, scale: 0.98, y: 24 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={transitionSmooth}
      >
        <div className="bg-[#1a2805] text-white rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-[#f3a310]/40 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-dark-pattern opacity-30 pointer-events-none" />
          
          {/* Interactive cursor-tracking ambient glow */}
          <motion.div 
            style={{
              x: bannerSpringX,
              y: bannerSpringY,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#f3a310]/20 rounded-full blur-3xl pointer-events-none" 
          />

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
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => navigate(ROUTES.membership)}
                className="px-8 py-3.5 bg-[#f3a310] hover:bg-[#e09407] text-[#1a2805] font-medium text-[16px] rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Apply for membership
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => navigate(ROUTES.contact)}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-[16px] rounded-xl border border-white/20 transition-colors cursor-pointer"
              >
                Inquire as institutional partner
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
