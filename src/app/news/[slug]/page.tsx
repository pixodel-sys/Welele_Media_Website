import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';
import NewsCard from '@/components/public/NewsCard';
import { defaultNewsArticles } from '@/lib/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = defaultNewsArticles.find((a) => a.slug === slug);
  if (!article) return { title: 'Article Not Found — Welele Media' };

  return {
    title: `${article.title} — Welele Media Newsroom`,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = defaultNewsArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = defaultNewsArticles.filter((a) => a.slug !== article.slug).slice(0, 2);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      <Navigation />

      <main style={{ paddingTop: 'var(--nav-height)' }}>
        {/* ARTICLE HEADER & HERO */}
        <article className="section" style={{ borderTop: 'none', padding: '60px 0' }}>
          <div className="container" style={{ maxWidth: '820px' }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--muted)', marginBottom: '28px' }}>
              <Link href="/" style={{ color: 'var(--muted)' }}>Home</Link>
              <span>/</span>
              <Link href="/news" style={{ color: 'var(--muted)' }}>News</Link>
              <span>/</span>
              <span style={{ color: '#fff' }}>{article.title}</span>
            </div>

            {/* Meta tags */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', flexWrap: 'wrap' }}>
              <span className="eyebrow" style={{ color: 'var(--orange)' }}>{article.category}</span>
              <span style={{ color: 'var(--subtle)' }}>•</span>
              <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{formattedDate}</span>
              <span style={{ color: 'var(--subtle)' }}>•</span>
              <span style={{ fontSize: '13px', color: 'var(--muted)' }}>By {article.authorName}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.1, letterSpacing: '-0.05em', fontWeight: 950, marginBottom: '24px' }}>
              {article.title}
            </h1>

            <p style={{ fontSize: '18px', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '32px', fontStyle: 'italic', borderLeft: '3px solid var(--orange)', paddingLeft: '20px' }}>
              {article.excerpt}
            </p>

            {/* Cover image */}
            <div style={{ width: '100%', height: '420px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', position: 'relative', marginBottom: '40px', border: '1px solid var(--line)' }}>
              <img
                src={article.coverImage || '/images/hero-bg.png'}
                alt={article.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Editorial Body */}
            <div
              style={{
                fontSize: '16px',
                lineHeight: 1.8,
                color: '#e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              {article.body.split('\n\n').map((paragraph, index) => (
                <p key={index} style={{ margin: 0 }}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Share / Back Bar */}
            <div style={{ marginTop: '50px', paddingTop: '24px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <Link href="/news" className="btn">
                ← Back to All News
              </Link>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Share Story:</span>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '6px 12px', fontSize: '11px' }}>
                  X
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '6px 12px', fontSize: '11px' }}>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* RELATED ARTICLES */}
        <section className="section" style={{ background: '#020b10' }}>
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">Keep Reading</div>
                <h2>More from the Newsroom</h2>
              </div>
            </div>

            <div className="cards-grid-2">
              {relatedArticles.map((rel) => (
                <NewsCard key={rel.id} article={rel} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
