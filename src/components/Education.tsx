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
  },
];

function formatDate(dateString: string): string {
  const [year, month] = dateString.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  return monthNames[parseInt(month) - 1] + ' ' + year;
}

function formatDateRange(entry: EducationEntry): string {
  const end = entry.expected ? 'Expected ' + formatDate(entry.endDate) : formatDate(entry.endDate);
  return formatDate(entry.startDate) + ' ' + String.fromCharCode(0x2013) + ' ' + end;
}

export default function Education() {
  return (
    <section id="education" className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10"
        >
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Education</h2>
        </motion.div>

        <div className="border-y border-gray-200">
          {education.map((entry, index) => (
            <motion.article
              key={entry.institution + '-' + index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="py-6 sm:py-8"
            >
              <header className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-surface p-2 sm:h-12 sm:w-12">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logos/uncp.ico"
                    alt=""
                    width={32}
                    height={32}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="text-base font-bold leading-snug text-gray-900 sm:text-[17px]">
                    {entry.institution}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{entry.location}</p>
                </div>
              </header>

              <div className="mt-7 sm:ml-16">
                <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_220px] sm:gap-10">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                      Degree
                    </p>
                    <h4 className="mt-2 text-lg font-semibold leading-snug text-gray-900 sm:text-xl">
                      {entry.degree}
                    </h4>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-700">
                      Minors in {entry.minors.join(' and ')}; member of {entry.honors}, where I completed the honors curriculum.
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-5 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                      Dates
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                      {formatDateRange(entry)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
