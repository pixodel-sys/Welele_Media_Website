import React from 'react';
import Link from 'next/link';
import StudioTransformation from './StudioTransformation';

/** Homepage Studio teaser. */
export default function StudioTeaser() {
  return (
    <section className="section studio-teaser" id="studio" aria-labelledby="studio-teaser-title">
      <div className="container">
        <div className="studio-head">
          <div>
            <div className="kicker">Welele Studio</div>
            <h2 className="studio-title" id="studio-teaser-title">
              The future of advertising<br />
              is being <span className="gradient">created now.</span>
            </h2>
          </div>
          <p className="section-copy" style={{ fontSize: '16px' }}>
            Human creativity. Emerging technology. Stories built for modern audiences. Welele Studio helps brands go from
            a simple product to a campaign with cultural depth.
          </p>
        </div>

        <StudioTransformation />

        <div className="studio-actions">
          <Link href="/studio" className="btn primary" id="home-studio-cta">
            Explore Welele Studio →
          </Link>
          <Link href="/contact" className="btn">
            Brief us on a campaign →
          </Link>
        </div>
      </div>
    </section>
  );
}
