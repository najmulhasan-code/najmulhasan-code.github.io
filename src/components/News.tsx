'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { newsItems, formatMonthYear, groupByYear, NewsItem } from '@/data/news';

const INITIAL_DISPLAY_COUNT = 6;

function YearHeader({ year }: { year: string }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <h3 className="text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase">
        {year}
      </h3>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

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
              className="hover:text-teal-700 transition-colors"
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

const collapseTransition = { duration: 0.45, ease: [0.04, 0.62, 0.23, 0.98] as [number, number, number, number] };

export default function News() {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = useMemo(() => newsItems.slice(0, INITIAL_DISPLAY_COUNT), []);
  const extraItems = useMemo(() => newsItems.slice(INITIAL_DISPLAY_COUNT), []);

  const visibleGrouped = useMemo(() => groupByYear(visibleItems), [visibleItems]);
  const extraGrouped = useMemo(() => groupByYear(extraItems), [extraItems]);

  const visibleYearsSet = useMemo(
    () => new Set(visibleGrouped.map((g) => g.year)),
    [visibleGrouped]
  );
  const freshYears = useMemo(
    () => extraGrouped.filter((g) => !visibleYearsSet.has(g.year)),
    [extraGrouped, visibleYearsSet]
  );

  const handleToggle = () => {
    const willCollapse = expanded;
    if (willCollapse) {
      const section = document.getElementById('news');
      if (section) {
        const navbarHeight = 72;
        const top = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      setTimeout(() => setExpanded(false), 250);
    } else {
      setExpanded(true);
    }
  };

  return (
    <section id="news" className="py-12 sm:py-16 lg:py-20 bg-[#f8fafa]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">News</h2>
        </motion.div>

        <div>
          {visibleGrouped.map(({ year, items }, yearIdx) => {
            const continuation = extraGrouped.find((g) => g.year === year);
            return (
              <div key={year} className={yearIdx > 0 ? 'mt-10' : ''}>
                <YearHeader year={year} />
                <ul className="space-y-5">
                  {items.map((item, idx) => (
                    <NewsListItem key={`${item.date}-${idx}`} item={item} />
                  ))}
                </ul>

                <AnimatePresence initial={false}>
                  {expanded && continuation && (
                    <motion.div
                      key="continuation"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={collapseTransition}
                      style={{ overflow: 'hidden' }}
                    >
                      <ul className="mt-5 space-y-5">
                        {continuation.items.map((item, idx) => (
                          <NewsListItem key={`${item.date}-ct-${idx}`} item={item} />
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <AnimatePresence initial={false}>
            {expanded &&
              freshYears.map(({ year, items }) => (
                <motion.div
                  key={year}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={collapseTransition}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="mt-10">
                    <YearHeader year={year} />
                    <ul className="space-y-5">
                      {items.map((item, idx) => (
                        <NewsListItem key={`${item.date}-${idx}`} item={item} />
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {newsItems.length > INITIAL_DISPLAY_COUNT && (
          <div className="mt-10">
            <button
              onClick={handleToggle}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-teal-700 transition-colors focus:outline-none focus-visible:outline-none"
            >
              {expanded ? 'Show less' : 'Show all'}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
