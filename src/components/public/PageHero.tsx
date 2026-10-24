import React from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  image?: string;
  children?: React.ReactNode;
}

/** Cinematic inner-page hero shared by the Stage C pages. */
export default function PageHero({ eyebrow, title, lead, image, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      {image && <div className="page-hero-bg" style={{ backgroundImage: `url(${image})` }} aria-hidden="true" />}
      <div className="page-hero-overlay" aria-hidden="true" />
      <div className="container">
        <div className="page-hero-inner">
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="page-hero-title">{title}</h1>
          {lead && <p className="hero-lead">{lead}</p>}
          {children && <div className="hero-actions">{children}</div>}
        </div>
      </div>
    </section>
  );
}
