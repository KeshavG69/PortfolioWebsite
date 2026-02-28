import * as React from "react"
import { cn } from "@/lib/utils"

const Section = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <section
    ref={ref}
    className={cn("w-full py-12 md:py-24 lg:py-32 border-b border-neo-border", className)}
    {...props}
  />
))
Section.displayName = "Section"

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mx-auto w-full max-w-7xl px-4 md:px-6", className)}
    {...props}
  />
))
Container.displayName = "Container"

export { Section, Container }
