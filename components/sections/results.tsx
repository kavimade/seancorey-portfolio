"use client";

import { motion } from "motion/react";
import { SITE_URL } from "@/lib/config";

const reviews = [
  {
    quote: "The thing I appreciate most is how easy Sean is to work with. Our team — myself, our COO, and our CFO — all communicate with him directly, and he's always professional, patient, and thorough. He works from Asia, and despite the time zone difference, I've never felt like communication was an issue. He's proactive about renewals, transparent about hosting changes, and always gives us options rather than just telling us what to do.",
    name: "Colt Holeman",
    title: "CEO / Founder, NGC General Contractors",
    initials: "CH",
  },
  {
    quote: "Placeholder testimonial — Sean brought real strategic thinking to the project, not just execution. He asked the right questions early and it saved us a lot of back-and-forth later.",
    name: "Client Name",
    title: "CEO, Company",
    initials: "CN",
    placeholder: true,
  },
  {
    quote: "Placeholder testimonial — the design quality was immediately noticeable. Clean, fast, and on-brand.",
    name: "Client Name",
    title: "Director, Company",
    initials: "CN",
    placeholder: true,
  },
  {
    quote: "Placeholder testimonial — we had worked with other designers before but the level of craft and communication here was different. Highly recommend.",
    name: "Client Name",
    title: "Founder, Company",
    initials: "CN",
    placeholder: true,
  },
  {
    quote: "Placeholder testimonial — Sean understood our mission immediately and translated it into something we're proud to show people. The AI-assisted workflow meant we moved faster than expected without sacrificing quality.",
    name: "Client Name",
    title: "Owner, Company",
    initials: "CN",
    placeholder: true,
  },
  {
    quote: "Placeholder testimonial — straightforward, honest, and delivered exactly what was promised.",
    name: "Client Name",
    title: "Co-Founder, Company",
    initials: "CN",
    placeholder: true,
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

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center bg-sage/20 border border-sage/20">
      <span className="font-display font-bold text-[0.65rem] text-sage/70">{initials}</span>
    </div>
  );
}

const realReviews = reviews.filter((r) => !r.placeholder);

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
              key={review.name + review.initials + idx}
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
                <Avatar initials={review.initials} />
                <div>
                  <p className="font-display font-semibold text-sage text-[0.95rem] leading-tight">{review.name}</p>
                  <p className="font-sans text-[0.8rem] text-sage/45 mt-0.5">{review.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
