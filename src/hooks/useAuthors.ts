import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAuthors, getAuthors, getAuthorById, updateAuthor } from '../api/authors';
import { toast } from 'sonner';


// Get Authors
export const useAuthors = () => {
  return useQuery({
    queryKey: ['authors'],
    queryFn: getAuthors,
    staleTime: 1000 * 60 * 5,
  });
};

// Get Authors By Id
export const useAuthorById = (id:string) => {
  return useQuery({
    queryKey: ['authors',{id}],
    queryFn: ()=> getAuthorById(id),
    staleTime: 1000 * 60 * 5,
  });
};

// Update Authors
export const useUpdateAuthor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => updateAuthor({ id, data }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update Authors");
    }
  });
};

// Create Authors
export const useAuthorMutation = ()=>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createAuthors,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
  })
}