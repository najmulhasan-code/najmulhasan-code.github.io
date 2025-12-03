'use client';

import { motion } from 'framer-motion';
import { Github as GithubIcon, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Project {
  title: string;
  subtitle?: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  logo?: string;
  screenshots?: string[];
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    if (project.screenshots) {
      setCurrentSlide((prev) => (prev + 1) % project.screenshots!.length);
    }
  };

  const prevSlide = () => {
    if (project.screenshots) {
      setCurrentSlide((prev) => (prev - 1 + project.screenshots!.length) % project.screenshots!.length);
    }
  };

  useEffect(() => {
    if (!project.screenshots || project.screenshots.length <= 1) return;

    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide((prev) => (prev + 1) % project.screenshots!.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, project.screenshots]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex gap-4"
    >
      {/* Logo */}
      <div className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28">
        {project.logo && (
          <Image
            src={project.logo}
            alt={project.title}
            width={112}
            height={112}
            className="object-contain w-full h-full"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 leading-snug">
            {project.title}
          </h3>
          <div className="flex gap-3 flex-shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="View on GitHub"
              >
                <GithubIcon size={18} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="View live project"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
        {project.subtitle && (
          <p className="text-gray-600 text-sm">
            {project.subtitle}
          </p>
        )}
        <p className="text-gray-600 text-sm mt-1">
          {project.description}
        </p>

        {project.screenshots && project.screenshots.length > 0 && (
          <div
            className="relative group mt-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-full overflow-hidden rounded-lg" style={{ height: '400px' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Image
                    src={project.screenshots[currentSlide]}
                    alt={`${project.title} screenshot ${currentSlide + 1}`}
                    width={800}
                    height={500}
                    className="w-auto h-auto rounded-lg shadow-lg"
                    style={{ maxHeight: '380px', maxWidth: '100%' }}
                    priority={currentSlide === 0}
                  />
                </motion.div>
              </div>
            </div>

            {project.screenshots.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="flex justify-center gap-1.5 mt-3">
                  {project.screenshots.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentSlide ? 'bg-gray-800 w-6' : 'bg-gray-300 w-1.5 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const projects: Project[] = [
    {
      title: 'SummaryOne',
      subtitle: 'Capstone Project for CSC 4900: Advanced Software Project',
      description: 'Led a team of three to architect and develop an AI-powered text processing platform that enables multi-function text transformations. The system integrates summarization, translation, grammar correction, content expansion, and tone adjustment with secure user authentication and customizable summarization preferences.',
      githubUrl: 'https://github.com/najmulhasan-code/SummaryOne',
      logo: '/images/SummaryOne/summaryone_logo.png',
      screenshots: [
        '/images/SummaryOne/summaryone_10.png',
        '/images/SummaryOne/summaryone_11.png',
        '/images/SummaryOne/summaryone_12.png',
        '/images/SummaryOne/summaryone_13.png',
        '/images/SummaryOne/summaryone_14.png',
        '/images/SummaryOne/summaryone_15.png',
        '/images/SummaryOne/summaryone_16.png',
        '/images/SummaryOne/summaryone_17.png',
        '/images/SummaryOne/summaryone_18.png',
        '/images/SummaryOne/summaryone_19.png',
        '/images/SummaryOne/summaryone_20.png',
        '/images/SummaryOne/summaryone_21.png',
        '/images/SummaryOne/summaryone_22.png',
        '/images/SummaryOne/summaryone_23.png',
        '/images/SummaryOne/summaryone_24.png',
        '/images/SummaryOne/summaryone_1.png',
        '/images/SummaryOne/summaryone_2.png',
        '/images/SummaryOne/summaryone_3.png',
        '/images/SummaryOne/summaryone_4.png',
        '/images/SummaryOne/summaryone_5.png',
        '/images/SummaryOne/summaryone_6.png',
        '/images/SummaryOne/summaryone_7.png',
        '/images/SummaryOne/summaryone_9.png'
      ]
    }
  ];

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-white">
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
            Projects
          </h2>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectCard key={`${project.title}-${index}`} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
