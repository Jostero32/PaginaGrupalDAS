const API_BASE_URL = 'https://backendpaginadas.onrender.com';

export const api = {
  // Get all posts
  getPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  },

  // Get post by slug
  getPostBySlug: async (slug) => {
    const response = await fetch(`${API_BASE_URL}/posts/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return response.json();
  },

  // Create new post
  createPost: async (post) => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    return response.json();
  },

  // Update post
  updatePost: async (slug, post) => {
    const response = await fetch(`${API_BASE_URL}/posts/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to update post');
    }
    return response.json();
  },

  // Delete post
  deletePost: async (slug) => {
    const response = await fetch(`${API_BASE_URL}/posts/${slug}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    return response.json();
  },
};