'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

interface Education {
  institution: string;
  degree: string;
  minors: string[];
  location: string;
  startDate: string;
  endDate: string;
  logo?: string;
  honors?: string;
  coursework: string[];
}

export default function Education() {
  const education: Education[] = [
    {
      institution: 'University of North Carolina at Pembroke',
      degree: 'Bachelor of Science in Computer Science',
      minors: ['Mathematics', 'Physics'],
      location: 'Pembroke, NC',
      startDate: '2022-08-01',
      endDate: '2026-05-01',
      logo: '/images/uncp_logo.png',
      honors: 'Esther G. Maynor Honors College',
      coursework: [
        'Artificial Intelligence',
        'Advanced Software Project (Capstone)',
        'Cybersecurity Capstone Project',
        'Software Development & Professional Practices',
        'Algorithms',
        'Data Structures',
        'Object-Oriented Programming',
        'Operating Systems',
        'Computer Systems',
        'Digital Logic',
        'Discrete Structures',
        'Calculus I, II, III',
        'Probability & Statistics I'
      ]
    }
  ];

  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <section id="education" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Education
          </h2>
        </motion.div>

        {/* Education Timeline */}
        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={`${edu.institution}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex gap-4 sm:gap-6"
            >
              {/* Logo */}
              <div className="flex-shrink-0">
                {edu.logo && (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 relative bg-white border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-2">
                    <Image
                      src={edu.logo}
                      alt={edu.institution}
                      width={96}
                      height={96}
                      className="object-contain w-full h-full"
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                    {edu.institution}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-600 text-sm flex-shrink-0">
                    <Calendar size={14} />
                    <span className="whitespace-nowrap">
                      Expected {formatDate(edu.endDate)}
                    </span>
                  </div>
                </div>

                <div className="text-gray-700 font-medium mb-1">
                  {edu.degree}
                </div>

                {edu.minors.length > 0 && (
                  <div className="text-gray-600 text-sm mb-1">
                    Minors in {edu.minors.join(' and ')}
                  </div>
                )}

                {edu.honors && (
                  <div className="text-gray-600 text-sm mb-2">
                    {edu.honors}
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-gray-600 text-sm mb-3">
                  <MapPin size={14} />
                  <span>{edu.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
