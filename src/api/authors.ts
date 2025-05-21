import { apiClient } from './axios';

export interface Authors {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

// Get Authors
export const getAuthors = async ():Promise<Authors[]> => {
  const response = await apiClient.get('/authors');
  return response.data;
};

// Create Authors
export const createAuthors = async (data:Authors) =>{
  const response = await apiClient.post(`/authors`,data);
  return response.data;
}