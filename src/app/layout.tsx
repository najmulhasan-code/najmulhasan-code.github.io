import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_DESCRIPTION =
  "Najmul Hasan is an undergraduate researcher at the University of North Carolina at Pembroke working at the intersection of AI safety & alignment and natural language processing. AI Safety Research Fellow at Algoverse. First-author work at NeurIPS 2025 LAW Workshop and IEEE CCWC 2026. PhD applicant for Fall 2026.";

const SITE_SHORT_DESCRIPTION =
  "Undergraduate researcher at UNC Pembroke working at the intersection of AI safety & alignment and natural language processing.";

export const metadata: Metadata = {
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

    // Career stage
    "undergraduate researcher",
    "PhD applicant Fall 2026",
    "PhD applicant computer science",
    "PhD applicant machine learning",
    "PhD applicant AI safety",

    // Primary research areas
    "AI safety",
    "AI alignment",
    "AI safety research",
    "LLM agents",
    "multi-agent LLMs",
    "multi-agent systems",
    "LLM coordination",
    "LLM evaluation",
    "adversarial robustness",
    "LLM security",
    "trustworthy AI",
    "AI control",

    // Methods
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
  jobTitle: "Undergraduate Researcher",
  worksFor: [
    {
      "@type": "EducationalOrganization",
      name: "University of North Carolina at Pembroke",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pembroke",
        addressRegion: "NC",
        addressCountry: "US",
      },
    },
    {
      "@type": "Organization",
      name: "Algoverse",
    },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of North Carolina at Pembroke",
    sameAs: "https://www.uncp.edu",
  },
  knowsAbout: [
    "AI Safety",
    "AI Alignment",
    "LLM Agents",
    "Multi-Agent LLMs",
    "LLM Evaluation",
    "Adversarial Robustness",
    "Natural Language Processing",
    "Large Language Models",
    "Reinforcement Learning Post-Training",
    "GRPO",
    "QLoRA",
    "Phishing Detection with LLMs",
    "Multilingual NLP",
    "Lightweight Cryptography",
  ],
  description: SITE_SHORT_DESCRIPTION,
  memberOf: [
    {
      "@type": "Organization",
      name: "AI@UNCP",
      description: "AI student organization at UNC Pembroke, founded by Najmul Hasan",
    },
    {
      "@type": "Organization",
      name: "Esther G. Maynor Honors College",
    },
  ],
  seeks: {
    "@type": "EducationalOccupationalProgram",
    name: "PhD in Computer Science",
    programType: "Doctoral",
    occupationalCategory: "Computer and Information Research Scientists",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://najmulhasan-code.github.io/#website",
  url: "https://najmulhasan-code.github.io",
  name: "Najmul Hasan",
  description:
    "Academic portfolio of Najmul Hasan, undergraduate researcher working on AI safety and natural language processing.",
  inLanguage: "en-US",
  author: { "@id": "https://najmulhasan-code.github.io/#person" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/najmul_hasan.JPEG" />
        <meta name="theme-color" content="#ffffff" />

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
