import fs from 'node:fs';
import path from 'node:path';
import { buildResearchAssets, loadResearchContent, validateResearchContent } from './research-assets.mjs';

const root = process.cwd();
const content = loadResearchContent(root);
const errors = validateResearchContent(content);

for (const [relativeFile, expected] of buildResearchAssets(content)) {
  const file = path.join(root, relativeFile);
  if (!fs.existsSync(file)) {
    errors.push(`Missing generated asset: ${relativeFile}.`);
  } else if (fs.readFileSync(file, 'utf8') !== expected) {
    errors.push(`Stale generated asset: ${relativeFile}. Run npm run generate:research.`);
  }
}

if (errors.length > 0) {
  throw new Error(`Research asset check failed:\n- ${errors.join('\n- ')}`);
}

console.log(`Validated source metadata and generated assets for ${content.papers.length} papers.`);
