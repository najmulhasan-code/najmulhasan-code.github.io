import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Publications from '@/components/Publications';
import Blog from '@/components/Blog';
import News from '@/components/News';

import Experience from '@/components/Experience';
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
      <Experience />
      <Education />
      <Awards />
      <Blog />
      <Footer />
    </main>
  );
}
