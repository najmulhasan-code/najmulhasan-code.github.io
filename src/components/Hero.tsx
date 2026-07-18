'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ScholarIcon, GithubIcon, LinkedinIcon, XIcon } from './icons';

export default function Hero() {
  const socialLinks = [
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=YL8xF4MAAAAJ&hl=en&oi=ao', Icon: ScholarIcon },
    { label: 'GitHub', url: 'https://github.com/najmulhasan-code', Icon: GithubIcon },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/najmulhasan-cs-math', Icon: LinkedinIcon },
    { label: 'Twitter', url: 'https://x.com/_najmulhasan', Icon: XIcon }
  ];

  return (
    <section id="hero" className="py-12 sm:py-16 lg:py-20 bg-[#f8fafa]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 items-start">

          <motion.div
            className="flex-shrink-0 flex flex-col items-center sm:items-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src="/images/najmul_hasan.JPEG"
              alt="Najmul Hasan"
              width={400}
              height={400}
              className="rounded-xl w-44 h-56 sm:w-52 sm:h-64 lg:w-60 lg:h-80 object-cover object-top shadow-lg ring-1 ring-gray-200"
              priority
            />

            <div className="mt-5 flex items-center justify-center gap-4 w-44 sm:w-52 lg:w-60">
              {socialLinks.map((social) => {
                const Icon = social.Icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-500 hover:text-teal-700 hover:bg-gray-100 transition-colors"
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-gray-900 tracking-tight leading-[1.1] mb-3">
              Najmul Hasan
            </h1>

            <div className="text-[14px] text-gray-600 leading-relaxed mb-5">
              Language Models · <span className="text-gray-800">AI Alignment</span>
            </div>

            <div className="space-y-4 text-[15px] text-gray-700 leading-[1.7]">
              <p>
                My research interests center on language models and AI alignment. I am particularly interested in the design and training of language models, including how training choices shape their capabilities and behavior, and in developing models that are more capable, reliable, and aligned.
              </p>

              <p>
                I completed a B.S. in Computer Science, with minors in Mathematics and Physics, at the University of North Carolina at Pembroke, where I worked with <a href="https://www.uncp.edu/about/directory/prashanth-busi_reddy_gari.html" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">Dr. Prashanth BusiReddyGari</a> and <a href="https://zhangshaohu.github.io/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">Dr. Shaohu Zhang</a>. I was an AI Safety Research Fellow at <a href="https://algoverseairesearch.org" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">Algoverse</a>. I am currently participating in <a href="https://aialignment.mit.edu/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">MIT AI Alignment&apos;s AI Safety Fundamentals</a> program and have completed <a href="https://bluedot.org/courses/technical-ai-safety" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">BlueDot Impact&apos;s Technical AI Safety</a> course.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
