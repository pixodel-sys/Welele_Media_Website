import React from 'react';
import Link from 'next/link';

export interface NewsCardData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  authorName: string;
  category: string;
  publishedAt: string | Date;
}

export default function NewsCard({ article }: { article: NewsCardData }) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="news-card" id={`news-${article.slug}`}>
      <Link href={`/news/${article.slug}`} className="news-card-link">
        <div className="news-card-image-wrap">
          {article.coverImage ? (
            <img src={article.coverImage} alt={article.title} className="news-card-image" loading="lazy" />
          ) : (
            <div className="news-card-image-fallback">
              <span className="news-card-category-watermark">{article.category}</span>
            </div>
          )}
          <span className="news-category-pill">{article.category}</span>
        </div>

        <div className="news-card-body">
          <div className="news-card-meta">
            <span className="news-date">{formattedDate}</span>
            <span className="news-dot">•</span>
            <span className="news-author">{article.authorName}</span>
          </div>
          <h3 className="news-card-title">{article.title}</h3>
          <p className="news-card-excerpt">{article.excerpt}</p>
          <div className="news-read-more">
            <span>Read Full Story</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}
