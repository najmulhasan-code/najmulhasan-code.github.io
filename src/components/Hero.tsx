import Image from 'next/image';
import { ScholarIcon, GithubIcon, LinkedinIcon, XIcon } from './icons';

export default function Hero() {
  const socialLinks = [
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=YL8xF4MAAAAJ&hl=en&oi=ao', Icon: ScholarIcon },
    { label: 'GitHub', url: 'https://github.com/najmulhasan-code', Icon: GithubIcon },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/najmulhasan-cs-math', Icon: LinkedinIcon },
    { label: 'Twitter', url: 'https://x.com/_najmulhasan', Icon: XIcon }
  ];

  return (
    <section id="hero" className="watercolor-section watercolor-hero pt-8 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 lg:pb-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">

          <div className="w-full sm:w-auto flex-shrink-0 flex flex-col items-center sm:items-start">
            <div className="portrait-wash">
              <Image
                src="/images/najmul-hasan-profile.webp"
                alt="Najmul Hasan"
                width={720}
                height={960}
                className="rounded-xl w-48 h-auto sm:w-52 lg:w-60 object-cover object-top shadow-[0_18px_45px_rgba(23,43,49,0.12)] ring-1 ring-gray-200"
                preload
              />
            </div>

            <div className="mt-5 flex items-center justify-center gap-1 sm:gap-3 w-48 sm:w-52 lg:w-60">
              {socialLinks.map((social) => {
                const Icon = social.Icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="inline-flex items-center justify-center w-11 h-11 rounded-md text-gray-500 hover:text-teal-700 hover:bg-gray-100 transition-colors"
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="w-full flex-1 min-w-0">
            <h1 className="text-center sm:text-left text-3xl sm:text-4xl lg:text-[40px] font-bold text-gray-900 tracking-tight leading-[1.1] mb-3">
              Najmul Hasan
            </h1>

            <div className="text-center sm:text-left text-[14px] text-gray-600 leading-relaxed mb-5">
              Language Models · <span className="text-gray-800">AI Alignment</span>
            </div>

            <div className="space-y-4 text-base text-gray-700 leading-[1.7]">
              <p>
                My research centers on language models and AI alignment. I am particularly interested in how model design and training choices shape capabilities and behavior, and in developing models that are more capable, reliable, and aligned.
              </p>

              <p>
                I am an AI/ML Quality Engineering Intern at <a href="https://www.rocketlawyer.com/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">Rocket Lawyer</a>. I am also participating in BlueDot Impact&apos;s <a href="https://bluedot.org/courses/technical-ai-safety-project" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">Technical AI Safety Project Sprint</a>, where I am working on language-model alignment during pretraining.
              </p>

              <p>
                I hold a B.S. in Computer Science, with minors in Mathematics and Physics, from the University of North Carolina at Pembroke, where I worked with <a href="https://www.uncp.edu/about/directory/prashanth-busi_reddy_gari.html" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">Dr. Prashanth BusiReddyGari</a> and <a href="https://zhangshaohu.github.io/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">Dr. Shaohu Zhang</a>. I was an AI Safety Research Fellow at <a href="https://algoverseairesearch.org" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">Algoverse</a>. I completed the AI Safety Fundamentals Fellowship (AISF) with <a href="https://aialignment.mit.edu/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">MIT AI Alignment (MAIA)</a> and <a href="https://bluedot.org/courses/technical-ai-safety" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">BlueDot Impact&apos;s Technical AI Safety course</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
