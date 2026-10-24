import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';
import NewsCard from '@/components/public/NewsCard';
import { defaultNewsArticles } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Newsroom & Press — Welele Media',
  description: 'Official announcements, production updates, creator features, and press releases from Welele Media.',
};

export default function NewsroomPage() {
  const featuredArticle = defaultNewsArticles[0];
  const regularArticles = defaultNewsArticles.slice(1);

  return (
    <>
      <Navigation />

      <main style={{ paddingTop: 'var(--nav-height)' }}>
        {/* PAGE HERO */}
        <section className="section" style={{ borderTop: 'none', padding: '70px 0 40px' }}>
          <div className="container" style={{ maxWidth: '840px' }}>
            <div className="eyebrow" style={{ color: 'var(--orange)' }}>Newsroom &amp; Press</div>
            <h1 style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.95, letterSpacing: '-0.06em', margin: '16px 0 20px' }}>
              Latest stories from our <span className="gradient">newsroom.</span>
            </h1>
            <p className="hero-lead">
              Stay informed with official corporate announcements, slate acquisitions, behind-the-scenes production insights, and commentary on the evolution of African cinema.
            </p>
          </div>
        </section>

        {/* FEATURED STORY HERO BANNER */}
        {featuredArticle && (
          <section className="section" style={{ paddingTop: '0' }}>
            <div className="container">
              <div
                style={{
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  transition: 'border-color var(--transition-normal)',
                }}
                className="featured-news-banner"
              >
                <div style={{ minHeight: '360px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={featuredArticle.coverImage || '/images/hero-bg.png'}
                    alt={featuredArticle.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 40%, rgba(7,20,26,0.95) 100%)' }} />
                </div>

                <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span className="eyebrow" style={{ color: 'var(--orange)', marginBottom: '12px' }}>
                    Featured Press Release • {featuredArticle.category}
                  </span>
                  <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.04em' }}>
                    {featuredArticle.title}
                  </h2>
                  <p className="section-copy" style={{ fontSize: '14px', marginBottom: '24px' }}>
                    {featuredArticle.excerpt}
                  </p>
                  <div>
                    <Link href={`/news/${featuredArticle.slug}`} className="btn primary">
                      Read Press Release →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* REGULAR NEWS ARTICLES GRID */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">Archive &amp; Features</div>
                <h2>Recent Coverage</h2>
              </div>
            </div>

            <div className="cards-grid-3">
              {defaultNewsArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>

        {/* MEDIA KIT & PRESS CONTACT */}
        <section className="section" style={{ background: '#020b10' }}>
          <div className="container about-grid">
            <div>
              <div className="kicker">Press Contacts</div>
              <h2>Media Inquiries &amp; Accreditation</h2>
              <p className="section-copy" style={{ marginTop: '16px' }}>
                For interview requests with Welele Media executive leadership, high-resolution visual assets, or press screener access, contact our communications desk.
              </p>
              <div style={{ marginTop: '24px' }}>
                <a href="mailto:hello@welelemedia.co.za" className="btn primary">
                  Contact Press Office →
                </a>
              </div>
            </div>

            <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '32px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '14px' }}>Official Press Assets</h4>
              <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                Download high-resolution corporate logos, show key art, and leadership portraits for editorial publication.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href="/images/welele-media-logo.png" download className="btn" style={{ justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>Download Logo Package (.PNG)</span>
                  <span>↓</span>
                </a>
                <Link href="/contact?category=Press" className="btn" style={{ justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>Request Production Screeners</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
