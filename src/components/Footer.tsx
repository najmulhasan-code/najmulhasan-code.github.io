'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter as TwitterIcon, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/najmulhasan-code' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/najmulhasan-cs-math' },
    { icon: TwitterIcon, label: 'Twitter', url: 'https://x.com/_najmulhasan' }
  ];

  const sections = [
    { label: 'News', href: '#news' },
    { label: 'Publications', href: '#publications' },
    { label: 'Work Experience', href: '#work-experience' },
    { label: 'Education', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Awards', href: '#awards' }
  ];

  return (
    <>
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-8 sm:gap-12"
          >
            {/* About Column */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Najmul Hasan</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Undergraduate researcher focusing on reinforcement learning to improve reasoning in large language models.
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium text-gray-900">University of North Carolina at Pembroke</span><br />
                BS Computer Science<br />
                Expected May 2026
              </p>
            </div>

            {/* Navigation Column */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Sections</h4>
              <ul className="space-y-2.5">
                {sections.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Column */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Connect</h4>
              <div className="flex flex-wrap gap-3 mb-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-900 text-gray-700 hover:text-white rounded-lg transition-all duration-300"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Interested in discussing research or collaboration opportunities? Feel free to reach out!
              </p>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-t border-gray-200 mt-12 pt-8"
          >
            <p className="text-gray-600 text-sm text-center">
              © {currentYear} Najmul Hasan. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </>
  );
}
