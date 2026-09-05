import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/format';
import type { BlogPost } from '@/data/blog';

export default function Blog({ posts }: { posts: BlogPost[] }) {

  return (
    <section id="blog" className="watercolor-section watercolor-paper py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <h2 className="section-heading text-2xl sm:text-3xl font-bold text-gray-900">
            Blog
          </h2>
        </div>

        {posts.length === 0 ? (
          <div className="text-sm text-gray-500">
            Coming soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="watercolor-card group relative rounded-lg border hover:border-teal-600 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="absolute inset-0 z-10 focus-visible:outline-none"
                  aria-label={`Read ${post.title}`}
                />

                {post.thumbnail && (
                  <div
                    className="aspect-video flex items-center justify-center overflow-hidden border-b border-gray-100"
                    style={{ backgroundColor: post.thumbnailBackground ?? 'var(--gray-50)' }}
                  >
                    <Image
                      src={post.thumbnail}
                      alt=""
                      width={post.thumbnailWidth ?? 1200}
                      height={post.thumbnailHeight ?? 630}
                      sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1152px) calc(50vw - 2rem), 544px"
                      className={`w-full h-full group-hover:scale-[1.02] transition-transform duration-300 ${
                        post.thumbnailFit === 'cover' ? 'object-cover' : 'object-contain'
                      }`}
                    />
                  </div>
                )}

                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-700">
                    {post.category}
                  </div>
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
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
