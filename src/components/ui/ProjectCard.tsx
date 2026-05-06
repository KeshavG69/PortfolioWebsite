"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { MotionWrapper } from "@/components/ui/MotionWrapper"
import { ArrowUpRight } from "lucide-react"

/**
 * ProjectCard — restrained card.
 *   • Subtle elevated surface (no heavy shadows)
 *   • hover-lift: translateY(-1px) + border tint, only on cursor devices
 *   • Active state via :active (scale 0.99) makes the whole card feel pressable
 *   • Stack: eyebrow → title → blurb → metric → tags → optional CTA
 */

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string                // e.g. "Client work · 2025"
  title: string
  blurb: string                   // 1–3 sentences max
  bullets?: string[]              // optional sub-points (used for case-study cards)
  metric?: { value: string; label: string }
  tags: string[]
  href?: string                   // if present, the whole card is a link
  cta?: string
  index?: number                  // for stagger delay
}

export function ProjectCard({
  eyebrow,
  title,
  blurb,
  bullets,
  metric,
  tags,
  href,
  cta,
  index = 0,
  className,
  ...props
}: ProjectCardProps) {
  const inner = (
    <article
      className={cn(
        "group relative h-full flex flex-col",
        "surface rounded-lg",
        "p-6 md:p-7",
        "hover-lift",
        // Press feedback when used as a link
        href && "active:scale-[0.995] transition-transform [transition-duration:140ms] [transition-timing-function:var(--ease-out)]",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <div className="label mb-5">{eyebrow}</div>
      )}

      <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--color-fg)] mb-3 leading-tight">
        {title}
      </h3>

      <p className="text-[15px] leading-relaxed text-[var(--color-fg-muted)] mb-5">
        {blurb}
      </p>

      {bullets && bullets.length > 0 && (
        <ul className="space-y-2 mb-6">
          {bullets.map((b) => (
            <li
              key={b}
              className="text-sm leading-relaxed text-[var(--color-fg-muted)] pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1 before:h-1 before:rounded-full before:bg-[var(--color-accent)]"
            >
              {b}
            </li>
          ))}
        </ul>
      )}

      {metric && (
        <div className="mb-6 flex items-baseline gap-3">
          <span className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--color-accent)] leading-none">
            {metric.value}
          </span>
          <span className="label">{metric.label}</span>
        </div>
      )}

      <div className="mt-auto pt-5 border-t border-[var(--color-border)] flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono text-[var(--color-fg-subtle)] px-2 py-1 rounded border border-[var(--color-border)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {(cta || href) && (
          <div className="flex items-center gap-1.5 text-sm text-[var(--color-fg-muted)] group-hover:text-[var(--color-accent)] transition-colors [transition-duration:160ms]">
            <span className="hidden md:inline">{cta ?? "View"}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform [transition-duration:200ms] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        )}
      </div>
    </article>
  )

  return (
    <MotionWrapper variant="fadeUp" delay={index * 0.06} className="h-full">
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="block h-full no-underline"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </MotionWrapper>
  )
}
