export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  gradient: string;
  images?: string[];
  url?: string;
  services?: string[];
  caseStudy?: { heading?: string; text: string }[];
};

export const projects: Project[] = [
  {
    id: "moka-origins",
    title: "Moka Origins",
    category: "Brand Identity",
    description: "A full ecommerce overhaul for a specialty coffee and chocolate brand making a difference. Built for speed, clarity, and a team that can own it.",
    gradient: "linear-gradient(135deg, #48949e 0%, #2a5a62 100%)",
    images: [
      "/sean-corey-design-moka-1\.webp",
      "/sean-corey-design-moka-2\.webp",
      "/sean-corey-design-moka-3\.webp",
      "/sean-corey-design-moka-4\.webp",
    ],
    url: "https://mokaorigins.com",
    services: ["Ecommerce", "UI Design", "Web Development", "Consulting", "Infrastructure"],
    caseStudy: [
      {
        heading: "The Challenge",
        text: "Moka Origins had outgrown their existing Shopify infrastructure. A code-heavy setup was limiting the team's ability to make updates independently and keeping the site from performing at the level the brand deserved.",
      },
      {
        heading: "The Approach",
        text: "I planned and designed the full site architecture, migrating to a modern theme with fast load times, an AJAX cart, and robust search. The bigger shift was moving from a code-based build to a visual page builder... giving their team real ownership over the site without needing a developer for every change.",
      },
      {
        heading: "Ongoing Support",
        text: "Eight-plus years in, the relationship continues. Campaign launches, page builds, and strategic technology consulting as the business evolves.",
      },
    ],
  },
  {
    id: "himalayan-institute",
    title: "Himalayan Institute",
    category: "Web Design",
    description: "Nine years of embedded partnership with one of North America's most respected yoga and wellness institutions. Strategy, design, and infrastructure at scale.",
    gradient: "linear-gradient(135deg, #3a3a3a 0%, #181818 100%)",
    url: "https://himalayaninstitute.org",
    images: [
      "/sean-corey-design-himalayan-1\.webp",
      "/sean-corey-design-himalayan-2\.webp",
      "/sean-corey-design-himalayan-3\.webp",
      "/sean-corey-design-himalayan-4\.webp",
    ],
    services: [
      "Web Design",
      "UX Strategy",
      "Platform Development",
      "Email Marketing",
      "Analytics",
      "Infrastructure",
      "Documentation",
    ],
    caseStudy: [
      {
        heading: "The Challenge",
        text: "The Himalayan Institute operates multiple web properties supporting each arm of their non-profit organization... a main website, online shop, humanitarian site, and internal tools. When the pandemic hit in 2020, they needed a way to carry their teachings online. HI Online was born. Across all of it, they needed design consistency and someone who could think and operate at a systems level.",
      },
      {
        heading: "The Approach",
        text: "Over five years of full-time embedded work, I led web design strategy across all of their digital properties. That included a full redesign of their main website, humanitarian site, online shop, and HI Online. Beyond the platform work, the scope included email marketing templates, analytics configuration, conversion tracking, and a full restructure of site navigation across properties.",
      },
      {
        heading: undefined,
        text: "On the infrastructure side, I helped plan and execute a migration of 1,000+ posts and active user and membership accounts between systems, ensuring a smooth transition with no downtime. I also led the move of all properties to a new web server and wrote internal documentation to standardize design and development workflows across the organization.",
      },
      {
        heading: "Ongoing",
        text: "Nine years in, the relationship continues. The work has evolved from full-time embedded leadership to focused strategic support as their organization evolves.",
      },
    ],
  },
  {
    id: "hi-online",
    title: "HI Online",
    category: "Platform Design",
    description: "From a simple blog to a full-scale online learning platform. HI Online brought the Himalayan Institute's teachings to a global audience when the world needed it most.",
    gradient: "linear-gradient(135deg, #4a6a8a 0%, #2a3a5a 100%)",
    images: [
      "/sean-corey-design-hi-online-1.webp",
      "/sean-corey-design-hi-online-2.webp",
      "/sean-corey-design-hi-online-3.webp",
      "/sean-corey-design-hi-online-4.webp",
    ],
    url: "https://himalayaninstitute.org/online",
    services: ["UX Strategy", "Architecture", "Web Design", "Development", "Email Marketing", "Migration", "Infrastructure"],
    caseStudy: [
      {
        heading: "The Challenge",
        text: "What began as the Wisdom Library, a foundational blog for the Himalayan Institute, needed to evolve into something much larger. When the COVID-19 pandemic hit, the organization needed a way to carry their teachings online at scale. The answer was HI Online... a full platform supporting courses, memberships, and community. It was a substantial effort that touched every part of the organization.",
      },
      {
        heading: "The Approach",
        text: "My role spanned the full project lifecycle. I handled wireframing, architecture, planning, web design, and development. On the marketing side I contributed to strategy, email templates, and user flows... ensuring the experience felt cohesive from first visit through active membership.",
      },
      {
        heading: undefined,
        text: "The infrastructure work was significant. The team migrated 1,000+ pieces of content and active membership accounts between systems, updated the entire site architecture, and moved everything to a new server before launch. No downtime. No disruption to existing members.",
      },
      {
        heading: "Ongoing",
        text: "HI Online continues to grow as a core pillar of the Himalayan Institute's digital presence. The platform that launched out of necessity has become a durable, scalable foundation for their mission.",
      },
    ],
  },
  {
    id: "vishoka-meditation",
    title: "Vishoka Meditation",
    category: "Brand Identity",
    description: "A website for a complete system of meditation rooted in ancient practice. Clean, minimal, and built to reach people searching for something real.",
    gradient: "linear-gradient(135deg, #c4864a 0%, #7a4c22 100%)",
    images: [
      "/sean-corey-design-vishoka-1\.webp",
      "/sean-corey-design-vishoka-2\.webp",
      "/sean-corey-design-vishoka-3\.webp",
      "/sean-corey-design-vishoka-4\.webp",
    ],
    url: "https://vishokameditation.org/",
    services: ["Branding", "Web Design", "UX Strategy", "WordPress Development"],
    caseStudy: [
      {
        heading: "The Challenge",
        text: "Vishoka Meditation is a distinct brand and teaching lineage, separate from the Himalayan Institute but rooted in the same tradition. They needed a new site built from scratch... one that could clearly communicate the practice, capture organic traffic, and stand on its own as an independent brand presence.",
      },
      {
        heading: "The Approach",
        text: "I handled the website design, development, and strategy. The design direction was intentionally clean and minimalistic, letting the teaching speak without distraction. The site needed to be clear and focused... a reflection of the practice itself.",
      },
      {
        heading: undefined,
        text: "As the teaching grew, the site evolved with it. A searchable Teacher Directory and online course listing were added over time, expanding the site's utility without compromising its simplicity.",
      },
    ],
  },
  {
    id: "sage-wisdom-wellness",
    title: "Sage Wisdom & Wellness",
    category: "Web Design",
    description: "Placeholder description for Sage Wisdom & Wellness.",
    gradient: "linear-gradient(135deg, #7a9a8a 0%, #3a5a4a 100%)",
    images: [
      "/sean-corey-design-sage-wisdom-1\.webp",
      "/sean-corey-design-sage-wisdom-2\.webp",
      "/sean-corey-design-sage-wisdom-3\.webp",
      "/sean-corey-design-sage-wisdom-4\.webp",
    ],
    services: ["Web Design", "Brand Identity"],
  },
  {
    id: "vadavas-by-lex",
    title: "Vadavas by Lex",
    category: "Ecommerce",
    description: "A modern ecommerce store for a handmade jewelry brand, built to sell seamlessly across web, Instagram, and TikTok.",
    gradient: "linear-gradient(135deg, #8b7355 0%, #4a3920 100%)",
    images: [
      "/sean-corey-design-vadavas-1\.webp",
      "/sean-corey-design-vadavas-2\.webp",
      "/sean-corey-design-vadavas-3\.webp",
      "/sean-corey-design-vadavas-4\.webp",
    ],
    url: "https://vadavasbylex.com",
    services: ["Ecommerce", "Website Design", "Systems Consulting", "AI Photography"],
    caseStudy: [
      {
        heading: "The Challenge",
        text: "Vadavas By Lex was running on an outdated POS system with no clean path to selling across social channels. They needed a modern online store that could integrate with Instagram and TikTok automatically, present their handmade jewelry beautifully, and do it all without the overhead of their existing setup.",
      },
      {
        heading: "The Approach",
        text: "I rebuilt their ecommerce foundation on a modern platform, connecting their store directly to their social sales channels so inventory, orders, and listings stay in sync. The new system was significantly more affordable than what they were running, saving thousands of dollars per year.",
      },
      {
        heading: undefined,
        text: "The product photography needed a refresh but a full shoot wasn't in the budget. I used AI image tools to refine the existing photos... delivering a polished, consistent result at a fraction of the cost.",
      },
      {
        heading: "The Outcome",
        text: "A cleaner store. Lower overhead. Product photos that convert. And a sales infrastructure that grows with them as their social presence grows.",
      },
    ],
  },
  {
    id: "yoga-hive",
    title: "Yoga Hive",
    category: "Web Design",
    description: "Placeholder description for Yoga Hive.",
    gradient: "linear-gradient(135deg, #5a7a7e 0%, #2d4a50 100%)",
    images: [
      "/sean-corey-design-yoga-hive-1\.webp",
      "/sean-corey-design-yoga-hive-2\.webp",
      "/sean-corey-design-yoga-hive-3\.webp",
      "/sean-corey-design-yoga-hive-4\.webp",
    ],
    services: ["Web Design", "UX Design"],
  },
  {
    id: "sean-corey-yoga",
    title: "Sean Corey Yoga",
    category: "Brand Identity",
    description: "Placeholder description for Sean Corey Yoga.",
    gradient: "linear-gradient(135deg, #7a8a6e 0%, #3a4a2e 100%)",
    images: [
      "/sean-corey-design-sean-corey-yoga-1\.webp",
      "/sean-corey-design-sean-corey-yoga-2\.webp",
      "/sean-corey-design-sean-corey-yoga-3\.webp",
      "/sean-corey-design-sean-corey-yoga-4\.webp",
    ],
    services: ["Brand Identity", "Web Design"],
  },
  {
    id: "yoga-dorri",
    title: "Yoga Dorri",
    category: "Web Design",
    description: "Placeholder description for Yoga Dorri.",
    gradient: "linear-gradient(135deg, #a09070 0%, #5a4a30 100%)",
    images: [
      "/sean-corey-design-yoga-dorri-1\.webp",
      "/sean-corey-design-yoga-dorri-2\.webp",
      "/sean-corey-design-yoga-dorri-3\.webp",
      "/sean-corey-design-yoga-dorri-4\.webp",
    ],
    services: ["Web Design", "Brand Identity"],
  },
  // {
  //   id: "smokin-joes",
  //   title: "Smokin' Joes",
  //   category: "Web Design",
  //   description: "Placeholder description for Smokin' Joes.",
  //   gradient: "linear-gradient(135deg, #8b3a1a 0%, #3a1a08 100%)",
  //   images: [
  //     "/sean-corey-design-smokin-joes-1.webp",
  //     "/sean-corey-design-smokin-joes-2.webp",
  //     "/sean-corey-design-smokin-joes-3.webp",
  //     "/sean-corey-design-smokin-joes-4.webp",
  //   ],
  //   services: ["Web Design", "UI Design"],
  // },
];
