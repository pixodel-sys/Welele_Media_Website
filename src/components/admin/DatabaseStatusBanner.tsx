import React from 'react';
import type { DatabaseHealthStatus } from '@/lib/db-health';

interface DatabaseStatusBannerProps {
  status: DatabaseHealthStatus;
}

export default function DatabaseStatusBanner({ status }: DatabaseStatusBannerProps) {
  const isLive = status.mode === 'LIVE';

  return (
    <aside
      className={`db-status-banner ${isLive ? 'live' : 'standby'}`}
      role="status"
      aria-live="polite"
    >
      <div className="db-status-info">
        <span className={`db-status-pill ${isLive ? 'live' : 'standby'}`}>
          {isLive ? 'PostgreSQL Live' : 'Database Standby'}
        </span>
        <div>
          <strong style={{ color: '#fff', marginRight: '6px' }}>
            {isLive ? 'Live Mode Active:' : 'Inspection Mode:'}
          </strong>
          <span style={{ color: isLive ? '#cbd5e1' : '#ffddaa' }}>
            {isLive
              ? 'Connected to PostgreSQL. Publishing and editorial writes are active.'
              : 'Currently running in inspection mode using default editorial records. Connect your PostgreSQL database to enable live creating, editing, and publishing.'}
          </span>
        </div>
      </div>

      <div style={{ fontSize: '11px', color: 'var(--admin-subtle)', whiteSpace: 'nowrap' }}>
        Checked: {new Date(status.checkedAt).toLocaleTimeString()}
      </div>
    </aside>
  );
}
