import React from 'react';
import { BlogPost } from '../types';
import { X, Calendar, MapPin, User, Clock, Share2, Check, Bookmark, ArrowLeft } from 'lucide-react';

interface ArticleReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({ post, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!post) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(`${post.title} - Ethiopian Youth Global Network`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky top bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#06592b] uppercase tracking-wider">
            <span>{post.category}</span>
            <span className="text-stone-300">·</span>
            <span>EYGN Media & Communication</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 text-stone-500 hover:text-[#1a2805] hover:bg-stone-100 rounded-lg transition-colors"
              title="Share article"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-10">
          {/* Metadata rail */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-4 pb-4 border-b border-stone-100">
            <span className="flex items-center gap-1.5 font-medium text-[#1a2805]">
              <Calendar className="w-3.5 h-3.5 text-[#06592b]" />
              {post.date}
            </span>
            <span className="text-stone-300">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              {post.readingTime}
            </span>
            {post.location && (
              <>
                <span className="text-stone-300">·</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  {post.location}
                </span>
              </>
            )}
          </div>

          {/* Title: H1: 32-40px, Bold, Primary Green */}
          <h1 className="text-[28px] sm:text-[34px] font-bold text-[#1a2805] leading-tight mb-4">
            {post.title}
          </h1>

          {/* Author attribution */}
          <div className="flex items-center gap-3 p-3.5 mb-8 bg-stone-50 border border-stone-200 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-[#1a2805] text-[#f3a310] flex items-center justify-center font-bold text-sm">
              {post.author.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <span className="text-xs font-semibold text-[#1a2805] block">{post.author}</span>
              <span className="text-[11px] text-stone-500">Official Release · Ethiopian Youth Global Network</span>
            </div>
          </div>

          {/* Featured pullquote if available */}
          {post.featuredQuote && (
            <div className="my-8 border-l-4 border-[#f3a310] pl-6 py-2 bg-stone-50 rounded-r-xl">
              <p className="text-[18px] italic text-[#1a2805] leading-relaxed">
                "{post.featuredQuote}"
              </p>
            </div>
          )}

          {/* Narrative paragraphs: Body: 16px, Regular, Dark color */}
          <div className="space-y-4 text-[#1a2805] leading-relaxed text-[16px]">
            {post.content.map((paragraph, idx) => (
              <p key={idx} className={idx === 0 ? 'text-[17px] font-medium text-[#1a2805]' : ''}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>
              Published by <strong className="text-[#1a2805]">EYGN Media & Communication Directorate</strong>.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 text-[15px] font-medium text-[#06592b] hover:text-[#1a2805] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to articles</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
