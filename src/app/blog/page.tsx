import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import { getAllBlogPosts } from '@/data/blog';

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-[#f8fafa]">
      <Blog posts={posts} />
      <Footer />
    </main>
  );
}
