import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';
import StoryCard from '@/components/public/StoryCard';
import { defaultCreators, defaultStories } from '@/lib/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const creator = defaultCreators.find((c) => c.slug === slug);
  if (!creator) return { title: 'Creator Not Found — Welele Media' };

  return {
    title: `${creator.name} (${creator.role}) — Welele Media Creator Network`,
    description: creator.bio,
  };
}

export default async function CreatorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const creator = defaultCreators.find((c) => c.slug === slug);

  if (!creator) {
    notFound();
  }

  // Find associated stories for this creator
  const creatorStories = defaultStories.filter((story) =>
    story.creators.some((c) => c.slug === creator.slug)
  );

  return (
    <>
      <Navigation />

      <main style={{ paddingTop: 'var(--nav-height)' }}>
        {/* CREATOR PROFILE HEADER */}
        <section className="section" style={{ borderTop: 'none', padding: '60px 0' }}>
          <div className="container">
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--muted)', marginBottom: '32px' }}>
              <Link href="/" style={{ color: 'var(--muted)' }}>Home</Link>
              <span>/</span>
              <Link href="/creators" style={{ color: 'var(--muted)' }}>Creators</Link>
              <span>/</span>
              <span style={{ color: '#fff' }}>{creator.name}</span>
            </div>

            <div className="about-grid">
              {/* Creator Portrait Showcase */}
              <div
                style={{
                  height: '420px',
                  borderRadius: 'var(--radius-xl)',
                  background: 'linear-gradient(145deg, #0f2732, #1f0f1d)',
                  border: '1px solid var(--line)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                }}
              >
                {creator.portraitImage ? (
                  <img src={creator.portraitImage} alt={creator.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '42px', fontWeight: 900, color: '#fff' }}>
                      {creator.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                )}
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', background: 'rgba(2,9,13,0.85)', backdropFilter: 'blur(10px)', padding: '12px 18px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    {creator.role}
                  </span>
                  <div style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: 600 }}>
                    {creator.location}
                  </div>
                </div>
              </div>

              {/* Creator Bio & Details */}
              <div>
                <span className="eyebrow" style={{ color: 'var(--orange)' }}>Creator Profile</span>
                <h1 style={{ fontSize: 'clamp(38px, 5vw, 64px)', fontWeight: 950, letterSpacing: '-0.05em', margin: '14px 0 16px', lineHeight: 1 }}>
                  {creator.name}
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--muted)', fontWeight: 600, marginBottom: '24px' }}>
                  {creator.role} {creator.location ? `• ${creator.location}` : ''}{creator.country && creator.country !== creator.location ? `, ${creator.country}` : ''}
                </p>

                <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '10px' }}>Biography</h3>
                <p className="section-copy" style={{ fontSize: '15px', color: '#e2e8f0', lineHeight: 1.7, marginBottom: '24px' }}>
                  {creator.bio}
                </p>

                {creator.representation && (
                  <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '24px' }}>
                    <strong style={{ color: '#fff' }}>Representation:</strong> {creator.representation}
                  </p>
                )}

                {/* Social & External Channels */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {creator.websiteUrl && (
                    <a href={creator.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '8px 16px', fontSize: '11px' }}>
                      Website ↗
                    </a>
                  )}
                  {creator.twitter && (
                    <a href={creator.twitter} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '8px 16px', fontSize: '11px' }}>
                      Twitter / X ↗
                    </a>
                  )}
                  {creator.instagram && (
                    <a href={creator.instagram} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '8px 16px', fontSize: '11px' }}>
                      Instagram ↗
                    </a>
                  )}
                  {creator.linkedin && (
                    <a href={creator.linkedin} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '8px 16px', fontSize: '11px' }}>
                      LinkedIn ↗
                    </a>
                  )}
                  {creator.youtube && (
                    <a href={creator.youtube} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '8px 16px', fontSize: '11px' }}>
                      YouTube ↗
                    </a>
                  )}
                  {creator.tiktok && (
                    <a href={creator.tiktok} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '8px 16px', fontSize: '11px' }}>
                      TikTok ↗
                    </a>
                  )}
                  <Link href="/contact" className="btn primary" style={{ padding: '8px 18px', fontSize: '11px' }}>
                    Enquire for Project →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ASSOCIATED WELELE MEDIA SLATE */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">Filmography &amp; Collaborations</div>
                <h2>Originals by {creator.name}</h2>
              </div>
            </div>

            {creatorStories.length > 0 ? (
              <div className="cards-grid-3">
                {creatorStories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            ) : (
              <div style={{ background: 'var(--panel)', padding: '40px', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                <p className="section-copy">New productions by {creator.name} are currently in development.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
