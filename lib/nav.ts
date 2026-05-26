import type React from "react";

export const NAV_LINKS = [
  { id: "work",    label: "Work"    },
  { id: "results", label: "Results" },
  { id: "process", label: "Process" },
  { id: "about",   label: "About"   },
  { id: "contact", label: "Contact" },
] as const;

export function scrollToSection(id: string, e?: React.MouseEvent) {
  e?.preventDefault();
  const target = document.getElementById(id);
  if (!target) return;
  const el = target; // non-null alias for closure use

  const start    = window.scrollY;
  const duration = 1400; // ms — slow, premium feel
  let startTime: number | null = null;

  // Ease in-out quart — gradual acceleration and deceleration
  function ease(t: number) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
  }

  function step(ts: number) {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    // Re-read each frame so layout shifts during animation (fonts, preloader)
    // don't leave us at the wrong position.
    const end = el.getBoundingClientRect().top + window.scrollY - 75;
    window.scrollTo(0, start + (end - start) * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
