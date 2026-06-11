'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
  id: string;
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollY } = useScroll();

  const navLinks: NavLink[] = useMemo(() => [
    { label: 'News', href: '#news', id: 'news' },
    { label: 'Research', href: '#research', id: 'research' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Awards', href: '#awards', id: 'awards' },
    { label: 'Service', href: '#service', id: 'service' },
    { label: 'Blog', href: '#blog', id: 'blog' },
  ], []);

  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.85]);
  const blurAmount = useTransform(scrollY, [0, 80], [0, 12]);
  const backdropFilter = useTransform(blurAmount, (v) => `blur(${v}px)`);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const shadowOpacity = useTransform(scrollY, [0, 80], [0, 0.04]);
  const boxShadow = useTransform(
    shadowOpacity,
    (v) => `0 1px 12px rgba(15, 23, 42, ${v})`
  );

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-64px 0px -55% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrolling) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navLinks.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const handleScroll = () => {
      if (isScrolling) return;
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;
      if (scrolledToBottom) setActiveSection('blog');
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling, navLinks]);

  const scrollToSection = useCallback((href: string) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (!element) return;

    setIsScrolling(true);
    setIsMobileMenuOpen(false);

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    const navbarHeight = 64;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    setActiveSection(sectionId);
    window.history.pushState(null, '', href);

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => scrollToSection(hash), 100);
    }
  }, [scrollToSection]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('hero');
    window.history.pushState(null, '', window.location.pathname);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-[#f8fafa] pointer-events-none"
          style={{ opacity: bgOpacity, backdropFilter, WebkitBackdropFilter: backdropFilter, boxShadow }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-px bg-gray-200 pointer-events-none"
          style={{ opacity: borderOpacity }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <button
              onClick={scrollToTop}
              className="text-[15px] sm:text-base font-semibold text-gray-900 hover:text-teal-700 transition-colors tracking-tight focus:outline-none focus-visible:outline-none"
            >
              Najmul Hasan
            </button>

            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`relative text-[14px] font-medium transition-colors focus:outline-none focus-visible:outline-none ${
                    activeSection === link.id
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute -bottom-[6px] left-0 right-0 h-[2px] bg-teal-600"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus-visible:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 sm:top-16 left-0 right-0 z-40 lg:hidden bg-[#f8fafa]/95 backdrop-blur-md border-b border-gray-200"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={`text-left py-2 text-[15px] font-medium transition-colors focus:outline-none focus-visible:outline-none ${
                      activeSection === link.id
                        ? 'text-teal-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-14 sm:h-16" />
    </>
  );
}
