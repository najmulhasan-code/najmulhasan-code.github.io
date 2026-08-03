import fs from 'node:fs';
import path from 'node:path';
import {
  buildResearchAssets,
  expectedSitemapUrls,
  loadResearchContent,
  SITE_URL,
} from './research-assets.mjs';

const root = process.cwd();
const out = path.join(root, 'out');
const content = loadResearchContent(root);
const errors = [];

function exportedHtml(route) {
  if (route === '/') return path.join(out, 'index.html');
  const relative = route.replace(/^\//, '');
  const candidates = [path.join(out, `${relative}.html`), path.join(out, relative, 'index.html')];
  return candidates.find((file) => fs.existsSync(file));
}

function requireHtml(route) {
  const file = exportedHtml(route);
  if (!file) {
    errors.push(`Missing exported page: ${route}.`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
}

function decodeHtml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function metadataValues(html, name) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) => tag.match(/\bname=["']([^"']*)["']/i)?.[1] === name)
    .map((tag) => decodeHtml(tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] ?? ''));
}

function expectMeta(html, name, values, route) {
  const actual = metadataValues(html, name);
  const expected = Array.isArray(values) ? values : [values];
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    errors.push(`${route}: ${name} mismatch.`);
  }
}

function hasLink(html, attributes) {
  return [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => match[0])
    .some((tag) => Object.entries(attributes).every(([name, value]) => {
      const actual = tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))?.[1];
      return decodeHtml(actual ?? '') === value;
    }));
}

const homepage = requireHtml('/');
if (!homepage.includes('"@type":"ProfilePage"')) errors.push('/: missing ProfilePage structured data.');
if (!homepage.includes('/images/najmul_hasan.webp')) errors.push('/: missing optimized profile image.');
if (!homepage.includes('/images/najmul_hasan-social.jpg')) errors.push('/: missing social-preview image metadata.');
if (homepage.includes('/images/najmul_hasan.JPEG')) errors.push('/: references the superseded profile image.');

for (const asset of ['images/najmul_hasan.webp', 'images/najmul_hasan-social.jpg', 'profile-favicon.png']) {
  if (!fs.existsSync(path.join(out, ...asset.split('/')))) errors.push(`Missing exported visual asset: /${asset}.`);
}

for (const paper of content.papers) {
  const route = `/research/${paper.slug}`;
  const html = requireHtml(route);
  if (!html) continue;
  expectMeta(html, 'citation_title', paper.title, route);
  expectMeta(html, 'citation_author', paper.authors, route);
  expectMeta(html, 'citation_publication_date', paper.year, route);
  expectMeta(html, 'citation_online_date', paper.date, route);
  expectMeta(html, 'citation_public_url', paper.canonicalUrl, route);
  if (!hasLink(html, { rel: 'canonical', href: paper.canonicalUrl })) errors.push(`${route}: canonical link mismatch.`);
  if (!hasLink(html, {
    rel: 'alternate',
    type: 'application/x-bibtex',
    href: `${SITE_URL}/papers/${paper.slug}/citation.bib`,
  })) errors.push(`${route}: missing BibTeX alternate link.`);
  if (!hasLink(html, {
    rel: 'alternate',
    type: 'application/x-research-info-systems',
    href: `${SITE_URL}/papers/${paper.slug}/citation.ris`,
  })) errors.push(`${route}: missing RIS alternate link.`);
  if (paper.doi) expectMeta(html, 'citation_doi', paper.doi, route);
  if (paper.arxiv) {
    expectMeta(html, 'citation_arxiv_id', paper.arxiv.id, route);
    expectMeta(html, 'citation_pdf_url', paper.arxiv.pdfUrl, route);
  }
  if (!html.includes('"@type":"ScholarlyArticle"')) errors.push(`${route}: missing ScholarlyArticle structured data.`);
  if (!html.includes('"@type":"BreadcrumbList"')) errors.push(`${route}: missing breadcrumb structured data.`);
  if (!html.includes(`/papers/${paper.slug}/citation.bib`)) errors.push(`${route}: missing BibTeX discovery link.`);
  if (!html.includes(`/papers/${paper.slug}/citation.ris`)) errors.push(`${route}: missing RIS discovery link.`);
}

for (const post of content.posts) {
  const route = `/blog/${post.slug}`;
  const html = requireHtml(route);
  if (!html.includes('"@type":"BlogPosting"')) errors.push(`${route}: missing BlogPosting structured data.`);
  if (!html.includes('"@type":"BreadcrumbList"')) errors.push(`${route}: missing breadcrumb structured data.`);
  if (!hasLink(html, { rel: 'canonical', href: post.canonicalUrl })) errors.push(`${route}: canonical link mismatch.`);
  if (post.thumbnailUrl && !html.includes(post.thumbnailUrl.replace(SITE_URL, ''))) {
    errors.push(`${route}: missing teaser image.`);
  }

  const source = fs.readFileSync(path.join(post.sourceDirectory, 'index.html'), 'utf8');
  const sectionCount = [...source.matchAll(/<h2\b[^>]*>/gi)].length;
  if (sectionCount >= 3 && !html.includes('On this page')) {
    errors.push(`${route}: missing section navigation for a long post.`);
  }
}

const sitemapFile = path.join(out, 'sitemap.xml');
if (!fs.existsSync(sitemapFile)) {
  errors.push('Missing exported sitemap.xml.');
} else {
  const sitemap = fs.readFileSync(sitemapFile, 'utf8');
  const actual = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
  const expected = expectedSitemapUrls(content).sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) errors.push('Exported sitemap URLs do not match canonical content URLs.');
}

for (const [relativeFile, expected] of buildResearchAssets(content)) {
  const publicRelative = relativeFile.replace(/^public\//, '');
  const exportedFile = path.join(out, ...publicRelative.split('/'));
  if (!fs.existsSync(exportedFile)) {
    errors.push(`Missing exported asset: /${publicRelative}.`);
  } else if (fs.readFileSync(exportedFile, 'utf8') !== expected) {
    errors.push(`Exported asset differs from source: /${publicRelative}.`);
  }
}

const robotsFile = path.join(out, 'robots.txt');
if (!fs.existsSync(robotsFile)) {
  errors.push('Missing exported robots.txt.');
} else {
  const robots = fs.readFileSync(robotsFile, 'utf8').replace(/\r\n/g, '\n');
  for (const crawler of ['OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot']) {
    if (!robots.includes(`User-agent: ${crawler}\nAllow: /`)) errors.push(`robots.txt does not allow ${crawler}.`);
  }
  for (const crawler of ['GPTBot', 'ClaudeBot', 'CCBot']) {
    if (!robots.includes(`User-agent: ${crawler}\nDisallow: /`)) errors.push(`robots.txt does not block ${crawler}.`);
  }
  if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) errors.push('robots.txt has the wrong sitemap URL.');
}

if (errors.length > 0) {
  throw new Error(`Static export check failed:\n- ${errors.join('\n- ')}`);
}

console.log(`Validated the exported site, sitemap, and citation metadata for ${content.papers.length} papers.`);
