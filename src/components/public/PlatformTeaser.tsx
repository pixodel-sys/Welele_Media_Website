import React from 'react';
import Link from 'next/link';
import type { Platform } from '@/lib/types';
import DeviceMockup from './DeviceMockup';
import SmartLink from './SmartLink';
import StatusBadge from './StatusBadge';

/**
 * Homepage platform teaser. Content comes from Welele Media's own Platform
 * record; the CTA is a CMS-configured outbound link. No app API is called.
 */
export default function PlatformTeaser({ platform }: { platform: Platform }) {
  return (
    <section className="section platform-teaser" id="platform" aria-labelledby="platform-teaser-title">
      {platform.heroImage && (
        <div className="platform-teaser-bg" style={{ backgroundImage: `url(${platform.heroImage})` }} aria-hidden="true" />
      )}
      <div className="container platform-grid">
        <div>
          <div className="badge-row" style={{ alignItems: 'center', gap: '12px' }}>
            <div className="kicker">The Welele Platform</div>
            <StatusBadge status={platform.status} />
          </div>
          <h2 className="platform-title" id="platform-teaser-title">
            The stories continue<br />
            <span className="gradient">beyond the screen.</span>
          </h2>
          <p className="section-copy" style={{ fontSize: '16px' }}>
            Discover the {platform.name} platform — connecting audiences with entertainment, culture and community.
          </p>

          <div className="platform-feature-list">
            {platform.features.slice(0, 4).map((f) => (
              <div key={f.title} className="platform-feature">
                <span className="platform-feature-icon" aria-hidden="true">{f.icon ?? '✦'}</span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="platform-actions">
            {platform.externalUrl && (
              <SmartLink href={platform.externalUrl} className="btn primary" id="home-platform-cta">
                {platform.ctaLabel} ↗
              </SmartLink>
            )}
            <Link href="/platform" className="btn">
              Learn more →
            </Link>
          </div>
        </div>

        <DeviceMockup screenshots={platform.screenshots} />
      </div>
    </section>
  );
}
