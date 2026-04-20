import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const heroSrc = await readFile('public/images/najmul_hasan.jpg');

await sharp(heroSrc)
  .resize(96, 96, { fit: 'cover', position: 'top' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/favicon.jpg');

await sharp(heroSrc)
  .resize(600, 800, { fit: 'cover', position: 'top' })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile('public/images/najmul_hasan.jpg');

const etiSrc = await readFile('public/logos/eti.png');
await sharp(etiSrc)
  .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9, palette: true })
  .toFile('public/logos/eti.png');

const paperThumbs = [
  'public/papers/dpbench/thumbnail.png',
  'public/papers/honeypot-protocol/thumbnail.png',
  'public/papers/nist-crypto/thumbnail.png',
  'public/papers/phishing-email-detection/thumbnail.png',
  'public/papers/phishing-url-detection/thumbnail.png',
];

for (const path of paperThumbs) {
  const src = await readFile(path);
  await sharp(src)
    .png({ compressionLevel: 9, palette: true })
    .toFile(path);
}

console.log('optimized');
