import Hero from '@/components/Hero';
import Publications from '@/components/Publications';
import Blog from '@/components/Blog';
import News from '@/components/News';

import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Awards from '@/components/Awards';
import Service from '@/components/Service';
import Footer from '@/components/Footer';
import { getAllPapers } from '@/data/papers';
import { getAllBlogPosts } from '@/data/blog';

export default function Home() {
  const papers = getAllPapers();
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <News />
      <Publications papers={papers} />
      <Experience />
      <Education />
      <Awards />
      <Service />
      <Blog posts={posts} />
      <Footer />
    </main>
  );
}
