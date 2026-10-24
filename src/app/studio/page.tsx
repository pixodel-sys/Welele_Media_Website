import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';
import PageHero from '@/components/public/PageHero';
import ServiceCard from '@/components/public/ServiceCard';
import StudioTransformation from '@/components/public/StudioTransformation';
import { getCaseStudies, getSiteSettings, getStudioServices } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Welele Studio — Creative Technology for Modern Media',
  description:
    'Welele Studio combines human creative direction with emerging technology to create brand content, campaigns and AI-assisted production for modern audiences.',
};

export default async function StudioPage() {
  const [settings, services, caseStudies] = await Promise.all([getSiteSettings(), getStudioServices(), getCaseStudies()]);

  const active = services.filter((s) => s.status === 'ACTIVE');
  const comingSoon = services.filter((s) => s.status === 'COMING_SOON');

  return (
    <>
      <Navigation />

      <main id="main-content">
        <PageHero
          eyebrow="Welele Studio"
          image="/images/stage-c/studio-concept-world.jpg"
          title={
            <>
              Creative technology<br />
              <span className="gradient">for modern media.</span>
            </>
          }
          lead={settings.studioDescription}
        >
          <Link href="/contact" className="btn primary" id="studio-brief-cta">
            Brief the Studio →
          </Link>
          <a href="#services" className="btn">
            See our services ↓
          </a>
        </PageHero>

        {/* PROCESS / CONCEPT DEMO */}
        <section className="section studio-teaser" style={{ borderTop: 'none' }}>
          <div className="container">
            <div className="studio-head">
              <div>
                <div className="kicker">How we work</div>
                <h2 className="studio-title">
                  From product<br />
                  <span className="gradient">to campaign.</span>
                </h2>
              </div>
              <p className="section-copy" style={{ fontSize: '16px' }}>
                Every project starts with a human idea. Generative tools help us explore more directions and build richer
                worlds — then cast, culture and craft turn it into something people feel.
              </p>
            </div>
            <StudioTransformation />
          </div>
        </section>

        {/* SERVICES */}
        <section className="section" id="services">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">Studio services</div>
                <h2>What the Studio does.</h2>
              </div>
              <p className="section-copy">
                Some of what we offer is available now. Some is in development and marked as coming soon. We would rather
                be honest about where we are than overpromise.
              </p>
            </div>

            <div className="studio-service-grid">
              {active.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            {comingSoon.length > 0 && (
              <>
                <div className="section-head" style={{ marginTop: '64px' }}>
                  <div>
                    <div className="kicker">In development</div>
                    <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 40px)' }}>Coming soon.</h2>
                  </div>
                </div>
                <div className="studio-service-grid">
                  {comingSoon.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* AI POSITIONING MANIFESTO */}
        <section className="manifesto">
          <div className="container">
            <div className="kicker">Our position on AI</div>
            <p className="manifesto-quote">
              Technology amplifies creativity.<br />
              <span className="gradient">It doesn’t replace it.</span>
            </p>
            <p className="manifesto-copy">
              AI is a capability inside Welele Media, not our identity. We use AI-assisted and generative tools where they
              make the work better — always human-directed, always culturally grounded.
            </p>

            <div className="principles-grid">
              <div className="principle">
                <h3>Human-directed</h3>
                <p>Every project has a human creative director accountable for the idea, the craft and the result.</p>
              </div>
              <div className="principle">
                <h3>Culturally grounded</h3>
                <p>Technology can generate images. It can’t generate lived experience. Our teams and creators bring that.</p>
              </div>
              <div className="principle">
                <h3>Honest by default</h3>
                <p>We label concept and demo work clearly, and we are transparent with clients about how work is made.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CASE STUDIES (model ready, intentionally empty) */}
        <section className="section" id="work">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">Studio work</div>
                <h2>Case studies.</h2>
              </div>
            </div>

            {caseStudies.length === 0 ? (
              <div className="empty-state">
                <div className="kicker">Coming soon</div>
                <h3>Our first case studies are being made.</h3>
                <p>
                  Welele Studio is new. Rather than show borrowed or invented results, we will publish real work here as it
                  is completed. Want to be one of our first collaborators?
                </p>
                <Link href="/contact" className="btn primary">Start a project →</Link>
              </div>
            ) : (
              <div className="cards-grid-3">
                {caseStudies.map((cs) => (
                  <article key={cs.id} className="news-card">
                    {cs.heroImage && (
                      <div className="news-card-image-wrap">
                        <img src={cs.heroImage} alt={cs.title} className="news-card-image" loading="lazy" />
                      </div>
                    )}
                    <div className="news-card-body">
                      <div className="news-card-meta">
                        {cs.client ?? 'Welele Studio'}
                        {cs.isConceptual && ' · Concept'}
                      </div>
                      <h3 className="news-card-title">{cs.title}</h3>
                      <p className="news-card-excerpt">{cs.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="section cta-band" style={{ background: '#020b10' }}>
          <div className="container" style={{ maxWidth: '720px' }}>
            <div className="kicker">Work with Welele Studio</div>
            <h2>
              Let’s make something<br />
              <span className="gradient">people feel.</span>
            </h2>
            <p className="section-copy">
              Tell us about your brand, product or campaign. We will come back with ideas, not a sales deck.
            </p>
            <div className="cta-actions">
              <Link href="/contact" className="btn primary">Brief the Studio →</Link>
              <Link href="/what-we-do" className="btn">See everything we do →</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
