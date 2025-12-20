'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { getAllPosts } from '@/data/posts';

/**
 * Formats date string to month and year for badge display
 * Parses date manually to avoid timezone issues
 */
function formatDateBadge(dateString: string): { month: string; year: string } {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const monthStr = date.toLocaleDateString('en-US', { month: 'short' });
  return { month: monthStr, year: year.toString() };
}

export default function Writing() {
  const posts = getAllPosts();

  return (
    <section id="writing" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Writing
          </h2>
        </motion.div>

        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <p className="text-gray-600">Coming soon...</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => {
              const { month, year } = formatDateBadge(post.date);
              return (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link href={`/writing/${post.slug}`} className="flex gap-4 group">
                    {/* Date Badge */}
                    <div className="flex-shrink-0 w-24 sm:w-28">
                      <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                        {month} {year}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 leading-snug mb-1 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}

          </div>
        )}
      </div>
    </section>
  );
}
