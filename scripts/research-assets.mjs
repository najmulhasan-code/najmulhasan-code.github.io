import fs from 'node:fs';
import path from 'node:path';

export const SITE_URL = 'https://najmulhasan-code.github.io';
export const AUTHOR_NAME = 'Najmul Hasan';
export const PROFILE = JSON.parse(fs.readFileSync(new URL('../src/data/profile.json', import.meta.url), 'utf8'));

const PAPER_FIELDS = [
  'title',
  'authors',
  'keywords',
  'venue',
  'venueShort',
  'year',
  'date',
  'abstract',
  'bibtex',
];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function directoriesIn(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function publicAssetPath(directory, publicPrefix, baseName) {
  for (const extension of ['png', 'jpg', 'jpeg', 'webp', 'avif']) {
    if (fs.existsSync(path.join(directory, `${baseName}.${extension}`))) {
      return `${publicPrefix}/${baseName}.${extension}`;
    }
  }
  return undefined;
}

export function resolveDoi(meta) {
  const linkedDoi = meta.doiLink?.match(/doi\.org\/(.+)$/i)?.[1];
  const bibtexDoi = meta.bibtex?.match(/\bdoi\s*=\s*[{"]([^}"]+)/i)?.[1];
  const doi = linkedDoi ?? bibtexDoi;
  return doi ? decodeURIComponent(doi).trim() : undefined;
}

export function resolveArxiv(meta) {
  const versionedId = meta.arxivLink?.match(/arxiv\.org\/abs\/([^?#/]+)/i)?.[1];
  if (!versionedId) return undefined;
  return {
    id: versionedId.replace(/v\d+$/i, ''),
    versionedId,
    abstractUrl: meta.arxivLink,
    pdfUrl: `https://arxiv.org/pdf/${versionedId}`,
  };
}

export function loadResearchContent(root = process.cwd()) {
  const papersDirectory = path.join(root, 'public', 'papers');
  const blogDirectory = path.join(root, 'public', 'blog');

  const papers = directoriesIn(papersDirectory).map((slug) => {
    const directory = path.join(papersDirectory, slug);
    const metadataFile = path.join(directory, 'meta.json');
    if (!fs.existsSync(metadataFile)) {
      throw new Error(`Missing paper metadata: public/papers/${slug}/meta.json`);
    }
    const meta = readJson(metadataFile);
    return {
      ...meta,
      slug,
      canonicalUrl: `${SITE_URL}/research/${slug}`,
      thumbnailUrl: publicAssetPath(directory, `${SITE_URL}/papers/${slug}`, 'teaser'),
      doi: resolveDoi(meta),
      arxiv: resolveArxiv(meta),
      sourceDirectory: directory,
    };
  }).filter((paper) => paper.published !== false)
    .sort((a, b) => {
      const orderDifference = (a.researchOrder ?? Number.POSITIVE_INFINITY) - (b.researchOrder ?? Number.POSITIVE_INFINITY);
      if (orderDifference !== 0) return orderDifference;
      return b.date.localeCompare(a.date);
    });

  const posts = directoriesIn(blogDirectory).map((slug) => {
    const directory = path.join(blogDirectory, slug);
    const metadataFile = path.join(directory, 'meta.json');
    if (!fs.existsSync(metadataFile)) {
      throw new Error(`Missing blog metadata: public/blog/${slug}/meta.json`);
    }
    const meta = readJson(metadataFile);
    return {
      ...meta,
      slug,
      canonicalUrl: `${SITE_URL}/blog/${slug}`,
      thumbnailUrl: publicAssetPath(directory, `${SITE_URL}/blog/${slug}`, 'teaser'),
      sourceDirectory: directory,
    };
  }).filter((post) => post.published !== false)
    .sort((a, b) => b.date.localeCompare(a.date));

  return { papers, posts };
}

function oneLine(value) {
  return String(value).replace(/\s+/g, ' ').trim();
}

function normalizeBibtex(value) {
  return String(value).split('\n').map((line) => line.trimEnd()).join('\n').trim();
}

function risType(paper) {
  if (/arxiv preprint/i.test(paper.venue)) return 'RPRT';
  if (/conference|workshop|hackathon|neurips|ccwc|dsn/i.test(paper.venue)) return 'CONF';
  return 'GEN';
}

export function paperRis(paper) {
  const lines = [
    `TY  - ${risType(paper)}`,
    `T1  - ${oneLine(paper.title)}`,
    ...paper.authors.map((author) => `AU  - ${oneLine(author)}`),
    `PY  - ${paper.year}`,
    `DA  - ${paper.date}`,
    `T2  - ${oneLine(paper.venue)}`,
    `AB  - ${oneLine(paper.abstract)}`,
    ...paper.keywords.map((keyword) => `KW  - ${oneLine(keyword)}`),
    ...(paper.doi ? [`DO  - ${paper.doi}`] : []),
    `UR  - ${paper.canonicalUrl}`,
    ...(paper.arxiv ? [`L1  - ${paper.arxiv.pdfUrl}`] : []),
    ...(paper.codeLink ? [`L2  - ${paper.codeLink}`] : []),
    'ER  -',
  ];
  return `${lines.join('\n')}\n`;
}

function publicLinks(paper) {
  return [paper.paperLink, paper.arxivLink, paper.doiLink, paper.codeLink, ...(paper.links ?? [])]
    .filter(Boolean)
    .filter((url, index, values) => values.indexOf(url) === index);
}

function linkLabel(url) {
  if (url.includes('arxiv.org')) return 'arXiv';
  if (url.includes('doi.org')) return 'DOI';
  if (url.includes('ieeexplore.ieee.org')) return 'IEEE Xplore';
  if (url.includes('openreview.net')) return 'OpenReview';
  if (url.includes('apartresearch.com')) return 'Apart Research';
  if (url.includes('github.com')) return 'Code';
  if (url.includes('pypi.org')) return 'PyPI';
  return 'External resource';
}

function researchJson(papers, posts) {
  const data = {
    schemaVersion: 1,
    profile: {
      ...PROFILE,
      researchAreas: PROFILE.researchInterests,
    },
    papers: papers.map((paper) => ({
      slug: paper.slug,
      title: paper.title,
      authors: paper.authors,
      date: paper.date,
      year: paper.year,
      venue: paper.venue,
      venueShort: paper.venueShort,
      abstract: paper.abstract,
      keywords: paper.keywords,
      canonicalUrl: paper.canonicalUrl,
      documentUrl: `${SITE_URL}/discovery/papers/${paper.slug}.json`,
      ...(paper.thumbnailUrl ? { thumbnailUrl: paper.thumbnailUrl } : {}),
      identifiers: {
        ...(paper.doi ? { doi: paper.doi } : {}),
        ...(paper.arxiv ? { arxiv: paper.arxiv.id } : {}),
      },
      links: publicLinks(paper),
      citation: {
        bibtexUrl: `${SITE_URL}/papers/${paper.slug}/citation.bib`,
        risUrl: `${SITE_URL}/papers/${paper.slug}/citation.ris`,
        bibtex: normalizeBibtex(paper.bibtex),
      },
    })),
    posts: posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      author: AUTHOR_NAME,
      date: post.date,
      ...(post.updatedDate ? { updatedDate: post.updatedDate } : {}),
      description: post.description,
      category: post.category,
      tags: post.tags ?? [],
      canonicalUrl: post.canonicalUrl,
      documentUrl: `${SITE_URL}/discovery/blog/${post.slug}.json`,
      links: post.links ?? [],
    })),
  };
  return `${JSON.stringify(data, null, 2)}\n`;
}

function llmsText(papers, posts) {
  const refusalPost = posts.find((post) => post.slug === 'refusal-to-redirection');
  const lines = [
    `# ${AUTHOR_NAME}`,
    '',
    `> ${PROFILE.description}`,
    '',
    'This file indexes the public research and project materials on this site. Use each paper page as the canonical portfolio URL and the linked publisher, DOI, or arXiv record when citing the scholarly work.',
    '',
    '## Research papers',
    '',
  ];

  papers.forEach((paper, index) => {
    const links = publicLinks(paper)
      .map((url) => `[${linkLabel(url)}](${url})`)
      .join(' | ');
    lines.push(
      `### ${index + 1}. [${paper.title}](${paper.canonicalUrl})`,
      '',
      `- Authors: ${paper.authors.join(', ')}`,
      `- Published: ${paper.date}`,
      `- Venue: ${paper.venue}`,
      `- Keywords: ${paper.keywords.join(', ')}`,
      `- Abstract: ${oneLine(paper.abstract)}`,
      ...(links ? [`- Records and resources: ${links}`] : []),
      `- Citation files: [BibTeX](${SITE_URL}/papers/${paper.slug}/citation.bib) | [RIS](${SITE_URL}/papers/${paper.slug}/citation.ris)`,
      `- Portfolio article and metadata: [JSON](${SITE_URL}/discovery/papers/${paper.slug}.json)`,
      '',
    );
  });

  lines.push('## Writing', '');
  for (const post of posts) {
    const links = (post.links ?? []).map((url) => `[${linkLabel(url)}](${url})`).join(' | ');
    lines.push(
      `### [${post.title}](${post.canonicalUrl})`,
      '',
      `- Published: ${post.date}`,
      `- Summary: ${oneLine(post.description)}`,
      `- Topics: ${(post.tags ?? []).join(', ')}`,
      ...(links ? [`- Resources: ${links}`] : []),
      `- Full blog article and metadata: [JSON](${SITE_URL}/discovery/blog/${post.slug}.json)`,
      '',
    );
  }

  lines.push(
    '## Open-source projects',
    '',
    '### [Refusal-to-Redirection](https://github.com/najmulhasan-code/refusal-to-redirection)',
    '',
    '- QLoRA case study of how safety fine-tuning shifted responses from refusal toward redirection, and why behavioral-label agreement should be evaluated separately from substantive safety.',
    ...(refusalPost
      ? [`- Research note: [${refusalPost.title}](${refusalPost.canonicalUrl})`]
      : []),
    '',
    '### [SAGE](https://github.com/najmulhasan-code/sage)',
    '',
    '- Python framework for multi-agent research, debate, and answer synthesis.',
    '- Package: [agentsage on PyPI](https://pypi.org/project/agentsage/)',
    '',
    '### [DPBench](https://github.com/najmulhasan-code/dpbench)',
    '',
    '- Open-source benchmark and Python package for multi-agent language-model coordination.',
    '- Package: [dpbench on PyPI](https://pypi.org/project/dpbench/)',
    '',
    '## Author links',
    '',
    `- [Homepage](${SITE_URL})`,
    '- [Google Scholar](https://scholar.google.com/citations?user=YL8xF4MAAAAJ&hl=en&oi=ao)',
    '- [GitHub](https://github.com/najmulhasan-code)',
    '- [LinkedIn](https://linkedin.com/in/najmulhasan-cs-math)',
    '- [Twitter / X](https://x.com/_najmulhasan)',
    '',
    '## Machine-readable resources',
    '',
    `- [Research metadata (JSON)](${SITE_URL}/research.json)`,
    `- [Author profile (JSON)](${SITE_URL}/discovery/profile.json)`,
    `- [Author and publication graph (JSON-LD)](${SITE_URL}/discovery/graph.jsonld)`,
    `- [Research and writing feed (Atom)](${SITE_URL}/feed.xml)`,
    `- [All paper citations (BibTeX)](${SITE_URL}/papers.bib)`,
    '',
  );

  return lines.join('\n');
}

export function buildResearchAssets(content = loadResearchContent()) {
  const assets = new Map();
  const allBibtex = content.papers.map((paper) => normalizeBibtex(paper.bibtex)).join('\n\n');

  assets.set('public/papers.bib', `${allBibtex}\n`);
  assets.set('public/research.json', researchJson(content.papers, content.posts));
  assets.set('public/discovery/profile.json', `${JSON.stringify(PROFILE, null, 2)}\n`);
  assets.set('public/discovery/graph.jsonld', discoveryGraph(content));
  assets.set('public/feed.xml', atomFeed(content));
  assets.set('public/llms.txt', llmsText(content.papers, content.posts));

  for (const paper of content.papers) {
    assets.set(`public/papers/${paper.slug}/citation.bib`, `${normalizeBibtex(paper.bibtex)}\n`);
    assets.set(`public/papers/${paper.slug}/citation.ris`, paperRis(paper));
    assets.set(`public/discovery/papers/${paper.slug}.json`, discoveryDocument(paper, 'papers'));
  }

  for (const post of content.posts) {
    assets.set(`public/discovery/blog/${post.slug}.json`, discoveryDocument(post, 'blog'));
  }

  return assets;
}

function discoveryGraph({ papers, posts }) {
  const personId = `${SITE_URL}/#person`;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person', '@id': personId,
        name: PROFILE.name, givenName: PROFILE.givenName, familyName: PROFILE.familyName,
        url: PROFILE.url, image: PROFILE.image, description: PROFILE.description,
        sameAs: PROFILE.sameAs, alumniOf: PROFILE.alumniOf, knowsAbout: PROFILE.researchInterests,
      },
      ...papers.map((paper) => ({
        '@type': 'ScholarlyArticle', '@id': `${paper.canonicalUrl}#article`,
        url: paper.canonicalUrl, headline: paper.title, abstract: paper.abstract,
        author: paper.authors.map((name) => name === AUTHOR_NAME
          ? { '@id': personId }
          : { '@type': 'Person', name }),
        datePublished: paper.date, inLanguage: 'en', keywords: paper.keywords,
        ...(paper.publisher ? { publisher: { '@type': 'Organization', name: paper.publisher } } : {}),
        sameAs: [paper.paperLink, paper.arxivLink, paper.doiLink].filter(Boolean)
          .filter((url, index, values) => values.indexOf(url) === index),
        identifier: [
          ...(paper.doi ? [{ '@type': 'PropertyValue', propertyID: 'DOI', value: paper.doi }] : []),
          ...(paper.arxiv ? [{ '@type': 'PropertyValue', propertyID: 'arXiv', value: paper.arxiv.id }] : []),
        ],
        mainEntityOfPage: { '@type': 'WebPage', '@id': paper.canonicalUrl },
      })),
      ...posts.map((post) => ({
        '@type': 'BlogPosting', '@id': `${post.canonicalUrl}#article`,
        url: post.canonicalUrl, headline: post.title, description: post.description,
        author: { '@id': personId }, datePublished: post.date,
        ...(post.updatedDate ? { dateModified: post.updatedDate } : {}),
        inLanguage: 'en', keywords: post.tags ?? [],
        mainEntityOfPage: { '@type': 'WebPage', '@id': post.canonicalUrl },
      })),
    ],
  };
  return `${JSON.stringify(graph, null, 2)}\n`;
}

function discoveryDocument(item, collection) {
  const isPaper = collection === 'papers';
  const html = fs.readFileSync(path.join(item.sourceDirectory, isPaper ? 'content.html' : 'index.html'), 'utf8');
  const document = {
    schemaVersion: 1,
    type: isPaper ? 'ScholarlyArticle' : 'BlogPosting',
    title: item.title,
    authors: isPaper ? item.authors : [AUTHOR_NAME],
    authorProfileUrl: `${SITE_URL}/discovery/profile.json`,
    ...(isPaper ? {
      identifiers: {
        ...(item.doi ? { doi: item.doi } : {}),
        ...(item.arxiv ? { arxiv: item.arxiv.id, arxivVersion: item.arxiv.versionedId } : {}),
      },
      citationFiles: {
        bibtex: `${SITE_URL}/papers/${item.slug}/citation.bib`,
        ris: `${SITE_URL}/papers/${item.slug}/citation.ris`,
      },
    } : {}),
    canonicalUrl: item.canonicalUrl,
    datePublished: item.date,
    ...(item.updatedDate ? { dateModified: item.updatedDate } : {}),
    ...(isPaper ? { abstract: item.abstract, venue: item.venue, bibtex: normalizeBibtex(item.bibtex) } : { description: item.description, category: item.category }),
    keywords: isPaper ? item.keywords : item.tags ?? [],
    links: isPaper ? publicLinks(item) : item.links ?? [],
    content: {
      scope: isPaper ? 'Portfolio article; full paper available through the linked scholarly records.' : 'Full blog article.',
      mediaType: 'text/html',
      baseUrl: `${SITE_URL}/${collection}/${item.slug}/`,
      html,
    },
  };
  return `${JSON.stringify(document, null, 2)}\n`;
}

function xml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[character]));
}

function atomFeed({ papers, posts }) {
  const items = [...papers, ...posts].sort((a, b) => (b.updatedDate ?? b.date).localeCompare(a.updatedDate ?? a.date));
  const updated = `${items[0]?.updatedDate ?? items[0]?.date ?? '2025-01-01'}T00:00:00Z`;
  const entries = items.map((item) => `  <entry>
    <id>${xml(item.canonicalUrl)}</id>
    <title>${xml(item.title)}</title>
    <link href="${xml(item.canonicalUrl)}"/>
    <published>${item.date}T00:00:00Z</published>
    <updated>${item.updatedDate ?? item.date}T00:00:00Z</updated>
    ${(item.authors ?? [AUTHOR_NAME]).map((author) => `<author><name>${xml(author)}</name></author>`).join('\n    ')}
    <summary type="text">${xml(item.abstract ?? item.description)}</summary>
  </entry>`);
  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${SITE_URL}/</id>
  <title>Najmul Hasan: Research and Writing</title>
  <link href="${SITE_URL}/feed.xml" rel="self" type="application/atom+xml"/>
  <link href="${SITE_URL}/"/>
  <updated>${updated}</updated>
${entries.join('\n')}
</feed>
`;
}

export function validateResearchContent(content) {
  const errors = [];
  if (content.papers.length === 0) errors.push('No paper metadata was found.');

  const slugs = new Set();
  const titles = new Set();
  for (const paper of content.papers) {
    if (slugs.has(paper.slug)) errors.push(`Duplicate paper slug: ${paper.slug}`);
    if (titles.has(paper.title)) errors.push(`Duplicate paper title: ${paper.title}`);
    slugs.add(paper.slug);
    titles.add(paper.title);

    for (const field of PAPER_FIELDS) {
      const value = paper[field];
      if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        errors.push(`${paper.slug}: missing ${field}.`);
      }
    }
    if (!paper.authors.includes(AUTHOR_NAME)) errors.push(`${paper.slug}: ${AUTHOR_NAME} is not listed as an author.`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(paper.date)) errors.push(`${paper.slug}: invalid ISO date ${paper.date}.`);
    if (paper.date.slice(0, 4) !== paper.year) errors.push(`${paper.slug}: date and year disagree.`);
    if (paper.arxiv && !/^\d{4}\.\d{4,5}$/.test(paper.arxiv.id)) errors.push(`${paper.slug}: invalid arXiv identifier ${paper.arxiv.id}.`);
    if (paper.doi && !/^10\.\d{4,9}\/.+/.test(paper.doi)) errors.push(`${paper.slug}: invalid DOI ${paper.doi}.`);
    const linkedDoi = paper.doiLink?.match(/doi\.org\/(.+)$/i)?.[1];
    const citedDoi = paper.bibtex?.match(/\bdoi\s*=\s*[{"]([^}"]+)/i)?.[1];
    if (linkedDoi && citedDoi && decodeURIComponent(linkedDoi).trim().toLowerCase() !== citedDoi.trim().toLowerCase()) {
      errors.push(`${paper.slug}: DOI link and BibTeX identify different works.`);
    }
    const citedArxiv = paper.bibtex?.match(/\beprint\s*=\s*[{"]([^}"]+)/i)?.[1]?.trim().replace(/v\d+$/i, '');
    if (paper.arxiv && citedArxiv && paper.arxiv.id !== citedArxiv) {
      errors.push(`${paper.slug}: arXiv link and BibTeX identify different works.`);
    }
    if (!fs.existsSync(path.join(paper.sourceDirectory, 'content.html'))) errors.push(`${paper.slug}: missing content.html.`);
    if (!fs.existsSync(path.join(paper.sourceDirectory, 'index.html'))) errors.push(`${paper.slug}: missing index.html.`);
    if (!paper.thumbnailUrl) errors.push(`${paper.slug}: missing teaser image.`);

    for (const url of publicLinks(paper)) {
      if (!/^https:\/\//.test(url)) errors.push(`${paper.slug}: non-HTTPS external URL ${url}.`);
    }
  }

  for (const post of content.posts) {
    if (!post.title || !post.date || !post.description) errors.push(`${post.slug}: incomplete blog metadata.`);
    const postHtmlFile = path.join(post.sourceDirectory, 'index.html');
    if (!fs.existsSync(postHtmlFile)) {
      errors.push(`${post.slug}: missing blog index.html.`);
    } else {
      const postHtml = fs.readFileSync(postHtmlFile, 'utf8');
      if (/<img\b[^>]+src=["'][^"']*teaser\.[^"']+["']/i.test(postHtml)) {
        errors.push(`${post.slug}: the teaser is rendered by the article template and must not be repeated in index.html.`);
      }
    }
    if (!post.thumbnailUrl) errors.push(`${post.slug}: missing blog teaser image.`);
    if (post.thumbnailFit && !['contain', 'cover'].includes(post.thumbnailFit)) {
      errors.push(`${post.slug}: thumbnailFit must be contain or cover.`);
    }
    if (post.thumbnailBackground && !/^#[0-9a-f]{6}$/i.test(post.thumbnailBackground)) {
      errors.push(`${post.slug}: thumbnailBackground must be a six-digit hex color.`);
    }
    for (const url of post.links ?? []) {
      if (!/^https:\/\//.test(url)) errors.push(`${post.slug}: non-HTTPS blog URL ${url}.`);
    }
  }
  return errors;
}

export function expectedSitemapUrls(content) {
  return [
    SITE_URL,
    `${SITE_URL}/research`,
    ...content.papers.map((paper) => paper.canonicalUrl),
    `${SITE_URL}/blog`,
    ...content.posts.map((post) => post.canonicalUrl),
  ];
}
