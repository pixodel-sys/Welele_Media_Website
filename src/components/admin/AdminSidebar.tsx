'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/public/Logo';

export interface AdminNavSection {
  title: string;
  items: {
    label: string;
    href: string;
    badge?: string;
  }[];
}

const NAV_SECTIONS: AdminNavSection[] = [
  {
    title: 'Overview',
    items: [{ label: 'Dashboard', href: '/admin/dashboard' }],
  },
  {
    title: 'Editorial',
    items: [
      { label: 'Stories', href: '/admin/stories' },
      { label: 'Creators', href: '/admin/creators' },
      { label: 'Newsroom', href: '/admin/news' },
      { label: 'Media References', href: '/admin/media' },
    ],
  },
  {
    title: 'Business',
    items: [
      { label: 'Services & Studio', href: '/admin/services' },
      { label: 'Case Studies', href: '/admin/case-studies' },
      { label: 'Partners', href: '/admin/partners' },
    ],
  },
  {
    title: 'Platform',
    items: [{ label: 'Welele App', href: '/admin/platform' }],
  },
  {
    title: 'Leads & Enquiries',
    items: [{ label: 'Submissions', href: '/admin/leads' }],
  },
  {
    title: 'Website & Config',
    items: [
      { label: 'Site Settings', href: '/admin/settings' },
      { label: 'SEO & Metadata', href: '/admin/seo' },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') return pathname === '/admin/dashboard' || pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <aside className="admin-sidebar" aria-label="CMS Navigation">
      <div className="admin-sidebar-brand">
        <Logo variant="nav" height={36} />
        <span className="admin-brand-tag">Control Room</span>
      </div>

      <nav className="admin-nav">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="admin-nav-group">
            <span className="admin-nav-title">{section.title}</span>
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-item ${isActive(item.href) ? 'active' : ''}`}
              >
                <span>{item.label}</span>
                {item.badge && <span className="admin-nav-badge">{item.badge}</span>}
              </Link>
            ))}
          </div>
        ))}

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--admin-line)' }}>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-nav-item"
            style={{ fontSize: '12px', color: 'var(--orange)' }}
          >
            <span>View Public Site ↗</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
