import React, { useState, useMemo, useEffect } from 'react';
import { CHAPTER_HUBS } from '../data/eygnData';
import { listPosts, listPrograms, listTeamMembers, PostSummary, ProgramDto, TeamMemberDto } from '../lib/api';
import { Search, X, BookOpen, Users, FolderGit2, MapPin, ArrowRight } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPost: (slug: string) => void;
  onNavigate: (page: any) => void;
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPost,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [apiPosts, setApiPosts] = useState<PostSummary[]>([]);
  const [apiPrograms, setApiPrograms] = useState<ProgramDto[]>([]);
  const [apiTeam, setApiTeam] = useState<TeamMemberDto[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    listPosts({ size: 100 })
      .then((res) => setApiPosts(res.content))
      .catch(() => setApiPosts([]));
    listPrograms()
      .then(setApiPrograms)
      .catch(() => setApiPrograms([]));
    listTeamMembers()
      .then(setApiTeam)
      .catch(() => setApiTeam([]));
  }, [isOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return { posts: [], programs: [], team: [], chapters: [] };
    const q = query.toLowerCase();

    const posts = apiPosts.filter(
      p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.categories.some(c => c.toLowerCase().includes(q))
    );
    const programs = apiPrograms.filter(
      p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || (p.acronym && p.acronym.toLowerCase().includes(q))
    );
    const team = apiTeam.filter(
      t => t.fullName.toLowerCase().includes(q) || t.role.toLowerCase().includes(q) || (t.bio ?? '').toLowerCase().includes(q)
    );
    const chapters = CHAPTER_HUBS.filter(
      c => c.city.toLowerCase().includes(q) || c.country.toLowerCase().includes(q) || c.region.toLowerCase().includes(q)
    );

    return { posts, programs, team, chapters };
  }, [query, apiPosts, apiPrograms, apiTeam]);

  if (!isOpen) return null;

  const totalResults = results.posts.length + results.programs.length + results.team.length + results.chapters.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] shadow-2xl border border-stone-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-stone-200 bg-[#fcfdfa]">
          <Search className="w-5 h-5 text-stone-400 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search programs (DEAIP, Green Legacy), leadership, posts, chapters..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#1a2805] placeholder:text-stone-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-2 text-xs font-medium text-stone-500 hover:text-stone-900 px-2 py-1 bg-stone-100 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto flex-1 divide-y divide-stone-100">
          {!query.trim() ? (
            <div className="py-8 text-center text-xs text-stone-400 space-y-2">
              <p>Type keywords to search the entire Ethiopian Youth Global Network repository.</p>
              <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
                {['Adwa', 'DEAIP', 'Green Legacy', 'Sisay Lucas', 'AAU', 'Chapters'].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 text-xs rounded bg-stone-100 text-stone-600 hover:bg-[#1a2805] hover:text-[#f3a310] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-sm text-stone-500">
              No results found for "{query}". Try checking the spelling or using broader keywords.
            </div>
          ) : (
            <div className="space-y-4">
              {/* Programs */}
              {results.programs.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold text-[#06592b] uppercase tracking-wider block mb-2">
                    Programs & Flagships ({results.programs.length})
                  </span>
                  <div className="space-y-1.5">
                    {results.programs.map(p => (
                      <button
                        key={p.slug}
                        type="button"
                        onClick={() => {
                          onNavigate('programs');
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-stone-50 flex items-start gap-3 transition-colors group"
                      >
                        <FolderGit2 className="w-4 h-4 text-[#06592b] mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-[#1a2805] group-hover:text-[#06592b] block truncate">
                            {p.title} {p.acronym && `(${p.acronym})`}
                          </span>
                          <span className="text-[11px] text-stone-500 line-clamp-1">
                            {p.subtitle}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-[#1a2805] mt-1 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Posts */}
              {results.posts.length > 0 && (
                <div className="pt-3">
                  <span className="text-[11px] font-semibold text-[#06592b] uppercase tracking-wider block mb-2">
                    News & Media Articles ({results.posts.length})
                  </span>
                  <div className="space-y-1.5">
                    {results.posts.map(post => (
                      <button
                        key={post.slug}
                        type="button"
                        onClick={() => {
                          onSelectPost(post.slug);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-stone-50 flex items-start gap-3 transition-colors group"
                      >
                        <BookOpen className="w-4 h-4 text-[#f3a310] mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-[#1a2805] group-hover:text-[#06592b] block truncate">
                            {post.title}
                          </span>
                          <span className="text-[11px] text-stone-500 line-clamp-1">
                            {formatDate(post.publishedAt)} · {post.excerpt}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-[#1a2805] mt-1 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Leadership */}
              {results.team.length > 0 && (
                <div className="pt-3">
                  <span className="text-[11px] font-semibold text-[#06592b] uppercase tracking-wider block mb-2">
                    Leadership Directory ({results.team.length})
                  </span>
                  <div className="space-y-1.5">
                    {results.team.map(member => (
                      <button
                        key={member.fullName}
                        type="button"
                        onClick={() => {
                          onNavigate('team');
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-stone-50 flex items-start gap-3 transition-colors group"
                      >
                        <Users className="w-4 h-4 text-stone-500 mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-[#1a2805] group-hover:text-[#06592b] block truncate">
                            {member.fullName} — {member.role}
                          </span>
                          <span className="text-[11px] text-stone-500 line-clamp-1">
                            {member.department}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-[#1a2805] mt-1 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chapters */}
              {results.chapters.length > 0 && (
                <div className="pt-3">
                  <span className="text-[11px] font-semibold text-[#06592b] uppercase tracking-wider block mb-2">
                    Regional & Diaspora Chapters ({results.chapters.length})
                  </span>
                  <div className="space-y-1.5">
                    {results.chapters.map(c => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          onNavigate('home');
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-stone-50 flex items-start gap-3 transition-colors group"
                      >
                        <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-[#1a2805] group-hover:text-[#06592b] block truncate">
                            {c.city}, {c.country} ({c.region})
                          </span>
                          <span className="text-[11px] text-stone-500 line-clamp-1">
                            {c.focus}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-[#1a2805] mt-1 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
