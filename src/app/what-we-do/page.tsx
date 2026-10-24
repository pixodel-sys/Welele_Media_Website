import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';
import PageHero from '@/components/public/PageHero';
import PillarCard from '@/components/public/PillarCard';
import { getPillars, getPrimaryPlatform, getServices } from '@/lib/content';

export const metadata: Metadata = {
  title: 'What We Do — Welele Media',
  description:
    'We make media that moves. Original African stories, Welele Studio for brands, the Welele platform and a growing creator network.',
};

export default async function WhatWeDoPage() {
  const [pillars, services, platform] = await Promise.all([getPillars(), getServices(), getPrimaryPlatform()]);

  const capabilitiesFor = (categories: string[]) => services.filter((s) => categories.includes(s.category));
  const platformCapabilities = platform ? platform.features.map((f) => f.title) : [];

  return (
    <>
      <Navigation />

      <main id="main-content">
        <PageHero
          eyebrow="What We Do"
          image="/images/welele-hero-clean.jpg"
          title={
            <>
              We make media<br />
              <span className="gradient">that moves.</span>
            </>
          }
          lead="From original stories and creator development to brand campaigns and emerging creative technology, Welele Media brings culture, creativity and innovation together."
        >
          <a href="#pillars" className="btn primary">
            Explore the four pillars ↓
          </a>
          <Link href="/contact" className="btn">
            Work With Us →
          </Link>
        </PageHero>

        {/* THE FOUR PILLARS */}
        <section className="section" id="pillars" style={{ borderTop: 'none' }}>
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">One ecosystem · Four pillars</div>
                <h2>
                  The story is the heart.<br />
                  <span className="gradient">Everything connects to it.</span>
                </h2>
              </div>
              <p className="section-copy">
                Stories create audiences. Creators create stories. Brands and technology help them travel further. Each
                part of Welele strengthens the others.
              </p>
            </div>

            <div className="pillar-grid">
              {pillars.map((pillar, i) => (
                <PillarCard
                  key={pillar.key}
                  pillar={pillar}
                  index={i}
                  capabilities={capabilitiesFor(pillar.capabilityCategories)}
                  extraCapabilities={pillar.key === 'platform' ? platformCapabilities : []}
                />
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT CONNECTS */}
        <section className="section" style={{ background: '#020b10' }}>
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">How it connects</div>
                <h2>The ecosystem around the story.</h2>
              </div>
            </div>
            <div className="services-grid">
              <div className="service-card">
                <span className="service-icon">01</span>
                <h3 className="service-title">Stories</h3>
                <p className="service-copy">The emotional heart — original entertainment that builds audiences and culture.</p>
              </div>
              <div className="service-card">
                <span className="service-icon">02</span>
                <h3 className="service-title">Studio</h3>
                <p className="service-copy">The creative engine — the same craft, applied to brands, with technology as an amplifier.</p>
              </div>
              <div className="service-card">
                <span className="service-icon">03</span>
                <h3 className="service-title">Platform</h3>
                <p className="service-copy">The audience connection — where stories continue beyond the screen.</p>
              </div>
              <div className="service-card">
                <span className="service-icon">04</span>
                <h3 className="service-title">Creators</h3>
                <p className="service-copy">The talent engine — the people who make all of it possible.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section cta-band">
          <div className="container" style={{ maxWidth: '720px' }}>
            <div className="kicker">Let’s Work Together</div>
            <h2>
              Bring us a story,<br />
              <span className="gradient">a brand or an idea.</span>
            </h2>
            <p className="section-copy">
              Whether you are a creator, a brand, a broadcaster or an investor, there is a place for you in the Welele
              ecosystem.
            </p>
            <div className="cta-actions">
              <Link href="/contact" className="btn primary">Start a Conversation →</Link>
              <Link href="/partners" className="btn">Partner With Us →</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
