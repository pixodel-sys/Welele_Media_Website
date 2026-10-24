import React from 'react';
import { redirect } from 'next/navigation';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { getDatabaseHealth } from '@/lib/db-health';
import { getCaseStudies } from '@/lib/content';

export default async function AdminCaseStudiesPage() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect('/admin/login');

  const [dbStatus, caseStudies] = await Promise.all([getDatabaseHealth(), getCaseStudies()]);
  const isStandby = dbStatus.mode === 'STANDBY';

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Case Studies &amp; Client Work</h1>
          <p className="admin-page-desc">
            Documented client campaigns, brand productions, and creative technology case studies from Welele Studio.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            className={`btn primary ${isStandby ? 'btn-disabled-standby' : ''}`}
            disabled={isStandby}
            title={isStandby ? 'Database connection required to add case studies' : 'Create new case study'}
          >
            + New Case Study
          </button>
        </div>
      </div>

      {isStandby && (
        <div className="standby-disabled-notice" role="note">
          <span style={{ fontSize: '16px' }}>ℹ️</span>
          <span>
            <strong>Standby / Inspection Mode:</strong> Displaying case study architecture. No mock or speculative client work is seeded. Creating and publishing client case studies are disabled until PostgreSQL is connected.
          </span>
        </div>
      )}

      {/* SCHEMA & DATA CONTRACT CALLOUT */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Case Study Registry ({caseStudies.length} Published)</h2>
          <span style={{ fontSize: '12px', color: 'var(--admin-subtle)' }}>
            Prisma Model: CaseStudy
          </span>
        </div>

        {caseStudies.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📂</div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 8px', color: '#fff' }}>
              Client work will appear here when published
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--admin-subtle)', lineHeight: 1.6, margin: '0 0 24px' }}>
              In adherence with the Welele Media Credibility Rule, we do not fabricate client portfolios, brand credits, or campaign performance metrics. When client projects are executed and approved for public release, they can be authored here with full challenge, solution, and outcome documentation.
            </p>

            <div
              style={{
                textAlign: 'left',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--admin-line)',
                borderRadius: '8px',
                padding: '16px 20px',
                fontSize: '12px',
              }}
            >
              <strong style={{ color: 'var(--orange)', display: 'block', marginBottom: '8px' }}>
                Supported Schema Fields (PostgreSQL / Prisma ready):
              </strong>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', color: 'var(--admin-subtle)' }}>
                <span>• Client &amp; Brand Name</span>
                <span>• Service Category</span>
                <span>• Challenge &amp; Brief</span>
                <span>• Solution &amp; Craft</span>
                <span>• Measurable Outcome</span>
                <span>• Hero Image &amp; Media Gallery</span>
                <span>• Video Showcase Reel</span>
                <span>• Technologies &amp; Tools Used</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title &amp; Slug</th>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Published</th>
                </tr>
              </thead>
              <tbody>
                {caseStudies.map((cs) => (
                  <tr key={cs.id}>
                    <td><strong>{cs.title}</strong></td>
                    <td>{cs.client || '—'}</td>
                    <td>{cs.serviceSlug || '—'}</td>
                    <td>{cs.status}</td>
                    <td>{cs.publishedAt || 'Draft'}</td>
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
