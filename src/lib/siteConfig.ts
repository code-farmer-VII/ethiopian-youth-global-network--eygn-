/**
 * The site's real production origin, used to build canonical URLs, OG/Twitter image URLs, and
 * JSON-LD `url` fields. Falls back to the domain already used throughout the brief and this
 * codebase's own official email addresses (info@/support@/partner@ethiopianyouthglobalnetwork.org)
 * -- NOT a guess, but also not confirmed as the actual deployed hostname. Set VITE_SITE_URL once
 * the real production domain is confirmed (see .env.example).
 */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://ethiopianyouthglobalnetwork.org').replace(/\/+$/, '');
