import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { getDatabaseHealth } from '@/lib/db-health';
import { getPrimaryPlatform } from '@/lib/content';
import StatusBadge from '@/components/public/StatusBadge';

export default async function AdminPlatformPage() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect('/admin/login');

  const [dbStatus, platform] = await Promise.all([getDatabaseHealth(), getPrimaryPlatform()]);
  const isStandby = dbStatus.mode === 'STANDBY';

  if (!platform) {
    return (
      <div className="admin-card" style={{ padding: '32px', textAlign: 'center' }}>
        No platform configuration found.
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Platform &amp; Audience App Profile</h1>
          <p className="admin-page-desc">
            Editorial representation of the Welele audience app. Outbound links and product narrative only — strictly decoupled from app runtime.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            className={`btn primary ${isStandby ? 'btn-disabled-standby' : ''}`}
            disabled={isStandby}
            title={isStandby ? 'Database connection required to save changes' : 'Save profile changes'}
          >
            Save Changes
          </button>
        </div>
      </div>

      {isStandby && (
        <div className="standby-disabled-notice" role="note">
          <span style={{ fontSize: '16px' }}>ℹ️</span>
          <span>
            <strong>Standby / Inspection Mode:</strong> Displaying active editorial profile for <strong>{platform.name}</strong>. Editing store URLs, feature descriptions, and publication status are disabled until PostgreSQL is connected.
          </span>
        </div>
      )}

      {/* STRICT ISOLATION NOTICE */}
      <div
        className="admin-card"
        style={{
          borderLeft: '4px solid var(--cyan)',
          padding: '16px 20px',
          background: 'rgba(0, 240, 255, 0.03)',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>🛡️</span>
          <div>
            <strong style={{ color: '#fff', fontSize: '13px' }}>Architectural Isolation Boundary Enforced</strong>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--admin-subtle)' }}>
              This CMS manages public editorial copy and outbound destination links for the Welele audience application. There is zero database coupling, shared authentication, token exchange, or private API connection between this website and the Welele App backend.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Core Profile */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Editorial Identity</h2>
            <StatusBadge status={platform.status} />
          </div>

          <div style={{ padding: '20px 24px' }}>
            <div className="inspector-grid" style={{ paddingTop: 0 }}>
              <span className="inspector-key">App Name</span>
              <span className="inspector-val"><strong>{platform.name}</strong> (slug: /{platform.slug})</span>
            </div>

            <div className="inspector-grid">
              <span className="inspector-key">Tagline</span>
              <span className="inspector-val" style={{ color: 'var(--orange)', fontStyle: 'italic' }}>
                &ldquo;{platform.tagline}&rdquo;
              </span>
            </div>

            <div className="inspector-grid">
              <span className="inspector-key">Short Description</span>
              <span className="inspector-val">{platform.description}</span>
            </div>

            <div className="inspector-grid">
              <span className="inspector-key">Long Narrative</span>
              <span className="inspector-val" style={{ fontSize: '12px', lineHeight: 1.5 }}>
                {platform.longDescription}
              </span>
            </div>

            <div className="inspector-grid" style={{ borderBottom: 'none' }}>
              <span className="inspector-key">CTA Button Label</span>
              <span className="inspector-val">{platform.ctaLabel}</span>
            </div>
          </div>
        </div>

        {/* Store Links & External Routing */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Destination &amp; Distribution Links</h2>
            <Link
              href="/platform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ padding: '4px 10px', fontSize: '11px' }}
            >
              Public Page ↗
            </Link>
          </div>

          <div style={{ padding: '20px 24px' }}>
            <div className="inspector-grid" style={{ paddingTop: 0 }}>
              <span className="inspector-key">Web Destination</span>
              <span className="inspector-val">
                {platform.externalUrl ? (
                  <a
                    href={platform.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--cyan)', textDecoration: 'underline' }}
                  >
                    {platform.externalUrl}
                  </a>
                ) : (
                  <span style={{ color: 'var(--admin-subtle)', fontStyle: 'italic' }}>
                    Unassigned — in preparation
                  </span>
                )}
              </span>
            </div>

            <div className="inspector-grid">
              <span className="inspector-key">Apple App Store</span>
              <span className="inspector-val">
                {platform.appStoreUrl ? (
                  <a href={platform.appStoreUrl} target="_blank" rel="noopener noreferrer">
                    {platform.appStoreUrl}
                  </a>
                ) : (
                  <span style={{ color: 'var(--admin-subtle)', fontStyle: 'italic' }}>
                    Unassigned — in preparation
                  </span>
                )}
              </span>
            </div>

            <div className="inspector-grid">
              <span className="inspector-key">Google Play Store</span>
              <span className="inspector-val">
                {platform.googlePlayUrl ? (
                  <a href={platform.googlePlayUrl} target="_blank" rel="noopener noreferrer">
                    {platform.googlePlayUrl}
                  </a>
                ) : (
                  <span style={{ color: 'var(--admin-subtle)', fontStyle: 'italic' }}>
                    Unassigned — in preparation
                  </span>
                )}
              </span>
            </div>

            <div className="inspector-grid" style={{ borderBottom: 'none' }}>
              <span className="inspector-key">Availability Status</span>
              <span className="inspector-val">
                <StatusBadge status={platform.status} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT FEATURES & SCREENSHOTS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {/* Features list */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Curated App Features ({platform.features.length})</h2>
          </div>

          <div style={{ padding: '20px 24px' }}>
            {platform.features.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  padding: '12px 0',
                  borderBottom: idx === platform.features.length - 1 ? 'none' : '1px solid var(--admin-line)',
                }}
              >
                <span
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(255, 107, 0, 0.12)',
                    color: 'var(--orange)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  {feature.icon || '✦'}
                </span>
                <div>
                  <strong style={{ color: '#fff', fontSize: '13px' }}>{feature.title}</strong>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--admin-subtle)' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Concept Screenshots */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Visual References &amp; Screenshots</h2>
            <span style={{ fontSize: '11px', color: 'var(--admin-subtle)' }}>Concept Previews</span>
          </div>

          <div style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {platform.screenshots.map((shot, idx) => (
                <div
                  key={idx}
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid var(--admin-line)',
                    background: '#050811',
                    padding: '8px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ position: 'relative', width: '160px', height: '280px', borderRadius: '8px', overflow: 'hidden' }}>
                    <Image
                      src={shot}
                      alt={`Platform screenshot ${idx + 1}`}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--admin-subtle)', display: 'block', marginTop: '8px' }}>
                    Active Mockup Asset
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
