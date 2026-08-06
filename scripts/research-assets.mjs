import fs from 'node:fs';
import path from 'node:path';

export const SITE_URL = 'https://najmulhasan-code.github.io';
export const AUTHOR_NAME = 'Najmul Hasan';

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

function researchJson(papers) {
  const data = {
    schemaVersion: 1,
    profile: {
      name: AUTHOR_NAME,
      url: SITE_URL,
      researchAreas: [
        'Language model design and training',
        'AI alignment and control',
        'Multi-agent LLM coordination',
        'Phishing and security',
        'DNA synthesis screening',
        'Lightweight cryptography',
      ],
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
  };
  return `${JSON.stringify(data, null, 2)}\n`;
}

function llmsText(papers, posts) {
  const lines = [
    `# ${AUTHOR_NAME}`,
    '',
    '> Computer science and mathematics researcher at the University of North Carolina at Pembroke, working on language models, AI alignment and control, multi-agent coordination, cybersecurity, biosecurity, and lightweight cryptography.',
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
      '',
    );
  }

  lines.push(
    '## Open-source projects',
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
    `- [All paper citations (BibTeX)](${SITE_URL}/papers.bib)`,
    '',
  );

  return lines.join('\n');
}

export function buildResearchAssets(content = loadResearchContent()) {
  const assets = new Map();
  const allBibtex = content.papers.map((paper) => normalizeBibtex(paper.bibtex)).join('\n\n');

  assets.set('public/papers.bib', `${allBibtex}\n`);
  assets.set('public/research.json', researchJson(content.papers));
  assets.set('public/llms.txt', llmsText(content.papers, content.posts));

  for (const paper of content.papers) {
    assets.set(`public/papers/${paper.slug}/citation.bib`, `${normalizeBibtex(paper.bibtex)}\n`);
    assets.set(`public/papers/${paper.slug}/citation.ris`, paperRis(paper));
  }

  return assets;
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
