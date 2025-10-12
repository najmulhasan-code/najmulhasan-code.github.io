'use client';

import { motion } from 'framer-motion';
import { FileText, ExternalLink, Users } from 'lucide-react';

interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: string;
  status: 'published' | 'under-review' | 'preprint' | 'in-preparation';
  abstract?: string;
  link?: string;
  tags?: string[];
}

export default function Publications() {
  // Add your publications here - currently empty, ready for you to add
  const publications: Publication[] = [
    // Example format - you can add your publications here:
    // {
    //   id: '1',
    //   title: 'Step-Level Intrinsic Calibration for Large Language Model Reasoning',
    //   authors: ['Najmul Hasan', 'Dr. Shaohu Zhang'],
    //   venue: 'Under Review',
    //   year: '2025',
    //   status: 'under-review',
    //   abstract: 'We propose SLIC, a novel approach that combines process supervision with confidence measurement to train models that are both accurate and well-calibrated about their uncertainty.',
    //   link: '',
    //   tags: ['Reinforcement Learning', 'LLMs', 'Calibration']
    // },
  ];

  const getStatusBadge = (status: Publication['status']) => {
    const styles = {
      'published': 'bg-green-100 text-green-800 border-green-300',
      'under-review': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'preprint': 'bg-blue-100 text-blue-800 border-blue-300',
      'in-preparation': 'bg-gray-100 text-gray-800 border-gray-300'
    };

    const labels = {
      'published': 'Published',
      'under-review': 'Under Review',
      'preprint': 'Preprint',
      'in-preparation': 'In Preparation'
    };

    return (
      <span className={`px-3 py-1 ${styles[status]} border rounded-full text-xs font-medium`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <section id="research" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
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
            Publications
          </h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            Research contributions in reinforcement learning, multilingual NLP, and AI security
          </p>
        </motion.div>

        {/* Publications List */}
        <div className="max-w-5xl mx-auto">
          {publications.length === 0 ? (
            // Empty state
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center py-12 bg-white rounded-2xl border border-gray-200 shadow-sm"
            >
              <FileText className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600 text-lg">Publications coming soon...</p>
              <p className="text-gray-500 text-sm mt-2">Currently working on exciting research projects</p>
            </motion.div>
          ) : (
            <div className="space-y-6 sm:space-y-8">
              {publications.map((pub, index) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                >
                  {/* Publication Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                        {pub.title}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-2 text-sm sm:text-base">
                        <Users size={16} />
                        <span>{pub.authors.join(', ')}</span>
                      </div>
                      <div className="text-gray-600 text-sm sm:text-base">
                        <span className="font-medium">{pub.venue}</span> • {pub.year}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {getStatusBadge(pub.status)}
                    </div>
                  </div>

                  {/* Abstract */}
                  {pub.abstract && (
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                      {pub.abstract}
                    </p>
                  )}

                  {/* Tags */}
                  {pub.tags && pub.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                      {pub.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Link */}
                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
                    >
                      View Paper
                      <ExternalLink size={16} />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
