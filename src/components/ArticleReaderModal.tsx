import React, { useEffect, useState } from 'react';
import { getPost, PostDetail } from '../lib/api';
import { X, Calendar, MapPin, Clock, Share2, Check, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { modalBackdropVariants, modalDialogVariants } from '../utils/motion';

interface ArticleReaderModalProps {
  slug: string | null;
  onClose: () => void;
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({ slug, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [post, setPost] = useState<PostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setPost(null);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    getPost(slug)
      .then(setPost)
      .catch(() => setError('This article could not be loaded. Please try again.'))
      .finally(() => setIsLoading(false));
  }, [slug]);

  const handleShare = () => {
    if (!post) return;
    navigator.clipboard.writeText(`${post.title} - Ethiopian Youth Global Network`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {slug && (
        <motion.div
          variants={modalBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            variants={modalDialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky top bar */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#06592b] uppercase tracking-wider">
                <span>{post?.categories.join(', ') ?? ' '}</span>
                <span className="text-stone-300">·</span>
                <span>EYGN Media & Communication</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  disabled={!post}
                  className="p-2 text-stone-500 hover:text-[#1a2805] hover:bg-stone-100 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
                  title="Share article"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Article Body */}
            <div className="p-6 sm:p-10">
              {isLoading && (
                <div className="py-16 text-center text-sm text-stone-500">Loading article…</div>
              )}

              {error && !isLoading && (
                <div className="py-16 text-center text-sm text-red-600">{error}</div>
              )}

              {post && !isLoading && !error && (
                <>
                  {/* Metadata rail */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-4 pb-4 border-b border-stone-100">
                    <span className="flex items-center gap-1.5 font-medium text-[#1a2805]">
                      <Calendar className="w-3.5 h-3.5 text-[#06592b]" />
                      {formatDate(post.publishedAt)}
                    </span>
                    {post.readingTime && (
                      <>
                        <span className="text-stone-300">·</span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          {post.readingTime}
                        </span>
                      </>
                    )}
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
                  {post.author && (
                    <div className="flex items-center gap-3 p-3.5 mb-8 bg-stone-50 border border-stone-200 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-[#1a2805] text-[#f3a310] flex items-center justify-center font-bold text-sm">
                        {post.author.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#1a2805] block">{post.author}</span>
                        <span className="text-[11px] text-stone-500">Official Release · Ethiopian Youth Global Network</span>
                      </div>
                    </div>
                  )}

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
                    {post.body.map((paragraph, idx) => (
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
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
