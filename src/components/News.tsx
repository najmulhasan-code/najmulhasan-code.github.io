'use client';

import { motion } from 'framer-motion';
import { Calendar, ExternalLink } from 'lucide-react';

interface NewsItem {
  month: string;
  year: string;
  title: string;
  description?: string;
  link?: string;
}

export default function News() {
  const newsItems: NewsItem[] = [
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            News
          </h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            Recent updates, achievements, and milestones
          </p>
        </motion.div>

        {/* News Items */}
        <div className="max-w-4xl mx-auto">
          {newsItems.length === 0 ? (
            // Empty state
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200"
            >
              <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600 text-lg">News items coming soon...</p>
              <p className="text-gray-500 text-sm mt-2">Check back for updates on research, awards, and achievements</p>
            </motion.div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {newsItems.map((item, index) => (
                <motion.div
                  key={`${item.year}-${item.month}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {/* Date */}
                    <div className="flex-shrink-0">
                      <div className="inline-flex sm:flex flex-col items-center px-4 py-2 sm:px-3 sm:py-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="text-blue-600 font-bold text-sm sm:text-lg">{item.month}</div>
                        <div className="text-blue-800 font-semibold text-xs sm:text-sm">{item.year}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                        >
                          Learn more
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
