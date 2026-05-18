"use client";

import { motion } from "motion/react";

const principles = [
  {
    number: "1",
    title: "Clear Communication",
    description:
      "I explain my thinking. You understand the why behind every decision. No surprises, no jargon, no guessing.",
  },
  {
    number: "2",
    title: "Realistic Timelines",
    description:
      "I give honest estimates. I deliver on time. Quality doesn't mean slow. It means planning well, staying focused, and catching issues early.",
  },
  {
    number: "3",
    title: "Thoughtful Collaboration",
    description:
      "Your input matters. I listen, ask questions, iterate until it feels right. The best results come from respecting what you know about your own work.",
  },
  {
    number: "4",
    title: "Human + AI",
    description:
      "I use AI as a creative partner, not a shortcut. It helps me move faster, explore more ideas, catch things I might miss. But every decision, every detail, every word is guided by human judgment and craft.",
  },
];

export function Services() {
  return (
    <section
      id="process"
      data-section-theme="light"
      className="bg-forest pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-[calc(var(--spacing)*22)] lg:pb-36"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 sm:gap-16 lg:gap-24 items-start">

          {/* Left — sticky while right column scrolls */}
          <div className="lg:sticky lg:top-[220px]">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-[clamp(2.25rem,5vw,4.5rem)] text-forest leading-tight mb-8"
            >
              My Process
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-[1.25rem] sm:text-[1.3rem] text-forest leading-relaxed font-sans"
            >
              Good work isn&apos;t just about the final deliverable. It&apos;s the process, the communication,
              and the way we work together. These are the things I build around.
            </motion.p>
          </div>

          {/* Right — scrolls past the sticky left column */}
          <div className="space-y-8 sm:space-y-12 lg:pt-24">
            {principles.map((p, idx) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-6"
              >
                <div className="w-[43px] h-[43px] sm:w-[50px] sm:h-[50px] rounded-full bg-forest flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-display font-bold text-[1.15rem] sm:text-[1.35rem] text-sage">
                    {p.number}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-[1.35rem] sm:text-[1.65rem] leading-tight text-forest mb-2">
                    {p.title}
                  </h3>
                  <p className="text-[1.2rem] text-forest leading-relaxed font-sans">
                    {p.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
