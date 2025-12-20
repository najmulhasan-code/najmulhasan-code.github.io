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

export const metadata: Metadata = {
  title: "Najmul Hasan",
  description: "Najmul Hasan - Undergraduate AI researcher at UNC Pembroke specializing in reinforcement learning for large language model reasoning, multilingual NLP, cybersecurity, and AI safety. Expert in SLIC (step-level intrinsic calibration), process supervision, phishing detection, and speech emotion recognition. Applying to PhD programs in Computer Science, EECS, Machine Learning, and Artificial Intelligence for Fall 2026. Research with Dr. Shaohu Zhang and Dr. Prashanth BusiReddyGari on LLM reasoning, AI security, and deep learning applications.",
  keywords: [
    // Primary Identity
    "Najmul Hasan",
    "Najmul",
    "Hasan",
    "Najmul Hasan AI researcher",
    "Najmul Hasan computer science",
    "Najmul Hasan UNC Pembroke",

    // Academic & Career
    "PhD applicant computer science",
    "PhD applicant artificial intelligence",
    "PhD applicant machine learning",
    "PhD applicant EECS",
    "AI researcher",
    "machine learning researcher",
    "undergraduate researcher",
    "computer science researcher",

    // Core Research Areas - Reinforcement Learning
    "reinforcement learning",
    "reinforcement learning for LLMs",
    "RL for large language models",
    "reinforcement learning AI",
    "reinforcement learning reasoning",
    "process supervision",
    "reward design",
    "RLHF",
    "reinforcement learning from human feedback",

    // Core Research Areas - LLM & Reasoning
    "large language models",
    "LLM reasoning",
    "LLM calibration",
    "language model reasoning",
    "AI reasoning",
    "step-by-step reasoning",
    "chain of thought reasoning",
    "mathematical reasoning AI",
    "reasoning in AI",

    // Specific Research Projects
    "SLIC",
    "step-level intrinsic calibration",
    "intrinsic calibration",
    "confidence calibration",
    "uncertainty quantification",
    "model calibration",

    // NLP & Language
    "multilingual NLP",
    "natural language processing",
    "cross-lingual NLP",
    "multilingual AI",
    "speech emotion recognition",
    "speech recognition",
    "emotion detection",
    "sentiment analysis",

    // Cybersecurity & AI Security
    "AI security",
    "AI cybersecurity",
    "phishing detection",
    "phishing email detection",
    "adversarial AI",
    "AI safety",
    "secure AI",
    "LLM security",
    "prompt injection",
    "adversarial attacks",
    "cyber threat intelligence",
    "lightweight cryptography",
    "mobile driver license security",

    // Deep Learning & ML
    "deep learning",
    "neural networks",
    "transformer models",
    "deep learning research",
    "machine learning",
    "artificial intelligence",
    "AI research",
    "ML research",

    // Software Engineering & Development
    "software engineering",
    "full stack development",
    "web development",
    "software development",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "AI engineer",

    // Academic Institutions
    "UNC Pembroke",
    "University of North Carolina Pembroke",
    "UNCP",
    "Esther G Maynor Honors College",

    // Mentors & Collaborators
    "Dr. Shaohu Zhang",
    "Dr. Prashanth BusiReddyGari",
    "Dr. Ali Saman Tosun",
    

    // Competitions & Activities
    "HackHarvard",
    "HackNC",
    "hackathon participant",
    "AI club president",
    "AI@UNCP",

    // Research Topics - Specific
    "process supervision LLM",
    "reward modeling",
    "LLM fine-tuning",
    "model alignment",
    "AI alignment",
    "Wav2Vec2",
    "STIX 2.0",
    "knowledge graphs",
    "synthetic data generation",

    // Fellowships & Recognition
    "URFS fellowship",
    "SURF fellowship",
    "Honors Scholar Fellowship",
    "research fellowship",
    "undergraduate research",

    // Application Areas
    "AI for education",
    "AI for healthcare",
    "AI for cybersecurity",
    "AI for sustainability",

    // Technologies & Frameworks
    "PyTorch",
    "TensorFlow",
    "Hugging Face",
    "OpenAI",
    "GPT-4",
    "Supabase",
    "Firebase",
    "Django",
    "Angular",
    "Flutter",

    // Broader Topics
    "artificial general intelligence",
    "AGI research",
    "computational linguistics",
    "cognitive computing",
    "explainable AI",
    "interpretable AI",
    "trustworthy AI",
    "responsible AI",

    // Career Goals
    "PhD computer science",
    "PhD machine learning",
    "PhD artificial intelligence",
    "PhD EECS",
    "graduate school applications",
    "research portfolio",
    "academic portfolio",

    // Regional
    "AI researcher North Carolina",
    "machine learning researcher NC",
    "computer science UNC system"
  ],
  authors: [
    {
      name: "Najmul Hasan",
      url: "https://najmulhasan-code.github.io"
    }
  ],
  creator: "Najmul Hasan",
  publisher: "Najmul Hasan",
  applicationName: "Najmul Hasan Research Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: true,
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://najmulhasan-code.github.io",
    title: "Najmul Hasan | AI Researcher in LLM Reasoning",
    description: "AI researcher specializing in large language model reasoning, multilingual NLP, and cybersecurity.",
    siteName: "Najmul Hasan - AI Research Portfolio",
    images: [
      {
        url: "https://najmulhasan-code.github.io/images/najmul_hasan.jpg",
        secureUrl: "https://najmulhasan-code.github.io/images/najmul_hasan.jpg",
        width: 1200,
        height: 630,
        alt: "Najmul Hasan - AI Researcher specializing in Reinforcement Learning and LLM Reasoning",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@_najmulhasan",
    creator: "@_najmulhasan",
    title: "Najmul Hasan | AI Researcher | Reinforcement Learning & LLM Reasoning",
    description: "AI researcher specializing in reinforcement learning for LLM reasoning, multilingual NLP, and cybersecurity. PhD applicant Fall 2026. Research on SLIC, process supervision, and AI safety.",
    images: {
      url: "https://najmulhasan-code.github.io/images/najmul_hasan.jpg",
      alt: "Najmul Hasan - AI Researcher",
    },
  },
  alternates: {
    canonical: "https://najmulhasan-code.github.io",
    languages: {
      'en-US': 'https://najmulhasan-code.github.io',
    },
  },
  verification: {
    // google: 'your-google-site-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  category: "Technology",
  classification: "Academic Research Portfolio",
  other: {
    "google-site-verification": "pending",
    "msvalidate.01": "pending",
    "p:domain_verify": "pending",
  },
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
        <link rel="apple-touch-icon" href="/images/najmul_hasan.jpg" />
        <meta name="theme-color" content="#ffffff" />

        {/* Additional SEO Meta Tags */}
        <meta name="author" content="Najmul Hasan" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />

        {/* Structured Data for Search Engines and AI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://najmulhasan-code.github.io/#person",
              "name": "Najmul Hasan",
              "givenName": "Najmul",
              "familyName": "Hasan",
              "url": "https://najmulhasan-code.github.io",
              "image": "https://najmulhasan-code.github.io/images/najmul_hasan.jpg",
              "sameAs": [
                "https://github.com/najmulhasan-code",
                "https://linkedin.com/in/najmulhasan-cs-math",
                "https://x.com/_najmulhasan"
              ],
              "jobTitle": "Undergraduate AI Researcher",
              "worksFor": {
                "@type": "EducationalOrganization",
                "name": "University of North Carolina at Pembroke",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Pembroke",
                  "addressRegion": "NC",
                  "addressCountry": "US"
                }
              },
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "University of North Carolina at Pembroke",
                "sameAs": "https://www.uncp.edu"
              },
              "knowsAbout": [
                "Artificial Intelligence",
                "Machine Learning",
                "Reinforcement Learning",
                "Large Language Models",
                "Natural Language Processing",
                "Deep Learning",
                "Cybersecurity",
                "Software Engineering",
                "Computer Science",
                "LLM Reasoning",
                "Process Supervision",
                "AI Safety",
                "Multilingual NLP",
                "Speech Emotion Recognition",
                "Phishing Detection"
              ],
              "description": "AI researcher specializing in reinforcement learning for large language model reasoning, multilingual NLP, and cybersecurity applications. Developing SLIC (step-level intrinsic calibration) for improved LLM reasoning. PhD applicant for Fall 2026.",
              "email": "contact@najmulhasan.com",
              "memberOf": [
                {
                  "@type": "Organization",
                  "name": "AI@UNCP",
                  "description": "Artificial Intelligence Club at UNC Pembroke"
                },
                {
                  "@type": "Organization",
                  "name": "Esther G. Maynor Honors College"
                }
              ],
              "seeks": {
                "@type": "EducationalOccupationalProgram",
                "name": "PhD in Computer Science",
                "programType": "Doctoral",
                "occupationalCategory": "Computer and Information Research Scientists"
              }
            })
          }}
        />

        {/* Organization Schema for Research Work */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ResearchProject",
              "@id": "https://najmulhasan-code.github.io/#research",
              "name": "Step-Level Intrinsic Calibration for Large Language Models",
              "alternateName": "SLIC",
              "description": "Research on reinforcement learning to improve reasoning in large language models through step-level intrinsic calibration, combining process supervision with confidence measurement.",
              "url": "https://najmulhasan-code.github.io",
              "author": {
                "@type": "Person",
                "name": "Najmul Hasan",
                "url": "https://najmulhasan-code.github.io"
              },
              "contributor": [
                {
                  "@type": "Person",
                  "name": "Dr. Shaohu Zhang"
                },
                {
                  "@type": "Person",
                  "name": "Dr. Prashanth BusiReddyGari"
                }
              ],
              "about": [
                {
                  "@type": "Thing",
                  "name": "Reinforcement Learning"
                },
                {
                  "@type": "Thing",
                  "name": "Large Language Models"
                },
                {
                  "@type": "Thing",
                  "name": "AI Reasoning"
                },
                {
                  "@type": "Thing",
                  "name": "Process Supervision"
                }
              ]
            })
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://najmulhasan-code.github.io/#website",
              "url": "https://najmulhasan-code.github.io",
              "name": "Najmul Hasan - AI Research Portfolio",
              "description": "Academic and research portfolio of Najmul Hasan, AI researcher specializing in reinforcement learning for LLM reasoning",
              "inLanguage": "en-US",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://najmulhasan-code.github.io/#{search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
