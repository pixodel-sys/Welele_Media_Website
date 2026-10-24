import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';
import CreatorCard from '@/components/public/CreatorCard';
import { defaultCreators } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Creators Network — Welele Media',
  description: 'Meet the visionaries behind Welele Media: directors, showrunners, screenwriters, and cinematographers shaping modern African storytelling.',
};

export default function CreatorsPage() {
  return (
    <>
      <Navigation />

      <main style={{ paddingTop: 'var(--nav-height)' }}>
        {/* PAGE HERO */}
        <section className="section" style={{ borderTop: 'none', padding: '70px 0 50px' }}>
          <div className="container" style={{ maxWidth: '840px' }}>
            <div className="eyebrow" style={{ color: 'var(--orange)' }}>The Talent Behind The Stories</div>
            <h1 style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.95, letterSpacing: '-0.06em', margin: '16px 0 20px' }}>
              Meet the <span className="gradient">visionaries.</span>
            </h1>
            <p className="hero-lead">
              Welele champions Africa’s most daring voices. From established directors to breakthrough screenwriters, our Creator Network provides creative sovereignty, production resources, and direct distribution to global audiences.
            </p>
          </div>
        </section>

        {/* CREATORS DIRECTORY GRID */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">Founding Creator Network</div>
                <h2>Founding Showrunners &amp; Filmmakers</h2>
                <p style={{ margin: '8px 0 0', fontSize: '13px', color: 'var(--muted)', maxWidth: '640px' }}>
                  Concept &amp; Demonstration Slate — Profiles below illustrate our initial creative roles and attached development slates. Official verified talent rosters will be announced and updated via the CMS.
                </p>
              </div>
            </div>

            <div className="cards-grid-4">
              {defaultCreators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </div>
        </section>

        {/* CREATOR PITCH CALLOUT */}
        <section className="section" style={{ background: '#020b10' }}>
          <div className="container" style={{ maxWidth: '780px', textAlign: 'center' }}>
            <div className="kicker">Creator Pitches</div>
            <h2 style={{ margin: '12px 0 20px' }}>Are you an African filmmaker with a bold story?</h2>
            <p className="section-copy" style={{ margin: '0 auto 30px', fontSize: '15px' }}>
              Welele Media actively options, co-develops, and executive produces original scripted series, features, and documentaries. Submit your deck, pilot script, or treatment to our editorial committee.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn primary">
                Submit A Creator Pitch →
              </Link>
              <Link href="/about" className="btn">
                Learn About Our Standards →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
