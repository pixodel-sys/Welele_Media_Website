// ==============================================================================
// WELELE MEDIA — DATABASE SEED SCRIPT (Stage C)
// ==============================================================================
// Populates the standalone PostgreSQL database with default corporate content.
// Safe & idempotent: updates or creates records without duplicates.
// Does NOT seed fake case studies or fabricated partners.
// ==============================================================================

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Welele Media database seed (Stage C)...');

  // 1. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      companyName: 'Welele Media',
      tagline: 'Stories That Move You',
      brandLine: 'We make media that moves.',
      siteDescription:
        'Welele Media connects stories, creators, audiences, brands and technology to build the next generation of African media.',
      metaDescription:
        'Welele Media — a modern African media company connecting stories, creators, audiences, brands and technology.',
      heroEyebrow: 'Welele Media™',
      heroHeadline: 'Stories that move you.',
      heroDescription:
        'Welele Media is a Pan-African media company creating, curating and distributing powerful stories that connect people, culture and global audiences.',
      heroArtworkUrl: '/images/welele-hero-clean.jpg',
      featuredStorySlugs: ['the-amber-heir', 'jozi-shadows', 'kilimani-nights', 'new-horizons'],
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
      stats: [],
      watchCtaLabel: 'WATCH NOW',
      watchCtaUrl: '#stories',
      platformUrl: process.env.NEXT_PUBLIC_WELELE_PLATFORM_URL || 'https://welele.app',
      platformStatus: 'COMING_SOON',
      studioHeading: 'Creative technology for modern media.',
      studioDescription:
        'We combine human creative direction with emerging technology to create campaigns, content and experiences built for today’s audiences.',
      studioFeaturedServiceSlugs: ['ai-creative-studio', 'ai-advertising', 'brand-content'],
      contactEmail: 'hello@welelemedia.co.za',
      contactPhone: '+27 (0) 11 000 0000',
      address: 'Design District, Rosebank, Johannesburg, 2196, South Africa',
      footerText: 'Stories. Culture. Africa. Global impact.',
    },
  });
  console.log('✓ Seeded Site Settings');

  // 2. Platform (Welele App editorial representation — isolated)
  await prisma.platform.upsert({
    where: { slug: 'welele' },
    update: {},
    create: {
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
      status: 'COMING_SOON',
      featured: true,
      displayOrder: 1,
    },
  });
  console.log('✓ Seeded Platform record');

  // 3. Services (What We Do & Studio)
  const services = [
    {
      id: 'svc-original-entertainment',
      title: 'Original Entertainment',
      slug: 'original-entertainment',
      shortDescription: 'Films, series, documentaries and digital entertainment rooted in African culture.',
      description: 'We develop and produce original entertainment that puts African narratives at the center of the global cultural conversation.',
      category: 'STORIES',
      image: '/images/stage-c/eco-watch.jpg',
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

  for (const svc of services) {
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: {},
      create: svc,
    });
  }
  console.log(`✓ Seeded ${services.length} Services`);

  // 4. Creators
  const creators = [
    {
      id: 'creator-1',
      name: 'Thabo Mokoena',
      slug: 'thabo-mokoena',
      role: 'Director & Showrunner',
      creatorType: 'DIRECTOR',
      bio: 'Johannesburg-based filmmaker exploring contemporary urban realities and crime noir through an uncompromising visual lens. Directing The Amber Heir.',
      location: 'Johannesburg',
      country: 'South Africa',
      featured: true,
      displayOrder: 1,
    },
    {
      id: 'creator-2',
      name: 'Kofi Mensah',
      slug: 'kofi-mensah',
      role: 'Screenwriter & Showrunner',
      creatorType: 'WRITER',
      bio: 'Ghanaian screenwriter and playwright with a love for layered geopolitical thrillers and dialogue-driven drama. Lead writer on The Amber Heir.',
      location: 'Accra',
      country: 'Ghana',
      featured: true,
      displayOrder: 2,
    },
    {
      id: 'creator-3',
      name: 'Amina Mwangi',
      slug: 'amina-mwangi',
      role: 'Cinematographer & Director',
      creatorType: 'FILMMAKER',
      bio: 'Nairobi-based visual artist and cinematographer known for warm palettes and dynamic framing. Creating Kilimani Nights and shooting New Horizons.',
      location: 'Nairobi',
      country: 'Kenya',
      featured: true,
      displayOrder: 3,
    },
    {
      id: 'creator-4',
      name: 'Tunde Adebayo',
      slug: 'tunde-adebayo',
      role: 'Director & Producer',
      creatorType: 'PRODUCER',
      bio: 'Lagos-based director and producer passionate about cross-border collaboration and indigenous stories with global appeal. Directing Jozi Shadows.',
      location: 'Lagos',
      country: 'Nigeria',
      featured: true,
      displayOrder: 4,
    },
  ];

  for (const c of creators) {
    await prisma.creator.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }
  console.log(`✓ Seeded ${creators.length} Creators`);

  // 5. Stories
  const stories = [
    {
      id: 'story-1',
      title: 'The Amber Heir',
      slug: 'the-amber-heir',
      category: 'African Original',
      tagline: 'Bloodlines dictate wealth. Secrets dictate survival.',
      synopsis: 'A gripping dynastic drama following an ambitious family fighting for control over Southern Africa’s premier luxury amber mining empire.',
      description: 'When the patriarch of the van der Merwe-Khumalo amber dynasty mysteriously disappears, an intense succession war erupts among three estranged siblings.\n\nSet between the gleaming glass towers of Sandton and the rugged mining landscapes of the Northern Cape, The Amber Heir weaves high-stakes financial intrigue with intimate family drama.',
      episodeCount: 8,
      ageRating: '16+',
      heroImage: '/images/hero-bg.png',
      featured: true,
      publicationStatus: 'PUBLISHED',
      productionStatus: 'IN_DEVELOPMENT',
      displayOrder: 1,
    },
    {
      id: 'story-2',
      title: 'Jozi Shadows',
      slug: 'jozi-shadows',
      category: 'Crime & Drama',
      tagline: 'In the city of gold, light only reveals what is broken.',
      synopsis: 'A relentless detective navigates Johannesburg’s underworld after an international cyber fraud syndicate infiltrates the national gold reserve exchange.',
      description: 'Captain Vusi Sithole thought he had seen every shade of crime in downtown Johannesburg. But when billions vanish from the computerized bullion vault, he is drawn into a covert war between international hackers, corrupt mining barons, and deep-cover law enforcement.',
      episodeCount: 6,
      ageRating: '18+',
      heroImage: '/images/welele-media-hero-raw.png',
      featured: true,
      publicationStatus: 'PUBLISHED',
      productionStatus: 'IN_DEVELOPMENT',
      displayOrder: 2,
    },
    {
      id: 'story-3',
      title: 'Kilimani Nights',
      slug: 'kilimani-nights',
      category: 'Romance & Drama',
      tagline: 'Lust, ambition, and loyalty under the Nairobi skyline.',
      synopsis: 'An intimate, high-fashion romance tracing three upwardly mobile tech entrepreneurs in Nairobi whose business ambition collides with illicit desire.',
      description: 'Nairobi is the Silicon Savannah — electric, competitive, and glamorous. When Maya, an ambitious fintech founder, falls for her investor’s charismatic rival, the fallout threatens to burn down the most anticipated IPO on the continent.',
      episodeCount: 10,
      ageRating: '16+',
      heroImage: '/images/hero-bg.png',
      featured: true,
      publicationStatus: 'PUBLISHED',
      productionStatus: 'IN_DEVELOPMENT',
      displayOrder: 3,
    },
    {
      id: 'story-4',
      title: 'New Horizons',
      slug: 'new-horizons',
      category: 'Documentary',
      tagline: 'The continent rewiring the modern world.',
      synopsis: 'A visually breathtaking 4K docuseries spotlighting African innovators, green energy architects, and cultural pioneers redefining our collective future.',
      description: 'From geothermal engineers in the Great Rift Valley to solar micro-grid innovators in the Sahel and biotech pioneers in Cape Town, New Horizons captures the unstoppable wave of indigenous innovation transforming Africa from consumer to global pioneer.',
      episodeCount: 5,
      ageRating: 'PG-13',
      heroImage: '/images/welele-hero-clean.jpg',
      featured: true,
      publicationStatus: 'PUBLISHED',
      productionStatus: 'IN_DEVELOPMENT',
      displayOrder: 4,
    },
  ];

  for (const s of stories) {
    await prisma.story.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
  }
  console.log(`✓ Seeded ${stories.length} Stories`);

  // 6. News Articles
  const articles = [
    {
      id: 'news-1',
      title: 'Introducing Welele Media: We Make Media That Moves',
      slug: 'introducing-welele-media',
      excerpt: 'Welele Media launches as a modern African media company connecting stories, creators, audiences, brands and technology — starting with an original slate in development.',
      body: `JOHANNESBURG — Welele Media is a new African media company built on a simple belief: stories move people, and African stories deserve to move the world.\n\nWelele brings together four connected areas. Stories — original film, series and documentary, starting with a first slate now in development. Studio — creative production for brands, combining human creative direction with emerging technology. Platform — Welele, a new way for audiences to discover stories, entertainment and community. And Creators — the talent at the heart of everything we make.\n\n"We are not pretending to be big yet," said the Welele Media team. "We are building something deliberately — a creative ecosystem where stories, creators, brands and technology strengthen one another."\n\nThe first titles in development include dynastic drama *The Amber Heir*, neo-noir *Jozi Shadows*, Nairobi-set *Kilimani Nights* and the documentary series *New Horizons*.`,
      coverImage: '/images/welele-hero-clean.jpg',
      authorName: 'Welele Media Newsroom',
      category: 'Company News',
      publishedAt: new Date('2026-03-15T09:00:00Z'),
      status: 'PUBLISHED',
      displayOrder: 1,
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
      publishedAt: new Date('2026-02-28T14:30:00Z'),
      status: 'PUBLISHED',
      displayOrder: 2,
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
      publishedAt: new Date('2026-01-20T11:15:00Z'),
      status: 'PUBLISHED',
      displayOrder: 3,
    },
  ];

  for (const a of articles) {
    await prisma.newsArticle.upsert({
      where: { slug: a.slug },
      update: {},
      create: a,
    });
  }
  console.log(`✓ Seeded ${articles.length} News Articles`);

  console.log('✅ Seed completed successfully. Note: CaseStudies and Partners remain unseeded per Stage C credibility rules.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
