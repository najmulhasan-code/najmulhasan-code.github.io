'use client';

import { Github, Linkedin, Twitter, BookOpen, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="hero" className="bg-gradient-to-b from-white via-gray-50 to-white pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 items-start">

          {/* Left Column - Photo and Quick Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="max-w-xs mx-auto lg:mx-0">
              <div className="space-y-6">
                {/* Profile Photo */}
                <div className="relative group">
                  <div className="relative w-full aspect-square max-w-[280px] mx-auto">
                    <Image
                      src="/images/najmul_hasan.jpg"
                      alt="Najmul Hasan"
                      width={280}
                      height={280}
                      className="rounded-2xl shadow-xl border-2 border-gray-200 group-hover:border-blue-500 transition-all duration-500 w-full h-full object-cover"
                      priority
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/10 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>

                {/* Info Cards - Compact */}
                <div className="space-y-3">
                  {/* University Card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-3 hover:border-blue-500 hover:shadow-md transition-all">
                    <div className="flex items-center gap-2">
                      <BookOpen className="text-blue-600 flex-shrink-0" size={16} />
                      <div className="min-w-0">
                        <div className="text-gray-900 font-medium text-xs leading-tight">University of North Carolina at Pembroke</div>
                      </div>
                    </div>
                  </div>

                  {/* Degree Card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-3 hover:border-blue-500 hover:shadow-md transition-all">
                    <div className="flex items-start gap-2">
                      <Award className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
                      <div className="min-w-0">
                        <div className="text-gray-900 font-medium text-xs">BS Computer Science</div>
                        <div className="text-gray-600 text-xs mt-0.5">Mathematics, Physics</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3 justify-center">
                <a
                  href="https://github.com/najmulhasan-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-all border border-gray-200 hover:border-gray-300"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>

                <a
                  href="https://linkedin.com/in/najmulhasan-cs-math"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-all border border-gray-200 hover:border-gray-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>

                <a
                  href="https://x.com/_najmulhasan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-all border border-gray-200 hover:border-gray-300"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>
            </div>
          </motion.div>

          {/* Right Column - Bio and Description */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            {/* Name and Title */}
            <div className="mb-8 sm:mb-10 lg:mb-12">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Najmul Hasan
              </motion.h1>
              <motion.div
                className="h-1 w-20 sm:w-24 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              ></motion.div>
            </div>

            {/* Bio Content */}
            <motion.div
              className="space-y-4 sm:space-y-5 lg:space-y-6 text-base sm:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-gray-700 leading-relaxed">
                Hello! I am a senior at UNC Pembroke pursuing a <span className="text-gray-900 font-semibold">BS in Computer Science</span> with minors in <span className="text-gray-900 font-semibold">Mathematics</span> and <span className="text-gray-900 font-semibold">Physics</span>.
              </p>

              <p className="text-gray-700 leading-relaxed">
                I focus on using <span className="text-blue-700 font-semibold">reinforcement learning (RL) to improve reasoning in large language models (LLMs)</span>. I work with <span className="text-blue-600 font-medium">Dr. Shaohu Zhang</span> (NC A&T, prev. UNCP) on developing better reward design for LLM reasoning. Currently, I am developing <span className="text-blue-700 font-semibold">step level intrinsic calibration (SLIC)</span>, which combines process supervision with confidence measurement to train models that are both accurate and well calibrated about their uncertainty.
              </p>

              <p className="text-gray-700 leading-relaxed">
                I also work with <span className="text-blue-600 font-medium">Dr. Prashanth BusiReddyGari</span> on drone security applications using LLMs. Previously, I have worked on multilingual phishing email detection with LLM with Dr. BusiReddyGari and Dr. Zhang, speech emotion recognition with Dr. Zhang, phishing URL detection with LLM with Dr. BusiReddyGari, and lightweight cryptography algorithms and mobile driver&apos;s license (mDL) with Dr. BusiReddyGari and <span className="text-blue-600 font-medium">Dr. Ali Saman Tosun</span>.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 sm:p-6 lg:p-8">
                <p className="text-gray-700 leading-relaxed">
                  I&apos;m applying to <span className="text-gray-900 font-semibold">PhD programs for Fall 2026</span>. I&apos;m always happy to discuss research ideas or potential collaborations. Feel free to reach out!
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
