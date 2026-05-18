"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const fillVariants = {
  rest:  { scaleX: 0 },
  hover: { scaleX: 1 },
};

const fillTransition = { duration: 0.65, ease: [0.12, 1, 0.25, 1] as const };

type OmitDrag<T> = Omit<T, "onDrag" | "onDragEnd" | "onDragStart" | "onDragEnter" | "onDragLeave" | "onDragOver" | "onDragCapture" | "onDragEndCapture" | "onDragEnterCapture" | "onDragLeaveCapture" | "onDragOverCapture" | "onDragStartCapture">;

interface LiquidButtonProps extends OmitDrag<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  fillColor: string;
}

export function LiquidButton({ fillColor, className, children, ...props }: LiquidButtonProps) {
  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: fillColor, transformOrigin: "left" }}
        variants={fillVariants}
        transition={fillTransition}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

interface LiquidAnchorProps extends OmitDrag<React.AnchorHTMLAttributes<HTMLAnchorElement>> {
  fillColor: string;
}

export function LiquidAnchor({ fillColor, className, children, ...props }: LiquidAnchorProps) {
  return (
    <motion.a
      initial="rest"
      whileHover="hover"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: fillColor, transformOrigin: "left" }}
        variants={fillVariants}
        transition={fillTransition}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
