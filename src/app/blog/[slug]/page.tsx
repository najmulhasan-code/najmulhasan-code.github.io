import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllBlogPosts, getBlogPostBySlug } from '@/data/blog';
import BlogContent from './BlogContent';

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = 'https://najmulhasan-code.github.io';

export function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const image = post.thumbnail ? `${SITE_URL}${post.thumbnail}` : undefined;

  return {
    title: `${post.title} | Najmul Hasan`,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Najmul Hasan'],
      tags: post.tags,
      url: canonical,
      ...(post.updatedDate ? { modifiedTime: post.updatedDate } : {}),
      ...(image ? { images: [{ url: image, alt: post.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogContent post={post} />;
}
