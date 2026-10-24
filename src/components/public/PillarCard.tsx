import React from 'react';
import Link from 'next/link';
import type { Pillar, Service } from '@/lib/types';

interface PillarCardProps {
  pillar: Pillar;
  index: number;
  capabilities?: Service[];
  extraCapabilities?: string[];
}

export default function PillarCard({ pillar, index, capabilities = [], extraCapabilities = [] }: PillarCardProps) {
  return (
    <article className="pillar-card" id={`pillar-${pillar.key}`}>
      <img src={pillar.image} alt="" className="pillar-card-img" loading="lazy" />
      <span className="pillar-index">{String(index + 1).padStart(2, '0')} / 04</span>

      <h2 className="pillar-label gradient">{pillar.label}</h2>
      <h3 className="pillar-headline">{pillar.headline}</h3>
      <p className="pillar-copy">{pillar.description}</p>

      {(capabilities.length > 0 || extraCapabilities.length > 0) && (
        <ul className="capability-list">
          {capabilities.map((svc) => (
            <li key={svc.id} className={svc.status === 'COMING_SOON' ? 'soon' : undefined}>
              {svc.title}
            </li>
          ))}
          {extraCapabilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      <div>
        <Link href={pillar.href} className="btn primary" id={`pillar-cta-${pillar.key}`}>
          {pillar.ctaLabel} →
        </Link>
      </div>
    </article>
  );
}
