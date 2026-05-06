import { Button } from "@/components/ui/button"
import { Container, Section } from "@/components/ui/layout-components"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { TimelineItem } from "@/components/ui/Timeline"
import { MotionWrapper, MotionStaggerGroup } from "@/components/ui/MotionWrapper"
import { ContactFormDialog } from "@/components/ui/ContactForm"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

// ─────────────────────────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────────────────────────

const APPROACH = [
  {
    title: "Production from day one",
    body:
      "I don't ship demos. Every system goes out with auth, observability, error recovery, and a deployment story. The first week of every engagement is the hardest and the most important.",
  },
  {
    title: "Domain first, model second",
    body:
      "Most AI projects fail because no one understood the domain. Before I write code I read your docs, your contracts, your past proposals — whatever the model will eventually have to reason over.",
  },
  {
    title: "Owned end-to-end",
    body:
      "Frontend, backend, agent orchestration, retrieval, deployment, QA. You hire one person and get a working system, not a slack channel of handoffs.",
  },
]

const FREELANCE_PROJECTS = [
  {
    eyebrow: "Client work · 2025 — Present · Enterprise SaaS",
    title: "Complex Bid & Pricing Platform",
    blurb:
      "A multi-tenant SaaS that lets enterprise teams generate competitive RFP responses and detailed cost estimates from historical performance, rate cards, and labor benchmarks.",
    bullets: [
      "Multi-agent authoring: agents handle parsing the inbound RFP, drafting technical narratives, computing labor and indirect-rate calculations, vendor analysis, and Excel export",
      "Multi-tenant from day one — organizations, workspaces, role-based invitations, SOC-aligned pages, Stripe billing with webhooks",
      "Company repository: ingests historical proposals and capability statements so each new bid starts with the org's voice, not a generic template",
      "Pricing-chat surface: natural-language queries against rate cards, escalation tables, and competitor pricing",
    ],
    metric: { value: "95%", label: "Manual proposal effort eliminated" },
    tags: ["Agno", "LangGraph", "FastAPI", "Next.js", "PostgreSQL", "Stripe"],
    cta: "Read the case study",
  },
  {
    eyebrow: "Client work · 2025 — Present · Voice-first knowledge platform",
    title: "Knowledge Management Platform with Voice Agent",
    blurb:
      "A retrieval-augmented knowledge platform with a voice-first interface. Teams ingest PDFs, recorded sessions, and YouTube videos, then query them by speaking — like calling a colleague who's read everything you have.",
    bullets: [
      "LiveKit voice agent stack: Claude Haiku 4.5 (OpenRouter) + Deepgram Nova-3 STT + Cartesia Sonic-2 TTS + Silero VAD + LiveKit BVC noise cancellation, with per-participant document scoping via room metadata",
      "Multimodal ingestion: PDFs (Markitdown), videos (yt-dlp + transcript chunking), images (vision extraction). Vector index in Pinecone, blob storage on iDrive E2",
      "Auto-generated mind maps and podcast summaries — derived artifacts that turn dense source docs into something a human can actually skim",
      "Agent memory persists across sessions so follow-up questions don't restart the conversation from zero",
    ],
    metric: { value: "Voice-first", label: "Conversational retrieval over private docs" },
    tags: ["LiveKit Agents", "Deepgram", "Cartesia", "Pinecone", "MongoDB", "Claude Haiku"],
    cta: "Read the case study",
  },
]

const LAB_PROJECTS = [
  {
    title: "Ra.One — AI WhatsApp Assistant",
    blurb:
      "A human-feeling WhatsApp assistant on LangGraph. Dual-memory architecture (PostgreSQL for short-term turns, Pinecone for long-term semantic recall), Groq inference, and ElevenLabs voice replies for multimodal back-and-forth.",
    tags: ["LangGraph", "Pinecone", "Groq", "ElevenLabs"],
    href: "https://github.com/KeshavG69/RaOne",
    cta: "GitHub",
  },
  {
    title: "Enterprise Support Automation",
    blurb:
      "An autonomous LangGraph agent that scrapes a help center via Selenium, embeds 100+ articles, and resolves user queries end-to-end with verification on top of generation.",
    metric: { value: "80%", label: "Manual support workload removed" },
    tags: ["LangGraph", "Selenium", "RAG"],
    href: "https://doodash.streamlit.app",
    cta: "Live demo",
  },
  {
    title: "LegalInsight — Document Analysis",
    blurb:
      "Privacy-first legal-doc platform using RAPTOR for hierarchical summarization and chat-with-PDF on local Ollama LLMs. PyMuPDF4LLM extraction keeps the chunking faithful to the source structure.",
    metric: { value: "70%", label: "Faster legal review" },
    tags: ["RAPTOR", "Ollama", "FastAPI", "LangChain"],
    href: "https://legal-insight.streamlit.app",
    cta: "Live demo",
  },
]

const EXPERIENCE = [
  {
    role: "AI Engineer",
    company: "Kroolo",
    date: "Apr 2025 — Present",
    location: "Delhi, India",
    points: [
      "Architected and shipped a scalable Enterprise Search system from ground zero, owning the full MLOps backend lifecycle from ingestion to production deployment.",
      "Rebuilt the AI agent ecosystem with 250+ integrated tools, transforming brittle prompt-engineered chatbots into composable agentic workflows on LangGraph.",
      "Revamped the Chat-with-Anything multimodal ingestion module with stronger text-extraction algorithms — cut processing latency by 50%.",
      "Led technical design reviews and managed CI/CD production deployments on Docker and Kubernetes.",
    ],
  },
  {
    role: "AI Engineer",
    company: "GenAI Protos",
    type: "Contract",
    date: "Nov 2024 — Present",
    location: "Delhi, India",
    points: [
      "Engineered a multimodal Deep Research multi-agent framework hitting 97% factual-verification accuracy for misinformation detection on enterprise content workflows.",
      "Built an NLP2SQL RAG system at 98% query accuracy with automated chart generation, deployed as a production WhatsApp business-analytics agent.",
      "Delivered Enterprise Search and Legal Assistant systems on NVIDIA DGX Spark — fully local LLM inference for on-prem privacy compliance.",
      "Fine-tuned YOLO-based computer-vision models for real-time CCTV monitoring, eliminating manual surveillance workflows.",
    ],
  },
  {
    role: "AI / ML Intern",
    company: "Agnisys Technology",
    date: "May 2024 — Jul 2024",
    location: "Noida, India",
    points: [
      "Implemented a production RAG pipeline on a vector database — meaningful gains in retrieval accuracy and contextual response quality.",
      "Built an automated user-behavior analytics dashboard, removing manual data entry and cutting reporting time by 80%.",
    ],
  },
]

// ─────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen">
      {/* ───── Header ───── */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--color-bg)]/80 border-b border-[var(--color-border)]">
        <Container className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 group text-sm font-medium tracking-tight"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-accent)] dot-pulse" />
            <span>Keshav Garg</span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm text-[var(--color-fg-muted)]">
            <Link
              href="#work"
              className="hover:text-[var(--color-fg)] transition-colors [transition-duration:160ms]"
            >
              Work
            </Link>
            <Link
              href="#approach"
              className="hover:text-[var(--color-fg)] transition-colors [transition-duration:160ms]"
            >
              Approach
            </Link>
            <Link
              href="#experience"
              className="hover:text-[var(--color-fg)] transition-colors [transition-duration:160ms]"
            >
              Experience
            </Link>
            <Link
              href="#lab"
              className="hover:text-[var(--color-fg)] transition-colors [transition-duration:160ms]"
            >
              Lab
            </Link>
          </nav>

          <ContactFormDialog label="Get in touch" variant="outline" size="sm" />
        </Container>
      </header>

      <main className="flex-1 relative z-10">
        {/* ───── Hero ───── */}
        <Section className="border-b border-[var(--color-border)] py-20 md:py-32 lg:py-40">
          <Container>
            <MotionWrapper variant="fadeUp">
              <div className="flex items-center gap-2 mb-8">
                <span className="dot dot-pulse" />
                <span className="label">Available for new engagements · May 2026</span>
              </div>
            </MotionWrapper>

            <MotionWrapper variant="fadeUp" delay={0.06}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-semibold tracking-[-0.025em] leading-[0.95] text-[var(--color-fg)] mb-8 max-w-4xl">
                Independent AI engineer building
                <span className="text-[var(--color-fg-muted)]">
                  {" "}production systems for{" "}
                </span>
                <span className="text-[var(--color-accent)]">enterprise clients</span>
                <span className="text-[var(--color-fg-muted)]">.</span>
              </h1>
            </MotionWrapper>

            <MotionWrapper variant="fadeUp" delay={0.12}>
              <p className="text-lg md:text-xl text-[var(--color-fg-muted)] max-w-2xl leading-relaxed mb-10">
                Multi-agent workflows, RAG over messy domain data, and voice-first
                interfaces. I work end-to-end — architecture, code, deployment —
                so you ship a real system, not a prototype with a demo URL.
              </p>
            </MotionWrapper>

            <MotionWrapper variant="fadeUp" delay={0.18}>
              <div className="flex items-center gap-3">
                <ContactFormDialog label="Start a project" variant="default" size="default" />
                <Button variant="outline" size="default" asChild>
                  <a href="#work" className="no-underline">
                    See selected work
                  </a>
                </Button>
              </div>
            </MotionWrapper>
          </Container>
        </Section>

        {/* ───── Selected Work (case studies) ───── */}
        <Section id="work" className="border-b border-[var(--color-border)]">
          <Container>
            <SectionHeader
              eyebrow="Selected work"
              title="Two systems shipped this year."
              subtitle="Both still in production. Names withheld for client privacy — happy to share details on a call."
            />

            <MotionStaggerGroup className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-12">
              {FREELANCE_PROJECTS.map((p, i) => (
                <ProjectCard key={p.title} {...p} index={i} />
              ))}
            </MotionStaggerGroup>

            {/* Testimonial */}
            <MotionWrapper variant="fadeUp" className="mt-16">
              <figure className="surface rounded-lg p-8 md:p-10 max-w-3xl mx-auto">
                <blockquote className="text-xl md:text-2xl leading-relaxed text-[var(--color-fg)] tracking-tight">
                  &ldquo;What used to be 100% manual is now only 5% manual. The
                  expertise in agentic workflows significantly improved our
                  proposal quality.&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="dot" />
                  <span className="label">
                    Enterprise client · Pricing platform
                  </span>
                </figcaption>
              </figure>
            </MotionWrapper>
          </Container>
        </Section>

        {/* ───── Approach ───── */}
        <Section id="approach" className="border-b border-[var(--color-border)]">
          <Container>
            <SectionHeader
              eyebrow="Approach"
              title="How I work."
            />

            <MotionStaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12">
              {APPROACH.map((a, i) => (
                <MotionWrapper key={a.title} variant="fadeUp" delay={i * 0.05}>
                  <div className="flex flex-col gap-3">
                    <span className="label">0{i + 1}</span>
                    <h3 className="text-lg font-semibold tracking-tight text-[var(--color-fg)]">
                      {a.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
                      {a.body}
                    </p>
                  </div>
                </MotionWrapper>
              ))}
            </MotionStaggerGroup>
          </Container>
        </Section>

        {/* ───── Experience ───── */}
        <Section id="experience" className="border-b border-[var(--color-border)]">
          <Container>
            <SectionHeader
              eyebrow="Experience"
              title="Where I've shipped."
            />

            <div className="mt-10 max-w-4xl">
              {EXPERIENCE.map((exp, i) => (
                <MotionWrapper key={exp.company} variant="fadeUp" delay={i * 0.05}>
                  <TimelineItem {...exp} />
                </MotionWrapper>
              ))}
            </div>
          </Container>
        </Section>

        {/* ───── Lab / personal projects ───── */}
        <Section id="lab" className="border-b border-[var(--color-border)]">
          <Container>
            <SectionHeader
              eyebrow="Lab"
              title="Things I've built for myself."
              subtitle="Side projects where I tried new things — they're how I keep the toolkit current."
            />

            <MotionStaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
              {LAB_PROJECTS.map((p, i) => (
                <ProjectCard key={p.title} {...p} tags={p.tags} index={i} />
              ))}
            </MotionStaggerGroup>
          </Container>
        </Section>

        {/* ───── Contact ───── */}
        <Section id="contact" className="border-none py-24 md:py-40">
          <Container className="max-w-3xl text-center">
            <MotionWrapper variant="fadeUp">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.025em] leading-tight text-[var(--color-fg)] mb-6">
                Have something to build?
              </h2>
            </MotionWrapper>

            <MotionWrapper variant="fadeUp" delay={0.06}>
              <p className="text-lg text-[var(--color-fg-muted)] mb-10 max-w-xl mx-auto leading-relaxed">
                Fixed-scope projects, fractional embeds, or 1–2 week architecture
                sprints. The best fit is when there's a real problem and a real
                deadline.
              </p>
            </MotionWrapper>

            <MotionWrapper variant="fadeUp" delay={0.12}>
              <div className="flex items-center justify-center gap-3">
                <ContactFormDialog label="Send me a note" variant="default" size="lg" />
                <Button variant="outline" size="lg" asChild>
                  <a
                    href="https://linkedin.com/in/keshavcodes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline inline-flex items-center gap-2"
                  >
                    LinkedIn
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </MotionWrapper>
          </Container>
        </Section>
      </main>

      {/* ───── Footer ───── */}
      <footer className="border-t border-[var(--color-border)] py-10 relative z-10">
        <Container className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-fg-subtle)]">
            © {new Date().getFullYear()} Keshav Garg
          </p>
          <div className="flex items-center gap-5 text-sm text-[var(--color-fg-muted)]">
            <a
              href="https://github.com/KeshavG69"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-accent)] transition-colors [transition-duration:160ms]"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/keshavcodes"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-accent)] transition-colors [transition-duration:160ms]"
            >
              LinkedIn
            </a>
            <a
              href="mailto:gargkeshav504@gmail.com"
              className="hover:text-[var(--color-accent)] transition-colors [transition-duration:160ms]"
            >
              Email
            </a>
          </div>
        </Container>
      </footer>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// SectionHeader — small reusable header to keep section openings consistent.
// Eyebrow + title + optional subtitle, all on a stagger.
// ─────────────────────────────────────────────────────────────────

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="max-w-3xl">
      <MotionWrapper variant="fadeUp">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-6 h-px bg-[var(--color-accent)]" />
          <span className="label">{eyebrow}</span>
        </div>
      </MotionWrapper>

      <MotionWrapper variant="fadeUp" delay={0.05}>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-tight text-[var(--color-fg)]">
          {title}
        </h2>
      </MotionWrapper>

      {subtitle && (
        <MotionWrapper variant="fadeUp" delay={0.1}>
          <p className="mt-4 text-base md:text-lg text-[var(--color-fg-muted)] leading-relaxed">
            {subtitle}
          </p>
        </MotionWrapper>
      )}
    </div>
  )
}
