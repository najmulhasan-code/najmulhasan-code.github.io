import profile from '@/data/profile.json';
import { serializeJsonLd } from '@/lib/structured-data';
import Hero from '@/components/Hero';
import Publications from '@/components/Publications';
import Blog from '@/components/Blog';
import News from '@/components/News';

import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Awards from '@/components/Awards';
import Service from '@/components/Service';
import Footer from '@/components/Footer';
import { getAllPapers } from '@/data/papers';
import { getAllBlogPosts } from '@/data/blog';

const SITE_URL = 'https://najmulhasan-code.github.io';

function personReference(name: string) {
  return name === 'Najmul Hasan'
    ? {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name,
        url: SITE_URL,
      }
    : { '@type': 'Person', name };
}

export default function Home() {
  const papers = getAllPapers();
  const posts = getAllBlogPosts();

  const profilePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profile`,
    url: SITE_URL,
    name: 'Najmul Hasan',
    description:
      'Academic portfolio of Najmul Hasan, a researcher interested in language models and AI alignment.',
    inLanguage: 'en-US',
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Najmul Hasan',
      url: SITE_URL,
      image: `${SITE_URL}/images/najmul-hasan-profile.webp`,
      givenName: profile.givenName,
      familyName: profile.familyName,
      description: profile.description,
      alumniOf: profile.alumniOf,
      sameAs: profile.sameAs,
    },
    hasPart: [
      ...papers.map((paper) => ({
        '@type': 'ScholarlyArticle',
        '@id': `${SITE_URL}/research/${paper.slug}#article`,
        headline: paper.title,
        url: `${SITE_URL}/research/${paper.slug}`,
        datePublished: paper.date,
        author: paper.authors.map(personReference),
      })),
      ...posts.map((post) => ({
        '@type': 'BlogPosting',
        '@id': `${SITE_URL}/blog/${post.slug}#article`,
        headline: post.title,
        url: `${SITE_URL}/blog/${post.slug}`,
        datePublished: post.date,
        ...(post.updatedDate ? { dateModified: post.updatedDate } : {}),
        author: personReference('Najmul Hasan'),
      })),
    ],
  };

  return (
    <main id="main-content" tabIndex={-1} className="watercolor-page min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(profilePageJsonLd) }}
      />
      <Hero />
      <Publications papers={papers} />
      <Experience />
      <Blog posts={posts} />
      <News />
      <Education />
      <Awards />
      <Service />
      <Footer />
    </main>
  );
}
