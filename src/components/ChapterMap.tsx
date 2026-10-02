import React, { useState } from 'react';
import { CHAPTER_HUBS } from '../data/eygnData';
import { Chapter } from '../types';
import { Globe, MapPin, Users, Compass, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChapterMapProps {
  onSelectChapter?: (chapter: Chapter) => void;
}

export const ChapterMap: React.FC<ChapterMapProps> = ({ onSelectChapter }) => {
  const [activeChapter, setActiveChapter] = useState<Chapter>(CHAPTER_HUBS[0]);
  const [activeRegionFilter, setActiveRegionFilter] = useState<string>('All');

  const filteredChapters = activeRegionFilter === 'All' 
    ? CHAPTER_HUBS 
    : CHAPTER_HUBS.filter(c => c.region === activeRegionFilter);

  const handleNodeClick = (chapter: Chapter) => {
    setActiveChapter(chapter);
    if (onSelectChapter) onSelectChapter(chapter);
  };

  return (
    <div className="bg-[#1a2805] text-[#fcfdfa] rounded-2xl p-6 lg:p-10 shadow-xl border border-[#06592b]/40 relative overflow-hidden">
      {/* Subtle background grid and glow */}
      <div className="absolute inset-0 bg-dark-pattern opacity-60 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#f3a310]/10 blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#06592b]/50 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#f3a310] uppercase tracking-wider mb-2">
            <Globe className="w-4 h-4 text-[#f3a310]" />
            <span>Interactive Global Chapter Network</span>
            <span className="text-[#fcfdfa]/40">·</span>
            <span className="text-[#fcfdfa]/70">15+ Countries Represented</span>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-[#ffffff]">
            Connecting Diaspora & Homeland Hubs
          </h3>
          <p className="text-sm text-[#fcfdfa]/75 mt-1 max-w-xl">
            Click any active node on the coordinates map or regional filters below to inspect chapter leadership, membership density, and ongoing strategic initiatives.
          </p>
        </div>

        {/* Region filter controls */}
        <div className="flex items-center gap-1.5 p-1 bg-black/30 backdrop-blur-md rounded-lg border border-white/10 self-start md:self-auto overflow-x-auto max-w-full">
          {['All', 'Africa', 'North America', 'Europe', 'Middle East'].map(region => (
            <button
              key={region}
              type="button"
              onClick={() => setActiveRegionFilter(region)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                activeRegionFilter === region 
                  ? 'bg-[#f3a310] text-[#1a2805] font-semibold shadow' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Map visualizer & Chapter Detail Inspector */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
        {/* SVG stylized world representation with plotted coordinates */}
        <div className="lg:col-span-8 bg-black/40 rounded-xl p-4 md:p-6 border border-white/10 relative">
          <div className="flex items-center justify-between text-xs text-[#fcfdfa]/60 mb-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#f3a310] animate-pulse" />
              <span>Global Dispatch & Liaison Nodes</span>
            </div>
            <span className="font-mono text-[11px] text-[#f3a310]">COORDINATES / GEODATA</span>
          </div>

          <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-[#0e1603] border border-[#06592b]/30">
            {/* World map stylized vector silhouettes */}
            <svg
              className="w-full h-full opacity-35"
              viewBox="0 0 1000 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Latitude/longitude subtle gridlines */}
              <line x1="0" y1="125" x2="1000" y2="125" stroke="#06592b" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="0" y1="250" x2="1000" y2="250" stroke="#06592b" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="375" x2="1000" y2="375" stroke="#06592b" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="250" y1="0" x2="250" y2="500" stroke="#06592b" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="500" y1="0" x2="500" y2="500" stroke="#06592b" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="750" y1="0" x2="750" y2="500" stroke="#06592b" strokeWidth="0.75" strokeDasharray="3 3" />

              {/* Simplified stylized continental landmass vectors */}
              {/* North America */}
              <path
                d="M120 70 Q180 50 250 80 Q290 120 280 180 Q240 240 210 270 Q160 250 140 180 Q100 130 120 70 Z"
                fill="#06592b"
              />
              {/* South America */}
              <path
                d="M240 280 Q300 290 320 340 Q310 420 270 470 Q240 430 220 360 Q210 300 240 280 Z"
                fill="#06592b"
              />
              {/* Europe */}
              <path
                d="M440 80 Q510 70 540 110 Q520 160 470 170 Q430 150 420 110 Z"
                fill="#06592b"
              />
              {/* Africa & Horn of Africa */}
              <path
                d="M450 180 Q530 170 570 230 Q610 270 580 340 Q550 410 500 440 Q450 380 430 300 Q420 220 450 180 Z"
                fill="#0a6e35"
              />
              {/* Middle East & Asia */}
              <path
                d="M570 150 Q660 120 780 140 Q840 200 800 280 Q700 290 630 260 Q580 220 570 150 Z"
                fill="#06592b"
              />
              {/* Australia */}
              <path
                d="M750 350 Q830 340 860 380 Q840 440 780 440 Q740 400 750 350 Z"
                fill="#06592b"
              />

              {/* Connecting flight / knowledge pipeline vectors from Addis Ababa (580, 275) */}
              <path
                d="M580 275 Q420 180 270 190"
                stroke="#f3a310"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
                className="opacity-75"
              />
              <path
                d="M580 275 Q520 180 470 150"
                stroke="#f3a310"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
                className="opacity-75"
              />
              <path
                d="M580 275 Q600 230 620 220"
                stroke="#f3a310"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
                className="opacity-75"
              />
              <path
                d="M580 275 Q575 290 570 300"
                stroke="#f3a310"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
                className="opacity-75"
              />
            </svg>

            {/* Interactive Chapter Pins */}
            {filteredChapters.map(chapter => {
              const isSelected = activeChapter.id === chapter.id;
              const isHQ = chapter.id === 'addis-ababa';

              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => handleNodeClick(chapter)}
                  style={{
                    left: `${chapter.coordinates.x}%`,
                    top: `${chapter.coordinates.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f3a310] rounded-full p-1 transition-transform transform hover:scale-125 z-20 cursor-pointer"
                  aria-label={`${chapter.city}, ${chapter.country} Chapter`}
                >
                  {/* Outer pulse ring */}
                  <span
                    className={`absolute inset-0 rounded-full ${
                      isHQ ? 'bg-[#f3a310]/50 animate-ping' : isSelected ? 'bg-white/40 animate-ping' : 'bg-[#06592b]/30'
                    }`}
                  />
                  {/* Pin core */}
                  <div
                    className={`relative w-4 h-4 rounded-full flex items-center justify-center shadow-lg transition-all ${
                      isHQ
                        ? 'bg-[#f3a310] border-2 border-white ring-2 ring-[#f3a310]/60 w-5 h-5'
                        : isSelected
                        ? 'bg-white border-2 border-[#f3a310] w-4 h-4'
                        : 'bg-[#06592b] border border-[#f3a310]/60 hover:bg-[#f3a310]'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isHQ ? 'bg-[#1a2805]' : isSelected ? 'bg-[#1a2805]' : 'bg-white'}`} />
                  </div>

                  {/* Label tooltip on hover or when selected */}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 top-5 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap rounded pointer-events-none transition-all ${
                      isSelected
                        ? 'bg-[#f3a310] text-[#1a2805] shadow-md opacity-100'
                        : 'bg-black/80 text-white opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {chapter.city} {isHQ && '(HQ)'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-white/60 mt-3 pt-2 border-t border-white/10 gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f3a310]" />
                <strong className="text-white">Global Headquarters</strong> (Addis Ababa)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#06592b] border border-white/50" />
                Active Diaspora & Regional Chapters
              </span>
            </div>
            <span className="text-[11px] text-white/50">Real-time hub synchronization</span>
          </div>
        </div>

        {/* Chapter Detail Inspector Card with AnimatePresence */}
        <div className="lg:col-span-4 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-white flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChapter.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#f3a310]" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#f3a310]">
                    {activeChapter.region} Hub
                  </span>
                </div>
                {activeChapter.id === 'addis-ababa' ? (
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#f3a310] text-[#1a2805]">
                    Global HQ
                  </span>
                ) : (
                  <span className="text-xs text-white/60">Est. {activeChapter.established}</span>
                )}
              </div>

              <div className="mt-4">
                <h4 className="text-2xl font-bold text-white tracking-tight">
                  {activeChapter.city}
                </h4>
                <p className="text-xs text-white/70">{activeChapter.country}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 my-5 py-3 px-3 bg-black/20 rounded-lg border border-white/5">
                <div>
                  <span className="text-[11px] text-white/60 uppercase">Active Members</span>
                  <p className="text-xl font-bold font-mono text-[#f3a310] tabular-nums">
                    {activeChapter.membersCount}+
                  </p>
                </div>
                <div>
                  <span className="text-[11px] text-white/60 uppercase">Coordination</span>
                  <p className="text-xs font-semibold text-white truncate mt-1">
                    {activeChapter.leads}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#f3a310] uppercase tracking-wider block">
                  Primary Focus Areas:
                </span>
                <p className="text-xs leading-relaxed text-white/80 bg-white/5 p-3 rounded border border-white/5">
                  {activeChapter.focus}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="pt-6 mt-4 border-t border-white/10 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[11px] text-white/70">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official accredited EYGN Chapter</span>
            </div>
            <a
              href="#contact"
              className="mt-2 w-full py-3 px-4 text-center text-[15px] font-medium text-[#1a2805] bg-[#f3a310] hover:bg-[#e09407] rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Connect with {activeChapter.city} desk</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
