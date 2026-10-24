import React from 'react';
import type { Metadata } from 'next';
import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';
import ContactForm from '@/components/public/ContactForm';
import { defaultSiteSettings } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contact Us — Welele Media',
  description: 'Connect with Welele Media for creator pitches, co-production partnerships, distribution licensing, and corporate press enquiries.',
};

export default function ContactPage() {
  return (
    <>
      <Navigation />

      <main style={{ paddingTop: 'var(--nav-height)' }}>
        {/* PAGE HERO */}
        <section className="section" style={{ borderTop: 'none', padding: '70px 0 40px' }}>
          <div className="container" style={{ maxWidth: '840px' }}>
            <div className="eyebrow" style={{ color: 'var(--orange)' }}>Start A Conversation</div>
            <h1 style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.95, letterSpacing: '-0.06em', margin: '16px 0 20px' }}>
              Let’s <span className="gradient">connect.</span>
            </h1>
            <p className="hero-lead">
              Have a story to tell? Want to partner with Welele Media on co-productions, distribution licensing, or press features? We invite you to reach out.
            </p>
          </div>
        </section>

        {/* CONTACT FORM & INFORMATION GRID */}
        <section className="section" style={{ paddingTop: '0' }}>
          <div className="container about-grid">
            {/* Interactive Form */}
            <div>
              <div className="kicker" style={{ marginBottom: '16px' }}>Enquiry Form</div>
              <ContactForm />
            </div>

            {/* Direct Contact Details & Offices */}
            <div>
              <div className="kicker" style={{ marginBottom: '16px' }}>Corporate Headquarters</div>
              <div
                style={{
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
              >
                <div>
                  <span className="eyebrow" style={{ color: 'var(--orange)' }}>General &amp; Pitches</span>
                  <a
                    href={`mailto:${defaultSiteSettings.contactEmail}`}
                    style={{ display: 'block', fontSize: '20px', fontWeight: 800, color: '#fff', marginTop: '6px' }}
                  >
                    {defaultSiteSettings.contactEmail}
                  </a>
                </div>

                <div>
                  <span className="eyebrow" style={{ color: 'var(--orange)' }}>Telephone</span>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: '#e2e8f0', marginTop: '6px' }}>
                    {defaultSiteSettings.contactPhone}
                  </p>
                </div>

                <div>
                  <span className="eyebrow" style={{ color: 'var(--orange)' }}>Primary Office</span>
                  <p style={{ fontSize: '15px', color: '#cbd5e1', marginTop: '6px', lineHeight: 1.5 }}>
                    {defaultSiteSettings.address}
                  </p>
                </div>

                <div>
                  <span className="eyebrow" style={{ color: 'var(--orange)' }}>Pan-African Network Hubs</span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                    <span style={{ fontSize: '12px', padding: '4px 12px', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-pill)', color: '#fff' }}>
                      Johannesburg, South Africa
                    </span>
                    <span style={{ fontSize: '12px', padding: '4px 12px', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-pill)', color: '#fff' }}>
                      Nairobi, Kenya
                    </span>
                    <span style={{ fontSize: '12px', padding: '4px 12px', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-pill)', color: '#fff' }}>
                      Lagos, Nigeria
                    </span>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px' }}>
                  <span className="kicker">Corporate Notice</span>
                  <p style={{ fontSize: '12px', color: 'var(--subtle)', marginTop: '8px', lineHeight: 1.6 }}>
                    This is the official corporate and media portal of Welele Media (Pty) Ltd. For consumer viewing and streaming application enquiries, visit your designated streaming portal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="section" style={{ background: '#020b10' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <div className="section-head" style={{ justifyContent: 'center', textAlign: 'center' }}>
              <div>
                <div className="kicker">Frequently Asked Questions</div>
                <h2>Common Questions</h2>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
              <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
                <h4 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '8px' }}>
                  How do I submit a script or project pitch?
                </h4>
                <p className="section-copy" style={{ fontSize: '14px' }}>
                  Select &ldquo;Creator Pitch&rdquo; in the enquiry form above and include a brief logline, format description, and synopsis. Our development team reviews creator submissions regularly and connects with promising talent.
                </p>
              </div>

              <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
                <h4 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '8px' }}>
                  Can international broadcasters and platforms partner on Welele Media originals?
                </h4>
                <p className="section-copy" style={{ fontSize: '14px' }}>
                  Yes. We actively develop our slate for regional and global distribution. Reach out through the form selecting &ldquo;Partnership&rdquo; to discuss co-production, first-look options, or development packaging.
                </p>
              </div>

              <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
                <h4 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '8px' }}>
                  Where can audiences watch Welele Media productions?
                </h4>
                <p className="section-copy" style={{ fontSize: '14px' }}>
                  Our inaugural slate is currently in development. As productions near release, premiere dates, broadcast partners, and streaming availability will be announced here on our website and on the upcoming Welele platform.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
