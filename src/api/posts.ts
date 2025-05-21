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
export const getPosts = async ():Promise<Post[]> => {
  const response = await apiClient.get('/posts');
  return response.data;
};

// Create Posts
export const createPosts = async (data: Post) => {
  const response = await apiClient.post("/posts", data);
  return response.data;
};

// Delete Posts
export const deletePosts = (id:string)=>{
const response = apiClient.delete(`/posts/${id}`)  
return response;
}

