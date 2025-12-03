'use client';

import { motion } from 'framer-motion';

interface Award {
  month: string;
  year: string;
  title: string;
  description: string;
}

export default function Awards() {
  const awards: Award[] = [
    {
      month: 'May',
      year: '2025',
      title: 'Awarded Undergraduate Research Fellowship - Summer (URFS)',
      description: 'Received intensive, competitive summer fellowship from the Pembroke Undergraduate Research and Creativity Center to conduct research on multilingual phishing email detection using large language models (LLMs), mentored by Dr. Prashanth BusiReddyGari and Dr. Shaohu Zhang.'
    },
    {
      month: 'Jan',
      year: '2024',
      title: 'Awarded Semester-Long Undergraduate Research Fellowship (SURF)',
      description: 'Selected to receive a semester-long research fellowship to advance cross-linguistic speech emotion recognition (SER) and present findings at PURC Symposium 2024, mentored by Dr. Shaohu Zhang.'
    },
    {
      month: 'Jan',
      year: '2023',
      title: 'Awarded Honors Scholar Fellowship (HSF)',
      description: 'Awarded upon admission to the Esther G. Maynor Honors College, UNC Pembroke as part of an academic offer.'
    }
  ];

  return (
    <section id="awards" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Awards & Recognition
          </h2>
        </motion.div>

        {/* Awards List */}
        <div className="space-y-6">
          {awards.map((item, index) => (
            <motion.div
              key={`${item.year}-${item.month}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex gap-4"
            >
              {/* Date Badge */}
              <div className="flex-shrink-0 w-24 sm:w-28">
                <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                  {item.month} {item.year}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 leading-snug mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
