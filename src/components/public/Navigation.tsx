'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

interface NavigationProps {
  ctaLabel?: string;
  ctaHref?: string;
  /** @deprecated Stage C replaced the watch CTA with "Work With Us". Kept for compatibility. */
  watchUrl?: string;
  /** @deprecated */
  watchLabel?: string;
}

export default function Navigation({
  ctaLabel = 'Work With Us',
  ctaHref = '/contact',
}: NavigationProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Our Stories', href: '/our-stories' },
    { label: 'What We Do', href: '/what-we-do' },
    { label: 'Platform', href: '/platform' },
    { label: 'Creators', href: '/creators' },
    { label: 'Partners', href: '/partners' },
    { label: 'News', href: '/news' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className={`nav-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        {/* Brand Logo */}
        <Logo variant="nav" />

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls & Mobile Toggle */}
        <div className="nav-actions">
          <Link href={ctaHref} className="cta" id="nav-work-with-us-cta">
            {ctaLabel}
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-nav-link ${isActive(link.href) ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={ctaHref}
              className="cta mobile-cta"
              onClick={() => setMobileMenuOpen(false)}
            >
              {ctaLabel}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
