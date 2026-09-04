'use client';

import { motion } from 'framer-motion';

interface Award {
  title: string;
  organization: string;
  date: string;
  description?: string;
}

const awards: Award[] = [
  {
    title: 'Undergraduate Research Fellowship – Summer (URFS)',
    organization: 'Pembroke Undergraduate Research and Creativity Center',
    date: 'Summer 2025',
    description:
      'Supported research on multilingual phishing email detection using large language models; findings presented at PURC Symposium 2026.',
  },
  {
    title: 'Semester-Long Undergraduate Research Fellowship (SURF)',
    organization: 'Pembroke Undergraduate Research and Creativity Center',
    date: 'Spring 2024',
    description:
      'Supported cross-linguistic speech emotion recognition research; findings presented at PURC Symposium 2024.',
  },
  {
    title: 'Honors Scholar Fellowship (HSF)',
    organization: 'Esther G. Maynor Honors College, UNC Pembroke',
    date: 'Spring 2023',
    description: 'Awarded upon admission as part of the academic offer.',
  },
];

export default function Awards() {
  return (
    <section id="awards" className="watercolor-section watercolor-paper py-12 sm:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="section-heading text-2xl sm:text-3xl font-bold text-gray-900">
            Awards
          </h2>
        </motion.div>

        <div className="space-y-6">
          {awards.map((award, index) => (
            <motion.div
              key={`${award.date}-${award.title}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-6 pb-6 border-b border-gray-200 last:border-0 last:pb-0"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 leading-snug">
                  {award.title}
                </h3>
                <div className="text-sm text-gray-600 mt-0.5">
                  {award.organization}
                </div>
                {award.description && (
                  <p className="text-sm text-gray-500 leading-relaxed mt-2">
                    {award.description}
                  </p>
                )}
              </div>
              <div className="flex-shrink-0 text-sm text-gray-500 mt-0.5 sm:whitespace-nowrap">
                {award.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
