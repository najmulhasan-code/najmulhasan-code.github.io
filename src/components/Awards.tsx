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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Awards & Recognition
          </h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            Honors, fellowships, and scholarships
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            {awards.map((item, index) => (
              <motion.div
                key={`${item.year}-${item.month}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className="inline-flex sm:flex flex-col items-center px-4 py-2 sm:px-3 sm:py-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="text-blue-600 font-bold text-sm sm:text-lg">{item.month}</div>
                      <div className="text-blue-800 font-semibold text-xs sm:text-sm">{item.year}</div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
