---
name: eygn-frontend
description: Project knowledge for the EYGN (Ethiopian Youth Global Network) website frontend — React 19 + Vite + Tailwind v4, deployed on Vercel — built against the EYGN Website Development Brief. Use when adding or changing pages, components, copy, brand styling, SEO/accessibility, or wiring forms to the eygn-api backend, and when checking what the brief still requires on the frontend.
---

# EYGN Frontend

Repo: `/home/francis/Documents/eygn/ui/ethiopian-youth-global-network--eygn-`
Stack: React 19, Vite 8, Tailwind v4 (`@tailwindcss/vite`), lucide-react, motion, TypeScript. Vercel SPA (`vercel.json` rewrites everything to `index.html`).
Spec: `/home/francis/Documents/eygn/backend/EYGN_Website_Development_Brief.docx` (March 2026).

Reference files (read the one you need):
- `references/brief.md` — brand tokens, feature/page checklists, verbatim approved copy, launch checklist.
- `references/gaps.md` — what the brief requires vs. what exists, plus form↔API field mismatches. Check before planning; update when you close a gap.

Backend lives in a separate repo (`/home/francis/Documents/eygn/backend/eygn-api`, Express + Prisma, base `/api/v1`, port 8080). Its full endpoint contract is in that repo at `.claude/skills/eygn-api/references/api-contract.md` — read it before wiring a form.

## Brand rules (always apply)

- Colors: Primary Green `#1a2805` (headers, primary buttons, nav) · Green `#06592b` (emphasis, hover, H2) · Gold `#f3a310` (footer, CTAs, highlights, badges) · White `#ffffff` (background, cards). Hardcoded as Tailwind arbitrary values (`bg-[#06592b]`) — follow that; don't add a new palette.
- Font: Source Sans 3 / Source Sans Pro, Open Sans fallback (loaded in `index.html`, set in `src/index.css`).
- Type scale is encoded as base styles in `src/index.css`: H1 32–40px bold `#1a2805`, H2 24–28px bold `#06592b`, body 16px, buttons 16px medium **sentence case** (no uppercase buttons).
- Mobile-first (60%+ mobile users), high contrast, WCAG 2.1 AA, generous whitespace.
- Use approved copy from `references/brief.md` verbatim; don't invent mission/vision/bios/stats. Stats are placeholders the org will update.

## Conventions

- **No router.** `App.tsx` switches pages with `useState<PageType>`; `PageType` in `src/types/index.ts` is the page registry. Adding a page = add to `PageType`, render branch in `App.tsx`, entries in `Navbar.tsx` and `Footer.tsx`. If you introduce `react-router`, migrate all pages at once and keep the Vercel rewrite.
- **Content is static** in `src/data/eygnData.ts`: `EYGN_INFO`, `STATISTICS`, `CORE_VALUES`, `LEADERSHIP_TEAM`, `PROGRAMS`, `BLOG_POSTS`, `UPCOMING_EVENTS`, `PAST_EVENTS`, `CHAPTER_HUBS`, `GALLERY_ITEMS`, `MEMBERSHIP_BENEFITS`, `FAQS`, `TRANSLATIONS`. Types in `src/types/index.ts`.
- **Forms are mocks** — `handleSubmit` only flips local state (Contact, Membership, Partner, Event registration modal, Footer newsletter). No API client or `VITE_API_*` env var exists yet.
- Global modals (article reader, event registration, Ctrl/Cmd+K search) are owned by `App.tsx`; pages get callbacks (`onNavigate`, `onSelectPost`, `onRegisterEvent`).
- i18n: `Language = 'en' | 'am' | 'fr'` via `TRANSLATIONS[language]`; only Navbar and HomePage use it. Amharic/French are "future" in the brief — don't block on them.
- Scaffolded from Google AI Studio: `package.json` name `react-example`, boilerplate README, unused `@google/genai`/`express`/`dotenv` deps, `GEMINI_API_KEY` in `.env.example`, `metadata.json`. Nothing in `src/` uses Gemini.
- Verify: `npm run lint` (= `tsc --noEmit`), `npm run build`, `npm run dev` (port 3000).

## Common tasks

**Wire a form to the API**
1. Read the backend contract and the mismatch table in `references/gaps.md`.
2. Add a small typed client (e.g. `src/lib/api.ts`) using `import.meta.env.VITE_API_BASE_URL`; add the var to `.env.example`.
3. Replace the mock `handleSubmit`; keep the existing success UI; disable submit while pending; show `fieldErrors` (400) and `message` (409/404) from the API's error format `{ error, message }` / `{ error: "VALIDATION_FAILED", fieldErrors }`.
4. Resolve field mismatches deliberately (coordinate a backend change or trim the form) — never silently drop fields the user typed.

**Replace static data with API data** — keep the TS types in `src/types`, map API responses into them.

**Launch-readiness** — answer from the checklists in `references/brief.md` cross-checked against `references/gaps.md`, re-verifying in code (the gap list is a 2026-09-26 snapshot).
