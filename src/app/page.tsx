import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Publications from '@/components/Publications';
import News from '@/components/News';
import Projects from '@/components/Projects';
import WorkExperience from '@/components/WorkExperience';
import Education from '@/components/Education';
import Awards from '@/components/Awards';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <News />
      <Publications />
      <WorkExperience />
      <Education />
      <Projects />
      <Awards />
      <Footer />
    </main>
  );
}
