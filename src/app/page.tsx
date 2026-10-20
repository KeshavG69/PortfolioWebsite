import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { RunningHead, type Clause } from "@/components/RunningHead"
import { ContactForm } from "@/components/ContactForm"

// ─────────────────────────────────────────────────────────────────
// Booking link — TODO(keshav): paste your Calendly / Cal.com URL here.
// Until it's set, "Book an intro call" jumps to the contact clause.
// ─────────────────────────────────────────────────────────────────
const BOOKING_URL: string | null = null
const BOOKING_HREF = BOOKING_URL ?? "#next-step"
const EMAIL = "gargkeshav504@gmail.com"

// ─────────────────────────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────────────────────────

type Evidence = "solid" | "dashed"

const LEAD_SYSTEMS = [
  {
    id: "c2-1",
    num: "2.1",
    title: "Complex bid and pricing platform",
    client: "US government contractors",
    role: "Sole engineer",
    period: "2025 – present",
    statement:
      "A multi-tenant SaaS that lets government contractors produce competitive RFP responses and fully burdened cost estimates from historical performance, rate cards and labor benchmarks.",
    items: [
      "Agents parse the RFP, extract labor roles, match them to SOC codes with FAISS and price them against 6M+ BLS wage records.",
      "Price-to-Win analysis, a daily RFP Radar matched to each organization's capability profile, and IGCE vendor-bid comparison.",
      "Excel export on a feeder-sheet architecture with live formulas, Stripe billing, and per-run token-cost tracking.",
    ],
    result: {
      figure: "95 %",
      label: "of manual proposal effort eliminated",
      evidence: "Client statement; in production",
      weight: "solid" as Evidence,
    },
    stack: "Agno, FastAPI, Next.js, FAISS, MongoDB, Stripe",
  },
  {
    id: "c2-2",
    num: "2.2",
    title: "Adaptive data security agent for Microsoft 365",
    client: "Cybersecurity firm, Middle East",
    role: "Lead engineer",
    period: "2026",
    statement:
      "An agent that classifies sensitive documents across SharePoint, Teams and Exchange and triages data-loss alerts, with a human approving every action.",
    items: [
      "Ingests DLP alerts from Purview, Defender and Forcepoint, then normalizes, deduplicates and correlates them into cases.",
      "Purview auto-labeling handles the bulk; an LLM gives a targeted second opinion from content, sharing exposure and prior decisions on the same file.",
      "Azure AI Foundry with Entra ID SSO, managed identities, Bicep infrastructure and a Trivy-gated pipeline.",
    ],
    result: {
      figure: "7×",
      label: "fewer cases to open after correlation",
      evidence: "Demo data set: 15 alerts became 2 cases",
      weight: "dashed" as Evidence,
    },
    stack: "Azure AI Foundry, Microsoft Graph, Purview, FastAPI, Cosmos DB, React",
  },
  {
    id: "c2-3",
    num: "2.3",
    title: "Operational knowledge system for field teams",
    client: "Defense contractor, US",
    role: "Sole engineer",
    period: "2026 – present",
    statement:
      "Documents, audio and video become a cited knowledge graph that analysts and field teams query by typing, speaking, talking to an avatar, or in VR.",
    items: [
      "Local GLiNER and GLiREL entity and relation extraction, entity resolution, and hybrid graph + vector retrieval over FalkorDB and Pinecone.",
      "A LiveKit voice agent, a talking-avatar concierge, and a Meta Quest VR mode with hand-gesture control.",
      "Keycloak multi-org access with per-role document scoping.",
    ],
    result: {
      figure: "8",
      label: "output formats generated from one source library",
      evidence: "Shipped capability: audio overviews, mind maps, reports, flashcards, quizzes, infographics, slides, video",
      weight: "dashed" as Evidence,
    },
    stack: "Agno, LiveKit, FalkorDB, Pinecone, GLiNER, Keycloak, Next.js",
  },
]

const FURTHER_SYSTEMS = [
  {
    id: "c3-1",
    num: "3.1",
    title: "Pallet-rack inspection from a photo",
    client: "Warehouse safety",
    body:
      "Boxes rack damage in a photo and grades it GREEN, AMBER or RED under SEMA / EN 15635, ANSI MH16.1 or AS 4084. A fine-tuned EfficientNetV2 + ConvNeXt ensemble on an NVIDIA DGX Spark gives a fast prior; a vision-language model gives the verdict, at about $0.0025 per photo.",
    figure: "92 %",
    label: "recall on failing (RED) racks",
    evidence: "Held-out test set, n = 225; 86.7 % accuracy",
    weight: "solid" as Evidence,
  },
  {
    id: "c3-2",
    num: "3.2",
    title: "Uzbek-speaking voice banking assistant",
    client: "Retail bank, Central Asia",
    body:
      "A real-time voice agent for the bank's customers, with switchable Gemini Live, OpenAI Realtime, ElevenLabs and Azure Speech pipelines, voices swappable mid-call, and self-hosted Uzbek speech models.",
    figure: "3",
    label: "languages: Uzbek, Russian, English",
    evidence: "Shipped capability",
    weight: "dashed" as Evidence,
  },
  {
    id: "c3-3",
    num: "3.3",
    title: "Cite-or-refuse compliance assistant",
    client: "Banking, Austria",
    body:
      "Answers regulatory questions only from EUR-Lex and the Austrian RIS, with article-level deep links. A guard before the agent rejects off-topic questions; a guard after it rejects any answer without a citation.",
    figure: "13",
    label: "EU regulations mapped to Austrian law",
    evidence: "DORA, MiFID II, GDPR, EU AI Act, AMLD6, PSD2 and others",
    weight: "dashed" as Evidence,
  },
]

const OTHER_DELIVERIES = [
  {
    title: "Autonomous marketing studio",
    body: "Daily planner and analyst agents script, render, fact-check and post presenter-led videos and carousels to four platforms under a hard per-brand spend cap.",
  },
  {
    title: "GovCon capture console",
    body: "Agents read full SAM.gov solicitations alongside Outlook and SharePoint history, make bid / no-bid calls with evidence, and draft a ranked daily outreach plan.",
  },
  {
    title: "On-prem inference gateway",
    body: "One OpenAI-compatible gateway over ~23 self-hosted speech, language and vision models on an NVIDIA DGX Spark, for clients who can't send data out.",
  },
  {
    title: "Construction drawing classifier",
    body: "Reads full architectural drawing sets and scores each job against the client's build-type rules, writing results to Dataverse. Azure, Bicep, managed identity only.",
  },
  {
    title: "Document sanitization agent",
    body: "Strips client-identifying details from Word, PowerPoint and Excel files against 14 mandatory rules, inferring the client's name and aliases on its own.",
  },
  {
    title: "Same-not-similar virtual try-on",
    body: "Changes only the outfit, keeping face, pose and background identical, for a bridal-wear brand. Seven image models benchmarked; about $0.05 per image.",
  },
]

const PRINCIPLES = [
  {
    num: "4.1",
    title: "Production from day one",
    shall: "Every system shall ship with auth, observability, error recovery and a deployment story.",
    body: "I don't ship demos. The first week of every engagement is the hardest and the most important.",
  },
  {
    num: "4.2",
    title: "Domain first, model second",
    shall: "Before writing code, I shall read what the model will have to reason over.",
    body: "Most AI projects fail because no one understood the domain: your documents, your contracts, your past proposals.",
  },
  {
    num: "4.3",
    title: "Owned end to end",
    shall: "One engineer shall own frontend, backend, agents, retrieval, deployment and QA.",
    body: "You hire one person and get a working system, not a Slack channel of handoffs.",
  },
]

const ENGAGEMENTS = [
  {
    org: "Kroolo",
    role: "AI Engineer",
    period: "Apr 2025 – present",
    scope:
      "Main author of MARS, a multi-agent retrieval system with sub-agents for 14 enterprise connectors. Shipped Live Dashboards that refresh in ~100 ms with no LLM call, an agent ecosystem of 250+ tools with sandboxed analysis and human approvals, and 50 % lower Chat-with-Anything latency.",
  },
  {
    org: "GenAI Protos",
    role: "AI Engineer, contract",
    period: "Nov 2024 – Apr 2025",
    scope:
      "A multimodal deep-research framework at 97 % factual-verification accuracy, NL2SQL analytics on WhatsApp at 98 % query accuracy, enterprise search and legal assistants running fully on-prem on NVIDIA DGX Spark, and fine-tuned YOLO models for real-time CCTV monitoring.",
  },
  {
    org: "Agnisys Technology",
    role: "AI / ML Intern",
    period: "May – Jul 2024",
    scope:
      "A production RAG pipeline on a vector database, and an analytics dashboard that cut reporting time by 80 %.",
  },
]

const REFERENCES = [
  { group: "Agents", items: "Agno; LangGraph; Microsoft Agent Framework" },
  { group: "Retrieval and graphs", items: "Pinecone; FalkorDB; FAISS; GLiNER" },
  { group: "Voice", items: "LiveKit Agents; Deepgram; Cartesia; ElevenLabs; Azure Speech" },
  { group: "Models and inference", items: "Claude; Gemini; GPT; vLLM; NVIDIA DGX Spark" },
  { group: "Platforms", items: "Azure AI Foundry; Microsoft Graph; FastAPI; Next.js; Kubernetes" },
  { group: "Standards and regulation", items: "EN 15635; ANSI MH16.1; AS 4084; DORA; GDPR; EU AI Act" },
]

const INDEPENDENT_WORK = [
  {
    title: "Edge Vision",
    body: "Fully local real-time video alerts: a 3B decision model scores every alert rule in one pass, gated by YOLO, with a five-model benchmark harness.",
  },
  {
    title: "Sentinel",
    body: "A private, local memory of your screen. Gemma 4 on MLX turns each capture into a structured note; the screenshot never touches disk.",
    href: "https://github.com/KeshavG69/Gemma-4",
    link: "Source",
  },
  {
    title: "Speech-native voice agent",
    body: "Raw audio straight into Gemma 4 through a custom LiveKit audio bridge, skipping speech-to-text entirely.",
    href: "https://github.com/KeshavG69/Livekit-Agents",
    link: "Source",
  },
  {
    title: "Ra.One",
    body: "A WhatsApp assistant on LangGraph with two-tier memory (PostgreSQL turns, Pinecone recall) and ElevenLabs voice replies.",
    href: "https://github.com/KeshavG69/Raone",
    link: "Source",
  },
  {
    title: "Ask-AI",
    body: "A drop-in support widget that answers only from a customer's own site, crawling pages, sitemaps, llms.txt and PDFs on demand.",
    href: "https://navianai.vercel.app",
    link: "Live demo",
  },
  {
    title: "LegalInsight",
    body: "Legal-document analysis with RAPTOR hierarchical summarization and chat-with-PDF on local Ollama models.",
    href: "https://github.com/KeshavG69/LegalInsight",
    link: "Source",
  },
]

const RESULTS_TABLE = [
  ...LEAD_SYSTEMS.map((s) => ({ id: s.id, num: s.num, title: s.title, ...s.result })),
  // The compliance assistant (3.3) stays in Further systems but is kept off the first screen.
  ...FURTHER_SYSTEMS.filter((s) => s.id !== "c3-3").map((s) => ({
    id: s.id,
    num: s.num,
    title: s.title,
    figure: s.figure,
    label: s.label,
    evidence: s.evidence,
    weight: s.weight,
  })),
]

const CLAUSES: Clause[] = [
  { id: "scope", num: "1", title: "Scope" },
  { id: "lead-systems", num: "2", title: "Lead systems" },
  ...LEAD_SYSTEMS.map((s) => ({ id: s.id, num: s.num, title: s.title })),
  { id: "further-systems", num: "3", title: "Further systems" },
  { id: "principles", num: "4", title: "Principles" },
  { id: "engagements", num: "5", title: "Engagements" },
  { id: "references", num: "6", title: "Tools and standards" },
  { id: "independent-work", num: "7", title: "Independent work" },
  { id: "next-step", num: "8", title: "Next step" },
]

// ─────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div id="top">
      <RunningHead clauses={CLAUSES} bookingHref={BOOKING_HREF} />

      <main>
        {/* ───── Cover ───── */}
        <section aria-labelledby="cover-title">
          <div className="mx-auto max-w-[1240px] px-4 md:px-8 pt-14 pb-12 md:pt-20 md:pb-16 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-12 lg:gap-16">
            <div>
              <h1
                id="cover-title"
                className="font-display font-bold tracking-[-0.03em] leading-[0.98] text-[clamp(3rem,6.2vw,5.25rem)]"
              >
                Keshav Garg
              </h1>
              <p className="mt-5 font-display font-semibold tracking-[-0.015em] leading-[1.2] text-[clamp(1.375rem,2.2vw,1.875rem)] max-w-[22ch] text-balance">
                AI engineer for regulated industries.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-ink-2)] max-w-[34rem] text-pretty">
                I build production AI for security, banking, government contracting and defense
                teams: multi-agent workflows, retrieval and knowledge graphs over messy documents,
                voice agents, and on-prem inference. I own the whole system, from architecture to
                deployment, so you ship something real, not a prototype with a demo URL.
              </p>
              <p className="mt-3 text-[15px] text-[var(--color-ink-3)]">Based in Delhi, India · works remotely</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={BOOKING_HREF}
                  className="inline-flex min-h-12 items-center px-6 bg-[var(--color-accent)] text-white font-semibold no-underline hover:bg-[var(--color-accent-deep)] transition-colors [transition-duration:140ms]"
                >
                  Book an intro call
                </a>
                <a
                  href="#next-step"
                  className="inline-flex min-h-11 items-center font-semibold text-[var(--color-accent)] underline decoration-[var(--color-accent)]/40 hover:decoration-[var(--color-accent)]"
                >
                  Or send a note
                </a>
              </div>
            </div>

            <ResultsTable />
          </div>

        </section>

        {/* ───── 1 Scope ───── */}
        <ClauseSection id="scope" title="Scope">
          <div className="max-w-[68ch] space-y-5 text-lg leading-relaxed">
            <p>
              This page specifies what I build and how I build it. It applies to multi-agent
              workflows, retrieval over messy domain data, voice agents and on-prem inference,
              delivered into production in regulated domains: cybersecurity, banking, government
              contracting and defense.
            </p>
            <p className="text-[var(--color-ink-2)]">
              Engagements take three forms: fixed-scope projects, fractional embeds, and one-to-two
              week architecture sprints. The best fit is a real problem with a real deadline.
              Clients are described by sector and region, never by name.
            </p>
          </div>
        </ClauseSection>

        {/* ───── 2 Lead systems ───── */}
        <ClauseSection id="lead-systems" title="Lead systems">
          <div className="space-y-16 md:space-y-20">
            {LEAD_SYSTEMS.map((s, i) => (
              <article key={s.id} id={s.id} aria-labelledby={`${s.id}-title`}>
                <h3
                  id={`${s.id}-title`}
                  className="font-display font-bold text-[clamp(1.5rem,2.6vw,2rem)] tracking-[-0.02em] leading-tight flex gap-4"
                >
                  <span className="text-balance">{s.title}</span>
                </h3>

                <div className="mt-6 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-14">
                  <div>
                    <p className="text-lg leading-relaxed max-w-[64ch]">{s.statement}</p>
                    <ol className="bullets mt-5 space-y-3 max-w-[64ch] text-[var(--color-ink-2)] leading-relaxed">
                      {s.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                    <p className="mt-6 text-[15px] text-[var(--color-ink-3)] max-w-[64ch]">
                      Stack: {s.stack}
                    </p>
                  </div>

                  <aside aria-label={`${s.title} details`} className="lg:pt-1">
                    <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-[15px] border-t-2 border-[var(--color-ink)] pt-4">
                      <dt className="text-[var(--color-ink-3)]">Client</dt>
                      <dd>{s.client}</dd>
                      <dt className="text-[var(--color-ink-3)]">Role</dt>
                      <dd>{s.role}</dd>
                      <dt className="text-[var(--color-ink-3)]">Period</dt>
                      <dd className="tnum">{s.period}</dd>
                    </dl>
                    <div className="mt-6 border-2 border-[var(--color-ink)] p-5">
                      <p className="text-sm font-semibold">Result</p>
                      <p className="mt-2 font-display wide font-extrabold text-[3.25rem] leading-none tracking-[-0.03em] tnum text-[var(--color-accent)]">
                        <span className={s.result.weight === "solid" ? "evidence-solid" : "evidence-dashed"}>
                          {s.result.figure}
                        </span>
                      </p>
                      <p className="mt-3 font-semibold leading-snug">{s.result.label}</p>
                      <p className="mt-2 text-sm text-[var(--color-ink-3)] leading-snug">{s.result.evidence}</p>
                    </div>
                  </aside>
                </div>

                {i === 0 && (
                  <figure className="mt-12 border-y-2 border-[var(--color-ink)] py-8 md:py-10">
                    <blockquote className="font-display font-semibold text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.2] tracking-[-0.02em] max-w-[30ch] text-balance">
                      &ldquo;What used to be 100 % manual is now only 5 % manual. The expertise in
                      agentic workflows significantly improved our proposal quality.&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 text-[15px] text-[var(--color-ink-2)]">
                      Enterprise client · bid and pricing platform
                    </figcaption>
                  </figure>
                )}
              </article>
            ))}
          </div>
        </ClauseSection>

        {/* ───── 3 Further systems ───── */}
        <ClauseSection id="further-systems" title="Further systems">
          <div className="divide-y divide-[var(--color-rule)] border-y-2 border-[var(--color-ink)]">
            {FURTHER_SYSTEMS.map((s) => (
              <article
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-title`}
                className="py-8 grid md:grid-cols-[minmax(0,1fr)_220px] gap-6 md:gap-12"
              >
                <div>
                  <h3 id={`${s.id}-title`} className="font-display font-bold text-xl md:text-2xl tracking-[-0.015em] flex gap-4">
                    <span>{s.title}</span>
                  </h3>
                  <p className="mt-1 text-[15px] text-[var(--color-ink-3)]">{s.client}</p>
                  <p className="mt-3 leading-relaxed text-[var(--color-ink-2)] max-w-[64ch]">{s.body}</p>
                </div>
                <div className="md:text-right">
                  <p className="font-display wide font-extrabold text-[2.5rem] leading-none tracking-[-0.03em] tnum text-[var(--color-accent)]">
                    <span className={s.weight === "solid" ? "evidence-solid" : "evidence-dashed"}>{s.figure}</span>
                  </p>
                  <p className="mt-2 font-semibold leading-snug">{s.label}</p>
                  <p className="mt-1 text-sm text-[var(--color-ink-3)] leading-snug">{s.evidence}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14">
            <h3 className="font-display font-bold text-xl md:text-2xl tracking-[-0.015em] flex gap-4">
              <span>Other deliveries</span>
            </h3>
            <ol className="bullets mt-6 grid md:grid-cols-2 gap-x-14 gap-y-6">
              {OTHER_DELIVERIES.map((d) => (
                <li key={d.title} className="leading-relaxed">
                  <span className="font-semibold">{d.title}.</span>{" "}
                  <span className="text-[var(--color-ink-2)]">{d.body}</span>
                </li>
              ))}
            </ol>
          </div>
        </ClauseSection>

        {/* ───── 4 Principles ───── */}
        <ClauseSection id="principles" title="Principles">
          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {PRINCIPLES.map((p) => (
              <div key={p.num} className="border-t-2 border-[var(--color-ink)] pt-5">
                <h3 className="font-display font-bold text-xl tracking-[-0.015em]">
                  {p.title}
                </h3>
                <p className="mt-4 text-lg font-semibold leading-snug">{p.shall}</p>
                <p className="mt-3 leading-relaxed text-[var(--color-ink-2)]">{p.body}</p>
              </div>
            ))}
          </div>
        </ClauseSection>

        {/* ───── 5 Engagements ───── */}
        <ClauseSection id="engagements" title="Engagements">
          <p className="max-w-[68ch] text-lg leading-relaxed text-[var(--color-ink-2)]">
            Ongoing engagements run alongside direct client work.
          </p>
          <table className="mt-8 w-full border-collapse text-left">
                        <thead className="hidden md:table-header-group">
              <tr className="border-y-2 border-[var(--color-ink)] bg-[var(--color-paper-2)]">
                <th scope="col" className="py-3 px-3 font-semibold w-[22%]">Organization</th>
                <th scope="col" className="py-3 px-3 font-semibold w-[17%]">Period</th>
                <th scope="col" className="py-3 px-3 font-semibold">Scope</th>
              </tr>
            </thead>
            <tbody>
              {ENGAGEMENTS.map((e) => (
                <tr
                  key={e.org}
                  className="block md:table-row border-b border-[var(--color-rule)] last:border-b-2 last:border-[var(--color-ink)] py-5 md:py-0 first:border-t-2 first:border-[var(--color-ink)] md:first:border-t-0"
                >
                  <th scope="row" className="block md:table-cell md:py-5 md:px-3 align-top text-left">
                    <span className="block font-display font-bold text-lg">{e.org}</span>
                    <span className="block font-normal text-[15px] text-[var(--color-ink-2)]">{e.role}</span>
                  </th>
                  <td className="block md:table-cell md:py-5 md:px-3 align-top text-[15px] tnum text-[var(--color-ink-2)] mt-1 md:mt-0">
                    {e.period}
                  </td>
                  <td className="block md:table-cell md:py-5 md:px-3 align-top leading-relaxed mt-3 md:mt-0 max-w-[72ch]">
                    {e.scope}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ClauseSection>

        {/* ───── 6 Normative references ───── */}
        <ClauseSection id="references" title="Tools and standards">
          <p className="max-w-[68ch] text-lg leading-relaxed text-[var(--color-ink-2)]">
            What the systems above are built with and built to.
          </p>
          <dl className="mt-8 grid md:grid-cols-[240px_1fr] border-t-2 border-[var(--color-ink)]">
            {REFERENCES.map((r) => (
              <div key={r.group} className="contents">
                <dt className="pt-4 md:pb-4 font-semibold md:border-b border-[var(--color-rule)]">{r.group}</dt>
                <dd className="pb-4 pt-1 md:pt-4 border-b border-[var(--color-rule)] text-[var(--color-ink-2)]">{r.items}</dd>
              </div>
            ))}
          </dl>
        </ClauseSection>

        {/* ───── 7 Independent work ───── */}
        <ClauseSection id="independent-work" title="Independent work">
          <p className="max-w-[68ch] text-lg leading-relaxed text-[var(--color-ink-2)]">
            Things I build on my own time to keep the toolkit current.
          </p>
          <ol className="bullets mt-8 grid md:grid-cols-2 gap-x-14 gap-y-6">
            {INDEPENDENT_WORK.map((w) => (
              <li key={w.title} className="leading-relaxed">
                <span className="font-semibold">{w.title}.</span>{" "}
                <span className="text-[var(--color-ink-2)]">{w.body}</span>{" "}
                {w.href && (
                  <a
                    href={w.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 font-semibold text-[var(--color-accent)] underline whitespace-nowrap"
                  >
                    {w.link}
                    <ArrowUpRight aria-hidden="true" className="w-4 h-4" strokeWidth={2.25} />
                  </a>
                )}
              </li>
            ))}
          </ol>
        </ClauseSection>

        {/* ───── 8 Next step ───── */}
        <ClauseSection id="next-step" title="Next step">
          <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-12 lg:gap-16">
            <div>
              <p className="font-display font-bold text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.1] tracking-[-0.025em] text-balance">
                Have something to build? Start with a call.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-[var(--color-ink-2)] max-w-[44ch]">
                Bring the problem, the data and the deadline. You&apos;ll leave the call knowing
                whether I&apos;m the right fit and what a first version would take.
              </p>
              <a
                href={BOOKING_HREF}
                className="mt-8 inline-flex min-h-12 items-center px-6 bg-[var(--color-accent)] text-white font-semibold no-underline hover:bg-[var(--color-accent-deep)] transition-colors [transition-duration:140ms]"
              >
                Book an intro call
              </a>

              <div className="mt-12 flex items-center gap-4">
                <Image
                  src="/keshav.jpg"
                  alt="Keshav Garg"
                  width={56}
                  height={56}
                  className="w-14 h-14 object-cover object-top"
                />
                <div className="text-[15px] leading-snug">
                  <p className="font-semibold">Keshav Garg</p>
                  <p className="text-[var(--color-ink-2)]">
                    <a href={`mailto:${EMAIL}`} className="text-[var(--color-accent)] underline">{EMAIL}</a>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-5">Or send a note</p>
              <ContactForm />
            </div>
          </div>
        </ClauseSection>
      </main>

      <footer className="border-t-2 border-[var(--color-ink)]">
        <div className="mx-auto max-w-[1240px] px-4 md:px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[15px]">
          <p className="text-[var(--color-ink-2)]">© 2026 Keshav Garg</p>
          <ul className="flex items-center gap-1 -ml-3 md:ml-0">
            <li><FooterLink href="https://github.com/KeshavG69">GitHub</FooterLink></li>
            <li><FooterLink href="https://linkedin.com/in/keshavcodes">LinkedIn</FooterLink></li>
            <li><FooterLink href={`mailto:${EMAIL}`}>Email</FooterLink></li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────

function ResultsTable() {
  return (
    <figure aria-labelledby="table-1-title" className="self-start">
      <figcaption id="table-1-title" className="font-semibold mb-3">
        Results
      </figcaption>
      <div className="h-0.5 bg-[var(--color-ink)]" />
      <ol>
        {RESULTS_TABLE.map((r, i) => (
          <li key={r.id} className="relative">
            <a
              href={`#${r.id}`}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 py-3 px-1 no-underline hover:bg-[var(--color-paper-2)] focus-visible:bg-[var(--color-paper-2)] transition-colors [transition-duration:120ms]"
            >
                            <span className="min-w-0">
                <span className="block font-semibold leading-snug">{r.title}</span>
                <span className="block text-sm text-[var(--color-ink-2)] leading-snug mt-0.5">{r.label}</span>
              </span>
              <span className="font-display wide font-extrabold text-[1.75rem] md:text-[2rem] leading-none tracking-[-0.03em] tnum text-right text-[var(--color-accent)]">
                <span className={r.weight === "solid" ? "evidence-solid" : "evidence-dashed"}>{r.figure}</span>
              </span>
            </a>
            <div
              className={`${i === RESULTS_TABLE.length - 1 ? "h-0.5 bg-[var(--color-ink)]" : "h-px bg-[var(--color-rule)]"}`}
            />
          </li>
        ))}
      </ol>
      <p className="mt-3 text-sm text-[var(--color-ink-3)] leading-snug">
        Solid underline: measured or client-reported. Dashed: demo data or a capability count.
      </p>
    </figure>
  )
}

function ClauseSection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="border-t-2 border-[var(--color-ink)]">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8 pt-12 pb-16 md:pt-16 md:pb-24 grid md:grid-cols-[140px_minmax(0,1fr)] gap-x-4 gap-y-8">
        <h2
          id={`${id}-heading`}
          className="font-display font-bold text-[clamp(2rem,3.6vw,3rem)] leading-none tracking-[-0.025em] md:col-span-2"
        >
          <span>{title}</span>
        </h2>
        <div className="md:col-start-2">{children}</div>
      </div>
    </section>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http")
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex min-h-11 items-center px-3 font-semibold underline decoration-[var(--color-ink-3)] hover:decoration-[var(--color-ink)]"
    >
      {children}
    </a>
  )
}
