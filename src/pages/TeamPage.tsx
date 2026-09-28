import React, { useEffect, useState } from 'react';
import { PageType } from '../types';
import { listTeamMembers, TeamMemberDto } from '../lib/api';
import { Mail, ArrowRight } from 'lucide-react';

interface TeamPageProps {
  onNavigate: (page: PageType) => void;
}

// API team members have no id/slug and no photo initials seed — derive both client-side.
function getInitials(fullName: string): string {
  const parts = fullName.replace(/^(Mr|Ms|Mrs|Dr)\.?\s+/i, '').trim().split(/\s+/);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('') || '??';
}

export const TeamPage: React.FC<TeamPageProps> = ({ onNavigate }) => {
  const [filterDepartment, setFilterDepartment] = useState<string>('All');
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
      {/* 1. Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#06592b]">
          <span className="w-2 h-2 rounded-full bg-[#f3a310]" />
          <span>Governance & secretariat</span>
        </div>
        {/* H1: 32-40px, Bold, Primary Green (#1a2805) */}
        <h1 className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold text-[#1a2805] tracking-tight leading-[1.16]">
          Executive Leadership & Department Directorate
        </h1>
        {/* Body: 16px, Regular, Dark color */}
        <p className="text-[16px] text-[#1a2805] leading-relaxed max-w-2xl mx-auto">
          Dedicated innovators, diplomats, and operational coordinators uniting the global diaspora to serve Ethiopia's strategic priorities.
        </p>
      </section>

      {/* 2. Executive Leadership Spotlight (Founder & General Secretary) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-stone-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#06592b]">
            Executive council
          </span>
          {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
          <h2 className="text-[24px] sm:text-[28px] font-bold text-[#06592b]">
            Founder & secretariat
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {executiveLeaders.map((member) => (
            <div
              key={member.fullName}
              className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xs hover:border-[#06592b] transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  {/* Portrait Monogram Tile */}
                  <div className="w-16 h-16 rounded-2xl bg-[#1a2805] text-[#f3a310] flex items-center justify-center font-bold text-2xl border border-[#f3a310]/40 shadow-xs shrink-0">
                    {getInitials(member.fullName)}
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-[#06592b] uppercase tracking-wider block">
                      {member.role}
                    </span>
                    <h3 className="text-[22px] font-bold text-[#1a2805]">
                      {member.fullName}
                    </h3>
                    {member.roleAm && (
                      <span className="text-xs text-stone-500 block">
                        {member.roleAm}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-[15px] text-[#1a2805] leading-relaxed pt-2">
                  {member.bio}
                </p>

                {/* Highlights List */}
                <div className="pt-3 border-t border-stone-100">
                  <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider block mb-2">
                    Key distinctions & credentials:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {member.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[13px] px-3 py-1 bg-stone-100 text-[#1a2805] rounded-md font-medium border border-stone-200"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-stone-700 hover:text-[#06592b] transition-colors flex items-center gap-1.5 text-xs font-medium"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#06592b]" />
                      <span className="truncate max-w-[220px]">{member.email}</span>
                    </a>
                  )}
                </div>

                <span className="text-[12px] font-semibold text-[#06592b]">Official EYGN Council</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Department Heads */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
            {['All', 'Media', 'Partnerships', 'Operations', 'Research', 'Mobilization', 'Events'].map(dept => (
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHeads.map((member) => (
            <div
              key={member.fullName}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:border-[#06592b] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#06592b]/10 text-[#06592b] font-bold text-lg flex items-center justify-center shrink-0">
                    {getInitials(member.fullName)}
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#1a2805] leading-tight">
                      {member.fullName}
                    </h3>
                    <span className="text-xs text-[#06592b] font-medium block">
                      {member.role}
                    </span>
                  </div>
                </div>

                <p className="text-[14px] text-stone-700 leading-relaxed pt-2 line-clamp-4">
                  {member.bio}
                </p>

                {member.highlights.length > 0 && (
                  <div className="pt-2">
                    <ul className="space-y-1">
                      {member.highlights.map((h, idx) => (
                        <li key={idx} className="text-[12px] text-stone-600 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#f3a310]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="text-[11px] text-stone-500">{member.department}</span>
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
            </div>
          ))}
        </div>
      </section>

      {/* 4. Join the Directorate / Chapter Leads Callout */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center pt-8">
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
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 bg-[#1a2805] hover:bg-[#06592b] text-[#f3a310] font-medium text-[16px] rounded-xl shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Submit chapter leadership application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
