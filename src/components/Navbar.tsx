'use client';

import { useState, useEffect, useLayoutEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface NavLink {
  label: string;
  href: string;
  id: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handledInitialNavigationRef = useRef(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLButtonElement>(null);

  const navLinks: NavLink[] = useMemo(() => [
    { label: 'Research', href: '#research', id: 'research' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Blog', href: '#blog', id: 'blog' },
    { label: 'News', href: '#news', id: 'news' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Awards', href: '#awards', id: 'awards' },
    { label: 'Activities', href: '#service', id: 'service' },
  ], []);

  const routeSection = pathname.startsWith('/research') || pathname.startsWith('/papers')
    ? 'research'
    : pathname.startsWith('/blog')
      ? 'blog'
      : null;
  const currentSection = pathname === '/' ? activeSection : routeSection;

  useEffect(() => {
    if (pathname !== '/') return;

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
      if (scrolledToBottom) setActiveSection('service');
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling, navLinks, pathname]);

  const scrollToSection = useCallback((href: string) => {
    if (pathname !== '/') {
      router.push(`/${href}`);
      return;
    }

    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (!element) return;

    setIsScrolling(true);
    setIsMobileMenuOpen(false);

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    const navbarHeight = 64;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({ top: offsetPosition, behavior: reduceMotion ? 'auto' : 'smooth' });
    setActiveSection(sectionId);
    window.history.pushState(window.history.state, '', href);

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, reduceMotion ? 0 : 1000);
  }, [pathname, router]);

  useLayoutEffect(() => {
    if (!handledInitialNavigationRef.current) {
      handledInitialNavigationRef.current = true;
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;

      if (pathname === '/' && navigationEntry?.type === 'reload') {
        const cleanUrl = `${window.location.pathname}${window.location.search}`;
        window.history.replaceState(window.history.state, '', cleanUrl);
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }
    }

    if (pathname !== '/') return;

    const hash = window.location.hash;
    if (!hash) return;

    const sectionId = hash.slice(1);
    const element = document.getElementById(sectionId);
    if (!element) return;

    const navbarHeight = 64;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - navbarHeight, behavior: 'auto' });
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const focusFrame = window.requestAnimationFrame(() => firstMobileLinkRef.current?.focus());
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsMobileMenuOpen(false);
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMobileMenuOpen]);

  const scrollToTop = () => {
    if (pathname !== '/') {
      router.push('/');
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    setActiveSection('hero');
    window.history.pushState(window.history.state, '', window.location.pathname);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div
          aria-hidden
          className="watercolor-nav-surface absolute inset-0 pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-px bg-gray-200 pointer-events-none"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <button
              onClick={scrollToTop}
              className="min-h-11 rounded-sm text-[15px] sm:text-base font-semibold text-gray-900 hover:text-teal-700 transition-colors tracking-tight focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
            >
              Najmul Hasan
            </button>

            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  aria-current={currentSection === link.id ? 'location' : undefined}
                  className={`relative rounded-sm text-[14px] font-medium transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 ${
                    currentSection === link.id
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                  {currentSection === link.id && (
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
              ref={menuButtonRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="watercolor-nav-surface fixed top-14 sm:top-16 left-0 right-0 z-40 lg:hidden border-b border-gray-200"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <button
                    key={link.href}
                    ref={index === 0 ? firstMobileLinkRef : undefined}
                    onClick={() => scrollToSection(link.href)}
                    aria-current={currentSection === link.id ? 'location' : undefined}
                    className={`min-h-11 rounded-sm text-left py-2.5 text-[15px] font-medium transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${
                      currentSection === link.id
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
