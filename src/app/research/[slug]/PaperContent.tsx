'use client';

import { useEffect, useMemo, useState, ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import Image from 'next/image';
import type { Paper } from '@/data/papers';
import { PaperIcon, PackageIcon, ExternalLinkIcon } from '@/components/icons';

const AUTHOR_NAME = 'Najmul Hasan';
const SITE_URL = 'https://najmulhasan-code.github.io';

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

type SectionLink = {
  id: string;
  label: string;
};

function getLinkMeta(url: string): LinkMeta {
  const domain = getDomain(url);
  if (domain.includes('arxiv')) return { label: 'arXiv', logo: '/logos/arxiv.png' };
  if (domain.includes('github')) return { label: 'View code', logo: '/logos/github.png' };
  if (domain.includes('pypi')) return { label: 'PyPI', logo: '/logos/pypi.ico' };
  if (domain.includes('npmjs')) return { label: 'npm', FallbackIcon: PackageIcon };
  if (domain.includes('huggingface')) return { label: 'Hugging Face', FallbackIcon: PackageIcon };
  if (domain.includes('ieee')) return { label: 'IEEE Xplore', logo: '/logos/ieee.ico' };
  if (domain.includes('openreview')) return { label: 'OpenReview', FallbackIcon: PaperIcon };
  if (domain.includes('apartresearch')) return { label: 'Read paper', logo: '/logos/apart.png' };
  if (domain.includes('doi.org')) return { label: 'DOI', FallbackIcon: PaperIcon };
  if (domain.includes('scholar.google')) return { label: 'Google Scholar', logo: '/logos/scholar.ico' };
  return { label: 'View', FallbackIcon: ExternalLinkIcon };
}

function buildSectionNavigation(contentHtml: string): {
  html: string;
  sections: SectionLink[];
} {
  const sections: SectionLink[] = [];
  const usedIds = new Set<string>();

  const html = contentHtml.replace(
    /<h2([^>]*)>([\s\S]*?)<\/h2>/gi,
    (heading, attributes: string, innerHtml: string) => {
      const label = innerHtml
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&nbsp;/g, ' ')
        .trim();
      const existingId = attributes.match(/\sid=["']([^"']+)["']/i)?.[1];
      const baseId = existingId || label
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      let id = baseId || `section-${sections.length + 1}`;
      let suffix = 2;
      while (usedIds.has(id)) {
        id = `${baseId}-${suffix}`;
        suffix += 1;
      }

      usedIds.add(id);
      sections.push({ id, label });

      return existingId
        ? heading
        : `<h2${attributes} id="${id}">${innerHtml}</h2>`;
    }
  );

  return { html, sections };
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
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-600 hover:text-teal-700 bg-surface border border-gray-200 rounded-md hover:border-teal-300 transition-colors"
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
  const hasSectionNavigation = paper.slug === 'dpbench';
  const sectionNavigation = useMemo(
    () => hasSectionNavigation
      ? buildSectionNavigation(paper.contentHtml)
      : { html: paper.contentHtml, sections: [] },
    [hasSectionNavigation, paper.contentHtml]
  );
  const [activeSectionId, setActiveSectionId] = useState(
    sectionNavigation.sections[0]?.id ?? ''
  );

  useEffect(() => {
    if (!hasSectionNavigation || sectionNavigation.sections.length === 0) return;

    let frameId: number | null = null;

    const updateActiveSection = () => {
      let currentId = sectionNavigation.sections[0].id;

      sectionNavigation.sections.forEach(({ id }) => {
        const heading = document.getElementById(id);
        if (heading && heading.getBoundingClientRect().top <= 112) {
          currentId = id;
        }
      });

      setActiveSectionId((current) => current === currentId ? current : currentId);
      frameId = null;
    };

    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [hasSectionNavigation, sectionNavigation.sections]);

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
    '@id': `${SITE_URL}/research/${paper.slug}#article`,
    headline: paper.title,
    name: paper.title,
    abstract: paper.abstract,
    url: `${SITE_URL}/research/${paper.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/research/${paper.slug}`,
    },
    inLanguage: 'en',
    author: paper.authors.map((name) => ({
      '@type': 'Person',
      name,
      ...(name === AUTHOR_NAME
        ? {
            '@id': `${SITE_URL}/#person`,
            url: SITE_URL,
            affiliation: {
              '@type': 'EducationalOrganization',
              name: 'University of North Carolina at Pembroke',
            },
          }
        : {}),
    })),
    datePublished: paper.date,
    publisher: { '@type': 'Organization', name: paper.publisher ?? paper.venueShort },
    isPartOf: { '@type': 'PublicationEvent', name: paper.venue },
    keywords: paper.keywords,
    sameAs: [paper.paperLink, paper.arxivLink, paper.doiLink]
      .filter((link): link is string => !!link),
    encoding: [
      {
        '@type': 'MediaObject',
        encodingFormat: 'application/x-bibtex',
        contentUrl: `${SITE_URL}/papers/${paper.slug}/citation.bib`,
      },
      {
        '@type': 'MediaObject',
        encodingFormat: 'application/x-research-info-systems',
        contentUrl: `${SITE_URL}/papers/${paper.slug}/citation.ris`,
      },
    ],
    ...(paper.doi
      ? {
          identifier: {
            '@type': 'PropertyValue',
            propertyID: 'DOI',
            value: paper.doi,
          },
        }
      : {}),
    ...(paper.thumbnail
      ? { image: `${SITE_URL}${paper.thumbnail}` }
      : {}),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Najmul Hasan',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Research',
        item: `${SITE_URL}/research`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: paper.title,
        item: `${SITE_URL}/research/${paper.slug}`,
      },
    ],
  };

  const links = [paper.paperLink, paper.arxivLink, paper.doiLink, paper.codeLink, ...(paper.links ?? [])]
    .filter((link): link is string => !!link)
    .filter((link, idx, arr) => arr.indexOf(link) === idx);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="min-h-screen bg-surface">
        <div className="bg-background pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-4"
            >
              <span className="block text-xs font-medium tracking-wide uppercase text-teal-700">
                {paper.displayVenue ?? paper.venue}
              </span>
              {paper.venueContext && (
                <span className="mt-1.5 block max-w-2xl text-xs leading-relaxed text-gray-500">
                  {paper.venueContext}
                </span>
              )}
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

        <div
          className={`mx-auto px-4 sm:px-6 py-10 sm:py-14 ${
            hasSectionNavigation ? 'max-w-7xl' : 'max-w-5xl'
          }`}
        >
          {paper.thumbnail && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="max-w-4xl mx-auto mb-10 aspect-video flex items-center justify-center"
            >
              <Image
                src={paper.thumbnail}
                alt={`Figure from ${paper.title}`}
                width={800}
                height={500}
                className="w-full h-full object-contain"
              />
            </motion.div>
          )}

          <div
            className={
              hasSectionNavigation
                ? 'xl:grid xl:grid-cols-[minmax(10rem,1fr)_minmax(0,80ch)_minmax(10rem,1fr)] xl:gap-8 xl:items-start'
                : ''
            }
          >
            {hasSectionNavigation && (
              <>
                <aside className="hidden xl:block xl:col-start-1 xl:row-start-1 xl:self-stretch">
                  <nav
                    aria-label="DPBench sections"
                    className="sticky top-24 ml-auto w-52 max-h-[calc(100vh-7rem)] overflow-y-auto pr-3"
                  >
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      On this page
                    </p>
                    <ol className="border-l border-gray-200">
                      {sectionNavigation.sections.map((section) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            onClick={() => setActiveSectionId(section.id)}
                            className={`block -ml-px border-l-2 py-1.5 pl-3 text-xs leading-relaxed transition-colors ${
                              activeSectionId === section.id
                                ? 'border-teal-600 text-teal-700'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900'
                            }`}
                          >
                            {section.label}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </aside>

                <details className="mb-8 rounded-md border border-gray-200 bg-background px-4 py-3 xl:hidden">
                  <summary className="cursor-pointer text-sm font-semibold text-gray-800">
                    On this page
                  </summary>
                  <ol className="mt-3 space-y-2 border-l border-gray-200 pl-3">
                    {sectionNavigation.sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={() => setActiveSectionId(section.id)}
                          className="text-sm leading-relaxed text-gray-600 hover:text-teal-700"
                        >
                          {section.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              </>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className={`prose prose-lg prose-gray mx-auto !max-w-[80ch] ${
                hasSectionNavigation ? 'xl:col-start-2 xl:row-start-1' : ''
              }`}
              dangerouslySetInnerHTML={{ __html: sectionNavigation.html }}
            />
          </div>

          {paper.bibtex && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="max-w-4xl mx-auto mt-10 pt-6 border-t border-gray-100"
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
