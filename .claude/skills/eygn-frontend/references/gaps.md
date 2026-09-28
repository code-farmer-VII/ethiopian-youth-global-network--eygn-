# Frontend vs. brief — gaps (snapshot 2026-09-26, updated 2026-09-28)

**2026-09-28: F1–F8 done.** `src/lib/api.ts` (+ `src/lib/api-error.ts`) is a typed client for every current `eygn-api` endpoint, reading `VITE_API_BASE_URL` (new `.env.example` entry, falls back to `http://localhost:8080/api/v1`). Forms F2–F6 (membership, partnership, event registration, contact, newsletter) all call the real API with inline error handling — see the mismatch table below for each. F7: blog posts are real API data everywhere they appear — `HomePage.tsx` (latest 3), `MediaPage.tsx` (category-filtered + client-side search over the filtered page), `GlobalSearchModal.tsx` (fetches up to 100 posts on open, searches title/excerpt/categories), and `ArticleReaderModal.tsx` (now takes a `slug` prop instead of a `BlogPost` object and fetches `GET /posts/:slug` itself, with its own loading/error state). `api.ts`'s `PostSummary`/`PostDetail` types were stale from before B7 shipped — updated to include `author`/`readingTime` (summary) and `author`/`location`/`featuredQuote`/`readingTime` (detail). All driven end-to-end through the real browser UI against a live backend (temp Postgres + temp `eygn-api`) seeded with all 5 brief blog posts and their real categories. F8: programs are real API data — `ProgramsPage.tsx` (selector + deep-dive, `Program` frontend type replaced by `api.ts`'s `ProgramDto`, keyed by `slug` since the API has no numeric/string `id`), `HomePage.tsx` (featured 3), `GlobalSearchModal.tsx` (fetched alongside posts on open). `ProgramDto`'s optional fields (`subtitle`/`pillar`/`targetAudience`/`howToJoin`/`stats`) are all nullable to match the real B7 schema — every consumer guards for null rather than assuming presence like the old static `Program` type did. Verified against all 4 real brief programs, including `future-programs` (the one with `stats: null`) to confirm the null path renders cleanly. F9–F10 (team, events data) still open.

**Known quirk hit while testing F4, not caused by it:** `EventRegistrationModal` is always mounted in `App.tsx` (only its `event` prop changes), so its internal `step`/`formData`/`passId` state persists across close/reopen — closing a "confirmed" modal and clicking "Register for event" again reopens straight to the confirmed screen instead of a fresh form, until the page reloads. Worth a `key={event.id}` on the modal or a reset-on-close effect if this bites in practice.

Legend: ✅ done · 🟡 UI only / partial · ❌ missing. Re-verify in code before relying on a row; update when a gap closes.

## Form ↔ API mismatches
Forms are still local-state mocks and content still comes from `src/data/eygnData.ts` — the client exists (F1) but nothing is wired to it yet.

| Frontend flow | File | Backend endpoint | Mismatch |
|---|---|---|---|
| Membership application | `pages/MembershipPage.tsx` | `POST /members` (client: `submitMembershipApplication`) | Done (F2). `handleSubmit` calls the API, maps interest labels through `INTEREST_AREA_TO_API`, and shows duplicate-email/validation errors. Note: the form's default `interestAreas` state includes `'Climate Action'`, which doesn't match any option in `interestOptions` (`'Climate Action (Green Legacy)'`) — a pre-existing bug, not introduced by F2 — so that default toggle never renders as selected and is silently dropped from the submission if the user doesn't reselect it. `newsletterOptIn` and `phone` are collected but not yet exposed in the visible form fields (state defaults only). |
| Partnership inquiry | `pages/MembershipPage.tsx` (`handlePartnerSubmit`) | `POST /partnership-inquiries` (client: `submitPartnershipInquiry`) | Done (F3). The form had no `value`/`onChange` on any field at all before this — `handlePartnerSubmit` couldn't have read user input even though it "submitted". Now has its own `partnerFormData` state; `Collaboration Domain` sends the select's display text as-is (`collaborationDomain` is free text on the backend, not an enum). |
| Event registration | `components/EventRegistrationModal.tsx` | `POST /events/:slug/registrations` (client: `registerForEvent`) | Done (F4). Modal calls `registerForEvent(event.id, ...)` and derives the displayed pass id from the real registration id. `event.id` is still a static mock string (`event-1`) until F10 replaces `UPCOMING_EVENTS`/`PAST_EVENTS` with real API data — against a real deployment this 404s until then; tested by seeding a backend event with `slug = 'event-1'` to match. The extra fields the modal collects (city/country, attendance mode, institutional affiliation) aren't in `EventRegistrationInput` and are not sent. |
| Events / past archive | `UPCOMING_EVENTS`, `PAST_EVENTS` | `GET /events?when=upcoming\|past`, `GET /events/:slug` (client: `listEvents`, `getEvent`) | API now returns the full shape the UI needs — location, type, category, featuredSpeakers, capacity, registeredCount, status (B3, done). F10: replace the static arrays. |
| Contact form | `pages/ContactPage.tsx` | `POST /contact-messages` (client: `submitContactMessage`) | Done (F5). `handleSubmit` calls the API, mapping the department select's display label (e.g. `'Partnerships & Outreach (Mr. Yonas Anbiko)'`) through `DEPARTMENT_TO_API` to the enum key (`partnerships_outreach`); shows validation errors inline. |
| Newsletter | `components/Footer.tsx` | `POST /newsletter/subscribers` (client: `subscribeToNewsletter`) | Subscribe done (F6). No unsubscribe UI exists anywhere in the app (`unsubscribeFromNewsletter` in `api.ts` is unused) — deliberately not built yet, since `DELETE /newsletter/subscribers/:email` still needs no auth (B11, open); shipping an unsubscribe-by-email-in-a-link flow before that lands would ship the exact hole B11 flags. Build it once B11's signed token exists. |
| Blog/news | `HomePage`, `MediaPage`, `GlobalSearchModal`, `ArticleReaderModal` | `GET /posts`, `GET /posts/:slug` (client: `listPosts`, `getPost`) | Done (F7). `BLOG_POSTS` and the `BlogPost` type are no longer imported anywhere in `src/pages`/`src/components` (still exported from `eygnData.ts`/`types/index.ts` — unused, not removed, in case something else needs it). `MediaPage`'s category pills come from `GET /categories` instead of a hardcoded list; its per-card `featuredQuote` preview was dropped since `PostSummary` doesn't carry it (only `PostDetail` does) — a deliberate UI simplification, not a bug. |
| Programs | `ProgramsPage`, `HomePage`, `GlobalSearchModal` | `GET /programs` (client: `listPrograms`) | Done (F8). `PROGRAMS` and the `Program` type are no longer imported anywhere in `src/pages`/`src/components`. |
| Team | `LEADERSHIP_TEAM` | `GET /team-members` | API lacks photo, department, highlights, email, linkedin. |
| Chapters, gallery, stats, FAQs, benefits | static | none | Fine as static unless a CMS is required. |

## Brief must-haves (frontend side)
| Item | Status | Notes |
|---|---|---|
| Responsive | 🟡 | Tailwind responsive classes throughout; not device-tested. |
| <3s on 3G | ❓ | Unmeasured; Google Fonts loads two families. |
| SEO meta + structured data | 🟡 | One static `<title>`/description/OG in `index.html`; no per-page meta (no URLs), no JSON-LD, no OG image, no sitemap/robots. |
| Contact / event / membership / newsletter forms | 🟡 | UI done, not connected. |
| Social links & sharing | ❌ | No social profile links in Footer/Contact; team `linkedin` = placeholder `https://linkedin.com`; article share only copies link. |
| WCAG 2.1 AA | 🟡 | Some aria-labels; no `<label htmlFor>` anywhere in `src/` (labels unbound); modal focus trap/Escape unaudited. |

## Recommended
Chapter map ✅ (`ChapterMap.tsx`, static) · Blog with categories 🟡 · Gallery w/ lightbox 🟡 (placeholder items) · Multilingual 🟡 (toggle; only Navbar + Home translated) · Member directory ❌ · Live social feed ❌ · CMS ❌.

## Pages
- Home ✅ — footer lacks social links.
- About ✅.
- Team 🟡 — **Senior Advisor profile missing** (brief gives no name/bio — ask the org); no photos (`imageFallbackSeed`).
- Programs 🟡 — programs are real API data (F8); events (upcoming/past/registration) still static/mock until F10; no standalone event detail page/URL.
- Media Center 🟡 — gallery/video/press sections with placeholder items; no real media.
- Membership & Partnership 🟡 — benefits, form, confirmation (mock).
- Contact 🟡 — form (mock), `mailto:` emails ✅; social links ❌.

## Launch checklist
Favicon ❌ (no `public/` dir) · Google Analytics ❌ · OG image ❌ · 404 page ❌ (no routes) · Privacy policy ❌ · alt text n/a (no `<img>` yet) · README ❌ (AI Studio boilerplate).

## Scaffold hygiene
- AI Studio leftovers: package name `react-example` v0.0.0; boilerplate README; unused deps `@google/genai`, `express`, `dotenv`, `@types/express`, `tsx`; `.env.example` has `GEMINI_API_KEY`/`APP_URL`; `metadata.json`.
- `vite.config.ts` `@` alias points at project root, not `src`.
- `.idea/` and `package-lock.json` untracked.
