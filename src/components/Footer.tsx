import { ScholarIcon, GithubIcon, LinkedinIcon, XIcon } from './icons';

const socialLinks = [
  { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=YL8xF4MAAAAJ&hl=en&oi=ao', Icon: ScholarIcon },
  { label: 'GitHub', url: 'https://github.com/najmulhasan-code', Icon: GithubIcon },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/najmulhasan-cs-math', Icon: LinkedinIcon },
  { label: 'Twitter', url: 'https://x.com/_najmulhasan', Icon: XIcon },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="watercolor-footer border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            {socialLinks.map((social) => {
              const Icon = social.Icon;
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-teal-700 transition-colors"
                >
                  <Icon className="w-[14px] h-[14px] opacity-75" />
                  {social.label}
                </a>
              );
            })}
          </div>

          <div className="text-xs text-gray-500">
            © {currentYear} Najmul Hasan
          </div>
        </div>
      </div>
    </footer>
  );
}
