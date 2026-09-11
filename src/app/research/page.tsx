import { serializeJsonLd } from '@/lib/structured-data';
import type { Metadata } from 'next';
import Publications from '@/components/Publications';
import Footer from '@/components/Footer';
import { getAllPapers } from '@/data/papers';

const SITE_URL = 'https://najmulhasan-code.github.io';

export const metadata: Metadata = {
  title: 'Research | Najmul Hasan',
  description: 'Research publications by Najmul Hasan on language models, AI alignment, and related areas.',
  alternates: {
    canonical: 'https://najmulhasan-code.github.io/research',
    types: { 'application/json': `${SITE_URL}/research.json` },
  },
};

export default function PapersPage() {
  const papers = getAllPapers();
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/research#papers`,
    name: 'Research publications by Najmul Hasan',
    numberOfItems: papers.length,
    itemListElement: papers.map((paper, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/research/${paper.slug}`,
      name: paper.title,
    })),
  };

  return (
    <main id="main-content" tabIndex={-1} className="watercolor-page min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListJsonLd) }}
      />
      <Publications papers={papers} />
      <Footer />
    </main>
  );
}
