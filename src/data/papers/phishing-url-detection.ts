import type { Paper } from './_types';

export const paper: Paper = {
  slug: 'phishing-url-detection',
  title:
    'Benchmarking Large Language Models for Zero-shot and Few-shot Phishing URL Detection',
  authors: ['Najmul Hasan', 'Prashanth BusiReddyGari'],
  keywords: [
    'phishing detection',
    'large language models',
    'zero-shot learning',
    'few-shot learning',
    'cybersecurity',
    'URL classification',
    'NLP',
  ],
  venue:
    'LAW 2025 Workshop, 39th Conference on Neural Information Processing Systems (NeurIPS 2025)',
  venueShort: 'LAW @ NeurIPS 2025',
  year: '2025',
  date: '2025-12-01',
  abstract:
    'The Uniform Resource Locator (URL), introduced in a connectivity-first era to define access and locate resources, remains historically limited, lacking future-proof mechanisms for security, trust, or resilience against fraud and abuse, despite the introduction of reactive protections like HTTPS during the cybersecurity era. In the current AI-first threatscape, deceptive URLs have reached unprecedented sophistication due to the widespread use of generative AI by cybercriminals and the AI-vs-AI arms race to produce context-aware phishing websites and URLs that are virtually indistinguishable to both users and traditional detection tools. Although AI-generated phishing accounted for a small fraction of filter-bypassing attacks in 2024, phishing volume has escalated over 4,000% since 2022, with nearly 50% more attacks evading detection. At the rate the threatscape is escalating, and phishing tactics are emerging faster than labeled data can be produced, zero-shot and few-shot learning with large language models (LLMs) offers a timely and adaptable solution, enabling generalization with minimal supervision. Given the critical importance of phishing URL detection in large-scale cybersecurity defense systems, we present a comprehensive benchmark of LLMs under a unified zero-shot and few-shot prompting framework and reveal operational trade-offs. Our evaluation uses a balanced dataset with consistent prompts, offering detailed analysis of performance, generalization, and model efficacy, quantified by accuracy, precision, recall, F1 score, AUROC, and AUPRC, to reflect both classification quality and practical utility in threat detection settings. We conclude few-shot prompting improves performance across multiple LLMs.',
  thumbnail: '/papers/phishing-url-detection/thumbnail.png',
  paperLink: 'https://openreview.net/forum?id=COmhlLFVk9',
  arxivLink: 'https://arxiv.org/abs/2602.02641',
  bibtex: `@inproceedings{hasan2025benchmarking,
  title         = {Benchmarking Large Language Models for Zero-shot and Few-shot Phishing URL Detection},
  author        = {Hasan, Najmul and BusiReddyGari, Prashanth},
  booktitle     = {LAW Workshop at the 39th Conference on Neural Information Processing Systems (NeurIPS 2025)},
  year          = {2025},
  eprint        = {2602.02641},
  archivePrefix = {arXiv},
  primaryClass  = {cs.CR},
  url           = {https://openreview.net/forum?id=COmhlLFVk9}
}`,
};
