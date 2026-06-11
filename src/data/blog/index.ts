// Loads blog posts from public/blog/<slug>/ (meta.json + index.html). Server-only.

import fs from 'node:fs';
import path from 'node:path';
import { readContentHtml, resolveTeaser } from '../content';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  updatedDate?: string;
  description: string;
  excerpt?: string;
  category: string;
  tags: string[];
  published: boolean;
  thumbnail?: string;
  links?: string[];
  contentHtml: string;
}

const BLOG_DIR = path.join(process.cwd(), 'public', 'blog');

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map((item) => String(item)) : [];
}

function readBlogPost(slug: string): BlogPost | null {
  const dir = path.join(BLOG_DIR, slug);
  const metaFile = path.join(dir, 'meta.json');
  const htmlFile = path.join(dir, 'index.html');
  if (!fs.existsSync(metaFile) || !fs.existsSync(htmlFile)) return null;

  const meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
  const urlBase = `/blog/${slug}`;

  return {
    slug,
    title: String(meta.title ?? ''),
    date: String(meta.date ?? ''),
    updatedDate: meta.updatedDate ? String(meta.updatedDate) : undefined,
    description: String(meta.description ?? ''),
    excerpt: meta.excerpt ? String(meta.excerpt) : undefined,
    category: String(meta.category ?? ''),
    tags: asStringArray(meta.tags),
    published: meta.published !== false,
    thumbnail: resolveTeaser(dir, urlBase),
    links: meta.links ? asStringArray(meta.links) : undefined,
    contentHtml: readContentHtml(htmlFile, urlBase),
  };
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => readBlogPost(entry.name))
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const post = readBlogPost(slug);
  return post && post.published ? post : undefined;
}
