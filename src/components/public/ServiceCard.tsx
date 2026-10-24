import React from 'react';
import type { Service, ServiceCategory } from '@/lib/types';
import StatusBadge from './StatusBadge';

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  STORIES: 'Stories',
  STUDIO: 'Studio',
  ADVERTISING: 'Advertising',
  TECHNOLOGY: 'Technology',
  CREATOR: 'Creator',
  BRAND: 'Brand',
  DISTRIBUTION: 'Distribution',
};

/** Studio service card. Status (Active / Coming Soon) and Featured come from the CMS. */
export default function ServiceCard({ service }: { service: Service }) {
  const isSoon = service.status === 'COMING_SOON';
  const classes = ['studio-service-card', service.featured ? 'is-featured' : '', isSoon ? 'is-soon' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classes} id={`service-${service.slug}`}>
      <div className="studio-service-media">
        {service.image ? (
          <img src={service.image} alt="" loading="lazy" />
        ) : (
          <span className="service-glyph" aria-hidden="true">{service.icon ?? '✦'}</span>
        )}
        <div className="badge-row">
          {service.featured && <StatusBadge status="FEATURED" />}
          <StatusBadge status={service.status} />
        </div>
      </div>
      <div className="studio-service-body">
        <span className="studio-service-category">{CATEGORY_LABELS[service.category]}</span>
        <h3 className="studio-service-title">{service.title}</h3>
        <p className="studio-service-copy">{service.shortDescription}</p>
      </div>
    </article>
  );
}
