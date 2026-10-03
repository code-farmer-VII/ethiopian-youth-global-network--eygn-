import { PageType } from '../types';

/** Single source of truth for every real, crawlable page URL (F12). */
export const ROUTES: Record<PageType, string> = {
  home: '/',
  about: '/about',
  programs: '/programs',
  team: '/team',
  media: '/media',
  membership: '/membership',
  contact: '/contact',
};

/** Secondary pages (footer-only, not part of the primary nav / PageType). */
export const PRIVACY_ROUTE = '/privacy';

/** Landing page for the newsletter double opt-in confirmation link emailed to subscribers (B16). */
export const NEWSLETTER_CONFIRM_ROUTE = '/newsletter/confirm';
