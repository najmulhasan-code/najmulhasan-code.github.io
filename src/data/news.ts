export interface NewsItem {
  date: string; // ISO-like: YYYY-MM
  title: string;
  description?: string;
  link?: string;
}

export const newsItems: NewsItem[] = [
  {
    date: '2026-05',
    title: 'Graduated from UNC Pembroke',
    description:
      'Graduated from the University of North Carolina at Pembroke with a B.S. in Computer Science and minors in Mathematics and Physics. Completed the honors curriculum as a member of the Esther G. Maynor Honors College.',
  },
  {
    date: '2026-04',
    title: 'Released preprint: CRC-Screen for DNA-synthesis hazard screening',
    description:
      'Released "CRC-Screen: Certified DNA-Synthesis Hazard Screening Under Taxonomic Shift" on arXiv. A conformal-risk-control screener that fuses sequence similarity, an LLM judge panel, and embedding similarity with certified false-negative-rate bounds.',
    link: 'https://arxiv.org/abs/2605.00074',
  },
  {
    date: '2026-04',
    title: 'Presented at PURC Symposium 2026',
    description: 'Presented research on stress-testing LLMs across adversarial attacks, prompt injection, and non-English languages at the PURC Symposium 2026 at UNC Pembroke.',
  },
  {
    date: '2026-02',
    title: 'Lead Organizer for HackUNCP 2026',
    description: 'Led HackUNCP 2026 (February 21-22) for the second year. Grateful for everyone involved and every participant who showed up and built something.',
  },
  {
    date: '2026-02',
    title: 'Started as AI Safety Research Fellow at Algoverse',
    description: 'Joined Algoverse as an AI Safety Research Fellow.',
  },
  {
    date: '2026-01',
    title: 'Presented at IEEE CCWC 2026',
    description: 'Presented "Time-Complexity Characterization of the NIST Lightweight Cryptography Finalists" at the IEEE 16th Annual Computing and Communication Workshop and Conference (CCWC) in Las Vegas.',
  },
  {
    date: '2025-12',
    title: 'Presented at NeurIPS 2025 LAW Workshop',
    description: 'Presented "Benchmarking Large Language Models for Zero-shot and Few-shot Phishing URL Detection" at the LAW 2025: Bridging Language, Agent, and World Models for Reasoning and Planning Workshop at NeurIPS 2025 in San Diego.',
  },
  {
    date: '2025-11',
    title: 'Participated in HackPrinceton Fall 2025',
    description: 'Participated in HackPrinceton Fall 2025 (November 7-9), a 36-hour hackathon at Princeton University hosted by the Princeton Entrepreneurship Club.',
  },
  {
    date: '2025-10',
    title: 'Participated in Cal Hacks 12.0',
    description: "Participated in Cal Hacks 12.0 (October 24-26), the world's largest collegiate hackathon, held at the Palace of Fine Arts in San Francisco.",
  },
  {
    date: '2025-10',
    title: 'Participated in HackHarvard 2025',
    description: 'Participated in HackHarvard 2025 (October 3-5), a 36-hour hackathon at Harvard University themed "Compile the Decade".',
  },
  {
    date: '2025-09',
    title: 'Re-elected President of AI@UNCP',
    description: 'Re-elected as President of AI@UNCP for the 2025-2026 academic year, serving third consecutive term.',
  },
  {
    date: '2025-05',
    title: 'Awarded Undergraduate Research Fellowship - Summer (URFS)',
    description: 'Received a summer fellowship from the Pembroke Undergraduate Research and Creativity Center to conduct research on multilingual phishing email detection using LLMs, mentored by Dr. Prashanth BusiReddyGari and Dr. Shaohu Zhang.',
  },
  {
    date: '2025-03',
    title: 'Lead Organizer for HackUNCP 2025',
    description: 'Organized and led HackUNCP 2025, the first official hackathon at UNC Pembroke, while serving as President of AI@UNCP.',
  },
  {
    date: '2024-09',
    title: 'Re-elected President of AI@UNCP',
    description: 'Re-elected as President of AI@UNCP for the 2024-2025 academic year.',
  },
  {
    date: '2024-01',
    title: 'Awarded Semester-Long Undergraduate Research Fellowship (SURF)',
    description: 'Selected to receive a semester-long research fellowship to advance cross-linguistic speech emotion recognition (SER) and present findings at PURC Symposium 2024, mentored by Dr. Shaohu Zhang.',
  },
  {
    date: '2023-11',
    title: 'Elected President of AI@UNCP',
    description: 'Elected as President of AI@UNCP for the 2023-2024 academic year.',
  },
  {
    date: '2023-10',
    title: 'Participated in HackNC 2023',
    description: 'Participated in HackNC 2023 (October 28-29), a 24-hour hackathon at UNC Chapel Hill themed "Tech or Treat".',
  },
  {
    date: '2023-10',
    title: 'Participated in HackHarvard 2023',
    description: 'Participated in HackHarvard 2023 (October 20-22), a 36-hour hackathon at Harvard University themed "Hack to the Future!".',
  },
  {
    date: '2023-09',
    title: 'Founded AI@UNCP',
    description: 'Founded AI@UNCP at UNC Pembroke to help students explore AI through guest speakers, workshops, programming contests, and hackathons.',
  },
  {
    date: '2023-04',
    title: 'Participated in Hack_NCState 2023',
    description: 'Participated in Hack_NCState 2023 (April 8-9), a hackathon at North Carolina State University.',
  },
  {
    date: '2023-01',
    title: 'Awarded Honors Scholar Fellowship (HSF)',
    description: 'Awarded upon admission to the Esther G. Maynor Honors College, UNC Pembroke.',
  },
];

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export function formatMonthYear(date: string): { month: string; year: string } {
  const [year, monthNum] = date.split('-');
  return {
    month: MONTH_NAMES[parseInt(monthNum, 10) - 1] ?? '',
    year,
  };
}

export function groupByYear(items: NewsItem[]): Array<{ year: string; items: NewsItem[] }> {
  const map = new Map<string, NewsItem[]>();
  for (const item of items) {
    const year = item.date.split('-')[0];
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(item);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([year, items]) => ({ year, items }));
}
