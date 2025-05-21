import { apiClient } from './axios';

export interface Category {
  id: string;
  name: string;
}


// Get Categories
export const getCategories = async ():Promise<Category[]> => {
  const response = await apiClient.get('/categories');
  return response.data;
};

// Get Categories By ID
export const getCategoryById = async (id:string) => {
  const response = await apiClient.get(`/categories/${id}`);
  return response.data;
};

// Update Categories
export const updateCategory = async ({ id, data }: { id: string; data: { name: string } }) => {
  try {
    const response = await apiClient.patch<Category>(`/categories/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error(`Failed to update category with ID ${id}`);
  }
};

// Delete Categories
export const deleteCategories = (id:string)=>{
const response = apiClient.delete(`/categories/${id}`)  
return response;
}

// Create New Categories
export const createCategories = async (data: Category) => {
  const response = await apiClient.post("/categories", data);
  return response.data;
};
