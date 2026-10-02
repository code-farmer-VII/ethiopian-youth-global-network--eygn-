# Frontend vs. brief — gaps (snapshot 2026-09-26, updated 2026-09-28)

**2026-09-28: F1, F2, and F3 done.** `src/lib/api.ts` (+ `src/lib/api-error.ts`) is a typed client for every current `eygn-api` endpoint, reading `VITE_API_BASE_URL` (new `.env.example` entry, falls back to `http://localhost:8080/api/v1`). `MembershipPage.tsx`'s individual application form calls `submitMembershipApplication` (F2); its partner form — previously fully uncontrolled, no `value`/`onChange` on any field — now has real state and calls `submitPartnershipInquiry` (F3). Both show server-side errors inline and were driven end-to-end through the real browser UI against a live backend (temp Postgres + temp `eygn-api`); F3's submission was also checked directly in the database. F4–F6 (remaining forms) and F7–F10 (data) still open.

Legend: ✅ done · 🟡 UI only / partial · ❌ missing. Re-verify in code before relying on a row; update when a gap closes.

## Form ↔ API mismatches
Forms are still local-state mocks and content still comes from `src/data/eygnData.ts` — the client exists (F1) but nothing is wired to it yet.

| Frontend flow | File | Backend endpoint | Mismatch |
|---|---|---|---|
| Membership application | `pages/MembershipPage.tsx` | `POST /members` (client: `submitMembershipApplication`) | Done (F2). `handleSubmit` calls the API, maps interest labels through `INTEREST_AREA_TO_API`, and shows duplicate-email/validation errors. Note: the form's default `interestAreas` state includes `'Climate Action'`, which doesn't match any option in `interestOptions` (`'Climate Action (Green Legacy)'`) — a pre-existing bug, not introduced by F2 — so that default toggle never renders as selected and is silently dropped from the submission if the user doesn't reselect it. `newsletterOptIn` and `phone` are collected but not yet exposed in the visible form fields (state defaults only). |
| Partnership inquiry | `pages/MembershipPage.tsx` (`handlePartnerSubmit`) | `POST /partnership-inquiries` (client: `submitPartnershipInquiry`) | Done (F3). The form had no `value`/`onChange` on any field at all before this — `handlePartnerSubmit` couldn't have read user input even though it "submitted". Now has its own `partnerFormData` state; `Collaboration Domain` sends the select's display text as-is (`collaborationDomain` is free text on the backend, not an enum). |
| Event registration | `components/EventRegistrationModal.tsx` | `POST /events/:slug/registrations` (client: `registerForEvent`) | API now keys events by `slug`, not numeric id (X2, done) — frontend event ids (`event-1`) need to become real slugs once F10 replaces the static event data. Modal still fakes a pass id; F4 wires the real call. |
| Events / past archive | `UPCOMING_EVENTS`, `PAST_EVENTS` | `GET /events?when=upcoming\|past`, `GET /events/:slug` (client: `listEvents`, `getEvent`) | API now returns the full shape the UI needs — location, type, category, featuredSpeakers, capacity, registeredCount, status (B3, done). F10: replace the static arrays. |
| Contact form | `pages/ContactPage.tsx` | `POST /contact-messages` (client: `submitContactMessage`) | Backend now accepts subject + a `department` enum matching the form's 7 desks (X1, done) — frontend sends the enum key (e.g. `partnerships_outreach`), not the select's display label. F5 wires `handleSubmit`. |
| Newsletter | `components/Footer.tsx` | `POST /newsletter/subscribers`, `DELETE /newsletter/subscribers/:email` (client: `subscribeToNewsletter`, `unsubscribeFromNewsletter`) | OK — F6 wires it. |
| Blog/news | `BLOG_POSTS`, `ArticleReaderModal` | `GET /posts`, `/posts/:slug` | UI post has single `category` + author, location, featuredQuote, readingTime; API has `categories[]` (brief posts have 2 each) and none of the extras. |
| Programs | `PROGRAMS` | `GET /programs` | UI needs acronym, subtitle, activities[], targetAudience, howToJoin, stats, status, pillar; API has slug/title/description/isActive. |
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
- Programs 🟡 — 4 programs, registration (mock), past events (static); no standalone event detail page/URL.
- Media Center 🟡 — gallery/video/press sections with placeholder items; no real media.
- Membership & Partnership 🟡 — benefits, form, confirmation (mock).
- Contact 🟡 — form (mock), `mailto:` emails ✅; social links ❌.

## Launch checklist
Favicon ❌ (no `public/` dir) · Google Analytics ❌ · OG image ❌ · 404 page ❌ (no routes) · Privacy policy ❌ · alt text n/a (no `<img>` yet) · README ❌ (AI Studio boilerplate).

## Scaffold hygiene
- AI Studio leftovers: package name `react-example` v0.0.0; boilerplate README; unused deps `@google/genai`, `express`, `dotenv`, `@types/express`, `tsx`; `.env.example` has `GEMINI_API_KEY`/`APP_URL`; `metadata.json`.
- `vite.config.ts` `@` alias points at project root, not `src`.
- `.idea/` and `package-lock.json` untracked.
