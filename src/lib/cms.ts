// ==============================================================================
// WELELE MEDIA — CMS ARCHITECTURE MAP (Stage C)
// ==============================================================================
// Declarative description of the standalone admin CMS. The admin UI (a later
// stage) renders its sidebar and forms from this map. Kept intentionally
// simple — no enterprise workflow, roles matrix or versioning.
// ==============================================================================

import type { PublishStatus, ServiceCategory, CaseStudyStatus } from './types';

export interface CmsSection {
  key: string;
  label: string;
  href: string;
  model: string | null; // Prisma model backing the section
  description: string;
}

export const CMS_NAVIGATION: CmsSection[] = [
  { key: 'dashboard', label: 'Dashboard', href: '/admin', model: null, description: 'Overview and recent enquiries.' },
  { key: 'stories', label: 'Stories', href: '/admin/stories', model: 'Story', description: 'Original slate, production status and creators.' },
  { key: 'creators', label: 'Creators', href: '/admin/creators', model: 'Creator', description: 'Creator profiles, socials and representation.' },
  { key: 'services', label: 'Services', href: '/admin/services', model: 'Service', description: 'What We Do and Welele Studio offerings (Active / Coming Soon / Featured).' },
  { key: 'platforms', label: 'Platforms', href: '/admin/platforms', model: 'Platform', description: 'Editorial representation of the Welele App — outbound links only.' },
  { key: 'case-studies', label: 'Case Studies', href: '/admin/case-studies', model: 'CaseStudy', description: 'Genuine client and studio work. Demo work must be marked conceptual.' },
  { key: 'partners', label: 'Partners', href: '/admin/partners', model: 'Partner', description: 'Confirmed, publicly announceable partners only.' },
  { key: 'news', label: 'News', href: '/admin/news', model: 'NewsArticle', description: 'Newsroom and press releases.' },
  { key: 'media', label: 'Media', href: '/admin/media', model: 'MediaAsset', description: 'Standalone media library (dedicated storage).' },
  { key: 'settings', label: 'Site Settings', href: '/admin/settings', model: 'SiteSettings', description: 'General, Homepage, Platform, Studio, Social and Contact.' },
  { key: 'contact', label: 'Contact', href: '/admin/contact', model: 'ContactSubmission', description: 'Enquiries from the public contact form.' },
];

/** Site Settings form groups (maps to SiteSettings fields). */
export const SITE_SETTINGS_GROUPS: Record<string, string[]> = {
  General: ['companyName', 'tagline', 'brandLine', 'siteDescription', 'metaDescription', 'logoUrl'],
  Homepage: ['heroEyebrow', 'heroHeadline', 'heroDescription', 'heroArtworkUrl', 'heroMediaUrl', 'featuredStorySlugs', 'homepageSections', 'showStats', 'stats'],
  Platform: ['platformUrl', 'platformAppStoreUrl', 'platformGooglePlayUrl', 'platformStatus'],
  Studio: ['studioHeading', 'studioDescription', 'studioFeaturedServiceSlugs'],
  Social: ['socialInstagram', 'socialFacebook', 'socialYoutube', 'socialTiktok', 'socialLinkedin', 'socialX'],
  Contact: ['contactEmail', 'contactPhone', 'address', 'enquiryInfo', 'footerText'],
};

export const PUBLISH_STATUSES: { value: PublishStatus; label: string }[] = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'COMING_SOON', label: 'Coming Soon' },
  { value: 'DRAFT', label: 'Draft (hidden)' },
];

export const CASE_STUDY_STATUSES: { value: CaseStudyStatus; label: string }[] = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PUBLISHED', label: 'Published' },
  { value: 'ARCHIVED', label: 'Archived' },
];

export const SERVICE_CATEGORIES: { value: ServiceCategory; label: string }[] = [
  { value: 'STORIES', label: 'Stories' },
  { value: 'STUDIO', label: 'Studio' },
  { value: 'ADVERTISING', label: 'Advertising' },
  { value: 'TECHNOLOGY', label: 'Technology' },
  { value: 'CREATOR', label: 'Creator' },
  { value: 'BRAND', label: 'Brand' },
  { value: 'DISTRIBUTION', label: 'Distribution' },
];
