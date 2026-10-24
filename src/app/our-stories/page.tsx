'use client';

import React, { useState, useMemo } from 'react';
import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';
import StoryCard from '@/components/public/StoryCard';
import { defaultStories } from '@/lib/data';

export default function StoriesCataloguePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'African Original', 'Crime & Drama', 'Romance & Drama', 'Documentary'];

  const filteredStories = useMemo(() => {
    return defaultStories.filter((story) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        story.category.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchesSearch =
        searchQuery === '' ||
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.synopsis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <Navigation />

      <main style={{ paddingTop: 'var(--nav-height)' }}>
        {/* CATALOGUE HERO */}
        <section className="section" style={{ borderTop: 'none', padding: '70px 0 40px' }}>
          <div className="container">
            <div className="eyebrow" style={{ color: 'var(--orange)' }}>Curated Slate</div>
            <h1 style={{ fontSize: 'clamp(40px, 5.5vw, 68px)', lineHeight: 0.95, letterSpacing: '-0.05em', margin: '16px 0 20px' }}>
              Our stories.
            </h1>
            <p className="section-copy" style={{ maxWidth: '600px', fontSize: '16px' }}>
              Explore Welele Media’s original productions, prestige dramas, crime series, and documentaries showcasing the depth, vitality, and brilliance of African life.
            </p>

            {/* FILTER & SEARCH BAR */}
            <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Category Pills */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="btn"
                    style={{
                      padding: '8px 18px',
                      fontSize: '11px',
                      background: selectedCategory === cat ? 'var(--gradient-brand)' : 'var(--panel)',
                      borderColor: selectedCategory === cat ? 'transparent' : 'var(--line)',
                      color: '#ffffff',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div style={{ maxWidth: '420px', position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search stories by title, genre, synopsis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#040d12',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '12px 20px',
                    color: '#fff',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* STORIES GRID */}
        <section className="section">
          <div className="container">
            {filteredStories.length > 0 ? (
              <div className="cards-grid-4">
                {filteredStories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--panel)', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>No stories found</h3>
                <p className="section-copy" style={{ margin: '0 auto 20px' }}>
                  No titles match your search criteria. Try selecting another category or clear your search term.
                </p>
                <button
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="btn primary"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
