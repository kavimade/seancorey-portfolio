"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { motion, useScroll, useMotionValue, useMotionValueEvent, useMotionTemplate } from "motion/react";
import { cn, lerp, rgb } from "@/lib/utils";
import { NAV_LINKS, scrollToSection } from "@/lib/nav";
import { Logo } from "@/components/layout/logo";
import { Hamburger, MobileNav } from "@/components/layout/mobile-nav";
import { getCssColorRgb, COLOR_VARS } from "@/lib/palette";
import { StyleSwitcher } from "@/components/ui/style-switcher";
import { LiquidButton } from "@/components/ui/liquid-button";

const NAV_HEIGHT = 72;

// Hero transition: complete at 60% of vh — matches hero-group.tsx threshold
const FADE_THRESHOLD = 0.6;

// Static white stop — unchanged by theme
const WHITE = [255, 255, 255] as const;


export function Navbar() {
  const [mounted, setMounted]       = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navIsDark, setNavIsDark]   = useState(false);
  const { scrollY } = useScroll();

  // Initial values are plain strings — no typeof window branch, no SSR mismatch.
  // The scroll handler updates these from CSS variables on first interaction.
  const navBg    = useMotionValue("rgb(213,227,222)"); // sage default
  const navColor = useMotionValue("rgb(37,54,49)");    // forest default

  useEffect(() => { setMounted(true); }, []);

  // Mobile nav is sage/light — lock header to forest-on-sage while open,
  // then immediately restore scroll-based colours on close.
  useEffect(() => {
    if (mobileOpen) {
      const FOREST = getCssColorRgb(COLOR_VARS.forest);
      const SAGE   = getCssColorRgb(COLOR_VARS.sage);
      navColor.set(rgb(FOREST));
      navBg.set(rgb(SAGE));
    } else {
      updateNavColors(scrollY.get());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileOpen]);

  // Extracted into useCallback so 'palette-tick' events can trigger it too
  const updateNavColors = useCallback((y: number) => {
    if (mobileOpen) return;

    const vh     = window.innerHeight;
    const FOREST = getCssColorRgb(COLOR_VARS.forest);
    const SAGE   = getCssColorRgb(COLOR_VARS.sage);

    if (y <= vh) {
      const t = Math.min(1, Math.max(0, y / (vh * FADE_THRESHOLD)));
      navBg.set(`rgb(${lerp(SAGE[0],FOREST[0],t)},${lerp(SAGE[1],FOREST[1],t)},${lerp(SAGE[2],FOREST[2],t)})`);
      navColor.set(`rgb(${lerp(FOREST[0],WHITE[0],t)},${lerp(FOREST[1],WHITE[1],t)},${lerp(FOREST[2],WHITE[2],t)})`);
      setNavIsDark(t > 0.5);
      return;
    }

    const transitionEl = document.getElementById("values-transition");
    const valuesEl     = document.getElementById("values");
    if (transitionEl && valuesEl) {
      const groupTop  = transitionEl.getBoundingClientRect().top + y;
      const valuesTop = valuesEl.getBoundingClientRect().top + y;
      const fadeRange = vh * FADE_THRESHOLD;
      const fadeStart = groupTop - fadeRange;
      if (y >= fadeStart && y < valuesTop) {
        const t = Math.min(1, Math.max(0, (y - fadeStart) / fadeRange));
        navBg.set(`rgb(${lerp(FOREST[0],SAGE[0],t)},${lerp(FOREST[1],SAGE[1],t)},${lerp(FOREST[2],SAGE[2],t)})`);
        navColor.set(`rgb(${lerp(WHITE[0],FOREST[0],t)},${lerp(WHITE[1],FOREST[1],t)},${lerp(WHITE[2],FOREST[2],t)})`);
        setNavIsDark(t < 0.5);
        return;
      }
    }

    const aboutTransitionEl = document.getElementById("about-transition");
    const contactEl         = document.getElementById("contact");
    if (aboutTransitionEl && contactEl) {
      const aboutGroupTop  = aboutTransitionEl.getBoundingClientRect().top + y;
      const contactTop     = contactEl.getBoundingClientRect().top + y;
      const aboutFadeStart = aboutGroupTop - vh * FADE_THRESHOLD;
      if (y >= aboutFadeStart && y < contactTop) {
        const t = Math.min(1, Math.max(0, (y - aboutFadeStart) / (vh * FADE_THRESHOLD)));
        navBg.set(`rgb(${lerp(SAGE[0],FOREST[0],t)},${lerp(SAGE[1],FOREST[1],t)},${lerp(SAGE[2],FOREST[2],t)})`);
        navColor.set(`rgb(${lerp(FOREST[0],WHITE[0],t)},${lerp(FOREST[1],WHITE[1],t)},${lerp(FOREST[2],WHITE[2],t)})`);
        setNavIsDark(t > 0.5);
        return;
      }
    }

    const sections = document.querySelectorAll<HTMLElement>("[data-section-theme]");
    let isDark = true;
    for (const el of sections) {
      const top    = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if (y + NAV_HEIGHT >= top && y + NAV_HEIGHT < bottom) {
        isDark = el.dataset.sectionTheme === "dark";
        break;
      }
    }
    navBg.set(isDark ? rgb(FOREST) : rgb(SAGE));
    navColor.set(isDark ? rgb(WHITE) : rgb(FOREST));
    setNavIsDark(isDark);
  }, [mobileOpen, navBg, navColor]);

  useMotionValueEvent(scrollY, "change", updateNavColors);

  // Re-run whenever applyScheme fires a palette-tick (once per animation frame)
  useEffect(() => {
    const refresh = () => updateNavColors(scrollY.get());
    window.addEventListener("palette-tick", refresh);
    return () => window.removeEventListener("palette-tick", refresh);
  }, [updateNavColors, scrollY]);

  // Gradient strip just below the navbar — fades from nav bg to transparent
  // Uses the same navBg motion value so it tracks scroll + scheme switches
  return (
    <>
      {/* Soft gradient fade below the nav — mask controls the curve,
          backgroundColor drives the colour so it tracks nav + schemes */}
      <motion.div
        style={{
          backgroundColor: navBg,
          maskImage: "linear-gradient(to bottom, black 0%, black 25%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 25%, transparent 85%)",
        }}
        className="fixed top-[72px] left-0 right-0 h-12 sm:h-24 pointer-events-none z-[1]"
      />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ backgroundColor: mobileOpen ? "transparent" : navBg }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <motion.nav
          style={{ color: navColor }}
          className="max-w-7xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between"
        >
          <Logo />

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="text-base tracking-wide hover:opacity-60 transition-opacity duration-300 cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            {mounted && <StyleSwitcher />}
            <LiquidButton
              onClick={() => scrollToSection("contact")}
              fillColor={navIsDark ? "color-mix(in srgb, white 10%, transparent)" : "color-mix(in srgb, var(--color-forest) 78%, white)"}
              className={cn(
                buttonVariants({ size: "sm" }),
                "rounded-full h-9 px-5 text-sm transition-all duration-300 shadow-none cursor-pointer",
                navIsDark
                  ? "border border-white/30 bg-transparent text-white"
                  : "bg-forest text-white"
              )}
            >
              Work with me
            </LiquidButton>
          </div>

          <div className="flex md:hidden items-center gap-0.5">
            {mounted && !mobileOpen && <StyleSwitcher />}
            <Hamburger
              open={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            />
          </div>
        </motion.nav>
      </motion.header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
