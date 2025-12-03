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
              BS Computer Science, University of North Carolina at Pembroke
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
                I research how to make large language models reason reliably under distribution shifts, adversarial inputs, and real-world deployment conditions. Currently, I am developing step-level intrinsic calibration (SLIC), which combines process supervision with confidence measurement to train models that are both accurate and well calibrated about their uncertainty.
              </p>

              <p>
                I work with Dr. Shaohu Zhang (NC A&T) and Dr. Prashanth BusiReddyGari (UNC Pembroke).
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
