import type { Metadata } from "next";
import { Archivo, Public_Sans } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://keshavgarg.vercel.app"),
  title: "Keshav Garg — AI Engineer for Regulated Industries",
  description:
    "AI engineer for regulated industries. Production multi-agent systems, RAG and knowledge graphs, voice agents and on-prem AI for security, banking, government contracting and defense.",
  openGraph: {
    title: "Keshav Garg — AI Engineer for Regulated Industries",
    description:
      "Production AI for security, banking, government contracting and defense.",
    type: "website",
  },
};

// Direction contract — kept in the emitted markup so it can be audited on every edit.
const CONTRACT = `
THESIS: A quiet, document-like page where measured results lead — refusing the dark card-grid engineer portfolio and refusing costume branding.
OWN-WORLD: White paper, black ink, grey rules; one deep-blue accent (#1F4FD8) for actions, links and result figures. Archivo (wide for result figures) over Public Sans. Square corners, 1–2px ink rules, plain bullets. No cards, no mono, no shadows, no initials marks or color bands.
STORY: A buyer sees measured outcomes, believes they shipped in production, and books an intro call (or sends a note).
FIRST VIEWPORT: His name as the headline, one-line practice statement, lead, Book an intro call / Send a note on the left; Results table on the right, rows linking to each system.
FORM: The Specification (my top-ranked candidate, #1 of 7), toned down at the owner's request; seed key 4a2c32ed.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${publicSans.variable}`}>
      <body className="antialiased">
        <div hidden dangerouslySetInnerHTML={{ __html: `<!--${CONTRACT}-->` }} />
        {children}
      </body>
    </html>
  );
}
