'use client';

import { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/format';
import type { BlogPost } from '@/data/blog';
import { PaperIcon, PackageIcon, ExternalLinkIcon } from '@/components/icons';

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
  return (
    <article className="min-h-screen bg-surface">
      <div className="bg-background pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 leading-tight mb-5"
          >
            {post.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-gray-500 text-sm"
          >
            {formatDate(post.date)}
            {post.updatedDate && ` · Updated ${formatDate(post.updatedDate)}`}
          </motion.p>

          {post.links && post.links.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-wrap gap-x-5 gap-y-2 mt-6"
            >
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
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="prose prose-lg prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </article>
  );
}
