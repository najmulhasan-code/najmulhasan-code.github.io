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
  const dates = [...papers.map((paper) => paper.date), ...posts.map((post) => post.updatedDate ?? post.date)]
    .filter(Boolean)
    .sort();

  const profilePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profile`,
    url: SITE_URL,
    name: 'Najmul Hasan',
    description:
      'Academic portfolio of Najmul Hasan, a researcher interested in language models and AI alignment.',
    inLanguage: 'en-US',
    ...(dates.length > 0 ? { dateModified: dates[dates.length - 1] } : {}),
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Najmul Hasan',
      url: SITE_URL,
      image: `${SITE_URL}/images/najmul_hasan.JPEG`,
      sameAs: [
        'https://scholar.google.com/citations?user=YL8xF4MAAAAJ&hl=en',
        'https://github.com/najmulhasan-code',
        'https://linkedin.com/in/najmulhasan-cs-math',
        'https://x.com/_najmulhasan',
      ],
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
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <Hero />
      <News />
      <Publications papers={papers} />
      <Experience />
      <Education />
      <Awards />
      <Service />
      <Blog posts={posts} />
      <Footer />
    </main>
  );
}
