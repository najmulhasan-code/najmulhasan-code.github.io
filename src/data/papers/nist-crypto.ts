import type { Paper } from './_types';

export const paper: Paper = {
  slug: 'nist-crypto',
  title:
    'Time-Complexity Characterization of the NIST Lightweight Cryptography Finalists',
  authors: ['Najmul Hasan', 'Prashanth BusiReddyGari'],
  keywords: [
    'lightweight cryptography',
    'NIST',
    'time complexity',
    'IoT security',
    'embedded systems',
    'cryptographic algorithms',
  ],
  venue:
    '2026 IEEE 16th Annual Computing and Communication Workshop and Conference (CCWC), Las Vegas, NV, pp. 1193-1196',
  venueShort: 'IEEE CCWC 2026',
  year: '2026',
  date: '2026-01-05',
  abstract:
    'Lightweight cryptography is becoming essential as emerging technologies in digital identity systems and Internet of Things verification continue to demand strong cryptographic assurance on devices with limited processing power, memory, and energy resources. As these technologies move into routine use, they demand cryptographic primitives that maintain strong security and deliver predictable performance through clear theoretical models of time complexity. Although NIST\'s lightweight cryptography project provides empirical evaluations of the ten finalist algorithms, a unified theoretical understanding of their time-complexity behavior remains absent. This work introduces a symbolic model that decomposes each scheme into initialization, data-processing, and finalization phases, enabling formal time-complexity derivation for all ten finalists. The results clarify how design parameters shape computational scaling on constrained mobile and embedded environments. The framework provides a foundation needed to distinguish algorithmic efficiency and guides the choice of primitives capable of supporting security systems in constrained environments.',
  thumbnail: '/papers/nist-crypto/thumbnail.png',
  doiLink: 'https://ieeexplore.ieee.org/document/11393752',
  arxivLink: 'https://arxiv.org/abs/2602.05641',
  bibtex: `@inproceedings{hasan2026time,
  title         = {Time-Complexity Characterization of the NIST Lightweight Cryptography Finalists},
  author        = {Hasan, Najmul and BusiReddyGari, Prashanth},
  booktitle     = {2026 IEEE 16th Annual Computing and Communication Workshop and Conference (CCWC)},
  year          = {2026},
  pages         = {1193--1196},
  address       = {Las Vegas, NV, USA},
  publisher     = {IEEE},
  doi           = {10.1109/CCWC67433.2026.11393752},
  eprint        = {2602.05641},
  archivePrefix = {arXiv},
  primaryClass  = {cs.CR}
}`,
};
