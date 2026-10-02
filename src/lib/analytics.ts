/**
 * Google Analytics 4 (F15, launch checklist item), gated entirely behind VITE_GA_MEASUREMENT_ID
 * (see .env.example) -- with it unset, initAnalytics() and trackPageView() are both no-ops and
 * no GA script is ever loaded. There is no real measurement id to put here; set one when the org
 * has a GA4 property.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let initialized = false;

/** Call once, at app startup. Loads gtag.js and configures GA4 -- only if MEASUREMENT_ID is set. */
export function initAnalytics(): void {
  if (initialized || !MEASUREMENT_ID) return;
  initialized = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  // send_page_view: false -- this is an SPA, so page views are tracked explicitly per route
  // change via trackPageView() (see App.tsx's ScrollToTop) rather than once on initial load only.
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });
}

/** Call on every route change. No-ops if analytics was never initialized (no measurement id). */
export function trackPageView(path: string, title?: string): void {
  if (!initialized || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}
