"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame } from "motion/react";
import { MapPin } from "lucide-react";

const ROW_ONE   = ["Sean Corey", "Web Designer", "AI Architect", "Visual Designer"];
const ROW_TWO   = ["Yoga Teacher", "Meditator", "Creative Strategist"];
const ROW_THREE = ["Human + AI", "Hoi An Based", "20 Years Building", "Mission-Aligned"];

const eras = [
  {
    label: "My Origins",
    body: [
      "I've spent 20 years building on the internet. In my twenties and thirties, I founded TrueThemes, a WordPress theme business that became the #1 seller on ThemeForest before I sold it in 2017.",
    ],
  },
  {
    label: "The Shift",
    body: [
      "Then life changed. I spent five years as the full-time web designer at the Himalayan Institute, one of North America's most respected yoga and meditation centers. That period reshaped how I see technology and work.",
    ],
  },
  {
    label: "Today",
    body: [
      "Today I combine both sides: technical expertise and contemplative practice. I work with mission-driven brands who want thoughtful digital presence enhanced by AI, not dominated by it.",
      "I take on select projects each year. I teach yoga and meditation on Insight Timer and currently live in Hoi An, Vietnam, working with clients worldwide.",
    ],
  },
];

const REPEATS = 8;
const ITEM_OPACITIES = [1, 0.6, 0.88, 0.58];

function TrackContent({ items }: { items: string[] }) {
  return (
    <>
      {Array.from({ length: REPEATS }, (_, r) =>
        items.map((item, i) => (
          <span
            key={`${r}-${i}`}
            className="font-display font-bold text-[clamp(2.8rem,6.5vw,5.5rem)] text-forest"
            style={{ opacity: ITEM_OPACITIES[i % ITEM_OPACITIES.length] }}
          >
            {item}
            <span style={{ color: "color-mix(in srgb, var(--color-forest) 40%, transparent)", fontSize: "0.6em", verticalAlign: "middle", padding: "0 0.3em" }}> ✺ </span>
          </span>
        ))
      )}
    </>
  );
}

interface MarqueeRowProps {
  items: string[];
  direction: "left" | "right";
  pxPerSec?: number; // pixels per second — lower = slower
}

function MarqueeRow({ items, direction, pxPerSec = 60 }: MarqueeRowProps) {
  const trackRef   = useRef<HTMLDivElement>(null);
  const x          = useMotionValue(0);
  const rateRef    = useRef(pxPerSec);

  useEffect(() => {
    const update = () => {
      rateRef.current = window.innerWidth < 640 ? pxPerSec * 0.7 : pxPerSec;
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [pxPerSec]);

  // Right-direction rows start at -halfWidth so they scroll into view correctly
  useEffect(() => {
    if (direction === "right" && trackRef.current) {
      x.set(-trackRef.current.scrollWidth / 2);
    }
  }, [direction, x]);

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    if (!halfWidth) return;

    const pxPerMs = rateRef.current / 1000;
    let next = x.get();

    if (direction === "left") {
      next -= delta * pxPerMs;
      if (next <= -halfWidth) next += halfWidth;
    } else {
      next += delta * pxPerMs;
      if (next >= 0) next -= halfWidth;
    }

    x.set(next);
  });

  return (
    <div className="relative overflow-hidden w-full select-none py-1.5">
      <motion.div
        ref={trackRef}
        className="flex whitespace-nowrap"
        style={{ x }}
      >
        <span><TrackContent items={items} /></span>
        <span aria-hidden><TrackContent items={items} /></span>
      </motion.div>

      <div
        className="absolute inset-y-0 left-0 w-32 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--color-sage), transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-32 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--color-sage), transparent)" }}
      />
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      data-section-theme="light"
      className="bg-sage overflow-hidden relative z-10 -mt-[16vh] sm:-mt-[20vh]"
    >
      {/* ── Marquee banners ── */}
      <div className="pt-10 sm:pt-14 pb-28 sm:pb-60">
        <div style={{ transform: "rotate(4deg) scale(1.12)", transformOrigin: "center" }}>
          <MarqueeRow items={ROW_ONE}   direction="left"  />
          <MarqueeRow items={ROW_TWO}   direction="right" />
          <MarqueeRow items={ROW_THREE} direction="left"  />
        </div>
      </div>

      {/* ── Two-column body ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 lg:gap-24 items-start">

          {/* Left — photo + badges */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/headshot.webp"
                alt="Sean Corey"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.8rem] font-sans font-medium text-forest border border-forest/15 bg-forest/5">
                <MapPin size={12} strokeWidth={2} className="text-forest flex-shrink-0" />
                Hoi An, Vietnam
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.8rem] font-sans font-medium text-forest border border-forest/15 bg-forest/5">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-forest" />
                </span>
                Accepting new projects
              </span>
            </div>
          </motion.div>

          {/* Right — eras */}
          <div className="space-y-10 sm:space-y-12">
            {eras.map((era, idx) => (
              <motion.div
                key={era.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="font-display font-semibold text-[1.35rem] sm:text-[1.65rem] leading-tight text-forest mb-4">
                  {era.label}
                </h3>
                {era.body.map((para, i) => (
                  <p
                    key={i}
                    className={`text-[1.15rem] sm:text-[1.2rem] text-forest leading-relaxed font-sans ${i > 0 ? "mt-4" : ""}`}
                  >
                    {para}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
