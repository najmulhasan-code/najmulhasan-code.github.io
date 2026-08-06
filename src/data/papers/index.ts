// Loads papers from public/papers/<slug>/ (meta.json + content.html). Server-only.

import fs from 'node:fs';
import path from 'node:path';
import { readContentHtml, resolveTeaser } from '../content';

export interface Paper {
  slug: string;
  published: boolean;
  researchOrder?: number;
  title: string;
  authors: string[];
  keywords: string[];
  venue: string;
  venueShort: string;
  displayVenue?: string;
  venueContext?: string;
  publisher?: string;
  year: string;
  date: string;
  abstract: string;
  thumbnail?: string;
  paperLink?: string;
  arxivLink?: string;
  doiLink?: string;
  doi?: string;
  codeLink?: string;
  links?: string[];
  bibtex?: string;
  contentHtml: string;
}

const PAPERS_DIR = path.join(process.cwd(), 'public', 'papers');

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map((item) => String(item)) : [];
}

function optionalString(value: unknown): string | undefined {
  return value ? String(value) : undefined;
}

function resolveDoi(doiLink?: string, bibtex?: string): string | undefined {
  const linkedDoi = doiLink?.match(/doi\.org\/(.+)$/i)?.[1];
  if (linkedDoi) return linkedDoi;
  return bibtex?.match(/\bdoi\s*=\s*[{"]([^}"]+)/i)?.[1];
}

function readPaper(slug: string): Paper | null {
  const dir = path.join(PAPERS_DIR, slug);
  const metaFile = path.join(dir, 'meta.json');
  const htmlFile = path.join(dir, 'content.html');
  if (!fs.existsSync(metaFile) || !fs.existsSync(htmlFile)) return null;

  const meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
  const urlBase = `/papers/${slug}`;
  const doiLink = optionalString(meta.doiLink);
  const bibtex = optionalString(meta.bibtex);

  return {
    slug,
    published: meta.published !== false,
    researchOrder: typeof meta.researchOrder === 'number' ? meta.researchOrder : undefined,
    title: String(meta.title ?? ''),
    authors: asStringArray(meta.authors),
    keywords: asStringArray(meta.keywords),
    venue: String(meta.venue ?? ''),
    venueShort: String(meta.venueShort ?? ''),
    displayVenue: optionalString(meta.displayVenue),
    venueContext: optionalString(meta.venueContext),
    publisher: optionalString(meta.publisher),
    year: String(meta.year ?? ''),
    date: String(meta.date ?? ''),
    abstract: String(meta.abstract ?? ''),
    thumbnail: resolveTeaser(dir, urlBase),
    paperLink: optionalString(meta.paperLink),
    arxivLink: optionalString(meta.arxivLink),
    doiLink,
    doi: resolveDoi(doiLink, bibtex),
    codeLink: optionalString(meta.codeLink),
    links: meta.links ? asStringArray(meta.links) : undefined,
    bibtex,
    contentHtml: readContentHtml(htmlFile, urlBase),
  };
}

export function getAllPapers(options: { includeUnpublished?: boolean } = {}): Paper[] {
  if (!fs.existsSync(PAPERS_DIR)) return [];

  return fs
    .readdirSync(PAPERS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => readPaper(entry.name))
    .filter((paper): paper is Paper => paper !== null)
    .filter((paper) => options.includeUnpublished || paper.published)
    .sort((a, b) => {
      const orderDifference = (a.researchOrder ?? Number.POSITIVE_INFINITY) - (b.researchOrder ?? Number.POSITIVE_INFINITY);
      if (orderDifference !== 0) return orderDifference;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getPaperBySlug(slug: string): Paper | undefined {
  return readPaper(slug) ?? undefined;
}
