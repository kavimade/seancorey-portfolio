/**
 * One-time migration: imports all projects from lib/projects.ts into Sanity.
 * Run with: node scripts/migrate-to-sanity.mjs
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 */

import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token:     process.env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
});

const projects = [
  {
    id: "moka-origins",
    title: "Moka Origins",
    category: "Brand Identity",
    description: "A full ecommerce overhaul for a specialty coffee and chocolate brand making a difference. Built for speed, clarity, and a team that can own it.",
    gradient: "linear-gradient(135deg, #48949e 0%, #2a5a62 100%)",
    images: ["/sean-corey-design-moka-1.webp","/sean-corey-design-moka-2.webp","/sean-corey-design-moka-3.webp","/sean-corey-design-moka-4.webp"],
    url: "https://mokaorigins.com",
    services: ["Ecommerce", "UI Design", "Web Development", "Consulting", "Infrastructure"],
    caseStudy: [
      { heading: "The Challenge", text: "Moka Origins had outgrown their existing Shopify infrastructure. A code-heavy setup was limiting the team's ability to make updates independently and keeping the site from performing at the level the brand deserved." },
      { heading: "The Approach", text: "I planned and designed the full site architecture, migrating to a modern theme with fast load times, an AJAX cart, and robust search. The bigger shift was moving from a code-based build to a visual page builder... giving their team real ownership over the site without needing a developer for every change." },
      { heading: "Ongoing Support", text: "Eight-plus years in, the relationship continues. Campaign launches, page builds, and strategic technology consulting as the business evolves." },
    ],
    order: 1,
  },
  {
    id: "himalayan-institute",
    title: "Himalayan Institute",
    category: "Web Design",
    description: "Nine years of embedded partnership with one of North America's most respected yoga and wellness institutions. Strategy, design, and infrastructure at scale.",
    gradient: "linear-gradient(135deg, #3a3a3a 0%, #181818 100%)",
    images: ["/sean-corey-design-himalayan-1.webp","/sean-corey-design-himalayan-2.webp","/sean-corey-design-himalayan-3.webp","/sean-corey-design-himalayan-4.webp"],
    url: "https://himalayaninstitute.org",
    services: ["Web Design", "UX Strategy", "Platform Development", "Email Marketing", "Analytics", "Infrastructure", "Documentation"],
    caseStudy: [
      { heading: "The Challenge", text: "The Himalayan Institute operates multiple web properties supporting each arm of their non-profit organization... a main website, online shop, humanitarian site, and internal tools. When the pandemic hit in 2020, they needed a way to carry their teachings online. HI Online was born. Across all of it, they needed design consistency and someone who could think and operate at a systems level." },
      { heading: "The Approach", text: "Over five years of full-time embedded work, I led web design strategy across all of their digital properties. That included a full redesign of their main website, humanitarian site, online shop, and HI Online. Beyond the platform work, the scope included email marketing templates, analytics configuration, conversion tracking, and a full restructure of site navigation across properties." },
      { heading: undefined, text: "On the infrastructure side, I helped plan and execute a migration of 1,000+ posts and active user and membership accounts between systems, ensuring a smooth transition with no downtime. I also led the move of all properties to a new web server and wrote internal documentation to standardize design and development workflows across the organization." },
      { heading: "Ongoing", text: "Nine years in, the relationship continues. The work has evolved from full-time embedded leadership to focused strategic support as their organization evolves." },
    ],
    order: 2,
  },
  {
    id: "hi-online",
    title: "HI Online",
    category: "Platform Design",
    description: "From a simple blog to a full-scale online learning platform. HI Online brought the Himalayan Institute's teachings to a global audience when the world needed it most.",
    gradient: "linear-gradient(135deg, #4a6a8a 0%, #2a3a5a 100%)",
    images: ["/sean-corey-design-hi-online-1.webp","/sean-corey-design-hi-online-2.webp","/sean-corey-design-hi-online-3.webp","/sean-corey-design-hi-online-4.webp"],
    url: "https://himalayaninstitute.org/online",
    services: ["UX Strategy", "Architecture", "Web Design", "Development", "Email Marketing", "Migration", "Infrastructure"],
    caseStudy: [
      { heading: "The Challenge", text: "What began as the Wisdom Library, a foundational blog for the Himalayan Institute, needed to evolve into something much larger. When COVID-19 hit, the organization needed a way to carry their teachings online at scale. The answer was HI Online... courses, memberships, and community. It was a big lift that touched every part of the organization." },
      { heading: "The Approach", text: "My role spanned the full project lifecycle. Wireframing, architecture, planning, web design, and development. On the marketing side I contributed to strategy, email templates, and user flows, so the experience felt consistent from first visit through active membership." },
      { heading: undefined, text: "The infrastructure work was significant. The team migrated 1,000+ pieces of content and active membership accounts, updated the entire site architecture, and moved everything to a new server before launch. No downtime. No disruption to existing members." },
      { heading: "Ongoing", text: "HI Online continues to grow as a core part of the Himalayan Institute's digital presence. What launched out of necessity has become a solid, lasting foundation for their mission." },
    ],
    order: 3,
  },
  {
    id: "vishoka-meditation",
    title: "Vishoka Meditation",
    category: "Brand Identity",
    description: "A website for a complete system of meditation rooted in ancient practice. Clean, minimal, and built to reach people searching for something real.",
    gradient: "linear-gradient(135deg, #c4864a 0%, #7a4c22 100%)",
    images: ["/sean-corey-design-vishoka-1.webp","/sean-corey-design-vishoka-2.webp","/sean-corey-design-vishoka-3.webp","/sean-corey-design-vishoka-4.webp"],
    url: "https://vishokameditation.org/",
    services: ["Branding", "Web Design", "UX Strategy", "WordPress Development"],
    caseStudy: [
      { heading: "The Challenge", text: "Vishoka Meditation is a distinct brand and teaching lineage, separate from the Himalayan Institute but rooted in the same tradition. They needed a new site built from scratch... one that could clearly communicate the practice, capture organic traffic, and stand on its own." },
      { heading: "The Approach", text: "I handled the website design, development, and strategy. The design direction was intentionally clean and minimal, letting the teaching speak without distraction. Clear and focused... a reflection of the practice itself." },
      { heading: undefined, text: "As the teaching grew, the site grew with it. A searchable Teacher Directory and online course listing were added over time, expanding what the site could do without changing what it felt like." },
    ],
    order: 4,
  },
  {
    id: "sage-wisdom-wellness",
    title: "Sage Wisdom & Wellness",
    category: "Web Design",
    description: "A clean, professional website for a yoga therapy practice serving women who spend their lives caring for others.",
    gradient: "linear-gradient(135deg, #7a9a8a 0%, #3a5a4a 100%)",
    images: ["/sean-corey-design-sage-wisdom-1.webp","/sean-corey-design-sage-wisdom-2.webp","/sean-corey-design-sage-wisdom-3.webp"],
    services: ["Web Design", "Squarespace", "Booking Integration", "Email Marketing"],
    caseStudy: [
      { heading: "The Challenge", text: "Sage Wisdom & Wellness needed a site that felt warm and trustworthy to their core audience... women over 50 in the caregiving field. The design needed to speak to that audience without feeling clinical or corporate. And the tech needed to stay simple enough for Jeannine to manage on her own." },
      { heading: "The Approach", text: "Built on Squarespace, with low overhead and a straightforward editing experience. The design prioritized warmth and clarity. Beyond the site, I connected an online booking calendar to simplify signups, and set up email marketing with a branded template to match." },
    ],
    order: 5,
  },
  {
    id: "vadavas-by-lex",
    title: "Vadavas by Lex",
    category: "Ecommerce",
    description: "A modern ecommerce store for a handmade jewelry brand, built to sell seamlessly across web, Instagram, and TikTok.",
    gradient: "linear-gradient(135deg, #8b7355 0%, #4a3920 100%)",
    images: ["/sean-corey-design-vadavas-1.webp","/sean-corey-design-vadavas-2.webp","/sean-corey-design-vadavas-3.webp"],
    url: "https://vadavasbylex.com",
    services: ["Ecommerce", "Website Design", "Systems Consulting", "AI Photography"],
    caseStudy: [
      { heading: "The Challenge", text: "Vadavas By Lex was running on an outdated POS system with no clean path to selling across social channels. They needed a modern store that could connect to Instagram and TikTok automatically, present their jewelry well, and cost a lot less to run." },
      { heading: "The Approach", text: "I rebuilt their ecommerce foundation on a modern platform, connecting the store directly to their social channels so inventory and listings stay in sync. The move saved them thousands of dollars per year compared to their old setup." },
      { heading: undefined, text: "Product photography needed a refresh but a full shoot wasn't in the budget. I used AI image tools to clean up and refine the existing photos... a polished result at a fraction of the cost." },
      { heading: "The Outcome", text: "A cleaner store. Lower overhead. Product photos that convert. And a sales setup that grows with them." },
    ],
    order: 6,
  },
  {
    id: "yoga-hive",
    title: "Yoga Hive",
    category: "Web Design",
    description: "A brand identity and website for a yoga studio and wellness community in New Jersey. Built to last and handed off to an owner who actually uses it.",
    gradient: "linear-gradient(135deg, #5a7a7e 0%, #2d4a50 100%)",
    images: ["/sean-corey-design-yoga-hive-1.webp","/sean-corey-design-yoga-hive-2.webp","/sean-corey-design-yoga-hive-3.webp"],
    url: "https://theyogahivenj.com/",
    services: ["Branding", "Web Design", "WordPress Development", "MindBody Integration"],
    caseStudy: [
      { heading: "The Challenge", text: "Yoga Hive needed more than a website. They needed a brand identity that could carry across their site, merchandise, and all marketing materials. Something memorable, clean, and modern... and a web presence that their owner could maintain without relying on a developer for every small change." },
      { heading: "The Approach", text: "I started with brand identity, creating a visual foundation designed to work across every touchpoint. The website was built on WordPress with that same brand carried through consistently. For booking, I integrated MindBody... keeping the signup process clean and seamless for their community." },
      { heading: undefined, text: "The handoff was a core part of the project. The site was built to empower their owner, Kevin, to take ownership, and he has. Watching him actively update and evolve the site over time is exactly the outcome good design should produce." },
    ],
    order: 7,
  },
  {
    id: "sean-corey-yoga",
    title: "Sean Corey Yoga",
    category: "Brand Identity",
    description: "My own yoga and meditation brand. Built to support online teaching, retreat offerings, and a practice that travels with me.",
    gradient: "linear-gradient(135deg, #7a8a6e 0%, #3a4a2e 100%)",
    images: ["/sean-corey-design-sean-corey-yoga-1.webp","/sean-corey-design-sean-corey-yoga-2.webp","/sean-corey-design-sean-corey-yoga-3.webp","/sean-corey-design-sean-corey-yoga-4.webp"],
    url: "https://seancoreyoga.com",
    services: ["Branding", "Web Design", "WordPress Development", "Retreat Landing Pages", "Social Media Assets"],
    caseStudy: [
      { heading: "The Challenge", text: "Four years ago I left the US with a clear intention... to teach more yoga online and share the practice more widely. I needed a brand and digital presence that could carry that mission. Something grounded and authentic, not salesy or performative." },
      { heading: "The Approach", text: "I built the full brand identity from scratch, carrying it through the website, retreat landing pages, and social media assets. The site needed to work as both a home for my teaching and a functional platform for online offerings and retreats." },
      { heading: undefined, text: "It's the project where both sides of my work come together most directly. The design sensibility, the technical execution, and the practice itself." },
    ],
    order: 8,
  },
  {
    id: "yoga-dorri",
    title: "Yoga Dorri",
    category: "Web Design",
    description: "A full brand and website build for a yoga, coaching, and Reiki practice in South Jersey. Designed to attract, nurture, and convert the right clients automatically.",
    gradient: "linear-gradient(135deg, #a09070 0%, #5a4a30 100%)",
    images: ["/sean-corey-design-yoga-dorri-1.webp","/sean-corey-design-yoga-dorri-2.webp","/sean-corey-design-yoga-dorri-3.webp"],
    url: "https://yogadorri.com",
    services: ["Branding", "Logo Design", "Squarespace", "Web Design", "AI Imagery", "Email Marketing", "Booking Integration", "Automation"],
    caseStudy: [
      { heading: "The Challenge", text: "Dorri needed a complete brand presence. Logo, website, and a system that could handle some of the work for her... booking, lead generation, and client communication, running without manual effort on her end." },
      { heading: "The Approach", text: "Full brand identity including logo, carried through a Squarespace site built for her coaching and wellness practice. AI image generation filled the visual gaps without the cost of a full shoot." },
      { heading: undefined, text: "For automation, I set up TidyCal for booking and designed a lead magnet to grow her list. The whole sequence runs automatically... custom email design, matched to the Yoga Dorri brand, from first signup through follow-up.", links: [{ word: "TidyCal", href: "https://appsumo.8odi.net/Z6nbkq" }] },
      { heading: "Ongoing", text: "I provide support as needed as her practice grows." },
    ],
    order: 9,
  },
];

async function migrate() {
  console.log(`Migrating ${projects.length} projects to Sanity...`);

  for (const project of projects) {
    const doc = {
      _type: "project",
      _id:   `project-${project.id}`,
      title:       project.title,
      slug:        { _type: "slug", current: project.id },
      category:    project.category,
      description: project.description,
      gradient:    project.gradient,
      url:         project.url ?? null,
      services:    project.services ?? [],
      images:      project.images ?? [],
      order:       project.order,
      hidden:      false,
      caseStudy: project.caseStudy.map((section) => ({
        _type: "object",
        _key:  Math.random().toString(36).slice(2),
        heading: section.heading ?? null,
        text:    section.text,
        links:   (section.links ?? []).map((l) => ({
          _type: "object",
          _key:  Math.random().toString(36).slice(2),
          word: l.word,
          href: l.href,
        })),
      })),
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ ${project.title}`);
  }

  console.log("\nDone. All projects imported.");
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
