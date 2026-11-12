'use client';

import { useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { newsItems, formatMonthYear, groupByYear, NewsItem } from '@/data/news';

// Rows of the newest year shown before the reader opens the full list. Kept small so the
// sections after News stay close to the top of the page.
const PREVIEW_COUNT = 3;

const FOLD = 'grid transition-[grid-template-rows] duration-500 ease-out';

function NewsListItem({ item }: { item: NewsItem }) {
  const { month } = formatMonthYear(item.date);
  return (
    <li className="flex gap-5 sm:gap-6">
      <div className="flex-shrink-0 w-10 sm:w-12 pt-0.5">
        <span className="text-[13px] text-gray-500 font-medium">{month}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[15px] font-medium text-gray-900 leading-snug">
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link transition-colors"
            >
              {item.title}
            </a>
          ) : (
            item.title
          )}
        </h4>
        {item.description && (
          <p className="mt-1 text-[13.5px] text-gray-600 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </li>
  );
}

function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <ul className="space-y-5">
      {items.map((item, index) => (
        <NewsListItem key={`${item.date}-${index}`} item={item} />
      ))}
    </ul>
  );
}

function YearLabel({ year }: { year: string }) {
  return <h3 className="mb-4 text-sm font-semibold text-gray-900">{year}</h3>;
}

export default function News() {
  const sectionRef = useRef<HTMLElement>(null);
  const [latest, ...earlierYears] = useMemo(() => groupByYear(newsItems), []);
  const [showAll, setShowAll] = useState(false);

  if (!latest) return null;

  const preview = latest.items.slice(0, PREVIEW_COUNT);
  const restOfLatest = latest.items.slice(PREVIEW_COUNT);
  const hasMore = restOfLatest.length > 0 || earlierYears.length > 0;

  const toggleAll = () => {
    // Closing the full list from its end would leave the reader far below the section.
    const section = sectionRef.current;
    if (showAll && section && section.getBoundingClientRect().top < 0) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      section.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    setShowAll(!showAll);
  };

  return (
    <section
      id="news"
      ref={sectionRef}
      className="watercolor-section watercolor-mist pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10 lg:pb-12"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-6 sm:mb-7">
          <h2 className="section-heading text-2xl sm:text-3xl font-bold text-gray-900">News</h2>
        </div>

        <YearLabel year={latest.year} />
        <NewsList items={preview} />

        {hasMore && (
          <>
            <div
              id="news-more"
              inert={!showAll}
              className={`${FOLD} ${showAll ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                {restOfLatest.length > 0 && (
                  <div className="pt-5">
                    <NewsList items={restOfLatest} />
                  </div>
                )}

                {earlierYears.map(({ year, items }) => (
                  <div key={year} className="mt-7 border-t border-gray-200 pt-6">
                    <YearLabel year={year} />
                    <NewsList items={items} />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={toggleAll}
              aria-expanded={showAll}
              aria-controls="news-more"
              className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-medium text-gray-700 transition-colors hover:text-teal-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
            >
              {showAll ? 'Show less' : 'All news'}
              <ChevronDown
                aria-hidden="true"
                className={`h-4 w-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
              />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
