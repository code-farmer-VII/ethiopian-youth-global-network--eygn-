/**
 * Real social media URLs (F11, brief must-have: "social media links and sharing"). Each one is
 * env-driven and optional -- none are set by default, since inventing placeholder social
 * accounts would be worse than having none. Set whichever the org actually has in .env/.env.local
 * (see .env.example) and the corresponding icon appears automatically in Footer and ContactPage;
 * unset ones are simply omitted, not shown broken/empty.
 */
import type { LucideIcon } from 'lucide-react';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

interface SocialLink {
  name: string;
  url: string;
  Icon: LucideIcon;
}

const CANDIDATES: { name: string; envUrl: string | undefined; Icon: LucideIcon }[] = [
  { name: 'Facebook', envUrl: import.meta.env.VITE_SOCIAL_FACEBOOK, Icon: Facebook },
  { name: 'Twitter / X', envUrl: import.meta.env.VITE_SOCIAL_TWITTER, Icon: Twitter },
  { name: 'Instagram', envUrl: import.meta.env.VITE_SOCIAL_INSTAGRAM, Icon: Instagram },
  { name: 'LinkedIn', envUrl: import.meta.env.VITE_SOCIAL_LINKEDIN, Icon: Linkedin },
  { name: 'YouTube', envUrl: import.meta.env.VITE_SOCIAL_YOUTUBE, Icon: Youtube },
];

export const SOCIAL_LINKS: SocialLink[] = CANDIDATES.filter(
  (c): c is { name: string; envUrl: string; Icon: LucideIcon } => Boolean(c.envUrl?.trim()),
).map(({ name, envUrl, Icon }) => ({ name, url: envUrl, Icon }));
