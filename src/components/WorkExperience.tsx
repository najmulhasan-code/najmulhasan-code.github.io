'use client';

import { motion } from 'framer-motion';
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
      startDate: '2023-09-01',
      mentor: 'Dr. Shaohu Zhang',
      logo: '/images/uncp_logo.png',
      type: 'research',
      keywords: 'Reinforcement Learning, Large Language Models, LLM Reasoning, Speech Emotion Recognition'
    },
    {
      position: 'Undergraduate Research Assistant',
      institution: 'UNC Pembroke',
      location: 'Pembroke, NC',
      startDate: '2023-05-01',
      mentor: 'Dr. Prashanth BusiReddyGari',
      logo: '/images/uncp_logo.png',
      type: 'research',
      keywords: 'Large Language Models, Phishing URL Detection, Lightweight Cryptography, Cybersecurity'
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

        {/* Experience List */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.startDate}-${exp.position}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex gap-4"
            >
              {/* Logo */}
              <div className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28">
                {exp.logo && (
                  <Image
                    src={exp.logo}
                    alt={exp.institution}
                    width={112}
                    height={112}
                    className="object-contain w-full h-full"
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 leading-snug">
                  {exp.position}
                </h3>
                <p className="text-gray-700 text-sm">
                  {exp.institution}
                </p>
                {exp.mentor && (
                  <p className="text-gray-600 text-sm">
                    Mentor: {exp.mentor}
                  </p>
                )}
                <p className="text-gray-500 text-sm">
                  {exp.location} · {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                </p>
                {exp.keywords && (
                  <p className="text-gray-600 text-sm mt-1">
                    {exp.keywords}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
