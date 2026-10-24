import React from 'react';
import Link from 'next/link';
import type { EcosystemItem } from '@/lib/types';

interface EcosystemSectionProps {
  items: EcosystemItem[];
}

/** Homepage: "More than a media company." — WATCH / CREATE / CONNECT / GROW. */
export default function EcosystemSection({ items }: EcosystemSectionProps) {
  return (
    <section className="section" id="ecosystem" aria-labelledby="ecosystem-title">
      <div className="container">
        <div className="eco-intro">
          <div>
            <div className="kicker">The Welele Ecosystem</div>
            <h2 className="eco-title" id="ecosystem-title">
              More than a<br />
              <span className="gradient">media company.</span>
            </h2>
          </div>
          <p className="eco-lead">
            We build the ecosystem around the story.
            <small>
              Welele Media connects stories, creators, audiences, brands and technology to build the next generation of
              African media.
            </small>
          </p>
        </div>

        <div className="eco-grid">
          {items.map((item, i) => (
            <Link key={item.key} href={item.href} className="eco-card" id={`eco-card-${item.key}`}>
              <img src={item.image} alt="" loading="lazy" />
              <span className="eco-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="eco-label">{item.label}</h3>
              <p className="eco-desc">
                <span>{item.description}</span>
                <span className="eco-arrow" aria-hidden="true">→</span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
