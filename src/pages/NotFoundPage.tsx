import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Mail } from 'lucide-react';
import { ROUTES } from '../lib/routes';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <div className="max-w-lg mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#06592b]">
          <span className="w-2 h-2 rounded-full bg-[#f3a310]" />
          <span>Page not found</span>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-[#1a2805] text-[#f3a310] flex items-center justify-center mx-auto border border-[#f3a310]/30 shadow-sm">
          <Compass className="w-8 h-8" />
        </div>

        {/* H1: 32-40px, Bold, Primary Green (#1a2805) */}
        <h1 className="text-[32px] sm:text-[36px] font-bold text-[#1a2805] tracking-tight leading-tight">
          This dispatch didn't reach its destination
        </h1>
        <p className="text-[16px] text-[#1a2805] leading-relaxed">
          The page you're looking for doesn't exist, may have moved, or the link may be out of date.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to={ROUTES.home}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#1a2805] hover:bg-[#06592b] text-[#f3a310] font-medium text-[16px] rounded-xl shadow-md transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to home</span>
          </Link>
          <Link
            to={ROUTES.contact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-white hover:bg-stone-50 text-[#1a2805] font-medium text-[16px] rounded-xl border border-stone-300 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Contact the secretariat</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
