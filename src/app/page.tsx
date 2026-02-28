import { Button } from "@/components/ui/button"
import { Container, Section } from "@/components/ui/layout-components"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { TimelineItem } from "@/components/ui/Timeline"
import { MotionWrapper } from "@/components/ui/MotionWrapper"
import { ContactFormDialog } from "@/components/ui/ContactForm"
import Link from "next/link"
import Image from "next/image"

const FREELANCE_PROJECTS = [
  {
    title: "Govt RFP Document Generator",
    description: "Enterprise-grade AI-powered document generation system leveraging Multi-Agent Workflows and RAG architecture for government RFP bidding. Reduces manual effort by 95%.",
    tags: ["Multi-Agent Systems", "RAG Pipeline", "LLMs", "Agno"],
    metric: { value: "95%", label: "Automation achieved" },
    type: "freelance" as const
  }
]

const LAB_PROJECTS = [
  {
    title: "Ra.One - AI Personal Assistant",
    description: "Production-ready human-like AI WhatsApp assistant featuring sophisticated dual-memory architecture combining PostgreSQL for structured conversation history and Pinecone vector database.",
    tags: ["LangGraph", "LLMs", "Pinecone", "FastAPI"],
    metric: { value: "Real-time", label: "Contextual Processing" },
    type: "lab" as const
  },
  {
    title: "Enterprise Support Automation",
    description: "Intelligent autonomous AI support agent built with LangGraph Multi-Agent architecture and advanced web scraping pipeline using Selenium for automated knowledge base extraction.",
    tags: ["LangGraph", "RAG Pipeline", "Vector Search"],
    metric: { value: "80%", label: "Workload Reduction" },
    type: "lab" as const
  },
  {
    title: "LegalInsight - Legal AI Platform",
    description: "Advanced legal document analysis platform leveraging RAPTOR for hierarchical document understanding and multi-level summarization. Built with FastAPI microservices.",
    tags: ["RAPTOR", "LangChain", "Ollama", "FastAPI"],
    metric: { value: "70%", label: "Review Speed Increase" },
    type: "lab" as const
  }
]

const EXPERIENCE = [
  {
    role: "Contract AI Engineer",
    company: "GenAI Protos",
    date: "Nov 2024 - Present",
    points: [
      "Engineered production-grade multimodal Deep Research Multi-Agent System with 97% accuracy for fact-checking and misinformation detection.",
      "Developed NLP2SQL system leveraging RAG architecture and semantic parsing, achieving 98% query accuracy with automated chart generation.",
      "Leveraged NVIDIA DGX Spark for distributed model training and inference optimization, fine-tuning large language models."
    ]
  },
  {
    role: "AI Engineer",
    company: "Kroolo",
    date: "Apr 2025 - Present",
    points: [
      "Architected and built a scalable Enterprise Search system from ground zero, managing the full MLOps backend lifecycle.",
      "Rebuilt AI agent ecosystem with 250+ integrated tools and APIs, transforming basic prompt-engineered chatbots into sophisticated agentic workflows using LangGraph.",
      "Led technical design reviews, sprint planning, and managed full CI/CD production deployment using Docker and Kubernetes."
    ]
  },
   {
    role: "AI/ML Intern",
    company: "Agnisys Technology",
    date: "May 2024 - July 2024",
    points: [
      "Implemented production-ready Retrieval-Augmented Generation (RAG) pipeline using vector databases (ChromaDB/Pinecone).",
      "Created automated analytics dashboard leveraging user behavior data and web scraping, reducing processing time by 80%."
    ]
  }
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <header className="sticky top-0 z-50 w-full border-b neo-border bg-neo-bg/95 backdrop-blur supports-[backdrop-filter]:bg-neo-bg/60">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 rounded-none overflow-hidden border border-neo-border group-hover:border-neo-accent transition-colors">
               <Image 
                 src="/assets/profile-pic.png" 
                 alt="Keshav Garg" 
                 fill 
                 className="object-cover"
               />
            </div>
            <span className="font-mono text-xl font-bold tracking-tighter group-hover:text-neo-accent transition-colors">Keshav</span>
          </Link>
          <nav className="hidden md:flex gap-6 font-mono text-sm">
            <Link href="#expertise" className="hover:text-neo-accent transition-colors scroll-smooth">EXPERTISE</Link>
            <Link href="#freelance" className="hover:text-neo-accent transition-colors scroll-smooth">FREELANCE_WORK</Link>
            <Link href="#labs" className="hover:text-neo-accent transition-colors scroll-smooth">LABS</Link>
          </nav>
          <ContactFormDialog label="HIRE_ME" variant="outline" size="sm" />
        </Container>
      </header>

      <main className="flex-1">
        <Section className="pt-24 pb-12 md:pt-48 md:pb-32 border-b-[4px] border-neo-accent relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
          
          <Container className="relative z-10 flex flex-col items-start gap-8 md:gap-16 lg:flex-row lg:items-end lg:justify-between">
            <MotionWrapper variant="slideRight" className="w-full lg:w-[85%]">
              <p className="font-mono text-sm md:text-base text-neo-accent mb-4 tracking-widest pl-1 border-l-2 border-neo-accent uppercase">
                AI Engineer & Systems Architect
              </p>
              
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] uppercase mb-8">
                Keshav<br />
                <span className="text-transparent !bg-clip-text bg-neo-fg" style={{ backgroundImage: "url('/pattern-interference.avif')" }}>
                  Garg
                </span>
              </h1>
            </MotionWrapper>

            <MotionWrapper variant="fadeUp" delay={0.2} className="w-full lg:w-[15%] flex flex-col gap-6 lg:items-end text-left lg:text-right font-mono text-xs md:text-sm">
                <div className="p-4 bg-neo-accent/10 border-l border-neo-accent w-full">
                  <span className="block text-neo-muted mb-1">STATUS:</span>
                  <strong className="text-neo-accent">AVAILABLE FOR CONTRACT</strong>
                </div>
                <div className="flex flex-col gap-2 w-full lg:items-end">
                  <span className="text-neo-muted">SPECIALTIES:</span>
                  <span>MULTI-AGENT SYSTEMS</span>
                  <span>RAG & LLM PIPELINES</span>
                  <span>MLOPS & DEPLOYMENT</span>
                  <span>GPU & DISTRIBUTED COMPUTE</span>
                </div>
            </MotionWrapper>
          </Container>
        </Section>

        <Section id="expertise" className="bg-[#111]">
          <Container>
            <MotionWrapper className="mb-16 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">System Operations</h2>
              <p className="font-mono text-neo-muted max-w-2xl mx-auto md:mx-0">Professional trajectory and technical deployments.</p>
            </MotionWrapper>
            <div className="max-w-4xl mx-auto md:mx-0">
               {EXPERIENCE.map((exp, index) => (
                  <MotionWrapper key={index} variant="fadeUp" delay={index * 0.15}>
                    <TimelineItem {...exp} />
                  </MotionWrapper>
               ))}
            </div>
          </Container>
        </Section>

        <Section id="freelance" className="bg-[url('/noise.png')] bg-neo-bg">
          <Container>
            <MotionWrapper className="mb-16">
              <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Freelance Work</h2>
              <p className="font-mono text-neo-muted max-w-2xl">Production-grade AI systems built for enterprise clients. Delivering measurable ROI through intelligent automation.</p>
            </MotionWrapper>
            
            {/* Testimonial Block */}
            <MotionWrapper variant="brutalPop" className="mb-12">
               <div className="p-8 md:p-12 border-l-[4px] border-neo-accent bg-neo-bg shadow-[8px_8px_0_0_#FF4500]">
                  <span className="text-6xl md:text-8xl text-neo-accent leading-none font-sans opacity-50 block mb-4">&quot;</span>
                  <p className="text-lg md:text-xl font-medium leading-relaxed italic mb-8 uppercase tracking-tight">
                    The AI solution transformed our entire RFP process. What used to be 100% manual work is now only 5% manual. The expertise in agentic workflows... significantly improved our proposal quality.
                  </p>
                  <div className="flex items-center gap-4">
                     <span className="font-mono text-neo-accent font-bold uppercase tracking-wider">Government RFP Client</span>
                     <span className="text-neo-muted font-mono text-sm uppercase">| Contract Project</span>
                  </div>
               </div>
            </MotionWrapper>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {FREELANCE_PROJECTS.map((project, index) => (
                <ProjectCard key={project.title} {...project} index={index} />
              ))}
              <MotionWrapper variant="brutalPop" delay={0.2}>
                <div className="neo-card flex flex-col items-center justify-center p-8 text-center border-dashed min-h-[300px] h-full">
                   <span className="text-4xl font-black text-neo-muted mb-4">?</span>
                   <h3 className="text-xl font-bold uppercase mb-2">Your Project Here</h3>
                   <p className="font-mono text-sm text-neo-muted mb-6">Looking for a scalable AI solution?</p>
                   <ContactFormDialog label="START A CONVERSATION" />
                </div>
              </MotionWrapper>
            </div>
          </Container>
        </Section>
        
        <Section id="labs" className="bg-[#111]">
          <Container>
             <MotionWrapper className="mb-16">
              <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Labs & Experiments</h2>
              <p className="font-mono text-neo-muted max-w-2xl">Research, side projects, and complex system architectures exploring the boundaries of modern AI capabilities.</p>
            </MotionWrapper>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {LAB_PROJECTS.map((project, index) => (
                <ProjectCard key={project.title} {...project} index={index} className="h-full" />
              ))}
            </div>
          </Container>
        </Section>

        <Section id="contact" className="bg-neo-bg border-none py-24 md:py-32">
          <Container>
            <MotionWrapper variant="scale">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-neo-accent p-8 md:p-16">
                <div className="flex flex-col gap-4 max-w-xl">
                   <h2 className="text-4xl md:text-6xl font-black uppercase text-black">Ready to Initiate?</h2>
                   <p className="font-mono text-black/80 font-medium">Available for freelance contracts, system architecture consulting, and building production-grade LLM applications.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                   <ContactFormDialog />
                   <Button variant="outline" className="border-black text-black hover:bg-black/10 shadow-[4px_4px_0_0_#000]" asChild>
                     <a href="https://linkedin.com/in/keshavcodes" target="_blank" rel="noopener noreferrer">LINKEDIN_PROFILE</a>
                   </Button>
                </div>
              </div>
            </MotionWrapper>
          </Container>
        </Section>

      </main>

      <footer className="border-t neo-border py-8 bg-[#111]">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-neo-muted">
          <p>© {new Date().getFullYear()} KESHAV GARG. ALL_RIGHTS_RESERVED.</p>
          <div className="flex gap-4">
            <a href="https://github.com/KeshavG69" target="_blank" rel="noopener noreferrer" className="hover:text-neo-accent transition-colors">GITHUB</a>
            <a href="https://linkedin.com/in/keshavcodes" target="_blank" rel="noopener noreferrer" className="hover:text-neo-accent transition-colors">LINKEDIN</a>
          </div>
        </Container>
      </footer>
    </div>
  )
}
