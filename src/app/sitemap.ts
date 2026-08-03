import type { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/data/blog';
import { getAllPapers } from '@/data/papers';

const SITE_URL = 'https://najmulhasan-code.github.io';

export const dynamic = 'force-static';

function latestDate(dates: string[]): Date {
  const latest = [...dates].filter(Boolean).sort().at(-1);
  return new Date(latest ?? '2025-01-01');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const papers = getAllPapers();
  const posts = getAllBlogPosts();
  const paperDates = papers.map((paper) => paper.date);
  const postDates = posts.map((post) => post.updatedDate ?? post.date);
  const allDates = [...paperDates, ...postDates];

  return [
    {
      url: SITE_URL,
      lastModified: latestDate(allDates),
    },
    {
      url: `${SITE_URL}/research`,
      lastModified: latestDate(paperDates),
    },
    ...papers.map((paper) => ({
      url: `${SITE_URL}/research/${paper.slug}`,
      lastModified: new Date(paper.date),
    })),
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestDate(postDates),
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedDate ?? post.date),
    })),
  ];
}
