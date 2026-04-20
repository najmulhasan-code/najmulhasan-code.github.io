'use client';

import { motion } from 'framer-motion';

interface EducationEntry {
  institution: string;
  degree: string;
  minors: string[];
  honors?: string;
  location: string;
  startDate: string;
  endDate: string;
  expected?: boolean;
}

const education: EducationEntry[] = [
  {
    institution: 'University of North Carolina at Pembroke',
    degree: 'Bachelor of Science in Computer Science',
    minors: ['Mathematics', 'Physics'],
    honors: 'Esther G. Maynor Honors College',
    location: 'Pembroke, NC',
    startDate: '2023-01-01',
    endDate: '2026-05-01',
    expected: true,
  },
];

function formatDate(dateString: string): string {
  const [year, month] = dateString.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
}

export default function Education() {
  return (
    <section id="education" className="py-12 sm:py-16 lg:py-20 bg-[#f8fafa]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Education
          </h2>
        </motion.div>

        <div className="space-y-10">
          {education.map((edu, index) => (
            <motion.div
              key={`${edu.institution}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-5 lg:gap-10"
            >
              <div className="flex items-start gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/uncp.ico"
                  alt=""
                  width={32}
                  height={32}
                  className="w-8 h-8 flex-shrink-0 rounded object-contain mt-0.5"
                />
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                    {edu.institution}
                  </h3>
                  <div className="text-sm text-gray-500 mt-1">{edu.location}</div>
                </div>
              </div>

              <div>
                <div className="font-medium text-gray-900">{edu.degree}</div>
                {edu.minors.length > 0 && (
                  <div className="text-sm text-gray-600 mt-1">
                    Minors in {edu.minors.join(' and ')}
                  </div>
                )}
                {edu.honors && (
                  <div className="text-sm text-gray-600 mt-1">{edu.honors}</div>
                )}
                <div className="text-sm text-gray-500 mt-1">
                  {formatDate(edu.startDate)} – {edu.expected ? `Expected ${formatDate(edu.endDate)}` : formatDate(edu.endDate)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
