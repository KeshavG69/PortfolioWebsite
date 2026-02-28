"use client"

import * as React from "react"
import { motion, type HTMLMotionProps, type Variants, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

// Omit the onDrag props to avoid typing collisions between React.HTMLAttributes and Framer Motion's DOM elements
interface MotionWrapperProps extends Omit<HTMLMotionProps<"div">, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  children: React.ReactNode
  delay?: number
  variant?: "fadeUp" | "slideRight" | "staggerItem" | "scale" | "brutalPop"
  once?: boolean
}

const VARIANTS: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
  },
  brutalPop: {
    hidden: { opacity: 0, x: -10, y: 10, boxShadow: "0px 0px 0 0 #FF4500" },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      boxShadow: "8px 8px 0 0 #FF4500",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  },
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }
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

interface MotionStaggerGroupProps extends Omit<HTMLMotionProps<"div">, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  children: React.ReactNode
  delayDelay?: number
  once?: boolean
}

export function MotionStaggerGroup({
  children,
  className,
  delayDelay = 0.1,
  once = true,
  ...props
}: MotionStaggerGroupProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once, margin: "-10% 0px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delayDelay,
      }
    }
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
