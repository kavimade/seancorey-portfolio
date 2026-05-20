"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-button";
import { ContactModal } from "@/components/ui/contact-modal";

export function Cta() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="contact"
        data-section-theme="dark"
        className="bg-forest pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-[calc(var(--spacing)*22)] lg:pb-36"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-left sm:text-center">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-[clamp(2.25rem,5vw,4.5rem)] text-white leading-[1.1] mb-8 max-w-3xl sm:mx-auto"
          >
            Have a project worth getting right?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[1.2rem] sm:text-[1.5rem] text-white/70 leading-relaxed font-sans max-w-2xl sm:mx-auto mb-12"
          >
            If you&apos;re working on something meaningful and want a thoughtful partner
            who understands both the technical and human side of building digital
            experiences, get in touch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <LiquidButton
              onClick={() => setModalOpen(true)}
              fillColor="color-mix(in srgb, var(--color-sage) 82%, var(--color-forest))"
              className="inline-flex items-center gap-2 bg-sage text-forest rounded-full px-10 h-12 text-base font-sans shadow-none cursor-pointer"
            >
              Let&apos;s work together <ArrowRight size={16} />
            </LiquidButton>
          </motion.div>
        </div>
      </section>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
