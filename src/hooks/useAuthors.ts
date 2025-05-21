import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAuthors, getAuthors } from '../api/authors';


// Get Authors
export const useAuthors = () => {
  return useQuery({
    queryKey: ['authors'],
    queryFn: getAuthors,
    staleTime: 1000 * 60 * 5,
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