import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';
import PartnerCard from '@/components/public/PartnerCard';
import { defaultPartners, partnershipCategories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Strategic Partners & Co-Producers — Welele Media',
  description:
    'Explore partnership opportunities with Welele Media across co-productions, broadcast distribution, brand collaborations, and creative technology.',
};

export default function PartnersPage() {
  const hasPartners = defaultPartners.length > 0;

  return (
    <>
      <Navigation />

      <main style={{ paddingTop: 'var(--nav-height)' }}>
        {/* PAGE HERO */}
        <section className="section" style={{ borderTop: 'none', padding: '70px 0 50px' }}>
          <div className="container" style={{ maxWidth: '840px' }}>
            <div className="eyebrow" style={{ color: 'var(--orange)' }}>Global Alliances</div>
            <h1
              style={{
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                lineHeight: 0.95,
                letterSpacing: '-0.06em',
                margin: '16px 0 20px',
              }}
            >
              Stronger <span className="gradient">together.</span>
            </h1>
            <p className="hero-lead">
              Building the next generation of African media requires collaboration across the entire creative
              ecosystem. We are building relationships with forward-thinking broadcasters, digital platforms, brands, and
              production studios to bring original African stories to audiences everywhere.
            </p>
          </div>
        </section>

        {/* WHO WE PARTNER WITH */}
        <section className="section" style={{ borderTop: 'none', paddingTop: 0 }}>
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">Who We Partner With</div>
                <h2>The partnership ecosystem.</h2>
              </div>
              <p className="section-copy">
                We believe in transparent, collaborative partnerships where creators, distributors, and brands all
                benefit from cultural authenticity and shared vision.
              </p>
            </div>

            <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              {partnershipCategories.map((cat) => (
                <div key={cat.key} className="service-card" id={`partner-cat-${cat.key.toLowerCase()}`}>
                  <span className="service-icon">{cat.icon}</span>
                  <h3 className="service-title">{cat.title}</h3>
                  <p className="service-copy">{cat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PARTNERS DIRECTORY / ANNOUNCEMENTS */}
        <section className="section" style={{ background: '#020b10' }}>
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">Official Partners</div>
                <h2>Broadcasters, Studios &amp; Distributors</h2>
              </div>
            </div>

            {hasPartners ? (
              <div className="cards-grid-4">
                {defaultPartners.map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            ) : (
              <div
                style={{
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '48px 32px',
                  textAlign: 'center',
                  maxWidth: '780px',
                  margin: '0 auto',
                }}
              >
                <div className="eyebrow" style={{ color: 'var(--orange)', marginBottom: '12px' }}>
                  Partnership Slate In Formation
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 850, letterSpacing: '-0.03em', marginBottom: '12px' }}>
                  Our inaugural partnerships are being formed.
                </h3>
                <p className="section-copy" style={{ maxWidth: '600px', margin: '0 auto 24px', fontSize: '15px' }}>
                  Welele Media is an emerging company. Rather than display borrowed logos or unconfirmed claims, we
                  will publish our official co-producers, broadcast alliances, and platform partners here as agreements
                  are finalized.
                </p>
                <Link href="/contact" className="btn primary">
                  Start a Partnership Conversation →
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* PARTNERSHIP VALUE PROPOSITION */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">Why Partner With Us</div>
                <h2>Collaborative Capabilities</h2>
              </div>
            </div>

            <div className="services-grid">
              <div className="service-card">
                <span className="service-icon">✦</span>
                <h3 className="service-title">Co-Production &amp; Development</h3>
                <p className="service-copy">
                  Rigorous story development and packaging for scripted episodic drama, features, and documentaries
                  designed for cross-border appeal.
                </p>
              </div>

              <div className="service-card">
                <span className="service-icon">◈</span>
                <h3 className="service-title">First-Look Opportunities</h3>
                <p className="service-copy">
                  Early window screening and territory distribution options for regional broadcasters and international
                  platforms seeking authentic African originals.
                </p>
              </div>

              <div className="service-card">
                <span className="service-icon">◎</span>
                <h3 className="service-title">Cultural Authenticity</h3>
                <p className="service-copy">
                  Indigenous storytelling led by local creators, ensuring deep cultural nuance, resonant characters, and
                  commercial viability across markets.
                </p>
              </div>

              <div className="service-card">
                <span className="service-icon">❖</span>
                <h3 className="service-title">Creative Technology Integration</h3>
                <p className="service-copy">
                  Access to Welele Studio workflows, multilingual localization, and modern production methods that help
                  stories reach broader audiences efficiently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNERSHIP INQUIRY CTA */}
        <section className="section" style={{ textAlign: 'center', background: '#020b10' }}>
          <div className="container" style={{ maxWidth: '680px' }}>
            <div className="kicker">Become A Partner</div>
            <h2 style={{ margin: '14px 0 20px' }}>Explore Co-Production or Distribution</h2>
            <p className="section-copy" style={{ margin: '0 auto 30px' }}>
              We welcome dialogue with regional and international media organizations, broadcasters, brands, and investors.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn primary">
                Initiate Partnership Dialogue →
              </Link>
              <a href="mailto:hello@welelemedia.co.za" className="btn">
                Email: hello@welelemedia.co.za
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
