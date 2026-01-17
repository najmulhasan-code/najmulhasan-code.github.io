'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ExternalLink, ChevronDown } from 'lucide-react';

interface NewsItem {
  month: string;
  year: string;
  title: string;
  description?: string;
  link?: string;
}

const INITIAL_DISPLAY_COUNT = 6;
const LOAD_MORE_COUNT = 5;

export default function News() {
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const newsItems: NewsItem[] = [
    {
      month: 'Jan',
      year: '2026',
      title: 'Presented at IEEE CCWC 2026',
      description: 'Presented "Time-Complexity Characterization of the NIST Lightweight Cryptography Finalists" at the IEEE 16th Annual Computing and Communication Workshop and Conference (CCWC) in Las Vegas.'
    },
    {
      month: 'Dec',
      year: '2025',
      title: 'Presented at NeurIPS 2025 LAW Workshop',
      description: 'Presented "Benchmarking Large Language Models for Zero-shot and Few-shot Phishing URL Detection" at the LAW 2025: Bridging Language, Agent, and World Models for Reasoning and Planning Workshop at NeurIPS 2025 in San Diego.'
    },
    {
      month: 'Nov',
      year: '2025',
      title: 'Participated in HackPrinceton Fall 2025',
      description: 'Participated in HackPrinceton Fall 2025 (November 7-9), a 36-hour hackathon at Princeton University hosted by the Princeton Entrepreneurship Club.'
    },
    {
      month: 'Oct',
      year: '2025',
      title: 'Participated in Cal Hacks 12.0',
      description: 'Participated in Cal Hacks 12.0 (October 24-26), the world\'s largest collegiate hackathon, held at the Palace of Fine Arts in San Francisco.'
    },
    {
      month: 'Oct',
      year: '2025',
      title: 'Participated in HackHarvard 2025',
      description: 'Participated in HackHarvard 2025 (October 3-5), a 36-hour hackathon at Harvard University themed "Compile the Decade".'
    },
    {
      month: 'Sep',
      year: '2025',
      title: 'Re-elected President of Artificial Intelligence @ UNCP',
      description: 'Re-elected as President of AI@UNCP for the 2025-2026 academic year, serving third consecutive term. Continuing to lead monthly programming contests, meetings, events, and organizing HackUNCP to promote AI engagement within the campus community.'
    },
    {
      month: 'May',
      year: '2025',
      title: 'Awarded Undergraduate Research Fellowship - Summer (URFS)',
      description: 'Received intensive, competitive summer fellowship from the Pembroke Undergraduate Research and Creativity Center to conduct research on multilingual phishing email detection using large language models (LLMs), mentored by Dr. Prashanth BusiReddyGari and Dr. Shaohu Zhang.'
    },
    {
      month: 'Mar',
      year: '2025',
      title: 'Lead Organizer for HackUNCP 2025',
      description: 'Organized and led HackUNCP 2025, the first official hackathon at UNC Pembroke, while serving as President of AI@UNCP. Coordinated 42 participants, 12 student-led projects, 1 tech talk, 2 roundtable discussions, 20 judges, and 5 technical mentors across five tracks: Sustainability, Education, Interactive Media, Healthcare, and Cybersecurity.'
    },
    {
      month: 'Sep',
      year: '2024',
      title: 'Re-elected President of Artificial Intelligence @ UNCP',
      description: 'Re-elected as President of AI@UNCP for the 2024-2025 academic year. Organized monthly programming contests, led meetings and events, and organized HackUNCP 2025 (the first official hackathon at UNC Pembroke) to promote AI engagement within the campus community.'
    },
    {
      month: 'Jan',
      year: '2024',
      title: 'Awarded Semester-Long Undergraduate Research Fellowship (SURF)',
      description: 'Selected to receive a semester-long research fellowship to advance cross-linguistic speech emotion recognition (SER) and present findings at PURC Symposium 2024, mentored by Dr. Shaohu Zhang.'
    },
    {
      month: 'Nov',
      year: '2023',
      title: 'Elected President of Artificial Intelligence @ UNCP',
      description: 'Elected as President of AI@UNCP for the 2023-2024 academic year. Organized monthly programming contests, led official meetings and events, and actively participated in hackathons to promote AI engagement within the campus community.'
    },
    {
      month: 'Oct',
      year: '2023',
      title: 'Participated in HackNC 2023',
      description: 'Participated in HackNC 2023 (October 28-29), a 24-hour hackathon at UNC Chapel Hill themed "Tech or Treat".'
    },
    {
      month: 'Oct',
      year: '2023',
      title: 'Participated in HackHarvard 2023',
      description: 'Participated in HackHarvard 2023 (October 20-22), a 36-hour hackathon at Harvard University themed "Hack to the Future!".'
    },
    {
      month: 'Sep',
      year: '2023',
      title: 'Founded AI@UNCP (AI Club)',
      description: 'Founded AI@UNCP at UNC Pembroke to promote artificial intelligence education through guest speaker series, workshops, programming contests, and hackathon participation.'
    },
    {
      month: 'Apr',
      year: '2023',
      title: 'Participated in Hack_NCState 2023',
      description: 'Participated in Hack_NCState 2023 (April 8-9), a hackathon at North Carolina State University.'
    },
    {
      month: 'Jan',
      year: '2023',
      title: 'Awarded Honors Scholar Fellowship (HSF)',
      description: 'Awarded upon admission to the Esther G. Maynor Honors College, UNC Pembroke as part of an academic offer.'
    }
  ];

  return (
    <section id="news" className="py-12 sm:py-16 lg:py-20 bg-white">
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
            News
          </h2>
        </motion.div>

        {/* News Items */}
        <div>
          {newsItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600">News items coming soon...</p>
            </motion.div>
          ) : (
            <>
              <div className="space-y-6">
                <AnimatePresence initial={false}>
                  {newsItems.slice(0, displayCount).map((item, index) => (
                    <motion.div
                      key={`${item.year}-${item.month}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: index >= INITIAL_DISPLAY_COUNT ? (index - INITIAL_DISPLAY_COUNT) * 0.05 : 0 }}
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
                        {item.description && (
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                          >
                            Learn more
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Show more / Show less buttons */}
              {newsItems.length > INITIAL_DISPLAY_COUNT && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 text-center"
                >
                  {displayCount < newsItems.length ? (
                    <button
                      onClick={() => setDisplayCount(prev => Math.min(prev + LOAD_MORE_COUNT, newsItems.length))}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Show more
                      <ChevronDown className="w-4 h-4 transition-transform" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setDisplayCount(INITIAL_DISPLAY_COUNT)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Show less
                      <ChevronDown className="w-4 h-4 rotate-180 transition-transform" />
                    </button>
                  )}
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
