import React from 'react';
import { redirect } from 'next/navigation';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { getDatabaseHealth } from '@/lib/db-health';
import { getSiteSettings } from '@/lib/content';

export default async function AdminSettingsPage() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect('/admin/login');

  const [dbStatus, settings] = await Promise.all([getDatabaseHealth(), getSiteSettings()]);
  const isStandby = dbStatus.mode === 'STANDBY';

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Site Settings &amp; Configuration</h1>
          <p className="admin-page-desc">
            Global identity, contact routing, homepage section layout, and brand defaults.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            className={`btn primary ${isStandby ? 'btn-disabled-standby' : ''}`}
            disabled={isStandby}
            title={isStandby ? 'Database connection required to save settings' : 'Save Site Settings'}
          >
            Save Settings
          </button>
        </div>
      </div>

      {isStandby && (
        <div className="standby-disabled-notice" role="note">
          <span style={{ fontSize: '16px' }}>ℹ️</span>
          <span>
            <strong>Standby / Inspection Mode:</strong> Displaying default editorial site settings. Updating company metadata, homepage sections, and contact channels are disabled until PostgreSQL is connected.
          </span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Brand & Identity */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Company Identity</h2>
          </div>

          <div style={{ padding: '20px 24px' }}>
            <div className="inspector-grid" style={{ paddingTop: 0 }}>
              <span className="inspector-key">Company Name</span>
              <span className="inspector-val"><strong>{settings.companyName}</strong></span>
            </div>

            <div className="inspector-grid">
              <span className="inspector-key">Brand Tagline</span>
              <span className="inspector-val" style={{ color: 'var(--orange)' }}>
                &ldquo;{settings.tagline}&rdquo;
              </span>
            </div>

            <div className="inspector-grid">
              <span className="inspector-key">Brand Line</span>
              <span className="inspector-val">{settings.brandLine}</span>
            </div>

            <div className="inspector-grid" style={{ borderBottom: 'none' }}>
              <span className="inspector-key">Editorial Summary</span>
              <span className="inspector-val" style={{ fontSize: '12px' }}>
                {settings.siteDescription}
              </span>
            </div>
          </div>
        </div>

        {/* Contact & Physical Headquarters */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Corporate Contact Info</h2>
          </div>

          <div style={{ padding: '20px 24px' }}>
            <div className="inspector-grid" style={{ paddingTop: 0 }}>
              <span className="inspector-key">Primary Email</span>
              <span className="inspector-val">
                <a href={`mailto:${settings.contactEmail}`} style={{ color: 'var(--cyan)' }}>
                  {settings.contactEmail}
                </a>
              </span>
            </div>

            <div className="inspector-grid">
              <span className="inspector-key">Telephone</span>
              <span className="inspector-val">
                {settings.contactPhone || <span style={{ color: 'var(--admin-subtle)', fontStyle: 'italic' }}>None specified</span>}
              </span>
            </div>

            <div className="inspector-grid">
              <span className="inspector-key">Location / HQ</span>
              <span className="inspector-val">{settings.address}</span>
            </div>

            <div className="inspector-grid" style={{ borderBottom: 'none' }}>
              <span className="inspector-key">Enquiries Note</span>
              <span className="inspector-val" style={{ fontSize: '12px' }}>
                {settings.enquiryInfo || 'General inquiries routed through /contact'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* HOMEPAGE SECTION CONFIGURATION */}
      <div className="admin-card" style={{ marginTop: '20px' }}>
        <div className="admin-card-header">
          <h2 className="admin-card-title">Homepage Sections Architecture</h2>
          <span style={{ fontSize: '12px', color: 'var(--admin-subtle)' }}>
            Dynamic section enable / disable switches
          </span>
        </div>

        <div style={{ padding: '20px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {settings.homepageSections.map((sec) => (
              <div
                key={sec.key}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--admin-line)',
                }}
              >
                <div>
                  <strong style={{ textTransform: 'capitalize', color: '#fff', fontSize: '13px' }}>
                    {sec.key}
                  </strong>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--admin-subtle)' }}>
                    section key: {sec.key}
                  </span>
                </div>

                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: sec.enabled ? 'rgba(74, 222, 128, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    color: sec.enabled ? '#4ade80' : 'var(--admin-subtle)',
                  }}
                >
                  {sec.enabled ? 'Active' : 'Disabled'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VISION MARKERS */}
      <div className="admin-card" style={{ marginTop: '20px' }}>
        <div className="admin-card-header">
          <h2 className="admin-card-title">Vision Markers (Approved Pillars)</h2>
          <span style={{ fontSize: '12px', color: 'var(--admin-subtle)' }}>
            Rendered on About &amp; Homepage surfaces
          </span>
        </div>

        <div style={{ padding: '20px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {settings.visionMarkers.map((marker, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  background: 'rgba(255, 107, 0, 0.03)',
                  border: '1px solid var(--admin-line)',
                }}
              >
                <strong style={{ color: 'var(--orange)', fontSize: '14px', display: 'block' }}>
                  {marker.value}
                </strong>
                <span style={{ color: 'var(--admin-subtle)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                  {marker.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
