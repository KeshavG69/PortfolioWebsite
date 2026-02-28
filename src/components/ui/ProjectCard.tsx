import * as React from "react"
import { cn } from "@/lib/utils"
import { MotionWrapper } from "@/components/ui/MotionWrapper"

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  tags: string[]
  metric?: { value: string; label: string }
  type: "freelance" | "lab"
  index: number
}

export function ProjectCard({
  title,
  description,
  tags,
  metric,
  type,
  index,
  className,
  ...props
}: ProjectCardProps) {
  return (
    <MotionWrapper variant="brutalPop" delay={index * 0.1}>
      <div
        className={cn(
          "group relative flex flex-col neo-card overflow-hidden h-full",
          className
        )}
        {...props}
      >
        <span className="absolute top-4 right-4 font-mono text-4xl font-black text-neo-muted/20 select-none z-0">
          0{index + 1}.
        </span>

        <div className="relative z-10 flex flex-col p-6 md:p-8 flex-1">
          <div className="mb-8">
            <span className="inline-block px-2 py-1 text-xs font-mono font-bold uppercase tracking-wider bg-neo-fg text-neo-bg mb-4">
              {type === "freelance" ? "Client_Work" : "Experiment"}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 group-hover:text-neo-accent transition-colors">
              {title}
            </h3>
            <p className="text-neo-fg/80 leading-relaxed text-sm md:text-base">
              {description}
            </p>
          </div>

          {metric && (
            <div className="mt-auto mb-8 p-4 border-l-2 border-neo-accent bg-neo-accent/5">
              <span className="block text-3xl font-black text-neo-accent">
                {metric.value}
              </span>
              <span className="block text-xs font-mono text-neo-muted uppercase">
                {metric.label}
              </span>
            </div>
          )}

          <div className="mt-auto flex flex-wrap gap-2 pt-6 border-t border-neo-border/50">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-mono text-neo-muted border border-neo-border group-hover:border-neo-accent/50 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </MotionWrapper>
  )
}
