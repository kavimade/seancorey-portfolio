"use client";

import { motion } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { LiquidButton, LiquidAnchor } from "@/components/ui/liquid-button";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/nav";

export function Hero() {
  return (
    <section
      id="hero"
      data-section-theme="light"
      className="relative min-h-screen overflow-hidden bg-sage"
    >
      {/* 150px top padding keeps content clear of the 72px fixed navbar */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col pt-24 sm:pt-[11rem]">
        <div className="w-full pb-24">

          <h1 className="font-display font-bold tracking-tight mb-8 max-w-[1000px] pt-4 sm:pt-0">
            <motion.span
              className="block text-[clamp(2.35rem,5vw,4.5rem)] text-forest leading-[1.2]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Hi, I&apos;m Sean.
            </motion.span>
            <motion.span
              className="block text-[clamp(2.35rem,5vw,4.5rem)] text-forest leading-[1.2]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              I build websites for brands doing meaningful work.
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
            className="mb-10 max-w-[740px]"
          >
            <p className="text-[1.4rem] sm:text-[1.5rem] text-forest leading-relaxed font-sans">
              I bring 20 years of craft and judgment to every project. I combine <strong className="font-semibold">human insight</strong> with an <strong className="font-semibold">AI-powered workflow</strong>... so the work is fast, thoughtful, and distinctly yours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <LiquidAnchor
              href="/#work"
              onClick={(e) => scrollToSection("work", e as React.MouseEvent<HTMLAnchorElement>)}
              fillColor="color-mix(in srgb, var(--color-forest) 78%, white)"
              className={cn(
                buttonVariants({ size: "lg" }),
                "flex-1 sm:flex-none justify-center bg-forest text-white rounded-full h-11 px-7 gap-2 shadow-none cursor-pointer"
              )}
            >
              View my work <ArrowDown size={16} />
            </LiquidAnchor>
            <LiquidButton
              onClick={() => scrollToSection("contact")}
              fillColor="color-mix(in srgb, var(--color-forest) 8%, transparent)"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "flex-1 sm:flex-none justify-center rounded-full h-11 px-7 border-forest/30 text-forest shadow-none cursor-pointer"
              )}
            >
              Get in touch
            </LiquidButton>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
