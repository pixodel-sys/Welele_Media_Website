import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { getDatabaseHealth } from '@/lib/db-health';
import {
  getStories,
  getCreators,
  getNewsArticles,
  getServices,
  getPrimaryPlatform,
  getPartners,
  getCaseStudies,
  CONTENT_SOURCE,
} from '@/lib/content';

export default async function AdminDashboardPage() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect('/admin/login');

  const [dbStatus, stories, creators, news, services, platform, partners, caseStudies] =
    await Promise.all([
      getDatabaseHealth(),
      getStories(),
      getCreators(),
      getNewsArticles(),
      getServices(),
      getPrimaryPlatform(),
      getPartners(),
      getCaseStudies(),
    ]);

  const activeServices = services.filter((s) => s.status === 'ACTIVE').length;
  const comingSoonServices = services.filter((s) => s.status === 'COMING_SOON').length;
  const inDevStories = stories.filter((s) => s.productionStatus === 'IN_DEVELOPMENT').length;

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Operational Overview</h1>
          <p className="admin-page-desc">
            Welele Media editorial, business, and platform architecture control room.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <span
            className={`status-badge ${dbStatus.mode === 'LIVE' ? 'active' : 'coming-soon'}`}
            style={{ fontSize: '11px', padding: '6px 14px' }}
          >
            {dbStatus.mode === 'LIVE' ? 'PostgreSQL Live Mode' : 'Database Standby Mode'}
          </span>
        </div>
      </div>

      {/* SYSTEM ARCHITECTURE OVERVIEW */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span className="admin-stat-label">Public Content Source</span>
          <div className="admin-stat-num" style={{ fontSize: '24px', color: 'var(--orange)' }}>
            {CONTENT_SOURCE.toUpperCase()}
          </div>
          <span className="admin-stat-meta">Serving from typed editorial defaults</span>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-label">Database Status</span>
          <div className="admin-stat-num" style={{ fontSize: '24px', color: dbStatus.mode === 'LIVE' ? 'var(--cyan)' : '#ffc470' }}>
            {dbStatus.mode}
          </div>
          <span className="admin-stat-meta">
            {dbStatus.isConfigured ? 'DATABASE_URL defined' : 'DATABASE_URL absent'}
          </span>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-label">Platform Representation</span>
          <div className="admin-stat-num" style={{ fontSize: '24px', color: '#fff' }}>
            {platform?.status ?? 'COMING_SOON'}
          </div>
          <span className="admin-stat-meta">Editorial record • Outbound links only</span>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-label">Active Studio Services</span>
          <div className="admin-stat-num">{activeServices}</div>
          <span className="admin-stat-meta">+{comingSoonServices} marked Coming Soon</span>
        </div>
      </div>

      {/* EDITORIAL INVENTORY STATS */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Editorial Slate &amp; Network</h2>
          <span style={{ fontSize: '12px', color: 'var(--admin-subtle)' }}>
            Authoritative static records
          </span>
        </div>

        <div className="admin-stats-grid" style={{ padding: '24px', marginBottom: 0 }}>
          <div className="admin-stat-card" style={{ background: 'var(--admin-panel-alt)' }}>
            <span className="admin-stat-label">Stories on Slate</span>
            <div className="admin-stat-num">{stories.length}</div>
            <span className="admin-stat-meta">{inDevStories} In Development</span>
          </div>

          <div className="admin-stat-card" style={{ background: 'var(--admin-panel-alt)' }}>
            <span className="admin-stat-label">Founding Creators</span>
            <div className="admin-stat-num">{creators.length}</div>
            <span className="admin-stat-meta">Directors, writers &amp; cinematographers</span>
          </div>

          <div className="admin-stat-card" style={{ background: 'var(--admin-panel-alt)' }}>
            <span className="admin-stat-label">Newsroom Articles</span>
            <div className="admin-stat-num">{news.length}</div>
            <span className="admin-stat-meta">Corporate updates &amp; perspectives</span>
          </div>

          <div className="admin-stat-card" style={{ background: 'var(--admin-panel-alt)' }}>
            <span className="admin-stat-label">Official Partners</span>
            <div className="admin-stat-num">{partners.length}</div>
            <span className="admin-stat-meta">Inaugural slate forming</span>
          </div>
        </div>
      </div>

      {/* EDITORIAL SHORTCUTS */}
      <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '32px 0 16px' }}>
        Control Room Navigation
      </h2>

      <div className="admin-actions-grid">
        <Link href="/admin/stories" className="admin-action-box">
          <div>
            <div className="admin-action-title">Stories &amp; Slates →</div>
            <p className="admin-action-desc">
              Inspect original productions, titles, categories, age ratings, and showrunners.
            </p>
          </div>
          <span className="status-badge concept">View {stories.length} Records</span>
        </Link>

        <Link href="/admin/creators" className="admin-action-box">
          <div>
            <div className="admin-action-title">Founding Creators →</div>
            <p className="admin-action-desc">
              Inspect talent network profiles, country representations, and associated slate projects.
            </p>
          </div>
          <span className="status-badge concept">View {creators.length} Profiles</span>
        </Link>

        <Link href="/admin/services" className="admin-action-box">
          <div>
            <div className="admin-action-title">Welele Studio &amp; Services →</div>
            <p className="admin-action-desc">
              Manage commercial capabilities, AI-assisted workflows, and Active / Coming Soon statuses.
            </p>
          </div>
          <span className="status-badge concept">View {services.length} Capabilities</span>
        </Link>

        <Link href="/admin/platform" className="admin-action-box">
          <div>
            <div className="admin-action-title">Platform Editorial Profile →</div>
            <p className="admin-action-desc">
              Review Welele App editorial descriptions, feature cards, concept preview, and store URLs.
            </p>
          </div>
          <span className="status-badge concept">Editorial Isolation</span>
        </Link>

        <Link href="/admin/leads" className="admin-action-box">
          <div>
            <div className="admin-action-title">Leads &amp; Enquiries →</div>
            <p className="admin-action-desc">
              Inspect incoming submissions from creators, prospective co-producers, and media press.
            </p>
          </div>
          <span className="status-badge concept">Contact Submissions</span>
        </Link>

        <Link href="/admin/settings" className="admin-action-box">
          <div>
            <div className="admin-action-title">Site Settings &amp; SEO →</div>
            <p className="admin-action-desc">
              Review brand lines, homepage sections, contact coordinates, and social channels.
            </p>
          </div>
          <span className="status-badge concept">Site Configuration</span>
        </Link>
      </div>

      {/* FUTURE DATABASE ACTIVATION ROADMAP */}
      <div
        className="admin-card"
        style={{
          borderStyle: 'dashed',
          borderColor: 'rgba(255, 175, 72, 0.4)',
          background: 'linear-gradient(180deg, rgba(255,175,72,0.04) 0%, rgba(4,14,20,0.8) 100%)',
        }}
      >
        <div className="admin-card-header">
          <div>
            <div className="eyebrow" style={{ color: 'var(--orange)' }}>Infrastructure Roadmap</div>
            <h3 className="admin-card-title">Future PostgreSQL Activation Sequence</h3>
          </div>
          <span className="status-badge development">Schema Ready</span>
        </div>

        <div style={{ padding: '24px', fontSize: '13px', color: 'var(--admin-muted)', lineHeight: 1.7 }}>
          <p style={{ marginBottom: '16px' }}>
            When Welele Media provisions its dedicated production PostgreSQL instance, follow this standard activation process:
          </p>

          <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <strong style={{ color: '#fff' }}>1. Provision Dedicated Database:</strong> Create a standalone PostgreSQL database (e.g. Supabase, AWS RDS, Neon) completely isolated from any audience apps.
            </li>
            <li>
              <strong style={{ color: '#fff' }}>2. Configure Environment:</strong> Set <code style={{ color: 'var(--orange)' }}>DATABASE_URL</code> and <code style={{ color: 'var(--orange)' }}>ADMIN_JWT_SECRET</code> in <code style={{ color: 'var(--orange)' }}>.env</code>.
            </li>
            <li>
              <strong style={{ color: '#fff' }}>3. Deploy Schema:</strong> Run <code style={{ color: '#fff' }}>npm run prisma:deploy</code> to create tables from <code style={{ color: '#fff' }}>prisma/schema.prisma</code>.
            </li>
            <li>
              <strong style={{ color: '#fff' }}>4. Run Initial Seed:</strong> Run <code style={{ color: '#fff' }}>npm run db:seed</code> to populate foundational settings, services, and slates.
            </li>
            <li>
              <strong style={{ color: '#fff' }}>5. Enable Database Content:</strong> Switch <code style={{ color: 'var(--orange)' }}>CONTENT_SOURCE=database</code> in environment to activate live CMS read/writes.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
