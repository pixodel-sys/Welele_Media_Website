'use client';

import React from 'react';
import Link from 'next/link';

interface StoryDetailClientProps {
  storyTitle: string;
  storySlug?: string;
  /** Outbound watch URL. Null while the title is in development. */
  watchUrl: string | null;
  /** CMS-configured Welele platform URL (plain outbound link). */
  platformUrl?: string | null;
}

/**
 * Story actions.
 * Stage C: the previous "+ My List" watchlist was removed — watchlists are an
 * audience-platform feature that belongs to the Welele App, not this website.
 */
export default function StoryDetailClient({ storyTitle, storySlug, watchUrl, platformUrl }: StoryDetailClientProps) {
  const isExternal = (url: string) => /^https?:\/\//i.test(url);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
      {watchUrl ? (
        <a
          href={watchUrl}
          target={isExternal(watchUrl) ? '_blank' : undefined}
          rel={isExternal(watchUrl) ? 'noopener noreferrer' : undefined}
          className="btn primary"
          id="story-detail-watch-btn"
          style={{ padding: '14px 28px', fontSize: '13px' }}
        >
          <span>▶ Watch Now</span>
        </a>
      ) : (
        <Link
          href={`/contact${storySlug ? `?project=${encodeURIComponent(storySlug)}` : ''}`}
          className="btn primary"
          id="story-detail-enquire-btn"
          style={{ padding: '14px 28px', fontSize: '13px' }}
          aria-label={`Enquire about ${storyTitle}`}
        >
          <span>Partner on this project →</span>
        </Link>
      )}

      {platformUrl && (
        <a
          href={platformUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          id="story-detail-platform-btn"
          style={{ padding: '14px 24px', fontSize: '13px' }}
        >
          <span>Follow on Welele ↗</span>
        </a>
      )}
    </div>
  );
}
