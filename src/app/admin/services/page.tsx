import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { getDatabaseHealth } from '@/lib/db-health';
import { defaultServices } from '@/lib/data';
import StatusBadge from '@/components/public/StatusBadge';

export default async function AdminServicesPage() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect('/admin/login');

  const dbStatus = await getDatabaseHealth();
  const isStandby = dbStatus.mode === 'STANDBY';
  const services = defaultServices;

  const studioCount = services.filter((s) =>
    ['STUDIO', 'ADVERTISING', 'BRAND', 'TECHNOLOGY'].includes(s.category)
  ).length;

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Services &amp; Studio Capabilities</h1>
          <p className="admin-page-desc">
            Manage Welele Media business capabilities, brand offerings, and Welele Studio creative technology services.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            className={`btn primary ${isStandby ? 'btn-disabled-standby' : ''}`}
            disabled={isStandby}
            title={isStandby ? 'Database connection required to create records' : 'Create new service'}
          >
            + New Service
          </button>
        </div>
      </div>

      {isStandby && (
        <div className="standby-disabled-notice" role="note">
          <span style={{ fontSize: '16px' }}>ℹ️</span>
          <span>
            <strong>Standby / Inspection Mode:</strong> Displaying all {services.length} business &amp; studio service definitions ({studioCount} Studio capabilities). Creating, editing, and status toggles are disabled until PostgreSQL is connected.
          </span>
        </div>
      )}

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Commercial &amp; Production Services ({services.length} Total)</h2>
          <span style={{ fontSize: '12px', color: 'var(--admin-subtle)' }}>
            Status-driven architecture: ACTIVE vs COMING_SOON
          </span>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Service &amp; Slug</th>
                <th>Category</th>
                <th>Pillar</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((svc) => {
                const isStudio = ['STUDIO', 'ADVERTISING', 'BRAND', 'TECHNOLOGY'].includes(svc.category);
                return (
                  <tr key={svc.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--orange)', fontSize: '14px' }}>{svc.icon}</span>
                        <div>
                          <strong>{svc.title}</strong>
                          <span style={{ fontSize: '11px', color: 'var(--admin-subtle)', display: 'block' }}>
                            /{svc.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: isStudio ? 'rgba(255, 107, 0, 0.12)' : 'rgba(0, 240, 255, 0.1)',
                          color: isStudio ? 'var(--orange)' : 'var(--cyan)',
                        }}
                      >
                        {svc.category}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '12px', color: '#fff' }}>
                        {isStudio ? 'Welele Studio' : 'Media & Content'}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={svc.status} />
                    </td>
                    <td>
                      <span style={{ fontSize: '11px', color: svc.featured ? 'var(--cyan)' : 'var(--admin-subtle)' }}>
                        {svc.featured ? '★ Featured' : 'Standard'}
                      </span>
                    </td>
                    <td>#{svc.displayOrder}</td>
                    <td>
                      <Link
                        href={isStudio ? '/studio' : '/what-we-do'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                      >
                        Public ↗
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILED INSPECTION PANELS */}
      <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '32px 0 16px' }}>
        Capability Scope &amp; Copy Inspector
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
        {services.map((svc) => (
          <div key={svc.id} className="admin-card" style={{ marginBottom: 0 }}>
            <div className="admin-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--orange)', fontSize: '16px' }}>{svc.icon}</span>
                <div>
                  <span className="eyebrow" style={{ color: 'var(--orange)' }}>{svc.category}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 850, margin: '2px 0 0' }}>{svc.title}</h3>
                </div>
              </div>
              <StatusBadge status={svc.status} />
            </div>

            <div style={{ padding: '20px 24px' }}>
              <div className="inspector-grid" style={{ paddingTop: 0 }}>
                <span className="inspector-key">Short Desc</span>
                <span className="inspector-val">{svc.shortDescription}</span>
              </div>

              <div className="inspector-grid">
                <span className="inspector-key">Full Scope</span>
                <span className="inspector-val" style={{ fontSize: '12px', lineHeight: 1.5 }}>
                  {svc.description}
                </span>
              </div>

              <div className="inspector-grid" style={{ borderBottom: 'none' }}>
                <span className="inspector-key">Visual Asset</span>
                <span className="inspector-val" style={{ fontSize: '12px', wordBreak: 'break-all' }}>
                  {svc.image || 'Icon representation only'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
