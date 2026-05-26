"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { SITE_URL } from "@/lib/config";

const reviews = [
  {
    quote: "Sean built our company website in 2022, and nearly four years later he's still the only person I call when we need anything web-related. He's not just a web designer — he's a one-stop shop for anything related to our digital presence. If you're looking for someone who builds something great and then actually sticks around to maintain it, Sean is your guy.",
    name: "Colt H.",
    title: "CEO / Founder, NGC General Contractors",
    photo: "/sean-corey-design-client-colt.webp",
  },
  {
    quote: "Sean is a creative technician who brings hands-on experience and invaluable insights to any project. Working with Sean, I know we're making something of quality. Something up-to-date and reliable.",
    name: "Joelle H.",
    title: "Brooklyn Book Doctor",
    photo: "/sean-corey-design-client-joelle.webp",
  },
  {
    quote: "Sean has managed and evolved our website assets with a combination of technical skill, creativity, and flexibility that's rare to find. One thing I especially appreciate is that Sean genuinely looks for ways to save us money and reduce unnecessary design time. Instead of creating dependency, he helps establish systems that allow our team to handle things internally when appropriate. That kind of transparency says a lot.",
    name: "Jeff A.",
    title: "Moka Origins",
    photo: "/sean-corey-design-client-jeff.webp",
  },
  {
    quote: "Sean brings a rare combination of technical skill, creativity, and professionalism to every project. Clean, modern, highly functional frontend design. Deep understanding of user experience and performance. An invaluable creative and technical partner.",
    name: "Aaron L.",
    title: "Himalayan Institute",
    photo: "/sean-corey-design-client-aaron.webp",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 mb-6" aria-label="5 stars">
      {STAR_INDICES.map((i) => (
        <span key={i} aria-hidden="true" className="text-[1.1rem]" style={{ color: "color-mix(in srgb, var(--color-sage) 70%, #f59e0b)" }}>★</span>
      ))}
    </div>
  );
}

function Avatar({ name, photo }: { name: string; photo?: string }) {
  if (photo) {
    return (
      <div className="w-9 h-9 rounded-full flex-shrink-0 overflow-hidden border border-sage/20">
        <Image src={photo} alt={name} width={36} height={36} className="w-full h-full object-cover" />
      </div>
    );
  }
  const initials = name.split(" ").map((p) => p[0]).join("").slice(0, 2);
  return (
    <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center bg-sage/20 border border-sage/20">
      <span className="font-display font-bold text-[0.65rem] text-sage/70">{initials}</span>
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
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.name + idx}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="break-inside-avoid mb-5 rounded-2xl border border-sage/10 bg-sage/5 p-7"
            >
              <Stars />
              <p className="text-[1.05rem] text-sage/95 font-sans leading-relaxed mb-7">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Avatar name={review.name} photo={review.photo} />
                <div>
                  <p className="font-display font-semibold text-sage text-[0.95rem] leading-tight">{review.name}</p>
                  {review.title && <p className="font-sans text-[0.8rem] text-sage/45 mt-0.5">{review.title}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
