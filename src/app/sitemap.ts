import type { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/data/blog';
import { getAllPapers } from '@/data/papers';

const SITE_URL = 'https://najmulhasan-code.github.io';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const papers = getAllPapers();
  const posts = getAllBlogPosts();

  return [
    {
      url: SITE_URL,
    },
    {
      url: `${SITE_URL}/research`,
    },
    ...papers.map((paper) => ({
      url: `${SITE_URL}/research/${paper.slug}`,
    })),
    {
      url: `${SITE_URL}/blog`,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      ...(post.updatedDate ? { lastModified: new Date(post.updatedDate) } : {}),
    })),
  ];
}
