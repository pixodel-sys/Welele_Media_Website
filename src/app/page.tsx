import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';
import StoryCard from '@/components/public/StoryCard';
import NewsCard from '@/components/public/NewsCard';
import LivingHeroBackground from '@/components/public/LivingHeroBackground';
import EcosystemSection from '@/components/public/EcosystemSection';
import StudioTeaser from '@/components/public/StudioTeaser';
import PlatformTeaser from '@/components/public/PlatformTeaser';
import {
  getEcosystem,
  getFeaturedStories,
  getNewsArticles,
  getPillars,
  getPrimaryPlatform,
  getSiteSettings,
  getStories,
  isSectionEnabled,
} from '@/lib/content';

const PILLAR_ICONS: Record<string, string> = {
  stories: '✦',
  studio: '◈',
  platform: '◎',
  creators: '❖',
};

export default async function HomePage() {
  const [settings, featuredStories, allStories, news, ecosystem, pillars, platform] = await Promise.all([
    getSiteSettings(),
    getFeaturedStories(4),
    getStories(),
    getNewsArticles(),
    getEcosystem(),
    getPillars(),
    getPrimaryPlatform(),
  ]);
  const latestNews = news.slice(0, 3);
  const show = (key: string) => isSectionEnabled(settings, key);
  const markers = settings.showStats && settings.stats.length > 0 ? settings.stats : settings.visionMarkers;

  return (
    <>
      <Navigation />

      <main id="main-content">
        {/* HERO SECTION (approved — unchanged) */}
        <section className="hero">
          <LivingHeroBackground imageUrl={settings.heroArtworkUrl} />

          <div className="container hero-content">
            <div className="eyebrow">{settings.heroEyebrow}</div>
            <h1 className="hero-title">
              Stories that<br />
              <span className="gradient">move you.</span>
            </h1>
            <p className="hero-lead">{settings.heroDescription}</p>
            <div className="hero-actions">
              <Link href="/our-stories" className="btn primary" id="hero-watch-btn">
                <span>▶ Explore our stories</span>
              </Link>
              <Link href="/what-we-do" className="btn" id="hero-explore-btn">
                <span>What we do →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ABOUT TEASER SECTION */}
        {show('about') && (
          <section className="section" id="about">
            <div className="container about-grid">
              <div>
                <div className="kicker">About Welele Media</div>
                <h2>
                  More than content.<br />
                  <span className="gradient">A movement.</span>
                </h2>
                <p className="section-copy" style={{ marginTop: '16px' }}>
                  We are building a modern African media company — original stories, a creative studio for brands, an
                  audience platform and a growing network of creators, all connected around the story.
                </p>

                {/* Positioning markers (numeric stats only when company-confirmed) */}
                <div className={`stats-grid ${settings.showStats ? '' : 'markers'}`}>
                  {markers.map((marker) => (
                    <div key={marker.label} className="stat-box">
                      <span className="stat-number">{marker.value}</span>
                      <span className="stat-label">{marker.label}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '28px' }}>
                  <Link href="/about" className="btn">
                    Read Our Mission &amp; Vision →
                  </Link>
                </div>
              </div>

              {/* Visual Artistic Pillar */}
              <div className="about-visual">
                <div className="about-visual-top">Stories with a point of view.</div>
                <div className="about-visual-hero-text">
                  AFRICAN<br />
                  STORIES.<br />
                  <span className="gradient">GLOBAL AUDIENCE.</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FEATURED STORIES SECTION */}
        {show('stories') && (
          <section className="section" id="stories">
            <div className="container">
              <div className="section-head">
                <div>
                  <div className="kicker">Our Upcoming Slate</div>
                  <h2>Our stories.</h2>
                </div>
                <Link href="/our-stories" className="btn">
                  View all stories ({allStories.length}) →
                </Link>
              </div>

              <div className="cards-grid-4">
                {featuredStories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* STAGE C — ECOSYSTEM: MORE THAN A MEDIA COMPANY */}
        {show('ecosystem') && <EcosystemSection items={ecosystem} />}

        {/* WHAT WE DO — now the four business pillars */}
        {show('services') && (
          <section className="section">
            <div className="container">
              <div className="section-head">
                <div>
                  <div className="kicker">What We Do</div>
                  <h2>
                    We make media<br />
                    <span className="gradient">that moves.</span>
                  </h2>
                </div>
                <Link href="/what-we-do" className="btn">
                  Explore what we do →
                </Link>
              </div>

              <div className="services-grid">
                {pillars.map((pillar) => (
                  <Link key={pillar.key} href={pillar.href} className="service-card" id={`home-pillar-${pillar.key}`}>
                    <span className="service-icon">{PILLAR_ICONS[pillar.key]}</span>
                    <h3 className="service-title">{pillar.label}</h3>
                    <p className="service-copy" style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: '6px' }}>
                      {pillar.headline}
                    </p>
                    <p className="service-copy">{pillar.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* STAGE C — STUDIO TEASER */}
        {show('studio') && <StudioTeaser />}

        {/* STAGE C — PLATFORM TEASER */}
        {show('platform') && platform && <PlatformTeaser platform={platform} />}

        {/* CREATORS & PARTNERS TEASER SECTION */}
        {show('creators-partners') && (
          <section className="section" id="creators">
            <div className="container creator-teaser-grid">
              <div className="creator-teaser-box">
                <div className="kicker">Creators</div>
                <h3 className="creator-teaser-title">
                  Talent is <span className="gradient">the engine.</span>
                </h3>
                <p className="creator-teaser-copy">
                  Directors, writers, producers, actors, digital creators and creative technologists — we discover,
                  develop and connect African talent with opportunities.
                </p>
                <div>
                  <Link href="/creators" className="btn primary">
                    Meet Our Creators →
                  </Link>
                </div>
              </div>

              <div className="creator-teaser-box alt" id="partners">
                <div className="kicker">Partners</div>
                <h3 className="creator-teaser-title">
                  Stronger <span className="gradient">together.</span>
                </h3>
                <p className="creator-teaser-copy">
                  We are looking for broadcasters, streamers, brands, studios and investors who want to build the next
                  generation of African media with us.
                </p>
                <div>
                  <Link href="/partners" className="btn">
                    Partner With Welele →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* NEWSROOM PREVIEW SECTION */}
        {show('news') && (
          <section className="section" id="news">
            <div className="container">
              <div className="section-head">
                <div>
                  <div className="kicker">Press &amp; Updates</div>
                  <h2>
                    Latest stories<br />
                    from our <span className="gradient">newsroom.</span>
                  </h2>
                </div>
                <Link href="/news" className="btn">
                  Visit Newsroom →
                </Link>
              </div>

              <div className="cards-grid-3">
                {latestNews.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CONTACT CALLOUT SECTION */}
        {show('contact') && (
          <section className="section" id="contact" style={{ background: '#020b10' }}>
            <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
              <div className="kicker">Work With Us</div>
              <h2 style={{ margin: '14px 0 20px' }}>
                Let’s <span className="gradient">work together.</span>
              </h2>
              <p className="section-copy" style={{ margin: '0 auto 32px' }}>
                Have a story to pitch, a brand to bring to life or a partnership in mind? Let’s build something that moves
                people.
              </p>
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn primary">
                  Start a Conversation →
                </Link>
                <a href={`mailto:${settings.contactEmail}`} className="btn">
                  Email {settings.contactEmail}
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
