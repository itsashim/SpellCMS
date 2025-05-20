import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {  createCategories, getCategories, getCategoryById, updateCategory } from '../api/categories';
import { toast } from 'sonner';


// Get categories 
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
  });
};

// Get Category by Id
export const useCategoryById = (id:string) => {
  return useQuery({
    queryKey: ['categories',{id}],
    queryFn: ()=> getCategoryById(id),
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) => 
    updateCategory({ id, data }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success("Category updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update category");
    }
  });
};
// Create Category
export const useCategoriesMutation = ()=>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success("Category Created");
    },
  })
}