import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';
import PageHero from '@/components/public/PageHero';
import DeviceMockup from '@/components/public/DeviceMockup';
import SmartLink from '@/components/public/SmartLink';
import StatusBadge from '@/components/public/StatusBadge';
import { getPrimaryPlatform } from '@/lib/content';

// ==============================================================================
// /platform — Editorial page about the Welele App.
// ISOLATION: All content comes from Welele Media's own Platform record.
// No API calls, no shared auth/DB/storage. Store/website links are plain
// outbound hyperlinks configured in the Welele Media CMS.
// ==============================================================================

export const metadata: Metadata = {
  title: 'Meet Welele — The Welele Platform',
  description:
    'Welele is a new way to discover stories, entertainment and community — the audience platform in the Welele Media ecosystem.',
};

export default async function PlatformPage() {
  const platform = await getPrimaryPlatform();
  if (!platform) notFound();

  const isComingSoon = platform.status === 'COMING_SOON';

  return (
    <>
      <Navigation />

      <main id="main-content">
        <PageHero
          eyebrow="The Welele Platform"
          image={platform.heroImage ?? undefined}
          title={
            <>
              Meet <span className="gradient">{platform.name}.</span>
            </>
          }
          lead={platform.tagline ?? platform.description}
        >
          {platform.externalUrl && (
            <SmartLink href={platform.externalUrl} className="btn primary" id="platform-hero-cta">
              {platform.ctaLabel} ↗
            </SmartLink>
          )}
          <StatusBadge status={platform.status} />
        </PageHero>

        {/* OVERVIEW + DEVICE */}
        <section className="section" style={{ borderTop: 'none' }}>
          <div className="container platform-grid">
            <div>
              <div className="kicker">Stories beyond the screen</div>
              <h2 className="platform-title">
                The stories continue<br />
                <span className="gradient">beyond the screen.</span>
              </h2>
              <p className="section-copy" style={{ fontSize: '16px', marginBottom: '16px' }}>
                {platform.description}
              </p>
              {platform.longDescription && (
                <p className="section-copy" style={{ fontSize: '14px' }}>{platform.longDescription}</p>
              )}

              {/* Store & website links (CMS-configured outbound URLs) */}
              <div className="platform-actions" style={{ marginTop: '28px' }}>
                {platform.appStoreUrl ? (
                  <a href={platform.appStoreUrl} className="store-badge" target="_blank" rel="noopener noreferrer" id="platform-appstore-link">
                    <span aria-hidden="true" style={{ fontSize: '20px' }}></span>
                    <span>Download on the<strong>App Store</strong></span>
                  </a>
                ) : (
                  <span className="store-badge disabled" aria-disabled="true">
                    <span aria-hidden="true" style={{ fontSize: '20px' }}></span>
                    <span>App Store<strong>Coming soon</strong></span>
                  </span>
                )}
                {platform.googlePlayUrl ? (
                  <a href={platform.googlePlayUrl} className="store-badge" target="_blank" rel="noopener noreferrer" id="platform-googleplay-link">
                    <span aria-hidden="true" style={{ fontSize: '18px' }}>▶</span>
                    <span>Get it on<strong>Google Play</strong></span>
                  </a>
                ) : (
                  <span className="store-badge disabled" aria-disabled="true">
                    <span aria-hidden="true" style={{ fontSize: '18px' }}>▶</span>
                    <span>Google Play<strong>Coming soon</strong></span>
                  </span>
                )}
                {platform.externalUrl && (
                  <SmartLink href={platform.externalUrl} className="btn" id="platform-website-link">
                    Visit {platform.externalUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
                  </SmartLink>
                )}
              </div>
              {isComingSoon && (
                <p className="isolation-note">
                  Welele is launching soon. Visit the Welele website for the latest updates.
                </p>
              )}
            </div>

            <DeviceMockup screenshots={platform.screenshots} />
          </div>
        </section>

        {/* FEATURES */}
        <section className="section" style={{ background: '#020b10' }}>
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">Features</div>
                <h2>What you can do on {platform.name}.</h2>
              </div>
            </div>
            <div className="feature-grid">
              {platform.features.map((f) => (
                <article key={f.title} className="feature-card">
                  <span className="platform-feature-icon" aria-hidden="true">{f.icon ?? '✦'}</span>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="section">
          <div className="container about-grid">
            <div>
              <div className="kicker">Why Welele</div>
              <h2 style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 0.95, letterSpacing: '-0.06em', marginTop: '10px' }}>
                Built for the people<br />
                <span className="gradient">who love the stories.</span>
              </h2>
            </div>
            <div className="benefit-list">
              {platform.benefits.map((b, i) => (
                <div key={b.title} className="benefit">
                  <span className="benefit-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{b.title}</h3>
                    <p>{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RELATIONSHIP: MEDIA COMPANY ↔ PLATFORM */}
        <section className="section" style={{ background: '#020b10' }}>
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">How it fits together</div>
                <h2>A media company and its platform.</h2>
              </div>
            </div>
            <div className="relationship-grid">
              <div className="relationship-box">
                <div className="kicker">Welele Media</div>
                <h3>Makes the stories.</h3>
                <p>Original entertainment, Welele Studio, creators and partnerships — this website.</p>
              </div>
              <div className="relationship-link">
                Stories flow to audiences
                <span className="line" />
              </div>
              <div className="relationship-box">
                <div className="kicker">{platform.name}</div>
                <h3>Connects the audience.</h3>
                <p>Discovery, entertainment and community — a separate platform you can visit directly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section cta-band">
          <div className="container" style={{ maxWidth: '720px' }}>
            <div className="kicker">Discover {platform.name}</div>
            <h2>
              Be there when<br />
              <span className="gradient">the story begins.</span>
            </h2>
            <p className="section-copy">
              Creators, brands and partners interested in {platform.name} can reach the Welele Media team directly.
            </p>
            <div className="cta-actions">
              {platform.externalUrl && (
                <SmartLink href={platform.externalUrl} className="btn primary" id="platform-footer-cta">
                  {platform.ctaLabel} ↗
                </SmartLink>
              )}
              <Link href="/contact" className="btn">Talk to Welele Media →</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
