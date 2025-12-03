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

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/najmulhasan-code' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/najmulhasan-cs-math' },
    { icon: TwitterIcon, label: 'Twitter', url: 'https://x.com/_najmulhasan' }
  ];

  return (
    <>
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Najmul Hasan</h3>
            <p className="text-gray-600 text-sm mb-4">
              Undergraduate researcher focusing on making large language models reason reliably.
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

            <p className="text-gray-500 text-sm">
              © {currentYear} Najmul Hasan
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
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-md transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </>
  );
}
