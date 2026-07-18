'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/format';
import type { BlogPost } from '@/data/blog';

export default function Blog({ posts }: { posts: BlogPost[] }) {

  return (
    <section id="blog" className="py-12 sm:py-16 lg:py-20 bg-surface border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Blog
          </h2>
        </motion.div>

        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm text-gray-500"
          >
            Coming soon.
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative bg-surface rounded-lg border border-gray-200 hover:border-teal-600 hover:shadow-[0_16px_36px_rgba(23,43,49,0.09)] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={`Read ${post.title}`}
                />

                {post.thumbnail && (
                  <div className="flex items-center justify-center overflow-hidden bg-gray-50 border-b border-gray-100">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      width={1200}
                      height={630}
                      className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-2 group-hover:text-teal-800 transition-colors">
                    {post.title}
                  </h3>
                  <div className="text-xs text-gray-500 mb-4">
                    {formatDate(post.date)}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-5 flex-1">
                    {post.excerpt || post.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 group-hover:text-teal-700 transition-colors mt-5">
                    Read more <ArrowUpRight size={14} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
