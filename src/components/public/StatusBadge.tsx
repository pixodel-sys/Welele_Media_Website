import React from 'react';
import type { ProductionStatus, PublishStatus } from '@/lib/types';

type BadgeKind = PublishStatus | ProductionStatus | 'FEATURED' | 'CONCEPT';

const BADGES: Record<BadgeKind, { label: string; className: string }> = {
  ACTIVE: { label: 'Active', className: 'active' },
  COMING_SOON: { label: 'Coming Soon', className: 'coming-soon' },
  DRAFT: { label: 'Draft', className: 'concept' },
  FEATURED: { label: 'Featured', className: 'featured' },
  CONCEPT: { label: 'Concept / Demo', className: 'concept' },
  IN_DEVELOPMENT: { label: 'In Development', className: 'development' },
  PRE_PRODUCTION: { label: 'Pre-Production', className: 'development' },
  IN_PRODUCTION: { label: 'In Production', className: 'coming-soon' },
  RELEASED: { label: 'Released', className: 'active' },
};

export default function StatusBadge({ status, label }: { status: BadgeKind; label?: string }) {
  const badge = BADGES[status];
  if (!badge) return null;
  return <span className={`status-badge ${badge.className}`}>{label ?? badge.label}</span>;
}
