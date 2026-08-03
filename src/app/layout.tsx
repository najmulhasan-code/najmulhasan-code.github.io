import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

const SITE_DESCRIPTION =
  "Najmul Hasan is a researcher interested in language models and AI alignment, particularly the design and training of language models and how training choices shape their capabilities and behavior. He holds a B.S. in Computer Science with minors in Mathematics and Physics from UNC Pembroke.";

const SITE_SHORT_DESCRIPTION =
  "Researcher interested in language models, language-model training, and AI alignment.";

export const metadata: Metadata = {
  metadataBase: new URL("https://najmulhasan-code.github.io"),
  title: "Najmul Hasan",
  description: SITE_DESCRIPTION,
  keywords: [
    // Identity
    "Najmul Hasan",
    "Najmul",
    "Hasan",
    "Najmul Hasan UNC Pembroke",
    "Najmul Hasan AI safety",
    "Najmul Hasan researcher",

    // Research profile
    "AI alignment researcher",
    "language model researcher",
    "computer science researcher",

    // Primary research areas
    "large language models",
    "language model training",
    "LLM agents",
    "multi-agent LLMs",
    "multi-agent systems",
    "LLM coordination",
    "LLM evaluation",
    "AI alignment",
    "AI safety",
    "AI safety research",
    "adversarial robustness",
    "LLM security",
    "trustworthy AI",
    "AI control",

    // Methods
    "language model pretraining",
    "language model post-training",
    "reinforcement learning post-training",
    "GRPO",
    "QLoRA",
    "LLM fine-tuning",

    // Publication topics
    "phishing detection with LLMs",
    "phishing URL detection",
    "phishing email detection",
    "multilingual NLP",
    "multilingual phishing detection",
    "lightweight cryptography time complexity",

    // Broader ML / NLP
    "natural language processing",
    "large language models",
    "transformer models",
    "machine learning research",
    "artificial intelligence research",

    // Institutions
    "University of North Carolina at Pembroke",
    "UNC Pembroke",
    "UNCP",
    "Algoverse",
    "Esther G. Maynor Honors College",

    // Advisors & collaborators
    "Dr. Prashanth BusiReddyGari",
    "Dr. Shaohu Zhang",

    // Service & community
    "AI@UNCP",
    "HackUNCP",

    // Fellowships
    "Undergraduate Research Fellowship Summer",
    "URFS",
    "Semester-Long Undergraduate Research Fellowship",
    "SURF",
    "Honors Scholar Fellowship",

    // Venues
    "NeurIPS 2025 LAW Workshop",
    "IEEE CCWC 2026",
    "Apart Research AI Control Hackathon",
  ],
  authors: [
    {
      name: "Najmul Hasan",
      url: "https://najmulhasan-code.github.io",
    },
  ],
  creator: "Najmul Hasan",
  publisher: "Najmul Hasan",
  applicationName: "Najmul Hasan",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://najmulhasan-code.github.io",
    title: "Najmul Hasan",
    description: SITE_SHORT_DESCRIPTION,
    siteName: "Najmul Hasan",
    images: [
      {
        url: "https://najmulhasan-code.github.io/images/najmul_hasan.JPEG",
        secureUrl: "https://najmulhasan-code.github.io/images/najmul_hasan.JPEG",
        width: 1200,
        height: 630,
        alt: "Najmul Hasan",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@_najmulhasan",
    creator: "@_najmulhasan",
    title: "Najmul Hasan",
    description: SITE_SHORT_DESCRIPTION,
    images: {
      url: "https://najmulhasan-code.github.io/images/najmul_hasan.JPEG",
      alt: "Najmul Hasan",
    },
  },
  alternates: {
    canonical: "https://najmulhasan-code.github.io",
    languages: {
      "en-US": "https://najmulhasan-code.github.io",
    },
  },
  category: "Technology",
  classification: "Academic Research Portfolio",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://najmulhasan-code.github.io/#person",
  name: "Najmul Hasan",
  givenName: "Najmul",
  familyName: "Hasan",
  url: "https://najmulhasan-code.github.io",
  image: "https://najmulhasan-code.github.io/images/najmul_hasan.JPEG",
  sameAs: [
    "https://scholar.google.com/citations?user=YL8xF4MAAAAJ&hl=en",
    "https://github.com/najmulhasan-code",
    "https://linkedin.com/in/najmulhasan-cs-math",
    "https://x.com/_najmulhasan",
  ],
  jobTitle: "Researcher",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of North Carolina at Pembroke",
    sameAs: "https://www.uncp.edu",
  },
  knowsAbout: [
    "Large Language Models",
    "Language Model Pretraining",
    "Language Model Post-Training",
    "Reinforcement Learning Post-Training",
    "LLM Agents",
    "Multi-Agent LLMs",
    "LLM Evaluation",
    "AI Alignment",
    "AI Safety",
    "Adversarial Robustness",
    "Natural Language Processing",
    "GRPO",
    "QLoRA",
    "Phishing Detection with LLMs",
    "Multilingual NLP",
    "Lightweight Cryptography",
  ],
  description: SITE_SHORT_DESCRIPTION,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://najmulhasan-code.github.io/#website",
  url: "https://najmulhasan-code.github.io",
  name: "Najmul Hasan",
  description:
    "Academic portfolio of Najmul Hasan, a researcher interested in language models and AI alignment.",
  inLanguage: "en-US",
  author: { "@id": "https://najmulhasan-code.github.io/#person" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/profile-favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/profile-favicon.png" />
        <meta name="theme-color" content="#eef4f3" />

        <meta name="author" content="Najmul Hasan" />
        <meta name="language" content="English" />
        <meta name="HandheldFriendly" content="True" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
