'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

interface Publication {
  title: string;
  authors: string[];
  venue: string;
  venueShort: string;
  year: string;
  arxivLink?: string;
  pdfLink?: string;
  codeLink?: string;
  scholarLink?: string;
}

// Your name to be highlighted in author lists
const AUTHOR_NAME = 'Najmul Hasan';

export default function Publications() {
  const publications: Publication[] = [
    {
      title: 'Benchmarking Large Language Models for Zero-shot and Few-shot Phishing URL Detection',
      authors: ['Najmul Hasan', 'Prashanth BusiReddyGari'],
      venue: 'LAW 2025 Workshop, 39th Conference on Neural Information Processing Systems (NeurIPS 2025)',
      venueShort: 'NeurIPS Workshop',
      year: '',
      scholarLink: 'https://scholar.google.com/scholar?hl=en&as_sdt=0%2C34&q=Benchmarking+Large+Language+Models+for+Zero-shot+and+Few-shot+Phishing+URL+Detection',
    },
    {
      title: 'Time-Complexity Characterization of the NIST Lightweight Cryptography Finalists',
      authors: ['Prashanth BusiReddyGari', 'Najmul Hasan'],
      venue: '2026 IEEE 16th Annual Computing and Communication Workshop and Conference (CCWC)',
      venueShort: 'IEEE CCWC',
      year: '',
    },
  ];

  // Helper to render authors with your name highlighted
  const renderAuthors = (authors: string[]) => {
    return authors.map((author, idx) => (
      <span key={idx}>
        {author === AUTHOR_NAME ? (
          <span className="text-blue-600">{author}</span>
        ) : (
          <span>{author}</span>
        )}
        {idx < authors.length - 1 && ', '}
      </span>
    ));
  };

  return (
    <section id="research" className="py-12 sm:py-16 lg:py-20 bg-white">
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
            Selected Publications
          </h2>
        </motion.div>

        {/* Publications List */}
        <div>
          {publications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <FileText className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600">Publications coming soon...</p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {publications.map((pub, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  {/* Venue Badge */}
                  <div className="flex-shrink-0 w-32 sm:w-36">
                    <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded text-center">
                      {pub.venueShort}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Title */}
                    <h3 className="font-semibold text-gray-900 leading-snug mb-1">
                      {pub.title}
                    </h3>
                    {/* Authors */}
                    <p className="text-gray-600 text-sm mb-1">
                      {renderAuthors(pub.authors)}
                    </p>
                    {/* Venue and Year */}
                    <p className="text-gray-500 text-sm mb-2">
                      <em>{pub.venue}</em>{pub.year && ` ${pub.year}`}
                    </p>
                    {/* Links */}
                    <div className="flex gap-2">
                      {pub.arxivLink && (
                        <a
                          href={pub.arxivLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 border border-gray-300 text-gray-700 text-xs font-medium rounded hover:bg-gray-100 transition-colors"
                        >
                          ARXIV
                        </a>
                      )}
                      {pub.pdfLink && (
                        <a
                          href={pub.pdfLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 border border-gray-300 text-gray-700 text-xs font-medium rounded hover:bg-gray-100 transition-colors"
                        >
                          PDF
                        </a>
                      )}
                      {pub.codeLink && (
                        <a
                          href={pub.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 border border-gray-300 text-gray-700 text-xs font-medium rounded hover:bg-gray-100 transition-colors"
                        >
                          CODE
                        </a>
                      )}
                      {pub.scholarLink && (
                        <a
                          href={pub.scholarLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 border border-gray-300 text-gray-700 text-xs font-medium rounded hover:bg-gray-100 transition-colors"
                        >
                          GOOGLE SCHOLAR
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
