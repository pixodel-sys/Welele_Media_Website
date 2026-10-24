import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 20px 60px' }}>
        <div className="eyebrow" style={{ color: 'var(--orange)', marginBottom: '16px' }}>404 — Page Not Found</div>
        <h1 style={{ fontSize: 'clamp(44px, 6vw, 76px)', lineHeight: 0.95, letterSpacing: '-0.06em', marginBottom: '20px' }}>
          Lost in the <span className="gradient">narrative.</span>
        </h1>
        <p className="section-copy" style={{ maxWidth: '520px', marginBottom: '32px' }}>
          The page or story you are looking for does not exist or may have been relocated.
        </p>
        <Link href="/" className="btn primary">
          Return to Home →
        </Link>
      </main>
      <Footer />
    </>
  );
}
