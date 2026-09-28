# Frontend vs. brief — gaps (snapshot 2026-09-26)

Legend: ✅ done · 🟡 UI only / partial · ❌ missing. Re-verify in code before relying on a row; update when a gap closes.

## Form ↔ API mismatches
The frontend never calls the backend; every form is a local-state mock and all content comes from `src/data/eygnData.ts`.

| Frontend flow | File | Backend endpoint | Mismatch |
|---|---|---|---|
| Membership application | `pages/MembershipPage.tsx` | `POST /members` | Form collects phone, city, status, organizationOrUni, `interestAreas[]`, statementOfPurpose, newsletterOptIn; API takes only fullName, email, country, profession, single `interest` enum. Brief requires only name/email/country/profession/interest. |
| Partnership inquiry | `pages/MembershipPage.tsx` (`handlePartnerSubmit`) | **none** | Backend needs an endpoint. |
| Event registration | `components/EventRegistrationModal.tsx` | `POST /events/:id/registrations` | Frontend event ids are strings (`event-1`), API ids numeric. Modal fakes a pass id. |
| Events / past archive | `UPCOMING_EVENTS`, `PAST_EVENTS` | `GET /events` | API returns only future events as `{id,title,startsAt}`; UI needs location, type, category, description, speakers, capacity, registeredCount, status. |
| Contact form | `pages/ContactPage.tsx` | `POST /contact-messages` | Form has department `<select>` + subject; API takes name/email/message only. |
| Newsletter | `components/Footer.tsx` | `POST /newsletter/subscribers` | OK. |
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
