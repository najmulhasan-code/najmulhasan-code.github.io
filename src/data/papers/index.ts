import type { Paper } from './_types';
import { paper as crcScreen } from './crc-screen';
import { paper as honeypotProtocol } from './honeypot-protocol';
import { paper as phishingUrlDetection } from './phishing-url-detection';
import { paper as nistCrypto } from './nist-crypto';
import { paper as dpbench } from './dpbench';
import { paper as phishingEmailDetection } from './phishing-email-detection';

const papers: Paper[] = [
  crcScreen,
  honeypotProtocol,
  phishingUrlDetection,
  nistCrypto,
  dpbench,
  phishingEmailDetection,
];

export function getAllPapers(): Paper[] {
  return [...papers].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPaperBySlug(slug: string): Paper | undefined {
  return papers.find((paper) => paper.slug === slug);
}

export type { Paper, PaperFigure } from './_types';
