import type { Metadata } from 'next';

const target = '/research';

export const metadata: Metadata = {
  title: 'Research | Najmul Hasan',
  alternates: {
    canonical: 'https://najmulhasan-code.github.io/research',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegacyPapersPage() {
  return (
    <main className="min-h-[60vh] bg-[#f8fafa] flex items-center justify-center px-4">
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <script dangerouslySetInnerHTML={{ __html: `window.location.replace(${JSON.stringify(target)});` }} />
      <p className="text-sm text-gray-600">
        This page has moved to <a href={target} className="text-teal-700 hover:underline">Research</a>.
      </p>
    </main>
  );
}
