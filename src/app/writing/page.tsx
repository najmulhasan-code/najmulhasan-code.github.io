'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getAllPosts } from '@/data/posts';

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} />
          <span>Home</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Writing
          </h1>
          <p className="text-gray-500 mb-12">
            Notes on projects, research, and technical problems.
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <p className="text-gray-500">Nothing here yet.</p>
        ) : (
          <div className="space-y-1">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/writing/${post.slug}`} className="block group">
                  <div className="flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50 -mx-4 px-4 transition-colors">
                    <div className="flex-1 min-w-0 pr-4">
                      <h2 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-500 text-sm mt-0.5 truncate">
                        {post.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-4 text-sm text-gray-400">
                      <span>{post.date.split('-')[0]}</span>
                      <ArrowRight size={14} className="group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
