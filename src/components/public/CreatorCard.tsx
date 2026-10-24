import React from 'react';
import Link from 'next/link';

export interface CreatorCardData {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  portraitImage?: string | null;
  location?: string | null;
}

export default function CreatorCard({ creator }: { creator: CreatorCardData }) {
  return (
    <article className="creator-card" id={`creator-${creator.slug}`}>
      <Link href={`/creators/${creator.slug}`} className="creator-card-link">
        <div className="creator-portrait-box">
          {creator.portraitImage ? (
            <img
              src={creator.portraitImage}
              alt={creator.name}
              className="creator-portrait-img"
              loading="lazy"
            />
          ) : (
            <div className="creator-portrait-placeholder">
              <span className="creator-initials">
                {creator.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
          <div className="creator-glow-ring"></div>
        </div>

        <div className="creator-info">
          <span className="creator-role">{creator.role}</span>
          <h3 className="creator-name">{creator.name}</h3>
          {creator.location && (
            <span className="creator-location">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {creator.location}
            </span>
          )}
          <p className="creator-bio-excerpt">{creator.bio}</p>
          <div className="creator-view-link">
            <span>View Profile &amp; Slate</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}
