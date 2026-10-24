import React from 'react';

export interface PartnerCardData {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  description?: string | null;
  websiteUrl?: string | null;
  tier: string;
}

export default function PartnerCard({ partner }: { partner: PartnerCardData }) {
  return (
    <article className="partner-card" id={`partner-${partner.slug}`}>
      <div className="partner-logo-wrap">
        {partner.logoUrl ? (
          <img src={partner.logoUrl} alt={partner.name} className="partner-logo-img" loading="lazy" />
        ) : (
          <div className="partner-logo-text">{partner.name}</div>
        )}
      </div>
      <div className="partner-body">
        <span className="partner-tier-badge">{partner.tier}</span>
        <h3 className="partner-title">{partner.name}</h3>
        {partner.description && (
          <p className="partner-description">{partner.description}</p>
        )}
        {partner.websiteUrl && (
          <a
            href={partner.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="partner-link"
          >
            <span>Visit Website</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}
