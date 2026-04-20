import type { Paper } from './_types';

export const paper: Paper = {
  slug: 'dpbench',
  title: 'DPBench: Large Language Models Struggle with Simultaneous Coordination',
  authors: ['Najmul Hasan', 'Prashanth BusiReddyGari'],
  keywords: [
    'multi-agent systems',
    'LLM coordination',
    'dining philosophers',
    'deadlock',
    'benchmark',
    'emergent behavior',
    'concurrent reasoning',
  ],
  venue: 'arXiv preprint arXiv:2602.13255, Feb. 2026',
  venueShort: 'arXiv 2026',
  year: '2026',
  date: '2026-02-17',
  abstract:
    'Large language models are increasingly deployed in multi-agent systems, yet we lack benchmarks that test whether they can coordinate under resource contention. We introduce DPBench, a benchmark based on the Dining Philosophers problem that evaluates LLM coordination across eight conditions that vary decision timing, group size, and communication. Our experiments with GPT-5.2, Claude Opus 4.5, and Grok 4.1 reveal a striking asymmetry: LLMs coordinate effectively in sequential settings but fail when decisions must be made simultaneously, with deadlock rates exceeding 95% under some conditions. We trace this failure to convergent reasoning, where agents independently arrive at identical strategies that, when executed simultaneously, guarantee deadlock. Contrary to expectations, enabling communication does not resolve this problem and can even increase deadlock rates. Our findings suggest that multi-agent LLM systems requiring concurrent resource access may need external coordination mechanisms rather than relying on emergent coordination. DPBench is released as an open-source benchmark.',
  thumbnail: '/papers/dpbench/thumbnail.png',
  arxivLink: 'https://arxiv.org/abs/2602.13255',
  codeLink: 'https://github.com/najmulhasan-code/dpbench',
  bibtex: `@misc{hasan2026dpbench,
  title         = {DPBench: Large Language Models Struggle with Simultaneous Coordination},
  author        = {Hasan, Najmul and BusiReddyGari, Prashanth},
  year          = {2026},
  month         = feb,
  eprint        = {2602.13255},
  archivePrefix = {arXiv},
  primaryClass  = {cs.AI},
  url           = {https://arxiv.org/abs/2602.13255}
}`,
};
