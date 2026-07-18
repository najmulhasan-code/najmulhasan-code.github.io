'use client';

import { motion } from 'framer-motion';

interface ServiceItem {
  role: string;
  organization: string;
  date: string;
  description?: string;
}

interface ServiceGroup {
  category: string;
  items: ServiceItem[];
}

const serviceGroups: ServiceGroup[] = [
  {
    category: 'Leadership & Community',
    items: [
      {
        role: 'Founder & President, AI@UNCP',
        organization: 'AI student organization, UNC Pembroke',
        date: 'Sept 2023 – May 2026',
        description:
          'Founded the AI student organization at UNC Pembroke and led it across three elected terms, running programming contests and hackathons, and hosting a guest speaker talk, to grow AI engagement on campus.',
      },
      {
        role: 'Lead Organizer, HackUNCP 2025 & 2026',
        organization: 'UNC Pembroke',
        date: '2025 – 2026',
        description:
          'Organized and led HackUNCP 2025, the first official hackathon at UNC Pembroke, and HackUNCP 2026.',
      },
    ],
  },
  {
    category: 'Peer Review',
    items: [
      {
        role: 'Reviewer, Generative and Agentic AI for Biology (GenBio) Workshop',
        organization: 'ICML 2026',
        date: '2026',
      },
      {
        role: 'Reviewer, Muslims in ML (MusIML) Workshop',
        organization: 'ICML 2026',
        date: '2026',
      },
    ],
  },
];

export default function Service() {
  return (
    <section id="service" className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Service</h2>
        </motion.div>

        <div className="space-y-10">
          {serviceGroups.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIndex * 0.05 }}
            >
              <h3 className="text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase mb-5">
                {group.category}
              </h3>
              <div className="space-y-6">
                {group.items.map((item, itemIndex) => (
                  <div
                    key={`${item.role}-${itemIndex}`}
                    className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-6"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 leading-snug">
                        {item.role}
                      </h4>
                      <div className="text-sm text-gray-600 mt-0.5">
                        {item.organization}
                      </div>
                      {item.description && (
                        <p className="text-sm text-gray-500 leading-relaxed mt-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-sm text-gray-500 mt-0.5 sm:whitespace-nowrap">
                      {item.date}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
