import type { Metadata } from 'next';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import { getAllBlogPosts } from '@/data/blog';

const SITE_URL = 'https://najmulhasan-code.github.io';

export const metadata: Metadata = {
  title: 'Blog | Najmul Hasan',
  description: 'Writing by Najmul Hasan on language-model training and evaluation, AI alignment, and research projects.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/blog#posts`,
    name: 'Blog posts by Najmul Hasan',
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Blog posts={posts} />
      <Footer />
    </main>
  );
}
