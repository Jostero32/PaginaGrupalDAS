const DEFAULT_POSTS = [
  {
    id: 'post-1',
    slug: 'arquitectura-frontend-escalable',
    title: 'Arquitectura Frontend Escalable en Equipos Mixtos',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod sapien vitae metus tempus gravida.',
    date: '2026-01-12',
    tags: ['Frontend', 'Arquitectura', 'React'],
    content: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer faucibus, turpis quis pretium feugiat, nisl felis gravida augue, quis ultrices lacus neque sit amet augue.',
      'Praesent aliquet, lorem et laoreet tempor, justo mauris venenatis urna, eget eleifend risus libero non massa. Sed ac porta neque, at volutpat risus.',
      'Curabitur hendrerit, ligula non tristique ultricies, enim erat consequat sem, vitae feugiat arcu enim non erat. Nulla facilisi. Nulla eget ligula vel arcu pellentesque facilisis.',
    ],
  },
];

const STORAGE_KEY = 'nexus_blog_posts';
const isBrowser = typeof window !== 'undefined';

const sanitizePosts = (value) => {
  if (!Array.isArray(value)) return null;

  const sanitized = value
    .map((post) => {
      if (
        !post ||
        typeof post !== 'object' ||
        typeof post.slug !== 'string' ||
        typeof post.title !== 'string' ||
        typeof post.excerpt !== 'string' ||
        typeof post.date !== 'string' ||
        !Array.isArray(post.content)
      ) {
        return null;
      }

      return {
        ...post,
        id: typeof post.id === 'string' ? post.id : `post-${post.slug}`,
        tags: Array.isArray(post.tags) ? post.tags : [],
      };
    })
    .filter(Boolean);

  return sanitized.length > 0 ? sanitized : null;
};

const readPosts = () => {
  if (!isBrowser) return DEFAULT_POSTS;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_POSTS;
    const parsed = JSON.parse(raw);
    return sanitizePosts(parsed) ?? DEFAULT_POSTS;
  } catch (error) {
    return DEFAULT_POSTS;
  }
};

const writePosts = (posts) => {
  if (!isBrowser) return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    // Ignore storage errors (private mode or quota limits).
  }
};

export const getPosts = () => readPosts();

export const addPost = (post) => {
  const current = readPosts();
  const updated = [post, ...current];
  writePosts(updated);
  return updated;
};

export const findPostBySlug = (slug) =>
  readPosts().find((post) => post.slug === slug);

export const posts = DEFAULT_POSTS;
