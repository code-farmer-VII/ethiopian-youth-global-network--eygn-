import React, { useEffect, useState } from 'react';
import { GALLERY_ITEMS } from '../data/eygnData';
import { MediaItem } from '../types';
import { listCategories, listPosts, PostSummary } from '../lib/api';
import { Image as ImageIcon, Download, Play, Search, Eye, ArrowRight, Check } from 'lucide-react';

interface MediaPageProps {
  onSelectPost: (slug: string) => void;
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export const MediaPage: React.FC<MediaPageProps> = ({ onSelectPost }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'photos' | 'press'>('posts');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [downloadedItem, setDownloadedItem] = useState<string | null>(null);

  const [categories, setCategories] = useState<string[]>(['All']);
  const [posts, setPosts] = useState<PostSummary[]>([]);

  useEffect(() => {
    listCategories()
      .then(setCategories)
      .catch(() => setCategories(['All']));
  }, []);

  useEffect(() => {
    listPosts({ category: selectedCategory === 'All' ? undefined : selectedCategory, size: 100 })
      .then((res) => setPosts(res.content))
      .catch(() => setPosts([]));
  }, [selectedCategory]);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchFilter.trim() ||
      post.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesSearch;
  });

  const handleDownload = (title: string) => {
    const content = `ETHIOPIAN YOUTH GLOBAL NETWORK (EYGN)\nOfficial Publication: ${title}\nDate: March 2026\nHeadquarters: Adwa Memorial Complex, Addis Ababa, Ethiopia\n\nVerified Document Copy. For inquiries contact info@ethiopianyouthglobalnetwork.org`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadedItem(title);
    setTimeout(() => setDownloadedItem(null), 3000);
  };

  return (
    <div className="space-y-12 lg:space-y-16 py-6">
      {/* 1. Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#06592b]">
          <span className="w-2 h-2 rounded-full bg-[#f3a310]" />
          <span>Press, dispatches & visual archives</span>
        </div>
        {/* H1: 32-40px, Bold, Primary Green (#1a2805) */}
        <h1 className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold text-[#1a2805] tracking-tight leading-[1.16]">
          EYGN Media Center & Official Communiqués
        </h1>
        {/* Body: 16px, Regular, Dark color */}
        <p className="text-[16px] text-[#1a2805] leading-relaxed max-w-2xl mx-auto">
          Official announcements, diplomatic delegations, Pan-African museum visits, and university partnerships.
        </p>

        {/* View Switcher Tabs: 15-16px, Medium, sentence case */}
        <div className="inline-flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 mt-2">
          <button
            type="button"
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 text-[15px] font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'posts'
                ? 'bg-white text-[#1a2805] shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Official dispatches ({posts.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2 text-[15px] font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-white text-[#1a2805] shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Visual archives ({GALLERY_ITEMS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('press')}
            className={`px-4 py-2 text-[15px] font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'press'
                ? 'bg-white text-[#1a2805] shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Press kit & downloads
          </button>
        </div>
      </section>

      {/* 2. TAB: BLOG POSTS / DISPATCHES */}
      {activeTab === 'posts' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Filter and Search Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-stone-200">
            {/* Category pills */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg overflow-x-auto max-w-full self-start md:self-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white text-[#1a2805] shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Keyword search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search articles & communiqués..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-[15px] rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b] bg-white"
              />
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs hover:border-[#06592b] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Clean unboxed metadata row */}
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="font-semibold text-[#06592b]">{post.categories.join(', ')}</span>
                    <span aria-hidden="true">·</span>
                    <span>{formatDate(post.publishedAt)}</span>
                    {post.readingTime && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{post.readingTime}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-[19px] font-bold text-[#1a2805] group-hover:text-[#06592b] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-[14px] text-stone-600 leading-relaxed line-clamp-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 truncate max-w-[140px]">{post.author}</span>
                  {/* Buttons: 16px, Medium, sentence case */}
                  <button
                    type="button"
                    onClick={() => onSelectPost(post.slug)}
                    className="font-medium text-[15px] text-[#06592b] group-hover:text-[#1a2805] flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Read full dispatch</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 3. TAB: VISUAL ARCHIVES */}
      {activeTab === 'photos' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxItem(item)}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:border-[#06592b] cursor-pointer group transition-all"
              >
                {/* Visual Canvas */}
                <div className="aspect-[4/3] bg-[#1a2805] relative flex items-center justify-center p-6 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-dark-pattern opacity-40 group-hover:scale-105 transition-transform duration-300" />
                  
                  {/* Geometric emblem */}
                  <div className="relative z-10 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#f3a310]/20 text-[#f3a310] border border-[#f3a310]/40 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      {item.type === 'video' ? <Play className="w-5 h-5 ml-0.5" /> : <ImageIcon className="w-5 h-5" />}
                    </div>
                    <span className="text-xs font-semibold text-white/90 block max-w-xs truncate">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-white/60 block">
                      {item.location}
                    </span>
                  </div>

                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono flex items-center gap-1">
                    <Eye className="w-3 h-3 text-[#f3a310]" />
                    <span>View</span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-semibold text-[#06592b]">{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h4 className="text-[16px] font-bold text-[#1a2805] group-hover:text-[#06592b] transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[13px] text-stone-600 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {lightboxItem && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in"
              onClick={() => setLightboxItem(null)}
            >
              <div
                className="bg-[#1a2805] text-white rounded-2xl max-w-2xl w-full p-6 space-y-4 border border-[#f3a310]/30 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start border-b border-white/10 pb-3">
                  <div>
                    <span className="text-xs text-[#f3a310] uppercase font-semibold block">
                      {lightboxItem.category} archive · {lightboxItem.date}
                    </span>
                    <h3 className="text-xl font-bold text-white">{lightboxItem.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightboxItem(null)}
                    className="text-white/60 hover:text-white p-1 rounded cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="aspect-[16/9] bg-black/50 rounded-xl flex items-center justify-center border border-white/10 relative p-6 text-center">
                  <div className="space-y-2">
                    <div className="w-16 h-16 rounded-full bg-[#f3a310]/20 text-[#f3a310] flex items-center justify-center mx-auto border border-[#f3a310]/50">
                      {lightboxItem.type === 'video' ? <Play className="w-8 h-8 ml-1" /> : <ImageIcon className="w-8 h-8" />}
                    </div>
                    <p className="text-sm font-medium text-white">{lightboxItem.title}</p>
                    <p className="text-xs text-stone-400">{lightboxItem.location}</p>
                  </div>
                </div>

                <p className="text-[14px] text-stone-300 leading-relaxed">
                  {lightboxItem.description}
                </p>

                <div className="flex justify-end pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setLightboxItem(null)}
                    className="px-5 py-2.5 bg-[#f3a310] text-[#1a2805] font-medium text-[15px] rounded-xl cursor-pointer"
                  >
                    Close viewer
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 4. TAB: PRESS KIT & DOWNLOADS */}
      {activeTab === 'press' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'EYGN Official Website Development Brief',
                format: 'PDF · Technical Specifications',
                desc: 'Prepared by Mr. Amanuel Lemma, Head of Media & Communication. Core guidelines, brand specifications, and ready-to-use content.',
              },
              {
                title: 'EYGN Founding Charter & Constitution',
                format: 'PDF · Institutional Document',
                desc: 'Official governance framework, non-partisan declaration, diaspora engagement mechanisms, and strategic roadmap.',
              },
              {
                title: 'High-Resolution Brand Assets & Seal',
                format: 'ZIP · Vector Assets (SVG, EPS)',
                desc: 'Official wordmarks, emblem symbols, and color palette swatches (#1a2805, #06592b, #f3a310).',
              },
            ].map((kit, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-[11px] font-mono text-[#06592b] block mb-1">{kit.format}</span>
                  <h3 className="text-[18px] font-bold text-[#1a2805]">{kit.title}</h3>
                  <p className="text-[14px] text-stone-600 leading-relaxed mt-2">{kit.desc}</p>
                </div>

                {/* Buttons: 16px, Medium, sentence case */}
                <button
                  type="button"
                  onClick={() => handleDownload(kit.title)}
                  className="w-full py-3 px-4 bg-stone-100 hover:bg-[#1a2805] hover:text-[#f3a310] text-[#1a2805] text-[15px] font-medium rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {downloadedItem === kit.title ? (
                    <>
                      <Check className="w-4 h-4 text-[#06592b]" />
                      <span>Document downloaded</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download document</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
