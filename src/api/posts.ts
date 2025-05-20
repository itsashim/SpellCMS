import { apiClient } from './axios';

export interface Post {
  id: number;
  title: string;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  createdAt: string;
  content: string;
  coverImage?: string;
}

export const getPosts = async ():Promise<Post[]> => {
  const response = await apiClient.get('/posts');
  return response.data;
};

