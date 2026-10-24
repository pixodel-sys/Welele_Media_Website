import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'nav' | 'full' | 'icon-only';
  className?: string;
  height?: number;
}

export default function Logo({ variant = 'nav', className = '', height }: LogoProps) {
  // Navigation Bar Header
  if (variant === 'nav') {
    return (
      <Link href="/" className={`logo-link ${className}`} aria-label="Welele Media Home">
        <img
          src="/images/welele-media-logo-cropped.png"
          alt="Welele Media — It's about connection."
          style={{
            height: height || 60,
            width: 'auto',
            display: 'block',
            mixBlendMode: 'screen',
            objectFit: 'contain',
          }}
          className="logo-nav-img"
        />
      </Link>
    );
  }

  // Full Stacked Logo (for About, Footer, Brand highlights)
  return (
    <div className={`logo-full-container ${className}`}>
      <Link href="/" className="logo-full-link" aria-label="Welele Media Home">
        <img
          src="/images/welele-media-logo-cropped.png"
          alt="Welele Media — It's about connection."
          style={{
            height: height || 143,
            width: 'auto',
            maxWidth: '100%',
            display: 'block',
            margin: '0 auto',
            mixBlendMode: 'screen',
            objectFit: 'contain',
          }}
          className="logo-full-img"
        />
      </Link>
    </div>
  );
}
