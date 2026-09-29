import React from 'react';
import { SOCIAL_LINKS } from '../lib/socialLinks';

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

/** Renders nothing if no VITE_SOCIAL_* env vars are set -- see src/lib/socialLinks.ts. */
export const SocialLinks: React.FC<SocialLinksProps> = ({ className, iconClassName }) => {
  if (SOCIAL_LINKS.length === 0) return null;

  return (
    <div className={className ?? 'flex items-center gap-3'}>
      {SOCIAL_LINKS.map(({ name, url, Icon }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`EYGN on ${name}`}
          className={iconClassName ?? 'text-white/70 hover:text-[#f3a310] transition-colors'}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
};
