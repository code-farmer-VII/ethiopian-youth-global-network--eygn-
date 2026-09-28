import React, { useEffect, useState } from 'react';
import { EventItem, PageType } from '../types';
import { listEvents, listPrograms, ProgramDto } from '../lib/api';
import { toEventItem } from '../lib/eventFormat';
import { CheckCircle2, Calendar, MapPin, Ticket, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';

interface ProgramsPageProps {
  onNavigate: (page: PageType) => void;
  onRegisterEvent: (event: EventItem) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  onNavigate,
  onRegisterEvent,
}) => {
  const [activeTab, setActiveTab] = useState<'programs' | 'upcoming' | 'past'>('programs');
  const [programs, setPrograms] = useState<ProgramDto[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<ProgramDto | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [pastEvents, setPastEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    listPrograms()
      .then((res) => {
        setPrograms(res);
        setSelectedProgram((prev) => prev ?? res[0] ?? null);
      })
      .catch(() => setPrograms([]));
    listEvents('upcoming')
      .then((res) => setUpcomingEvents(res.map(toEventItem)))
      .catch(() => setUpcomingEvents([]));
    listEvents('past')
      .then((res) => setPastEvents(res.map(toEventItem)))
      .catch(() => setPastEvents([]));
  }, []);

  return (
    <div className="space-y-12 lg:space-y-16 py-6">
      {/* 1. Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#06592b]">
          <span className="w-2 h-2 rounded-full bg-[#f3a310]" />
          <span>Strategic pipelines & event infrastructure</span>
        </div>
        {/* H1: 32-40px, Bold, Primary Green (#1a2805) */}
        <h1 className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold text-[#1a2805] tracking-tight leading-[1.16]">
          EYGN Flagship Programs & Events
        </h1>
        {/* Body: 16px, Regular, Dark color */}
        <p className="text-[16px] text-[#1a2805] leading-relaxed max-w-2xl mx-auto">
          Actionable frameworks channel diaspora knowledge into Ethiopian higher education, climate action, and youth civic governance.
        </p>

        {/* View Switcher Tabs */}
        <div className="inline-flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 mt-2">
          <button
            type="button"
            onClick={() => setActiveTab('programs')}
            className={`px-4 py-2 text-[15px] font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'programs'
                ? 'bg-white text-[#1a2805] shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Flagship programs ({programs.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 text-[15px] font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-white text-[#1a2805] shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Upcoming events ({upcomingEvents.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 text-[15px] font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'past'
                ? 'bg-white text-[#1a2805] shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Past events archive ({pastEvents.length})
          </button>
        </div>
      </section>

      {/* 2. TAB CONTENT: PROGRAMS */}
      {activeTab === 'programs' && selectedProgram && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Program Selector Navigation Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {programs.map((prog) => {
              const isSelected = selectedProgram.slug === prog.slug;
              return (
                <button
                  key={prog.slug}
                  type="button"
                  onClick={() => setSelectedProgram(prog)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1a2805] text-white border-[#f3a310] shadow-md'
                      : 'bg-white text-[#1a2805] border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <span className={`text-[11px] font-mono font-bold uppercase tracking-wider block ${
                    isSelected ? 'text-[#f3a310]' : 'text-[#06592b]'
                  }`}>
                    {prog.acronym || 'INITIATIVE'}
                  </span>
                  <span className="text-[15px] font-bold line-clamp-1 mt-0.5">
                    {prog.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Program Deep-Dive Container */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                {selectedProgram.pillar && (
                  <>
                    <span className="px-2.5 py-0.5 rounded bg-stone-100 text-stone-700 font-medium">
                      {selectedProgram.pillar}
                    </span>
                    <span>·</span>
                  </>
                )}
                <span className="font-semibold text-[#06592b]">{selectedProgram.status}</span>
              </div>

              {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
              <h2 className="text-[24px] sm:text-[28px] font-bold text-[#06592b] leading-tight">
                {selectedProgram.title} {selectedProgram.acronym && `(${selectedProgram.acronym})`}
              </h2>

              {selectedProgram.subtitle && (
                <p className="text-[16px] text-[#1a2805] font-medium leading-relaxed">
                  {selectedProgram.subtitle}
                </p>
              )}

              <div className="space-y-3 text-[#1a2805] text-[16px] leading-relaxed border-t border-stone-100 pt-4">
                <p>{selectedProgram.description}</p>
              </div>

              {/* Core Activities Breakdown */}
              {selectedProgram.activities.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-stone-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1a2805]">
                    Key program activities:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProgram.activities.map((activity, idx) => (
                      <div key={idx} className="p-3.5 bg-stone-50 border border-stone-200/80 rounded-xl flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#06592b] shrink-0 mt-0.5" />
                        <span className="text-[14px] text-stone-700 leading-relaxed">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* How to Join Guideline */}
              {selectedProgram.howToJoin && (
                <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <span className="text-xs font-bold text-[#1a2805] uppercase tracking-wider block">
                    How to participate or join:
                  </span>
                  <p className="text-[15px] text-stone-700 leading-relaxed">
                    {selectedProgram.howToJoin}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar Meta & Direct Action */}
            <div className="lg:col-span-4 flex flex-col justify-between bg-stone-50/70 p-6 sm:p-8 rounded-2xl border border-stone-200">
              <div className="space-y-6">
                {selectedProgram.targetAudience && (
                  <div>
                    <span className="text-[11px] uppercase text-stone-500 font-semibold tracking-wider block">
                      Target demographic
                    </span>
                    <p className="text-[15px] text-[#1a2805] mt-1 leading-relaxed">
                      {selectedProgram.targetAudience}
                    </p>
                  </div>
                )}

                {selectedProgram.stats && selectedProgram.stats.length > 0 && (
                  <div className="pt-4 border-t border-stone-200 space-y-3">
                    <span className="text-[11px] uppercase text-stone-500 font-semibold tracking-wider block">
                      Program impact metrics
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProgram.stats.map((st, i) => (
                        <div key={i} className="p-3 bg-white rounded-lg border border-stone-200">
                          <span className="text-xl font-bold font-mono text-[#1a2805] block">
                            {st.value}
                          </span>
                          <span className="text-[11px] text-stone-500">{st.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons: 16px, Medium, sentence case */}
              <div className="pt-8 border-t border-stone-200 space-y-3">
                <button
                  type="button"
                  onClick={() => onNavigate('membership')}
                  className="w-full py-3.5 px-4 bg-[#1a2805] hover:bg-[#06592b] text-[#f3a310] font-medium text-[16px] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply for {selectedProgram.acronym || 'program'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="w-full py-3 px-4 bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 font-medium text-[15px] rounded-xl transition-colors text-center cursor-pointer"
                >
                  Request program brief PDF
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. TAB CONTENT: UPCOMING EVENTS */}
      {activeTab === 'upcoming' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between hover:border-[#06592b] transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#06592b]">{event.category}</span>
                    <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded text-[11px]">
                      {event.type}
                    </span>
                  </div>

                  <h3 className="text-[18px] font-bold text-[#1a2805] leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-[14px] text-stone-600 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-stone-500 pt-2 border-t border-stone-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#06592b]" />
                      <span>{event.date} · {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] uppercase font-semibold text-stone-400 block mb-1">
                      Featured keynotes:
                    </span>
                    <ul className="text-xs text-stone-600 space-y-1">
                      {event.featuredSpeakers.map((spk, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#f3a310]" />
                          <span className="truncate">{spk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[12px] text-stone-500 font-mono">
                    {event.registeredCount}/{event.capacity} registered
                  </span>
                  {/* Buttons: 16px, Medium, sentence case */}
                  <button
                    type="button"
                    onClick={() => onRegisterEvent(event)}
                    className="px-4 py-2.5 bg-[#1a2805] hover:bg-[#06592b] text-[#f3a310] font-medium text-[15px] rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Reserve seat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. TAB CONTENT: PAST EVENTS ARCHIVE */}
      {activeTab === 'past' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded bg-stone-100 text-stone-600 font-medium">
                    Archived symposium
                  </span>
                  <span className="text-stone-400 font-mono text-[11px]">{event.date}</span>
                </div>

                {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
                <h2 className="text-[24px] font-bold text-[#06592b]">
                  {event.title}
                </h2>

                <p className="text-[15px] text-[#1a2805] leading-relaxed">
                  {event.description}
                </p>

                <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-stone-100">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    {event.location}
                  </span>
                  <span className="text-[#06592b] font-medium">400+ delegates attended</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
