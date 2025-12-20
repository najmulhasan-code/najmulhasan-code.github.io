'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

interface NavLink {
  label: string;
  href: string;
  id: string;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { scrollY } = useScroll();

  // Navigation links matching page section order
  const navLinks: NavLink[] = useMemo(() => [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'News', href: '#news', id: 'news' },
    { label: 'Publications', href: '#research', id: 'research' },
    { label: 'Work Experience', href: '#experience', id: 'experience' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Awards & Recognition', href: '#awards', id: 'awards' },
    { label: 'Writing', href: '#writing', id: 'writing' }
  ], []);

  // Detect scroll position for navbar style changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  // Track active section using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrolling) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Handle scroll to bottom for last section
    const handleScroll = () => {
      if (isScrolling) return;
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;
      if (scrolledToBottom) {
        setActiveSection('writing');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling, navLinks]);

  // Smooth scroll to section with navbar offset
  const scrollToSection = useCallback((href: string) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);

    if (!element) return;

    setIsScrolling(true);
    setIsMobileMenuOpen(false);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const navbarHeight = 80;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    setActiveSection(sectionId);
    window.history.pushState(null, '', href);

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  }, []);

  // Handle URL hash on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        scrollToSection(hash);
      }, 100);
    }
  }, [scrollToSection]);

  // Keyboard navigation between sections
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) return;

      const currentIndex = navLinks.findIndex(link => link.id === activeSection);

      if (e.key === 'ArrowDown' && currentIndex < navLinks.length - 1) {
        e.preventDefault();
        scrollToSection(navLinks[currentIndex + 1].href);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        scrollToSection(navLinks[currentIndex - 1].href);
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(navLinks[0].href);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(navLinks[navLinks.length - 1].href);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, navLinks, scrollToSection]);

  // Cleanup scroll timeout on component unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg shadow-gray-200/50'
            : 'bg-white/50 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.button
              onClick={() => scrollToSection('#hero')}
              className="flex items-center gap-2 sm:gap-3 group relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-blue-500 transition-all duration-300">
                  <Image
                    src="/images/najmul_hasan.jpg"
                    alt="Najmul Hasan"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="hidden sm:block">
                <div className="text-gray-900 font-bold text-base sm:text-lg leading-tight">Najmul Hasan</div>
              </div>
            </motion.button>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === link.id
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-blue-50 border border-blue-200 rounded-lg -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="fixed top-16 sm:top-20 left-0 right-0 z-40 lg:hidden bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-xl shadow-gray-200/50 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    onClick={() => scrollToSection(link.href)}
                    className={`relative px-4 py-3 rounded-lg text-left font-medium transition-all ${
                      activeSection === link.id
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.label}
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="activeSectionMobile"
                        className="absolute inset-0 bg-blue-50 border border-blue-200 rounded-lg -z-10"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-16 sm:h-20"></div>
    </>
  );
}
