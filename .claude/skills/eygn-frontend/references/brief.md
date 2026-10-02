# EYGN Website Development Brief — condensed

Source: `/home/francis/Documents/eygn/backend/EYGN_Website_Development_Brief.docx` (March 2026).
Re-extract if the docx changes: `pandoc EYGN_Website_Development_Brief.docx -t plain`.

## 1. Overview
- Org: Ethiopian Youth Global Network (EYGN) — global youth movement connecting Ethiopian youth worldwide.
- Audience: diaspora Ethiopian youth, local Ethiopian youth, partners, media.
- Goals: membership recruitment, program visibility, resource hub, event management.

## 2. Brand
| Name | Hex | Use |
|---|---|---|
| Primary Green | `#1a2805` | Headers, primary buttons, navigation |
| Green | `#06592b` | Emphasis text, hover states |
| Gold Accent | `#f3a310` | Footer, CTAs, highlights, important badges |
| White | `#ffffff` | Main background, cards |

Typography (not restricted): Source Sans Pro (Open Sans fallback). H1 32–40px bold Primary Green · H2 24–28px bold dark green · Body 16px regular dark · Buttons 16px medium, sentence case.
Style: modern, clean, professional; youth-focused but credible for partners; mobile-first (60%+ mobile); high contrast; generous whitespace.

## 3. Technical checklist
Must-have: responsive (mobile/tablet/desktop) · <3s load on 3G · SEO (meta tags, structured data) · contact forms **with email notifications** · event registration system · membership application form · newsletter signup integration · social media links and sharing · WCAG 2.1 AA · SSL.
Recommended: interactive global chapter map · CMS · blog/news with categories · photo/video gallery with lightbox · member directory (optional) · multilingual (EN, Amharic, French — future) · live social feed.

## 4. Page checklist
- **Home**: hero headline + CTA · mission (1–2 sentences) · stats counter (members, countries, programs) · featured program · upcoming events preview (2–3) · latest news (3 posts) · prominent "Join the Network" · footer with contact info + social links.
- **About**: intro · why EYGN exists · who we serve · vision · mission · 6 core values with descriptions.
- **Team**: Global Ambassador · **Senior Advisor** · General Secretary · leadership team — each with photo, name, role, bio.
- **Programs**: DEAIP · Green Legacy · Leadership Academy · Future Programs · event detail page template · registration form · past events archive · each program: description, activities, how to join.
- **Media Center**: newsletter · photo gallery · video gallery · press coverage.
- **Membership & Partnership**: benefits list · application form (**name, email, country, profession, interest**) · confirmation message.
- **Contact**: contact form · official email address · social media links.

## 5. Approved copy (use verbatim)
- Hero headline: **Empowering Ethiopian Youth to Lead Global Change**
- Hero subtitle / Mission: Connecting and empowering Ethiopian youth worldwide to serve Ethiopia through knowledge, innovation, and leadership.
- CTA: Join the Network
- Vision: A globally connected generation of Ethiopian youth leading Ethiopia's transformation.
- Stats (update quarterly; placeholders): Members Worldwide 500+ · Countries Represented 15+ · Programs Launched 6 · Events Organized 20+.
- Tagline: Connecting and Empowering — Many Minds. One Future. One Ethiopia.
- Official emails: info@ethiopianyouthglobalnetwork.org, support@ethiopianyouthglobalnetwork.org, partner@ethiopianyouthglobalnetwork.org. Brief contact: ethiopianyouthglobalnetwork@gmail.com.

About intro, "Why EYGN exists", "Who we serve" — full paragraphs are already verbatim in the frontend `EYGN_INFO` (`aboutIntroduction`, `whyExists`, `whoWeServe`) in `src/data/eygnData.ts`; treat that as the canonical copy.

Core values (verbatim in `CORE_VALUES`): Unity · Integrity · Excellence · Collaboration · Youth Empowerment · National Service.

Leadership:
- Founder & Global Ambassador — Mr. Sisay Lucas: technology innovator (FinTech, digital wallets); UN Climate Delegate at COP28 & COP29; UN Ocean Delegate; represents EYGN internationally.
- General Secretary — Ms. Amen Biniyam: coordination, documentation, internal communication.
- Department heads: Media & Communication — Mr. Amanuel Lemma · Partnerships & Outreach — Mr. Yonas Anbiko · Operations & Coordination — Ms. Fenet Yohannes · Public Relations — Ms. Yasmin Ibrahim · International Relations & Research — Ms. Meseret Kiros · Youth Mobilization & Campaign Strategy — Ms. Rebecca Nebiu · Events & Program Coordination — Ms. Heldana Teklit.
- Senior Advisor: required by the page checklist but **no name/bio supplied in the brief** — ask the org, don't invent.

## 6. Initial blog posts
| # | Date | Title | Categories |
|---|---|---|---|
| 1 | 2026-03-12 | EYGN Leaders Visit Global Black Center at Adwa Victory Memorial Museum | Partnerships, Pan-Africanism |
| 2 | 2026-03-02 | EYGN Leaders Celebrate Adwa Victory Day at Adwa Museum | Events, Heritage |
| 3 | 2026-03 | Announcing Ethiopian Chapter Leaders | Announcements, Leadership |
| 4 | 2026-02 | EYGN Leaders Attend Community-Based Education Session at AAU | Education, Partnership |
| 5 | 2026-07-29/30 | EYGN Leaders Attend the First World Public Summit | Diplomacy, Global |

Posts have **multiple categories**. Full bodies are in the docx and mirrored in frontend `BLOG_POSTS`.

## 7. Final delivery checklist
Before launch: tested on mobile · all forms working · links verified · images optimized · SEO meta on all pages · favicon · Google Analytics · Open Graph preview images · 404 page · privacy policy page.
Content: proofread · alt text on all images · contact info correct · social links working · emails clickable (`mailto:`).
Handover: admin credentials · CMS training · backups configured · documentation · source files.
