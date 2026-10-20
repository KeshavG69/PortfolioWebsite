"use client"

import { useState } from "react"
import { sendEmailAction } from "@/app/actions/contact"

const EMAIL = "gargkeshav504@gmail.com"

/**
 * ContactForm — inline, not a modal: the note is a clause of the document,
 * filled in where it's read.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus("loading")
    const result = await sendEmailAction(null, new FormData(form))
    if (result.success) {
      setStatus("success")
      form.reset()
    } else {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border-2 border-[var(--color-ink)] p-6">
        <p className="font-display font-bold text-xl">Note received.</p>
        <p className="mt-2 text-[var(--color-ink-2)]">
          I&apos;ll reply within one working day.{" "}
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="underline cursor-pointer min-h-11"
          >
            Send another
          </button>
        </p>
      </div>
    )
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="grid gap-5" noValidate={false}>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Name" name="name" type="text" autoComplete="name" />
        <Field label="Work email" name="email" type="email" autoComplete="email" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-semibold">
          What are you building?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="A few sentences on the problem, the data, and the deadline."
          className="border-2 border-[var(--color-ink)] bg-[var(--color-paper)] px-3 py-2.5 text-base placeholder:text-[var(--color-ink-3)] resize-y focus:outline-none focus:border-[var(--color-accent)]"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-[#b00020] font-semibold">
          The note didn&apos;t send. Try again, or email{" "}
          <a href={`mailto:${EMAIL}`} className="underline">
            {EMAIL}
          </a>
          .
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="min-h-12 px-6 border-2 border-[var(--color-ink)] font-semibold hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-white transition-colors [transition-duration:140ms] disabled:opacity-60 disabled:cursor-wait cursor-pointer"
        >
          {status === "loading" ? "Sending…" : "Send note"}
        </button>
      </div>
    </form>
  )
}

function Field({
  label,
  name,
  type,
  autoComplete,
}: {
  label: string
  name: string
  type: string
  autoComplete: string
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="h-12 border-2 border-[var(--color-ink)] bg-[var(--color-paper)] px-3 text-base focus:outline-none focus:border-[var(--color-accent)]"
      />
    </div>
  )
}
