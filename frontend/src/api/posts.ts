import { apiClient } from './axios';

export interface Post {
  id: string;
  title: string;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  createdAt: string;
  content: string;
  coverImage?: string;
}

// Get Posts
export const getPosts = async () => {
  const response = await apiClient.get('/posts');
  return response.data;
};

// Create Posts
export const createPosts = async (data: Post) => {
  const response = await apiClient.post("/posts", data);
  return response.data;
};

// Get Posts By ID
export const getPostsById = async (id:string) => {
  const response = await apiClient.get(`/posts/${id}`);
  return response.data;
};

// Update Posts
export const updatePosts = async ({ id, data }: { id: string; data: Post }) => {
  try {
    const response = await apiClient.patch<Post>(`/posts/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error(`Failed to update Posts with ID ${id}`);
  }
};

// Delete Posts
export const deletePosts = (id:string)=>{
  const response = apiClient.delete(`/posts/${id}`)  
  return response;
}

