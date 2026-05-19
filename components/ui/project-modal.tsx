"use client";

import { useState, useEffect, useCallback, useRef, useId } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { X, ChevronLeft, ChevronRight, ArrowUpRight, ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import type { Project } from "@/lib/projects";

function renderText(text: string, links?: { word: string; href: string }[]) {
  if (!links?.length) return text;
  const pattern = new RegExp(`(${links.map(l => l.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    const link = links.find(l => l.word === part);
    return link ? (
      <a
        key={i}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:opacity-70 transition-opacity duration-200"
      >
        {part}<span className="sr-only"> (opens in new tab)</span>
      </a>
    ) : part;
  });
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [selectedIndex, setSelectedIndex]               = useState(0);
  const [lightboxIndex, setLightboxIndex]               = useState<number | null>(null);
  const [lightboxCurrentIndex, setLightboxCurrentIndex] = useState(0);
  const modalRef   = useRef<HTMLDivElement>(null);
  const closeRef   = useRef<HTMLButtonElement>(null);
  const titleId    = useId();

  const images      = project?.images ?? [];
  const hasMultiple = images.length > 1;

  // ── Desktop carousel ─────────────────────────────────────────────────────────
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop:          true,
    align:         "center",
    containScroll: false,
  });

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(0, true);
    setSelectedIndex(0);
  }, [project?.id, emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // ── Lightbox carousel ────────────────────────────────────────────────────────
  const [lightboxEmblaRef, lightboxEmblaApi] = useEmblaCarousel({
    loop:          true,
    align:         "center",
    containScroll: false,
  });

  useEffect(() => {
    if (!lightboxEmblaApi) return;
    const onSelect = () => setLightboxCurrentIndex(lightboxEmblaApi.selectedScrollSnap());
    lightboxEmblaApi.on("select", onSelect);
    return () => { lightboxEmblaApi.off("select", onSelect); };
  }, [lightboxEmblaApi]);

  // Scroll to the tapped image once Embla is ready
  useEffect(() => {
    if (lightboxIndex === null || !lightboxEmblaApi) return;
    lightboxEmblaApi.scrollTo(lightboxIndex, true);
    setLightboxCurrentIndex(lightboxIndex);
  }, [lightboxIndex, lightboxEmblaApi]);

  // ── Lifecycle ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!project) setLightboxIndex(null);
  }, [project]);

  // Lock viewport zoom while lightbox is open so pinch-to-zoom doesn't bleed into the page
  useEffect(() => {
    if (lightboxIndex === null) return;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
    if (!meta) return;
    const original = meta.content;
    meta.content = `${original}, maximum-scale=1`;
    return () => { meta.content = original; };
  }, [lightboxIndex]);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    if (project) {
      const t = setTimeout(() => closeRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  // ── Carousel custom cursor (desktop only) ────────────────────────────────────
  const carouselRef  = useRef<HTMLDivElement>(null);
  const [carouselHover, setCarouselHover] = useState(false);
  const [cursorSide, setCursorSide]       = useState<"left" | "right">("right");

  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const curX   = useSpring(mouseX, { stiffness: 500, damping: 32 });
  const curY   = useSpring(mouseY, { stiffness: 500, damping: 32 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (carouselRef.current) {
        const { left, width } = carouselRef.current.getBoundingClientRect();
        setCursorSide(e.clientX - left < width / 2 ? "left" : "right");
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  // ── Keyboard ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!project) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) { setLightboxIndex(null); return; }
        onClose();
        return;
      }
      if (lightboxIndex !== null) {
        if (e.key === "ArrowLeft")  lightboxEmblaApi?.scrollPrev();
        if (e.key === "ArrowRight") lightboxEmblaApi?.scrollNext();
        return;
      }
      if (e.key === "ArrowLeft")  scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [project, onClose, scrollPrev, scrollNext, lightboxIndex, lightboxEmblaApi]);

  return (
    <>
      <AnimatePresence>
        {project && (
          <motion.div
            ref={modalRef}
            key="project-modal"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.45, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed top-0 left-0 right-0 h-dvh z-[200] bg-sage overflow-y-auto"
          >
            {/* Close */}
            <button
              ref={closeRef}
              onClick={onClose}
              className="fixed top-6 right-6 z-10 w-10 h-10 rounded-full bg-forest/8 hover:bg-forest/15 flex items-center justify-center text-forest transition-colors duration-200 cursor-pointer"
              aria-label="Close project"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="max-w-5xl mx-auto px-6 lg:px-12 pt-20 pb-4 sm:pb-12">
              <motion.h2
                id={titleId}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
                className="font-display font-bold text-forest text-[clamp(2.25rem,5vw,4.5rem)] leading-tight mb-[1.875rem]"
              >
                {project.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
                className="font-sans text-[1.1rem] text-forest/70 leading-relaxed mb-8 sm:max-w-[500px]"
              >
                {project.description}
              </motion.p>

              {project.url && (
                <motion.a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.26, ease: EASE }}
                  className="hidden sm:inline-flex items-center gap-2 bg-forest hover:bg-forest/85 text-white rounded-full px-7 h-11 text-sm font-sans transition-colors duration-300"
                >
                  Visit Website <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only">(opens in new tab)</span>
                </motion.a>
              )}
            </div>

            {/* Carousel custom cursor — desktop only */}
            <motion.div
              style={{ x: curX, y: curY, translateX: "-50%", translateY: "-50%" }}
              animate={{ opacity: carouselHover ? 1 : 0, scale: carouselHover ? 1 : 0.4 }}
              transition={{ duration: 0.18, ease: EASE }}
              className="hidden md:flex fixed top-0 left-0 z-[200] pointer-events-none w-16 h-16 rounded-full bg-forest items-center justify-center"
            >
              {cursorSide === "left"
                ? <ArrowLeft  size={22} strokeWidth={1.75} className="text-sage" />
                : <ArrowRight size={22} strokeWidth={1.75} className="text-sage" />
              }
            </motion.div>

            {/* ── Mobile: stacked images, tappable for lightbox ── */}
            {images.length > 0 && (
              <div className="sm:hidden px-6 space-y-5">
                {images.map((src, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.28 + i * 0.1, ease: EASE }}
                    className="overflow-hidden rounded-xl relative cursor-zoom-in active:opacity-90 transition-opacity duration-150 w-full text-left"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`View ${project.title} image ${i + 1} fullscreen`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${project.title} — image ${i + 1}`}
                      width={2432}
                      height={1368}
                      className="w-full block"
                    />
                    <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center pointer-events-none">
                      <Maximize2 size={13} className="text-white" />
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* ── Desktop: Embla carousel ── */}
            {images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
                className="hidden sm:block"
              >
                <div
                  ref={carouselRef}
                  className="md:cursor-none"
                  onMouseEnter={() => setCarouselHover(true)}
                  onMouseLeave={() => setCarouselHover(false)}
                  onClick={() => cursorSide === "left" ? scrollPrev() : scrollNext()}
                >
                  <div ref={emblaRef} className="overflow-hidden">
                    <div className="flex">
                      {images.map((src, i) => (
                        <div key={i} className="flex-[0_0_80%] px-2">
                          <div className="overflow-hidden rounded-xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={`${project.title} — ${i + 1}`}
                              width={2432}
                              height={1368}
                              className="w-full block"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {hasMultiple && (
                  <div className="flex items-center justify-center gap-3 pt-5">
                    <button
                      onClick={scrollPrev}
                      className="w-9 h-9 rounded-full border border-forest/20 flex items-center justify-center text-forest hover:bg-forest/8 transition-colors duration-200 cursor-pointer"
                      aria-label="Previous"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <div className="flex gap-2">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => emblaApi?.scrollTo(i)}
                          aria-label={`Image ${i + 1}`}
                          className={`rounded-full transition-all duration-250 cursor-pointer ${
                            i === selectedIndex
                              ? "w-5 h-1.5 bg-forest"
                              : "w-1.5 h-1.5 bg-forest/30 hover:bg-forest/60"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={scrollNext}
                      className="w-9 h-9 rounded-full border border-forest/20 flex items-center justify-center text-forest hover:bg-forest/8 transition-colors duration-200 cursor-pointer"
                      aria-label="Next"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Case study + Services */}
            <div className="max-w-5xl mx-auto px-6 lg:px-12 pt-10 pb-20">
              <div className="grid grid-cols-1 lg:grid-cols-[560px_200px] gap-12 lg:gap-24 items-start">

                {/* Case study */}
                <div>
                  {project.caseStudy && project.caseStudy.length > 0 ? (
                    <div className="space-y-10">
                      {project.caseStudy.map((block, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, root: modalRef, margin: "-60px" }}
                          transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
                        >
                          {block.heading && (
                            <h3 className="font-display font-semibold text-[1.15rem] text-forest mb-3">
                              {block.heading}
                            </h3>
                          )}
                          <p className="font-sans text-[1.1rem] text-forest/70 leading-relaxed">
                            {renderText(block.text, block.links)}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-forest/25 font-sans text-sm italic">
                      Case study coming soon.
                    </p>
                  )}

                  {/* Visit Website — mobile only, after case study */}
                  {project.url && (
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, root: modalRef }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="sm:hidden inline-flex items-center gap-2 mt-10 bg-forest hover:bg-forest/85 text-white rounded-full px-7 h-11 text-sm font-sans transition-colors duration-300"
                    >
                      Visit Website <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only">(opens in new tab)</span>
                    </motion.a>
                  )}
                </div>

                {/* Services */}
                {project.services && project.services.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, root: modalRef, margin: "-60px" }}
                    transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                    className="border-l border-forest/20 pl-8"
                  >
                    <p className="text-[0.75rem] uppercase tracking-[0.18em] text-forest font-semibold font-sans mb-4">
                      Services
                    </p>
                    <ul className="space-y-2.5">
                      {project.services.map(s => (
                        <li key={s} className="text-[0.95rem] text-forest/70 font-sans">{s}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Image lightbox with swipeable carousel ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="fixed inset-0 z-[300] bg-black/93"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute top-5 left-5 text-white/50 text-sm font-sans z-10 pointer-events-none">
                {lightboxCurrentIndex + 1} / {images.length}
              </div>
            )}

            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/12 hover:bg-white/22 flex items-center justify-center text-white transition-colors duration-200 cursor-pointer z-10"
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>

            {/* Swipeable carousel — stopPropagation so swipes don't close the lightbox */}
            <div
              className="absolute inset-0 flex items-center"
              onClick={e => e.stopPropagation()}
            >
              <div ref={lightboxEmblaRef} className="overflow-hidden w-full">
                <div className="flex">
                  {images.map((src, i) => (
                    <div key={i} className="flex-[0_0_100%] flex items-center justify-center px-4 py-16">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`${project?.title} — ${i + 1}`}
                        width={2432}
                        height={1368}
                        className="max-h-[80vh] max-w-full object-contain rounded-xl"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dot indicators */}
            {images.length > 1 && (
              <div
                className="absolute bottom-7 left-0 right-0 flex justify-center gap-1.5"
                onClick={e => e.stopPropagation()}
              >
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => lightboxEmblaApi?.scrollTo(i)}
                    aria-label={`Image ${i + 1}`}
                    className={`rounded-full transition-all duration-250 cursor-pointer ${
                      i === lightboxCurrentIndex
                        ? "w-5 h-1.5 bg-white"
                        : "w-1.5 h-1.5 bg-white/35 hover:bg-white/65"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
