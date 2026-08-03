import fs from 'node:fs';
import path from 'node:path';
import { buildResearchAssets, loadResearchContent, validateResearchContent } from './research-assets.mjs';

const root = process.cwd();
const content = loadResearchContent(root);
const errors = validateResearchContent(content);

if (errors.length > 0) {
  throw new Error(`Research metadata validation failed:\n- ${errors.join('\n- ')}`);
}

for (const [relativeFile, value] of buildResearchAssets(content)) {
  const file = path.join(root, relativeFile);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, value, 'utf8');
}

console.log(`Generated citation and discovery assets for ${content.papers.length} papers.`);
