import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';
import StoryCard from '@/components/public/StoryCard';
import { defaultStories, defaultSiteSettings } from '@/lib/data';
import StoryDetailClient from './StoryDetailClient';
import StatusBadge from '@/components/public/StatusBadge';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = defaultStories.find((s) => s.slug === slug);
  if (!story) return { title: 'Story Not Found — Welele Media' };

  return {
    title: `${story.title} — Welele Media Originals`,
    description: story.synopsis,
    openGraph: {
      title: story.title,
      description: story.synopsis,
      images: [story.heroImage],
    },
  };
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const story = defaultStories.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  const relatedStories = defaultStories.filter((s) => s.slug !== story.slug).slice(0, 3);

  return (
    <>
      <Navigation />

      <main style={{ paddingTop: 'var(--nav-height)' }}>
        {/* STORY HERO & ARTWORK */}
        <section className="story-detail-hero" style={{ position: 'relative', overflow: 'hidden' }}>
          <div
            className="hero-background-art"
            style={{
              backgroundImage: `url(${story.heroImage})`,
              minHeight: '620px',
              opacity: 0.45,
            }}
          />
          <div className="hero-overlay" />

          <div className="container" style={{ position: 'relative', zIndex: 3, paddingTop: '40px', paddingBottom: '60px' }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--muted)', marginBottom: '24px' }}>
              <Link href="/" style={{ color: 'var(--muted)' }}>Home</Link>
              <span>/</span>
              <Link href="/our-stories" style={{ color: 'var(--muted)' }}>Our Stories</Link>
              <span>/</span>
              <span style={{ color: '#fff' }}>{story.title}</span>
            </div>

            {/* Badges & Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <StatusBadge status={story.productionStatus} />
              <span className="eyebrow" style={{ color: 'var(--orange)' }}>{story.category}</span>
              <span style={{ color: 'var(--subtle)' }}>•</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#e2e8f0' }}>
                {story.productionStatus === 'RELEASED' ? '' : 'PLANNED '}{story.episodeCount} EPISODES
              </span>
              <span style={{ color: 'var(--subtle)' }}>•</span>
              <span style={{ fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
                {story.ageRating}
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(44px, 6.5vw, 84px)', fontWeight: 950, letterSpacing: '-0.06em', lineHeight: 0.95, maxWidth: '850px', marginBottom: '20px' }}>
              {story.title}
            </h1>

            {story.tagline && (
              <p style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: 'var(--orange)', fontStyle: 'italic', maxWidth: '720px', marginBottom: '28px', lineHeight: 1.4 }}>
                &ldquo;{story.tagline}&rdquo;
              </p>
            )}

            {/* Story actions (watch when released, otherwise partnership enquiry) */}
            <StoryDetailClient
              storyTitle={story.title}
              storySlug={story.slug}
              watchUrl={story.watchUrl}
              platformUrl={defaultSiteSettings.platformUrl}
            />
          </div>
        </section>

        {/* SYNOPSIS & STORYLINE */}
        <section className="section">
          <div className="container about-grid">
            <div>
              <div className="kicker">The Narrative</div>
              <h2>Synopsis &amp; Storyline</h2>
              <p className="section-copy" style={{ marginTop: '16px', fontSize: '16px', color: '#e2e8f0', lineHeight: 1.7 }}>
                {story.synopsis}
              </p>
              <div style={{ marginTop: '20px', color: 'var(--muted)', fontSize: '14px', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {story.description}
              </div>
            </div>

            {/* Production Specifications & Creators */}
            <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 'var(--radius-xl)', padding: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
                Production Information
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <span className="kicker" style={{ fontSize: '10px' }}>Format &amp; Length</span>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>
                    {story.episodeCount} Episodes (planned)
                  </p>
                </div>

                <div>
                  <span className="kicker" style={{ fontSize: '10px' }}>Content Rating</span>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>
                    {story.ageRating} (Mature Themes &amp; Language)
                  </p>
                </div>

                <div>
                  <span className="kicker" style={{ fontSize: '10px' }}>Creators &amp; Showrunners</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
                    {story.creators.map((c) => (
                      <Link
                        key={c.id}
                        href={`/creators/${c.slug}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--orange)', fontSize: '14px', fontWeight: 700 }}
                      >
                        <span>{c.name}</span>
                        <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 400 }}>({c.role})</span>
                        <span style={{ fontSize: '12px' }}>→</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="kicker" style={{ fontSize: '10px' }}>Status &amp; Partnerships</span>
                  <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    Welele Media Original • In development • Open to co-production, broadcast and distribution conversations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRAILER / VIDEO SHOWCASE AREA */}
        <section className="section" style={{ background: '#020a0f' }}>
          <div className="container" style={{ maxWidth: '960px', textAlign: 'center' }}>
            <div className="kicker">Official Trailer &amp; Teaser</div>
            <h2 style={{ margin: '10px 0 24px' }}>Experience the World of {story.title}</h2>

            <div
              style={{
                width: '100%',
                aspectRatio: '16 / 9',
                background: '#040d12',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--line)',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
              }}
            >
              {story.trailerUrl ? (
                <iframe
                  src={story.trailerUrl}
                  title={`${story.title} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              ) : (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--gradient-brand)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                  <h4 style={{ fontSize: '18px', fontWeight: 800 }}>Teaser in development</h4>
                  <p className="section-copy" style={{ fontSize: '13px', margin: '8px auto 0' }}>
                    A first look will be shared here when it is ready. Partners can request the project deck through our contact page.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* RELATED STORIES */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">More from Welele Media</div>
                <h2>Related Stories</h2>
              </div>
              <Link href="/our-stories" className="btn">
                All Stories →
              </Link>
            </div>

            <div className="cards-grid-3">
              {relatedStories.map((rel) => (
                <StoryCard key={rel.id} story={rel} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
