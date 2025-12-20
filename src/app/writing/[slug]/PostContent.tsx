'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Post, formatDate } from '@/data/posts';

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} />
          <span>Writing</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-500 text-sm">
            {formatDate(post.date)}
            {post.updatedDate && ` · Updated ${formatDate(post.updatedDate)}`}
            {' · '}{post.readingTime} min read
          </p>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="prose prose-lg prose-gray max-w-none"
        >
          {post.content}
        </motion.article>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-8 border-t border-gray-100"
        >
          <Link
            href="/writing"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Back to writing
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
