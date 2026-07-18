'use client';

import { motion } from 'framer-motion';
import { FileText, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Paper } from '@/data/papers';

const AUTHOR_NAME = 'Najmul Hasan';

export default function Publications({ papers }: { papers: Paper[] }) {
  const publications = papers;

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

  return (
    <section id="research" className="py-12 sm:py-16 lg:py-20 bg-[#f8fafa]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Research
          </h2>
        </motion.div>

        {publications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <FileText className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600">Publications coming soon...</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {publications.map((pub, index) => (
              <motion.article
                key={pub.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative bg-white rounded-md overflow-hidden border border-gray-200 hover:border-teal-600 shadow-[0_0_24px_rgba(0,0,0,0.06)] hover:shadow-[0_0_40px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col border-t-[6px] border-t-teal-600 cursor-pointer"
              >
                <Link href={`/research/${pub.slug}`} className="absolute inset-0 z-10" aria-label={`Read more about ${pub.title}`} />

                {pub.thumbnail && (
                  <div className="aspect-[16/9] flex items-center justify-center overflow-hidden">
                    <Image
                      src={pub.thumbnail}
                      alt={pub.title}
                      width={600}
                      height={338}
                      className="object-contain w-[85%] h-[85%] group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="px-4 pt-4 pb-4 flex flex-col flex-1">
                  <h3 className="text-[15px] sm:text-[16px] font-medium text-gray-900 leading-snug mb-1.5 group-hover:text-teal-800 transition-colors line-clamp-2">
                    {pub.title}
                  </h3>

                  <p className="text-[12.5px] sm:text-[13px] text-gray-500 mb-2 line-clamp-1">
                    {renderAuthors(pub.authors)}
                  </p>

                  <p className="text-[12.5px] sm:text-[13px] text-gray-400 leading-relaxed line-clamp-3 flex-1">
                    {pub.abstract}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 relative z-20 pointer-events-none">
                    <span className="text-[11px] font-medium tracking-wide uppercase text-teal-700">
                      {pub.venueShort}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[13px] font-medium text-gray-600 group-hover:text-teal-700 transition-colors cursor-pointer">
                      Read more <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
