import type { Metadata } from 'next';
import Publications from '@/components/Publications';
import Footer from '@/components/Footer';
import { getAllPapers } from '@/data/papers';

export const metadata: Metadata = {
  title: 'Research | Najmul Hasan',
  description: 'Research publications by Najmul Hasan on language models, AI alignment, and related areas.',
  alternates: {
    canonical: 'https://najmulhasan-code.github.io/research',
  },
};

export default function PapersPage() {
  const papers = getAllPapers();

  return (
    <main className="min-h-screen bg-background">
      <Publications papers={papers} />
      <Footer />
    </main>
  );
}
