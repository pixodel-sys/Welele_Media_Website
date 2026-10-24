import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { getDatabaseHealth } from '@/lib/db-health';
import { getNewsArticles } from '@/lib/content';

export default async function AdminNewsPage() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect('/admin/login');

  const [dbStatus, articles] = await Promise.all([getDatabaseHealth(), getNewsArticles()]);
  const isStandby = dbStatus.mode === 'STANDBY';

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Newsroom &amp; Announcements</h1>
          <p className="admin-page-desc">
            Official announcements, perspectives, and editorial dispatches from Welele Media.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            className={`btn primary ${isStandby ? 'btn-disabled-standby' : ''}`}
            disabled={isStandby}
            title={isStandby ? 'Database connection required to create records' : 'Create new announcement'}
          >
            + New Announcement
          </button>
        </div>
      </div>

      {isStandby && (
        <div className="standby-disabled-notice" role="note">
          <span style={{ fontSize: '16px' }}>ℹ️</span>
          <span>
            <strong>Standby / Inspection Mode:</strong> Displaying {articles.length} default editorial newsroom records. Creating, editing, and publishing news are disabled until PostgreSQL is connected.
          </span>
        </div>
      )}

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Editorial News ({articles.length} Published Articles)</h2>
          <span style={{ fontSize: '12px', color: 'var(--admin-subtle)' }}>
            Sorted by publication date (most recent first)
          </span>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title &amp; Slug</th>
                <th>Category</th>
                <th>Author</th>
                <th>Publication Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id}>
                  <td>
                    <strong>{article.title}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--admin-subtle)' }}>/{article.slug}</span>
                  </td>
                  <td>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: 'rgba(255, 107, 0, 0.12)',
                        color: 'var(--orange)',
                        fontSize: '11px',
                        fontWeight: 700,
                      }}
                    >
                      {article.category}
                    </span>
                  </td>
                  <td>{article.authorName}</td>
                  <td style={{ fontSize: '12px' }}>
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: article.status === 'PUBLISHED' ? 'var(--cyan)' : 'var(--orange)',
                      }}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td>
                    <Link
                      href={`/news/${article.slug}`}
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

      {/* INSPECTOR VIEW */}
      <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '32px 0 16px' }}>
        Article Content Inspector
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
        {articles.map((article) => (
          <div key={article.id} className="admin-card" style={{ marginBottom: 0 }}>
            <div className="admin-card-header">
              <div>
                <span className="eyebrow" style={{ color: 'var(--orange)' }}>{article.category}</span>
                <h3 style={{ fontSize: '16px', fontWeight: 850, margin: '4px 0 0' }}>{article.title}</h3>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--admin-subtle)' }}>
                By {article.authorName}
              </span>
            </div>

            <div style={{ padding: '20px 24px' }}>
              <div className="inspector-grid" style={{ paddingTop: 0 }}>
                <span className="inspector-key">Excerpt</span>
                <span className="inspector-val">{article.excerpt}</span>
              </div>

              <div className="inspector-grid">
                <span className="inspector-key">Cover Media</span>
                <span className="inspector-val" style={{ fontSize: '12px', wordBreak: 'break-all' }}>
                  {article.coverImage || 'None'}
                </span>
              </div>

              <div className="inspector-grid" style={{ borderBottom: 'none' }}>
                <span className="inspector-key">Content Preview</span>
                <span className="inspector-val" style={{ maxHeight: '120px', overflowY: 'auto', fontSize: '12px', lineHeight: 1.5 }}>
                  {article.body.slice(0, 220)}...
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
