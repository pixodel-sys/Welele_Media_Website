import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { defaultSiteSettings } from '@/lib/data';

// Note: Footer is rendered inside both server and client pages, so it reads the
// synchronous default settings rather than the async content layer.
export default function Footer() {
  const settings = defaultSiteSettings;
  const socials = [
    { label: 'Instagram', href: settings.social.instagram },
    { label: 'Facebook', href: settings.social.facebook },
    { label: 'YouTube', href: settings.social.youtube },
    { label: 'TikTok', href: settings.social.tiktok },
    { label: 'LinkedIn', href: settings.social.linkedin },
    { label: 'X', href: settings.social.x },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href));

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        {/* Brand & Vision Column */}
        <div className="footer-brand-col">
          <Logo variant="nav" />
          <p className="footer-desc">{settings.siteDescription}</p>
          <div className="footer-pill-badge">
            <span>{settings.brandLine}</span>
          </div>
        </div>

        {/* Links Navigation */}
        <div className="footer-nav-grid cols-4">
          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><Link href="/about">About Welele Media</Link></li>
              <li><Link href="/what-we-do">What We Do</Link></li>
              <li><Link href="/partners">Partners</Link></li>
              <li><Link href="/news">Newsroom</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Create</h4>
            <ul className="footer-links">
              <li><Link href="/our-stories">Our Stories</Link></li>
              <li><Link href="/studio">Welele Studio</Link></li>
              <li><Link href="/creators">Creators</Link></li>
              <li><Link href="/contact">Pitch a Story</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Platform</h4>
            <ul className="footer-links">
              <li><Link href="/platform">Meet Welele</Link></li>
              {settings.platformUrl && (
                <li>
                  <a href={settings.platformUrl} target="_blank" rel="noopener noreferrer">
                    Visit Welele ↗
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Connect</h4>
            <ul className="footer-links">
              <li><Link href="/contact">Work With Us</Link></li>
              <li><a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a></li>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="container footer-bottom">
        <div className="footer-copyright">
          © {new Date().getFullYear()} Welele Media™. All rights reserved.
        </div>
        <div className="footer-statement">{settings.footerText}</div>
      </div>
    </footer>
  );
}
