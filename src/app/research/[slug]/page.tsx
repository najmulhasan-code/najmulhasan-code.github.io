import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPapers, getPaperBySlug } from '@/data/papers';
import PaperContent from './PaperContent';

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = 'https://najmulhasan-code.github.io';

function getArxivId(url?: string): string | undefined {
  return url?.match(/arxiv\.org\/abs\/([^?#]+)/i)?.[1]?.replace(/v\d+$/i, '');
}

function getArxivPdfUrl(url?: string): string | undefined {
  const id = url?.match(/arxiv\.org\/abs\/([^?#]+)/i)?.[1];
  return id ? `https://arxiv.org/pdf/${id}` : undefined;
}

export function generateStaticParams() {
  const papers = getAllPapers({ includeUnpublished: true });
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

  const canonical = `${SITE_URL}/research/${paper.slug}`;
  const description = paper.abstract.length > 200
    ? `${paper.abstract.slice(0, 197).trimEnd()}...`
    : paper.abstract;
  const image = paper.thumbnail ? `${SITE_URL}${paper.thumbnail}` : undefined;
  const arxivId = getArxivId(paper.arxivLink);
  const pdfUrl = getArxivPdfUrl(paper.arxivLink);

  return {
    title: `${paper.title} | Najmul Hasan`,
    description,
    keywords: paper.keywords,
    alternates: {
      canonical,
      types: {
        'application/x-bibtex': `${SITE_URL}/papers/${paper.slug}/citation.bib`,
        'application/x-research-info-systems': `${SITE_URL}/papers/${paper.slug}/citation.ris`,
      },
    },
    openGraph: {
      title: paper.title,
      description,
      type: 'article',
      publishedTime: paper.date,
      authors: paper.authors,
      tags: paper.keywords,
      url: canonical,
      ...(image ? { images: [{ url: image, alt: paper.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: paper.title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    ...(paper.published ? {} : { robots: { index: false, follow: true } }),
    other: {
      'citation_title': paper.title,
      'citation_author': paper.authors,
      'citation_publication_date': paper.year,
      'citation_online_date': paper.date,
      'citation_abstract': paper.abstract,
      'citation_keywords': paper.keywords.join('; '),
      'citation_language': 'en',
      'citation_public_url': canonical,
      ...(paper.publisher ? { 'citation_publisher': paper.publisher } : {}),
      ...(arxivId ? { 'citation_arxiv_id': arxivId } : {}),
      ...(pdfUrl ? { 'citation_pdf_url': pdfUrl } : {}),
      ...(paper.doi ? { 'citation_doi': paper.doi } : {}),
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
