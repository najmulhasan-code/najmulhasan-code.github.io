'use client';

import { serializeJsonLd } from '@/lib/structured-data';
import { ComponentType, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { formatDate } from '@/lib/format';
import type { BlogPost } from '@/data/blog';
import { PaperIcon, PackageIcon, ExternalLinkIcon } from '@/components/icons';

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

function getLinkMeta(url: string): LinkMeta {
  const domain = getDomain(url);
  if (domain.includes('github')) return { label: 'View code', logo: '/logos/github.png' };
  if (domain.includes('pypi')) return { label: 'PyPI', logo: '/logos/pypi.ico' };
  if (domain.includes('npmjs')) return { label: 'npm', FallbackIcon: PackageIcon };
  if (domain.includes('huggingface')) return { label: 'Hugging Face', FallbackIcon: PackageIcon };
  if (domain.includes('arxiv')) return { label: 'arXiv', logo: '/logos/arxiv.png' };
  if (domain.includes('openreview')) return { label: 'OpenReview', FallbackIcon: PaperIcon };
  if (domain.includes('ieee')) return { label: 'IEEE Xplore', logo: '/logos/ieee.ico' };
  if (domain.includes('scholar.google')) return { label: 'Google Scholar', logo: '/logos/scholar.ico' };
  return { label: 'View', FallbackIcon: ExternalLinkIcon };
}

interface BlogContentProps {
  post: BlogPost;
}

export default function BlogContent({ post }: BlogContentProps) {
  const sectionNavigation = useMemo(
    () => buildSectionNavigation(post.contentHtml),
    [post.contentHtml]
  );
  const hasSectionNavigation = sectionNavigation.sections.length >= 3;
  const [activeSectionId, setActiveSectionId] = useState(
    sectionNavigation.sections[0]?.id ?? ''
  );

  useEffect(() => {
    if (!hasSectionNavigation) return;

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

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [hasSectionNavigation, sectionNavigation.sections]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    datePublished: post.date,
    ...(post.updatedDate ? { dateModified: post.updatedDate } : {}),
    inLanguage: 'en',
    keywords: post.tags,
    articleSection: post.category,
    isAccessibleForFree: true,
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Najmul Hasan',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Najmul Hasan',
    },
    ...(post.thumbnail ? { image: `${SITE_URL}${post.thumbnail}` } : {}),
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
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <article id="main-content" tabIndex={-1} className="watercolor-article min-h-screen bg-surface">
        <div className="watercolor-article-hero pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="mb-4 text-xs font-medium uppercase tracking-wide text-teal-700">
              {post.category}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 leading-tight mb-5">
              {post.title}
            </h1>

            <p className="text-gray-500 text-sm">
              <span className="text-teal-700">Najmul Hasan</span>
              {' · '}
              {formatDate(post.date)}
              {post.updatedDate && ` · Updated ${formatDate(post.updatedDate)}`}
            </p>

            {post.links && post.links.length > 0 && (
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6">
                {post.links.map((link) => {
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
              </div>
            )}
          </div>
        </div>

        <div
          className={`mx-auto px-4 sm:px-6 py-10 sm:py-14 ${
            hasSectionNavigation ? 'max-w-7xl' : 'max-w-5xl'
          }`}
        >
          {post.thumbnail && (
            <figure
              id="figure-1"
              className="min-w-0 mx-auto mb-10"
              style={{ width: 'min(100%, 56rem)' }}
            >
              <div
                className="w-full min-w-0 overflow-hidden rounded-md ring-1 ring-gray-100"
                style={{ backgroundColor: post.thumbnailBackground ?? 'var(--gray-50)' }}
              >
                <Image
                  src={post.thumbnail}
                  alt={post.thumbnailAlt ?? `Teaser for ${post.title}`}
                  width={post.thumbnailWidth ?? 1200}
                  height={post.thumbnailHeight ?? 630}
                  sizes="(max-width: 768px) calc(100vw - 2rem), 896px"
                  className="block w-full min-w-0 max-w-full h-auto object-contain"
                  preload
                />
              </div>
              {post.thumbnailCaption && (
                <figcaption className="mt-3 text-left text-sm leading-relaxed text-gray-500">
                  {post.thumbnailCaption}
                </figcaption>
              )}
            </figure>
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
                    aria-label="Blog post sections"
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

            <div
              className={`prose prose-lg prose-gray mx-auto !max-w-[72ch] text-base sm:text-[1.0625rem] ${
                hasSectionNavigation ? 'xl:col-start-2 xl:row-start-1' : ''
              }`}
              dangerouslySetInnerHTML={{ __html: sectionNavigation.html }}
            />
          </div>
        </div>
      </article>
    </>
  );
}
