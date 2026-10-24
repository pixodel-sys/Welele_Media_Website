import React from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { getDatabaseHealth } from '@/lib/db-health';

interface MediaReference {
  id: string;
  filename: string;
  path: string;
  category: 'Cinematic Artwork' | 'Concept Mockup' | 'Brand Asset' | 'Editorial Photography';
  usage: string;
  status: 'In Production' | 'Concept Asset' | 'Brand Identity';
}

const REGISTERED_MEDIA: MediaReference[] = [
  {
    id: 'media-hero',
    filename: 'welele-hero-clean.jpg',
    path: '/images/welele-hero-clean.jpg',
    category: 'Cinematic Artwork',
    usage: 'Homepage Hero & Brand Newsroom',
    status: 'In Production',
  },
  {
    id: 'media-app-preview',
    filename: 'welele-app-preview.png',
    path: '/images/stage-c/welele-app-preview.png',
    category: 'Concept Mockup',
    usage: 'Welele App Device Mockup (Platform Page & Ecosystem)',
    status: 'Concept Asset',
  },
  {
    id: 'media-studio-world',
    filename: 'studio-concept-world.jpg',
    path: '/images/stage-c/studio-concept-world.jpg',
    category: 'Concept Mockup',
    usage: 'Welele Studio Hero & Creative Studio Service',
    status: 'Concept Asset',
  },
  {
    id: 'media-studio-campaign',
    filename: 'studio-concept-campaign.jpg',
    path: '/images/stage-c/studio-concept-campaign.jpg',
    category: 'Concept Mockup',
    usage: 'AI Advertising Service Feature',
    status: 'Concept Asset',
  },
  {
    id: 'media-platform-hero',
    filename: 'platform-hero.jpg',
    path: '/images/stage-c/platform-hero.jpg',
    category: 'Editorial Photography',
    usage: 'Platform Page Hero Backdrop',
    status: 'In Production',
  },
  {
    id: 'media-eco-watch',
    filename: 'eco-watch.jpg',
    path: '/images/stage-c/eco-watch.jpg',
    category: 'Editorial Photography',
    usage: 'Stories Pillar & Ecosystem Watch Card',
    status: 'In Production',
  },
  {
    id: 'media-eco-create',
    filename: 'eco-create.jpg',
    path: '/images/stage-c/eco-create.jpg',
    category: 'Editorial Photography',
    usage: 'Creators Pillar & Perspective News Article',
    status: 'In Production',
  },
  {
    id: 'media-eco-connect',
    filename: 'eco-connect.jpg',
    path: '/images/stage-c/eco-connect.jpg',
    category: 'Editorial Photography',
    usage: 'Platform Pillar & Ecosystem Connect Card',
    status: 'In Production',
  },
  {
    id: 'media-eco-grow',
    filename: 'eco-grow.jpg',
    path: '/images/stage-c/eco-grow.jpg',
    category: 'Editorial Photography',
    usage: 'Studio Pillar & Ecosystem Grow Card',
    status: 'In Production',
  },
  {
    id: 'media-logo-icon',
    filename: 'welele-media-icon.png',
    path: '/images/welele-media-icon.png',
    category: 'Brand Asset',
    usage: 'Navigation, Footer, App Favicons & Platform Logo',
    status: 'Brand Identity',
  },
];

export default async function AdminMediaPage() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect('/admin/login');

  const dbStatus = await getDatabaseHealth();
  const isStandby = dbStatus.mode === 'STANDBY';

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Media References &amp; Asset Catalog</h1>
          <p className="admin-page-desc">
            Catalog of registered photographic, concept, and brand identity assets used across Welele Media surfaces.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            className={`btn primary ${isStandby ? 'btn-disabled-standby' : ''}`}
            disabled={isStandby}
            title={isStandby ? 'Asset uploading will be enabled in Stage E with live storage' : 'Upload Asset'}
          >
            + Upload Asset
          </button>
        </div>
      </div>

      {/* STAGE E NOTICE */}
      <div
        className="admin-card"
        style={{
          borderLeft: '4px solid var(--orange)',
          padding: '16px 20px',
          background: 'rgba(255, 107, 0, 0.04)',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>📦</span>
          <div>
            <strong style={{ color: '#fff', fontSize: '13px' }}>Stage D Scope Boundary: Media References</strong>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--admin-subtle)' }}>
              Stage D provides registry and reference inspection of active assets. Full media asset uploading, video transcoding, image transformation pipelines, CDN storage, and DAM workflows are scheduled for <strong>Stage E — Media Library</strong>.
            </p>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Active Public Assets ({REGISTERED_MEDIA.length} Registered)</h2>
          <span style={{ fontSize: '12px', color: 'var(--admin-subtle)' }}>
            Inspected from public repository storage
          </span>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Asset Filename &amp; Path</th>
                <th>Category</th>
                <th>Primary Surface Usage</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {REGISTERED_MEDIA.map((item) => (
                <tr key={item.id}>
                  <td style={{ width: '64px' }}>
                    <div
                      style={{
                        position: 'relative',
                        width: '48px',
                        height: '48px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        background: '#040711',
                        border: '1px solid var(--admin-line)',
                      }}
                    >
                      <Image
                        src={item.path}
                        alt={item.filename}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </td>
                  <td>
                    <strong>{item.filename}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--admin-subtle)', display: 'block' }}>
                      {item.path}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: '#fff',
                      }}
                    >
                      {item.category}
                    </span>
                  </td>
                  <td style={{ fontSize: '12px', color: 'var(--admin-subtle)' }}>
                    {item.usage}
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color:
                          item.status === 'In Production'
                            ? 'var(--cyan)'
                            : item.status === 'Brand Identity'
                            ? 'var(--magenta)'
                            : 'var(--orange)',
                      }}
                    >
                      {item.status}
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
