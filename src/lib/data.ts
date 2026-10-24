// ==============================================================================
// WELELE MEDIA — EDITORIAL DATA MODEL & SEED ASSETS
// ==============================================================================
// Standalone corporate dataset faithful to prototype & African media aesthetic.
//
// STAGE C CREDIBILITY RULE:
// Welele Media is a new company. This dataset must NOT contain fabricated
// clients, partnerships, audience numbers, awards, downloads or case-study
// results. Use "in development", "building", "coming soon" language instead.
// Numeric stats may only be shown when SiteSettings.showStats is enabled with
// company-confirmed data.
// ==============================================================================

import type {
  CaseStudy,
  Creator,
  EcosystemItem,
  NewsArticle,
  Partner,
  Pillar,
  Platform,
  Service,
  SiteSettings,
  Story,
} from './types';

// ------------------------------------------------------------------------------
// SITE SETTINGS
// ------------------------------------------------------------------------------
export const defaultSiteSettings: SiteSettings = {
  // General
  companyName: 'Welele Media',
  tagline: 'Stories That Move You',
  brandLine: 'We make media that moves.',
  siteDescription:
    'Welele Media connects stories, creators, audiences, brands and technology to build the next generation of African media.',
  metaDescription:
    'Welele Media — a modern African media company connecting stories, creators, audiences, brands and technology.',
  logoUrl: null,

  // Homepage
  heroEyebrow: 'Welele Media™',
  heroHeadline: 'Stories that move you.',
  heroDescription:
    'Welele Media is a Pan-African media company creating, curating and distributing powerful stories that connect people, culture and global audiences.',
  heroArtworkUrl: '/images/welele-hero-clean.jpg',
  heroMediaUrl: null,
  featuredStorySlugs: [],
  homepageSections: [
    { key: 'hero', enabled: true },
    { key: 'about', enabled: true },
    { key: 'stories', enabled: true },
    { key: 'ecosystem', enabled: true },
    { key: 'services', enabled: true },
    { key: 'studio', enabled: true },
    { key: 'platform', enabled: true },
    { key: 'creators-partners', enabled: true },
    { key: 'news', enabled: true },
    { key: 'contact', enabled: true },
  ],
  showStats: false,
  stats: [], // Populate only with company-confirmed figures
  visionMarkers: [
    { value: 'Originals', label: 'Our first slate is in development' },
    { value: 'Studio', label: 'Creative technology for brands' },
    { value: 'Platform', label: 'Welele — stories beyond the screen' },
    { value: 'Creators', label: 'A growing creator network' },
  ],

  // Legacy watch CTA (retained for backwards compatibility)
  watchCtaLabel: 'WATCH NOW',
  watchCtaUrl: '#stories',

  // Platform — outbound links only. NO runtime integration with the Welele App.
  platformUrl: process.env.NEXT_PUBLIC_WELELE_PLATFORM_URL || 'https://welele.app',
  platformAppStoreUrl: null,
  platformGooglePlayUrl: null,
  platformStatus: 'COMING_SOON',

  // Studio
  studioHeading: 'Creative technology for modern media.',
  studioDescription:
    "We combine human creative direction with emerging technology to create campaigns, content and experiences built for today's audiences.",
  studioFeaturedServiceSlugs: ['ai-creative-studio', 'ai-advertising', 'brand-content'],

  // Social — left empty until the company's official handles are confirmed
  social: {
    instagram: null,
    facebook: null,
    youtube: null,
    tiktok: null,
    linkedin: null,
    x: null,
  },

  // Contact
  contactEmail: 'hello@welelemedia.co.za',
  contactPhone: null,
  address: 'Johannesburg, South Africa',
  enquiryInfo:
    'Tell us about your story, brand or partnership idea. We read every message and reply as quickly as we can.',
  footerText: 'Stories. Culture. Africa. Global impact.',
};

// ------------------------------------------------------------------------------
// STORIES — Upcoming slate (all titles are in development)
// ------------------------------------------------------------------------------
export const defaultStories: Story[] = [
  {
    id: 'story-1',
    title: 'The Amber Heir',
    slug: 'the-amber-heir',
    category: 'African Original',
    tagline: 'A royal dynasty threatened by succession and corporate greed.',
    synopsis: 'When a powerful mining dynasty matriarch dies under mysterious circumstances, her three estranged children return to Johannesburg to claim their inheritance, only to unleash long-buried secrets, corporate espionage, and ancestral reckonings.',
    description: `Set against the gleaming high-rises and gold-reef heritage of Johannesburg, "The Amber Heir" is a planned eight-part prestige drama exploring power, kinship, and the moral compromises of wealth in modern Africa.\n\nFrom lavish boardroom maneuvers to clandestine rural negotiations, the series follows Nomsa Amber, the eldest daughter determined to reshape the family enterprise into a green energy powerhouse, while battling her siblings and an international takeover cartel.`,
    episodeCount: 8,
    ageRating: '16+',
    heroImage: '/images/hero-bg.png',
    posterImage: null,
    trailerUrl: null,
    watchUrl: null,
    featured: true,
    publicationStatus: 'PUBLISHED',
    productionStatus: 'IN_DEVELOPMENT',
    displayOrder: 1,
    creators: [
      { id: 'creator-1', name: 'Zanele Khumalo', role: 'Showrunner & Director', slug: 'zanele-khumalo' },
      { id: 'creator-2', name: 'Kofi Mensah', role: 'Lead Screenwriter', slug: 'kofi-mensah' },
    ],
  },
  {
    id: 'story-2',
    title: 'Jozi Shadows',
    slug: 'jozi-shadows',
    category: 'Crime & Drama',
    tagline: 'In the City of Gold, the line between justice and survival is blurred.',
    synopsis: 'An undercover detective navigates the underworld of Braamfontein and Hillbrow to dismantle an elite syndicate trafficking ancient African artifacts.',
    description: `A gritty, neon-lit neo-noir thriller tracing detective Mpho Baloyi as he infiltrates a high-stakes antiquities ring operating between Johannesburg and Antwerp.\n\nWith pulsating urban cinematography and authentic street-level narrative, Jozi Shadows is designed to capture the kinetic pulse, resilience, and underground economy of Africa's economic capital.`,
    episodeCount: 6,
    ageRating: '18+',
    heroImage: '/images/hero-bg.png',
    posterImage: null,
    trailerUrl: null,
    watchUrl: null,
    featured: true,
    publicationStatus: 'PUBLISHED',
    productionStatus: 'IN_DEVELOPMENT',
    displayOrder: 2,
    creators: [
      { id: 'creator-4', name: 'Tunde Adebayo', role: 'Director', slug: 'tunde-adebayo' },
    ],
  },
  {
    id: 'story-3',
    title: 'Kilimani Nights',
    slug: 'kilimani-nights',
    category: 'Romance & Drama',
    tagline: 'Ambition, love, and modern society in vibrant Nairobi.',
    synopsis: 'Four young women navigating tech startups, high-fashion ateliers, and unexpected love affairs across Nairobi’s trendiest neighborhood.',
    description: `A stylish, contemporary dramatic series exploring modern womanhood, digital entrepreneurship, and romance in East Africa's bustling creative capital.\n\nWith sharp wit, sumptuous aesthetics, and an Afrobeats-driven soundtrack, Kilimani Nights is conceived as a celebration of urban African ambition.`,
    episodeCount: 10,
    ageRating: '16+',
    heroImage: '/images/hero-bg.png',
    posterImage: null,
    trailerUrl: null,
    watchUrl: null,
    featured: true,
    publicationStatus: 'PUBLISHED',
    productionStatus: 'IN_DEVELOPMENT',
    displayOrder: 3,
    creators: [
      { id: 'creator-3', name: 'Amina Mwangi', role: 'Creator & Director', slug: 'amina-mwangi' },
    ],
  },
  {
    id: 'story-4',
    title: 'New Horizons',
    slug: 'new-horizons',
    category: 'Documentary',
    tagline: 'The visionaries shaping Africa’s renewable future.',
    synopsis: 'A planned four-part cinematic documentary following African scientists, conservationists, and indigenous communities pioneering ecological breakthroughs.',
    description: `From the vast solar arrays of Morocco to community mangrove restorations along the Swahili coast, "New Horizons" sets out to capture breathtaking landscapes and intimate human stories of innovation, resilience, and ecological leadership across the continent.`,
    episodeCount: 4,
    ageRating: '13+',
    heroImage: '/images/hero-bg.png',
    posterImage: null,
    trailerUrl: null,
    watchUrl: null,
    featured: true,
    publicationStatus: 'PUBLISHED',
    productionStatus: 'IN_DEVELOPMENT',
    displayOrder: 4,
    creators: [
      { id: 'creator-1', name: 'Zanele Khumalo', role: 'Executive Producer', slug: 'zanele-khumalo' },
      { id: 'creator-3', name: 'Amina Mwangi', role: 'Director of Photography', slug: 'amina-mwangi' },
    ],
  },
];

// ------------------------------------------------------------------------------
// CREATORS — Concept / Demonstration Slate Profiles
// NOTE: These records are concept/demo slate profiles demonstrating creative roles
// attached to our in-development titles. They are explicitly marked as concept profiles
// until formal company-confirmed representations are signed and published via the CMS.
// ------------------------------------------------------------------------------
const emptySocials = {
  websiteUrl: null,
  twitter: null,
  instagram: null,
  linkedin: null,
  facebook: null,
  youtube: null,
  tiktok: null,
};

export const defaultCreators: Creator[] = [
  {
    id: 'creator-1',
    name: 'Zanele Khumalo',
    slug: 'zanele-khumalo',
    role: 'Showrunner & Film Director',
    creatorType: 'DIRECTOR',
    bio: 'South African director and showrunner drawn to intimate, character-driven drama. Leading development on The Amber Heir and executive producing the New Horizons documentary series for Welele Media.',
    portraitImage: null,
    location: 'Johannesburg',
    country: 'South Africa',
    projects: [],
    representation: null,
    contactEmail: null,
    ...emptySocials,
    featured: true,
    displayOrder: 1,
    stories: ['The Amber Heir', 'New Horizons'],
    isConceptProfile: true,
  },
  {
    id: 'creator-2',
    name: 'Kofi Mensah',
    slug: 'kofi-mensah',
    role: 'Screenwriter & Narrative Designer',
    creatorType: 'WRITER',
    bio: 'Ghanaian screenwriter and playwright with a love for layered geopolitical thrillers and dialogue-driven drama. Lead writer on The Amber Heir.',
    portraitImage: null,
    location: 'Accra',
    country: 'Ghana',
    projects: [],
    representation: null,
    contactEmail: null,
    ...emptySocials,
    featured: true,
    displayOrder: 2,
    stories: ['The Amber Heir'],
    isConceptProfile: true,
  },
  {
    id: 'creator-3',
    name: 'Amina Mwangi',
    slug: 'amina-mwangi',
    role: 'Cinematographer & Director',
    creatorType: 'FILMMAKER',
    bio: 'Nairobi-based visual artist and cinematographer known for warm palettes and dynamic framing. Creating Kilimani Nights and shooting New Horizons.',
    portraitImage: null,
    location: 'Nairobi',
    country: 'Kenya',
    projects: [],
    representation: null,
    contactEmail: null,
    ...emptySocials,
    featured: true,
    displayOrder: 3,
    stories: ['Kilimani Nights', 'New Horizons'],
    isConceptProfile: true,
  },
  {
    id: 'creator-4',
    name: 'Tunde Adebayo',
    slug: 'tunde-adebayo',
    role: 'Director & Producer',
    creatorType: 'PRODUCER',
    bio: 'Lagos-based director and producer passionate about cross-border collaboration and indigenous stories with global appeal. Directing Jozi Shadows.',
    portraitImage: null,
    location: 'Lagos',
    country: 'Nigeria',
    projects: [],
    representation: null,
    contactEmail: null,
    ...emptySocials,
    featured: true,
    displayOrder: 4,
    stories: ['Jozi Shadows'],
    isConceptProfile: true,
  },
];

// ------------------------------------------------------------------------------
// PARTNERS — Intentionally empty.
// Only confirmed, publicly announceable partners should be added (via the CMS).
// ------------------------------------------------------------------------------
export const defaultPartners: Partner[] = [];

/** Partnership categories Welele Media is open to — not claimed partners. */
export const partnershipCategories = [
  {
    key: 'BROADCASTERS',
    icon: '◎',
    title: 'Broadcasters & Streamers',
    description: 'Licensing, co-commissioning and first-look conversations for original African series, film and documentary.',
  },
  {
    key: 'BRANDS',
    icon: '✦',
    title: 'Brands & Agencies',
    description: 'Brand storytelling, campaigns and creator collaborations built with Welele Studio.',
  },
  {
    key: 'STUDIOS',
    icon: '◈',
    title: 'Studios & Production',
    description: 'Co-production, post-production and creative technology partners who share our standards.',
  },
  {
    key: 'INVESTORS',
    icon: '❖',
    title: 'Funds & Investors',
    description: 'Development and production financing for the stories and platforms we are building.',
  },
];

// ------------------------------------------------------------------------------
// NEWS — Company announcements (no fabricated deals or production milestones)
// ------------------------------------------------------------------------------
export const defaultNewsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Introducing Welele Media: We Make Media That Moves',
    slug: 'introducing-welele-media',
    excerpt: 'Welele Media launches as a modern African media company connecting stories, creators, audiences, brands and technology — starting with an original slate in development.',
    body: `JOHANNESBURG — Welele Media is a new African media company built on a simple belief: stories move people, and African stories deserve to move the world.\n\nWelele brings together four connected areas. Stories — original film, series and documentary, starting with a first slate now in development. Studio — creative production for brands, combining human creative direction with emerging technology. Platform — Welele, a new way for audiences to discover stories, entertainment and community. And Creators — the talent at the heart of everything we make.\n\n"We are not pretending to be big yet," said the Welele Media team. "We are building something deliberately — a creative ecosystem where stories, creators, brands and technology strengthen one another."\n\nThe first titles in development include dynastic drama *The Amber Heir*, neo-noir *Jozi Shadows*, Nairobi-set *Kilimani Nights* and the documentary series *New Horizons*.`,
    coverImage: '/images/welele-hero-clean.jpg',
    authorName: 'Welele Media Newsroom',
    category: 'Company News',
    publishedAt: '2026-03-15T09:00:00Z',
    status: 'PUBLISHED',
  },
  {
    id: 'news-2',
    title: 'The Future of African Storytelling: Connecting Heritage with Global Audiences',
    slug: 'the-future-of-african-storytelling',
    excerpt: 'Why creator ownership, high production standards and new technology are reshaping how African stories are made and shared.',
    body: `For decades, stories about Africa were often told through external lenses. Today, a transformation is underway across Johannesburg, Nairobi, Lagos, Accra and beyond.\n\nAfrican creators are increasingly retaining ownership of their intellectual property, designing multi-season episodic narratives, and demanding visual craftsmanship on par with the best international work.\n\nAt Welele Media, we want to be part of that movement — by building a creator network that connects writers, cinematographers, directors and creative technologists with development support and routes to audiences.\n\nTechnology plays a role too. Used well, emerging tools can help small teams work faster, localise stories for more audiences, and test ideas before committing big budgets. Used badly, they flatten culture. Our position is simple: technology amplifies creativity — it doesn't replace it.`,
    coverImage: '/images/stage-c/eco-create.jpg',
    authorName: 'Editorial Desk',
    category: 'Perspective',
    publishedAt: '2026-02-28T14:30:00Z',
    status: 'PUBLISHED',
  },
  {
    id: 'news-3',
    title: 'Introducing Welele Studio: Human Creativity, Emerging Technology',
    slug: 'introducing-welele-studio',
    excerpt: 'Welele Studio is our creative production arm for brands — brand films, campaigns and AI-assisted production, always human-directed.',
    body: `Welele Studio is the creative engine of Welele Media. It exists to help brands tell stories that feel culturally real and look world-class.\n\nThe Studio brings together brand content, campaign development, creator campaigns and AI-assisted production. Some capabilities are available today; others — such as content localisation, creative automation and virtual production — are being developed and are marked as coming soon.\n\n"AI is a tool in our kit, not the point," the team explains. "Every project starts with a human idea and a human creative director. Technology helps us explore more options, move faster and adapt work for more audiences."\n\nWe will share real work here as it is completed. Until then, any visuals labelled as concepts are exactly that — demonstrations of the approach, not client work.`,
    coverImage: '/images/stage-c/studio-concept-world.jpg',
    authorName: 'Welele Media Newsroom',
    category: 'Studio',
    publishedAt: '2026-01-20T11:15:00Z',
    status: 'PUBLISHED',
  },
];

// ------------------------------------------------------------------------------
// SERVICES (Stage C) — status-driven so the company can grow honestly
// ------------------------------------------------------------------------------
export const defaultServices: Service[] = [
  // --- Stories pillar ---
  {
    id: 'svc-original-productions',
    title: 'Original Productions',
    slug: 'original-productions',
    shortDescription: 'Film, series, documentary and digital entertainment rooted in African life.',
    description: 'We develop and produce original African stories — from prestige drama to documentary and short-form digital entertainment.',
    category: 'STORIES',
    image: null,
    icon: '✦',
    status: 'ACTIVE',
    featured: true,
    displayOrder: 1,
  },
  {
    id: 'svc-story-development',
    title: 'Story Development',
    slug: 'story-development',
    shortDescription: 'Shaping ideas into slates — treatments, pilots, decks and packaging.',
    description: 'We work with writers and directors to shape ideas into fully developed projects ready for financing and production.',
    category: 'STORIES',
    image: null,
    icon: '◈',
    status: 'ACTIVE',
    featured: false,
    displayOrder: 2,
  },
  {
    id: 'svc-distribution',
    title: 'Distribution',
    slug: 'distribution',
    shortDescription: 'Taking African stories to broadcasters, streamers and global audiences.',
    description: 'We are building distribution relationships to take our stories to audiences across Africa and around the world.',
    category: 'DISTRIBUTION',
    image: null,
    icon: '◎',
    status: 'COMING_SOON',
    featured: false,
    displayOrder: 3,
  },
  // --- Creators pillar ---
  {
    id: 'svc-creator-development',
    title: 'Creator Development',
    slug: 'creator-development',
    shortDescription: 'Discovering, developing and connecting African creative talent.',
    description: 'We discover emerging talent and connect creators with projects, collaborators, brands and development support.',
    category: 'CREATOR',
    image: null,
    icon: '❖',
    status: 'ACTIVE',
    featured: false,
    displayOrder: 4,
  },
  // --- Studio pillar (the 8 Studio services) ---
  {
    id: 'svc-ai-creative-studio',
    title: 'AI Creative Studio',
    slug: 'ai-creative-studio',
    shortDescription: 'AI-assisted campaign development and production, directed by humans.',
    description: 'Human creative directors use generative tools to explore more concepts, build visual worlds and produce campaign assets faster — without losing craft or cultural truth.',
    category: 'STUDIO',
    image: '/images/stage-c/studio-concept-world.jpg',
    icon: '✦',
    status: 'ACTIVE',
    featured: true,
    displayOrder: 10,
  },
  {
    id: 'svc-ai-advertising',
    title: 'AI Advertising',
    slug: 'ai-advertising',
    shortDescription: 'AI-assisted commercials, product campaigns, social ads and variations.',
    description: 'From concept development to product campaigns and social advertising, we use technology-enabled production to create more variations, test faster and stay on brand.',
    category: 'ADVERTISING',
    image: '/images/stage-c/studio-concept-campaign.jpg',
    icon: '◈',
    status: 'ACTIVE',
    featured: true,
    displayOrder: 11,
  },
  {
    id: 'svc-brand-content',
    title: 'Brand Content',
    slug: 'brand-content',
    shortDescription: 'Brand films, branded documentaries, launches and product storytelling.',
    description: 'Stories that happen to be made for brands — brand films, branded documentaries, social campaigns, product storytelling and launch campaigns.',
    category: 'BRAND',
    image: '/images/stage-c/eco-create.jpg',
    icon: '◎',
    status: 'ACTIVE',
    featured: true,
    displayOrder: 12,
  },
  {
    id: 'svc-campaign-development',
    title: 'Campaign Development',
    slug: 'campaign-development',
    shortDescription: 'Strategy, creative concepts and scripts built around culture.',
    description: 'We turn a brief into a campaign idea — insight, concept, script and rollout — grounded in culture and built for modern audiences.',
    category: 'ADVERTISING',
    image: '/images/stage-c/eco-grow.jpg',
    icon: '❖',
    status: 'ACTIVE',
    featured: false,
    displayOrder: 13,
  },
  {
    id: 'svc-creator-campaigns',
    title: 'Creator Campaigns',
    slug: 'creator-campaigns',
    shortDescription: 'Pairing brands with African creators for authentic content.',
    description: 'We connect brands with the right creators and produce content that feels native to the people watching it.',
    category: 'BRAND',
    image: null,
    icon: '◇',
    status: 'ACTIVE',
    featured: false,
    displayOrder: 14,
  },
  {
    id: 'svc-content-localization',
    title: 'Content Localization',
    slug: 'content-localization',
    shortDescription: 'Multilingual versions and cultural adaptation across markets.',
    description: 'AI-assisted subtitling, dubbing and cultural adaptation so one story can travel across languages and markets — reviewed by native speakers.',
    category: 'TECHNOLOGY',
    image: null,
    icon: '◐',
    status: 'COMING_SOON',
    featured: false,
    displayOrder: 15,
  },
  {
    id: 'svc-creative-automation',
    title: 'Creative Automation',
    slug: 'creative-automation',
    shortDescription: 'Content variations, formats and rapid creative experimentation.',
    description: 'Workflows that generate on-brand format and message variations at scale, so teams can experiment quickly and learn what resonates.',
    category: 'TECHNOLOGY',
    image: null,
    icon: '◑',
    status: 'COMING_SOON',
    featured: false,
    displayOrder: 16,
  },
  {
    id: 'svc-virtual-production',
    title: 'Virtual Production',
    slug: 'virtual-production',
    shortDescription: 'Synthetic environments and emerging production techniques.',
    description: 'Exploring virtual sets and synthetic environments to bring ambitious worlds to screen at a fraction of traditional cost.',
    category: 'STUDIO',
    image: null,
    icon: '◒',
    status: 'COMING_SOON',
    featured: false,
    displayOrder: 17,
  },
];

// ------------------------------------------------------------------------------
// PLATFORMS (Stage C)
// Editorial representation of the Welele App. NOT an integration.
// No API, database, auth, storage or env coupling — outbound URLs only.
// ------------------------------------------------------------------------------
export const defaultPlatforms: Platform[] = [
  {
    id: 'platform-welele',
    name: 'Welele',
    slug: 'welele',
    tagline: 'A new way to discover stories, entertainment and community.',
    description:
      'Welele is the audience platform in the Welele ecosystem — a place to discover African stories, follow creators and connect with the culture around them.',
    longDescription:
      'Stories shouldn’t end when the credits roll. Welele is being built as a home for audiences — to discover new African entertainment, follow the creators behind it, and be part of the conversation. Welele Media tells stories; Welele is where audiences can keep living them.',
    logo: '/images/welele-media-icon.png',
    heroImage: '/images/stage-c/platform-hero.jpg',
    screenshots: ['/images/stage-c/welele-app-preview.png'],
    features: [
      { title: 'Discover', description: 'Find African stories, series and short-form entertainment curated for you.', icon: '◎' },
      { title: 'Watch', description: 'Enjoy original and partner entertainment wherever you are.', icon: '▶' },
      { title: 'Follow Creators', description: 'Keep up with the directors, writers and talent behind the stories.', icon: '✦' },
      { title: 'Community', description: 'Join the conversation with people who love the same stories.', icon: '❖' },
    ],
    benefits: [
      { title: 'Made for African audiences', description: 'Built around the stories, languages and culture of the continent and its diaspora.' },
      { title: 'Creator-first', description: 'A direct line between audiences and the people who make the work.' },
      { title: 'Beyond the screen', description: 'Stories that continue through community, conversation and culture.' },
    ],
    ctaLabel: 'Discover Welele',
    externalUrl: process.env.NEXT_PUBLIC_WELELE_PLATFORM_URL || 'https://welele.app',
    appStoreUrl: null,
    googlePlayUrl: null,
    status: 'COMING_SOON',
    featured: true,
    displayOrder: 1,
  },
];

// ------------------------------------------------------------------------------
// CASE STUDIES (Stage C) — intentionally empty.
// Add only genuine work. Speculative/demo work must set isConceptual: true.
// ------------------------------------------------------------------------------
export const defaultCaseStudies: CaseStudy[] = [];

// ------------------------------------------------------------------------------
// PILLARS & ECOSYSTEM (Stage C)
// ------------------------------------------------------------------------------
export const defaultPillars: Pillar[] = [
  {
    key: 'stories',
    label: 'Stories',
    headline: 'Original African stories.',
    description: 'Film, television, documentary and digital entertainment — the emotional heart of Welele Media.',
    ctaLabel: 'Explore Our Stories',
    href: '/our-stories',
    image: '/images/stage-c/eco-watch.jpg',
    capabilityCategories: ['STORIES', 'DISTRIBUTION'],
  },
  {
    key: 'studio',
    label: 'Studio',
    headline: 'Creative solutions for brands.',
    description: 'Brand storytelling, advertising and emerging AI-powered production — human creativity, amplified by technology.',
    ctaLabel: 'Explore Welele Studio',
    href: '/studio',
    image: '/images/stage-c/studio-concept-world.jpg',
    capabilityCategories: ['STUDIO', 'ADVERTISING', 'BRAND', 'TECHNOLOGY'],
  },
  {
    key: 'platform',
    label: 'Platform',
    headline: 'Stories beyond the screen.',
    description: 'The Welele platform connects audiences with entertainment, culture and community.',
    ctaLabel: 'Explore Welele',
    href: '/platform',
    image: '/images/stage-c/eco-connect.jpg',
    capabilityCategories: [],
  },
  {
    key: 'creators',
    label: 'Creators',
    headline: 'Talent is the engine.',
    description: 'We discover, develop and connect African creative talent with opportunities.',
    ctaLabel: 'Meet Our Creators',
    href: '/creators',
    image: '/images/stage-c/eco-create.jpg',
    capabilityCategories: ['CREATOR'],
  },
];

export const defaultEcosystem: EcosystemItem[] = [
  {
    key: 'watch',
    label: 'Watch',
    description: 'Original stories & entertainment',
    href: '/our-stories',
    image: '/images/stage-c/eco-watch.jpg',
  },
  {
    key: 'create',
    label: 'Create',
    description: 'Creators, production & technology',
    href: '/creators',
    image: '/images/stage-c/eco-create.jpg',
  },
  {
    key: 'connect',
    label: 'Connect',
    description: 'The Welele platform',
    href: '/platform',
    image: '/images/stage-c/eco-connect.jpg',
  },
  {
    key: 'grow',
    label: 'Grow',
    description: 'Brand partnerships & advertising',
    href: '/studio',
    image: '/images/stage-c/eco-grow.jpg',
  },
];
