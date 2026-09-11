import fs from 'node:fs';
import path from 'node:path';
import {
  buildResearchAssets,
  expectedSitemapUrls,
  loadResearchContent,
  SITE_URL,
  PROFILE,
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
if (!homepage.includes('/images/najmul-hasan-profile.webp')) errors.push('/: missing optimized profile image.');
if (!homepage.includes('/images/najmul-hasan-social.jpg')) errors.push('/: missing social-preview image metadata.');
for (const asset of ['images/najmul-hasan-profile.webp', 'images/najmul-hasan-social.jpg', 'najmul-hasan-favicon.png']) {
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
  }
  for (const pdf of metadataValues(html, 'citation_pdf_url')) {
    if (!pdf.startsWith(`${paper.canonicalUrl}/`) || !pdf.endsWith('.pdf')) {
      errors.push(`${route}: citation_pdf_url must identify a locally hosted PDF alongside the abstract.`);
    }
  }
  if (!/hackathon/i.test(paper.venue) && /conference|workshop/i.test(paper.venue)) {
    expectMeta(html, 'citation_conference_title', paper.venue, route);
  }
  const pages = paper.bibtex?.match(/\bpages\s*=\s*[{"]\s*(\d+)\s*[-–]+\s*(\d+)/i);
  if (pages) {
    expectMeta(html, 'citation_firstpage', pages[1], route);
    expectMeta(html, 'citation_lastpage', pages[2], route);
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
  for (const crawler of ['OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User']) {
    if (!robots.includes(`User-agent: ${crawler}\nAllow: /`)) errors.push(`robots.txt does not allow ${crawler}.`);
  }
  for (const crawler of ['GPTBot', 'ClaudeBot', 'CCBot']) {
    if (!robots.includes(`User-agent: ${crawler}\nDisallow: /`)) errors.push(`robots.txt does not block ${crawler}.`);
  }
  if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) errors.push('robots.txt has the wrong sitemap URL.');
}

const discoveryIndex = JSON.parse(fs.readFileSync(path.join(out, 'research.json'), 'utf8'));
const graph = JSON.parse(fs.readFileSync(path.join(out, 'discovery', 'graph.jsonld'), 'utf8'));
const entities = graph['@graph'];
if (graph['@context'] !== 'https://schema.org' || entities.length !== 1 + content.papers.length + content.posts.length) {
  errors.push('Linked-data graph must contain the author and every published article.');
}
if (!hasLink(homepage, { rel: 'describedby', type: 'application/ld+json', href: '/discovery/graph.jsonld' })) {
  errors.push('Homepage is missing linked-data graph discovery.');
}
for (const item of [...content.papers, ...content.posts]) {
  const entity = entities.find((entry) => entry.url === item.canonicalUrl);
  const authors = entity ? [entity.author].flat() : [];
  if (entity?.headline !== item.title || !authors.some((author) => author['@id'] === `${SITE_URL}/#person`)) {
    errors.push(`${item.slug}: incorrect title or author relationship in the linked-data graph.`);
  }
  if (item.doi && !entity?.identifier?.some((id) => id.propertyID === 'DOI' && id.value === item.doi)) {
    errors.push(`${item.slug}: incorrect DOI in the linked-data graph.`);
  }
  if (item.arxiv && !entity?.identifier?.some((id) => id.propertyID === 'arXiv' && id.value === item.arxiv.id)) {
    errors.push(`${item.slug}: incorrect arXiv identifier in the linked-data graph.`);
  }
}
if (discoveryIndex.papers.length !== content.papers.length || discoveryIndex.posts.length !== content.posts.length) {
  errors.push('Discovery index must contain every published paper and blog post.');
}
if (JSON.stringify(discoveryIndex.profile.sameAs) !== JSON.stringify(PROFILE.sameAs)) {
  errors.push('Discovery index has inconsistent author identity links.');
}

for (const [collection, items] of [['papers', content.papers], ['blog', content.posts]]) {
  const actualFiles = fs.readdirSync(path.join(out, 'discovery', collection)).sort();
  const expectedFiles = items.map((item) => `${item.slug}.json`).sort();
  if (JSON.stringify(actualFiles) !== JSON.stringify(expectedFiles)) {
    errors.push(`${collection}: discovery exports include missing or unpublished documents.`);
  }
  for (const item of items) {
    const route = `${collection === 'papers' ? '/research' : '/blog'}/${item.slug}`;
    const html = requireHtml(route);
    const documentUrl = `${SITE_URL}/discovery/${collection}/${item.slug}.json`;
    if (!hasLink(html, { rel: 'alternate', type: 'application/json', href: documentUrl })) {
      errors.push(`${route}: missing JSON discovery link.`);
    }
    const document = JSON.parse(fs.readFileSync(path.join(out, 'discovery', collection, `${item.slug}.json`), 'utf8'));
    const source = fs.readFileSync(path.join(item.sourceDirectory, collection === 'papers' ? 'content.html' : 'index.html'), 'utf8');
    if (document.content.html !== source || document.title !== item.title || document.canonicalUrl !== item.canonicalUrl) {
      errors.push(`${route}: discovery export changed verified source content.`);
    }
    const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    for (const [, json] of scripts) {
      try { JSON.parse(json); } catch { errors.push(`${route}: invalid JSON-LD.`); }
    }
    const article = scripts.map(([, json]) => {
      try { return JSON.parse(json); } catch { return null; }
    }).find((entity) => entity?.['@id'] === `${item.canonicalUrl}#article`);
    if (collection === 'papers') {
      for (const [propertyID, value] of [['DOI', item.doi], ['arXiv', item.arxiv?.id]]) {
        if (value && ![article?.identifier].flat().some((id) => id?.propertyID === propertyID && id.value === value)) {
          errors.push(`${route}: page structured data is missing the correct ${propertyID}.`);
        }
      }
    }
    const localLinks = [...html.matchAll(/<link\b[^>]*>/gi)]
      .map((match) => match[0])
      .filter((tag) => /\brel="(?:alternate|describedby)"/.test(tag))
      .map((tag) => decodeHtml(tag.match(/\bhref="([^"]+)"/)?.[1] ?? ''));
    for (const href of localLinks) {
      const url = new URL(href, item.canonicalUrl);
      if (url.origin !== SITE_URL) continue;
      const pathname = decodeURIComponent(url.pathname);
      if (!fs.existsSync(path.join(out, pathname.slice(1))) && !exportedHtml(pathname)) {
        errors.push(`${route}: broken discovery link ${url.pathname}.`);
      }
    }
  }
}
if (!hasLink(homepage, { rel: 'alternate', type: 'application/atom+xml', href: '/feed.xml' })) {
  errors.push('Homepage is missing Atom feed discovery.');
}
const feed = fs.readFileSync(path.join(out, 'feed.xml'), 'utf8');
if ([...feed.matchAll(/<entry>/g)].length !== content.papers.length + content.posts.length) {
  errors.push('Atom feed must contain all published research and writing.');
}
if (fs.existsSync(path.join(out, 'temp')) || fs.existsSync(path.join(out, '.env'))) {
  errors.push('Private workspace files must not be included in the static export.');
}

if (errors.length > 0) {
  throw new Error(`Static export check failed:\n- ${errors.join('\n- ')}`);
}

console.log(`Validated the exported site, sitemap, and citation metadata for ${content.papers.length} papers.`);
