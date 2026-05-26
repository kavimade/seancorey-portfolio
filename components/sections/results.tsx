"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { SITE_URL } from "@/lib/config";

const reviews = [
  {
    quote: "Sean has been a remarkable asset to our team over the years. He has managed and evolved our website assets with a combination of strong technical skill, creativity, flexibility, and reliability that's rare to find. In a fast-moving business environment, having a web partner who is adaptable, calm under pressure, responsive, and committed to getting things right makes a huge difference. I highly recommend Sean Corey Design to anyone looking for a talented, trustworthy, and dependable web designer and creative partner.",
    name: "Jeff A.",
    title: "Moka Origins",
    photo: "/sean-corey-design-client-jeff.webp",
  },
  {
    quote: "Sean brings a rare combination of technical skill, creativity, and professionalism to every project. Clean, modern, highly functional frontend design. Deep understanding of user experience and performance. Whether building out polished landing pages, refining user interfaces, or collaborating on larger-scale digital experiences, he approaches the work with thoughtfulness, efficiency, and attention to detail. An invaluable creative and technical partner.",
    name: "Aaron L.",
    title: "Himalayan Institute",
    photo: "/sean-corey-design-client-aaron.webp",
  },
  {
    quote: "Beyond the website itself, Sean has managed our hosting, DNS, domain registration, Google Business setup and verification, SEO indexing, and even helped us configure Cloudflare tunnels when we deployed an internal AI tool. He's not just a web designer; he's a one-stop shop for anything related to our digital presence. I've referred Sean to colleagues without hesitation, and I'll continue to do so.",
    name: "Colt H.",
    title: "CEO / Founder, NGC General Contractors",
    photo: "/sean-corey-design-client-colt.webp",
  },
  {
    quote: "Sean is a creative technician who brings hands-on experience and invaluable insights to any project. He helps me refine my ideas and implement solutions that not only work well but look good. Working with Sean, I know we're making something of quality, something up-to-date and reliable. Plus, he's a great guy. I highly recommend him!",
    name: "Joelle H.",
    title: "Brooklyn Book Doctor",
    photo: "/sean-corey-design-client-joelle.webp",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 mb-6" aria-label="5 stars">
      {STAR_INDICES.map((i) => (
        <span key={i} aria-hidden="true" className="text-[1.1rem] review-star">★</span>
      ))}
    </div>
  );
}

function Avatar({ name, photo }: { name: string; photo?: string }) {
  if (photo) {
    return (
      <div className="w-9 h-9 rounded-full flex-shrink-0 overflow-hidden border border-sage/20 transition-colors duration-300 group-hover:border-forest/20">
        <Image src={photo} alt={name} width={36} height={36} className="w-full h-full object-cover" />
      </div>
    );
  }
  const initials = name.split(" ").map((p) => p[0]).join("").slice(0, 2);
  return (
    <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center bg-sage/20 border border-sage/20 transition-colors duration-300 group-hover:bg-forest/10 group-hover:border-forest/20">
      <span className="font-display font-bold text-[0.65rem] text-sage/70 transition-colors duration-300 group-hover:text-forest/70">{initials}</span>
    </div>
  );
}

const realReviews = reviews;

const STAR_INDICES = [0, 1, 2, 3, 4];

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#service`,
  name: "Sean Corey Web Design",
  url: SITE_URL,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: String(realReviews.length),
    bestRating: "5",
    worstRating: "1",
  },
  review: realReviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewBody: r.quote,
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
  })),
};

const reviewSchemaJson = JSON.stringify(reviewSchema);

export function Results() {
  return (
    <section
      id="results"
      data-section-theme="dark"
      className="bg-forest isolate pt-12 pb-16 sm:pt-16 sm:pb-24 lg:py-[calc(var(--spacing)*22)]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: reviewSchemaJson }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-left mb-16 sm:mb-20"
        >
          <h2 className="font-display font-bold text-[clamp(2.25rem,5vw,4.5rem)] text-sage leading-tight mb-5">
            Results
          </h2>
          <p className="text-[1.2rem] text-sage/55 font-sans max-w-xl leading-relaxed">
            What clients say about working together.
          </p>
        </motion.div>

        {/* Masonry card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.name + idx}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-2xl border border-sage/10 bg-sage/5 p-7 group transition-colors duration-300 hover:bg-sage hover:border-forest/15 cursor-default"
            >
              <Stars />
              <p className="text-[1.05rem] text-sage/95 font-sans leading-relaxed mb-7 flex-1 transition-colors duration-300 group-hover:text-forest">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Avatar name={review.name} photo={review.photo} />
                <div>
                  <p className="font-display font-semibold text-sage text-[0.95rem] leading-tight transition-colors duration-300 group-hover:text-forest">{review.name}</p>
                  {review.title && <p className="font-sans text-[0.8rem] text-sage/45 mt-0.5 transition-colors duration-300 group-hover:text-forest/55">{review.title}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
