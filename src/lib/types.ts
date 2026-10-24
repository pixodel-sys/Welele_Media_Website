// ==============================================================================
// WELELE MEDIA — CONTENT TYPES (Stage C)
// ==============================================================================
// Mirrors prisma/schema.prisma so the default dataset and a future Prisma-backed
// CMS share one shape. Pages depend on these types — never on the data source.
// ==============================================================================

export type PublishStatus = 'ACTIVE' | 'COMING_SOON' | 'DRAFT';

export type ServiceCategory =
  | 'STORIES'
  | 'STUDIO'
  | 'ADVERTISING'
  | 'TECHNOLOGY'
  | 'CREATOR'
  | 'BRAND'
  | 'DISTRIBUTION';

export type CaseStudyStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type ProductionStatus = 'IN_DEVELOPMENT' | 'PRE_PRODUCTION' | 'IN_PRODUCTION' | 'RELEASED';

export type CreatorType =
  | 'DIRECTOR'
  | 'WRITER'
  | 'PRODUCER'
  | 'ACTOR'
  | 'DIGITAL_CREATOR'
  | 'FILMMAKER'
  | 'PHOTOGRAPHER'
  | 'CREATIVE_TECHNOLOGIST'
  | 'EMERGING_TALENT';

export interface MarkerItem {
  value: string;
  label: string;
}

export interface SocialLinks {
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
  tiktok: string | null;
  linkedin: string | null;
  x: string | null;
}

export interface SiteSettings {
  // General
  companyName: string;
  tagline: string;
  brandLine: string;
  siteDescription: string;
  metaDescription: string;
  logoUrl: string | null;
  // Homepage
  heroEyebrow: string;
  heroHeadline: string;
  heroDescription: string;
  heroArtworkUrl: string;
  heroMediaUrl: string | null;
  featuredStorySlugs: string[];
  homepageSections: { key: string; enabled: boolean }[];
  showStats: boolean;
  stats: MarkerItem[]; // Company-confirmed figures only
  visionMarkers: MarkerItem[]; // Non-numeric positioning markers (default)
  // Legacy watch CTA
  watchCtaLabel: string;
  watchCtaUrl: string;
  // Platform — outbound links only
  platformUrl: string | null;
  platformAppStoreUrl: string | null;
  platformGooglePlayUrl: string | null;
  platformStatus: PublishStatus;
  // Studio
  studioHeading: string;
  studioDescription: string;
  studioFeaturedServiceSlugs: string[];
  // Social
  social: SocialLinks;
  // Contact
  contactEmail: string;
  contactPhone: string | null;
  address: string | null;
  enquiryInfo: string | null;
  footerText: string;
}

export interface StoryCreatorRef {
  id: string;
  name: string;
  role: string;
  slug: string;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  category: string;
  tagline: string | null;
  synopsis: string;
  description: string;
  episodeCount: number;
  ageRating: string;
  heroImage: string;
  posterImage: string | null;
  trailerUrl: string | null;
  watchUrl: string | null;
  featured: boolean;
  publicationStatus: string;
  productionStatus: ProductionStatus;
  displayOrder: number;
  creators: StoryCreatorRef[];
}

export interface Creator {
  id: string;
  name: string;
  slug: string;
  role: string;
  creatorType: CreatorType;
  bio: string;
  portraitImage: string | null;
  location: string | null;
  country: string | null;
  projects: string[];
  representation: string | null;
  contactEmail: string | null;
  websiteUrl: string | null;
  twitter: string | null;
  instagram: string | null;
  linkedin: string | null;
  facebook: string | null;
  youtube: string | null;
  tiktok: string | null;
  featured: boolean;
  displayOrder: number;
  stories: string[];
  isConceptProfile?: boolean;
}

export interface Partner {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  description: string | null;
  websiteUrl: string | null;
  tier: string;
  featured: boolean;
  displayOrder: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage: string | null;
  authorName: string;
  category: string;
  publishedAt: string;
  status: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: ServiceCategory;
  image: string | null;
  icon: string | null;
  status: PublishStatus;
  featured: boolean;
  displayOrder: number;
}

export interface PlatformFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface Platform {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string;
  longDescription: string | null;
  logo: string | null;
  heroImage: string | null;
  screenshots: string[];
  features: PlatformFeature[];
  benefits: PlatformFeature[];
  ctaLabel: string;
  externalUrl: string | null;
  appStoreUrl: string | null;
  googlePlayUrl: string | null;
  status: PublishStatus;
  featured: boolean;
  displayOrder: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  serviceSlug: string | null;
  description: string;
  challenge: string | null;
  solution: string | null;
  outcome: string | null;
  heroImage: string | null;
  gallery: string[];
  videoUrl: string | null;
  technologies: string[];
  isConceptual: boolean;
  featured: boolean;
  status: CaseStudyStatus;
  publishedAt: string | null;
}

/** The four business pillars presented on /what-we-do and across the site. */
export interface Pillar {
  key: 'stories' | 'studio' | 'platform' | 'creators';
  label: string;
  headline: string;
  description: string;
  ctaLabel: string;
  href: string;
  image: string;
  capabilityCategories: ServiceCategory[];
}

/** Homepage ecosystem cards (WATCH / CREATE / CONNECT / GROW). */
export interface EcosystemItem {
  key: string;
  label: string;
  description: string;
  href: string;
  image: string;
}
