import { ScholarIcon, GithubIcon, LinkedinIcon, XIcon } from './icons';
import { ArrowUp } from 'lucide-react';

const socialLinks = [
  { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=YL8xF4MAAAAJ&hl=en&oi=ao', Icon: ScholarIcon },
  { label: 'GitHub', url: 'https://github.com/najmulhasan-code', Icon: GithubIcon },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/najmulhasan-cs-math', Icon: LinkedinIcon },
  { label: 'Twitter', url: 'https://x.com/_najmulhasan', Icon: XIcon },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="watercolor-footer border-t border-gray-200" aria-label="Site footer">
      <div className="mx-auto max-w-5xl px-4 pb-4 pt-6 sm:px-6 sm:pt-8">
        <div className="pb-5 sm:pb-6">
          <nav aria-label="Research and social profiles">
            <ul className="grid grid-cols-[max-content_max-content] justify-center gap-x-8 gap-y-1 sm:flex sm:flex-wrap sm:gap-x-8">
              {socialLinks.map((social) => {
                const Icon = social.Icon;
                return (
                  <li key={social.label}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center gap-2 rounded-sm text-sm text-gray-900 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-gray-600" />
                      <span>{social.label}</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-gray-200 pt-3">
          <p className="text-xs text-gray-600">© {currentYear} Najmul Hasan</p>
          <a href="#" className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-gray-600 underline-offset-4 hover:text-gray-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current">
            Back to top
            <ArrowUp aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
