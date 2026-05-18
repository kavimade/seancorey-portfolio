"use client";

import { useRef, useEffect, useCallback } from "react";
import { useMotionValue, useMotionValueEvent, motion, useScroll } from "motion/react";
import { getCssColorRgb, COLOR_VARS } from "@/lib/palette";
import { lerp } from "@/lib/utils";

// ─── Dark → Light ─────────────────────────────────────────────────────────────
export function DarkTransitionGroup() {
  const ref    = useRef<HTMLDivElement>(null);
  const divBg  = useMotionValue("var(--color-forest)");
  const { scrollY } = useScroll();

  useEffect(() => {
    return () => {
      document.body.style.backgroundColor = "";
      const workEl = document.getElementById("work") as HTMLElement | null;
      if (workEl) {
        workEl.style.backgroundColor = "";
        const contentEl = workEl.querySelector<HTMLElement>(":scope > div");
        if (contentEl) contentEl.style.opacity = "";
      }
      const processEl = document.getElementById("process") as HTMLElement | null;
      if (processEl) processEl.style.backgroundColor = "";
      const resultsEl = document.getElementById("results") as HTMLElement | null;
      if (resultsEl) resultsEl.style.backgroundColor = "";
    };
  }, []);

  const update = useCallback((y: number) => {
    const el = ref.current;
    if (!el) return;
    const vh       = window.innerHeight;
    const groupTop = el.getBoundingClientRect().top + y;
    const range    = vh * 0.6;
    const start    = groupTop - range;
    const t = Math.min(1, Math.max(0, (y - start) / range));

    const FOREST = getCssColorRgb(COLOR_VARS.forest);
    const SAGE   = getCssColorRgb(COLOR_VARS.sage);
    const color  = `rgb(${lerp(FOREST[0], SAGE[0], t)},${lerp(FOREST[1], SAGE[1], t)},${lerp(FOREST[2], SAGE[2], t)})`;

    divBg.set(color);
    document.body.style.backgroundColor = color;

    const workEl = document.getElementById("work") as HTMLElement | null;
    if (workEl) {
      workEl.style.backgroundColor = color;
      const contentEl = workEl.querySelector<HTMLElement>(":scope > div");
      if (contentEl) contentEl.style.opacity = String(1 - t);
    }
    const processEl = document.getElementById("process") as HTMLElement | null;
    if (processEl) processEl.style.backgroundColor = color;
    const resultsEl = document.getElementById("results") as HTMLElement | null;
    if (resultsEl) resultsEl.style.backgroundColor = color;
  }, [divBg]);

  useMotionValueEvent(scrollY, "change", update);

  // Re-run on every palette-tick so scheme switches update colours immediately
  useEffect(() => {
    const refresh = () => update(scrollY.get());
    window.addEventListener("palette-tick", refresh);
    return () => window.removeEventListener("palette-tick", refresh);
  }, [update, scrollY]);

  return (
    <div ref={ref} id="process-transition">
      <motion.div
        data-section-theme="dark"
        className="h-[65vh] sm:h-[42vh]"
        style={{
          backgroundColor: divBg,
          marginTop: "-8em",
          display: "block",
        }}
      />
    </div>
  );
}

// ─── Light → Dark ─────────────────────────────────────────────────────────────
export function LightTransitionGroup() {
  const ref   = useRef<HTMLDivElement>(null);
  const divBg = useMotionValue("var(--color-sage)");
  const { scrollY } = useScroll();

  useEffect(() => {
    return () => {
      document.body.style.backgroundColor = "";
      const aboutEl = document.getElementById("about") as HTMLElement | null;
      if (aboutEl) {
        aboutEl.style.backgroundColor = "";
        const contentEl = aboutEl.querySelector<HTMLElement>(":scope > div");
        if (contentEl) contentEl.style.opacity = "";
      }
      const contactEl = document.getElementById("contact") as HTMLElement | null;
      if (contactEl) contactEl.style.backgroundColor = "";
    };
  }, []);

  const update = useCallback((y: number) => {
    const el = ref.current;
    if (!el) return;
    const vh       = window.innerHeight;
    const groupTop = el.getBoundingClientRect().top + y;
    const range    = vh * 0.6;
    const start    = groupTop - range;
    const t = Math.min(1, Math.max(0, (y - start) / range));

    const SAGE   = getCssColorRgb(COLOR_VARS.sage);
    const FOREST = getCssColorRgb(COLOR_VARS.forest);
    const color  = `rgb(${lerp(SAGE[0], FOREST[0], t)},${lerp(SAGE[1], FOREST[1], t)},${lerp(SAGE[2], FOREST[2], t)})`;

    divBg.set(color);

    if (t > 0) {
      document.body.style.backgroundColor = color;

      const aboutEl = document.getElementById("about") as HTMLElement | null;
      if (aboutEl) {
        aboutEl.style.backgroundColor = color;
        const contentEl = aboutEl.querySelector<HTMLElement>(":scope > div");
        if (contentEl) contentEl.style.opacity = String(1 - t);
      }

      const contactEl = document.getElementById("contact") as HTMLElement | null;
      if (contactEl) contactEl.style.backgroundColor = color;
    } else {
      const aboutEl = document.getElementById("about") as HTMLElement | null;
      if (aboutEl) {
        aboutEl.style.backgroundColor = "";
        const contentEl = aboutEl.querySelector<HTMLElement>(":scope > div");
        if (contentEl) contentEl.style.opacity = "";
      }
      const contactEl = document.getElementById("contact") as HTMLElement | null;
      if (contactEl) contactEl.style.backgroundColor = "";
    }
  }, [divBg]);

  useMotionValueEvent(scrollY, "change", update);

  // Re-run on every palette-tick so scheme switches update colours immediately
  useEffect(() => {
    const refresh = () => update(scrollY.get());
    window.addEventListener("palette-tick", refresh);
    return () => window.removeEventListener("palette-tick", refresh);
  }, [update, scrollY]);

  return (
    <div ref={ref} id="about-transition">
      <motion.div
        data-section-theme="light"
        className="h-[32vh] sm:h-[42vh]"
        style={{
          backgroundColor: divBg,
          display: "block",
        }}
      />
    </div>
  );
}
