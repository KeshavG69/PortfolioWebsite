import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Button — refined per Emil's framework:
 *   • transition only the properties that actually change (no `transition: all`)
 *   • custom ease-out curve instead of weak built-in easings
 *   • scale(0.97) on :active so the press feels real
 *   • durations under 200ms — buttons are pressed hundreds of times
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium",
    "rounded-md",
    "select-none cursor-pointer",
    "transition-[background-color,border-color,color,transform]",
    "[transition-duration:160ms]",
    "[transition-timing-function:var(--ease-out)]",
    "active:scale-[0.97]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary — high-contrast accent.
        default:
          "bg-[var(--color-accent)] text-[#0A0A0B] hover:bg-[#FF7A45]",
        // Secondary — quiet but legible.
        outline:
          "border border-[var(--color-border)] bg-transparent text-[var(--color-fg)] hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-border-hover)]",
        ghost:
          "text-[var(--color-fg)] hover:bg-[var(--color-bg-elevated)]",
        link:
          "text-[var(--color-accent)] underline-offset-4 hover:underline px-0 h-auto",
        destructive:
          "bg-red-600 text-white hover:bg-red-500",
        secondary:
          "bg-[var(--color-bg-elevated)] text-[var(--color-fg)] hover:bg-[var(--color-bg-overlay)] border border-[var(--color-border)]",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
