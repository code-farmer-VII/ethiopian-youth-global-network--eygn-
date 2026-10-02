import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../lib/routes';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { listTeamMembers, TeamMemberDto } from '../lib/api';
import { Mail, ArrowRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fadeInUp, fadeInScale, staggerContainer, transitionSmooth, buttonHoverProps, cardHoverProps, viewportStandard } from '../utils/motion';

// API team members have no id/slug and no photo initials seed — derive both client-side.
function getInitials(fullName: string): string {
  const parts = fullName.replace(/^(Mr|Ms|Mrs|Dr)\.?\s+/i, '').trim().split(/\s+/);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('') || '??';
}

export const TeamPage: React.FC = () => {
  const [filterDepartment, setFilterDepartment] = useState<string>('All');
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState<TeamMemberDto[]>([]);

  useEffect(() => {
    listTeamMembers()
      .then(setTeamMembers)
      .catch(() => setTeamMembers([]));
  }, []);

  const executiveLeaders = teamMembers.filter(m => m.department === 'Executive Leadership');
  const departmentHeads = teamMembers.filter(m => m.department !== 'Executive Leadership');

  const filteredHeads = filterDepartment === 'All'
    ? departmentHeads
    : departmentHeads.filter(m => (m.department ?? '').toLowerCase().includes(filterDepartment.toLowerCase()));

  return (
    <div className="space-y-16 lg:space-y-20 py-6">
      <SEO
        title="Executive Leadership & Department Directorate"
        description="Dedicated innovators, diplomats, and operational coordinators uniting the global diaspora to serve Ethiopia's strategic priorities."
        path={ROUTES.team}
      />
      {/* 1. Header */}
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
          <span>Governance & secretariat</span>
        </motion.div>
        {/* H1: 32-40px, Bold, Primary Green (#1a2805) */}
        <motion.h1 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold text-[#1a2805] tracking-tight leading-[1.16]"
        >
          Executive Leadership & Department Directorate
        </motion.h1>
        {/* Body: 16px, Regular, Dark color */}
        <motion.p 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="text-[16px] text-[#1a2805] leading-relaxed max-w-2xl mx-auto"
        >
          Dedicated innovators, diplomats, and operational coordinators uniting the global diaspora to serve Ethiopia's strategic priorities.
        </motion.p>
      </motion.section>

      {/* 2. Executive Leadership Spotlight (Sisay, Amen & Amanuel in the Top with Big Picture Frames) */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={transitionSmooth}
      >
        <div className="border-b border-stone-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#06592b]">
            Executive leadership
          </span>
          {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
          <h2 className="text-[24px] sm:text-[28px] font-bold text-[#06592b]">
            Founder & executive secretariat
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {executiveLeaders.map((member, idx) => (
            <motion.div
              key={member.fullName}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm hover:border-[#06592b] hover:shadow-md transition-all flex flex-col justify-between group overflow-hidden"
            >
              <div className="space-y-5">
                {/* BIG PORTRAIT PICTURE PLACEHOLDER CONTAINER */}
                <div className="relative w-full aspect-[4/3] sm:h-56 rounded-2xl bg-gradient-to-br from-[#1a2805] via-[#122003] to-[#0a1101] flex flex-col items-center justify-center overflow-hidden border border-[#f3a310]/30 shadow-inner group-hover:scale-[1.01] transition-transform duration-300">
                  <div className="absolute inset-0 bg-dark-pattern opacity-40 pointer-events-none" />
                  
                  {/* Subtle Glow & Ambient Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#f3a310]/20 border border-[#f3a310]/40 text-[#f3a310] text-[11px] font-semibold tracking-wider uppercase">
                    EYGN Board
                  </div>

                  {/* Ethiopian Flag Tri-color Mini Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-[#f3a310] to-red-500" />

                  {/* Monogram / Big Picture Center Holder */}
                  <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
                    <div className="w-20 h-20 rounded-full bg-[#f3a310]/15 border-2 border-[#f3a310]/50 flex items-center justify-center text-[#f3a310] shadow-md group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl font-bold font-serif">{member.imageFallbackSeed || getInitials(member.fullName)}</span>
                    </div>
                    <span className="text-xs text-stone-300/80 tracking-wider font-mono uppercase">
                      Official Portrait
                    </span>
                  </div>
                </div>

                {/* Medium-Sized Balanced Typography Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#06592b] uppercase tracking-wider block">
                      {member.role}
                    </span>
                    {member.roleAm && (
                      <span className="text-[12px] text-stone-500 font-medium">
                        {member.roleAm}
                      </span>
                    )}
                  </div>
                  <h3 className="text-[21px] font-bold text-[#1a2805] leading-tight">
                    {member.fullName}
                  </h3>
                </div>

                <p className="text-[15px] text-[#1a2805] leading-relaxed font-normal">
                  {member.bio}
                </p>

                {/* Highlights List */}
                <div className="pt-3 border-t border-stone-100">
                  <span className="text-[12px] font-semibold text-stone-600 uppercase tracking-wider block mb-2">
                    Key distinctions & credentials:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[12.5px] px-3 py-1 bg-stone-100 text-[#1a2805] rounded-lg font-medium border border-stone-200"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-stone-700 hover:text-[#06592b] transition-colors flex items-center gap-1.5 text-[13px] font-medium"
                    >
                      <Mail className="w-4 h-4 text-[#06592b]" />
                      <span className="truncate max-w-[180px]">{member.email}</span>
                    </a>
                  )}
                </div>

                <span className="text-[11px] font-semibold text-[#06592b]">Executive Board</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3. Department Heads with Big Picture Frames & Medium Text */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={transitionSmooth}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200 pb-3 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#06592b]">
              Operational leadership
            </span>
            {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
            <h2 className="text-[24px] sm:text-[28px] font-bold text-[#06592b]">
              Department heads & directors
            </h2>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg overflow-x-auto max-w-full">
            {['All', 'External Relations', 'Operations', 'Research & Policy', 'Mobilization', 'Programs & Events'].map(dept => (
              <button
                key={dept}
                type="button"
                onClick={() => setFilterDepartment(dept)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  filterDepartment === dept
                    ? 'bg-white text-[#1a2805] shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredHeads.map((member) => (
              <motion.div
                key={member.fullName}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:border-[#06592b] transition-all flex flex-col justify-between group overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Big Picture Container for Directorate */}
                  <div className="relative w-full h-44 rounded-xl bg-gradient-to-br from-[#1a2805] to-[#06592b]/80 flex flex-col items-center justify-center overflow-hidden border border-[#06592b]/30 shadow-inner">
                    <div className="absolute inset-0 bg-dark-pattern opacity-30 pointer-events-none" />
                    <div className="w-16 h-16 rounded-full bg-white/10 text-[#f3a310] border border-white/20 flex items-center justify-center font-bold text-2xl shadow-sm group-hover:scale-105 transition-transform duration-300">
                      {member.imageFallbackSeed || getInitials(member.fullName)}
                    </div>
                    <span className="text-[10px] text-white/70 font-mono tracking-wider uppercase mt-1">
                      {member.department}
                    </span>
                  </div>

                  <div>
                    <span className="text-[12px] text-[#06592b] font-bold uppercase tracking-wider block">
                      {member.role}
                    </span>
                    <h3 className="text-[18px] font-bold text-[#1a2805] leading-tight mt-0.5">
                      {member.fullName}
                    </h3>
                  </div>

                  <p className="text-[14.5px] text-stone-700 leading-relaxed line-clamp-4 font-normal">
                    {member.bio}
                  </p>

                  {member.highlights.length > 0 && (
                    <div className="pt-2">
                      <ul className="space-y-1">
                        {member.highlights.map((h, idx) => (
                          <li key={idx} className="text-[12.5px] text-stone-600 flex items-center gap-1.5 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f3a310]" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="text-[11px] text-stone-500 font-medium">{member.department}</span>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-1.5 text-stone-600 hover:text-[#06592b] hover:bg-stone-100 rounded transition-colors"
                      title={`Email ${member.fullName}`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      {/* 4. Join the Directorate / Chapter Leads Callout */}
      <motion.section 
        className="max-w-4xl mx-auto px-4 sm:px-6 text-center pt-8"
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={transitionSmooth}
      >
        <div className="bg-white border border-stone-200 p-8 sm:p-12 rounded-3xl space-y-4 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#06592b] block">
            Regional mobilization
          </span>
          {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
          <h2 className="text-[24px] sm:text-[28px] font-bold text-[#06592b]">
            Interested in serving as a regional chapter lead?
          </h2>
          <p className="text-[16px] text-[#1a2805] max-w-xl mx-auto leading-relaxed">
            We are actively appointing chapter directors across major diaspora metropolises and Ethiopian regional university campuses.
          </p>
          <div className="pt-2">
            {/* Buttons: 16px, Medium, sentence case */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigate(ROUTES.contact)}
              className="px-6 py-3.5 bg-[#1a2805] hover:bg-[#06592b] text-[#f3a310] font-medium text-[16px] rounded-xl shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Submit chapter leadership application</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
