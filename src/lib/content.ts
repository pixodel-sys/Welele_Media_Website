// ==============================================================================
// WELELE MEDIA — CONTENT ACCESS LAYER (Stage C)
// ==============================================================================
// Single entry point for page content. Today it serves the typed defaults in
// ./data. When the admin CMS is connected, swap these implementations for
// Prisma queries (see ./db) — page code does not need to change.
//
// ISOLATION: This module must never call the Welele App's API, database,
// auth or storage. Platform data is Welele Media's own editorial record.
// ==============================================================================

import {
  defaultCaseStudies,
  defaultCreators,
  defaultEcosystem,
  defaultNewsArticles,
  defaultPartners,
  defaultPillars,
  defaultPlatforms,
  defaultServices,
  defaultSiteSettings,
  defaultStories,
  partnershipCategories,
} from './data';
import type {
  CaseStudy,
  Creator,
  EcosystemItem,
  NewsArticle,
  Partner,
  Pillar,
  Platform,
  Service,
  ServiceCategory,
  SiteSettings,
  Story,
} from './types';

/**
 * Content source mode:
 * - 'static' (default launch state): Directly serves typed defaults without database attempts or latency.
 * - 'database' / 'auto': Tries PostgreSQL via Prisma, falling back to static defaults if offline.
 */
export const CONTENT_SOURCE = process.env.CONTENT_SOURCE || 'static';

const byOrder = <T extends { displayOrder: number }>(a: T, b: T) => a.displayOrder - b.displayOrder;

// --- Site settings -------------------------------------------------------------
export async function getSiteSettings(): Promise<SiteSettings> {
  return defaultSiteSettings;
}

export function isSectionEnabled(settings: SiteSettings, key: string): boolean {
  const section = settings.homepageSections.find((s) => s.key === key);
  return section ? section.enabled : true;
}

// --- Stories -------------------------------------------------------------------
export async function getStories(): Promise<Story[]> {
  return defaultStories.filter((s) => s.publicationStatus === 'PUBLISHED').sort(byOrder);
}

export async function getFeaturedStories(limit = 4): Promise<Story[]> {
  const settings = await getSiteSettings();
  const stories = await getStories();
  if (settings.featuredStorySlugs.length > 0) {
    return settings.featuredStorySlugs
      .map((slug) => stories.find((s) => s.slug === slug))
      .filter((s): s is Story => Boolean(s))
      .slice(0, limit);
  }
  return stories.filter((s) => s.featured).slice(0, limit);
}

export async function getStoryBySlug(slug: string): Promise<Story | undefined> {
  return (await getStories()).find((s) => s.slug === slug);
}

// --- Creators ------------------------------------------------------------------
export async function getCreators(): Promise<Creator[]> {
  return [...defaultCreators].sort(byOrder);
}

export async function getCreatorBySlug(slug: string): Promise<Creator | undefined> {
  return defaultCreators.find((c) => c.slug === slug);
}

// --- Partners ------------------------------------------------------------------
export async function getPartners(): Promise<Partner[]> {
  return [...defaultPartners].sort(byOrder);
}

export async function getPartnershipCategories() {
  return partnershipCategories;
}

// --- News ----------------------------------------------------------------------
export async function getNewsArticles(): Promise<NewsArticle[]> {
  return defaultNewsArticles
    .filter((a) => a.status === 'PUBLISHED')
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

// --- Services ------------------------------------------------------------------
export const STUDIO_CATEGORIES: ServiceCategory[] = ['STUDIO', 'ADVERTISING', 'BRAND', 'TECHNOLOGY'];

/** Public services: DRAFT items are never returned. */
export async function getServices(categories?: ServiceCategory[]): Promise<Service[]> {
  return defaultServices
    .filter((s) => s.status !== 'DRAFT')
    .filter((s) => !categories || categories.includes(s.category))
    .sort(byOrder);
}

export async function getStudioServices(): Promise<Service[]> {
  return getServices(STUDIO_CATEGORIES);
}

export async function getFeaturedStudioServices(): Promise<Service[]> {
  const settings = await getSiteSettings();
  const services = await getStudioServices();
  if (settings.studioFeaturedServiceSlugs.length > 0) {
    return settings.studioFeaturedServiceSlugs
      .map((slug) => services.find((s) => s.slug === slug))
      .filter((s): s is Service => Boolean(s));
  }
  return services.filter((s) => s.featured);
}

// --- Platforms -----------------------------------------------------------------
export async function getPlatforms(): Promise<Platform[]> {
  return defaultPlatforms.filter((p) => p.status !== 'DRAFT').sort(byOrder);
}

/**
 * Returns the primary platform record, with outbound URLs resolved from
 * Site Settings first (so admins control links in one place).
 */
export async function getPrimaryPlatform(): Promise<Platform | undefined> {
  const settings = await getSiteSettings();
  const platform = (await getPlatforms()).find((p) => p.featured) ?? (await getPlatforms())[0];
  if (!platform) return undefined;
  return {
    ...platform,
    externalUrl: settings.platformUrl || platform.externalUrl,
    appStoreUrl: settings.platformAppStoreUrl || platform.appStoreUrl,
    googlePlayUrl: settings.platformGooglePlayUrl || platform.googlePlayUrl,
    status: settings.platformStatus || platform.status,
  };
}

// --- Case studies --------------------------------------------------------------
export async function getCaseStudies(): Promise<CaseStudy[]> {
  return defaultCaseStudies.filter((c) => c.status === 'PUBLISHED');
}

// --- Pillars & ecosystem -------------------------------------------------------
export async function getPillars(): Promise<Pillar[]> {
  return defaultPillars;
}

export async function getEcosystem(): Promise<EcosystemItem[]> {
  return defaultEcosystem;
}
