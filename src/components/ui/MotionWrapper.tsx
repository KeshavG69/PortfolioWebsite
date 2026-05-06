"use client"

import * as React from "react"
import { motion, type HTMLMotionProps, type Variants, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * MotionWrapper — refined per Emil's framework:
 *   • Custom easing curves (the built-in CSS easings are too weak for UI)
 *   • Short durations (UI motion stays under 300ms)
 *   • Translate values are small (≤10px) so they read as "settling in," not "flying in"
 *   • No scale(0) entries — nothing in the real world appears from nothing
 */

// Strong ease-out — starts fast, decelerates. Most appropriate for entries.
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

interface MotionWrapperProps
  extends Omit<HTMLMotionProps<"div">, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  children: React.ReactNode
  delay?: number
  variant?: "fadeUp" | "fadeIn" | "slideRight" | "scale"
  once?: boolean
}

const VARIANTS: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE_OUT } },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: EASE_OUT } },
  },
  slideRight: {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: EASE_OUT } },
  },
  scale: {
    // Start at 0.97, not 0 — feels like settling, not magic.
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.28, ease: EASE_OUT },
    },
  },
}

export function MotionWrapper({
  children,
  delay = 0,
  variant = "fadeUp",
  once = true,
  className,
  ...props
}: MotionWrapperProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once, margin: "-10% 0px" })

  return (
    <motion.div
      ref={ref}
      variants={VARIANTS[variant]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface MotionStaggerGroupProps
  extends Omit<HTMLMotionProps<"div">, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  children: React.ReactNode
  /** Delay between children, ms. Keep short (40–80ms) per Emil — long stagger feels slow. */
  staggerMs?: number
  once?: boolean
}

export function MotionStaggerGroup({
  children,
  className,
  staggerMs = 60,
  once = true,
  ...props
}: MotionStaggerGroupProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once, margin: "-10% 0px" })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerMs / 1000 },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
