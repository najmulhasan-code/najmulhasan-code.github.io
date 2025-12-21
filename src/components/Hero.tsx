'use client';

import { Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const socialLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/najmulhasan-code' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/najmulhasan-cs-math' },
    { icon: Twitter, label: 'Twitter', url: 'https://x.com/_najmulhasan' }
  ];

  return (
    <section id="hero" className="bg-white pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row gap-8 items-start">

          {/* Left Column - Photo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src="/images/najmul_hasan.jpg"
              alt="Najmul Hasan"
              width={180}
              height={180}
              className="rounded-lg w-36 h-36 sm:w-44 sm:h-44 object-cover"
              priority
            />
          </motion.div>

          {/* Right Column - Bio */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Name */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              Najmul Hasan
            </h1>

            {/* Affiliation */}
            <p className="text-gray-600 text-sm mb-4">
              BS in Computer Science with minors in Mathematics and Physics, Honors Student
              <br />
              University of North Carolina at Pembroke
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            {/* Bio Content */}
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                I am an undergraduate researcher advised by <a href="https://www.uncp.edu/about/directory/prashanth-busi_reddy_gari.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Dr. Prashanth BusiReddyGari</a> at UNC Pembroke. Previously, I worked with <a href="https://zhangshaohu.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Dr. Shaohu Zhang</a> (UNC Pembroke / NC A&amp;T).
              </p>

              <p>
                My research focuses on Natural Language Processing, specifically on understanding how large language models behave under distribution shifts, adversarial inputs, and real-world deployment constraints. I am interested in building robust NLP systems that can generalize across languages and domains.
              </p>

              <p>
                Currently, I am working on multi-agent reinforcement learning for decentralized resource coordination, investigating emergent communication patterns and fairness in cooperative AI agents.
              </p>

              <p>
                I have first-authored papers accepted to the NeurIPS 2025 LAW Workshop and IEEE CCWC 2026.
              </p>

              <p className="text-gray-900 font-medium">
                I&apos;m applying to PhD programs for Fall 2026. Feel free to reach out!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
