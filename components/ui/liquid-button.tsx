"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const fillVariants = {
  rest:  { scaleX: 0 },
  hover: { scaleX: 1 },
};

const fillTransition = { duration: 0.65, ease: [0.12, 1, 0.25, 1] as const };

function Fill({ fillColor }: { fillColor: string }) {
  return (
    <motion.span
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ background: fillColor, transformOrigin: "left" }}
      variants={fillVariants}
      transition={fillTransition}
    />
  );
}

interface LiquidButtonProps {
  fillColor: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function LiquidButton({ fillColor, className, children, onClick, type, disabled }: LiquidButtonProps) {
  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      className={cn("relative overflow-hidden", className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <Fill fillColor={fillColor} />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

interface LiquidAnchorProps {
  fillColor: string;
  className?: string;
  children?: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function LiquidAnchor({ fillColor, className, children, href, onClick }: LiquidAnchorProps) {
  return (
    <motion.a
      initial="rest"
      whileHover="hover"
      className={cn("relative overflow-hidden", className)}
      href={href}
      onClick={onClick}
    >
      <Fill fillColor={fillColor} />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
