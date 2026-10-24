import React from 'react';
import { redirect } from 'next/navigation';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { getDatabaseHealth } from '@/lib/db-health';

interface LeadReviewItem {
  id: string;
  name: string;
  email: string;
  company: string | null;
  enquiryType: string;
  message: string;
  submittedAt: string;
  status: 'NEW' | 'REVIEWING' | 'RESPONDED' | 'ARCHIVED';
}

// Sample structure demonstrating the pipeline workflow when DB is connected
const PIPELINE_DEMO_LEADS: LeadReviewItem[] = [];

export default async function AdminLeadsPage() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect('/admin/login');

  const dbStatus = await getDatabaseHealth();
  const isStandby = dbStatus.mode === 'STANDBY';

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Leads &amp; Contact Enquiries</h1>
          <p className="admin-page-desc">
            Incoming partnership enquiries, creator submissions, brand briefs, and media contact requests.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            className={`btn ${isStandby ? 'btn-disabled-standby' : ''}`}
            disabled={isStandby}
            title={isStandby ? 'Database connection required to export leads' : 'Export leads as CSV'}
          >
            Export Enquiries
          </button>
        </div>
      </div>

      {isStandby && (
        <div className="standby-disabled-notice" role="note">
          <span style={{ fontSize: '16px' }}>ℹ️</span>
          <span>
            <strong>Standby / Inspection Mode:</strong> Live inbound leads persistence into PostgreSQL requires an active database. Standby mode does not log client messages to transient memory or insecure local text files.
          </span>
        </div>
      )}

      {/* PIPELINE CATEGORIES OVERVIEW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Partnership Inquiries', code: 'PARTNERSHIP', icon: '🤝' },
          { label: 'Studio & Brand Briefs', code: 'STUDIO', icon: '✦' },
          { label: 'Creator Submissions', code: 'CREATOR', icon: '🎨' },
          { label: 'Press & Media Relations', code: 'PRESS', icon: '📰' },
        ].map((type) => (
          <div
            key={type.code}
            className="admin-card"
            style={{ marginBottom: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <span style={{ fontSize: '24px' }}>{type.icon}</span>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--admin-subtle)', display: 'block' }}>Channel</span>
              <strong style={{ color: '#fff', fontSize: '13px' }}>{type.label}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Enquiry Inbox ({PIPELINE_DEMO_LEADS.length})</h2>
          <span style={{ fontSize: '12px', color: 'var(--admin-subtle)' }}>
            Prisma Model: ContactSubmission
          </span>
        </div>

        {PIPELINE_DEMO_LEADS.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📫</div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 8px', color: '#fff' }}>
              No inquiries awaiting review
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--admin-subtle)', lineHeight: 1.6, margin: '0 0 20px' }}>
              When the PostgreSQL database is active, form submissions from <code>/contact</code> will securely persist here for triage across business channels. Privacy is protected by strict server-side role validation.
            </p>
            <div
              style={{
                display: 'inline-flex',
                gap: '8px',
                fontSize: '11px',
                padding: '6px 14px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.04)',
                color: 'var(--admin-subtle)',
              }}
            >
              <span>Workflow Statuses:</span>
              <strong style={{ color: 'var(--cyan)' }}>NEW</strong>
              <span>→</span>
              <strong style={{ color: 'var(--orange)' }}>REVIEWING</strong>
              <span>→</span>
              <strong style={{ color: '#4ade80' }}>RESPONDED</strong>
              <span>→</span>
              <strong style={{ color: 'var(--admin-subtle)' }}>ARCHIVED</strong>
            </div>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Sender</th>
                  <th>Company</th>
                  <th>Channel</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {PIPELINE_DEMO_LEADS.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <strong>{lead.name}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--admin-subtle)', display: 'block' }}>
                        {lead.email}
                      </span>
                    </td>
                    <td>{lead.company || '—'}</td>
                    <td>{lead.enquiryType}</td>
                    <td>{lead.submittedAt}</td>
                    <td>{lead.status}</td>
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
