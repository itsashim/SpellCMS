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
// Get Authors By ID
export const getAuthorById = async (id:string):Promise<Authors[]> => {
  const response = await apiClient.get(`/authors/${id}`);
  return response.data;
};

// Update Authors
export const updateAuthor = async ({ id, data }: { id: string; data: { name: string } }) => {
  try {
    const response = await apiClient.patch<Authors>(`/authors/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error(`Failed to update category with ID ${id}`);
  }
};

// Create Authors
export const createAuthors = async (data:Authors) =>{
  const response = await apiClient.post(`/authors`,data);
  return response.data;
}