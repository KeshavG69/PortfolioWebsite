import * as React from "react"
import { cn } from "@/lib/utils"

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  role: string
  company: string
  date: string
  points: string[]
}

export function TimelineItem({
  role,
  company,
  date,
  points,
  className,
  ...props
}: TimelineItemProps) {
  return (
    <div className={cn("relative pl-8 md:pl-0", className)} {...props}>
      {/* Desktop layout: Left (Date/Company), Middle (Line/Dot), Right (Content) */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 lg:gap-16">
        
        {/* Left side */}
        <div className="flex flex-col items-end text-right pt-1">
          <h3 className="text-xl font-bold uppercase">{role}</h3>
          <span className="text-neo-accent font-mono mt-1">{company}</span>
          <span className="text-sm text-neo-muted font-mono mt-2">{date}</span>
        </div>

        {/* Center Line & Dot */}
        <div className="relative flex flex-col items-center">
          <div className="h-full w-px bg-neo-border absolute top-0 bottom-0" />
          <div className="w-4 h-4 rounded-none bg-neo-bg border-2 border-neo-accent z-10 mt-2" />
        </div>

        {/* Right side */}
        <div className="flex flex-col gap-3 pb-16">
          {points.map((point, i) => (
            <p key={i} className="text-sm md:text-base leading-relaxed text-neo-fg/80">
              <span className="text-neo-accent mr-2">{"//"}</span>
              {point}
            </p>
          ))}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col pb-12">
        <div className="absolute left-0 top-2 bottom-0 w-px bg-neo-border" />
        <div className="absolute left-[-5px] top-3 w-3 h-3 bg-neo-bg border-2 border-neo-accent z-10" />
        
        <div className="mb-4">
          <h3 className="text-xl font-bold uppercase">{role}</h3>
          <div className="flex flex-wrap gap-2 items-center mt-1 font-mono text-sm">
             <span className="text-neo-accent">{company}</span>
             <span className="text-neo-muted hidden sm:inline">|</span>
             <span className="text-neo-muted">{date}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {points.map((point, i) => (
            <p key={i} className="text-sm leading-relaxed text-neo-fg/80">
              <span className="text-neo-accent mr-2">{"//"}</span>
              {point}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
