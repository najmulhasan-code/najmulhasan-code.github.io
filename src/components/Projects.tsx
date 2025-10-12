'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github as GithubIcon, ChevronLeft, ChevronRight } from 'lucide-react';
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

  // Auto-advance slides every 3 seconds when not hovered
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-8 sm:p-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {project.logo && (
            <div className="flex-shrink-0 flex justify-center lg:justify-start">
              <div className="w-40 h-40 relative bg-white border-2 border-gray-300 rounded-xl overflow-hidden flex items-center justify-center p-1">
                <Image
                  src={project.logo}
                  alt={project.title}
                  width={160}
                  height={160}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="text-gray-600 text-base italic">
                    {project.subtitle}
                  </p>
                )}
              </div>
              <div className="flex gap-4 flex-shrink-0">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label="View on GitHub"
                  >
                    <GithubIcon size={24} />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label="View live project"
                  >
                    <ExternalLink size={24} />
                  </a>
                )}
              </div>
            </div>

            <p className="text-gray-700 text-base leading-relaxed mb-6">
              {project.description}
            </p>

            {project.screenshots && project.screenshots.length > 0 && (
              <div
                className="relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="relative w-full overflow-hidden" style={{ height: '600px' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      className="absolute inset-0 flex items-center justify-center p-4"
                    >
                      <div className="relative rounded-lg shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                        <Image
                          src={project.screenshots[currentSlide]}
                          alt={`${project.title} screenshot ${currentSlide + 1}`}
                          width={1200}
                          height={800}
                          className="w-auto h-auto"
                          style={{ maxHeight: '560px', maxWidth: '100%' }}
                          priority={currentSlide === 0}
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {project.screenshots.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                      aria-label="Next slide"
                    >
                      <ChevronRight size={24} />
                    </button>

                    <div className="flex justify-center gap-2 mt-6">
                      {project.screenshots.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            idx === currentSlide ? 'bg-gray-800 w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'
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
        </div>
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
    <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Projects
          </h2>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectCard key={`${project.title}-${index}`} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
