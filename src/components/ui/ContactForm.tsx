"use client"

import { useState, useEffect } from "react"
import { Button } from "./button"
import { sendEmailAction } from "@/app/actions/contact"
import { X, Check } from "lucide-react"

/**
 * ContactFormDialog — refined to match the new design system.
 *   • Modal scales in from 0.97 (never 0 — Emil's rule)
 *   • Custom ease-out via the design-token easing variable
 *   • Backdrop fades in independently from the modal
 *   • Esc to dismiss; click-outside to dismiss
 *   • Inputs use subtle elevated surface with focus-ring on accent
 */

export function ContactFormDialog({
  label = "Get in touch",
  variant = "default",
  size = "default",
  className,
}: {
  label?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  // Esc to close
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen])

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!isOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = original }
  }, [isOpen])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    const formData = new FormData(e.currentTarget)
    const result = await sendEmailAction(null, formData)

    if (result.success) {
      setStatus("success")
      e.currentTarget.reset()
      setTimeout(() => {
        setIsOpen(false)
        setStatus("idle")
      }, 3500)
    } else {
      setStatus("error")
    }
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setIsOpen(true)}
      >
        {label}
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 fade-rise"
          onClick={(e) => {
            // Click on the backdrop (not modal itself) closes
            if (e.target === e.currentTarget) setIsOpen(false)
          }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="relative w-full max-w-lg surface rounded-xl p-7 md:p-8 shadow-2xl"
            style={{
              animation: "fade-rise 240ms var(--ease-out) both",
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 inline-flex items-center justify-center rounded-md text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-bg-overlay)] transition-colors [transition-duration:160ms] active:scale-[0.95]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3
              id="contact-title"
              className="text-2xl font-semibold tracking-tight text-[var(--color-fg)] mb-2"
            >
              Send a note
            </h3>
            <p className="text-sm text-[var(--color-fg-muted)] mb-6 leading-relaxed">
              Tell me what you're working on and what you'd like help with.
              I read every message and reply within a day.
            </p>

            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--color-accent-soft)] inline-flex items-center justify-center">
                  <Check className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-base font-medium text-[var(--color-fg)] mb-1">
                    Message sent.
                  </p>
                  <p className="text-sm text-[var(--color-fg-muted)]">
                    I&apos;ll get back to you shortly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Field
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                />
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs font-medium text-[var(--color-fg-muted)]"
                  >
                    Message
                  </label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="A few sentences about what you're trying to build."
                    className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md p-3 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 transition-[border-color,box-shadow] [transition-duration:160ms] [transition-timing-function:var(--ease-out)] resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 w-full"
                  size="default"
                >
                  {status === "loading" ? "Sending…" : "Send message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function Field({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string
  name: string
  type: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-xs font-medium text-[var(--color-fg-muted)]"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md px-3 h-10 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 transition-[border-color,box-shadow] [transition-duration:160ms] [transition-timing-function:var(--ease-out)]"
      />
    </div>
  )
}
