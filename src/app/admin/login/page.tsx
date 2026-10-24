'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/public/Logo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-shell">
      <div className="admin-login-box">
        <div className="admin-login-head">
          <Logo variant="nav" height={44} />
          <h1 className="admin-login-title">Control Room Login</h1>
          <p style={{ fontSize: '13px', color: 'var(--admin-muted)', margin: 0 }}>
            Welele Media internal editorial &amp; content management
          </p>
        </div>

        {error && (
          <div className="admin-error-box" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="admin-username">
              Username or Email
            </label>
            <input
              id="admin-username"
              type="text"
              className="admin-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              autoComplete="username"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn primary"
            style={{ width: '100%', padding: '14px', marginTop: '12px', fontSize: '13px' }}
            disabled={loading}
            id="admin-login-submit"
          >
            {loading ? 'Authenticating...' : 'Sign In to Control Room →'}
          </button>
        </form>

        <div style={{ marginTop: '28px', borderTop: '1px solid var(--admin-line)', paddingTop: '16px', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--admin-subtle)' }}>
            Database Standby Mode • Zero external runtime coupling
          </span>
        </div>
      </div>
    </div>
  );
}
