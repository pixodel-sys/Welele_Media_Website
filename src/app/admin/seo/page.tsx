import React from 'react';
import { redirect } from 'next/navigation';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { getDatabaseHealth } from '@/lib/db-health';
import { getSiteSettings } from '@/lib/content';

export default async function AdminSeoPage() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect('/admin/login');

  const [dbStatus, settings] = await Promise.all([getDatabaseHealth(), getSiteSettings()]);
  const isStandby = dbStatus.mode === 'STANDBY';

  const PAGES_METADATA = [
    {
      page: 'Home (/)',
      title: 'Welele Media — Stories That Move You',
      description: settings.metaDescription,
      canonical: 'https://welelemedia.co.za',
      ogType: 'website',
    },
    {
      page: 'Our Stories (/our-stories)',
      title: 'Our Stories & Productions | Welele Media',
      description: 'Explore original African stories, episodic drama, and documentary slates in development.',
      canonical: 'https://welelemedia.co.za/our-stories',
      ogType: 'video.tv_show',
    },
    {
      page: 'Welele Studio (/studio)',
      title: 'Welele Studio — Creative Technology for Brands',
      description: 'Human creativity amplified by emerging technology. AI advertising, brand films, and campaigns.',
      canonical: 'https://welelemedia.co.za/studio',
      ogType: 'website',
    },
    {
      page: 'Platform (/platform)',
      title: 'Welele App — Stories Beyond the Screen',
      description: 'A new way to discover African stories, follow creators, and join community.',
      canonical: 'https://welelemedia.co.za/platform',
      ogType: 'website',
    },
    {
      page: 'Creators (/creators)',
      title: 'Founding Creators Network | Welele Media',
      description: 'Meet the showrunners, writers, directors, and narrative architects shaping our original slates.',
      canonical: 'https://welelemedia.co.za/creators',
      ogType: 'profile',
    },
    {
      page: 'Newsroom (/news)',
      title: 'News & Perspectives | Welele Media',
      description: 'Official company announcements, industry perspectives, and editorial updates.',
      canonical: 'https://welelemedia.co.za/news',
      ogType: 'article',
    },
  ];

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">SEO &amp; Open Graph Metadata</h1>
          <p className="admin-page-desc">
            Global search index configuration, canonical URLs, social preview cards, and page-level titles.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            className={`btn primary ${isStandby ? 'btn-disabled-standby' : ''}`}
            disabled={isStandby}
            title={isStandby ? 'Database connection required to update SEO tags' : 'Save SEO Configuration'}
          >
            Save SEO Tags
          </button>
        </div>
      </div>

      {isStandby && (
        <div className="standby-disabled-notice" role="note">
          <span style={{ fontSize: '16px' }}>ℹ️</span>
          <span>
            <strong>Standby / Inspection Mode:</strong> Displaying static SEO defaults. Updating meta tags, social share cards, and canonical addresses are disabled until PostgreSQL is connected.
          </span>
        </div>
      )}

      {/* GLOBAL DEFAULT META */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Site-Wide Global Defaults</h2>
          <span style={{ fontSize: '12px', color: 'var(--admin-subtle)' }}>
            Configured in layout.tsx &amp; data.ts
          </span>
        </div>

        <div style={{ padding: '20px 24px' }}>
          <div className="inspector-grid" style={{ paddingTop: 0 }}>
            <span className="inspector-key">Default Title Template</span>
            <span className="inspector-val"><strong>%s | Welele Media</strong></span>
          </div>

          <div className="inspector-grid">
            <span className="inspector-key">Site-Wide Meta Description</span>
            <span className="inspector-val">{settings.metaDescription}</span>
          </div>

          <div className="inspector-grid">
            <span className="inspector-key">Default Open Graph Artwork</span>
            <span className="inspector-val" style={{ fontSize: '12px' }}>
              {settings.heroArtworkUrl || '/images/welele-hero-clean.jpg'}
            </span>
          </div>

          <div className="inspector-grid" style={{ borderBottom: 'none' }}>
            <span className="inspector-key">Robots &amp; Crawling</span>
            <span className="inspector-val" style={{ color: '#4ade80' }}>
              index, follow (production) / noindex (admin routes)
            </span>
          </div>
        </div>
      </div>

      {/* PAGE LEVEL SEO REGISTRY */}
      <div className="admin-card" style={{ marginTop: '20px' }}>
        <div className="admin-card-header">
          <h2 className="admin-card-title">Primary Routes Metadata Registry ({PAGES_METADATA.length} Surfaces)</h2>
          <span style={{ fontSize: '12px', color: 'var(--admin-subtle)' }}>
            Structured metadata mapping
          </span>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Surface / Route</th>
                <th>Resolved Title</th>
                <th>Meta Description</th>
                <th>Canonical URL</th>
                <th>OG Type</th>
              </tr>
            </thead>
            <tbody>
              {PAGES_METADATA.map((row, idx) => (
                <tr key={idx}>
                  <td><strong>{row.page}</strong></td>
                  <td style={{ fontSize: '12px' }}>{row.title}</td>
                  <td style={{ fontSize: '11px', color: 'var(--admin-subtle)', maxWidth: '280px' }}>
                    {row.description}
                  </td>
                  <td style={{ fontSize: '11px', color: 'var(--cyan)' }}>
                    {row.canonical}
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'var(--admin-subtle)',
                      }}
                    >
                      {row.ogType}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
