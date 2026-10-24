import React from 'react';
import type { Metadata } from 'next';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { getDatabaseHealth } from '@/lib/db-health';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import DatabaseStatusBanner from '@/components/admin/DatabaseStatusBanner';
import '@/styles/admin.css';

export const metadata: Metadata = {
  title: 'Control Room — Welele Media CMS',
  description: 'Internal CMS and operational control room for Welele Media.',
  robots: 'noindex, nofollow',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAuthenticatedAdmin();

  // If not logged in, render the login flow directly without sidebar
  if (!admin) {
    return <>{children}</>;
  }

  const dbStatus = await getDatabaseHealth();

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader username={admin.username} dbStatus={dbStatus} />
        <DatabaseStatusBanner status={dbStatus} />
        <main className="admin-body">{children}</main>
      </div>
    </div>
  );
}
