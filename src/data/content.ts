// Server-only helpers for the content folders under public/papers and public/blog.

import fs from 'node:fs';
import path from 'node:path';

const TEASER_EXTENSIONS = ['png', 'jpg', 'jpeg', 'svg', 'webp'];

function isAbsoluteUrl(src: string): boolean {
  return /^(https?:)?\/\//.test(src) || src.startsWith('/') || src.startsWith('data:');
}

// Public URL of the folder's teaser image, if one exists.
export function resolveTeaser(dir: string, urlBase: string): string | undefined {
  for (const ext of TEASER_EXTENSIONS) {
    if (fs.existsSync(path.join(dir, `teaser.${ext}`))) {
      return `${urlBase}/teaser.${ext}`;
    }
  }
  return undefined;
}

// Read an HTML fragment, resolving relative image paths and lazy-loading images.
export function readContentHtml(file: string, urlBase: string): string {
  let html = fs.readFileSync(file, 'utf8');

  html = html.replace(
    /(<img\b[^>]*?\bsrc=)("|')(.*?)\2/gi,
    (match, prefix, quote, src) =>
      isAbsoluteUrl(src) ? match : `${prefix}${quote}${urlBase}/${src}${quote}`
  );

  html = html.replace(/<img\b(?![^>]*\bloading=)/gi, '<img loading="lazy"');

  return html;
}
