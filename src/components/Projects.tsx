'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Project interface for type safety
 */
interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  pypiUrl?: string;
  articleUrl?: string;
  image?: string;
}

/**
 * Projects section displaying research and development work
 * Responsive layout: cards adapt to desktop, tablet, and mobile screens
 */
export default function Projects() {
  const projects: Project[] = [
    {
      title: 'SAGE',
      description: 'A multi-agent deliberation framework where AI agents research, debate, and synthesize answers together. Features a three-phase workflow, supports multiple LLM providers, and includes nine predefined agent roles.',
      tags: ['Python', 'LLMs', 'Multi-Agent', 'CLI'],
      githubUrl: 'https://github.com/najmulhasan-code/sage',
      pypiUrl: 'https://pypi.org/project/agentsage/',
      articleUrl: '/writing/sage-multi-agent-deliberation',
      image: '/images/SAGE/SAGE.png'
    },
    {
      title: 'SummaryOne',
      description: 'AI-powered text processing platform with multi-function transformations including summarization, translation, grammar correction, content expansion, and tone adjustment.',
      tags: ['Python', 'NLP', 'Full-Stack', 'Team Lead'],
      githubUrl: 'https://github.com/najmulhasan-code/SummaryOne',
      image: '/images/SummaryOne/summaryone_logo.png'
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

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, index) => {
            const cardContent = (
              <>
                {/* Project Image */}
                {project.image && (
                  <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                )}

                {/* Project Content */}
                <div className="flex-1 min-w-0">
                  {/* Title and Links Row */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                    <h3 className={`text-lg font-semibold text-gray-900 ${
                      project.articleUrl ? 'group-hover:text-blue-600 transition-colors' : ''
                    }`}>
                      {project.title}
                    </h3>

                    {/* External Links */}
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-900 transition-colors"
                          aria-label={`${project.title} GitHub repository`}
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.pypiUrl && (
                        <a
                          href={project.pypiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-900 transition-colors"
                          aria-label={`${project.title} on PyPI`}
                        >
                          <Package size={16} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-900 transition-colors"
                          aria-label={`${project.title} live demo`}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs font-medium text-gray-500 bg-gray-100 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            );

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                {/* Project Card - Whole card clickable if articleUrl exists */}
                {project.articleUrl ? (
                  <Link
                    href={project.articleUrl}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 cursor-pointer hover:bg-gray-50 -mx-4 px-4 py-4 -my-4 rounded-lg transition-colors"
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {cardContent}
                  </div>
                )}

                {/* Separator */}
                {index < projects.length - 1 && (
                  <div className="mt-8 border-b border-gray-100" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
