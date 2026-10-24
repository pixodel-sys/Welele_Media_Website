import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { getDatabaseHealth } from '@/lib/db-health';
import { getPartners, getPartnershipCategories } from '@/lib/content';

export default async function AdminPartnersPage() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect('/admin/login');

  const [dbStatus, partners, categories] = await Promise.all([
    getDatabaseHealth(),
    getPartners(),
    getPartnershipCategories(),
  ]);
  const isStandby = dbStatus.mode === 'STANDBY';

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Partners &amp; Co-Commissioners</h1>
          <p className="admin-page-desc">
            Manage industry alliances, co-production relationships, broadcasters, and commercial partners.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            className={`btn primary ${isStandby ? 'btn-disabled-standby' : ''}`}
            disabled={isStandby}
            title={isStandby ? 'Database connection required to add partner records' : 'Add partner record'}
          >
            + Add Partner
          </button>
        </div>
      </div>

      {isStandby && (
        <div className="standby-disabled-notice" role="note">
          <span style={{ fontSize: '16px' }}>ℹ️</span>
          <span>
            <strong>Standby / Inspection Mode:</strong> Displaying partnership architecture. In compliance with strict credibility guidelines, no fictitious partner brands are populated. Adding and publishing partner profiles are disabled until PostgreSQL is connected.
          </span>
        </div>
      )}

      {/* PARTNERSHIP CATEGORIES */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Commercial &amp; Strategic Sectors ({categories.length} Categories)</h2>
          <Link
            href="/partners"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{ padding: '4px 10px', fontSize: '11px' }}
          >
            Public Partners Page ↗
          </Link>
        </div>

        <div style={{ padding: '20px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {categories.map((cat) => (
              <div
                key={cat.key}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--admin-line)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--orange)', fontSize: '16px' }}>{cat.icon}</span>
                  <strong style={{ color: '#fff', fontSize: '14px' }}>{cat.title}</strong>
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--admin-subtle)', lineHeight: 1.5 }}>
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PARTNERS LIST OR HONEST EMPTY STATE */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Confirmed Partners ({partners.length})</h2>
          <span style={{ fontSize: '12px', color: 'var(--admin-subtle)' }}>
            Authoritative registry
          </span>
        </div>

        {partners.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center', maxWidth: '540px', margin: '0 auto' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🤝</div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 8px', color: '#fff' }}>
              Our inaugural partnerships are being formed
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--admin-subtle)', lineHeight: 1.6, margin: 0 }}>
              Welele Media maintains strict verification standards and never fabricates partner relationships or client logos. As co-commissioning deals, distribution treaties, and studio brand collaborations are signed and approved for release, they will be registered here and made live on the public site.
            </p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Tier / Category</th>
                  <th>Website</th>
                  <th>Featured</th>
                  <th>Order</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((partner) => (
                  <tr key={partner.id}>
                    <td><strong>{partner.name}</strong></td>
                    <td>{partner.tier}</td>
                    <td>{partner.websiteUrl || '—'}</td>
                    <td>{partner.featured ? 'Yes' : 'No'}</td>
                    <td>#{partner.displayOrder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
