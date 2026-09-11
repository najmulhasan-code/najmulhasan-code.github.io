import profile from '@/data/profile.json';
import { serializeJsonLd } from '@/lib/structured-data';
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const SITE_DESCRIPTION = profile.description;

const SITE_SHORT_DESCRIPTION =
  "Researcher interested in language models, language-model training, and AI alignment.";

export const metadata: Metadata = {
  metadataBase: new URL("https://najmulhasan-code.github.io"),
  title: "Najmul Hasan",
  description: SITE_DESCRIPTION,
  keywords: [profile.name, ...profile.researchInterests],
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
        url: "https://najmulhasan-code.github.io/images/najmul-hasan-social.jpg",
        secureUrl: "https://najmulhasan-code.github.io/images/najmul-hasan-social.jpg",
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
      url: "https://najmulhasan-code.github.io/images/najmul-hasan-social.jpg",
      alt: "Najmul Hasan",
    },
  },
  alternates: {
    canonical: "https://najmulhasan-code.github.io",
    types: { 'application/json': `${profile.url}/discovery/profile.json` },
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
  "@id": `${profile.url}/#person`,
  name: profile.name,
  givenName: profile.givenName,
  familyName: profile.familyName,
  url: profile.url,
  image: profile.image,
  sameAs: profile.sameAs,
  alumniOf: profile.alumniOf,
  knowsAbout: profile.researchInterests,
  description: profile.description,
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
    <html lang="en">
      <head>
        <link rel="icon" href="/najmul-hasan-favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/najmul-hasan-favicon.png" />
        <meta name="theme-color" content="#f1f6f4" />
        <link rel="alternate" type="application/atom+xml" title="Najmul Hasan: Research and Writing" href="/feed.xml" />
        <link rel="describedby" type="application/json" href="/research.json" />
        <link rel="describedby" type="application/ld+json" href="/discovery/graph.jsonld" />

        <meta name="author" content="Najmul Hasan" />
        <meta name="language" content="English" />
        <meta name="HandheldFriendly" content="True" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <MotionProvider>
          <Navbar />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
