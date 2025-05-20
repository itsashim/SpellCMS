import { useMutation, useQuery } from '@tanstack/react-query';
import {  createCategories, getCategories } from '../api/categories';
import { toast } from 'sonner';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCategoriesMutation = ()=>{
  return useMutation({
    mutationFn: createCategories,
    onSuccess: () => {
      toast.success("Category Created")
    },

  })
}