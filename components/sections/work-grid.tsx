"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { WorkCursor } from "@/components/ui/work-cursor";
import { ProjectModal } from "@/components/ui/project-modal";
import type { SanityProject } from "@/sanity/lib/queries";

// ── Per-card component ────────────────────────────────────────────────────────
function WorkCard({
  project,
  idx,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: {
  project: SanityProject;
  idx: number;
  onSelect: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const thumbnail = project.images?.[0] ?? null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} project`}
      onClick={onSelect}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(); } }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="group cursor-none bg-black/20 rounded-3xl overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
    >
      {thumbnail && (
        <div className="m-[15px] rounded-2xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnail}
            alt=""
            width={2432}
            height={1368}
            className="w-full h-auto block"
          />
        </div>
      )}

      <div className="p-7 sm:p-8">
        <p className="font-display font-bold text-white text-[1.45rem] leading-tight mb-2">
          {project.title}
        </p>
        <p className="font-sans text-[1.1rem] text-white/55 leading-relaxed mb-5">
          {project.description}
        </p>
        <span
          aria-hidden="true"
          className="inline-flex items-center gap-1.5 text-[0.75rem] uppercase tracking-[0.15em] text-white/70 underline underline-offset-4 group-hover:text-white transition-colors duration-200 font-sans"
        >
          View Project <ArrowUpRight size={13} strokeWidth={1.75} />
        </span>
      </div>
    </motion.div>
  );
}

// ── Main grid ────────────────────────────────────────────────────────────────
export function WorkGrid({ projects }: { projects: SanityProject[] }) {
  const [selectedId, setSelectedId]   = useState<string | null>(null);
  const [isHovering, setIsHovering]   = useState(false);

  const selected = projects.find(p => p.id === selectedId) ?? null;

  useEffect(() => {
    if (selectedId) setIsHovering(false);
  }, [selectedId]);

  return (
    <section
      id="work"
      data-section-theme="dark"
      className="bg-forest py-12 sm:py-16 lg:py-[calc(var(--spacing)*22)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-[clamp(2.25rem,5vw,4.5rem)] text-white leading-tight mb-5"
        >
          Web Design Portfolio
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[1.1rem] sm:text-[1.3rem] text-white/60 leading-relaxed font-sans max-w-xl mb-[calc(var(--spacing)*11)] lg:mb-[calc(var(--spacing)*15)]"
        >
          A selection of projects spanning e-commerce, education, wellness, and mission-driven brands.
        </motion.p>

        <motion.div
          initial={{ paddingLeft: "8vw", paddingRight: "8vw" }}
          whileInView={{ paddingLeft: "0px", paddingRight: "0px" }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects.map((project, idx) => (
            <WorkCard
              key={project.id}
              project={project}
              idx={idx}
              onSelect={() => setSelectedId(project.id)}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            />
          ))}
        </motion.div>
      </div>

      <WorkCursor isHovering={isHovering && !selectedId} />

      <ProjectModal
        project={selected}
        onClose={() => setSelectedId(null)}
      />
    </section>
  );
}
