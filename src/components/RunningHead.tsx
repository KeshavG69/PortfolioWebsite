"use client"

import { useEffect, useRef, useState } from "react"

/**
 * RunningHead — the document's running header.
 *   • Left: designation + the clause you're currently reading (scroll-spy),
 *     the way a printed standard repeats its clause reference at the top of each page.
 *   • Right: Contents (a disclosure, also the mobile nav) and the primary action.
 */

export interface Clause {
  id: string
  num: string
  title: string
}

export function RunningHead({
  clauses,
  bookingHref,
}: {
  clauses: Clause[]
  bookingHref: string
}) {
  const [current, setCurrent] = useState<Clause | null>(null)
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Scroll-spy: the last clause whose top has passed the header is "current".
  useEffect(() => {
    const els = clauses
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => !!el)
    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id)
          else visible.delete(e.target.id)
        }
        // Deepest visible clause wins: inside clause 2, show 2.2 rather than 2.
        const deepest = clauses.findLast((c) => visible.has(c.id))
        setCurrent(deepest ?? null)
      },
      { rootMargin: "-64px 0px -55% 0px" }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [clauses])

  // Contents panel: Esc closes and returns focus; outside click closes.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("mousedown", onClick)
    panelRef.current?.querySelector("a")?.focus()
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("mousedown", onClick)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-paper)] border-b-2 border-[var(--color-ink)]">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8 h-[var(--head-h)] flex items-center gap-4">
        <a
          href="#top"
          className="font-display font-bold text-[16px] tracking-[-0.01em] no-underline min-h-11 inline-flex items-center"
        >
          Keshav Garg
        </a>
        <span className="hidden sm:block h-5 w-px bg-[var(--color-rule)]" aria-hidden="true" />
        <p
          className="hidden sm:block flex-1 min-w-0 truncate text-sm text-[var(--color-ink-2)] tnum"
          aria-live="polite"
        >
          {current ? (
            <>
              {current.title}
            </>
          ) : (
            "AI engineer for regulated industries"
          )}
        </p>
        <span className="flex-1 sm:hidden" />

        <div className="relative">
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="contents-panel"
            onClick={() => setOpen((o) => !o)}
            className="min-h-11 px-3 text-sm font-semibold underline decoration-[var(--color-ink-3)] hover:decoration-[var(--color-ink)] cursor-pointer"
          >
            Contents
          </button>
          {open && (
            <div
              ref={panelRef}
              id="contents-panel"
              className="absolute right-0 top-[calc(100%+10px)] w-[min(88vw,360px)] bg-[var(--color-paper)] border-2 border-[var(--color-ink)] p-4"
            >
              <p className="font-display font-bold text-sm mb-2">Contents</p>
              <ol>
                {clauses.map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-2 min-h-11 py-2 text-[15px] no-underline hover:underline"
                    >
                                            <span>{c.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <a
          href={bookingHref}
          className="hidden md:inline-flex min-h-10 items-center px-4 bg-[var(--color-accent)] text-white text-sm font-semibold no-underline hover:bg-[var(--color-accent-deep)] transition-colors [transition-duration:140ms]"
        >
          Book an intro call
        </a>
      </div>
    </header>
  )
}
