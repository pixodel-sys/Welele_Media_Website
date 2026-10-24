import React from 'react';
import Link from 'next/link';
import StatusBadge from './StatusBadge';
import type { ProductionStatus } from '@/lib/types';

export interface StoryCardData {
  id: string;
  title: string;
  slug: string;
  category: string;
  tagline?: string | null;
  synopsis: string;
  episodeCount: number;
  ageRating: string;
  heroImage: string;
  posterImage?: string | null;
  featured?: boolean;
  productionStatus?: ProductionStatus;
}

export default function StoryCard({ story }: { story: StoryCardData }) {
  // Artistic gradient variants based on slug/title
  const getGradientClass = (slug: string) => {
    if (slug.includes('amber')) return 'art-gradient-a';
    if (slug.includes('jozi') || slug.includes('shadow')) return 'art-gradient-b';
    if (slug.includes('kilimani') || slug.includes('night')) return 'art-gradient-c';
    return 'art-gradient-d';
  };

  return (
    <article className="story-card" id={`story-${story.slug}`}>
      <Link href={`/our-stories/${story.slug}`} className="story-card-link">
        {/* Cinematic Artwork Container */}
        <div className={`story-art ${getGradientClass(story.slug)}`}>
          {story.posterImage || story.heroImage ? (
            <img
              src={story.posterImage || story.heroImage}
              alt={story.title}
              className="story-art-image"
              loading="lazy"
            />
          ) : null}
          <div className="story-art-overlay"></div>
          <div className="story-art-label">{story.category}</div>
          <h3 className="story-art-title">{story.title}</h3>
          <div className="story-badges">
            {story.productionStatus && story.productionStatus !== 'RELEASED' && (
              <StatusBadge status={story.productionStatus} />
            )}
            <span className="story-badge-rating">{story.ageRating}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="story-card-body">
          <div className="story-card-meta">
            <span className="story-card-tag">{story.category}</span>
            <span className="story-card-dot">•</span>
            <span className="story-card-sub">
              {story.productionStatus && story.productionStatus !== 'RELEASED' ? 'Planned · ' : ''}
              {story.episodeCount} Episodes
            </span>
          </div>
          <h4 className="story-card-heading">{story.title}</h4>
          <p className="story-card-synopsis">
            {story.tagline || story.synopsis}
          </p>
          <div className="story-card-cta">
            <span>Explore Story</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}
