import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Section — vertical rhythm primitive.
 * No default border-bottom anymore — sections opt in via className so each
 * page can compose dividers as it likes.
 */
const Section = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <section
    ref={ref}
    className={cn("w-full py-16 md:py-24 lg:py-28", className)}
    {...props}
  />
))
Section.displayName = "Section"

/**
 * Container — fluid max-width with consistent gutters.
 */
const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mx-auto w-full max-w-6xl px-5 md:px-8", className)}
    {...props}
  />
))
Container.displayName = "Container"

export { Section, Container }
