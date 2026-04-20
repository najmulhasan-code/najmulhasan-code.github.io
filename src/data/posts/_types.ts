import { ReactNode } from 'react';

export interface Post {
  slug: string;
  title: string;
  date: string;
  updatedDate?: string;
  description: string;
  excerpt?: string;
  category: string;
  tags: string[];
  published: boolean;
  thumbnail?: string;
  links?: string[];
  content: ReactNode;
}

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
