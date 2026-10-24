import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';
import Logo from '@/components/public/Logo';
import { defaultSiteSettings } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About Us — Welele Media',
  description: 'Learn about Welele Media, our mission, storytelling pillars, leadership, and vision for African cinema on the global stage.',
};

export default function AboutPage() {
  return (
    <>
      <Navigation />

      <main style={{ paddingTop: 'var(--nav-height)' }}>
        {/* PAGE HERO */}
        <section className="section" style={{ borderTop: 'none', padding: '80px 0 60px' }}>
          <div className="container" style={{ maxWidth: '840px' }}>
            <div className="eyebrow" style={{ color: 'var(--orange)' }}>About Welele Media</div>
            <h1 style={{ fontSize: 'clamp(44px, 6vw, 76px)', lineHeight: 0.95, letterSpacing: '-0.06em', margin: '20px 0 24px' }}>
              We build stories for Africa &amp; <span className="gradient">the world.</span>
            </h1>
            <p className="hero-lead">
              Welele Media is an independent corporate media, production, and distribution enterprise dedicated to producing original African cinema, television, and documentary narratives that resonate across global audiences.
            </p>
          </div>
        </section>

        {/* LOGO & BRAND IDENTITY HIGHLIGHT */}
        <section className="section" style={{ background: '#030d12' }}>
          <div className="container" style={{ textAlign: 'center', padding: '20px 0' }}>
            <div className="kicker" style={{ marginBottom: '24px' }}>Our Brand Symbol &amp; Philosophy</div>
            <Logo variant="full" height={78} />
            <p className="section-copy" style={{ maxWidth: '640px', margin: '24px auto 0', fontSize: '15px' }}>
              The Welele Media mark represents three connected people, community, and creative collective under a unified warm African dawn. At its core, storytelling isn’t merely entertainment—<strong>it’s about connection</strong>.
            </p>
          </div>
        </section>

        {/* PILLARS SECTION */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">Core Philosophy</div>
                <h2>Our four creative pillars.</h2>
              </div>
            </div>

            <div className="services-grid">
              <div className="service-card">
                <span className="service-icon">✦</span>
                <h3 className="service-title">1. Creative Sovereignty</h3>
                <p className="service-copy">
                  African creators retain intellectual property, narrative control, and creative voice. We reject sanitized stereotypes in favor of authentic complexity.
                </p>
              </div>

              <div className="service-card">
                <span className="service-icon">◈</span>
                <h3 className="service-title">2. Cinematic Rigor</h3>
                <p className="service-copy">
                  From 4K HDR cinematography to orchestral scores incorporating indigenous instruments, we hold our productions to the highest global cinema standards.
                </p>
              </div>

              <div className="service-card">
                <span className="service-icon">◎</span>
                <h3 className="service-title">3. Pan-African Slate</h3>
                <p className="service-copy">
                  Our development pipeline spans Southern, Eastern, Western, and Northern Africa, connecting dynamic creative hubs from Johannesburg to Nairobi, Lagos, and Cairo.
                </p>
              </div>

              <div className="service-card">
                <span className="service-icon">❖</span>
                <h3 className="service-title">4. Global Reach</h3>
                <p className="service-copy">
                  Through strategic distribution and co-production alliances, our stories reach streaming audiences, theatrical circuits, and cultural institutions worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VISION TRAJECTORY & PILLARS */}
        <section className="section" style={{ background: '#020b10' }}>
          <div className="container about-grid">
            <div>
              <div className="kicker">Our Trajectory</div>
              <h2>
                Vision that guides<br />
                <span className="gradient">our growth.</span>
              </h2>
              <p className="section-copy" style={{ marginTop: '16px' }}>
                With an inaugural production slate spanning dramas, true crime series, romance, and documentaries, Welele
                Media is building deliberate, sustainable creative infrastructure across Africa.
              </p>

              <div className={`stats-grid ${defaultSiteSettings.showStats && defaultSiteSettings.stats.length > 0 ? '' : 'markers'}`}>
                {(defaultSiteSettings.showStats && defaultSiteSettings.stats.length > 0
                  ? defaultSiteSettings.stats
                  : defaultSiteSettings.visionMarkers
                ).map((marker, i) => (
                  <div key={i} className="stat-box">
                    <span className="stat-number">{marker.value}</span>
                    <span className="stat-label">{marker.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-visual">
              <div className="about-visual-top">Creative Footprint</div>
              <div className="about-visual-hero-text">
                JOHANNESBURG<br />
                NAIROBI<br />
                LAGOS
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="section" style={{ textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '680px' }}>
            <div className="kicker">Partner With Us</div>
            <h2 style={{ margin: '14px 0 20px' }}>Ready to shape the future of African cinema?</h2>
            <p className="section-copy" style={{ margin: '0 auto 30px' }}>
              Whether you are an independent creator with a compelling pitch or a global distributor seeking original African content, we invite you to connect.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/creators" className="btn primary">Meet Our Creators →</Link>
              <Link href="/contact" className="btn">Contact The Team →</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
