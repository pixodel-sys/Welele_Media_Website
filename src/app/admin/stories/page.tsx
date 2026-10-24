import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { getDatabaseHealth } from '@/lib/db-health';
import { getStories } from '@/lib/content';
import StatusBadge from '@/components/public/StatusBadge';

export default async function AdminStoriesPage() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect('/admin/login');

  const [dbStatus, stories] = await Promise.all([getDatabaseHealth(), getStories()]);
  const isStandby = dbStatus.mode === 'STANDBY';

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Stories &amp; Production Slates</h1>
          <p className="admin-page-desc">
            Manage Welele Media original productions, series, documentaries, and creative slates.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            className={`btn primary ${isStandby ? 'btn-disabled-standby' : ''}`}
            disabled={isStandby}
            title={isStandby ? 'Database connection required to create records' : 'Create new story'}
          >
            + New Story
          </button>
        </div>
      </div>

      {isStandby && (
        <div className="standby-disabled-notice" role="note">
          <span style={{ fontSize: '16px' }}>ℹ️</span>
          <span>
            <strong>Standby / Inspection Mode:</strong> Displaying {stories.length} default slate records. Creating, editing, and publishing stories are disabled until PostgreSQL is connected.
          </span>
        </div>
      )}

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Production Slate ({stories.length} Titles)</h2>
          <span style={{ fontSize: '12px', color: 'var(--admin-subtle)' }}>
            Sorted by display order
          </span>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title &amp; Slug</th>
                <th>Category</th>
                <th>Episodes</th>
                <th>Rating</th>
                <th>Production Status</th>
                <th>Publication</th>
                <th>Showrunners</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((story) => (
                <tr key={story.id}>
                  <td>
                    <strong>{story.title}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--admin-subtle)' }}>/{story.slug}</span>
                  </td>
                  <td>
                    <span style={{ color: '#fff' }}>{story.category}</span>
                  </td>
                  <td>{story.episodeCount} Ep</td>
                  <td>{story.ageRating}</td>
                  <td>
                    <StatusBadge status={story.productionStatus} />
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: story.publicationStatus === 'PUBLISHED' ? 'var(--cyan)' : 'var(--orange)',
                      }}
                    >
                      {story.publicationStatus}
                    </span>
                  </td>
                  <td>
                    {story.creators.map((c) => c.name).join(', ') || 'Unassigned'}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link
                        href={`/our-stories/${story.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                      >
                        Public ↗
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILED INSPECTION PANELS */}
      <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '32px 0 16px' }}>
        Slate Specifications Inspector
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
        {stories.map((story) => (
          <div key={story.id} className="admin-card" style={{ marginBottom: 0 }}>
            <div className="admin-card-header">
              <div>
                <span className="eyebrow" style={{ color: 'var(--orange)' }}>{story.category}</span>
                <h3 style={{ fontSize: '17px', fontWeight: 850, margin: '4px 0 0' }}>{story.title}</h3>
              </div>
              <StatusBadge status={story.productionStatus} />
            </div>

            <div style={{ padding: '20px 24px' }}>
              <div className="inspector-grid" style={{ paddingTop: 0 }}>
                <span className="inspector-key">Tagline</span>
                <span className="inspector-val" style={{ color: 'var(--orange)', fontStyle: 'italic' }}>
                  &ldquo;{story.tagline || 'None'}&rdquo;
                </span>
              </div>

              <div className="inspector-grid">
                <span className="inspector-key">Synopsis</span>
                <span className="inspector-val">{story.synopsis}</span>
              </div>

              <div className="inspector-grid">
                <span className="inspector-key">Hero Media</span>
                <span className="inspector-val" style={{ wordBreak: 'break-all', fontSize: '12px' }}>
                  {story.heroImage}
                </span>
              </div>

              <div className="inspector-grid" style={{ borderBottom: 'none' }}>
                <span className="inspector-key">Featured</span>
                <span className="inspector-val">{story.featured ? 'Yes (Homepage Slate)' : 'No'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
