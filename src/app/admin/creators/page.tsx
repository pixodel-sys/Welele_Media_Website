import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { getDatabaseHealth } from '@/lib/db-health';
import { getCreators } from '@/lib/content';

export default async function AdminCreatorsPage() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect('/admin/login');

  const [dbStatus, creators] = await Promise.all([getDatabaseHealth(), getCreators()]);
  const isStandby = dbStatus.mode === 'STANDBY';

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Founding Creator Network</h1>
          <p className="admin-page-desc">
            Manage African directors, showrunners, screenwriters, cinematographers, and creative talent.
          </p>
        </div>

        <button
          className={`btn primary ${isStandby ? 'btn-disabled-standby' : ''}`}
          disabled={isStandby}
          title={isStandby ? 'Database connection required to add creators' : 'Add new creator'}
        >
          + Add Creator
        </button>
      </div>

      {isStandby && (
        <div className="standby-disabled-notice" role="note">
          <span style={{ fontSize: '16px' }}>ℹ️</span>
          <span>
            <strong>Standby / Inspection Mode:</strong> Displaying {creators.length} concept/demonstration slate profiles. Creating, editing, and publishing creator profiles are disabled until PostgreSQL is connected.
          </span>
        </div>
      )}

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Creator Profiles ({creators.length} Concept Slate Records)</h2>
          <span style={{ fontSize: '12px', color: 'var(--admin-subtle)' }}>
            Founding demonstration roster
          </span>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Creator Name</th>
                <th>Role &amp; Discipline</th>
                <th>Location &amp; Country</th>
                <th>Representation</th>
                <th>Associated Stories</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {creators.map((c) => (
                <tr key={c.id}>
                  <td>
                    <strong>{c.name}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--admin-subtle)' }}>/{c.slug}</span>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '9px',
                        fontWeight: 700,
                        padding: '1px 5px',
                        borderRadius: '3px',
                        background: 'rgba(255, 107, 0, 0.1)',
                        color: 'var(--orange)',
                        marginTop: '3px',
                      }}
                    >
                      Concept Slate Profile
                    </span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--orange)', fontWeight: 700 }}>{c.role}</span>
                    <span style={{ fontSize: '11px', color: 'var(--admin-subtle)', display: 'block' }}>
                      {c.creatorType}
                    </span>
                  </td>
                  <td>
                    {c.location ? `${c.location}, ` : ''}{c.country || 'Africa'}
                  </td>
                  <td>{c.representation || 'Direct / Independent'}</td>
                  <td>{c.stories.join(', ') || 'Slate In Development'}</td>
                  <td>{c.featured ? 'Yes' : 'No'}</td>
                  <td>
                    <Link
                      href={`/creators/${c.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                      style={{ padding: '4px 10px', fontSize: '11px' }}
                    >
                      Public ↗
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILED BIOS */}
      <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '32px 0 16px' }}>
        Creator Bios &amp; Channels
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
        {creators.map((c) => (
          <div key={c.id} className="admin-card" style={{ marginBottom: 0 }}>
            <div className="admin-card-header">
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 850, margin: 0 }}>{c.name}</h3>
                <span style={{ fontSize: '12px', color: 'var(--orange)' }}>{c.role}</span>
              </div>
              <span className="status-badge concept">{c.creatorType}</span>
            </div>

            <div style={{ padding: '20px 24px' }}>
              <div className="inspector-grid" style={{ paddingTop: 0 }}>
                <span className="inspector-key">Biography</span>
                <span className="inspector-val">{c.bio}</span>
              </div>

              <div className="inspector-grid" style={{ borderBottom: 'none' }}>
                <span className="inspector-key">Channels</span>
                <span className="inspector-val">
                  {[
                    c.twitter && 'X/Twitter',
                    c.instagram && 'Instagram',
                    c.linkedin && 'LinkedIn',
                    c.youtube && 'YouTube',
                  ]
                    .filter(Boolean)
                    .join(' • ') || 'Direct contact through Welele Media'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
