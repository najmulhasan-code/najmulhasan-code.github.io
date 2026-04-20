'use client';

import { useState, ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import Image from 'next/image';
import type { Paper } from '@/data/papers';
import { PaperIcon, ExternalLinkIcon } from '@/components/icons';

const AUTHOR_NAME = 'Najmul Hasan';

function getDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

type LinkMeta = {
  label: string;
  logo?: string;
  FallbackIcon?: ComponentType<{ className?: string }>;
};

function getLinkMeta(url: string): LinkMeta {
  const domain = getDomain(url);
  if (domain.includes('arxiv')) return { label: 'arXiv', logo: '/logos/arxiv.png' };
  if (domain.includes('github')) return { label: 'View code', logo: '/logos/github.png' };
  if (domain.includes('ieee')) return { label: 'IEEE Xplore', logo: '/logos/ieee.ico' };
  if (domain.includes('openreview')) return { label: 'OpenReview', FallbackIcon: PaperIcon };
  if (domain.includes('apartresearch')) return { label: 'Read paper', logo: '/logos/apart.png' };
  if (domain.includes('doi.org')) return { label: 'DOI', FallbackIcon: PaperIcon };
  if (domain.includes('scholar.google')) return { label: 'Google Scholar', logo: '/logos/scholar.ico' };
  return { label: 'View', FallbackIcon: ExternalLinkIcon };
}

function CopyBibtexButton({ bibtex }: { bibtex: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; the BibTeX is visible below for manual copy
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-600 hover:text-teal-700 bg-white border border-gray-200 rounded-md hover:border-teal-300 transition-colors"
      aria-label="Copy BibTeX"
    >
      {copied ? (
        <>
          <Check size={13} /> Copied
        </>
      ) : (
        <>
          <Copy size={13} /> Copy
        </>
      )}
    </button>
  );
}

export default function PaperContent({ paper }: { paper: Paper }) {
  const renderAuthors = (authors: string[]) => {
    return authors.map((author, idx) => (
      <span key={idx}>
        {author === AUTHOR_NAME ? (
          <span className="text-teal-700">{author}</span>
        ) : (
          <span>{author}</span>
        )}
        {idx < authors.length - 1 && ', '}
      </span>
    ));
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: paper.title,
    name: paper.title,
    abstract: paper.abstract,
    author: paper.authors.map((name) => ({
      '@type': 'Person',
      name,
      ...(name === AUTHOR_NAME
        ? {
            '@id': 'https://najmulhasan-code.github.io/#person',
            url: 'https://najmulhasan-code.github.io',
            affiliation: {
              '@type': 'EducationalOrganization',
              name: 'University of North Carolina at Pembroke',
            },
          }
        : {}),
    })),
    datePublished: paper.date,
    publisher: { '@type': 'Organization', name: paper.venueShort },
    isPartOf: { '@type': 'PublicationEvent', name: paper.venue },
    keywords: paper.keywords,
    ...(paper.paperLink ? { url: paper.paperLink } : {}),
    ...(paper.arxivLink ? { sameAs: paper.arxivLink } : {}),
    ...(paper.doiLink
      ? {
          identifier: {
            '@type': 'PropertyValue',
            propertyID: 'DOI',
            value: paper.doiLink.replace('https://doi.org/', ''),
          },
        }
      : {}),
    ...(paper.thumbnail
      ? { image: `https://najmulhasan-code.github.io${paper.thumbnail}` }
      : {}),
  };

  const links = [paper.paperLink, paper.arxivLink, paper.doiLink, paper.codeLink]
    .filter((link): link is string => !!link)
    .filter((link, idx, arr) => arr.indexOf(link) === idx);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-white">
        <div className="bg-[#f9fafb] pt-28 sm:pt-32 lg:pt-36 pb-10 sm:pb-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-4"
            >
              <span className="text-xs font-medium tracking-wide uppercase text-teal-700">
                {paper.venueShort}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 leading-tight mb-5"
            >
              {paper.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-gray-500 text-sm mb-6"
            >
              {renderAuthors(paper.authors)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-wrap gap-x-5 gap-y-2"
            >
              {links.map((link) => {
                const { label, logo, FallbackIcon } = getLinkMeta(link);
                return (
                  <a
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-teal-700 transition-colors"
                  >
                    {logo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={logo}
                        alt=""
                        width={16}
                        height={16}
                        className="w-4 h-4 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    ) : FallbackIcon ? (
                      <FallbackIcon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    ) : null}
                    <span className="group-hover:underline underline-offset-2">{label}</span>
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {paper.thumbnail && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-10"
            >
              <Image
                src={paper.thumbnail}
                alt={`Figure from ${paper.title}`}
                width={800}
                height={500}
                className="w-full h-auto"
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <h2 className="text-xl font-medium text-gray-900 mb-4">Abstract</h2>
            <p className="text-gray-600 leading-[1.7] text-[15px] sm:text-[16px]">
              {paper.abstract}
            </p>
          </motion.div>

          {paper.summary && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-10"
            >
              <h2 className="text-xl font-medium text-gray-900 mb-4">Summary</h2>
              <p className="text-gray-600 leading-[1.7] text-[15px] sm:text-[16px]">
                {paper.summary}
              </p>
            </motion.div>
          )}

          {paper.figures && paper.figures.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mt-10 space-y-8"
            >
              {paper.figures.map((fig, idx) => (
                <figure key={idx}>
                  <Image
                    src={fig.src}
                    alt={fig.caption}
                    width={800}
                    height={500}
                    className="w-full h-auto"
                  />
                  <figcaption className="mt-3 text-sm text-gray-500 italic text-center">
                    {fig.caption}
                  </figcaption>
                </figure>
              ))}
            </motion.div>
          )}

          {paper.bibtex && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-10 pt-6 border-t border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-500">
                  BibTeX
                </h2>
                <CopyBibtexButton bibtex={paper.bibtex} />
              </div>
              <pre className="bg-gray-50 border border-gray-100 rounded-md p-4 overflow-x-auto text-xs text-gray-700 font-mono leading-relaxed">
                <code>{paper.bibtex}</code>
              </pre>
            </motion.div>
          )}

        </div>
      </article>
    </>
  );
}
