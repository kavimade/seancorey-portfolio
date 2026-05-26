"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useAnimationFrame, AnimatePresence } from "motion/react";

const MARQUEE_ITEMS = [
  "Web Designer", "AI Strategist", "Yoga Teacher",
  "Creative Strategist", "Meditator",
];

const REPEATS = 8;
const ITEM_OPACITIES = [1, 0.55, 0.85, 0.5, 0.9, 0.6];

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
            <span style={{ color: "color-mix(in srgb, var(--color-forest) 35%, transparent)", fontSize: "0.55em", verticalAlign: "middle", padding: "0 0.35em" }}>✺</span>
          </span>
        ))
      )}
    </>
  );
}

function MarqueeRow() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x        = useMotionValue(0);
  const rateRef  = useRef(55);

  useEffect(() => {
    const update = () => { rateRef.current = window.innerWidth < 640 ? 38 : 55; };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    if (!halfWidth) return;
    let next = x.get() - delta * (rateRef.current / 1000);
    if (next <= -halfWidth) next += halfWidth;
    x.set(next);
  });

  return (
    <div className="relative overflow-hidden w-full select-none">
      <motion.div ref={trackRef} className="flex whitespace-nowrap" style={{ x }}>
        <span><TrackContent items={MARQUEE_ITEMS} /></span>
        <span aria-hidden><TrackContent items={MARQUEE_ITEMS} /></span>
      </motion.div>
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none" style={{ background: "linear-gradient(to right, var(--color-sage), transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-24 pointer-events-none" style={{ background: "linear-gradient(to left, var(--color-sage), transparent)" }} />
    </div>
  );
}

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
      "Today I combine both sides: technical expertise and contemplative practice. I work with mission-driven brands who want a thoughtful digital presence enhanced by AI, not dominated by it.",
      "I take on select projects each year. I teach yoga and meditation on Insight Timer, and currently live in Hoi An, Vietnam, working with clients worldwide.",
      "If you're building something that matters, I'd love to help.",
    ],
  },
];

const stats = [
  { value: "20", unit: "yrs", label: "On the internet" },
  { value: "150+", unit: "", label: "Projects launched" },
  { value: "9+", unit: "", label: "Years at HI" },
  { value: "13+", unit: "", label: "Years of yoga" },
];

type Particle = { id: number; x: number; y: number; dx: number; dy: number; opacity: number };
let _pid = 0;

export function About() {
  const sectionRef  = useRef<HTMLElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleStatClick = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const count = 4 + Math.floor(Math.random() * 3);
    const spawned: Particle[] = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const isMobile = window.innerWidth < 640;
      const dist  = isMobile ? 80 + Math.random() * 100 : 180 + Math.random() * 260;
      return { id: _pid++, x, y, dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist, opacity: 0.35 + Math.random() * 0.55 };
    });
    setParticles(prev => [...prev, ...spawned]);
  }, []);

  const removeParticle = useCallback((id: number) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-section-theme="light"
      className="bg-sage overflow-hidden relative z-10 -mt-[16vh] sm:-mt-[20vh]"
    >
      {/* Easter egg particles */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.span
            key={p.id}
            aria-hidden
            initial={{ opacity: p.opacity, x: p.x, y: p.y }}
            animate={{ opacity: 0,         x: p.x + p.dx, y: p.y + p.dy }}
            exit={{}}
            transition={{ duration: 1.0, ease: "easeOut" }}
            onAnimationComplete={() => removeParticle(p.id)}
            className="absolute top-0 left-0 pointer-events-none select-none text-[2.8rem] sm:text-[3.5rem] font-bold"
            style={{ color: "color-mix(in srgb, var(--color-forest) 35%, transparent)" }}
          >
            ✺
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Marquee */}
      <div className="pt-8 sm:pt-10 pb-16 sm:pb-24">
        <MarqueeRow />
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 sm:pb-28">

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-[clamp(2.25rem,5vw,4.5rem)] text-forest leading-[1.1] mb-12 sm:mb-16"
        >
          Hi, I&apos;m Sean.
        </motion.h2>

        {/* Photo + eras */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-12 lg:gap-16 items-start mb-20 sm:mb-28">

          {/* Polaroid photo */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-140px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-start"
          >
            <div
              className="bg-white shadow-2xl rounded-3xl overflow-hidden w-[78%] sm:w-full"
              style={{
                padding: "14px 14px 52px 14px",
                transform: "rotate(-2.5deg)",
                maxWidth: "420px",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/headshot.webp"
                alt="Sean Corey"
                width={1600}
                height={1600}
                className="w-full block rounded-2xl"
                style={{ aspectRatio: "4/5", objectFit: "cover", objectPosition: "top" }}
              />
              <p className="font-display font-bold text-[1.1rem] text-forest/80 mt-3 px-1">
                Sean Corey
              </p>
              <p className="font-sans text-[0.8rem] text-forest/40 px-1">
                Web Design &amp; Strategy
              </p>
            </div>
          </motion.div>

          {/* Eras */}
          <div className="space-y-12 sm:space-y-14">
            {eras.map((era, idx) => (
              <motion.div
                key={era.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="font-display font-bold text-[1.35rem] sm:text-[1.65rem] text-forest leading-tight mb-3">
                  {era.label}
                </h3>
                {era.body.map((para, i) => (
                  <p
                    key={i}
                    className={`text-[1.1rem] text-forest/75 leading-relaxed font-sans${i > 0 ? " mt-4" : ""}`}
                  >
                    {para}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

        </div>

        {/* Stats bar */}
        <div className="border-t border-forest/15 pt-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map(({ value, unit, label }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={handleStatClick}
              className="cursor-pointer"
            >
              <p className="font-display font-bold text-[2.5rem] sm:text-[3rem] text-forest leading-none select-none">
                {value}<span className="text-[1.1rem] font-semibold ml-0.5">{unit}</span>
              </p>
              <p className="font-sans text-[0.75rem] tracking-[0.15em] uppercase text-forest mt-2 select-none">
                {label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
