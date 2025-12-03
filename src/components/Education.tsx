'use client';

import { motion } from 'framer-motion';
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
            Education
          </h2>
        </motion.div>

        {/* Education List */}
        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={`${edu.institution}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex gap-4"
            >
              {/* Logo */}
              <div className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28">
                {edu.logo && (
                  <Image
                    src={edu.logo}
                    alt={edu.institution}
                    width={112}
                    height={112}
                    className="object-contain w-full h-full"
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 leading-snug">
                  {edu.institution}
                </h3>
                <p className="text-gray-700 text-sm">
                  {edu.degree}
                </p>
                {edu.minors.length > 0 && (
                  <p className="text-gray-600 text-sm">
                    Minors in {edu.minors.join(' and ')}
                  </p>
                )}
                {edu.honors && (
                  <p className="text-gray-600 text-sm">
                    {edu.honors}
                  </p>
                )}
                <p className="text-gray-500 text-sm">
                  {edu.location} · Expected {formatDate(edu.endDate)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
