# Welele Media — Corporate Website & CMS Control Room

> **We make media that moves.**  
> Official corporate website, studio showcase, and administrative control room for Welele Media.

[![Next.js](https://img.shields.io/badge/Next.js-15.2.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.4.1-darkblue?logo=prisma)](https://www.prisma.io/)
[![Status](https://img.shields.io/badge/Status-FROZEN%20(Stage%20D%20Complete)-orange)](#development-status)

---

## Development Status

> **Welele Media development is intentionally frozen at the completion of Stage D. No Stage E implementation, database provisioning, production media storage, or new product functionality should begin until the freeze is explicitly lifted.**

For comprehensive architectural audit and handover details, refer to:
- [`WELELE_MEDIA_DEVELOPMENT_FREEZE_REPORT.md`](./WELELE_MEDIA_DEVELOPMENT_FREEZE_REPORT.md)
- [`WELELE_MEDIA_STAGE_D_IMPLEMENTATION_REPORT.md`](./WELELE_MEDIA_STAGE_D_IMPLEMENTATION_REPORT.md)
- [`WELELE_MEDIA_STAGE_C_IMPLEMENTATION_REPORT.md`](./WELELE_MEDIA_STAGE_C_IMPLEMENTATION_REPORT.md)

---

## Completed Stages

| Stage | Milestone | Status | Description |
| :--- | :--- | :--- | :--- |
| **Stage A** | Foundation | **COMPLETE** | Dark obsidian design tokens, Pan-African gradients, typography |
| **Stage B** | Public Shell | **COMPLETE** | Living cinematic hero, responsive navigation, global footer |
| **Stage C** | Business Expansion | **COMPLETE** | Stories, Welele Studio, Creators, Partners, News, Pitches |
| **Stage D** | CMS Control Room | **COMPLETE** | `/admin` control room, honest Standby Mode, JWT auth, db health probe |
| **Stage E** | Media Library & Storage | **DEFERRED** | Object storage, video transcoding, asset ingestion (post-freeze) |

---

## Architectural Principles

1. **Launch Resilience:** The public website runs with `CONTENT_SOURCE="static"`. It reads directly from typed editorial data models with **zero database roundtrips** and cannot crash due to database outages.
2. **Honest Standby Mode:** When `DATABASE_URL` is unconfigured, the CMS runs in Standby / Inspection Mode. Persistent writes are visibly disabled. No fake in-memory or localStorage persistence is used.
3. **Future PostgreSQL Ready:** Prisma schema (`prisma/schema.prisma`) maintains 12 PostgreSQL models and an idempotent database seeder (`scripts/seed.mjs`) ready for single-source database activation.
4. **Decoupled from Welele App:** Complete runtime isolation from `welele.app` (no shared databases, auth tables, tokens, or private APIs). Outbound destination links only.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```
*(Default settings run in static launch mode with no database required)*

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the public website.  
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS Control Room.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## Repository & Branch
- **Remote:** `https://github.com/pixodel-sys/Welele_Media_Website.git`
- **Branch:** `main`
