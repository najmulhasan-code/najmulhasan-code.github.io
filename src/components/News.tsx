'use client';

import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { newsItems, formatMonthYear, groupByYear, NewsItem } from '@/data/news';

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

interface NewsYearProps {
  year: string;
  items: NewsItem[];
  isLatest: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

function NewsYear({ year, items, isLatest, isOpen, onToggle }: NewsYearProps) {
  const reduceMotion = useReducedMotion();
  const buttonId = `news-year-${year}-button`;
  const panelId = `news-year-${year}-panel`;

  return (
    <div className="border-t border-gray-200 last:border-b">
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-4 rounded-sm py-4 text-left focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
      >
        <span className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-900">{year}</span>
          {isLatest && (
            <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-teal-800">
              Latest
            </span>
          )}
        </span>

        <span className="flex items-center gap-3 text-xs text-gray-500">
          <span>{items.length} {items.length === 1 ? 'update' : 'updates'}</span>
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 transition-transform duration-300 group-hover:text-teal-700 ${isOpen ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        inert={!isOpen}
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <ul className="space-y-5 pb-7 pt-1">
          {items.map((item, index) => (
            <NewsListItem key={`${item.date}-${index}`} item={item} />
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function News() {
  const groupedNews = useMemo(() => groupByYear(newsItems), []);
  const latestYear = groupedNews[0]?.year ?? null;
  const [openYears, setOpenYears] = useState<Set<string>>(
    () => new Set(latestYear ? [latestYear] : [])
  );

  const toggleYear = (year: string) => {
    setOpenYears((current) => {
      const next = new Set(current);
      if (next.has(year)) {
        next.delete(year);
      } else {
        next.add(year);
      }
      return next;
    });
  };

  return (
    <section id="news" className="watercolor-section watercolor-mist pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 lg:pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="section-heading text-2xl sm:text-3xl font-bold text-gray-900">News</h2>
        </div>

        <div>
          {groupedNews.map(({ year, items }) => (
            <NewsYear
              key={year}
              year={year}
              items={items}
              isLatest={year === latestYear}
              isOpen={openYears.has(year)}
              onToggle={() => toggleYear(year)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
