# WELELE MEDIA — STAGE C PLAN
## Brand & Business Architecture Expansion

> Status: Plan written after full inspection of the existing project, before implementation.
> Scope: positioning + architecture + content model + frontend structure.
> Out of scope: app integration, streaming, accounts, payments, AI generation infrastructure.

---

## 1. Current State (inspected)

### 1.1 Stack
- Next.js 15 (App Router) · React 19 · TypeScript (strict)
- Prisma 6 → dedicated PostgreSQL (`DATABASE_URL`), not yet wired into pages
- Vanilla CSS design system: `design-tokens.css` → `cinematic.css` → `globals.css`
- Standalone auth (`jose` + `bcryptjs`) and storage abstraction (local / dedicated S3/R2)
- Project is **not under git** → a full backup was taken to `_backup_pre_stage_c/` before changes

### 1.2 Existing routes
| Route | Type | Data source |
|---|---|---|
| `/` | Server | `lib/data.ts` |
| `/about` | Server | `lib/data.ts` |
| `/our-stories` | Client (filter/search) | `lib/data.ts` |
| `/our-stories/[slug]` | Server + client actions | `lib/data.ts` |
| `/creators`, `/creators/[slug]` | Server | `lib/data.ts` |
| `/partners` | Server | `lib/data.ts` |
| `/news`, `/news/[slug]` | Server | `lib/data.ts` |
| `/contact` + `POST /api/contact` | Server + client form | console log only |
| 404 | `not-found.tsx` | — |

### 1.3 Existing Prisma models
`SiteSettings`, `Story`, `Creator`, `StoryCreator`, `Partner`, `NewsArticle`, `ContactSubmission`, `MediaAsset`, `AdminUser`.

### 1.4 Existing components (`src/components/public`)
`Navigation`, `Footer`, `Logo`, `LivingHeroBackground`, `StoryCard`, `CreatorCard`, `PartnerCard`, `NewsCard`, `ContactForm`.

### 1.5 Existing homepage sections (in order)
1. Cinematic living hero
2. About teaser + stats grid
3. Featured stories (4 cards)
4. What We Do (4 service cards)
5. Creators + Partners teaser boxes
6. Newsroom preview
7. Contact CTA

### 1.6 Credibility audit (against Stage C §13)
| Location | Issue |
|---|---|
| `data.ts` stats | "500+ Stories Planned", "1M+ Target Viewers", "12+ Markets", "50+ Creators" — unconfirmed numbers |
| `data.ts` partners | Four named partners with claims (e.g. "45 million households") — fabricated partnerships |
| `data.ts` creators | "Award-winning", "fifteen years", "international festival honors" — unverified claims |
| `/about` | "Scale that matches our ambition" + stats, "Johannesburg / Nairobi / Lagos" hubs |
| `/contact` FAQ | "Our productions air on partner broadcast networks…", "quarterly committee" |
| `/partners` | "Turnkey production across SA, Kenya, Ghana, Nigeria backed by veteran crew" |
| Story detail | "Global SVOD & Linear Broadcast Rights Available", "+ My List" watchlist (app-like feature) |
| News | Article copy refers to "inaugural slate unveiled" — acceptable as announcement, softened |

---

## 2. Proposed Changes

### 2.1 Principles
- **Extend, don't replace.** Every existing route, component and style stays. Hero, cards and grids are reused.
- **One content layer.** A new `src/lib/content.ts` becomes the single access point pages use. Today it returns the typed defaults from `data.ts`; later it can read Prisma without any page changing.
- **Zero runtime coupling to the Welele App.** Platform is an *editorial record* in Welele Media's own data. The only relationship is a configurable outbound URL.

### 2.2 Information architecture
Primary navigation (7 items + CTA):

`Home · Our Stories · What We Do · Platform · Creators · Partners · News` → **Work With Us** (`/contact`)

- About and Contact move to the footer (pages are kept, not deleted).
- The "WATCH NOW" CTA is replaced by "Work With Us" (business-facing). The watch URL remains in Site Settings and is used by the Platform CTA.
- The desktop nav collapses to the hamburger at ≤1100px (7 links won't fit at tablet width).

---

## 3. Database Changes (`prisma/schema.prisma`)

All additive. No existing column is removed or renamed → safe migration.

### 3.1 New enums
```prisma
enum PublishStatus   { ACTIVE COMING_SOON DRAFT }
enum ServiceCategory { STORIES STUDIO ADVERTISING TECHNOLOGY CREATOR BRAND DISTRIBUTION }
enum CaseStudyStatus { DRAFT PUBLISHED ARCHIVED }
```

### 3.2 New models
- **Service**: id, title, slug, shortDescription, description, category, image, icon, status, featured, displayOrder, timestamps.
- **Platform**: id, name, slug, tagline, description, longDescription, logo, heroImage, screenshots (String[]), features (Json), benefits (Json), externalUrl, appStoreUrl, googlePlayUrl, ctaLabel, status, featured, displayOrder, timestamps.
- **CaseStudy**: title, slug, client, serviceId → Service (optional relation), description, challenge, solution, outcome, heroImage, gallery (String[]), videoUrl, technologies (String[]), isConceptual, featured, status, publishedAt, timestamps. **Seeded empty.**

### 3.3 Extended models
- **SiteSettings** (+ fields, all with defaults): logo/description, `heroMediaUrl`, `homepageSections` (Json), `showStats`, `stats` (Json), platform URLs + status, studio heading/description/featured service slugs, social links (Instagram, Facebook, YouTube, TikTok, LinkedIn, X), `enquiryInfo`.
- **Creator** (+): `country`, `projects` (String[]), `representation`, `contactEmail`, `facebook`, `youtube`, `tiktok`, `creatorType`.
- **Story** (+): `productionStatus` (`IN_DEVELOPMENT` / `PRE_PRODUCTION` / `IN_PRODUCTION` / `RELEASED`), defaulting to `IN_DEVELOPMENT`.

### 3.4 Seed
- Add the missing `scripts/seed.mjs` (fixes the broken `db:seed` script). It seeds SiteSettings, Services, the Welele Platform record and existing editorial content. It does **not** seed case studies.

---

## 4. Route Changes

| Route | Change |
|---|---|
| `/what-we-do` | **New**: "We make media that moves." umbrella page with 4 pillars |
| `/studio` | **New**: Creative technology page, services with Active / Coming Soon / Featured badges, conceptual demo, "Technology amplifies creativity" manifesto, empty case study state |
| `/platform` | **New**: "Meet Welele." editorial platform page, features, benefits, device mockup, store links / coming-soon state, isolation notice |
| `/` | **Extended**: new Ecosystem section, Studio teaser and Platform teaser inserted; stats replaced with vision statements |
| `/creators`, `/creators/[slug]` | **Extended**: creator types, talent CTA, new profile fields (country, projects, representation) |
| `/partners` | **Extended**: shows real partners only (none yet) + "Who we partner with" categories |
| `/about`, `/contact`, `/our-stories/*`, `/news/*` | **Copy corrections** for credibility; structure unchanged |

---

## 5. Component Changes

### New (`src/components/public`)
| Component | Purpose |
|---|---|
| `PageHero` | Reusable inner-page hero (replaces repeated inline styles on new pages) |
| `PillarCard` | Large editorial card for the 4 pillars |
| `EcosystemSection` | Homepage WATCH / CREATE / CONNECT / GROW |
| `ServiceCard` | Studio service with status badge |
| `StatusBadge` | ACTIVE / COMING SOON / FEATURED / IN DEVELOPMENT pill |
| `StudioTeaser` | Homepage REAL PRODUCT → CREATIVE WORLD → FINISHED CAMPAIGN (labelled concept) |
| `StudioTransformation` | Shared 3-step concept visual used by the teaser and `/studio` |
| `PlatformTeaser` | Homepage platform section with device mockup |
| `DeviceMockup` | CSS phone frame rendering editorial screenshots |
| `ExternalLink` | Safe outbound link helper (`target=_blank`, `rel=noopener`) |

### Modified
- `Navigation`: new IA, "Work With Us" CTA, ≤1100px collapse.
- `Footer`: four columns (Company / What We Do / Platform / Connect), CMS-driven social links.
- `StoryCard`: production-status badge.
- `PartnerCard`: unchanged API.
- `StoryDetailClient`: remove the fake "My List" watchlist (an app feature); add a "Discover on Welele" outbound link when configured.

### New library files
- `src/lib/content.ts`: typed async content API (getSiteSettings, getServices, getPlatform, getCaseStudies …).
- `src/lib/cms.ts`: CMS navigation map and status enums, used by the future admin.

### Styles
- New file `src/styles/ecosystem.css` imported from `globals.css`. It uses **only existing tokens**, with no new palette.

---

## 6. Content Changes
- Hero eyebrow: "Welele Media™"; headline stays "Stories that move you." The new line "We make media that moves." is used as the brand line on `/what-we-do` and the ecosystem section, so the approved hero stays intact.
- Stats replaced by non-numeric vision markers (e.g. "Original stories · In development").
- Partners: fabricated partners removed from defaults; the page shows partner *categories* and "Our first partnerships are being formed."
- Creators: unverifiable claims removed from bios; profiles are labelled as the *founding creator network*. ⚠️ Flag for the company to confirm the names.
- Stories: labelled "In Development" (the slate is upcoming).
- AI language follows §9: "AI-assisted", "human-directed", "Technology amplifies creativity. It doesn't replace it."

---

## 7. Risks

| Risk | Mitigation |
|---|---|
| No git → hard rollback | Full backup in `_backup_pre_stage_c/` (excluded from tsconfig) |
| Prisma schema change without a running DB | Additive only, all new fields defaulted/optional; `prisma validate` run; pages don't hit the DB yet |
| 7-item nav overflow | Collapse to drawer at ≤1100px |
| Sample creators/stories may be read as real | Status labels + report flag requesting company confirmation |
| Generated concept imagery read as client work | Every Studio visual carries a visible "Concept / Demo" label |
| Platform page perceived as integration | No fetch/API/env import from the app; isolation comment + grep verification |

## 8. Dependencies
- No new npm packages.
- Generated imagery for Studio concept steps, Platform artwork and Ecosystem cards (saved to `public/images/stage-c/`).

## 9. Testing Plan
1. `tsc --noEmit`: no type errors.
2. `prisma validate`: the schema is valid.
3. `next build`: all routes compile (static generation).
4. Dev server and browser checks of: `/`, `/our-stories`, a story detail page, `/creators`, a creator detail page, `/partners`, `/news`, a news detail page, `/what-we-do`, `/studio`, `/platform`, `/contact`, `/about`.
5. Check that the external Welele link resolves to the configured URL with `target=_blank rel=noopener`.
6. Responsive checks at 1440 / 1024 / 390 px.
7. Isolation grep: no `welele.app` API calls, no Supabase or app env vars, no `fetch(` to external app hosts.
