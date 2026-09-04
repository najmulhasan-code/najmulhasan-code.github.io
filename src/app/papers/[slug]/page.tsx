import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPapers, getPaperBySlug } from '@/data/papers';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPapers({ includeUnpublished: true }).map((paper) => ({ slug: paper.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);

  if (!paper) return { title: 'Paper Not Found' };

  return {
    title: `${paper.title} | Najmul Hasan`,
    alternates: {
      canonical: `https://najmulhasan-code.github.io/research/${slug}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function LegacyPaperPage({ params }: Props) {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);

  if (!paper) notFound();

  const target = `/research/${slug}`;

  return (
    <main id="main-content" tabIndex={-1} className="watercolor-section watercolor-mist min-h-[60vh] flex items-center justify-center px-4">
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <script dangerouslySetInnerHTML={{ __html: `window.location.replace(${JSON.stringify(target)});` }} />
      <p className="text-sm text-gray-600">
        This page has moved to <a href={target} className="text-teal-700 hover:underline">{paper.title}</a>.
      </p>
    </main>
  );
}
