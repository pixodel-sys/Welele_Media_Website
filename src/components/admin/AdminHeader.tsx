'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import type { DatabaseHealthStatus } from '@/lib/db-health';

interface AdminHeaderProps {
  username?: string;
  dbStatus: DatabaseHealthStatus;
}

export default function AdminHeader({ username = 'Administrator', dbStatus }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error('Logout error:', e);
      router.push('/admin/login');
    }
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <div className="admin-breadcrumbs">
          <span>Welele Media</span>
          <span>/</span>
          <span className="active">Control Room</span>
        </div>
      </div>

      <div className="admin-header-right">
        {/* DB Connection Pill Indicator */}
        <span
          className={`db-status-pill ${dbStatus.mode === 'LIVE' ? 'live' : 'standby'}`}
          title={dbStatus.message}
        >
          {dbStatus.mode === 'LIVE' ? 'Live DB' : 'Standby'}
        </span>

        {/* User Pill */}
        <div className="admin-user-pill">
          <div className="admin-user-avatar">
            {username.charAt(0).toUpperCase()}
          </div>
          <span>{username}</span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="btn"
          style={{ padding: '6px 14px', fontSize: '11px', borderColor: 'var(--admin-line)' }}
          id="admin-logout-btn"
        >
          Log Out
        </button>
      </div>
    </header>
  );
}
