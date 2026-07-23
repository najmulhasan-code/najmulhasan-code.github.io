import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPapers, getPaperBySlug } from '@/data/papers';
import PaperContent from './PaperContent';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const papers = getAllPapers();
  return papers.map((paper) => ({
    slug: paper.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);

  if (!paper) {
    return { title: 'Paper Not Found' };
  }

  return {
    title: `${paper.title} | Najmul Hasan`,
    description: paper.abstract.slice(0, 200) + '...',
    keywords: paper.keywords,
    alternates: {
      canonical: `https://najmulhasan-code.github.io/research/${paper.slug}`,
    },
    openGraph: {
      title: paper.title,
      description: paper.abstract.slice(0, 200) + '...',
      type: 'article',
      publishedTime: paper.date,
      authors: paper.authors,
      tags: paper.keywords,
      url: `https://najmulhasan-code.github.io/research/${paper.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: paper.title,
      description: paper.abstract.slice(0, 200) + '...',
    },
    other: {
      'citation_title': paper.title,
      'citation_author': paper.authors,
      'citation_publication_date': paper.year,
      'citation_abstract': paper.abstract,
      ...(paper.publisher ? { 'citation_publisher': paper.publisher } : {}),
      ...(paper.arxivLink ? { 'citation_arxiv_id': paper.arxivLink.replace('https://arxiv.org/abs/', '') } : {}),
      ...(paper.doiLink ? { 'citation_doi': paper.doiLink.replace('https://doi.org/', '') } : {}),
      ...(paper.venue.includes('IEEE') || paper.venueShort.includes('NeurIPS')
        ? { 'citation_conference_title': paper.venue }
        : {}),
    },
  };
}

export default async function PaperPage({ params }: Props) {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);

  if (!paper) {
    notFound();
  }

  return <PaperContent paper={paper} />;
}
