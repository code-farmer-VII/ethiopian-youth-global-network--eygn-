import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MotionLink } from '../components/MotionLink';
import { transitionSmooth, buttonHoverProps, cardHoverProps, viewportStandard } from '../utils/motion';
import { EYGN_INFO } from '../data/eygnData';
import { listCoreValues, CoreValueDto } from '../lib/api';
import { ROUTES } from '../lib/routes';
import { SEO } from '../components/SEO';
import { Users, ShieldCheck, Award, Share2, Sparkles, Flag, ArrowRight, CheckCircle2, Globe, HeartHandshake, BookOpen } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [coreValues, setCoreValues] = useState<CoreValueDto[]>([]);

  useEffect(() => {
    listCoreValues()
      .then(setCoreValues)
      .catch(() => setCoreValues([]));
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'Share2': return <Share2 className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Flag': return <Flag className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24 py-6">
      <SEO
        title="About Ethiopian Youth Global Network"
        description="A neutral, structured, and nationally aligned platform connecting Ethiopian youth across the world with the development of their homeland."
        path={ROUTES.about}
      />
      {/* 1. Page Header */}
      <motion.section
        className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitionSmooth}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#06592b]"
        >
          <span className="w-2 h-2 rounded-full bg-[#f3a310]" />
          <span>Institutional profile & mandate</span>
        </motion.div>
        {/* H1: 32-40px, Bold, Primary Green (#1a2805) */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold text-[#1a2805] tracking-tight leading-[1.16]"
        >
          About Ethiopian Youth Global Network
        </motion.h1>
        {/* Body: 16px, Regular, Dark color */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="text-[16px] text-[#1a2805] leading-relaxed max-w-2xl mx-auto"
        >
          A neutral, structured, and nationally aligned platform connecting Ethiopian youth across the world with the development of their homeland.
        </motion.p>
      </motion.section>

      {/* 2. Organization Introduction */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportStandard}
        transition={transitionSmooth}
      >
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#06592b] block">
              01. Organization introduction
            </span>
            {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
            <h2 className="text-[24px] sm:text-[26px] lg:text-[28px] font-bold text-[#06592b] leading-snug">
              Mobilizing youth as strategic partners in national transformation
            </h2>
            <p className="text-[16px] text-[#1a2805] leading-relaxed">
              {EYGN_INFO.aboutIntroduction}
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#1a2805] text-white p-6 sm:p-8 rounded-2xl border border-[#f3a310]/40 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-dark-pattern opacity-30 pointer-events-none" />
            <span className="text-[12px] uppercase tracking-wider text-[#f3a310] font-semibold block">
              Core principles
            </span>
            <h3 className="text-[20px] font-bold text-white mt-1 mb-4">
              Structured & neutral framework
            </h3>
            <ul className="space-y-3 text-[14px] text-stone-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#f3a310] shrink-0 mt-0.5" />
                <span>Non-partisan and independent alignment focused solely on national human capital.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#f3a310] shrink-0 mt-0.5" />
                <span>Accredited collaboration pathways with universities and public research institutions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#f3a310] shrink-0 mt-0.5" />
                <span>Direct representation at multilateral environmental and diplomatic forums.</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* 3. Why EYGN Exists (Problem Statement From Brief) */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportStandard}
        transition={transitionSmooth}
      >
        <div className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#06592b] block">
              02. Why EYGN exists (the problem statement)
            </span>
            {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
            <h2 className="text-[24px] sm:text-[28px] font-bold text-[#06592b]">
              The diaspora disconnection challenge
            </h2>
            <div className="border-l-4 border-[#06592b] pl-6 py-3 bg-stone-50 rounded-r-xl">
              <p className="text-[16px] text-[#1a2805] leading-relaxed">
                {EYGN_INFO.whyExists}
              </p>
            </div>
            <p className="text-[15px] text-stone-600 leading-relaxed pt-1">
              Before EYGN, diaspora engagement relied on fragmented informal initiatives. EYGN provides the missing institutional rail: transparent, efficient, and sustained across generational shifts.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 4. Who We Serve (From Brief) */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportStandard}
        transition={transitionSmooth}
      >
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#06592b] block">
              03. Stakeholder ecosystem
            </span>
            {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
            <h2 className="text-[24px] sm:text-[28px] font-bold text-[#06592b]">
              Who we serve
            </h2>
            <p className="text-[16px] text-[#1a2805] max-w-2xl mt-1 leading-relaxed">
              {EYGN_INFO.whoWeServe}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {[
              {
                title: 'Diaspora students & scholars',
                desc: 'Young Ethiopians enrolled in leading global universities seeking direct academic repatriation channels.',
                icon: BookOpen,
              },
              {
                title: 'Young professionals & founders',
                desc: 'Specialists in FinTech, artificial intelligence, healthcare, architecture, and international law abroad.',
                icon: Users,
              },
              {
                title: 'Homeland youth associations',
                desc: 'Local university incubators, community activists, and student councils across Ethiopia needing mentorship.',
                icon: HeartHandshake,
              },
              {
                title: 'Institutions & ministries',
                desc: 'Ethiopian public universities, research agencies, and ecological programs requiring skilled engagement.',
                icon: Award,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  {...cardHoverProps}
                  className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3 hover:border-[#06592b] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#06592b]/10 text-[#06592b] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[17px] font-bold text-[#1a2805]">{item.title}</h3>
                  <p className="text-[14px] text-stone-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 5. Core Values (6 Values With Descriptions From Page 7) */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportStandard}
        transition={transitionSmooth}
      >
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#06592b] block">
              04. Guiding foundations
            </span>
            {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
            <h2 className="text-[24px] sm:text-[28px] font-bold text-[#06592b]">
              Our six core values
            </h2>
            <p className="text-[15px] text-stone-600">
              Upholding the highest ethical conduct, unity, and dedication to Ethiopian prosperity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                {...cardHoverProps}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:border-[#06592b] transition-colors space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#1a2805] text-[#f3a310] flex items-center justify-center">
                    {getIcon(value.iconName)}
                  </div>
                  <span className="font-mono text-xs font-semibold text-stone-400">0{idx + 1}</span>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-[18px] font-bold text-[#1a2805]">{value.name}</h3>
                    {value.nameAm && (
                      <span className="text-xs font-medium text-[#06592b]">({value.nameAm})</span>
                    )}
                  </div>
                  <p className="text-[14px] text-stone-600 leading-relaxed mt-2">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 6. Call to Action: Buttons: 16px, Medium, sentence case */}
      <motion.section
        className="max-w-4xl mx-auto px-4 sm:px-6 text-center pt-8"
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={viewportStandard}
        transition={transitionSmooth}
      >
        <div className="p-8 sm:p-12 bg-[#1a2805] rounded-3xl text-white space-y-4 shadow-xl border border-[#f3a310]/30">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-white">
            Ready to stand with Ethiopian youth?
          </h2>
          <p className="text-[16px] text-stone-300 max-w-xl mx-auto leading-relaxed">
            Whether you are a student abroad or an experienced professional, your insight is vital to our collective future.
          </p>
          <div className="pt-2">
            <MotionLink
              to={ROUTES.membership}
              {...buttonHoverProps}
              className="px-6 py-3.5 bg-[#f3a310] hover:bg-[#e09407] text-[#1a2805] font-medium text-[16px] rounded-xl shadow-md transition-colors inline-flex items-center gap-2"
            >
              <span>Join the network</span>
              <ArrowRight className="w-4 h-4" />
            </MotionLink>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
