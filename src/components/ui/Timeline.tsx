import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * TimelineItem — clean two-column experience entry.
 *   • Date column (small, mono, aligned right on desktop)
 *   • Content column with role + company + bullets
 *   • A single hairline divider rather than the previous decorative dot+line
 *   • No "//" prefixes — let the typography do the work
 */

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  role: string
  company: string
  date: string
  location?: string
  type?: string                 // e.g. "Contract", "Full-time"
  points: string[]
}

export function TimelineItem({
  role,
  company,
  date,
  location,
  type,
  points,
  className,
  ...props
}: TimelineItemProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-12 py-8 md:py-10",
        "border-t border-[var(--color-border)]",
        className
      )}
      {...props}
    >
      {/* Left column — date + location */}
      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs text-[var(--color-fg-muted)] tabular-nums">
          {date}
        </span>
        {location && (
          <span className="font-mono text-xs text-[var(--color-fg-subtle)]">
            {location}
          </span>
        )}
        {type && (
          <span className="label mt-2">{type}</span>
        )}
      </div>

      {/* Right column — role / company / bullets */}
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-[var(--color-fg)] tracking-tight">
          {role}
          <span className="text-[var(--color-fg-muted)] font-normal"> · {company}</span>
        </h3>

        <ul className="mt-4 space-y-2.5">
          {points.map((point, i) => (
            <li
              key={i}
              className="text-[15px] leading-relaxed text-[var(--color-fg-muted)] pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.65em] before:w-1 before:h-1 before:rounded-full before:bg-[var(--color-fg-subtle)]"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
