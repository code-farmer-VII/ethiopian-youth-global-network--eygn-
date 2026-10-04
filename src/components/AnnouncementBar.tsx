import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, X } from 'lucide-react';
import { getAnnouncementBanner, AnnouncementBannerDto } from '../lib/api';

const THEME_CLASSES: Record<AnnouncementBannerDto['type'], string> = {
  success: 'bg-emerald-800 text-white',
  alert: 'bg-amber-600 text-white',
  info: 'bg-slate-900 text-white',
};

/** Global site-wide announcement bar (B19), configured in the admin dashboard's System Settings
 * > Site Announcement Banner tab. Dismissing it only hides it for this tab/session -- it isn't
 * persisted, so it reappears on the next full visit, matching how a "campaign is still live"
 * banner is generally expected to behave. */
export const AnnouncementBar: React.FC = () => {
  const [banner, setBanner] = useState<AnnouncementBannerDto | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    getAnnouncementBanner()
      .then(setBanner)
      .catch(() => setBanner(null));
  }, []);

  if (!banner || !banner.enabled || !banner.text || dismissed) return null;

  const cta = banner.linkText && banner.linkUrl && (
    banner.linkUrl.startsWith('/') ? (
      <Link to={banner.linkUrl} className="underline hover:no-underline shrink-0">
        {banner.linkText}
      </Link>
    ) : (
      <a
        href={banner.linkUrl}
        target="_blank"
        rel="noreferrer"
        className="underline hover:no-underline shrink-0"
      >
        {banner.linkText}
      </a>
    )
  );

  return (
    <div className={`${THEME_CLASSES[banner.type]} px-4 sm:px-6 py-2.5`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold">
        <div className="flex items-center gap-2 min-w-0">
          <Megaphone className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="truncate">{banner.text}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {cta}
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss announcement"
            className="text-white/70 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
