// Loads papers from public/papers/<slug>/ (meta.json + index.html). Server-only.

import fs from 'node:fs';
import path from 'node:path';
import { readContentHtml, resolveTeaser } from '../content';

export interface Paper {
  slug: string;
  title: string;
  authors: string[];
  keywords: string[];
  venue: string;
  venueShort: string;
  year: string;
  date: string;
  abstract: string;
  thumbnail?: string;
  paperLink?: string;
  arxivLink?: string;
  doiLink?: string;
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

function readPaper(slug: string): Paper | null {
  const dir = path.join(PAPERS_DIR, slug);
  const metaFile = path.join(dir, 'meta.json');
  const htmlFile = path.join(dir, 'index.html');
  if (!fs.existsSync(metaFile) || !fs.existsSync(htmlFile)) return null;

  const meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
  const urlBase = `/papers/${slug}`;

  return {
    slug,
    title: String(meta.title ?? ''),
    authors: asStringArray(meta.authors),
    keywords: asStringArray(meta.keywords),
    venue: String(meta.venue ?? ''),
    venueShort: String(meta.venueShort ?? ''),
    year: String(meta.year ?? ''),
    date: String(meta.date ?? ''),
    abstract: String(meta.abstract ?? ''),
    thumbnail: resolveTeaser(dir, urlBase),
    paperLink: optionalString(meta.paperLink),
    arxivLink: optionalString(meta.arxivLink),
    doiLink: optionalString(meta.doiLink),
    codeLink: optionalString(meta.codeLink),
    links: meta.links ? asStringArray(meta.links) : undefined,
    bibtex: optionalString(meta.bibtex),
    contentHtml: readContentHtml(htmlFile, urlBase),
  };
}

export function getAllPapers(): Paper[] {
  if (!fs.existsSync(PAPERS_DIR)) return [];

  return fs
    .readdirSync(PAPERS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => readPaper(entry.name))
    .filter((paper): paper is Paper => paper !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPaperBySlug(slug: string): Paper | undefined {
  return readPaper(slug) ?? undefined;
}
