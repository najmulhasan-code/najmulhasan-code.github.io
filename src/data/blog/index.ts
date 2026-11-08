// Loads blog posts from public/blog/<slug>/ (meta.json + index.html). Server-only.

import fs from 'node:fs';
import path from 'node:path';
import { readContentHtml, resolvePostStylesheet, resolveTeaser, resolveTeaserVideo } from '../content';

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
  thumbnailFit?: 'contain' | 'cover';
  thumbnailBackground?: string;
  thumbnailAlt?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  thumbnailCaption?: string;
  thumbnailVideo?: string;
  links?: string[];
  resources?: BlogResource[];
  stylesheet?: string;
  contentHtml: string;
}

// Optional labelled link buttons shown under the title. When a post has none, its
// plain `links` are shown instead, labelled by domain.
export interface BlogResource {
  label: string;
  url: string;
  icon?: string;
}

const BLOG_DIR = path.join(process.cwd(), 'public', 'blog');

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map((item) => String(item)) : [];
}

function asResources(value: unknown): BlogResource[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const resources = value
    .filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null)
    .filter((item) => typeof item.label === 'string' && typeof item.url === 'string')
    .map((item) => ({
      label: String(item.label),
      url: String(item.url),
      ...(typeof item.icon === 'string' ? { icon: item.icon } : {}),
    }));
  return resources.length > 0 ? resources : undefined;
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
    thumbnailFit: meta.thumbnailFit === 'cover' ? 'cover' : 'contain',
    thumbnailBackground: meta.thumbnailBackground ? String(meta.thumbnailBackground) : undefined,
    thumbnailAlt: meta.thumbnailAlt ? String(meta.thumbnailAlt) : undefined,
    thumbnailWidth: Number.isFinite(meta.thumbnailWidth) ? Number(meta.thumbnailWidth) : undefined,
    thumbnailHeight: Number.isFinite(meta.thumbnailHeight) ? Number(meta.thumbnailHeight) : undefined,
    thumbnailCaption: meta.thumbnailCaption ? String(meta.thumbnailCaption) : undefined,
    thumbnailVideo: resolveTeaserVideo(dir, urlBase),
    links: meta.links ? asStringArray(meta.links) : undefined,
    resources: asResources(meta.resources),
    stylesheet: resolvePostStylesheet(dir, urlBase),
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
