export interface PaperFigure {
  src: string;
  caption: string;
}

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
  thumbnail: string;
  paperLink?: string;
  arxivLink?: string;
  doiLink?: string;
  codeLink?: string;
  summary?: string;
  figures?: PaperFigure[];
  bibtex?: string;
}
