import type { Post } from './_types';
import { post as sageMultiAgentDeliberation } from './sage-multi-agent-deliberation';

const posts: Post[] = [sageMultiAgentDeliberation];

export function getAllPosts(): Post[] {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug && post.published);
}

export type { Post } from './_types';
export { formatDate } from './_types';
