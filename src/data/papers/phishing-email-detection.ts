import type { Paper } from './_types';

export const paper: Paper = {
  slug: 'phishing-email-detection',
  title: 'Phishing Email Detection Using Large Language Models',
  authors: [
    'Najmul Hasan',
    'Prashanth BusiReddyGari',
    'Haitao Zhao',
    'Yihao Ren',
    'Jinsheng Xu',
    'Shaohu Zhang',
  ],
  keywords: [
    'phishing email detection',
    'large language models',
    'adversarial attacks',
    'prompt injection',
    'multilingual attacks',
    'cybersecurity',
    'NLP',
  ],
  venue: 'arXiv preprint arXiv:2512.10104, Dec. 2025',
  venueShort: 'arXiv 2025',
  year: '2025',
  date: '2025-12-10',
  abstract:
    'Email phishing is one of the most prevalent and globally consequential vectors of cyber intrusion. As systems increasingly deploy Large Language Models (LLMs) applications, these systems face evolving phishing email threats that exploit their fundamental architectures. Current LLMs require substantial hardening before deployment in email security systems, particularly against coordinated multi-vector attacks that exploit architectural vulnerabilities. This paper proposes LLM-PEA, an LLM-based framework to detect phishing email attacks across multiple attack vectors, including prompt injection, text refinement, and multilingual attacks. We evaluate three frontier LLMs (e.g., GPT-4o, Claude Sonnet 4, and Grok-3) and comprehensive prompting design to assess their feasibility, robustness, and limitations against phishing email attacks. Our empirical analysis reveals that LLMs can detect the phishing email over 90% accuracy while we also highlight that LLM-based phishing email detection systems could be exploited by adversarial attack, prompt injection, and multilingual attacks. Our findings provide critical insights for LLM-based phishing detection in real-world settings where attackers exploit multiple vulnerabilities in combination.',
  thumbnail: '/papers/phishing-email-detection/thumbnail.png',
  arxivLink: 'https://arxiv.org/abs/2512.10104',
  bibtex: `@misc{hasan2025phishing,
  title         = {Phishing Email Detection Using Large Language Models},
  author        = {Hasan, Najmul and BusiReddyGari, Prashanth and Zhao, Haitao and Ren, Yihao and Xu, Jinsheng and Zhang, Shaohu},
  year          = {2025},
  month         = dec,
  eprint        = {2512.10104},
  archivePrefix = {arXiv},
  primaryClass  = {cs.CR},
  url           = {https://arxiv.org/abs/2512.10104}
}`,
};
