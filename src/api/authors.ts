import { apiClient } from './axios';

export interface Authors {
  id: number;
  name: string;
  avatar: string;
  bio: string;
}

export const getAuthors = async ():Promise<Authors[]> => {
  const response = await apiClient.get('/authors');
  return response.data;
};