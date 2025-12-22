'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

interface WorkExperience {
  position: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  mentor?: string;
  logo?: string;
  type: 'research' | 'work' | 'leadership';
  keywords?: string;
}

export default function WorkExperience() {
  const experiences: WorkExperience[] = [
    {
      position: 'Undergraduate Research Assistant',
      institution: 'UNC Pembroke',
      location: 'Pembroke, NC',
      startDate: '2023-05-01',
      mentor: 'Dr. Prashanth BusiReddyGari',
      logo: '/images/uncp_logo.png',
      type: 'research',
      keywords: 'Natural Language Processing, Large Language Models, Multi-Agent Reinforcement Learning, Phishing URL Detection, Lightweight Cryptography, Cybersecurity'
    },
    {
      position: 'Undergraduate Research Assistant',
      institution: 'UNC Pembroke',
      location: 'Pembroke, NC',
      startDate: '2023-09-01',
      endDate: '2025-12-01',
      mentor: 'Dr. Shaohu Zhang',
      logo: '/images/uncp_logo.png',
      type: 'research',
      keywords: 'Large Language Models, Speech Emotion Recognition, Natural Language Processing, Phishing Detection'
    },
    {
      position: 'Research Assistant',
      institution: 'PURC (Pembroke Undergraduate Research and Creativity) Center',
      location: 'Pembroke, NC',
      startDate: '2025-05-01',
      endDate: '2025-06-30',
      mentor: 'Dr. Prashanth BusiReddyGari, Dr. Shaohu Zhang',
      logo: '/images/uncp_logo.png',
      type: 'research',
      keywords: 'Large Language Models, Multilingual Phishing Email Detection, Adversarial Email Detection, Prompt Injection'
    },
    {
      position: 'Research Assistant',
      institution: 'PURC (Pembroke Undergraduate Research and Creativity) Center',
      location: 'Pembroke, NC',
      startDate: '2024-01-01',
      endDate: '2024-04-01',
      mentor: 'Dr. Shaohu Zhang',
      logo: '/images/uncp_logo.png',
      type: 'research',
      keywords: 'Cross-Linguistic Speech Emotion Recognition, Deep Learning, Wav2Vec2, ESD Dataset, EMoDB Dataset'
    },
    {
      position: 'Senior Design Project Collaboration (Capstone Project): Synthetic Cyber Knowledge Graphs',
      institution: 'UNC Pembroke /NSA/LAS',
      location: 'Pembroke, NC',
      startDate: '2023-08-01',
      endDate: '2023-12-01',
      logo: '/images/uncp_logo.png',
      type: 'research',
      keywords: 'Cyber Threat Intelligence, STIX 2.0, Angular, Django, RESTful APIs, Graph Visualization'
    },
    {
      position: 'SOC Analyst',
      institution: 'UNC Pembroke',
      location: 'Pembroke, NC',
      startDate: '2023-07-01',
      logo: '/images/uncp_logo.png',
      type: 'work',
      keywords: 'Security Incident Investigation, Python Automation, Team Training'
    },
    {
      position: 'Programming Intern',
      institution: 'Emerging Technology Institute',
      location: 'Pembroke, NC',
      startDate: '2024-01-01',
      endDate: '2024-04-01',
      logo: '/images/eti.png',
      type: 'work',
      keywords: 'Full-Stack Web Development, Flutter, Firebase, Authentication Systems, CI/CD'
    }
  ];

  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-20 bg-white">
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
            Work Experience
          </h2>
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.startDate}-${exp.position}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="flex gap-4 sm:gap-6"
              >
                {/* Logo */}
                <div className="flex-shrink-0">
                  {exp.logo && (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 relative bg-white border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-2">
                      <Image
                        src={exp.logo}
                        alt={exp.institution}
                        width={96}
                        height={96}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pb-8 border-b border-gray-200 last:border-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gray-600 text-sm flex-shrink-0">
                      <Calendar size={14} />
                      <span className="whitespace-nowrap">
                        {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      </span>
                    </div>
                  </div>

                  <div className="text-gray-700 font-medium mb-1">
                    {exp.institution}
                  </div>

                  <div className="flex items-center gap-1.5 text-gray-600 text-sm mb-2">
                    <MapPin size={14} />
                    <span>{exp.location}</span>
                  </div>

                  {exp.mentor && (
                    <div className="text-sm text-gray-600 mb-3">
                      <span className="font-medium">Mentor:</span> {exp.mentor}
                    </div>
                  )}

                  {exp.keywords && (
                    <div className="mt-3 text-sm text-gray-700">
                      {exp.keywords}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
